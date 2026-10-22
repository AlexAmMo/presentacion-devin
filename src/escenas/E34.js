// E34 · Delegar, en cifras. Comparte pantalla con E20–E23, después de E23.
// Dos fases. Primera (pasos 1–3): a la izquierda, dos variantes a la misma escala, una sobre
// otra: «Él mismo» (la ventana del principal, que ya lleva 120.000 tokens) y «Con 3 subagentes»
// (la fila de los tres subagentes con su ventana pequeña y, debajo, la del orquestador; los
// resultados, en rojo, bajan por su flecha hasta ella, como en E17). En el rótulo de cada
// variante, su coste total; junto a cada ventana pequeña, el de su subagente. A la derecha, el
// contador de llamadas, la gráfica del coste acumulado con su leyenda y el resultado del paso, en
// acento. Lo que se relee de caché va en el color de la caché, como en E22 y E23; los resultados
// que vuelven al orquestador se quedan en rojo (son lo único que guarda, como en E17).
// Segunda (paso 4): cuándo no; dos filas con sus capas en tokens y, a la derecha, los tokens
// nuevos de cada una como contador y el resultado; abajo, la frase.
// Pasos: 1 la premisa · 2 mismo modelo, en reproducción continua · 3 el clic: dos subagentes en
// económico · 4 cuándo no.
// Datos: las fórmulas de E23 (tarifas de GPT-6.1 Sol; 21.000 tokens nuevos y 2.000 de salida por
// llamada, que se escriben en caché en la siguiente). El estado de cada paso sale de las mismas
// cuentas que la animación: saltar a un paso y llegar animando dan lo mismo.
import { gsap } from 'gsap';
import { s, v, px } from '../../design/motion.js';
import { icono } from '../../design/iconos.js';
import { grafica, traspaso } from '../../design/dibujos.js';
import { en, cabecera, crearPasos, peticion, decimal, marcar } from './comun.js';

// ── Cuentas ──────────────────────────────────────────────────────────────────
// Tarifas por token: cache write = 1,25 × input y cache read = 5 % del input, la proporción de
// GPT-6.1 Sol en E21 (input 2, write 2,5, read 0,1 y output 10 $ por millón). GPT-6 Luna, el nivel
// económico de E05: 0,10 $ de input y 0,50 $ de output por millón.
const tarifa = (input, output) => ({ write: input * 1.25e-6, read: input * 0.05e-6, output: output * 1e-6 });
const MODELOS = { sol: { nombre: 'GPT-6.1 Sol', tarifa: tarifa(2, 10) }, luna: { nombre: 'GPT-6 Luna', tarifa: tarifa(0.10, 0.50) } };
const FIJO = 20000, NUEVO = 21000, SALIDA = 2000;
const PREVIO = 120000;                                  // lo que el principal ya lleva: una mañana de trabajo
const MODULOS = 3, POR_MODULO = 3, IMPLEMENTAR = 6;     // tres módulos, tres llamadas cada uno y seis más después

/**
 * Una conversación, llamada a llamada, con caché: cada llamada escribe lo nuevo (y la salida de la
 * anterior), relee de caché todo lo de antes y genera su salida. «prefijo»: tokens ya cacheados al
 * empezar; «fijo»: los que se escriben en la primera llamada (instrucciones, AGENTS.md, herramientas).
 * Devuelve, por llamada: nuevos (tokens pagados a precio completo), coste, acumulado y contexto.
 */
