// Genera src/datos/escenas.js a partir de escenas.md (texto) y src/datos/mapa.js
// (zonas, encuadres y piezas del hub). Uso: npm run escenas
// (también se ejecuta solo antes de npm run dev y npm run build).
// Si escenas.md y mapa.js no cuadran, para con un mensaje claro: no inventa nada.
import { readFileSync, writeFileSync } from 'node:fs';
import { ZONAS, ZONA_DE, ENCUADRES, HUB } from '../src/datos/mapa.js';

const raiz = new URL('../', import.meta.url);
const md = readFileSync(new URL('escenas.md', raiz), 'utf8');
const css = readFileSync(new URL('design/design-system.css', raiz), 'utf8');
const errores = [];
const error = texto => errores.push(texto);

// Tamaño de escena: se lee de design-system.css, no se copia.
const variable = nombre => parseFloat(css.match(new RegExp(`${nombre}:\\s*([\\d.]+)px`))?.[1]);
const [ancho, alto] = [variable('--escena-ancho'), variable('--escena-alto')];
if (!ancho || !alto) error('No encuentro --escena-ancho o --escena-alto en design/design-system.css.');

// «~2,5 min» → 2.5
const minutosDe = partes => {
  const m = partes.map(p => p.match(/^~([\d,]+) min$/)).find(Boolean);
  return m ? parseFloat(m[1].replace(',', '.')) : null;
};

// ── Lectura de escenas.md ───────────────────────────────────────────────────

