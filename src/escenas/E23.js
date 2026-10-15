// E23 · Una conversación, paso a paso. Comparte pantalla con E20–E22. La animación principal.
// Arriba a la izquierda, la gráfica del coste acumulado; a su derecha, las llamadas y el
// resultado del paso (en acento). Debajo, dos ventanas a la misma escala, «Sin caché» y
// «Con caché», con el desglose de su coste a la derecha. La de «Con caché» lleva el corchete
// de lo que se lee de caché en la llamada actual, y eso, en el color de la caché.
// Pasos: 1 los 20.000 fijos · 2 la llamada 1 · 3 las llamadas 2 a 10 · 4 variante pausa
// (desde la 5; la caché caduca en la 6) · 5 conclusiones.
// Datos: un caso de 10 llamadas que llega a unos 250.000 tokens, con las tarifas de GPT-6.1 Sol
// (las de E21). El estado de cada paso sale de las mismas cuentas que la animación: así, saltar
// a un paso y llegar animando dan lo mismo.
import { gsap } from 'gsap';
import { s, v, px } from '../../design/motion.js';
import { icono } from '../../design/iconos.js';
import { grafica } from '../../design/dibujos.js';
import { en, cabecera, crearPasos, pausa, miles, decimal } from './comun.js';

// ── Cuentas ──────────────────────────────────────────────────────────────────
// Tarifas de GPT-6.1 Sol por token (docs.devin.ai/desktop/models, nivel estándar, 15-10-2026).
const TARIFA = { input: 2e-6, write: 2.5e-6, read: 0.1e-6, output: 10e-6 };
// 20.000 tokens fijos; en cada llamada, 21.000 nuevos (el mensaje y lo que leen las herramientas)
// y 2.000 de salida, que entran en el contexto de la siguiente: en la 10, 248.000 tokens.
const FIJO = 20000, NUEVO = 21000, SALIDA = 2000;
const LLAMADAS = 10, PAUSA = 6;
const contexto = k => FIJO + NUEVO + (SALIDA + NUEVO) * (k - 1);

/** Tokens de cada tipo en la llamada k de cada variante: sin, con o pausa. */
function tokens(variante, k) {
  const output = SALIDA;
  if (variante === 'sin') return { input: contexto(k), write: 0, read: 0, output };
  if (k === 1) return { input: 0, write: contexto(1), read: 0, output };
  if (variante === 'pausa' && k === PAUSA) return { input: 0, write: contexto(k), read: 0, output };
  return { input: 0, write: SALIDA + NUEVO, read: contexto(k - 1), output };
}
/** Coste acumulado por tipo hasta la llamada n. */
function desglose(variante, n) {
  const d = { input: 0, write: 0, read: 0, output: 0 };
  for (let k = 1; k <= n; k++) for (const [t, q] of Object.entries(tokens(variante, k))) d[t] += q * TARIFA[t];
  d.total = d.input + d.write + d.read + d.output;
  return d;
}
const acumulado = (variante, n) => desglose(variante, n).total;
// Sobre los totales redondeados a milésimas (1,259 frente a 0,940: +34 %).
const milesimas = n => Math.round(n * 1000) / 1000;
const porcentaje = (a, b) => `${a > b ? '+' : '−'}${Math.round(Math.abs(milesimas(a) / milesimas(b) - 1) * 100)} %`;

// El estado al final de cada paso: llamada en curso y variante del lado «Con caché».
const ESTADOS = [
  { n: 0, con: 'con' }, { n: 0, con: 'con' }, { n: 1, con: 'con' }, { n: LLAMADAS, con: 'con' },
  { n: LLAMADAS, con: 'pausa' }, { n: LLAMADAS, con: 'pausa' },
];
// Series de la gráfica: [variante, estilo, desde qué llamada se ve, en qué pasos].
// «Con caché», en azul, como lo que se lee de caché.
const SERIES = [['sin', 1, 1, [2, 6]], ['con', 2, 1, [2, 6]], ['pausa', 3, PAUSA - 1, [4, 6]]];
const NOMBRES = { sin: 'Sin caché', con: 'Con caché', pausa: 'Con una pausa' };

