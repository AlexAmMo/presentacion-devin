// Lectura de las fuentes de verdad para design-system.html: variables
// (design-system.css), componentes (componentes.css), efectos (motion.js) y
// reglas (CLAUDE.md). La documentación no copia ningún valor: lo lee de aquí.

/** Grupos de variables: [{ nombre, bloque: ':root' | '.inverso', variables: [{ nombre, valor, nota }] }] */
export function leerVariables(css) {
  const grupos = [];
  let bloque = null, grupo = null;
  for (const linea of css.split('\n')) {
    const abre = linea.match(/^\s*(:root|\.inverso)\s*\{/);
    if (abre) { bloque = abre[1]; continue; }
    if (!bloque) continue;
    if (/^\s*\}/.test(linea)) { bloque = grupo = null; continue; }
    const cabecera = linea.match(/\/\*\s*──\s*(.+?)\s*─+\s*\*\//);
    if (cabecera) { grupo = { nombre: cabecera[1], bloque, variables: [] }; grupos.push(grupo); continue; }
    const declaracion = linea.match(/^\s*(--[\w-]+)\s*:\s*(.+?);\s*(?:\/\*\s*(.*?)\s*\*\/)?\s*$/);
    if (declaracion && grupo) grupo.variables.push({ nombre: declaracion[1], valor: declaracion[2], nota: declaracion[3] ?? '' });
  }
  return grupos;
}

/** Número de declaraciones --x: en los bloques de variables (para comprobar que se han leído todas). */
export const contarDeclaraciones = css => (css.match(/^\s*--[\w-]+\s*:/gm) ?? []).length;

/** Cabeceras de componentes.css: [{ tipo: 'Componente' | 'Utilidad', nombre, clases, clase, forma, … }] */
export function leerComponentes(css) {
  const lista = [];
  for (const m of css.matchAll(/\/\*\s*──\s*(Componente|Utilidad)\s*·\s*(.+?)\s*─+\s*\n([\s\S]*?)\*\//g)) {
    const campos = {};
    for (const linea of m[3].split('\n')) {
      const campo = linea.match(/^\s*([a-záéíóúñ]+):\s*(.+?)\s*$/i);
      if (campo) campos[campo[1].toLowerCase()] = campo[2];
    }
    const clases = (campos.clase ?? '').split('·').map(c => c.trim().replace(/^\./, '')).filter(Boolean);
    lista.push({ ...campos, tipo: m[1], nombre: m[2], clases });
  }
  return lista;
}

/** Quita los comentarios de CSS o JS para buscar valores literales. Conserva los saltos de línea, así los números de línea siguen valiendo. */
export const sinComentarios = texto => texto.replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, '')).replace(/(^|[^:'"])\/\/.*$/gm, '$1');

/** Efectos registrados en motion.js: [{ nombre, descripcion, variables }]. La descripción es el comentario justo encima de registrar(). */
export function leerEfectos(js) {
  return [...js.matchAll(/\/\*\*\s*((?:[^*]|\*(?!\/))*?)\s*\*\/\s*\nregistrar\('(\w+)'([\s\S]*?)(?=\n\/\*\*|\n\/\/ ──|$)/g)]
    .map(([, descripcion, nombre, cuerpo]) => ({
      nombre,
      descripcion: descripcion.replace(/\s*\n\s*\*\s*/g, ' '),
      // Solo las variables que el efecto lee con s(), v() o px(): no cuentan clases como `${clase}--fallo`.
      variables: [...new Set([...cuerpo.matchAll(/\b(?:s|v|px)\('(--[\w-]+)'/g)].map(m => m[1]))],
    }));
}

const enLinea = texto => texto
  .replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

/** Convierte un trozo sencillo de Markdown (párrafos y listas anidadas) en HTML. */
function markdown(lineas) {
  let html = '', parrafo = [];
  const pila = [];
  const cerrarParrafo = () => { if (parrafo.length) html += `<p>${enLinea(parrafo.join(' '))}</p>`; parrafo = []; };
  const cerrarListas = (hasta = -1) => {
    while (pila.length && pila.at(-1).sangria > hasta) html += `</li></${pila.pop().tipo}>`;
  };
  for (const linea of lineas) {
    const item = linea.match(/^(\s*)(\d+\.|-)\s+(.*)$/);
    if (item) {
      cerrarParrafo();
      const sangria = item[1].length, tipo = item[2] === '-' ? 'ul' : 'ol';
      cerrarListas(sangria);
      if (pila.length && pila.at(-1).sangria === sangria) html += `</li><li>${enLinea(item[3])}`;
      else { pila.push({ sangria, tipo }); html += `<${tipo}><li>${enLinea(item[3])}`; }
    } else if (!linea.trim()) {
      cerrarParrafo();
    } else if (pila.length && /^\s+/.test(linea)) {
      html += ` ${enLinea(linea.trim())}`;
    } else {
      cerrarListas(); parrafo.push(linea.trim());
    }
  }
  cerrarParrafo(); cerrarListas();
  return html;
}

/** Secciones «## Título» de un Markdown, convertidas a HTML. Las que no existen vuelven como null. */
export function seccionesMarkdown(md, titulos) {
  const lineas = md.split('\n');
  return Object.fromEntries(titulos.map(titulo => {
    const inicio = lineas.findIndex(l => l.trim() === `## ${titulo}`);
    if (inicio < 0) return [titulo, null];
    const fin = lineas.findIndex((l, i) => i > inicio && /^##?\s/.test(l));
    return [titulo, markdown(lineas.slice(inicio + 1, fin < 0 ? undefined : fin))];
  }));
}
