// E20 · De qué depende el coste total. Comparte pantalla con E21–E23.
// Arriba, el coste total; debajo, una llave que abarca todo lo que lo forma, de izquierda a
// derecha: los tokens, el modelo, el coste por token y el coste en ACUs. Debajo de cada pieza,
// un ejemplo: tokens de salida consumidos, el modelo elegido, el precio de ese token en el
// modelo (el de E05) y lo que sale en ACUs, que sube como un contador, con su precio en $ debajo.
// Pasos: 1 de qué depende · 2 el ejemplo.
import { icono } from '../../design/iconos.js';
import { llave } from '../../design/dibujos.js';
import { px } from '../../design/motion.js';
import { en, cabecera, crearPasos, marcar, decimal } from './comun.js';
import logoOpenai from '../../design/assets/logos/openai.svg';
import logoAnthropic from '../../design/assets/logos/anthropic.svg';
import logoDevin from '../../design/assets/logos/devin-avatar-fondo-claro.svg';

// Las cuatro piezas, en columnas (sus centros), y entre ellas, flechas.
const COLUMNAS = [300, 740, 1180, 1620], ANCHO = 360;
const Y = { coste: 292, llave: 372, piezas: 468, ejemplo: 712 };
// El ejemplo: 50.000 tokens de salida con GPT-6.1 Sol, a 10 $ el millón (E05): 0,50 $ en
// tokens; en ACUs, un 20 % más (lo explica el ponente): 0,60 $. Pasado a ACUs con un precio de
// referencia, 2 $ por ACU (el público del plan Teams; el de Enterprise lo fija el contrato).
const EJEMPLO = { tokens: 50000, precio: 10, sobrecoste: 1.2, precioAcu: 2 };
const EN_TOKENS = (EJEMPLO.tokens * EJEMPLO.precio) / 1e6, DOLARES = EN_TOKENS * EJEMPLO.sobrecoste, ACUS = DOLARES / EJEMPLO.precioAcu;
const FICHAS = [['entrada', 'Revisa'], ['salida', 'Hecho'], ['razonamiento', 'pienso']];

export default function ({ escena, raiz }) {
  let pasos = null;
  // Lo que sube al final del ejemplo: los ACUs, en la píldora, y su precio en $, debajo.
  const cifras = () => [[raiz.querySelector('[data-acus]'), ACUS], [raiz.querySelector('[data-dolares]'), DOLARES]];
  return {
    montar() {
      // Una columna: lo que se ve arriba y su nombre (o su explicación) debajo, centrados.
      const columna = (i, y, visual, texto, opciones, claseTexto = 'tipo-texto-s" style="margin:var(--esp-2) 0 0;font-weight:var(--peso-enfasis)') =>
        en(COLUMNAS[i] - ANCHO / 2, y, `<div style="display:grid;justify-items:center;text-align:center">${visual}<p class="${claseTexto}">${texto}</p></div>`,
          { ...opciones, estilo: `width:${ANCHO}px` });
      const explica = 'tipo-etiqueta" style="margin:var(--esp-2) 0 0;font-weight:var(--peso-texto);color:var(--color-texto-2)';
      const flecha = (i, orden) => en((COLUMNAS[i] + COLUMNAS[i + 1]) / 2 - 24, Y.piezas + 16, `<div style="color:var(--color-texto-3)">${icono('arrow-right', 'icono--l')}</div>`, { paso: 1, orden });
      const pildora = (ic, texto, clase = '') => `<span class="contador${clase}">${icono(ic)}<span class="contador__unidad">${texto}</span></span>`;
      // Los logos, como en E05: cada uno con el fondo de la pantalla, para que el blanco de su cuadro
      // se funda con él (el de Devin, ampliado, con su fondo algo mayor).
      const logos = [logoOpenai, logoAnthropic, logoDevin].map((l, i) =>
        `<span class="proveedor${i === 2 ? ' proveedor--devin' : ''}"><img class="proveedor__logo" src="${l}" alt=""></span>`).join('');

      raiz.innerHTML =
        cabecera(escena, 1680) +
        '<svg data-llave style="position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible"></svg>' +
        // El coste total, centrado sobre el pico de la llave.
        en(120, Y.coste, `<div style="display:flex;justify-content:center">${pildora('circle-dollar-sign', 'Coste total', ' contador--coste')}</div>`,
          { paso: 1, efecto: 'entrarConMuelle', estilo: 'width:1680px' }) +
        // Lo que lo forma, de izquierda a derecha.
        columna(0, Y.piezas, `<div class="fichas">${FICHAS.map(([t, x]) => `<span class="ficha ficha--s ficha--${t}">${x}</span>`).join('')}</div>`, 'Tokens', { paso: 1, orden: 2 }) +
        flecha(0, 3) +
        columna(1, Y.piezas, `<div style="display:flex;align-items:center;gap:var(--esp-4);height:var(--contador-alto)">${logos}</div>`, 'Modelos', { paso: 1, orden: 3 }) +
        flecha(1, 4) +
        columna(2, Y.piezas, pildora('coins', '$ por token'), 'Coste por token', { paso: 1, orden: 4 }) +
        flecha(2, 5) +
        columna(3, Y.piezas, pildora('receipt', 'ACUs', ' contador--coste'), 'Coste en ACUs', { paso: 1, orden: 5 }) +
        // El ejemplo, debajo de cada pieza.
        columna(0, Y.ejemplo, `<span class="ficha ficha--salida">${EJEMPLO.tokens.toLocaleString('es-ES', { useGrouping: 'always' })}</span>`,
          'tokens de salida consumidos', { paso: 2 }, explica) +
        columna(1, Y.ejemplo, `<span class="tipo-texto-s" style="display:flex;align-items:center;gap:var(--esp-2);height:var(--contador-alto);font-weight:var(--peso-enfasis);isolation:isolate;background:var(--color-fondo)"><img class="proveedor__logo" src="${logoOpenai}" alt="">GPT-6.1 Sol</span>`,
          'el modelo elegido', { paso: 2, orden: 1 }, explica) +
        columna(2, Y.ejemplo, pildora('coins', `${EJEMPLO.precio} $ por millón`), 'su precio por token de salida', { paso: 2, orden: 2 }, explica) +
        columna(3, Y.ejemplo, `<span class="contador contador--coste">${icono('receipt')}≈ <span data-acus>${decimal(ACUS, 2)}</span><span class="contador__unidad">ACUs</span></span>`,
          `<b style="font-weight:var(--peso-enfasis);color:var(--color-texto-1)">≈ <span data-dolares>${decimal(DOLARES, 2)}</span> $</b> (${decimal(EN_TOKENS, 2)} $ en tokens)`,
          { paso: 2, orden: 3 }, explica);

      // La llave: abarca las cuatro piezas, con el pico bajo el coste total.
      const svg = raiz.querySelector('[data-llave]');
      svg.innerHTML = llave({ x0: COLUMNAS[0] - ANCHO / 2, x1: COLUMNAS[3] + ANCHO / 2, y: Y.llave, alto: px('--esp-6') });
      marcar(svg.querySelectorAll('.llave'), 1, { orden: 1, efecto: 'trazar' });
      pasos = crearPasos(raiz);
      pasos.poner(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(paso);
        for (const [el, valor] of cifras()) el.textContent = decimal(valor, 2);
        return;
      }
      pasos.animar(paso, tl);
      // Al final del ejemplo, lo que sale en ACUs y su precio en $ suben como contadores, a la vez.
      if (paso === 2) for (const [el, valor] of cifras()) tl.subirContador(el, { desde: 0, hasta: valor, decimales: 2 }, '<');
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