function conversacion(llamadas, { tarifa: t }, { prefijo = 0, fijo = 0 } = {}) {
  let p = prefijo, salidaAnterior = 0, acumulado = 0;
  return llamadas.map(({ nuevo, salida }, i) => {
    const nuevos = nuevo + salidaAnterior + (i === 0 ? fijo : 0), read = p;
    const coste = nuevos * t.write + read * t.read + salida * t.output;
    acumulado += coste;
    p = read + nuevos;
    salidaAnterior = salida;
    return { nuevos, coste, acumulado, contexto: p + salida };
  });
}
const rep = (n, c) => Array.from({ length: n }, () => c);
const EXPLORAR = { nuevo: NUEVO, salida: SALIDA };
// Él mismo: nueve llamadas de investigación y seis de implementación, arrastrando lo previo.
const SOLO = conversacion([...rep(MODULOS * POR_MODULO, EXPLORAR), ...rep(IMPLEMENTAR, EXPLORAR)], MODELOS.sol, { prefijo: PREVIO });
// El orquestador: encarga (los tres encargos son su salida), recibe los tres resultados e implementa.
const ORQ = conversacion([{ nuevo: 2000, salida: 3000 }, { nuevo: MODULOS * SALIDA, salida: SALIDA }, ...rep(IMPLEMENTAR, EXPLORAR)], MODELOS.sol, { prefijo: PREVIO });
// Cada subagente escribe sus 20.000 fijos y el encargo, y hace tres llamadas; la última devuelve su resultado.
const SUB = Object.fromEntries(Object.entries(MODELOS).map(([id, m]) => [id, conversacion([{ nuevo: 1000 + NUEVO, salida: SALIDA }, EXPLORAR, EXPLORAR], m, { fijo: FIJO })]));
// Tiempo, en llamadas seguidas: él mismo, 15; con subagentes, 11 (1 encargar + 3 de los subagentes a
// la vez + 1 recibir + 6 implementar). La variante de cada paso: con qué modelo va cada subagente.
const TIEMPO_SOLO = SOLO.length, TIEMPO_SUB = 1 + POR_MODULO + 1 + IMPLEMENTAR;
const VARIANTES = { igual: ['sol', 'sol', 'sol'], tarea: ['luna', 'luna', 'sol'] };
/** Lo que cuesta cada paso de tiempo t de la variante con subagentes (0 si en t no hay llamada suya). */
function costeEn(variante, t) {
  if (t === 1) return ORQ[0].coste;
  if (t <= 1 + POR_MODULO) return VARIANTES[variante].reduce((a, m) => a + SUB[m][t - 2].coste, 0);
  return ORQ[t - 1 - POR_MODULO]?.coste ?? 0;
}
const acumuladoSub = (variante, t) => { let c = 0; for (let u = 1; u <= t; u++) c += costeEn(variante, u); return c; };
const totalSolo = SOLO.at(-1).acumulado, totalOrq = ORQ.at(-1).acumulado;
const totalDe = variante => acumuladoSub(variante, TIEMPO_SUB);
// Cuándo no: el principal, a 150.000 tokens, hace tres consultas triviales (lee 5.000 y devuelve 1.000)
// o las encarga a tres subagentes, cada uno con sus 20.000 fijos y el encargo.
const NO = { previo: 150000, lee: 5000, devuelve: 1000, encargo: 1000 };
const NO_SOLO = conversacion(rep(3, { nuevo: NO.lee, salida: NO.devuelve }), MODELOS.sol, { prefijo: NO.previo });
const NO_SUB = conversacion([{ nuevo: NO.encargo + NO.lee, salida: NO.devuelve }], MODELOS.sol, { fijo: FIJO });
const nuevosDe = llamadas => llamadas.reduce((a, l) => a + l.nuevos, 0);
const NO_NUEVOS = { solo: nuevosDe(NO_SOLO), subs: 3 * nuevosDe(NO_SUB) };
const NO_COSTE = { solo: NO_SOLO.at(-1).acumulado, subs: 3 * NO_SUB.at(-1).acumulado };
// Sobre los totales redondeados a milésimas, como en E23.
const milesimas = n => Math.round(n * 1000) / 1000;
const porcentaje = (a, b) => `${a > b ? '+' : '−'}${Math.round(Math.abs(milesimas(a) / milesimas(b) - 1) * 100)} %`;
const dolares = n => `${decimal(n, 3)} $`;

