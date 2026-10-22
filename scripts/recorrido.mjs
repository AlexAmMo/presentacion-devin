// Recorre toda la ruta de la presentación en modo estático pulsando → y recoge los errores y
// avisos de consola: la comprobación rápida de que ningún paso rompe. Necesita el servidor de
// `npm run dev` abierto y Google Chrome instalado (ver scripts/navegador.mjs).
// Uso: node scripts/recorrido.mjs [--puerto 5173] [--desde E01/1]
import { cargarPlaywright, abrir, opcion } from './navegador.mjs';

const args = process.argv.slice(2);
const base = `http://localhost:${opcion(args, '--puerto', 5173)}/`, desde = opcion(args, '--desde', 'E01/1');
const { chromium } = await cargarPlaywright();
const { browser, page, errores } = await abrir(chromium);
await page.goto(`${base}?estatico#${desde}`, { waitUntil: 'load' });
await page.waitForTimeout(1500);

// Al final de un bloque, la pulsación va a la vista general sin cambiar el hash: solo se para
// cuando el hash se repite tres veces seguidas (el final de la ruta).
const vistos = [];
let anterior = '', repetidos = 0;
for (let i = 0; i < 400; i++) {
  const h = await page.evaluate(() => location.hash);
  if (h === anterior) { if (++repetidos > 2) break; } else { repetidos = 0; vistos.push(h); }
  anterior = h;
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(250);
}
await browser.close();
console.log(`Pasos visitados: ${vistos.length} · del ${vistos[0]} al ${vistos.at(-1)}`);
console.log(`Errores y avisos de consola: ${errores.length}`);
errores.slice(0, 20).forEach(e => console.log('  ' + e));
process.exit(errores.length ? 1 : 0);