const escenas = [];
let bloque = null, escena = null, paso = null, notas = null;
md.split('\n').forEach((linea, i) => {
  const donde = `escenas.md:${i + 1}`;
  let m;
  if ((m = linea.match(/^## (.+)$/))) {
    const partes = m[1].split(' · ');
    const nombres = partes.filter(p => !p.startsWith('~'));
    // «Parte 1 · Primeros pasos»: corto «Parte 1» y título «Primeros pasos» (el de su tapa en el mapa).
    bloque = /^(Apertura|Parte \d+|Cierre)$/.test(partes[0])
      ? { nombre: nombres.join(' · '), corto: partes[0], titulo: nombres.at(-1), minutos: minutosDe(partes), escenas: 0 }
      : null;
    escena = paso = notas = null;
    return;
  }
  if ((m = linea.match(/^### (E\d\d) · (.+)$/))) {
    const partes = m[2].split(' · ');
    if (!bloque) error(`${donde}: ${m[1]} está fuera de un bloque (## Apertura, ## Parte N o ## Cierre).`);
    escena = { id: m[1], titulo: partes[0], bloque: bloque?.nombre, bloqueCorto: bloque?.corto, bloqueTitulo: bloque?.titulo, minutos: minutosDe(partes), enHub: partes.includes('en el hub'), pasos: [], deBloque: bloque };
    if (bloque) bloque.escenas++;
    escenas.push(escena);
    paso = notas = null;
    return;
  }
  if (!escena) return;
  // Notas para la vista de ponente, una por paso: «- (2) idea» y, sangrados, sus detalles «  - texto».
  if (linea === 'Notas:') { notas = escena.notas = []; paso = null; return; }
  if (notas) {
    let n;
    if ((n = linea.match(/^- \((\d+)\) (.+)$/))) { notas.push({ paso: Number(n[1]), idea: n[2], detalle: [] }); return; }
    if ((n = linea.match(/^\s+- (.+)$/)) && notas.length) { notas.at(-1).detalle.push(n[1]); return; }
    if (linea.startsWith('- ')) { error(`${donde}: cada nota de ${escena.id} empieza por su paso, «- (2) idea», y sus detalles van sangrados.`); return; }
    if (linea.trim()) notas = null;
  }
  if ((m = linea.match(/^Guion: (.+)$/))) { escena.guion = m[1].replace(/\.$/, ''); paso = null; return; }
  if ((m = linea.match(/^Mensaje: (.+)$/))) { escena.mensaje = m[1]; paso = null; return; }
  if ((m = linea.match(/^(\d+)\. (.*)$/))) {
    paso = { n: Number(m[1]), texto: m[2], detalle: [] };
    if (paso.n !== escena.pasos.length + 1) error(`${donde}: ${escena.id} salta del paso ${escena.pasos.length} al ${paso.n}.`);
    escena.pasos.push(paso);
    return;
  }
  // Dentro de un paso: líneas sangradas (sublistas, tablas) y líneas en blanco entre ellas.
  if (paso && /^\s+\S/.test(linea)) {
    const t = linea.trim();
    if (/^\|[\s|:-]+\|$/.test(t)) return;   // separador de tabla
    if (t.startsWith('|')) paso.detalle.push(t.slice(1, -1).split('|').map(c => c.trim()).join(' | '));
    else if (t.startsWith('- ')) paso.detalle.push(t.slice(2));
    else paso.texto += ` ${t}`;
    return;
  }
  if (paso && !linea.trim()) return;
  paso = null;
});

// ── Limpieza y marcas de cada paso ──────────────────────────────────────────

const sinNegrita = t => t.replace(/\*\*(.+?)\*\*/g, '$1');
for (const e of escenas) {
  for (const p of e.pasos) {
    p.avanzado = p.texto.startsWith('[A] ');
    if (p.avanzado) p.texto = p.texto.slice(4);
    p.detalleAvanzado = /\[A\]/.test(p.texto) || p.detalle.some(d => /\[A\]/.test(d));
    if (/\*\*Pieza al hub\*\*/.test(p.texto)) error(`${e.id}/${p.n}: «Pieza al hub» ya no es un paso; la pieza se coloca sola al terminar su escena (HUB.llega en mapa.js).`);
    p.texto = sinNegrita(p.texto);
    p.detalle = p.detalle.map(sinNegrita);
  }
}

// Notas de ponente: una por paso, en orden, y cortas, porque la vista nunca se desplaza.
const MAX_IDEA = 90, MAX_DETALLES = 5, MAX_DETALLE = 125;
const largo = t => t.replace(/\*\*|`/g, '').length;
for (const e of escenas.filter(x => x.pasos.length)) {
  const notas = e.notas ?? [];
  if (notas.map(n => n.paso).join() !== e.pasos.map(p => p.n).join()) error(`${e.id}: «Notas:» debe tener una nota por paso, en orden (${e.pasos.length}); tiene ${notas.map(n => n.paso).join(', ') || 'ninguna'}.`);
  for (const n of notas) {
    if (largo(n.idea) > MAX_IDEA) error(`${e.id}/${n.paso}: la idea pasa de ${MAX_IDEA} caracteres: resúmela.`);
    if (n.detalle.length > MAX_DETALLES) error(`${e.id}/${n.paso}: ${n.detalle.length} detalles; como mucho, ${MAX_DETALLES}.`);
    for (const d of n.detalle) if (largo(d) > MAX_DETALLE) error(`${e.id}/${n.paso}: «${d}» pasa de ${MAX_DETALLE} caracteres: resúmelo.`);
  }
  for (const p of e.pasos) {
    const n = notas.find(x => x.paso === p.n);
    p.idea = n?.idea ?? '';
    p.notas = n?.detalle ?? [];
  }
}

const sinPasos = escenas.filter(e => !e.pasos.length);
const conPasos = escenas.filter(e => e.pasos.length);

// ── Cruce con mapa.js ───────────────────────────────────────────────────────

const ids = new Set(conPasos.map(e => e.id));
const existe = ref => {
  const [id, n] = ref.split('/');
  const e = conPasos.find(x => x.id === id);
  return e && (n === undefined || e.pasos.some(p => p.n === Number(n)));
};
const zonaDe = id => ZONA_DE[id];
for (const e of conPasos) {
  const zona = zonaDe(e.id);
  if (!zona) { error(`${e.id} no tiene zona en src/datos/mapa.js (ZONA_DE).`); continue; }
  if (!ZONAS[zona]) { error(`${e.id}: la zona «${zona}» no existe en ZONAS.`); continue; }
  if (zona !== 'general' && (ZONAS[zona].x == null || ZONAS[zona].y == null)) error(`Zona «${zona}»: falta x o y en ZONAS.`);
  if (e.enHub && zona !== 'hub') error(`${e.id} dice «en el hub» en escenas.md, pero su zona en mapa.js es «${zona}».`);
}
for (const id of Object.keys(ZONA_DE)) if (!ids.has(id)) error(`${id} tiene zona en mapa.js, pero no está en escenas.md (o no tiene pasos).`);
for (const [ref, destino] of Object.entries(ENCUADRES)) {
  if (!existe(ref)) error(`ENCUADRES: el paso ${ref} no existe en escenas.md.`);
  if (!['general', 'portada'].includes(destino) && !(ids.has(destino) && zonaDe(destino) !== 'general')) error(`ENCUADRES: ${ref} apunta a ${destino}, que no tiene pantalla en el mapa.`);
}
// HUB.llega: una escena ('E07' → su último paso, sin animación) o un paso de una escena del hub ('E14/1', animada).
const llegadas = new Map();
for (const pieza of HUB.piezas) {
  if (!existe(pieza.llega)) { error(`HUB: la pieza «${pieza.id}» llega en ${pieza.llega}, que no existe en escenas.md.`); continue; }
  const [id, n] = pieza.llega.split('/');
  if (n !== undefined && zonaDe(id) !== 'hub') error(`HUB: «${pieza.id}» llega en el paso ${pieza.llega}, que no ocurre en el hub; indica solo la escena (${id}).`);
  const ref = n !== undefined ? pieza.llega : `${id}/${conPasos.find(x => x.id === id).pasos.length}`;
  if (llegadas.has(ref)) error(`HUB: dos piezas llegan en ${ref}.`);
  llegadas.set(ref, pieza);
}

// HUB.contextoComoVentana: pasos de escenas del hub en los que Contexto se ve como ventana.
if (!existe(HUB.aparece)) error(`HUB.aparece: el paso ${HUB.aparece} no existe en escenas.md.`);
for (const ref of HUB.contextoComoVentana ?? []) {
  if (!existe(ref)) error(`HUB.contextoComoVentana: el paso ${ref} no existe en escenas.md.`);
  else if (zonaDe(ref.split('/')[0]) !== 'hub') error(`HUB.contextoComoVentana: ${ref} no ocurre en el hub.`);
}

// ── Salida ──────────────────────────────────────────────────────────────────

const salida = conPasos.map(e => {
  const zona = zonaDe(e.id), z = ZONAS[zona] ?? {};
  const general = zona === 'general';
  // Si el bloque tiene una sola escena y ella no dice sus minutos, son los del bloque.
  const minutos = e.minutos ?? (e.deBloque?.escenas === 1 ? e.deBloque.minutos : null);
  return {
    id: e.id, titulo: e.titulo, bloque: e.bloque, bloqueCorto: e.bloqueCorto, bloqueTitulo: e.bloqueTitulo, mensaje: e.mensaje ?? '', guion: e.guion ?? '',
    minutos: minutos ?? null,
    zona, region: z.region,
    x: general ? null : z.x, y: general ? null : z.y, ancho, alto,
    pasos: e.pasos.map(p => {
      const ref = `${e.id}/${p.n}`, pieza = llegadas.get(ref);
      return {
        n: p.n, texto: p.texto, detalle: p.detalle, avanzado: p.avanzado, detalleAvanzado: p.detalleAvanzado, idea: p.idea, notas: p.notas,
        hub: pieza?.id ?? null, encuadre: ENCUADRES[ref] ?? null,
      };
    }),
  };
});

if (errores.length) {
  console.error(`npm run escenas: escenas.md y src/datos/mapa.js no cuadran.\n${errores.map(e => `  - ${e}`).join('\n')}`);
  process.exit(1);
}

const js = o => JSON.stringify(o).replace(/"(\w+)":/g, '$1: ').replace(/,(?=\w+: )/g, ', ');
const texto = `// Generado por \`npm run escenas\` a partir de escenas.md y src/datos/mapa.js. No se edita a mano:
// el texto se cambia en escenas.md, y la posición, los encuadres y las piezas del hub, en mapa.js.
//
// Por escena: id, título, bloque (nombre, corto y título de su tapa), mensaje, guion (su apartado
// del guion), minutos
// previstos, zona (su pantalla) y región (su bloque del mapa), y el rectángulo de su pantalla
// en el mundo (x, y, ancho, alto; null en las que se ven desde la vista general). Las escenas
// de una misma zona comparten pantalla.
// Por paso: n, texto, detalle (sublista o filas de tabla), avanzado ([A]: se puede saltar),
// detalleAvanzado (un detalle [A] dentro del paso), idea y notas (para la vista de ponente: lo que
// hay que decir en el paso y sus detalles), hub (pieza que entra en el hub) y
// encuadre propio: null (su pantalla) · 'general' · 'portada' · id de otra escena.

export const ESCENAS = [
${salida.map(({ pasos, ...e }) => `  {\n    ${js(e).slice(1, -1)},\n    pasos: [\n${pasos.map(p => `      ${js(p)},`).join('\n')}\n    ],\n  },`).join('\n')}
];
`;
writeFileSync(new URL('src/datos/escenas.js', raiz), texto);

const total = salida.reduce((a, e) => a + e.pasos.length, 0);
const resumen = md.match(/\|\s*\*\*Total\*\*\s*\|\s*\*\*(\d+)\*\*\s*\|\s*\*\*(\d+)\*\*/);
console.log(`src/datos/escenas.js: ${salida.length} escenas, ${total} pasos (${salida.flatMap(e => e.pasos).filter(p => p.avanzado).length} [A], ${llegadas.size} piezas al hub).`);
if (sinPasos.length) console.log(`Sin pasos, fuera del recorrido: ${sinPasos.map(e => `${e.id} (${e.titulo})`).join(', ')}.`);
if (resumen && (Number(resumen[1]) !== salida.length || Number(resumen[2]) !== total)) {
  console.warn(`Aviso: el «Resumen de tiempos» de escenas.md dice ${resumen[1]} escenas y ${resumen[2]} pasos.`);
}