// ── Composición ──────────────────────────────────────────────────────────────
// Las ventanas de las dos variantes, al mismo ancho y a la misma escala: lo que llega a ocupar el
// principal (465.000 tokens, con sus quince capas de salida al ancho mínimo) casi llena la suya.
const LX = 120, VANCHO = 1000, ESCALA = 600000;
const A = { rotulo: 252, ventana: 296 };                                  // «Él mismo»
const B = { rotulo: 432, tarjetas: 476, mini: 604, orq: 752 };            // «Con 3 subagentes»
const SUB_X = [120, 464, 808], MINI_ANCHO = 232;                          // cada subagente, con su ventana (y su coste) debajo
const PASILLOS = [696, 712, 728];                                         // el tramo horizontal de cada flecha, sin cruzarse
const DX = 1160, DANCHO = 640;                                            // columna derecha
const G = { x: DX, y: 324, ancho: DANCHO, alto: 300 };
const LEYENDA_Y = 632, RESULTADO_Y = 728, FRASES_Y = 876;
// Segunda fase: otra escala (el principal, a 150.000) y las mismas columnas.
const F2 = { escala: 180000, a: { rotulo: 300, ventana: 344 }, b: { rotulo: 500, tarjetas: 544, mini: 672 }, resultado: 760, frase: 900 };
const SUBAGENTES = ['Documentar', 'Localizar', 'Analizar'];
const SERIES = [['solo', 1, TIEMPO_SOLO, 'Él mismo'], ['igual', 2, TIEMPO_SUB, 'Con 3 subagentes'], ['tarea', 3, TIEMPO_SUB, 'Con el modelo según la tarea']];
// La última llamada de cada ventana: lo de antes se relee de caché.
const ULTIMA = { solo: TIEMPO_SOLO, orq: TIEMPO_SUB, sub: POR_MODULO, 'no-solo': NO_SOLO.length, 'no-sub': 1 };

