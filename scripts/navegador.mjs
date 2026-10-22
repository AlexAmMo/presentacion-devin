// Un Chrome headless propio para los scripts de verificación (captura.mjs y recorrido.mjs).
// No instala nada: toma el módulo `playwright` de la caché de npx que deja el MCP de Playwright
// (~/.npm/_npx/*/node_modules/playwright) o, si existe, el del proyecto, y abre el Google Chrome
// instalado (`channel: 'chrome'`), porque el Chromium de Playwright no está descargado.
// Sin ventanas: todo en headless, a 1920 × 1080.
import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

/** Carga `playwright` desde la caché de npx o desde node_modules; si no hay, explica qué falta. */
export async function cargarPlaywright() {
  const raiz = join(homedir(), '.npm', '_npx');
  const candidatos = existsSync(raiz)
    ? readdirSync(raiz).map(d => join(raiz, d, 'node_modules', 'playwright', 'index.mjs')).filter(existsSync)
    : [];
  for (const ruta of candidatos) {
    try { return await import(pathToFileURL(ruta).href); } catch { /* probar el siguiente */ }
  }
  try { return await import('playwright'); } catch { /* no está en el proyecto */ }
  console.error('No encuentro el módulo playwright. Lo deja el MCP de Playwright en ~/.npm/_npx al arrancar (abre una sesión con el MCP configurado en .mcp.json) o instálalo: npm i -D playwright');
  process.exit(1);
}

/** Abre el navegador y una página de 1920 × 1080 que recoge errores y avisos de consola. */
export async function abrir(chromium) {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (e) {
    console.error('No he podido abrir Google Chrome en headless. ¿Está instalado en /Applications? Detalle:', e.message.split('\n')[0]);
    process.exit(1);
  }
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const errores = [];
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errores.push(`[${m.type()}] ${m.text()}`); });
  page.on('pageerror', e => errores.push(`[pageerror] ${e}`));
  return { browser, page, errores };
}

/** El valor que sigue a una opción (`--espera 9000`), o el valor por defecto. */
export const opcion = (args, nombre, porDefecto = null) => {
  const i = args.indexOf(nombre);
  return i >= 0 && args[i + 1] != null ? args[i + 1] : porDefecto;
};
