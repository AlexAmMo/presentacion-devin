// Capturas headless de una escena con un Chrome propio (sin ventanas), independiente del navegador
// del MCP de Playwright: así varios agentes pueden verificar a la vez sin pisarse. Necesita el
// servidor de `npm run dev` abierto (puerto 5173 por defecto) y Google Chrome instalado.
// Uso, desde la raíz del proyecto:
//   node scripts/captura.mjs E34 4                → cada paso, saltando (?estatico) y llegando animado (→)
//   node scripts/captura.mjs E34 4 --solo 2       → solo el paso 2
//   node scripts/captura.mjs E34 4 --espera 9000  → ms de espera tras pulsar → (por defecto 4000)
//   node scripts/captura.mjs E34 4 --ponente      → además, la vista de ponente de cada paso
//   node scripts/captura.mjs E34 4 --puerto 4173  → otro puerto (por ejemplo, npm run preview)
// Las capturas van a .playwright-mcp/capturas/<escena>/ (ignorado por git) y al final imprime los
// errores y avisos de consola. Saltar y llegar animando deben dar la misma imagen.
import { mkdirSync } from 'node:fs';
import { cargarPlaywright, abrir, opcion } from './navegador.mjs';

const [escena, pasosArg, ...resto] = process.argv.slice(2);
if (!/^E\d\d$/.test(escena ?? '') || !Number(pasosArg)) {
  console.error('Uso: node scripts/captura.mjs EXX <pasos> [--solo n] [--espera ms] [--ponente] [--puerto n]');
  process.exit(1);
}
const pasos = Number(pasosArg);
const solo = opcion(resto, '--solo'), espera = Number(opcion(resto, '--espera', 4000));
const ponente = resto.includes('--ponente'), base = `http://localhost:${opcion(resto, '--puerto', 5173)}/`;
const dir = `.playwright-mcp/capturas/${escena}`;
mkdirSync(dir, { recursive: true });

const { chromium } = await cargarPlaywright();
const { browser, page, errores } = await abrir(chromium);
const foto = ruta => page.screenshot({ path: ruta, type: 'jpeg', quality: 70 });
const ir = async (url, ms = 1200) => { await page.goto(url, { waitUntil: 'load' }); await page.waitForTimeout(ms); };

for (let n = 1; n <= pasos; n++) {
  if (solo && Number(solo) !== n) continue;
  // Saltando: el estado final del paso, al instante.
  await ir(`${base}?estatico#${escena}/${n}`);
  await foto(`${dir}/${escena}-${n}-salto.jpg`);
  // Llegando animado: desde el paso anterior, pulsando →.
  await ir(`${base}#${escena}/${n > 1 ? n - 1 : 1}`, 1500);
  if (n > 1) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(espera); }
  await foto(`${dir}/${escena}-${n}-animado.jpg`);
  if (ponente) { await ir(`${base}?ponente#${escena}/${n}`); await foto(`${dir}/${escena}-${n}-ponente.jpg`); }
  console.log(`${escena}/${n}: salto y animado${ponente ? ' y ponente' : ''} → ${dir}/`);
}
await browser.close();
console.log(`Errores y avisos de consola: ${errores.length}`);
errores.slice(0, 10).forEach(e => console.log('  ' + e));