export default function ({ escena, raiz }) {
  let pasos = null;
  const hueco = () => px('--trazo-contorno');
  const borde = () => hueco() + px('--esp-1');
  const ancho = (n, escala = ESCALA) => Math.round((n * (VANCHO - 2 * borde())) / escala) - hueco();
  // Las de salida y los resultados (2.000 tokens, unos 3 px), con un ancho mínimo: así se ve su relleno dentro de su contorno.
  const anchoCapa = (n, tipo, escala) => (tipo === 'entrada' ? ancho(n, escala) : Math.max(ancho(n, escala), 3 * hueco()));
  const $ = q => raiz.querySelector(q);
  const $$ = q => [...raiz.querySelectorAll(q)];
  const dur = () => s('--dur-llamada');
  // Lo propio de la primera fase (la escena lo anima a mano): las tarjetas de los subagentes, sus
  // ventanas pequeñas y sus costes, por el envoltorio que los coloca.
  const propios = sel => $$(sel).map(el => el.closest('[data-propio]'));
  const tarjetas = () => propios('[data-propio] .subagente');
  const minis = () => propios('.ventana[data-lado="sub"]');
  const costesSub = () => propios('[data-d^="sub-"]');

  // ── Estado instantáneo ──────────────────────────────────────────────────────
  const cifra = (clave, valor, decimales = 3) => { for (const el of $$(`[data-d="${clave}"]`)) el.textContent = decimal(valor, decimales); };
  const capas = (lado, k, i) => $$(`.ventana[data-lado="${lado}"]${i != null ? `[data-i="${i}"]` : ''} .capa[data-k="${k}"]`);
  const sinResultados = lista => lista.filter(el => !el.hasAttribute('data-resultado'));
  function pintarCapas(paso) {
    for (const el of $$('.capa[data-k]')) {
      const lado = el.closest('.ventana').dataset.lado, k = +el.dataset.k, segunda = lado.startsWith('no-');
      const visible = segunda ? paso === 4 : paso === 1 ? k === 0 : paso === 2 || paso === 3;
      const cacheada = visible && (segunda || paso >= 2) && k < ULTIMA[lado] && !el.hasAttribute('data-resultado');
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: 'clipPath,backgroundColor' });
      gsap.set(el, { autoAlpha: visible ? 1 : 0 });
      el.classList.toggle('capa--cacheada', cacheada);
    }
  }
  // La serie de una variante, recortada hasta el tiempo n (sobre su propio largo).
  const recorte = (n, ultimo) => `inset(-50% ${(1 - (Math.max(1, n) - 1) / (ultimo - 1)) * 100}% -50% -10%)`;
  const serie = id => $(`.grafica__serie[data-serie="${SERIES.findIndex(([x]) => x === id)}"]`);
  function pintarSeries(paso) {
    for (const [id, , ultimo] of SERIES) {
      const g = serie(id), linea = g.querySelector('.grafica__linea');
      const visible = (paso === 2 || paso === 3) && (id !== 'tarea' || paso === 3);
      gsap.killTweensOf([g, linea]);
      gsap.set(g, { clearProps: 'opacity,visibility' });
      gsap.set(g, { autoAlpha: visible ? 1 : 0 });
      gsap.set(linea, { clipPath: recorte(visible ? ultimo : 1, ultimo) });
    }
  }
  function pintarCifras(paso) {
    const hay = paso === 2 || paso === 3, variante = paso >= 3 ? 'tarea' : 'igual';
    const subs = VARIANTES[variante].map(m => SUB[m].at(-1).acumulado);
    $('[data-llamadas]').textContent = String(hay ? TIEMPO_SOLO : 0);
    cifra('solo-total', hay ? totalSolo : 0);
    cifra('b-total', hay ? totalDe(variante) : 0);
    cifra('orq', hay ? totalOrq : 0);
    cifra('subs', hay ? subs.reduce((a, b) => a + b, 0) : 0);
    subs.forEach((c, i) => cifra(`sub-${i}`, hay ? c : 0));
    cifra('no-solo', paso === 4 ? NO_NUEVOS.solo : 0, 0);
    cifra('no-subs', paso === 4 ? NO_NUEVOS.subs : 0, 0);
  }
  function pintar(paso) {
    pintarCapas(paso);
    pintarSeries(paso);
    pintarCifras(paso);
  }

  // ── Piezas de la animación ──────────────────────────────────────────────────
  const llenar = (tl, lista, pos, opciones = {}) => { if (lista.length) tl.set(lista, { autoAlpha: 1 }, pos).llenarVentana(lista, { duration: dur(), ...opciones }, pos); };
  const cachear = (tl, lista, pos) => { const l = sinResultados(lista); if (l.length) tl.cachearCapas(l, { duration: dur() }, pos); };
  const subir = (tl, clave, desde, hasta, pos, opciones = {}) => {
    if (Math.abs(desde - hasta) < 1e-9) return;
    for (const el of $$(`[data-d="${clave}"]`)) tl.subirContador(el, { desde, hasta, decimales: 3, duration: dur(), ...opciones }, pos);
  };
  function extender(tl, id, a, b, pos, duracion = dur(), ease = v('--ease-llamada')) {
    const ultimo = SERIES.find(([x]) => x === id)[2];
    tl.fromTo(serie(id).querySelector('.grafica__linea'), { clipPath: recorte(a, ultimo) }, { clipPath: recorte(b, ultimo), duration: duracion, ease, immediateRender: false }, pos);
  }
  /** El paso de tiempo t de la primera fase: la llamada t de «Él mismo» y lo que toque en «Con 3 subagentes». */
  function tiempo(tl, t, pos) {
    tl.subirContador($('[data-llamadas]'), { desde: t - 1, hasta: t, duration: s('--dur-micro') }, pos);
    // Él mismo: entran sus capas, lo de antes pasa a caché, sube su coste y avanza su línea.
    llenar(tl, capas('solo', t), pos);
    cachear(tl, capas('solo', t - 1), pos);
    subir(tl, 'solo-total', SOLO[t - 2]?.acumulado ?? 0, SOLO[t - 1].acumulado, pos);
    extender(tl, 'solo', t - 1, t, pos);
    if (t > TIEMPO_SUB) return;
    // Con 3 subagentes.
    if (t === 1) {
      // Encargar: los tres subagentes aparecen y el orquestador hace su primera llamada.
      tl.entrarConMuelle(tarjetas(), {}, pos).aparecer(minis(), {}, pos);
      llenar(tl, capas('orq', 1), pos);
      cachear(tl, capas('orq', 0), pos);
      subir(tl, 'orq', 0, ORQ[0].acumulado, pos);
    } else if (t <= 1 + POR_MODULO) {
      // Los tres subagentes, a la vez, con el mismo modelo.
      const k = t - 1;
      if (k === 1) tl.aparecer(costesSub(), {}, pos);
      for (let i = 0; i < MODULOS; i++) {
        llenar(tl, capas('sub', k, i), pos);
        cachear(tl, capas('sub', k - 1, i), pos);
        subir(tl, `sub-${i}`, SUB.sol[k - 2]?.acumulado ?? 0, SUB.sol[k - 1].acumulado, pos);
      }
      subir(tl, 'subs', 3 * (SUB.sol[k - 2]?.acumulado ?? 0), 3 * SUB.sol[k - 1].acumulado, pos);
    } else {
      // Recibir (los resultados bajan por sus flechas) e implementar: llamadas 2 a 8 del orquestador.
      const j = t - POR_MODULO - 1;
      if (t === 2 + POR_MODULO) {
        const flechas = $$('.traspaso');
        tl.set(flechas, { autoAlpha: 1 }, pos).trazar(flechas, { duration: dur(), stagger: 0 }, pos);
      }
      llenar(tl, capas('orq', t), pos, { stagger: 0 });
      cachear(tl, capas('orq', t === 2 + POR_MODULO ? 1 : t - 1), pos);
      subir(tl, 'orq', ORQ[j - 1].acumulado, ORQ[j].acumulado, pos);
    }
    subir(tl, 'b-total', acumuladoSub('igual', t - 1), acumuladoSub('igual', t), pos);
    extender(tl, 'igual', t - 1, t, pos);
  }

  return {
    montar() {
      const capa = ([n, k, tipo, texto = ''], escala) => {
        const clase = tipo === 'resultado' ? 'capa capa--resultado' : `capa capa--${tipo}`;
        return `<div class="${clase}" data-k="${k}"${tipo === 'resultado' ? ' data-resultado' : ''} style="width:${anchoCapa(n, tipo, escala)}px">${texto}</div>`;
      };
      const ventana = (lado, lista, { escala = ESCALA, ancho: w = VANCHO, mini = false, i } = {}) =>
        `<div class="ventana${mini ? ' ventana--mini' : ''}" data-lado="${lado}"${i != null ? ` data-i="${i}"` : ''} style="width:${w}px"><div class="ventana__relleno">${lista.map(c => capa(c, escala)).join('')}</div></div>`;
      // Las capas de cada ventana: lo previo y, por llamada, la salida de la anterior y lo nuevo
      // (data-k: el tiempo en el que entran). La salida de la última llamada no se dibuja, como en E23.
      const previo = (n, texto) => [n, 0, 'entrada', texto];
      const capasSolo = [previo(PREVIO, '120K previos'), ...SOLO.flatMap((_, i) => [...(i ? [[SALIDA, i + 1, 'salida']] : []), [NUEVO, i + 1, 'entrada']])];
      const capasOrq = [previo(PREVIO, '120K previos'), [2000, 1, 'entrada'], [3000, 2 + POR_MODULO, 'salida'], ...rep(MODULOS, [SALIDA, 2 + POR_MODULO, 'resultado']),
        ...rep(IMPLEMENTAR, 0).flatMap((_, i) => [[SALIDA, 3 + POR_MODULO + i, 'salida'], [NUEVO, 3 + POR_MODULO + i, 'entrada']])];
      const capasSub = [[FIJO, 1, 'entrada'], [1000 + NUEVO, 1, 'entrada'], [SALIDA, 2, 'salida'], [NUEVO, 2, 'entrada'], [SALIDA, 3, 'salida'], [NUEVO, 3, 'entrada'], [SALIDA, 3, 'resultado']];
      const capasNoSolo = [previo(NO.previo, '150K previos'), [NO.lee, 1, 'entrada'], [NO.devuelve, 2, 'salida'], [NO.lee, 2, 'entrada'], [NO.devuelve, 3, 'salida'], [NO.lee, 3, 'entrada']];
      const capasNoSub = [[FIJO, 1, 'entrada', 'Fijo'], [NO.encargo, 1, 'entrada'], [NO.lee, 1, 'entrada'], [NO.devuelve, 1, 'resultado']];

      const tarjeta = (i, cambia) => `<div class="subagente">${icono('bot')}<div><div class="subagente__nombre">${SUBAGENTES[i]}</div>
          <div class="subagente__detalle" style="display:grid">${cambia
    ? `<span style="grid-area:1/1" data-hasta="3">${MODELOS.sol.nombre}</span><span style="grid-area:1/1" data-paso="3">${MODELOS.luna.nombre}</span>`
    : `<span style="grid-area:1/1">${MODELOS.sol.nombre}</span>`}</div></div></div>`;
      const enfasis = 'font-weight:var(--peso-enfasis)';
      const rotulo = texto => `<span class="tipo-texto-s" style="${enfasis}">${texto}</span>`;
      const total = clave => `<span class="tipo-mono" style="${enfasis};font-variant-numeric:var(--cifras)"><span data-d="${clave}">0,000</span> $</span>`;
      const fila = (izquierda, derecha = '') => `<div style="display:flex;justify-content:space-between;align-items:baseline;width:${VANCHO}px">${izquierda}${derecha}</div>`;
      const contador = (ic, clave, unidad, desde = '0') => `<span class="contador">${icono(ic)}<span${clave}>${desde}</span><span class="contador__unidad">${unidad}</span></span>`;
      const resultado = (y, paso, hasta, cifraTexto, apoyos, orden = 20) => en(DX, y, `<div class="tipo-titulo" style="color:var(--color-acento);white-space:nowrap">${cifraTexto}</div>
          ${apoyos.map(a => `<p class="tipo-etiqueta" style="margin:var(--esp-1) 0 0;color:var(--color-texto-3)">${a}</p>`).join('')}`, { paso, hasta, orden, estilo: `width:${DANCHO}px` });
      const frase = (y, texto, paso, hasta, orden) => en(LX, y, `<p class="tipo-texto-s" style="margin:0;${enfasis}">${texto}</p>`, { paso, hasta, orden, estilo: 'width:1680px' });

      // La gráfica: una línea por variante, sin nombres dentro (van en la leyenda, debajo).
      const g = grafica({
        ancho: G.ancho, alto: G.alto, margenDerecho: px('--esp-3'),
        x: { min: 1, max: TIEMPO_SOLO, marcas: [1, 5, 10, 15], titulo: 'Llamadas seguidas' },
        y: { min: 0, max: 1.7, marcas: [0, 0.5, 1, 1.5], formato: n => `${Number.isInteger(n) ? n : decimal(n, 1)} $`, titulo: 'Coste acumulado' },
        series: SERIES.map(([id, estilo, ultimo]) => ({
          nombre: '', estilo, marcar: false,
          puntos: Array.from({ length: ultimo }, (_, i) => [i + 1, id === 'solo' ? SOLO[i].acumulado : acumuladoSub(id, i + 1)]),
        })),
      });
      const leyenda = `<div class="leyenda">${SERIES.map(([id, estilo, , nombre]) =>
        `<span class="leyenda__elemento"${id === 'tarea' ? ' data-paso="3"' : ''}><span class="leyenda__muestra grafica__serie grafica__serie--${estilo}" style="background:currentColor"></span>${nombre}</span>`).join('')}</div>`;

      // Las flechas de los resultados: del final de cada ventana pequeña al principio de la del
      // orquestador, cada una por su pasillo (la primera va hacia la derecha; las otras, hacia la izquierda).
      const e1 = px('--esp-1'), miniAlto = px('--ventana-mini-alto');
      const anchoDe = lista => lista.reduce((a, [n, , tipo]) => a + anchoCapa(n, tipo) + hueco(), 0);
      const xResultadoSub = i => SUB_X[i] + borde() + anchoDe(capasSub.slice(0, -1)) + anchoCapa(SALIDA, 'resultado') / 2;
      const antesDeResultados = anchoDe(capasOrq.slice(0, 3));
      const xResultadoOrq = i => LX + borde() + antesDeResultados + i * (anchoCapa(SALIDA, 'resultado') + hueco()) + anchoCapa(SALIDA, 'resultado') / 2;
      const flechas = SUB_X.map((_, i) => traspaso([[xResultadoSub(i), B.mini + miniAlto + e1], [xResultadoSub(i), PASILLOS[i]], [xResultadoOrq(i), PASILLOS[i]], [xResultadoOrq(i), B.orq - e1]])).join('');

      const [sinTexto1, sinTexto2] = [
        `con 3 subagentes y el mismo modelo: ${dolares(totalDe('igual'))} frente a ${dolares(totalSolo)}, lo mismo`,
        `${decimal(ORQ.at(-1).contexto, 0)} frente a ${decimal(SOLO.at(-1).contexto, 0)} tokens de contexto, y en paralelo`,
      ];
      raiz.innerHTML =
        cabecera(escena, 1680) +
        `<svg style="position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible">${flechas}</svg>` +

        // ── Primera fase. Él mismo.
        en(LX, A.rotulo, fila(rotulo('Él mismo'), `<span data-paso="2" data-hasta="4">${total('solo-total')}</span>`), { paso: 1, hasta: 4 }) +
        en(LX, A.ventana, ventana('solo', capasSolo), { paso: 1, hasta: 4 }) +
        // Con 3 subagentes: el rótulo, la fila de subagentes con su ventana y su coste, y el orquestador.
        en(LX, B.rotulo, fila(rotulo('Con 3 subagentes'), `<span data-paso="2" data-hasta="4" style="display:flex;align-items:baseline;gap:var(--esp-3)">
            <span class="tipo-etiqueta" style="color:var(--color-texto-3)">orquestador <span data-d="orq">0,000</span> $ + subagentes <span data-d="subs">0,000</span> $</span>${total('b-total')}</span>`), { paso: 1, hasta: 4 }) +
        SUB_X.map((x, i) => en(x, B.tarjetas, tarjeta(i, i < 2), { paso: 2, hasta: 4, propio: true }) +
          en(x, B.mini, ventana('sub', capasSub, { ancho: MINI_ANCHO, mini: true, i }), { paso: 2, hasta: 4, propio: true }) +
          // Su coste, bajo su ventana (a la izquierda: la flecha del resultado sale por la derecha).
          en(x, B.mini + miniAlto + e1, `<span class="tipo-mono-s" style="${enfasis};line-height:var(--interlineado-mono);font-variant-numeric:var(--cifras)"><span data-d="sub-${i}">0,000</span> $</span>`,
            { paso: 2, hasta: 4, propio: true })).join('') +
        en(LX, B.orq, ventana('orq', capasOrq), { paso: 1, hasta: 4 }) +

        // Columna derecha. Paso 1: la tarea y lo que ya lleva el principal.
        en(DX, A.rotulo, peticion('Tarea', 'Investiga tres módulos pequeños y devuelve, de cada uno, qué hace, dónde se usa y qué riesgos tiene, con referencias al código.', DANCHO),
          { paso: 1, hasta: 2, efecto: 'entrarConMuelle' }) +
        en(DX, 580, `<p class="tipo-texto-s" style="margin:0">El principal ya lleva <b style="${enfasis}">${decimal(PREVIO, 0)} tokens</b> en contexto: una mañana de trabajo.</p>`,
          { paso: 1, hasta: 2, orden: 1, estilo: `width:${DANCHO}px` }) +
        // Pasos 2 y 3: el contador, la gráfica con su leyenda y el resultado.
        en(DX, A.rotulo, contador('repeat', ' data-llamadas', 'llamadas seguidas'), { paso: 2, hasta: 4 }) +
        en(G.x, G.y, g, { paso: 2, hasta: 4 }) +
        en(DX, LEYENDA_Y, leyenda, { paso: 2, hasta: 4, estilo: `width:${DANCHO}px` }) +
        resultado(RESULTADO_Y, 2, 3, porcentaje(totalDe('igual'), totalSolo), [sinTexto1, sinTexto2]) +
        resultado(RESULTADO_Y, 3, 4, porcentaje(totalDe('tarea'), totalSolo), [`con el modelo según la tarea: ${dolares(totalDe('tarea'))} frente a ${dolares(totalSolo)}`]) +
        frase(FRASES_Y, `Un subagente de tres llamadas: ${dolares(SUB.sol.at(-1).acumulado)} en medio, ${dolares(SUB.luna.at(-1).acumulado)} en económico.`, 3, 4, 21) +
        frase(FRASES_Y + 44, 'El modelo según la tarea: el que documenta no necesita el modelo que diseña.', 3, 4, 21) +

        // ── Segunda fase: cuándo no.
        en(LX, F2.a.rotulo, fila(rotulo('Él mismo'), `<span class="tipo-etiqueta" style="color:var(--color-texto-3)">el principal, a ${decimal(NO.previo, 0)} tokens</span>`), { paso: 4, orden: 0 }) +
        en(LX, F2.a.ventana, ventana('no-solo', capasNoSolo, { escala: F2.escala }), { paso: 4, orden: 0 }) +
        en(DX, F2.a.ventana + (px('--ventana-alto') - px('--contador-alto')) / 2, contador('app-window', ' data-d="no-solo"', 'tokens nuevos'), { paso: 4, orden: 0 }) +
        en(LX, F2.b.rotulo, fila(rotulo('Tres subagentes'), `<span class="tipo-etiqueta" style="color:var(--color-texto-3)">cada uno paga ${decimal(FIJO, 0)} fijos y el encargo para leer ${decimal(NO.lee, 0)}</span>`), { paso: 4, orden: 1 }) +
        SUB_X.map((x, i) => en(x, F2.b.tarjetas, tarjeta(i, false), { paso: 4, orden: 1, efecto: 'entrarConMuelle' }) +
          en(x, F2.b.mini, ventana('no-sub', capasNoSub, { escala: F2.escala, ancho: MINI_ANCHO, mini: true, i }), { paso: 4, orden: 1 })).join('') +
        en(DX, F2.b.mini + (miniAlto - px('--contador-alto')) / 2, contador('app-window', ' data-d="no-subs"', 'tokens nuevos'), { paso: 4, orden: 1 }) +
        resultado(F2.resultado, 4, null, `×${decimal(NO_COSTE.subs / NO_COSTE.solo, 1)}`, [`${dolares(NO_COSTE.subs)} frente a ${dolares(NO_COSTE.solo)}, con el mismo modelo`]) +
        frase(F2.frase, 'Delegar tiene un coste fijo por subagente: compensa cuando lo que lee es grande y lo que devuelve, pequeño.', 4, null, 21);

      // Las flechas las anima la escena.
      marcar($$('.traspaso'), 2, { hasta: 4, propio: true });
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
      const grupo = (n, orden) => pasos.animar(n, tl, { orden, sinSalidas: true });
      if (paso === 1) {
        // La premisa: las dos variantes con lo previo en su ventana; a la derecha, la tarea.
        const inicio = tl.duration();
        pasos.animar(1, tl);
        llenar(tl, [...capas('solo', 0), ...capas('orq', 0)], inicio, { duration: s('--dur-entrada') });
        return;
      }
      // Lo que acaba en este paso se va de una vez; lo propio que acaba, también.
      pasos.salir(paso, tl);
      const acaban = $$(`[data-propio][data-hasta="${paso}"]`);
      if (acaban.length) tl.desaparecer(acaban, {}, '<');
      if (paso === 2) {
        // Mismo modelo, en reproducción continua: las dos variantes a la vez, paso de tiempo a paso de tiempo.
        grupo(2, 0);
        const t0 = tl.duration();
        tl.set([serie('solo'), serie('igual')], { autoAlpha: 1 }, t0);
        for (let t = 1; t <= TIEMPO_SOLO; t++) tiempo(tl, t, t0 + (t - 1) * dur());
        tl.to({}, { duration: dur() }, t0 + (TIEMPO_SOLO - 1) * dur());
        grupo(2, 20);
        return;
      }
      if (paso === 3) {
        // El clic: dos tarjetas pulsan y cambian de modelo; sus costes se encogen, el total baja y
        // se traza la tercera línea; después, el resultado y las dos frases.
        tl.pulsar(tarjetas().slice(0, 2), {}, tl.duration());
        grupo(3, 0);
        const pos = tl.duration(), duracion = s('--dur-contador');
        const [antes, despues] = [VARIANTES.igual, VARIANTES.tarea].map(vs => vs.map(m => SUB[m].at(-1).acumulado));
        antes.forEach((c, i) => subir(tl, `sub-${i}`, c, despues[i], pos, { duration: duracion }));
        subir(tl, 'subs', antes.reduce((a, b) => a + b, 0), despues.reduce((a, b) => a + b, 0), pos, { duration: duracion });
        subir(tl, 'b-total', totalDe('igual'), totalDe('tarea'), pos, { duration: duracion });
        tl.set(serie('tarea'), { autoAlpha: 1 }, pos);
        extender(tl, 'tarea', 1, TIEMPO_SUB, pos, s('--dur-trazado-serie'), v('--ease-trazado'));
        grupo(3, 20);
        grupo(3, 21);
        return;
      }
      // 4: cuándo no. Él mismo, tres consultas seguidas; después, los tres subagentes a la vez.
      grupo(4, 0);
      let pos = tl.duration();
      llenar(tl, capas('no-solo', 0), pos);
      let nuevos = 0;
      NO_SOLO.forEach((llamada, i) => {
        pos += dur();
        llenar(tl, capas('no-solo', i + 1), pos);
        cachear(tl, capas('no-solo', i), pos);
        subir(tl, 'no-solo', nuevos, nuevos + llamada.nuevos, pos, { decimales: 0 });
        nuevos += llamada.nuevos;
      });
      tl.to({}, { duration: dur() }, pos);
      grupo(4, 1);
      pos = tl.duration();
      for (let i = 0; i < MODULOS; i++) llenar(tl, capas('no-sub', 1, i), pos, { duration: s('--dur-entrada') });
      subir(tl, 'no-subs', 0, NO_NUEVOS.subs, pos, { decimales: 0, duration: s('--dur-contador') });
      grupo(4, 20);
      grupo(4, 21);
    },

    desmontar() {
      gsap.killTweensOf(raiz.querySelectorAll('*'));
      raiz.innerHTML = '';
    },
  };
}
