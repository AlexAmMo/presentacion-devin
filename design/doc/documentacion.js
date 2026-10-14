// design-system.html · genera toda la documentación leyendo las fuentes de verdad.
// Ningún valor está copiado aquí: colores, medidas, tiempos, componentes, efectos
// y reglas se leen de design-system.css, componentes.css, motion.js, iconos.js y
// CLAUDE.md al cargar la página. El panel «Comprobaciones» avisa de lo que no cuadre.
import { gsap } from 'gsap';
import { v, s, px, esEstatico } from '../motion.js';
import { ICONOS, icono, pintarIconos } from '../iconos.js';
import { grafica, dial, temporizador, circuito } from '../dibujos.js';
import cssSistema from '../design-system.css?raw';
import cssComponentes from '../componentes.css?raw';
import jsMotion from '../motion.js?raw';
import jsDibujos from '../dibujos.js?raw';
import jsLaminas from './laminas.js?raw';
import jsDocumentacion from './documentacion.js?raw';
import htmlPagina from '../design-system.html?raw';
import mdClaude from '../../CLAUDE.md?raw';
import mdEscenas from '../../escenas.md?raw';
import { leerVariables, contarDeclaraciones, leerComponentes, leerEfectos, sinComentarios, seccionesMarkdown } from './leer.js';
import { VOCABULARIO, mapa, e23, e09 } from './laminas.js';

const $ = (q, r = document) => r.querySelector(q);
const $$ = (q, r = document) => [...r.querySelectorAll(q)];
const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const codigo = t => `<code>${esc(t)}</code>`;
// Marca como código las variables (--x, --tipo-*) y las clases con su modificador (.camino--guia).
const conCodigo = t => esc(t).replace(/(^|[^\w.-])(\.[a-z][\w-]*\*?|--[\w-]+\*?)/g, (_, antes, n) => `${antes}<code>${n}</code>`);
const sr = texto => `<span class="sr">${texto}</span>`;

