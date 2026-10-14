// Geometría de los componentes SVG del vocabulario: gráfica de líneas, dial de
// effort, temporizador, circuito, bucle del agente y camino de puntos.
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
 * Gráfica de líneas con ejes, rejilla, franja opcional y etiquetas al final de cada línea.
 * series: [{ nombre, estilo: 1 | 2 | 3 | 4 | 'acento', puntos: [[x, y], …], dy, marcar: false (sin puntos) }]
 * x, y: { min, max, log, marcas: [valores], formato: v => texto, titulo }
 */
export function grafica({ ancho, alto, x, y, series, franja, margenDerecho = medida('--esp-8') * 1.5 }) {
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
  if (franja) {
    const [a, b] = [X(franja.desde), X(franja.hasta)];
    svg += `<rect class="grafica__franja" x="${r1(a)}" y="${m.arr}" width="${r1(b - a)}" height="${r1(alto - m.abj - m.arr)}"/>`;
    svg += `<path class="grafica__franja-borde" d="M${r1(a)} ${m.arr}V${alto - m.abj}M${r1(b)} ${m.arr}V${alto - m.abj}"/>`;
    if (franja.texto) svg += `<text class="grafica__nota" x="${r1((a + b) / 2)}" y="${alto - m.abj - etiqueta * 0.8}" text-anchor="middle">${esc(franja.texto)}</text>`;
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
  for (const serie of series) {
    const pts = serie.puntos.map(([a, b]) => [r1(X(a)), r1(Y(b))]);
    const [ux, uy] = pts.at(-1);
    svg += `<g class="grafica__serie grafica__serie--${serie.estilo}">`;
    svg += `<path class="grafica__linea" d="M${pts.map(p => p.join(' ')).join('L')}"/>`;
    if (serie.marcar !== false) svg += pts.map(([a, b]) => `<circle class="grafica__punto" cx="${a}" cy="${b}" r="${medida('--esp-1')}"/>`).join('');
    svg += `<text class="grafica__etiqueta" x="${r1(ux + medida('--esp-3'))}" y="${r1(uy + (serie.dy ?? 0))}" dominant-baseline="central">${esc(serie.nombre)}</text>`;
    svg += '</g>';
  }
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
