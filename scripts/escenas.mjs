// Genera src/datos/escenas.js a partir de escenas.md (texto) y src/datos/mapa.js
// (posiciones, encuadres y piezas del hub). Uso: npm run escenas
// (también se ejecuta solo antes de npm run dev y npm run build).
// Si escenas.md y mapa.js no cuadran, para con un mensaje claro: no inventa nada.
import { readFileSync, writeFileSync } from 'node:fs';
import { ZONAS, POSICIONES, ENCUADRES, HUB } from '../src/datos/mapa.js';

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
let bloque = null, escena = null, paso = null;
md.split('\n').forEach((linea, i) => {
  const donde = `escenas.md:${i + 1}`;
  let m;
  if ((m = linea.match(/^## (.+)$/))) {
    const partes = m[1].split(' · ');
    bloque = /^(Apertura|Parte \d+|Cierre)$/.test(partes[0])
      ? { nombre: partes.filter(p => !p.startsWith('~')).join(' · '), corto: partes[0], minutos: minutosDe(partes) }
      : null;
    escena = paso = null;
    return;
  }
  if ((m = linea.match(/^### (E\d\d) · (.+)$/))) {
    const partes = m[2].split(' · ');
    if (!bloque) error(`${donde}: ${m[1]} está fuera de un bloque (## Apertura, ## Parte N o ## Cierre).`);
    escena = { id: m[1], titulo: partes[0], bloque: bloque?.nombre, bloqueCorto: bloque?.corto, minutos: minutosDe(partes), enHub: partes.includes('en el hub'), pasos: [] };
    if (escena.minutos == null && bloque?.minutos != null) escena.minutosBloque = bloque.minutos;
    escenas.push(escena);
    paso = null;
    return;
  }
  if (!escena) return;
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
    p.piezaAlHub = /\*\*Pieza al hub\*\*/.test(p.texto);
    p.texto = sinNegrita(p.texto);
    p.detalle = p.detalle.map(sinNegrita);
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
for (const e of conPasos) {
  const pos = POSICIONES[e.id];
  if (!pos) { error(`${e.id} no tiene posición en src/datos/mapa.js (POSICIONES).`); continue; }
  if (!ZONAS[pos.zona]) error(`${e.id}: la zona «${pos.zona}» no existe en ZONAS.`);
  if (pos.zona !== 'general' && (pos.x == null || pos.y == null)) error(`${e.id}: falta x o y en POSICIONES.`);
  if (e.enHub && pos.zona !== 'hub') error(`${e.id} dice «en el hub» en escenas.md, pero su zona en mapa.js es «${pos.zona}».`);
}
for (const id of Object.keys(POSICIONES)) if (!ids.has(id)) error(`${id} tiene posición en mapa.js, pero no está en escenas.md (o no tiene pasos).`);
for (const [ref, destino] of Object.entries(ENCUADRES)) {
  if (!existe(ref)) error(`ENCUADRES: el paso ${ref} no existe en escenas.md.`);
  if (destino !== 'general' && !(ids.has(destino) && POSICIONES[destino]?.x != null)) error(`ENCUADRES: ${ref} apunta a ${destino}, que no tiene sitio en el mapa.`);
}
const llegadas = new Map();
for (const pieza of HUB.piezas) {
  if (!existe(pieza.llega)) { error(`HUB: la pieza «${pieza.id}» llega en ${pieza.llega}, que no existe en escenas.md.`); continue; }
  if (llegadas.has(pieza.llega)) error(`HUB: dos piezas llegan en ${pieza.llega}.`);
  llegadas.set(pieza.llega, pieza);
}
for (const e of conPasos) {
  for (const p of e.pasos) {
    const ref = `${e.id}/${p.n}`, pieza = llegadas.get(ref);
    if (p.piezaAlHub && !pieza) error(`${ref} es «Pieza al hub» en escenas.md, pero ninguna pieza de HUB (mapa.js) llega en ese paso.`);
    if (pieza && !p.piezaAlHub && POSICIONES[e.id]?.zona !== 'hub') error(`HUB: «${pieza.id}» llega en ${ref}, que no es «Pieza al hub» ni ocurre en el hub.`);
  }
}

// ── Salida ──────────────────────────────────────────────────────────────────

const salida = conPasos.map(e => {
  const pos = POSICIONES[e.id] ?? {};
  const general = pos.zona === 'general';
  return {
    id: e.id, titulo: e.titulo, bloque: e.bloque, bloqueCorto: e.bloqueCorto, mensaje: e.mensaje ?? '', guion: e.guion ?? '',
    minutos: e.minutos ?? e.minutosBloque ?? null,
    zona: pos.zona, region: ZONAS[pos.zona]?.region,
    x: general ? null : pos.x, y: general ? null : pos.y, ancho, alto,
    pasos: e.pasos.map(p => {
      const ref = `${e.id}/${p.n}`, pieza = llegadas.get(ref);
      const encuadre = ENCUADRES[ref] ?? (p.piezaAlHub ? 'pieza' : p.avanzado ? 'avanzado' : null);
      return {
        n: p.n, texto: p.texto, detalle: p.detalle, avanzado: p.avanzado, detalleAvanzado: p.detalleAvanzado,
        hub: pieza?.id ?? null, viaja: Boolean(pieza && p.piezaAlHub), encuadre,
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
// Por escena: id, título, bloque, mensaje, guion, minutos previstos, zona y región, y su
// rectángulo en el mundo (x, y, ancho, alto; null en las que se ven desde la vista general).
// Por paso: n, texto, detalle (sublista o filas de tabla), avanzado ([A]: se puede saltar),
// detalleAvanzado (un detalle [A] dentro del paso), hub (pieza que entra en el hub),
// viaja (la pieza viaja desde su zona: «Pieza al hub») y encuadre propio:
// null (su escena) · 'general' · 'pieza' (zona + hub) · 'avanzado' (zoom a su fila) · id de otra escena.

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