const GRUPOS = leerVariables(cssSistema);
const RAIZ = GRUPOS.filter(g => g.bloque === ':root');
const NOMBRES = new Set(RAIZ.flatMap(g => g.variables.map(x => x.nombre)));
const COMPONENTES = leerComponentes(cssComponentes);
const EFECTOS = leerEfectos(jsMotion);
const REGLAS = ['Colores: solo variables', 'Cómo ampliar la paleta', 'Cómo ampliar las animaciones', 'Cómo ampliar el vocabulario', 'Cambiar un valor existente'];
const SECCIONES_CLAUDE = seccionesMarkdown(mdClaude, REGLAS);
const gruposUsados = new Set();
const grupos = (prefijo, bloque = ':root') => GRUPOS.filter(g => g.bloque === bloque && g.nombre.startsWith(prefijo)).map(g => (gruposUsados.add(g), g));
const valor = nombre => v(nombre) || '—';
// Títulos de escena de escenas.md («### E07 · Título · ~2 min»).
const ESCENAS = Object.fromEntries([...mdEscenas.matchAll(/^### (E\d\d) · ([^·\n]+)/gm)].map(m => [m[1], m[2].trim()]));
const conEscenas = texto => esc(texto).replace(/E\d\d/g, id => ESCENAS[id] ? `<abbr title="${esc(ESCENAS[id])}">${id}</abbr>` : id);

// ── Color: valor final de cualquier variable (resuelve var() y color-mix()) ──

const lienzo = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
const sonda = document.createElement('i');
sonda.style.display = 'none';
function hex(variable, dentro = document.body) {
  dentro.appendChild(sonda);
  sonda.style.color = `var(${variable})`;
  lienzo.clearRect(0, 0, 1, 1);
  lienzo.fillStyle = getComputedStyle(sonda).color;
  lienzo.fillRect(0, 0, 1, 1);
  const [r, g, b] = lienzo.getImageData(0, 0, 1, 1).data;
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
}
const luminancia = h => {
  const [r, g, b] = h.slice(1).match(/../g).map(x => {
    const c = parseInt(x, 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
/** Color calculado (rgb(), nombre…) → #RRGGBB; vacío si es transparente o no es un color. */
function colorHex(c) {
  if (!c || c === 'none' || c.startsWith('url')) return '';
  lienzo.clearRect(0, 0, 1, 1);
  lienzo.fillStyle = c;
  lienzo.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = lienzo.getImageData(0, 0, 1, 1).data;
  return a < 128 ? '' : '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
}
const contraste = (a, b) => {
  const [x, y] = [luminancia(a), luminancia(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

// ── 01 · Color ──────────────────────────────────────────────────────────────

function muestra(x, dentro) {
  const ref = x.valor.match(/^var\((--[\w-]+)\)$/);
  const final = x.nombre.startsWith('--patron') ? 'patrón' : hex(x.nombre, dentro);
  const origen = ref ? ` = ${codigo(ref[1])}` : x.valor.startsWith('color-mix') ? ' · color-mix()' : '';
  return `<div class="muestra"><i class="muestra__color" style="background:var(${x.nombre})"></i>
    <code class="muestra__nombre">${x.nombre}</code><span class="muestra__valor">${final}${origen}</span><p>${conCodigo(x.nota)}</p></div>`;
}

const SEMANTICA = () => `
  <div class="fichas">${['entrada', 'salida', 'razonamiento'].map(t => `<span class="ficha ficha--${t}">${t}</span>`).join('')}</div>
  <div style="display:flex;gap:var(--esp-4);align-items:center;flex-wrap:wrap">
    <span class="contador contador--coste">${icono('coins')}0,050<span class="contador__unidad">u.</span></span>
    <div style="display:flex;gap:var(--esp-2);align-items:center"><div class="corchete" style="height:64px"></div><div class="corchete corchete--fallo" style="height:64px"></div></div>
    <span class="etiqueta">${icono('map-pin', 'icono--s')}Etiqueta</span>
  </div>`;

function pares(dentro) {
  const sufijo = n => n.replace('--color-', '');
  const lista = [];
  for (const n of NOMBRES) {
    const m = n.match(/^--color-sobre-(.+)$/);
    if (m && NOMBRES.has(`--color-${m[1]}`)) lista.push([n, `--color-${m[1]}`, m[1] === 'acento' ? 3 : 4.5]);
    if (/^--color-.+-borde$/.test(n)) lista.push([n, '--color-fondo', 3]);
  }
  for (const t of ['--color-texto-1', '--color-texto-2', '--color-texto-3'])
    for (const f of ['--color-fondo', '--color-superficie', '--color-superficie-2']) lista.push([t, f, 4.5]);
  lista.push(['--color-acento', '--color-fondo', 3], ['--color-acento', '--color-superficie', 3], ['--color-contorno', '--color-fondo', 3],
    ['--color-cache-acierto', '--color-superficie', 3], ['--color-texto-inverso', '--color-superficie-inversa', 4.5],
    ['--color-texto-inverso-2', '--color-superficie-inversa', 4.5], ['--color-acento-sobre-oscuro', '--color-superficie-inversa', 3]);
  return lista.map(([a, b, minimo]) => {
    const r = contraste(hex(a, dentro), hex(b, dentro));
    return { texto: `${sufijo(a)} sobre ${sufijo(b)}`, a, b, minimo, r, ok: r >= minimo };
  });
}
const usoContraste = r => r >= 4.5 ? 'Cualquier texto' : r >= 3 ? 'Texto de 24 px o más y gráficos' : 'No usar para texto';
const filasContraste = lista => lista.map(p =>
  `<tr><td>${esc(p.texto)}</td><td>${codigo(p.a)} / ${codigo(p.b)}</td><td class="${p.ok ? 'ok' : 'ko'}">${icono(p.ok ? 'check' : 'x', 'icono--s')}${sr(p.ok ? 'Pasa:' : 'No pasa:')} ${p.r.toFixed(1).replace('.', ',')}:1</td><td>${p.minimo.toString().replace('.', ',')}:1</td><td>${usoContraste(p.r)}</td></tr>`).join('');

let PARES = [];
function color() {
  const destino = $('#color-grupos');
  destino.innerHTML = grupos('Color ·').map(g =>
    `<h3 class="sub">${esc(g.nombre)}</h3><div class="grid g5" data-grupo="${esc(g.nombre)}"></div>`).join('');
  $$('[data-grupo]', destino).forEach(el => {
    const g = GRUPOS.find(x => x.nombre === el.dataset.grupo && x.bloque === ':root');
    el.innerHTML = g.variables.map(x => muestra(x)).join('');
  });
  $('#color-semantica').innerHTML = SEMANTICA();
  const panel = $('#color-inverso');
  const inverso = grupos('Color ·', '.inverso');
  panel.innerHTML = `<div class="grid g5"></div><div class="semantica">${SEMANTICA()}</div>`;
  panel.firstElementChild.innerHTML = inverso.flatMap(g => g.variables).map(x => muestra(x, panel)).join('');
  const claro = pares(document.body), oscuro = pares(panel);
  PARES = [...claro, ...oscuro.map(p => ({ ...p, texto: `${p.texto} (inverso)` }))];
  $('#contraste tbody').innerHTML = filasContraste(claro);
  $('#contraste-inverso tbody').innerHTML = filasContraste(oscuro);
  // Plegado si todo pasa: los fallos ya salen en «Comprobaciones».
  const fallan = PARES.filter(p => !p.ok).length;
  $('#contraste-detalle').open = fallan > 0;
  $('#contraste-resumen').textContent = fallan ? `${fallan} de ${PARES.length} pares no llegan al mínimo` : `Los ${PARES.length} pares llegan al mínimo · ver la tabla`;
}

// ── 02 · Tipografía ─────────────────────────────────────────────────────────

const MUESTRAS_TIPO = {
  '--tipo-etiqueta': 'Parte 2 · Ventana de contexto',
  '--tipo-texto-s': 'Herramientas y subagentes',
  '--tipo-texto': 'El contexto es todo lo que el modelo lee.',
  '--tipo-entradilla': 'Una ventana grande no obliga a llenarla.',
  '--tipo-titulo-s': 'Tokens y caché',
  '--tipo-titulo': 'Ventana de contexto',
  '--tipo-titulo-xl': 'Subagentes',
  '--tipo-cifra': '184.000',
  '--tipo-cifra-xl': '92 %',
  '--tipo-mono': 'const [page, setPage] = useState(1);',
  '--tipo-mono-s': 'AGENTS.md · /compact · devin mcp add',
};
const clasesCss = new Set([...sinComentarios(cssComponentes).matchAll(/\.([a-z][\w-]*)/g)].map(m => m[1]));
function estiloDe(clase) {
  const el = document.createElement('span');
  el.className = clase;
  el.style.cssText = 'position:absolute;visibility:hidden';
  document.body.appendChild(el);
  const c = getComputedStyle(el);
  const texto = `${c.fontFamily.split(',')[0].replace(/['"]/g, '')} ${c.fontWeight} · ${parseFloat(c.fontSize)} px · interlineado ${(parseFloat(c.lineHeight) / parseFloat(c.fontSize)).toFixed(2).replace('.', ',')}${c.letterSpacing !== 'normal' ? ` · tracking ${c.letterSpacing}` : ''}`;
  el.remove();
  return texto;
}
function tipografia() {
  const [familias] = grupos('Tipografía · familias');
  $('#tipo-familias tbody').innerHTML = familias.variables.map(x => {
    const estilo = x.nombre.startsWith('--fuente') ? `font-family:var(${x.nombre})` : `font-weight:var(${x.nombre})`;
    return `<tr><td>${codigo(x.nombre)}</td><td>${esc(x.valor)}</td><td style="${estilo};font-size:var(--doc-h3)">Devin en el día a día · 0123</td><td>${conCodigo(x.nota)}</td></tr>`;
  }).join('');
  const [escala] = grupos('Tipografía · escala');
  $('#tipo-escala tbody').innerHTML = escala.variables.map(x => {
    const clase = x.nombre.slice(2);
    const existe = clasesCss.has(clase);
    return `<tr><td>${codigo(x.nombre)}</td><td>${valor(x.nombre)}</td><td>${existe ? codigo('.' + clase) : '<span class="ko">sin clase</span>'}</td><td>${existe ? estiloDe(clase) : '—'}</td><td>${conCodigo(x.nota)}</td></tr>`;
  }).join('');
  const [ajustes] = grupos('Tipografía · interlineado');
  $('#tipo-ajustes tbody').innerHTML = ajustes.variables.map(x => `<tr><td>${codigo(x.nombre)}</td><td>${esc(valor(x.nombre))}</td><td>${conCodigo(x.nota)}</td></tr>`).join('');
  const derecha = n => /cifra|mono/.test(n);
  const bloque = x => `<div><div class="tipo-mono-s" style="color:var(--color-texto-3)">${x.nombre} · ${valor(x.nombre)}</div><div class="${x.nombre.slice(2)}" style="margin-top:var(--esp-1)">${esc(MUESTRAS_TIPO[x.nombre] ?? 'Devin en el día a día')}</div></div>`;
  $('#tipo-lamina').innerHTML = figura(`<div class="lamina" data-lamina="tipografia" data-etiqueta="Tipografía · escala a tamaño real de escena">
    <div class="abs" style="left:120px;top:64px"><span class="etiqueta">Tipografía · escala a tamaño real de escena</span></div>
    <div class="abs" style="left:120px;top:150px;width:960px;display:flex;flex-direction:column;gap:20px">${escala.variables.filter(x => !derecha(x.nombre)).map(bloque).join('')}</div>
    <div class="abs" style="left:1130px;top:150px;width:670px;display:flex;flex-direction:column;gap:24px">${escala.variables.filter(x => derecha(x.nombre)).map(bloque).join('')}</div>
  </div>`);
}

// ── 03 · Espaciado y forma ──────────────────────────────────────────────────

const filaGenerica = x => `<tr><td>${codigo(x.nombre)}</td><td>${esc(valor(x.nombre))}</td><td>${conCodigo(x.nota)}</td></tr>`;
function forma() {
  const [escena] = grupos('Escena');
  const [esp] = grupos('Espaciado');
  $('#forma-espaciado').innerHTML = [...escena.variables, ...esp.variables].map(x => x.nombre.startsWith('--esp')
    ? `<div class="fila-barra"><code>${x.nombre}</code><span class="barra" style="width:var(${x.nombre})"></span><span>${valor(x.nombre)}</span><small>${esc(x.nota)}</small></div>`
    : `<div class="fila-barra"><code>${x.nombre}</code><span></span><span>${valor(x.nombre)}</span><small>${esc(x.nota)}</small></div>`).join('');
  const [radios] = grupos('Radios');
  $('#forma-radios').innerHTML = radios.variables.map(x =>
    `<div class="caja-radio" style="border-radius:var(${x.nombre})"><code>${x.nombre}</code><span>${valor(x.nombre)}</span></div>`).join('') +
    `<p class="nota">${radios.variables.map(x => `${codigo(x.nombre)} ${esc(x.nota)}`).join(' · ')}</p>`;
  const [trazos] = grupos('Trazos');
  $('#forma-trazos').innerHTML = trazos.variables.map(x => {
    let ejemplo = '';
    if (x.nombre.startsWith('--trazo')) ejemplo = `<span class="linea" style="height:var(${x.nombre})"></span>`;
    else if (/^--icono-[sml]$/.test(x.nombre)) ejemplo = `<svg class="icono" viewBox="0 0 24 24" style="width:var(${x.nombre});height:var(${x.nombre})">${ICONOS['app-window']}</svg>`;
    else if (x.nombre.startsWith('--ruta')) ejemplo = `<svg width="180" height="16"><path class="camino" d="M8 8H176"/></svg>`;
    return `<div class="fila-trazo">${ejemplo || '<span></span>'}<code>${x.nombre}</code><span>${valor(x.nombre)}</span><small>${esc(x.nota)}</small></div>`;
  }).join('');
  const [elevacion] = grupos('Elevación');
  $('#forma-elevacion').innerHTML = elevacion.variables.map(x =>
    `<div class="caja-elevacion" style="box-shadow:var(${x.nombre})"><code>${x.nombre}</code><small>${esc(x.nota)}</small></div>`).join('');
  const [opacidad] = grupos('Opacidad');
  $('#forma-opacidad').innerHTML = opacidad.variables.map(x =>
    `<div style="display:flex;gap:var(--esp-3);align-items:center"><span class="etiqueta">${icono('gauge', 'icono--s')}Normal</span><span class="etiqueta" style="opacity:var(${x.nombre})">${icono('gauge', 'icono--s')}Atenuada</span></div>
     <p class="nota">${codigo(x.nombre)} ${valor(x.nombre)} · ${conCodigo(x.nota)}</p>`).join('');
  const [medidas] = grupos('Componentes · medidas');
  $('#forma-medidas tbody').innerHTML = medidas.variables.map(filaGenerica).join('');
}

// ── 04 · Iconos ─────────────────────────────────────────────────────────────

function iconos() {
  $('#iconos-lista').innerHTML = Object.keys(ICONOS).map(n => `<div class="icono-muestra">${icono(n)}<code>${n}</code></div>`).join('');
}

// ── 05 · Vocabulario ────────────────────────────────────────────────────────

const efecto = nombre => EFECTOS.find(e => e.nombre === nombre);
function celdaMovimiento(texto = '') {
  return texto.split(' · ').map(parte => {
    const [, nombre, resto] = parte.match(/^(\w+)(.*)$/) ?? [, '', parte];
    const e = efecto(nombre);
    if (!e) return conCodigo(parte);
    const vars = e.variables.filter(n => /^--(dur|ease|escalonado)/.test(n));
    return `${codigo(nombre)}${conCodigo(resto)} <small>${vars.map(n => `${n.replace('--', '')} ${valor(n)}`).join(' · ')}</small>`;
  }).join('<br>');
}
const celdaMedidas = (texto = '') => esc(texto).replace(/--[\w-]+/g, n => `<code>${n}</code> <small>${valor(n)}</small>`);
const celdaIcono = (texto = '') => conCodigo(texto).replace(/(?<![<\/\w-])\b[a-z][a-z0-9-]*\b/g, n => ICONOS[n] ? `${icono(n, 'icono--s')}${codigo(n)}` : n);

function vocabulario() {
  $('#vocabulario-laminas').innerHTML = VOCABULARIO.map((f, i) => figura(f(`${i + 1} de ${VOCABULARIO.length}`))).join('');
  $('#ficha tbody').innerHTML = COMPONENTES.filter(c => c.tipo === 'Componente').map(c => `<tr id="ficha-${c.clases[0]}">
    <td><a class="ancla" href="#ficha-${c.clases[0]}"><b>${esc(c.nombre)}</b></a><br>${c.clases.map(x => codigo('.' + x)).join(' ')}</td>
    <td>${conCodigo(c.forma ?? '')}</td><td>${conCodigo(c.color ?? '')}</td><td>${celdaMedidas(c.medidas)}</td>
    <td>${celdaIcono(c.icono)}</td><td>${celdaMovimiento(c.movimiento)}</td><td>${conEscenas(c.escenas ?? '')}</td></tr>`).join('');
  $('#utilidades tbody').innerHTML = COMPONENTES.filter(c => c.tipo === 'Utilidad').map(c =>
    `<tr><td><b>${esc(c.nombre)}</b></td><td>${c.clases.map(x => codigo('.' + x)).join(' ')}</td><td>${conCodigo(c.uso ?? '')}</td></tr>`).join('');
}

// ── 06 · Movimiento ─────────────────────────────────────────────────────────

const fichasDemo = () => `<div class="fichas">${['Arre', 'gla', ' la', ' pagin', 'ación', '.'].map(t =>
  `<span class="ficha ficha--entrada">${t.startsWith(' ') ? '<span class="ficha__espacio">·</span>' : ''}${t.trim()}</span>`).join('')}</div>`;
const capasDemo = (n = 4) => ['entrada', 'razonamiento', 'salida', 'entrada'].slice(0, n).map((t, i) => `<div class="capa capa--${t}" style="height:${[48, 28, 20, 36][i]}px"></div>`).join('');
const recipienteDemo = (extra = '') => `<div style="position:relative"><div class="recipiente" style="width:200px;height:200px"><div class="recipiente__capas">${capasDemo()}</div></div>${extra}</div>`;
const pilaDemo = clase => `<div style="display:flex;gap:var(--esp-2);align-items:flex-end">
  <div style="width:120px;display:flex;flex-direction:column-reverse;gap:3px">${capasDemo(3)}</div>
  <div class="corchete" style="height:102px"></div>
  <div class="corchete-etiqueta${clase}" style="align-self:center">${icono('check', 'icono--s corchete-etiqueta__acierto')}${icono('x', 'icono--s corchete-etiqueta__fallo')}Caché<span class="corchete-etiqueta__detalle">5 min</span></div></div>`;
const etiquetasDemo = clase => ['Modelos', 'Effort', 'Contexto'].map((t, i) => `<span class="etiqueta${i && clase ? ' ' + clase : ''}">${t}</span>`).join('');
const herramientaDemo = `<div class="herramienta"><div class="herramienta__circulo">${icono('wrench', 'icono--l')}</div><span class="herramienta__nombre">incidencias</span></div>`;
const paradasDemo = ['Definir', 'Contexto', 'Planificar', 'Intervenir', 'Verificar', 'Hábitos'].map((nombre, i) => ({ id: String(24 + i), nombre }));
let posicionDial = 0;

const DEMOS = {
  aparecer: { html: fichasDemo, play: e => gsap.effects.aparecer($$('.ficha', e), { stagger: s('--escalonado-tokens') }) },
  desaparecer: { html: fichasDemo, play: e => gsap.effects.desaparecer($$('.ficha', e)) },
  entrarConMuelle: { html: () => `<span class="contador contador--coste">${icono('coins')}0,050<span class="contador__unidad">u.</span></span>`, play: e => gsap.effects.entrarConMuelle($('.contador', e)) },
  atenuar: { html: () => `<div style="display:flex;gap:var(--esp-2)">${etiquetasDemo()}</div>`, play: e => gsap.effects.atenuar($$('.etiqueta', e).slice(1)) },
  avivar: { html: () => `<div style="display:flex;gap:var(--esp-2)">${etiquetasDemo('atenuado')}</div>`, play: e => gsap.effects.avivar($$('.atenuado', e)) },
  caerAlRecipiente: { html: () => `<span class="ficha ficha--entrada">AGENTS.md</span>`, play: e => gsap.effects.caerAlRecipiente($('.ficha', e)) },
  apilarCapa: { html: () => recipienteDemo(), play: e => gsap.effects.apilarCapa($$('.capa', e)) },
  subirNivel: {
    html: () => recipienteDemo(`<div class="nivel" style="left:-8px;width:216px;top:186px"><span class="nivel__cifra">68 %</span></div>`),
    play: e => gsap.effects.subirNivel($('.nivel', e), { y: -150 }),
  },
  alargarCorchete: { html: () => pilaDemo(''), play: e => gsap.effects.alargarCorchete($('.corchete', e)) },
  caducarCache: { html: () => pilaDemo(''), play: e => gsap.effects.caducarCache([$('.corchete', e), $('.corchete-etiqueta', e)]) },
  subirContador: {
    html: () => `<span class="contador contador--coste">${icono('coins')}<span data-valor>0,00</span><span class="contador__unidad">u.</span></span>`,
    play: e => gsap.effects.subirContador($('[data-valor]', e), { desde: 0, hasta: 0.43, decimales: 2 }),
  },
  pulsar: { html: () => herramientaDemo, play: e => gsap.effects.pulsar($('.herramienta__circulo', e)) },
  voltear: {
    html: () => `<div class="volteo"><div class="volteo__cara">${herramientaDemo}</div><div class="volteo__dorso"><div class="definicion" style="width:520px">
      <div class="definicion__cabecera">${icono('wrench', 'icono--s')}buscar_incidencias</div>
      <div class="definicion__campo definicion__campo--resaltado"><span class="definicion__clave">Descripción</span><span class="definicion__valor">Busca incidencias abiertas de un servicio.</span></div></div></div></div>`,
    play: e => gsap.effects.voltear($('.volteo', e)),
  },
  desplegar: {
    html: () => `<div class="skill skill--plegada"><div class="skill__cuerpo"><div class="skill__titulo">${icono('puzzle')}<span class="skill__nombre">revisar-migracion</span></div>
      <div class="skill__descripcion">Revisa una migración antes de aplicarla.</div><ol class="skill__anatomia">${['cuándo', 'qué necesita', 'pasos', 'resultado'].map(t => `<li>${t}</li>`).join('')}</ol></div></div>`,
    play: e => gsap.effects.desplegar($('.skill', e)),
  },
  trazar: {
    ancha: true,
    html: () => grafica({
      ancho: 1100, alto: 300, margenDerecho: 220,
      x: { min: 1, max: 4, marcas: [1, 2, 3, 4], titulo: 'Paso' },
      y: { min: 0, max: 100, marcas: [0, 50, 100], formato: n => `${n} %`, titulo: 'Acierto' },
      series: [
        { nombre: 'Serie 1', estilo: 1, puntos: [[1, 20], [2, 45], [3, 60], [4, 64]] },
        { nombre: 'Serie 2', estilo: 2, puntos: [[1, 10], [2, 28], [3, 42], [4, 46]] },
        { nombre: 'Protagonista', estilo: 'acento', puntos: [[1, 40], [2, 70], [3, 84], [4, 88]] },
      ],
    }),
    play: e => gsap.effects.trazar($$('.grafica__linea', e)),
  },
  recorrerCamino: {
    ancha: true,
    html: () => circuito({ ancho: 1100, alto: 240, paradas: paradasDemo }),
    play: e => {
      const f = $('.circuito', e).dataset.fracciones.split(',').map(Number);
      return gsap.effects.recorrerCamino($('.circuito__punto', e), { camino: $('.circuito__pista', e), desde: f[0], hasta: f[1] });
    },
  },
  girarDial: {
    ancha: true,
    html: () => dial({ actual: posicionDial }),
    play: e => { posicionDial = (posicionDial + 1) % 5; return gsap.effects.girarDial($('.dial', e), { posicion: posicionDial }); },
    conservar: true,
  },
  agotarTemporizador: { html: () => temporizador({ segundos: 300 }), play: e => gsap.effects.agotarTemporizador($('.temporizador', e)) },
};

function movimiento() {
  const [curvas] = grupos('Movimiento · curvas');
  const filas = curvas.variables.map(x => {
    const duracion = x.nota.match(/con (--dur-[\w-]+)/)?.[1];
    return { ...x, duracion, texto: x.nota.replace(/\s*·\s*con --dur-[\w-]+/, '') };
  });
  $('#curvas').innerHTML = filas.map((x, i) => `<div class="curva"><b>${esc(x.texto)}</b>
    <span>${codigo(x.nombre)} ${valor(x.nombre)}<br>${x.duracion ? `${codigo(x.duracion)} ${valor(x.duracion)}` : '<span class="ko">sin duración</span>'}</span>
    <div class="pista"><div class="punto" data-curva="${i}"></div></div><button class="boton" data-curva="${i}" aria-label="Reproducir: ${esc(x.texto)}">Reproducir</button></div>`).join('');
  const jugar = i => {
    const punto = $(`.punto[data-curva="${i}"]`), x = filas[i];
    gsap.fromTo(punto, { x: 0 }, { x: punto.parentElement.clientWidth - punto.offsetWidth - 8, duration: esEstatico() ? 0 : s(x.duracion), ease: v(x.nombre) });
  };
  $('#curvas').addEventListener('click', e => { const b = e.target.closest('button[data-curva]'); if (b) jugar(+b.dataset.curva); });
  $('#curvas-todas').addEventListener('click', () => filas.forEach((_, i) => jugar(i)));

  const [duraciones] = grupos('Movimiento · duraciones');
  const maximo = Math.max(...duraciones.variables.map(x => s(x.nombre)));
  $('#duraciones').innerHTML = duraciones.variables.map(x =>
    `<div class="fila-barra"><code>${x.nombre}</code><span class="barra barra--tiempo" style="width:${(s(x.nombre) / maximo) * 100}%"></span><span>${valor(x.nombre)}</span><small>${esc(x.nota)}</small></div>`).join('');
  const [pausas] = grupos('Movimiento · escalonado');
  $('#pausas tbody').innerHTML = pausas.variables.map(filaGenerica).join('');

  $('#efectos').innerHTML = EFECTOS.map(e => {
    const demo = DEMOS[e.nombre];
    return `<div class="demo${demo?.ancha ? ' demo--ancha' : ''}" data-efecto="${e.nombre}">
      <div class="demo__cabecera"><h4>${codigo(e.nombre)}</h4><button class="boton" aria-label="Reproducir ${e.nombre}">Reproducir</button></div>
      <p class="nota">${esc(e.descripcion)}</p>
      <p class="nota">${e.variables.map(n => `${codigo(n)} ${valor(n)}`).join(' · ') || 'Sin variables'}</p>
      <div class="demo__escenario">${demo ? demo.html() : '<span class="ko">Sin demo</span>'}</div></div>`;
  }).join('');
  $('#efectos').addEventListener('click', ev => {
    const boton = ev.target.closest('button');
    const tarjeta = boton?.closest('[data-efecto]');
    if (!tarjeta) return;
    const demo = DEMOS[tarjeta.dataset.efecto];
    const escenario = $('.demo__escenario', tarjeta);
    if (!demo.conservar) escenario.innerHTML = demo.html();
    demo.play(escenario);
  });
  $('#modo-estatico').addEventListener('change', ev => {
    if (ev.target.checked) document.documentElement.dataset.movimiento = 'estatico';
    else delete document.documentElement.dataset.movimiento;
  });
}

// ── 07 · Reglas ─────────────────────────────────────────────────────────────

function reglas() {
  $$('[data-var]').forEach(el => { el.textContent = valor(el.dataset.var); });
  $$('[data-hex]').forEach(el => { el.textContent = hex(el.dataset.hex); });
  $('#reglas-claude').innerHTML = REGLAS.map(t => `<article class="card regla-claude"><h4 class="sub">${esc(t)}</h4>${SECCIONES_CLAUDE[t] ?? '<p class="ko">No está en CLAUDE.md</p>'}</article>`).join('');
}

// ── 08 · Aplicado ───────────────────────────────────────────────────────────

function aplicado() {
  const tramo = (texto, n) => [texto, `${String(s(n)).replace('.', ',')} s`];
  $('#aplicado-mapa').innerHTML = figura(mapa([
    tramo('Misma zona', '--dur-camara-corta'), tramo('Entre zonas', '--dur-camara'), tramo('Vista general', '--dur-camara-larga'),
  ]));
  $('#aplicado-e23').innerHTML = figura(e23());
  const { html, pasos, preparar } = e09();
  $('#aplicado-e09').innerHTML = figura(html, false);
  const marco = $('#aplicado-e09 .bf');
  let paso = 0, animacion = null;
  // Retroceder no anima: se vuelve a montar la lámina y se salta al estado del paso.
  const ir = (n, animar) => {
    animacion?.kill();
    paso = Math.max(0, Math.min(pasos.length - 1, n));
    marco.innerHTML = html;
    const b = marco.firstElementChild;
    b.style.transform = `scale(${marco.clientWidth / px('--escena-ancho')})`;
    preparar(gsap, b);
    const previos = gsap.timeline();
    pasos.slice(1, animar ? paso : paso + 1).forEach(p => p.animar(previos, b));
    previos.progress(1);
    $('[data-e09=texto]', b).textContent = pasos[paso].texto;
    $('#e09-paso').textContent = `Paso ${paso} de ${pasos.length - 1}`;
    if (animar && paso > 0) { animacion = gsap.timeline(); pasos[paso].animar(animacion, b); }
  };
  $('#e09-siguiente').addEventListener('click', () => ir(paso + 1, true));
  $('#e09-anterior').addEventListener('click', () => ir(paso - 1, false));
  $('#e09-inicio').addEventListener('click', () => ir(0, false));
  ir(Number(new URLSearchParams(location.search).get('paso')) || 0, false);
}

// ── Láminas y visor ─────────────────────────────────────────────────────────

function figura(html, abrible = true) {
  const etiqueta = html.match(/data-etiqueta="([^"]+)"/)?.[1] ?? '';
  return `<figure class="bw"><div class="bf"${abrible ? ` tabindex="0" role="button" aria-label="Ver grande: ${etiqueta}"` : ''}>${html}</div><figcaption>${esc(etiqueta)}</figcaption></figure>`;
}
// Hoja de contactos: una miniatura de cada lámina de la página, enlazada a su sitio.
function hoja() {
  $('#hoja').innerHTML = $$('main figure.bw').map(f => {
    const l = $('.lamina', f);
    f.id = `lamina-${l.dataset.lamina}`;
    return `<a class="miniatura" href="#${f.id}"><div class="bf" aria-hidden="true">${l.outerHTML}</div><span>${esc(l.dataset.etiqueta)}</span></a>`;
  }).join('');
}
function escalar() {
  const [ancho, alto] = [px('--escena-ancho'), px('--escena-alto')];
  const ro = new ResizeObserver(entradas => entradas.forEach(e => {
    const l = e.target.querySelector('.lamina');
    if (l) l.style.transform = `scale(${e.contentRect.width / ancho})`;
  }));
  $$('.bf').forEach(f => { f.style.aspectRatio = `${ancho} / ${alto}`; ro.observe(f); });
}
// Visor: diálogo modal. Mientras está abierto, el resto de la página queda inerte; al cerrarlo, el foco vuelve a la lámina.
function visor() {
  const ov = $('.visor'), escenario = $('.visor__escenario');
  const fondo = ['header.pg', 'nav.toc', 'main'].map(q => $(q));
  let grupo = [], i = 0, origen = null;
  const encajar = () => {
    const l = escenario.firstElementChild;
    if (!l) return;
    const [ancho, alto] = [px('--escena-ancho'), px('--escena-alto')];
    const k = Math.min(escenario.clientWidth / ancho, escenario.clientHeight / alto);
    l.style.transform = `translate(${(escenario.clientWidth - ancho * k) / 2}px, ${(escenario.clientHeight - alto * k) / 2}px) scale(${k})`;
  };
  const pintar = () => {
    const l = grupo[i].cloneNode(true);
    escenario.replaceChildren(l);
    $('.visor__titulo').textContent = `${l.dataset.etiqueta}  (${i + 1}/${grupo.length})`;
    encajar();
  };
  const abrir = bf => {
    origen = bf;
    grupo = $$('.bf[role=button] .lamina');
    i = grupo.indexOf($('.lamina', bf));
    ov.hidden = false;
    fondo.forEach(el => { el.inert = true; });
    document.body.style.overflow = 'hidden';
    pintar();
    $('[data-accion=cerrar]', ov).focus();
  };
  const cerrar = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    ov.hidden = true;
    fondo.forEach(el => { el.inert = false; });
    document.body.style.overflow = '';
    origen?.focus();
  };
  const pasar = n => { i = (i + n + grupo.length) % grupo.length; pintar(); };
  document.addEventListener('click', e => { const bf = e.target.closest('.bf[role=button]'); if (bf && !ov.contains(bf)) abrir(bf); });
  document.addEventListener('keydown', e => {
    const bf = e.target.closest?.('.bf[role=button]');
    if (ov.hidden) { if (bf && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); abrir(bf); } return; }
    if (e.key === ' ' && e.target.closest('button')) return; // Espacio pulsa el botón que tiene el foco
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); pasar(1); }
    else if (e.key === 'ArrowLeft') pasar(-1);
    else if (e.key === 'Escape' && !document.fullscreenElement) cerrar();
    else if (e.key === 'f' || e.key === 'F') document.fullscreenElement ? document.exitFullscreen() : ov.requestFullscreen?.();
  });
  escenario.addEventListener('click', () => pasar(1));
  $('.visor__barra').addEventListener('click', e => {
    const a = e.target.closest('button')?.dataset.accion;
    if (a === 'anterior') pasar(-1); else if (a === 'siguiente') pasar(1); else if (a === 'cerrar') cerrar(); else if (a === 'completa') ov.requestFullscreen?.();
  });
  addEventListener('resize', encajar);
  document.addEventListener('fullscreenchange', () => requestAnimationFrame(encajar));
}

// Índice: marca la sección que se está leyendo.
function indice() {
  const enlaces = new Map($$('nav.toc a').map(a => [a.hash.slice(1), a]));
  const io = new IntersectionObserver(entradas => entradas.forEach(e => {
    if (!e.isIntersecting) return;
    enlaces.forEach(a => a.removeAttribute('aria-current'));
    enlaces.get(e.target.id)?.setAttribute('aria-current', 'true');
  }), { rootMargin: '-30% 0px -65% 0px' });
  $$('section.s').forEach(sec => io.observe(sec));
}

// Acentos de una lámina: lo pintado con --color-acento (fondo, borde, anillo, texto o trazo SVG).
// Lo que se toca o queda a menos de --esp-4 cuenta como uno: la parada actual y su punto, el nivel y su cifra, una serie y su nombre.
function acentosEn(lamina) {
  const acento = hex('--color-acento', lamina);
  const es = c => colorHex(c) === acento;
  const marcados = [...lamina.querySelectorAll('*')].filter(el => {
    if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return false;
    const cs = getComputedStyle(el), padre = getComputedStyle(el.parentElement);
    const texto = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    const borde = ['Top', 'Right', 'Bottom', 'Left'].some(l => parseFloat(cs[`border${l}Width`]) > 0 && es(cs[`border${l}Color`]));
    const anillo = (cs.boxShadow.match(/rgba?\([^)]*\)/g) ?? []).some(es);
    const svg = el instanceof SVGElement && ((es(cs.fill) && !es(padre.fill)) || (es(cs.stroke) && !es(padre.stroke) && parseFloat(cs.strokeWidth) > 0));
    return es(cs.backgroundColor) || borde || anillo || svg || (texto && es(cs.color) && !es(padre.color));
  });
  const k = lamina.getBoundingClientRect().width / px('--escena-ancho'), cerca = px('--esp-4') * k;
  const distancia = (a, b) => Math.max(a.left - b.right, b.left - a.right, a.top - b.bottom, b.top - a.bottom, 0);
  const grupos = [];
  marcados.filter(el => !marcados.some(o => o !== el && o.contains(el))).forEach(el => {
    const caja = { el, r: el.getBoundingClientRect() };
    const unidos = grupos.filter(g => g.some(o => distancia(o.r, caja.r) <= cerca));
    unidos.forEach(g => grupos.splice(grupos.indexOf(g), 1));
    grupos.push([caja, ...unidos.flat()]);
  });
  return grupos.map(g => g.map(c => (c.el.getAttribute('class') ?? c.el.tagName).split(' ')[0]).join('+'));
}

// ── 00 · Comprobaciones ─────────────────────────────────────────────────────

function lineasCon(texto, patron, fichero) {
  const fuera = [];
  sinComentarios(texto).split('\n').forEach((l, n) => { if (patron.test(l)) fuera.push(`${fichero}:${n + 1} · ${l.trim().slice(0, 90)}`); });
  return fuera;
}
function comprobaciones() {
  const lista = [];
  const comprobar = (titulo, fallos, nota = '') => lista.push({ titulo, fallos, nota });
  const leidas = GRUPOS.reduce((a, g) => a + g.variables.length, 0);
  comprobar('Todas las variables de design-system.css se leen y tienen grupo',
    leidas === contarDeclaraciones(cssSistema) ? [] : [`Declaradas ${contarDeclaraciones(cssSistema)}, leídas ${leidas}: revisa que cada una esté en una sola línea y bajo un grupo «── … ──».`]);
  comprobar('Cada variable tiene su descripción', GRUPOS.flatMap(g => g.variables.filter(x => !x.nota).map(x => `${x.nombre} (${g.nombre})`)));
  comprobar('Los hex solo están en el bloque de marca',
    GRUPOS.filter(g => !g.nombre.startsWith('Color · marca')).flatMap(g => g.variables.filter(x => /#[0-9a-f]{3,8}\b/i.test(x.valor)).map(x => x.nombre)));
  comprobar('Cada grupo de variables aparece en una sección', GRUPOS.filter(g => !gruposUsados.has(g)).map(g => `${g.nombre} (${g.bloque})`));
  const colores = /#[0-9a-f]{3,8}(?![\w-])|\b(rgba?|hsla?|oklch|lab|lch)\(|:\s*(white|black|red|blue|green|gray|grey|orange|purple|yellow|pink)\b/i;
  comprobar('Un solo acento en cada lámina', $$('main .lamina').filter(l => !l.closest('.miniatura')).flatMap(l => {
    const g = acentosEn(l);
    return g.length > 1 ? [`${l.dataset.etiqueta}: ${g.length} acentos (${g.join(', ')})`] : [];
  }));
  comprobar('Ningún color escrito a mano', [
    ...lineasCon(cssComponentes, colores, 'componentes.css'), ...lineasCon(jsMotion, colores, 'motion.js'),
    ...lineasCon(jsDibujos, colores, 'dibujos.js'), ...lineasCon(jsLaminas, colores, 'doc/laminas.js'),
    ...lineasCon(jsDocumentacion.replace(/\/(?:[^/\n\\]|\\.)+\/[gimsuy]*/g, '//'), colores, 'doc/documentacion.js'),
    ...lineasCon(htmlPagina.replace(/href="#[\w-]+"/g, ''), colores, 'design-system.html'),
  ]);
  comprobar('componentes.css solo usa variables para medidas, letra y tiempos',
    lineasCon(cssComponentes, /\b\d+(\.\d+)?px\b|\b(transition|animation)\s*:/, 'componentes.css'));
  comprobar('Ninguna duración ni curva literal en motion.js',
    lineasCon(jsMotion, /\b(duration|stagger|delay)\s*:\s*(?!0\b)[\d.]|\bease\s*:\s*['"]/, 'motion.js'));
  const usadas = [
    ...[...cssComponentes.matchAll(/var\((--[\w-]+)/g)].map(m => [m[1], 'componentes.css']),
    ...[...jsMotion.matchAll(/\b(?:v|s|px)\('(--[\w-]+)'/g)].map(m => [m[1], 'motion.js']),
    ...[...jsDibujos.matchAll(/medida\('(--[\w-]+)'/g)].map(m => [m[1], 'dibujos.js']),
    ...[...jsLaminas.matchAll(/var\((--[\w-]+)/g)].map(m => [m[1], 'doc/laminas.js']),
    ...[...htmlPagina.matchAll(/var\((--[\w-]+)|data-var="(--[\w-]+)"/g)].map(m => [m[1] ?? m[2], 'design-system.html']),
    ...COMPONENTES.flatMap(c => [...`${c.medidas ?? ''} ${c.color ?? ''}`.matchAll(/--[\w-]+/g)].map(m => [m[0], `ficha de ${c.nombre}`])),
  ].filter(([n]) => !n.startsWith('--doc-'));
  comprobar('Todas las variables usadas existen', [...new Set(usadas.filter(([n]) => !NOMBRES.has(n)).map(([n, f]) => `${n} · ${f}`))]);
  const CAMPOS = ['clase', 'forma', 'color', 'medidas', 'icono', 'movimiento', 'escenas'];
  comprobar('Cada componente tiene su ficha completa', COMPONENTES.filter(c => c.tipo === 'Componente')
    .flatMap(c => CAMPOS.filter(k => !c[k]).map(k => `${c.nombre}: falta «${k}»`)));
  comprobar('Las clases de cada cabecera existen en componentes.css', COMPONENTES.flatMap(c => c.clases.filter(x => !clasesCss.has(x)).map(x => `${c.nombre}: .${x}`)));
  comprobar('Cada componente tiene su muestra en el vocabulario', COMPONENTES.filter(c => c.tipo === 'Componente' && !$(`#vocabulario .${c.clases[0]}`)).map(c => c.nombre));
  comprobar('Cada --tipo-* tiene su clase .tipo-*', [...NOMBRES].filter(n => n.startsWith('--tipo-') && !clasesCss.has(n.slice(2))));
  const registrados = Object.keys(gsap.effects);
  comprobar('Los efectos de las fichas están registrados en motion.js', COMPONENTES.flatMap(c => (c.movimiento ?? '').split(' · ')
    .map(p => p.match(/^(\w+)/)?.[1]).filter(n => n && /^[a-z]+[A-Z]?\w*$/.test(n) && !registrados.includes(n)).map(n => `${c.nombre}: ${n}`)));
  comprobar('Cada efecto registrado tiene descripción, demo y uso en alguna ficha', registrados.flatMap(n => [
    ...(efecto(n) ? [] : [`${n}: sin descripción /** … */`]),
    ...(efecto(n) && /=>|\bexport\b|\bconst\b|\/\/|[{}]/.test(efecto(n).descripcion) ? [`${n}: la descripción contiene código`] : []),
    ...(DEMOS[n] ? [] : [`${n}: sin demo`]),
    ...(COMPONENTES.some(c => new RegExp(`\\b${n}\\b`).test(c.movimiento ?? '')) ? [] : [`${n}: ninguna ficha lo usa`]),
  ]));
  comprobar('Los iconos de las fichas están guardados en iconos.js', COMPONENTES.flatMap(c =>
    [...(c.icono ?? '').matchAll(/(?:^|·\s*)([a-z][a-z0-9-]*)/g)].map(m => m[1]).filter(n => !ICONOS[n]).map(n => `${c.nombre}: ${n}`)));
  comprobar('Contraste suficiente en todos los pares', PARES.filter(p => !p.ok).map(p => `${p.texto}: ${p.r.toFixed(2)}:1 (mínimo ${p.minimo}:1)`));
  comprobar('Cada curva dice con qué duración va', [...NOMBRES].filter(n => n.startsWith('--ease-')).flatMap(n => {
    const d = RAIZ.flatMap(g => g.variables).find(x => x.nombre === n).nota.match(/con (--dur-[\w-]+)/)?.[1];
    return !d ? [`${n}: sin «con --dur-…»`] : NOMBRES.has(d) ? [] : [`${n}: ${d} no existe`];
  }));
  comprobar('Las escenas de las fichas existen en escenas.md', COMPONENTES.flatMap(c =>
    [...new Set((c.escenas ?? '').match(/E\d\d/g) ?? [])].filter(id => !ESCENAS[id]).map(id => `${c.nombre}: ${id}`)));
  comprobar('Las reglas de CLAUDE.md se encuentran', REGLAS.filter(t => !SECCIONES_CLAUDE[t]).map(t => `## ${t}`));
  const externos = performance.getEntriesByType('resource').map(r => r.name).filter(u => !u.startsWith(location.origin) && !u.startsWith('data:'));
  comprobar('Todo se carga sin conexión (sin CDN ni Google Fonts)', externos);
  return lista;
}
async function pintarComprobaciones() {
  await document.fonts.ready;
  if (!$('#comprobaciones-resumen')) return; // ?lamina=…: la página se ha sustituido por una lámina
  const lista = comprobaciones();
  const fuentes = ['300 24px Outfit', '400 24px Outfit', '500 24px Outfit', '600 24px Outfit', '400 24px "DM Mono"', '500 24px "DM Mono"'];
  lista.push({ titulo: 'Las fuentes locales están cargadas', fallos: fuentes.filter(f => !document.fonts.check(f, 'Devin 0123')) });
  const bien = lista.filter(c => !c.fallos.length).length;
  const todas = bien === lista.length;
  $('#comprobaciones-resumen').innerHTML = `${icono(todas ? 'check' : 'triangle-alert', 'icono--s')} ${bien} de ${lista.length} comprobaciones correctas${todas ? ' · ver el detalle' : ''}`;
  $('#comprobaciones-resumen').className = todas ? 'ok' : 'ko';
  $('#comprobaciones-detalle').open = !todas; // Si todo cuadra, plegado; si algo falla, abierto.
  $('#comprobaciones-lista').innerHTML = lista.map(c => `<li class="${c.fallos.length ? 'ko' : 'ok'}">${icono(c.fallos.length ? 'x' : 'check', 'icono--s')}<span>${sr(c.fallos.length ? 'Falla:' : 'Correcta:')}${esc(c.titulo)}${c.fallos.length ? `<ul>${c.fallos.map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}</span></li>`).join('');
}

// ── Arranque ────────────────────────────────────────────────────────────────

color();
tipografia();
forma();
iconos();
vocabulario();
movimiento();
reglas();
aplicado();
hoja();
pintarIconos();
escalar();
visor();
indice();
pintarComprobaciones();

// ?lamina=id → una sola lámina a 1:1, para capturas y para probar en el proyector.
const sola = new URLSearchParams(location.search).get('lamina');
if (sola) {
  const l = $$(`.lamina[data-lamina="${sola}"]`).find(x => !x.closest('.miniatura'));
  if (l) { l.style.transform = 'none'; document.body.replaceChildren(l); document.body.classList.add('solo-lamina'); }
}
