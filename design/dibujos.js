// Geometría de los componentes SVG del vocabulario: gráfica de líneas, dial de
// effort, temporizador, guía en codo, saltos de precio, circuito, repetición, bucle del agente, camino de puntos y moneda.
// Devuelven marcado con las clases de componentes.css: color, trazos y tipografía
// van siempre por CSS, nunca en atributos. Las medidas salen de design-system.css.
import { icono } from './iconos.js';

const medida = nombre => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(nombre));
const esc = texto => String(texto).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const r1 = n => Math.round(n * 10) / 10;

/** Curva suave que pasa por todos los puntos (Catmull-Rom → Bézier): rutas y caminos. */
export function curva(puntos, cerrada = false) {
  const p = cerrada ? [puntos.at(-1), ...puntos, puntos[0], puntos[1]] : [puntos[0], ...puntos, puntos.at(-1)];
  let d = `M${p[1][0]} ${p[1][1]}`;
  for (let i = 1; i < p.length - 2; i++) {
    const [p0, a, b, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    d += ` C${r1(a[0] + (b[0] - p0[0]) / 6)} ${r1(a[1] + (b[1] - p0[1]) / 6)} ${r1(b[0] - (p3[0] - a[0]) / 6)} ${r1(b[1] - (p3[1] - a[1]) / 6)} ${b[0]} ${b[1]}`;
  }
  return cerrada ? `${d} Z` : d;
}

/**
 * Gráfica de líneas con ejes, rejilla, franjas opcionales y etiquetas al final de cada línea.
 * series: [{ nombre, estilo: 1 | 2 | 3 | 4 | 'acento', puntos: [[x, y], …], dy, marcar: false (sin puntos),
 *   notas: [[índice, texto, lado: 'arriba' | 'abajo' | 'izquierda' | 'derecha']] (el nombre de un punto, p. ej. su esfuerzo),
 *   resaltar: [índices] (puntos con un anillo más grueso) }]
 * franja: { desde, hasta, texto, critica } o una lista de ellas. El texto va encima de la gráfica, centrado
 *   sobre su franja; «\n» parte la línea (la última, a --esp-2 del borde superior).
 * flechas: [{ desde: [x, y], hasta: [x, y], texto, lado: 'arriba' | 'abajo', discontinua }]: una lectura entre
 *   dos puntos, con su texto junto al centro; la discontinua no lleva punta (une dos puntos a la misma altura).
 * x, y: { min, max, log, marcas: [valores], formato: v => texto, titulo }
 * Cada serie lleva data-serie (su índice); cada punto, data-punto; cada anillo, data-resalta; cada nota, data-nota;
 * cada flecha y su texto, data-flecha: así una escena puede animar sus partes por separado.
 */
export function grafica({ ancho, alto, x, y, series, franja, flechas = [], margenDerecho = medida('--esp-8') * 1.5 }) {
  const m = { izq: medida('--esp-8'), der: margenDerecho, arr: medida('--esp-6'), abj: medida('--esp-7') };
  const escala = (eje, desde, hasta) => {
    const f = eje.log ? Math.log10 : n => n;
    return valor => desde + ((f(valor) - f(eje.min)) / (f(eje.max) - f(eje.min))) * (hasta - desde);
  };
  const X = escala(x, m.izq, ancho - m.der);
  const Y = escala(y, alto - m.abj, m.arr);
  const fx = x.formato ?? String, fy = y.formato ?? String;
  const etiqueta = medida('--tipo-etiqueta');
  let svg = '';
  for (const f of [franja ?? []].flat()) {
    const [a, b] = [X(f.desde), X(f.hasta)];
    svg += `<rect class="grafica__franja${f.critica ? ' grafica__franja--critica' : ''}" x="${r1(a)}" y="${m.arr}" width="${r1(b - a)}" height="${r1(alto - m.abj - m.arr)}"/>`;
    svg += `<path class="grafica__franja-borde" d="M${r1(a)} ${m.arr}V${alto - m.abj}M${r1(b)} ${m.arr}V${alto - m.abj}"/>`;
    if (f.texto) {
      const lineas = String(f.texto).split('\n'), alturaLinea = etiqueta * 1.2, base = m.arr - medida('--esp-2');
      svg += `<text class="grafica__nota" text-anchor="middle">${lineas.map((t, i) =>
        `<tspan x="${r1((a + b) / 2)}" y="${r1(base - (lineas.length - 1 - i) * alturaLinea)}">${esc(t)}</tspan>`).join('')}</text>`;
    }
  }
  for (const valor of y.marcas) {
    svg += `<path class="grafica__rejilla" d="M${m.izq} ${r1(Y(valor))}H${ancho - m.der}"/>`;
    svg += `<text class="grafica__marca" x="${m.izq - medida('--esp-2')}" y="${r1(Y(valor))}" text-anchor="end" dominant-baseline="central">${esc(fy(valor))}</text>`;
  }
  for (const valor of x.marcas) {
    svg += `<text class="grafica__marca" x="${r1(X(valor))}" y="${alto - m.abj + medida('--esp-5')}" text-anchor="middle">${esc(fx(valor))}</text>`;
  }
  svg += `<path class="grafica__eje" d="M${m.izq} ${m.arr - medida('--esp-2')}V${alto - m.abj}H${ancho - m.der + medida('--esp-2')}"/>`;
  if (y.titulo) svg += `<text class="grafica__titulo-eje" x="${m.izq}" y="${m.arr - medida('--esp-4')}">${esc(y.titulo)}</text>`;
  if (x.titulo) svg += `<text class="grafica__titulo-eje" x="${ancho - m.der}" y="${alto - medida('--esp-2')}" text-anchor="end">${esc(x.titulo)}</text>`;
  const separacion = medida('--esp-3');
  series.forEach((serie, s) => {
    const pts = serie.puntos.map(([a, b]) => [r1(X(a)), r1(Y(b))]);
    const [ux, uy] = pts.at(-1);
    const resaltados = new Set(serie.resaltar ?? []);
    svg += `<g class="grafica__serie grafica__serie--${serie.estilo}" data-serie="${s}">`;
    svg += `<path class="grafica__linea" d="M${pts.map(p => p.join(' ')).join('L')}"/>`;
    if (serie.marcar !== false) svg += pts.map(([a, b], i) => `<circle class="grafica__punto" data-punto="${i}" cx="${a}" cy="${b}" r="${medida('--esp-1')}"/>`).join('');
    // El resaltado es un anillo encima del punto: así puede aparecer en su paso.
    svg += [...resaltados].map(i => `<circle class="grafica__punto grafica__punto--resaltado" data-resalta="${i}" cx="${pts[i][0]}" cy="${pts[i][1]}" r="${medida('--esp-2')}"/>`).join('');
    svg += `<text class="grafica__etiqueta" x="${r1(ux + medida('--esp-3'))}" y="${r1(uy + (serie.dy ?? 0))}" dominant-baseline="central">${esc(serie.nombre)}</text>`;
    for (const [i, texto, lado = 'arriba'] of serie.notas ?? []) {
      const [a, b] = pts[i];
      const sitio = { arriba: [a, b - separacion, 'middle', 'auto'], abajo: [a, b + separacion, 'middle', 'hanging'],
        izquierda: [a - separacion, b, 'end', 'central'], derecha: [a + separacion, b, 'start', 'central'] }[lado];
      svg += `<text class="grafica__etiqueta" data-nota="${i}" x="${r1(sitio[0])}" y="${r1(sitio[1])}" text-anchor="${sitio[2]}" dominant-baseline="${sitio[3]}">${esc(texto)}</text>`;
    }
    svg += '</g>';
  });
  flechas.forEach((f, k) => {
    const [ax, ay, bx, by] = [X(f.desde[0]), Y(f.desde[1]), X(f.hasta[0]), Y(f.hasta[1])];
    // Sin pisar los puntos: la flecha empieza y acaba a --esp-3 de ellos.
    const largo = Math.hypot(bx - ax, by - ay), ux = (bx - ax) / largo, uy = (by - ay) / largo;
    const [x1, y1, x2, y2] = [ax + ux * separacion, ay + uy * separacion, bx - ux * separacion, by - uy * separacion];
    const punta = medida('--esp-2'), [px1, py1] = [x2 - ux * punta - uy * punta * 0.6, y2 - uy * punta + ux * punta * 0.6], [px2, py2] = [x2 - ux * punta + uy * punta * 0.6, y2 - uy * punta - ux * punta * 0.6];
    // Un solo trazo (la punta se repasa): al trazarse, la punta sale al final.
    const d = `M${r1(x1)} ${r1(y1)}L${r1(x2)} ${r1(y2)}` + (f.discontinua ? '' : `L${r1(px1)} ${r1(py1)}L${r1(x2)} ${r1(y2)}L${r1(px2)} ${r1(py2)}`);
    svg += `<path class="grafica__flecha${f.discontinua ? ' grafica__flecha--discontinua' : ''}" data-flecha="${k}" d="${d}"/>`;
    if (f.texto) {
      const lineas = String(f.texto).split('\n'), alturaLinea = etiqueta * 1.2;
      const [mx, my] = [(x1 + x2) / 2, (y1 + y2) / 2];
      const arriba = (f.lado ?? 'arriba') === 'arriba';
      const base = arriba ? my - separacion - (lineas.length - 1) * alturaLinea : my + separacion + etiqueta;
      svg += `<text class="grafica__nota" data-flecha="${k}" text-anchor="middle">${lineas.map((l, i) =>
        `<tspan x="${r1(mx)}" y="${r1(base + i * alturaLinea)}">${esc(l)}</tspan>`).join('')}</text>`;
    }
  });
  return `<svg class="grafica" viewBox="0 0 ${ancho} ${alto}" width="${ancho}" height="${alto}">${svg}</svg>`;
}

/** Dial de effort: semicírculo con una marca por nivel y la aguja en «actual». */
export function dial({ etiquetas = ['Low', 'Medium', 'High', 'XHigh', 'Max'], actual = 0 } = {}) {
  const r = medida('--dial-radio'), lado = medida('--esp-8'), arriba = medida('--esp-6');
  const cx = r + lado, cy = r + arriba, ancho = 2 * cx, alto = cy + medida('--esp-5');
  const n = etiquetas.length;
  const angulo = i => -90 + (180 * i) / (n - 1);
  const punto = (grados, radio) => {
    const a = (grados * Math.PI) / 180;
    return [r1(cx + radio * Math.sin(a)), r1(cy - radio * Math.cos(a))];
  };
  let svg = `<path class="dial__arco" d="M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}"/>`;
  etiquetas.forEach((texto, i) => {
    const [x1, y1] = punto(angulo(i), r - medida('--esp-3'));
    const [x2, y2] = punto(angulo(i), r);
    const [lx, ly] = punto(angulo(i), r + medida('--esp-5'));
    const s = Math.sin((angulo(i) * Math.PI) / 180);
    const ancla = s < -0.3 ? 'end' : s > 0.3 ? 'start' : 'middle';
    svg += `<path class="dial__marca" d="M${x1} ${y1}L${x2} ${y2}"/>`;
    svg += `<text class="dial__etiqueta${i === actual ? ' dial__etiqueta--actual' : ''}" x="${lx}" y="${ly}" text-anchor="${ancla}" dominant-baseline="central">${esc(texto)}</text>`;
  });
  svg += `<path class="dial__aguja" d="M${cx} ${cy}V${cy - r + medida('--esp-6')}" transform="rotate(${angulo(actual)} ${cx} ${cy})"/>`;
  svg += `<circle class="dial__eje" cx="${cx}" cy="${cy}" r="${medida('--esp-2')}"/>`;
  return `<svg class="dial" viewBox="0 0 ${ancho} ${alto}" width="${ancho}" height="${alto}" data-centro="${cx} ${cy}">${svg}</svg>`;
}

/** Temporizador: anillo que se vacía y tiempo restante en mono. */
export function temporizador({ segundos = 300 } = {}) {
  const d = medida('--temporizador-diametro'), r = d / 2 - medida('--trazo-fuerte');
  const tiempo = `${Math.floor(segundos / 60)}:${String(segundos % 60).padStart(2, '0')}`;
  return `<div class="temporizador">
    <svg class="temporizador__anillo" viewBox="0 0 ${d} ${d}" width="${d}" height="${d}">
      <circle class="temporizador__pista" cx="${d / 2}" cy="${d / 2}" r="${r}"/>
      <circle class="temporizador__progreso" cx="${d / 2}" cy="${d / 2}" r="${r}"/>
    </svg>
    <div class="temporizador__centro">${icono('timer')}<span class="temporizador__tiempo">${tiempo}</span></div>
  </div>`;
}

/**
 * Línea en ángulo recto que pasa por los puntos [[x, y], …], con las esquinas redondeadas
 * (radio --radio-s, o menos si un tramo es corto): la guía que une un resaltado con su etiqueta.
 */
export function codo(puntos, radio = medida('--radio-s')) {
  let d = `M${r1(puntos[0][0])} ${r1(puntos[0][1])}`;
  for (let i = 1; i < puntos.length - 1; i++) {
    const [a, b, c] = [puntos[i - 1], puntos[i], puntos[i + 1]];
    const r = Math.min(radio, Math.hypot(b[0] - a[0], b[1] - a[1]) / 2, Math.hypot(c[0] - b[0], c[1] - b[1]) / 2);
    const hacia = (p, q, k) => [p[0] + Math.sign(q[0] - p[0]) * k, p[1] + Math.sign(q[1] - p[1]) * k];
    const [e, f] = [hacia(b, a, r), hacia(b, c, r)];
    d += `L${r1(e[0])} ${r1(e[1])}Q${r1(b[0])} ${r1(b[1])} ${r1(f[0])} ${r1(f[1])}`;
  }
  const z = puntos[puntos.length - 1];
  return `${d}L${r1(z[0])} ${r1(z[1])}`;
}

/**
 * Saltos de precio: arcos que unen filas de una tabla por su derecha, en px de la pantalla. Cada
 * salto va de la fila «desde» a la fila «hasta» (sus centros, en y), con la punta en «hasta», y se
 * abre «curva» px hacia la derecha de x. Su texto (×20) va en la fila de destino, en la columna
 * xCifras, a la derecha de todos los arcos: así no se pisan aunque se aniden. Con pegada: true, va
 * junto al arco, a la altura de su vértice (entre dos filas vecinas, la línea que las separa). Con
 * acento: true, es el protagonista. Devuelve los grupos (.salto, con data-salto) para un SVG que
 * cubra la pantalla.
 */
export function saltos({ x, xCifras, saltos: lista }) {
  const f = medida('--esp-1');
  return lista.map((sa, k) => {
    const { desde, hasta, curva, texto } = sa;
    // El vértice del arco (una curva con los dos puntos de control en x + curva) está a 3/4 de curva.
    const [cx, cy] = sa.pegada ? [x + (curva * 3) / 4 + f, (desde + hasta) / 2] : [xCifras, hasta];
    // Un solo trazo (la punta se repasa): al trazarse, la punta sale al final.
    const d = `M${r1(x)} ${r1(desde)}C${r1(x + curva)} ${r1(desde)} ${r1(x + curva)} ${r1(hasta)} ${r1(x)} ${r1(hasta)}L${r1(x + f)} ${r1(hasta - f)}L${r1(x)} ${r1(hasta)}L${r1(x + f)} ${r1(hasta + f)}`;
    return `<g class="salto${sa.acento ? ' salto--acento' : ''}" data-salto="${k}"><path class="salto__arco" d="${d}"/>` +
      `<text class="salto__cifra" x="${r1(cx)}" y="${r1(cy)}" dominant-baseline="central">${esc(texto)}</text></g>`;
  }).join('');
}

/**
 * Abanico: flechas curvas que salen de un mismo punto (un concepto) hacia varios destinos (sus
 * partes, en lista), o cada una de su origen (desde, una lista de puntos: cada etiqueta con su
 * parte). Cada una sale y llega en horizontal, con su punta al final; con vertical: true, sale y
 * llega en vertical, hacia abajo (el concepto arriba y sus partes debajo, en fila).
 */
export function abanico({ desde, hasta, vertical = false }) {
  const f = medida('--esp-1');
  return hasta.map(([x, y], k) => {
    const [x0, y0] = Array.isArray(desde[0]) ? desde[k] : desde;
    // Un solo trazo (la punta se repasa): al trazarse, la punta sale al final.
    const curva = vertical
      ? `C${r1(x0)} ${r1((y0 + y) / 2)} ${r1(x)} ${r1((y0 + y) / 2)} ${r1(x)} ${r1(y)}L${r1(x - f)} ${r1(y - f)}L${r1(x)} ${r1(y)}L${r1(x + f)} ${r1(y - f)}`
      : `C${r1((x0 + x) / 2)} ${r1(y0)} ${r1((x0 + x) / 2)} ${r1(y)} ${r1(x)} ${r1(y)}L${r1(x - f)} ${r1(y - f)}L${r1(x)} ${r1(y)}L${r1(x - f)} ${r1(y + f)}`;
    return `<path class="abanico__flecha" data-flecha="${k}" d="M${r1(x0)} ${r1(y0)}${curva}"/>`;
  }).join('');
}

/**
 * Llave horizontal que abarca lo que hay debajo, de x0 a x1: su pico, arriba en el centro (y),
 * señala lo que lo resume, encima; sus brazos bajan en los extremos hasta y + alto. Devuelve dos
 * trazos, del pico a cada extremo, para trazarlos a la vez.
 */
export function llave({ x0, x1, y, alto = medida('--esp-6') }) {
  const xm = (x0 + x1) / 2, r = alto / 2, ym = y + r;
  const brazo = (xe, s) =>
    `<path class="llave" d="M${r1(xm)} ${r1(y)}Q${r1(xm)} ${r1(ym)} ${r1(xm + s * r)} ${r1(ym)}L${r1(xe - s * r)} ${r1(ym)}Q${r1(xe)} ${r1(ym)} ${r1(xe)} ${r1(y + alto)}"/>`;
  return brazo(x0, -1) + brazo(x1, 1);
}

/**
 * Traspaso: la flecha que lleva el resultado de un subagente hasta la ventana del agente. Un codo
 * por los puntos [[x, y], …] (esquinas --radio-s) con su punta al final, en la dirección del último
 * tramo. Un solo trazo (la punta se repasa): al trazarse, la punta sale al final.
 */
export function traspaso(puntos) {
  const f = medida('--esp-1');
  const [[ax, ay], [bx, by]] = puntos.slice(-2);
  const [ux, uy] = [Math.sign(bx - ax), Math.sign(by - ay)];
  const ala = lado => `${r1(bx - ux * f + lado * uy * f)} ${r1(by - uy * f + lado * ux * f)}`;
  return `<path class="traspaso" d="${codo(puntos)}L${ala(1)}L${r1(bx)} ${r1(by)}L${ala(-1)}"/>`;
}

/**
 * Circuito cerrado (estadio) con paradas numeradas: arriba de izquierda a derecha y
 * abajo de derecha a izquierda. La parada «actual» va en acento; el punto queda debajo
 * de las paradas y solo se ve mientras recorre la pista. data-fracciones da la posición
 * de cada parada en el camino, para recorrerCamino. Con actual: null no hay parada actual
 * ni punto: es el circuito cuando el acento está en otra parte del mapa.
 */
export function circuito({ paradas, ancho, alto, actual = 0, hechas = 0 }) {
  const parada = medida('--circuito-parada'), etiqueta = medida('--tipo-etiqueta');
  const mx = parada, my = etiqueta * 2 + parada / 2;
  const R = (alto - 2 * my) / 2, L = ancho - 2 * mx - 2 * R, P = 2 * L + 2 * Math.PI * R;
  const x0 = mx + R, arriba = my, abajo = my + 2 * R;
  const pista = `M${x0} ${arriba}H${x0 + L}A${R} ${R} 0 0 1 ${x0 + L} ${abajo}H${x0}A${R} ${R} 0 0 1 ${x0} ${arriba}Z`;
  const nArriba = Math.ceil(paradas.length / 2), nAbajo = paradas.length - nArriba;
  const lugares = paradas.map((_, i) => {
    if (i < nArriba) {
      const d = (L * (i + 0.5)) / nArriba;
      return { x: x0 + d, y: arriba, f: d / P, arriba: true };
    }
    const d = (L * (i - nArriba + 0.5)) / nAbajo;
    return { x: x0 + L - d, y: abajo, f: (L + Math.PI * R + d) / P, arriba: false };
  });
  let svg = `<path class="circuito__pista" d="${pista}"/>`;
  if (actual != null) svg += `<circle class="circuito__punto" cx="${r1(lugares[actual].x)}" cy="${r1(lugares[actual].y)}" r="${medida('--punto-diametro') / 2}"/>`;
  paradas.forEach((p, i) => {
    const { x, y } = lugares[i];
    const ly = lugares[i].arriba ? y - parada / 2 - medida('--esp-2') : y + parada / 2 + medida('--esp-2') + etiqueta;
    const estado = i === actual ? ' circuito__parada--actual' : i < hechas ? ' circuito__parada--hecha' : '';
    svg += `<g class="circuito__parada${estado}">`;
    svg += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${parada / 2}"/>`;
    svg += `<text class="circuito__numero" x="${r1(x)}" y="${r1(y)}" text-anchor="middle" dominant-baseline="central">${esc(p.id)}</text>`;
    svg += `<text class="circuito__nombre" x="${r1(x)}" y="${r1(ly)}" text-anchor="middle">${esc(p.nombre)}</text></g>`;
  });
  return `<svg class="circuito" viewBox="0 0 ${ancho} ${alto}" width="${ancho}" height="${alto}" data-fracciones="${lugares.map(l => l.f.toFixed(4)).join(',')}">${svg}</svg>`;
}

/**
 * Repetición: un icono con un anillo abierto y una flecha alrededor (sentido horario). El anillo
 * no ocupa sitio en la fila: sale del icono hasta --repeticion-diametro. Gira con el efecto girar.
 */
export function repeticion(nombreIcono) {
  // El radio deja sitio a la punta de la flecha: todo cabe en --repeticion-diametro.
  const D = medida('--repeticion-diametro'), c = D / 2, f = medida('--esp-1'), r = c - f;
  const punto = grados => [c + r * Math.cos((grados * Math.PI) / 180), c + r * Math.sin((grados * Math.PI) / 180)];
  // De arriba (−90°) a 210°: 300° de anillo; la flecha, en el extremo, apunta en el sentido del giro.
  const [x0, y0] = punto(-90), [x1, y1] = punto(210);
  const t = [-Math.sin((210 * Math.PI) / 180), Math.cos((210 * Math.PI) / 180)], n = [Math.cos((210 * Math.PI) / 180), Math.sin((210 * Math.PI) / 180)];
  const punta = (s1, s2) => `${r1(x1 - f * t[0] + s1 * f * n[0])} ${r1(y1 - f * t[1] + s2 * f * n[1])}`;
  const svg = `<path d="M${r1(x0)} ${r1(y0)}A${r} ${r} 0 1 1 ${r1(x1)} ${r1(y1)}"/><path d="M${punta(1, 1)}L${r1(x1)} ${r1(y1)}L${punta(-1, -1)}"/>`;
  return `<span class="repeticion">${icono(nombreIcono, 'icono--s')}<svg class="repeticion__anillo" viewBox="0 0 ${D} ${D}" width="${D}" height="${D}">${svg}</svg></span>`;
}

/** Bucle del agente: círculo con flechas en sentido horario, un punto y cuatro etiquetas (arriba, derecha, abajo, izquierda). */
export function bucle({ etiquetas = [] } = {}) {
  const D = medida('--bucle-diametro'), r = D / 2, mx = medida('--esp-8') * 2, my = medida('--esp-6');
  const cx = r + mx, cy = r + my, ancho = 2 * cx, alto = 2 * cy, f = medida('--esp-2');
  let svg = `<path class="bucle__pista" d="M${cx} ${cy - r}A${r} ${r} 0 1 1 ${cx} ${cy + r}A${r} ${r} 0 1 1 ${cx} ${cy - r}"/>`;
  svg += `<path class="bucle__flecha" d="M${cx + r - f} ${cy - f}L${cx + r} ${cy}L${cx + r + f} ${cy - f}"/>`;
  svg += `<path class="bucle__flecha" d="M${cx - r - f} ${cy + f}L${cx - r} ${cy}L${cx - r + f} ${cy + f}"/>`;
  const sitios = [
    [cx, cy - r - medida('--esp-3'), 'middle'],
    [cx + r + medida('--esp-4'), cy, 'start'],
    [cx, cy + r + medida('--esp-3') + medida('--tipo-etiqueta'), 'middle'],
    [cx - r - medida('--esp-4'), cy, 'end'],
  ];
  etiquetas.forEach((texto, i) => {
    if (!texto) return;
    const [x, y, ancla] = sitios[i];
    svg += `<text class="bucle__etiqueta" x="${x}" y="${y}" text-anchor="${ancla}" dominant-baseline="${i % 2 ? 'central' : 'auto'}">${esc(texto)}</text>`;
  });
  svg += `<circle class="bucle__punto" cx="${cx}" cy="${cy - r}" r="${medida('--punto-diametro') / 2}"/>`;
  return `<svg class="bucle" viewBox="0 0 ${ancho} ${alto}" width="${ancho}" height="${alto}" data-centro="${cx} ${cy}">${svg}</svg>`;
}

/**
 * Moneda en 3D (E31): una cara delante y otra detrás, y entre ellas el canto: una banda cilíndrica
 * de segmentos alrededor del borde, del ancho de --moneda-grosor y perpendiculares a las caras, que
 * de canto se ve como una franja continua. El signo «?» es una pieza geométrica que atraviesa la
 * moneda y sobresale por las dos caras (--moneda-signo-grosor): un solo trazo (gancho, enlace curvo
 * y palo) y un punto, con dos tapas planas (SVG) y sus paredes, perpendiculares a ellas, como el canto. Nada
 * de capas apiladas casi en el mismo plano: así Chrome no parpadea al ordenarlas y el giro va
 * fluido. Por detrás, el signo se ve en espejo, como una pieza de verdad. Gira con girarMoneda.
 */
export function moneda({ segmentos = 60 } = {}) {
  const grosor = medida('--moneda-grosor'), radio = medida('--moneda-diametro') / 2;
  // Las paredes del signo, un píxel por dentro de sus tapas: si llegan a su plano, asoman como
  // líneas finas sobre el blanco.
  const fondo = medida('--moneda-signo-grosor'), paredFondo = fondo - 2, r = radio;
  const n = x => x.toFixed(2);
  // Un plano perpendicular a las caras sobre el segmento de p a q (en px desde el centro), del fondo
  // dado: canto de la moneda o pared del signo. Un píxel más ancho que el segmento: sin rendijas.
  const pared = (clase, [x1, y1], [x2, y2], alto) => {
    const largo = Math.hypot(x2 - x1, y2 - y1) + 1, angulo = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
    return `<div class="${clase}" style="width:${n(largo)}px;height:${alto}px;margin:${-alto / 2}px 0 0 ${n(-largo / 2)}px;transform:translate(${n((x1 + x2) / 2)}px, ${n((y1 + y2) / 2)}px) rotateZ(${n(angulo)}deg) rotateX(90deg)"></div>`;
  };
  const arco = (cx, cy, rr, a0, a1, partes) => Array.from({ length: partes + 1 }, (_, i) => {
    const a = a0 + ((a1 - a0) * i) / partes;
    return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)];
  });
  const paredes = (puntos, alto) => puntos.slice(1).map((q, i) => pared('moneda__pared', puntos[i], q, alto)).join('');

  // El canto de la moneda: los segmentos de su borde.
  const borde = arco(0, 0, r, 0, 2 * Math.PI, segmentos);
  const canto = borde.slice(1).map((q, i) => pared('moneda__canto', borde[i], q, grosor)).join('');

  // El signo, en proporción al radio: un solo trazo de grosor T (gancho, enlace y palo) y el punto.
  // El gancho es un arco de centro (0, C) y radio R que empieza a la izquierda, algo por debajo de su
  // centro, pasa por arriba y baja por la derecha; una curva lo enlaza con el palo, centrado debajo,
  // al que llega ya en vertical: la unión es continua, sin ángulos.
  const T = 0.17 * r, R = 0.25 * r, C = -0.22 * r, rp = 0.095 * r;
  const a0 = Math.PI - 0.2, a1 = 2 * Math.PI + 0.75;
  const fin = [R * Math.cos(a1), C + R * Math.sin(a1)], tangente = [-Math.sin(a1), Math.cos(a1)];
  const arranque = C + R + 0.1 * r, base = arranque + 0.14 * r, punto = base + 0.1 * r + rp;
  // El enlace: una curva de Bézier que sale del gancho en su dirección y llega al palo en vertical.
  const [c1, c2, s] = [[fin[0] + 0.11 * r * tangente[0], fin[1] + 0.11 * r * tangente[1]], [0, arranque - 0.09 * r], [0, arranque]];
  const bezier = u => [0, 1].map(k => (1 - u) ** 3 * fin[k] + 3 * (1 - u) ** 2 * u * c1[k] + 3 * (1 - u) * u ** 2 * c2[k] + u ** 3 * s[k]);
  // El eje del trazo, en puntos: el arco, el enlace y el palo.
  const eje = [...arco(0, C, R, a0, a1, 30), ...Array.from({ length: 14 }, (_, i) => bezier((i + 1) / 14)), [0, base]];
  // Su contorno: el eje desplazado medio trazo a cada lado, por su normal (la tangente, de los vecinos).
  const lado = signo => eje.map((p, i) => {
    const [a, b] = [eje[Math.max(0, i - 1)], eje[Math.min(eje.length - 1, i + 1)]];
    const largo = Math.hypot(b[0] - a[0], b[1] - a[1]);
    return [p[0] - (signo * T) / 2 * (b[1] - a[1]) / largo, p[1] + (signo * T) / 2 * (b[0] - a[0]) / largo];
  });
  const [izquierda, derecha] = [lado(1), lado(-1)];
  const tapa = z => `<svg class="moneda__signo" viewBox="${-r} ${-r} ${2 * r} ${2 * r}" style="transform:translateZ(${z}px)">
      <path d="M${n(R * Math.cos(a0))} ${n(C + R * Math.sin(a0))} A${n(R)} ${n(R)} 0 1 1 ${n(fin[0])} ${n(fin[1])} C${n(c1[0])} ${n(c1[1])} ${n(c2[0])} ${n(c2[1])} ${n(s[0])} ${n(s[1])} L0 ${n(base)}" style="stroke-width:${n(T)}px"/>
      <circle cx="0" cy="${n(punto)}" r="${n(rp)}"/></svg>`;
  // Las paredes: los dos lados del trazo, sus dos extremos (planos) y el contorno del punto. Además de
  // las tapas, el signo se repite pegado a cada cara: el navegador parte las tapas por los planos de
  // las paredes, y por las juntas asomaba la cara oscura en puntos sueltos.
  const signo =
    paredes(izquierda, paredFondo) + paredes(derecha, paredFondo) +
    pared('moneda__pared', izquierda[0], derecha[0], paredFondo) + pared('moneda__pared', izquierda.at(-1), derecha.at(-1), paredFondo) +
    paredes(arco(0, punto, rp, 0, 2 * Math.PI, 16), paredFondo) +
    tapa(fondo / 2) + tapa(-fondo / 2) + tapa(grosor / 2 + 0.5) + tapa(-grosor / 2 - 0.5);
  return `<div class="moneda"><div class="moneda__cuerpo">${canto}
    <div class="moneda__cara" style="transform:translateZ(${grosor / 2}px)"></div>
    <div class="moneda__cara" style="transform:rotateY(180deg) translateZ(${grosor / 2}px)"></div>${signo}</div></div>`;
}