// ── Composición ──────────────────────────────────────────────────────────────
// Las ventanas, a la escala de 260.000 tokens: lo que se llega a ocupar (248.000) casi las llena.
// Sin capacidad escrita: la de GPT-6.1 Sol no es esa.
const VANCHO = 1120, ESCALA = 260000;
const G = { x: 120, y: 262, ancho: 1120, alto: 306 };
const SIN = { y: 590 }, CON = { y: 740 };      // rótulo; la ventana va 40 px más abajo
const DX = 1340;                               // columna derecha

export default function ({ escena, raiz }) {
  let pasos = null;
  const hueco = () => px('--trazo-contorno');
  const borde = () => hueco() + px('--esp-1');
  const ancho = n => Math.round((n * (VANCHO - 2 * borde())) / ESCALA) - hueco();
  const $ = q => raiz.querySelector(q);
  const $$ = q => [...raiz.querySelectorAll(q)];

  // Las capas de cada ventana: lo fijo, el mensaje de la 1 y, desde la 2, la salida de la anterior
  // y lo nuevo (data-k: la llamada en la que entran).
  const normales = () => [[FIJO, 0, 'Fijo'], [NUEVO, 1], ...Array.from({ length: LLAMADAS - 1 }, (_, i) => [[SALIDA, i + 2, '', 'salida'], [NUEVO, i + 2]]).flat()];
  const capa = ([n, k, texto = '', tipo = 'entrada'], atrs = '') =>
    `<div class="capa capa--${tipo}" data-k="${k}"${atrs} style="width:${ancho(n)}px">${texto}</div>`;
  // Ancho del principio de la ventana que cubre «leido» tokens (las capas y sus huecos).
  const tramo = leido => {
    const lote = [FIJO, NUEVO, ...Array.from({ length: 2 * LLAMADAS }, (_, i) => (i % 2 ? NUEVO : SALIDA))];
    let resto = leido, w = 0, m = 0;
    for (const t of lote) { if (resto <= 0) break; w += ancho(t); resto -= t; m++; }
    return m ? w + hueco() * (m - 1) : 0;
  };
  const leidoEn = (variante, n) => (n ? tokens(variante, n).read : 0);
  const fallaEn = (variante, n) => variante === 'pausa' && n === PAUSA;
  // Si una capa del lado «Con caché» se lee de caché en la llamada n: lo de las anteriores, salvo
  // si la caché caduca.
  const cacheadaEn = (variante, n, el) => n >= 2 && !fallaEn(variante, n) && +el.dataset.k < n;
  const capasCon = () => $$('[data-lado="con"] .capa[data-k]');

  // ── Estado instantáneo ──────────────────────────────────────────────────────
  const cifra = (clave, valor) => { const el = $(`[data-d="${clave}"]`); if (el) el.textContent = decimal(valor, 3); };
  function pintarLado(lado, variante, n) {
    const d = desglose(variante, n);
    for (const t of ['input', 'write', 'read', 'output', 'total']) cifra(`${lado}-${t}`, d[t]);
  }
  function pintarVentanas(paso) {
    const { n, con } = ESTADOS[paso];
    for (const el of $$('[data-k]')) gsap.set(el, { clearProps: 'clipPath', autoAlpha: paso >= 1 && +el.dataset.k <= n ? 1 : 0 });
    for (const el of capasCon()) {
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: 'backgroundColor' });
      el.classList.toggle('capa--cacheada', cacheadaEn(con, n, el));
    }
    pintarCorchete(con, n);
  }
  function pintarCorchete(variante, n) {
    const corchete = $('.corchete'), etiqueta = $('.corchete-etiqueta');
    const leido = leidoEn(variante, n), falla = fallaEn(variante, n);
    gsap.killTweensOf([corchete, etiqueta]);
    // clearProps va aparte: en el mismo set, borraría también lo que se pone.
    gsap.set([corchete, etiqueta], { clearProps: 'opacity,visibility,clipPath' });
    gsap.set([corchete, etiqueta], { autoAlpha: leido || falla ? 1 : 0 });
    gsap.set(corchete, { width: tramo(falla ? contexto(n - 1) : leido) });
    corchete.classList.toggle('corchete--fallo', falla);
    etiqueta.classList.toggle('corchete-etiqueta--fallo', falla);
    $('[data-leido]').textContent = `${miles(leido)} tokens`;
  }
  // La serie de una variante, recortada hasta la llamada n (y desde la que se ve).
  const recorte = (desde, n) => {
    const izq = desde > 1 ? ((desde - 1) / (LLAMADAS - 1)) * 100 : -10;
    return `inset(-50% ${(1 - (n - 1) / (LLAMADAS - 1)) * 100}% -50% ${izq}%)`;
  };
  const serie = variante => $(`.grafica__serie[data-serie="${SERIES.findIndex(([v]) => v === variante)}"]`);
  function pintarSeries(paso) {
    const { n, con } = ESTADOS[paso];
    for (const [variante, , desde, [de, hasta]] of SERIES) {
      const g = serie(variante), linea = g.querySelector('.grafica__linea'), nombre = g.querySelector('.grafica__etiqueta');
      const lado = variante === 'sin' ? 'sin' : variante;
      const visible = paso >= de && paso < hasta && (lado === 'sin' || lado === 'con' || lado === con);
      const hastaN = lado === 'sin' || lado === 'con' ? (paso >= 3 ? LLAMADAS : n) : n;
      gsap.killTweensOf([g, linea, nombre]);
      gsap.set(g, { clearProps: 'opacity,visibility' });
      gsap.set(g, { autoAlpha: visible && hastaN >= 1 ? 1 : 0 });
      gsap.set(linea, { clipPath: recorte(desde, Math.max(1, hastaN)) });
      gsap.set(nombre, { autoAlpha: hastaN === LLAMADAS ? 1 : 0 });
    }
  }
  function pintar(paso) {
    const { n, con } = ESTADOS[paso];
    $('[data-llamadas]').textContent = String(n);
    pintarLado('sin', 'sin', n);
    pintarLado('con', paso >= 3 ? con : 'con', n);
    pintarVentanas(paso);
    pintarSeries(paso);
  }

  // ── Animación de una llamada ────────────────────────────────────────────────
  const dur = () => s('--dur-entrada');
  function subir(tl, clave, desde, hasta, pos) {
    const el = $(`[data-d="${clave}"]`);
    if (el && Math.abs(desde - hasta) > 1e-9) tl.subirContador(el, { desde, hasta, decimales: 3, duration: dur() }, pos);
  }
  function subirLado(tl, lado, a, b, pos) {
    for (const t of ['input', 'write', 'read', 'output', 'total']) subir(tl, `${lado}-${t}`, a[t], b[t], pos);
  }
  function extender(tl, variante, desde, a, b, pos) {
    const linea = serie(variante).querySelector('.grafica__linea');
    tl.fromTo(linea, { clipPath: recorte(desde, Math.max(1, a)) }, { clipPath: recorte(desde, b), duration: dur(), ease: 'none' }, pos);
  }
  /** La llamada k en los lados indicados: entran sus capas, sube el desglose y avanza la gráfica. */
  function llamar(tl, k, { sin = true, con = 'con' } = {}) {
    const pos = `llamada${k}-${con}-${tl.duration().toFixed(3)}`;
    tl.addLabel(pos);
    tl.subirContador($('[data-llamadas]'), { desde: k - 1, hasta: k, duration: s('--dur-micro') }, pos);
    if (sin) {
      const nuevas = $$(`[data-lado="sin"] [data-k="${k}"]`);
      tl.set(nuevas, { autoAlpha: 1 }, pos).llenarVentana(nuevas, {}, pos);
      subirLado(tl, 'sin', desglose('sin', k - 1), desglose('sin', k), pos);
      extender(tl, 'sin', 1, k - 1, k, pos);
    }
    // Sin recortarlas al construir: tras rebobinar, las de esta llamada aún se ven al empezar.
    const nuevas = $$(`[data-lado="con"] [data-k="${k}"]`);
    tl.set(nuevas, { autoAlpha: 1 }, pos).llenarVentana(nuevas, { immediateRender: false }, pos);
    subirLado(tl, 'con', desglose(con, k - 1), desglose(con, k), pos);
    extender(tl, con, SERIES.find(([v]) => v === con)[2], k - 1, k, pos);
    // El corchete: lo que se lee de caché en esta llamada (o, si caducó, discontinuo con ✕).
    const corchete = $('.corchete'), etiqueta = $('.corchete-etiqueta'), leido = leidoEn(con, k);
    const falla = fallaEn(con, k), antes = corchete.classList.contains('corchete--fallo');
    tl.set($('[data-leido]'), { textContent: `${miles(leido)} tokens` }, pos);
    // Lo que se lee de caché, en su color; si caduca, todo se vuelve a escribir y deja de estarlo.
    recolorear(tl, el => cacheadaEn(con, k - 1, el), el => cacheadaEn(con, k, el), pos);
    if (falla) {
      tl.to(corchete, { width: tramo(contexto(k - 1)), duration: dur(), ease: v('--ease-llenado') }, pos)
        .caducarCache([corchete, etiqueta], {}, pos);
    } else if (leido) {
      const anchoLeido = tramo(leido);
      if (k === 2) tl.set(corchete, { width: anchoLeido }, pos).set([corchete, etiqueta], { autoAlpha: 1 }, pos).alargarCorchete(corchete, {}, pos);
      else tl.to(corchete, { width: anchoLeido, duration: dur(), ease: v('--ease-llenado') }, pos);
      if (antes || fallaEn(con, k - 1)) {
        tl.to([corchete, etiqueta], { autoAlpha: 0, duration: s('--dur-micro'), ease: v('--ease-estado') }, pos)
          .set(corchete, { attr: { class: 'corchete' } })
          .set(etiqueta, { attr: { class: 'corchete-etiqueta' } })
          .to([corchete, etiqueta], { autoAlpha: 1, duration: s('--dur-micro'), ease: v('--ease-estado') });
      }
    }
    // La siguiente llamada empieza cuando esta ha llegado.
    tl.to({}, { duration: dur() }, pos);
  }
  /**
   * Rebobinar una llamada en el lado «Con caché»: sus capas se recogen y, a la vez, el corchete,
   * el color de la caché, el desglose y la cuenta vuelven a la llamada anterior.
   */
  function deshacer(tl, k) {
    const pos = `deshace${k}-${tl.duration().toFixed(3)}`;
    const capas = $$(`[data-lado="con"] [data-k="${k}"]`), leido = leidoEn('con', k - 1);
    tl.addLabel(pos)
      .vaciarVentana(capas, { duration: dur(), ease: v('--ease-llenado') }, pos)
      .set(capas, { autoAlpha: 0 })
      .to($('.corchete'), { width: tramo(leido), duration: dur(), ease: v('--ease-llenado') }, pos)
      .set($('[data-leido]'), { textContent: `${miles(leido)} tokens` }, pos)
      .subirContador($('[data-llamadas]'), { desde: k, hasta: k - 1, duration: s('--dur-micro') }, pos);
    recolorear(tl, el => cacheadaEn('con', k, el), el => cacheadaEn('con', k - 1, el), pos);
    subirLado(tl, 'con', desglose('con', k), desglose('con', k - 1), pos);
  }
  /** Las capas del lado «Con caché» que pasan a leerse de caché (o dejan de hacerlo) entre dos estados. */
  function recolorear(tl, antes, despues, pos) {
    const cambian = capasCon().filter(el => antes(el) !== despues(el));
    const [pasan, dejan] = [cambian.filter(despues), cambian.filter(el => !despues(el))];
    if (pasan.length) tl.cachearCapas(pasan, { duration: dur() }, pos);
    if (dejan.length) tl.cachearCapas(dejan, { cacheadas: false, duration: dur() }, pos);
  }
  function nombres(tl, variantes) {
    tl.aparecer(variantes.map(x => serie(x).querySelector('.grafica__etiqueta')), { distancia: 0 });
  }

  return {
    montar() {
      const desgloses = (lado, filas) => `<div style="display:grid;grid-template-columns:auto auto;justify-content:start;gap:var(--esp-1) var(--esp-5);align-items:baseline">
        ${filas.map(([t, clave, atrs = '']) => `<span class="tipo-etiqueta" style="color:var(--color-texto-2)"${atrs}>${t}</span><span class="tipo-mono" style="text-align:right;font-variant-numeric:var(--cifras)"${atrs}><span data-d="${lado}-${clave}">0,000</span> $</span>`).join('')}
        <span class="tipo-texto-s" style="font-weight:var(--peso-enfasis)">Total</span><span class="tipo-mono" style="text-align:right;font-weight:var(--peso-enfasis);font-variant-numeric:var(--cifras)"><span data-d="${lado}-total">0,000</span> $</span></div>`;
      const g = grafica({
        ancho: G.ancho, alto: G.alto, margenDerecho: 300,
        x: { min: 1, max: LLAMADAS, marcas: Array.from({ length: LLAMADAS }, (_, i) => i + 1), titulo: 'Llamada' },
        y: { min: 0, max: 3.2, marcas: [0, 1, 2, 3], formato: n => `${n} $`, titulo: 'Coste acumulado' },
        series: SERIES.map(([variante, estilo]) => ({
          nombre: `${NOMBRES[variante]} · ${decimal(acumulado(variante, LLAMADAS), 3)} $`, estilo, marcar: false,
          dy: { con: 10, pausa: -6 }[variante] ?? 0,
          puntos: Array.from({ length: LLAMADAS }, (_, i) => [i + 1, acumulado(variante, i + 1)]),
        })),
      });
      const rotulo = (y, texto, opciones) => en(120, y, `<p class="tipo-texto-s" style="margin:0;font-weight:var(--peso-enfasis)">${texto}</p>`, opciones);
      const resultado = (paso, hasta, cifra, apoyo, extra = {}) => en(DX, 330, `<div class="tipo-titulo" style="color:var(--color-acento);white-space:nowrap">${cifra}</div>
          <p class="tipo-etiqueta" style="margin:var(--esp-1) 0 0;color:var(--color-texto-3)">${apoyo}</p>`, { paso, hasta, orden: 20, estilo: 'width:460px', ...extra });
      const [sinN, conN, pausaN] = ['sin', 'con', 'pausa'].map(x => acumulado(x, LLAMADAS));
      const dolares = n => `${decimal(n, 2)} $`;
      // Las conclusiones, en viñetas centradas en altura en la columna derecha (de la gráfica al borde
      // de la zona segura), cada una con su icono, su frase y su cifra debajo.
      const conclusiones = filas => en(DX, G.y, `<div class="vinetas" style="width:460px;height:${px('--escena-alto') - px('--margen-y') - G.y}px">
          ${filas.map(([ic, texto, apoyo], i) => `<div class="vineta" data-paso="5" data-orden="${i + 1}">${icono(ic)}<span class="vineta__titulo">${texto}</span><span class="vineta__detalle">${apoyo}</span></div>`).join('')}</div>`);

      raiz.innerHTML =
        cabecera(escena, 1680) +
        en(G.x, G.y, g, { paso: 1 }) +

        // La columna derecha: llamadas y resultado (pasos 1–4); conclusiones (paso 5).
        en(DX, G.y, `<span class="contador">${icono('repeat')}<span data-llamadas>0</span><span class="contador__unidad">llamadas</span></span>`, { paso: 1, hasta: 5 }) +
        resultado(2, 3, porcentaje(acumulado('con', 1), acumulado('sin', 1)), `la primera llamada, con caché: ${decimal(acumulado('con', 1), 3)} $ frente a ${decimal(acumulado('sin', 1), 3)} $`) +
        resultado(3, 4, porcentaje(conN, sinN), `con caché, frente a sin caché: ${dolares(conN)} frente a ${dolares(sinN)}`) +
        resultado(4, 5, porcentaje(pausaN, conN), `con una pausa larga antes de la llamada ${PAUSA}: ${dolares(pausaN)}`) +
        conclusiones([
          ['coins', 'La caché es lo que más ahorra', `${porcentaje(conN, sinN)} en ${LLAMADAS} llamadas`],
          ['timer', 'Las pausas largas y los reinicios la desperdician', `una sola pausa: ${porcentaje(pausaN, conN)}`],
        ]) +
        // Sin caché.
        rotulo(SIN.y, 'Sin caché', { paso: 1 }) +
        en(120, SIN.y + 40, `<div class="ventana" style="width:${VANCHO}px" data-lado="sin"><div class="ventana__relleno">${normales().map(c => capa(c)).join('')}</div></div>`, { paso: 1 }) +
        en(DX, SIN.y, desgloses('sin', [['Input sin caché', 'input'], ['Output', 'output']]), { paso: 1, hasta: 5 }) +
        // Con caché.
        rotulo(CON.y, 'Con caché', { paso: 1 }) +
        en(320, CON.y - 6, `<span class="etiqueta">${icono('timer', 'icono--s')}Pausa larga antes de la llamada ${PAUSA}</span>`, { paso: 4, orden: 9 }) +
        en(120, CON.y + 40, `<div class="ventana" style="width:${VANCHO}px" data-lado="con"><div class="ventana__relleno">${normales().map(c => capa(c)).join('')}</div></div>`, { paso: 1 }) +
        en(120 + borde(), CON.y + 40 + px('--ventana-alto') + px('--esp-1'), '<div class="corchete" style="width:0"></div>') +
        en(120 + borde(), CON.y + 40 + px('--ventana-alto') + px('--esp-1') + px('--corchete-ancho') + px('--esp-1'),
          `<div class="corchete-etiqueta">${icono('check', 'icono--s corchete-etiqueta__acierto')}${icono('x', 'icono--s corchete-etiqueta__fallo')}
            <span class="corchete-etiqueta__acierto">Cache read</span><span class="corchete-etiqueta__fallo">Caché caducada: se vuelve a escribir</span>
            <span class="corchete-etiqueta__detalle corchete-etiqueta__acierto" data-leido>0 tokens</span></div>`) +
        en(DX, CON.y, desgloses('con', [['Cache write', 'write'], ['Cache read', 'read'], ['Output', 'output']]),
          { paso: 1, hasta: 5 });
      pasos = crearPasos(raiz);
      pasos.poner(0);
      pintar(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(paso);
        pintar(paso);
        return;
      }
      // Lo que entra o sale con el paso: lo anterior sale al empezar; la etiqueta de la variante
      // (grupo 9) entra al principio y el resultado (20), al final. Lo propio, a mano.
      const grupos = (desde, hasta = 99) => pasos.ordenes(paso).filter(o => o >= desde && o <= hasta).forEach(o => pasos.animar(paso, tl, { orden: o, sinSalidas: true }));
      if (paso === 1) {
        pasos.animar(1, tl, { orden: 0 });
        const fijos = $$('[data-k="0"]');
        tl.set(fijos, { autoAlpha: 1 }).llenarVentana(fijos, {}, '<');
        return;
      }
      pasos.salir(paso, tl);
      if (paso === 2) {
        tl.set([serie('sin'), serie('con')], { autoAlpha: 1 });
        llamar(tl, 1);
        grupos(20);
        return;
      }
      if (paso === 3) {
        for (let k = 2; k <= LLAMADAS; k++) llamar(tl, k);
        nombres(tl, ['sin', 'con']);
        grupos(20);
        return;
      }
      if (paso === 4) {
        // El lado «Con caché» rebobina, llamada a llamada, hasta la anterior a la pausa y sigue con ella.
        const desde = PAUSA - 1;
        for (let k = LLAMADAS; k > desde; k--) deshacer(tl, k);
        grupos(9, 19);
        const g = serie('pausa');
        tl.set(g, { autoAlpha: 1 }).set(g.querySelector('.grafica__linea'), { clipPath: recorte(desde, desde) });
        pausa(tl);
        for (let k = desde + 1; k <= LLAMADAS; k++) llamar(tl, k, { sin: false, con: 'pausa' });
        nombres(tl, ['pausa']);
        grupos(20);
        return;
      }
      // 5: la columna derecha deja paso a las conclusiones, una a una.
      pasos.ordenes(5).filter(o => o >= 1 && o < 9).forEach((o, i) => { if (i) pausa(tl); pasos.animar(5, tl, { orden: o, sinSalidas: true }); });
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
