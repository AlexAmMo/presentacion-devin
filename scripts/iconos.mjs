// Regenera design/iconos.js con los iconos de Lucide que usa el proyecto.
// Uso: npm run iconos -- nombre-1 nombre-2 …   (añade iconos; sin nombres, solo regenera)
// Los nombres son los de lucide.dev. La lista vive en design/iconos.js.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const DESTINO = new URL('../design/iconos.js', import.meta.url);
const LUCIDE = new URL('../node_modules/lucide-static/', import.meta.url);

const actuales = existsSync(DESTINO)
  ? [...readFileSync(DESTINO, 'utf8').matchAll(/^ {2}'([a-z0-9-]+)':/gm)].map(m => m[1])
  : [];
const nombres = [...new Set([...actuales, ...process.argv.slice(2)])].sort();

const version = JSON.parse(readFileSync(new URL('package.json', LUCIDE), 'utf8')).version;
const entradas = nombres.map(nombre => {
  const ruta = new URL(`icons/${nombre}.svg`, LUCIDE);
  if (!existsSync(ruta)) throw new Error(`Lucide no tiene el icono «${nombre}»`);
  const interior = readFileSync(ruta, 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^[\s\S]*?<svg[\s\S]*?>/, '')
    .replace(/<\/svg>[\s\S]*$/, '')
    .replace(/\s*\n\s*/g, '')
    .replace(/\s*\/>/g, '/>');
  return `  '${nombre}': '${interior}',`;
});

writeFileSync(DESTINO, `// Iconos de Lucide v${version} (ISC · design/assets/licencias/lucide-ISC.txt).
// Generado con \`npm run iconos -- nombre\`: no se edita a mano.
// El color y el grosor van por CSS (.icono en componentes.css), nunca en atributos.

export const ICONOS = {
${entradas.join('\n')}
};

/** Devuelve el SVG del icono. Tamaño: icono--s (24), por defecto (36) o icono--l (48). */
export function icono(nombre, clase = '') {
  const interior = ICONOS[nombre];
  if (!interior) throw new Error(\`Icono sin guardar en design/iconos.js: «\${nombre}»\`);
  return \`<svg class="icono\${clase ? ' ' + clase : ''}" data-icono="\${nombre}" viewBox="0 0 24 24" aria-hidden="true">\${interior}</svg>\`;
}

/** Sustituye cada <i data-icono="nombre" class="…"> por su SVG, conservando las clases. */
export function pintarIconos(raiz = document) {
  raiz.querySelectorAll('i[data-icono]').forEach(i => {
    i.outerHTML = icono(i.dataset.icono, i.className);
  });
}
`);
console.log(`design/iconos.js · ${nombres.length} iconos de Lucide v${version}`);
