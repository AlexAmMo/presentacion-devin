// E05 · Modelos: niveles y generaciones. Comparte pantalla con E06 y E07.
// Primero, las tres familias principales, con su logo, grandes y en el centro; después, en fila
// bajo el título, con las demás. A la izquierda, la tabla de niveles (precios de lista) y, a su
// derecha, los saltos de precio: de cada nivel al siguiente (su cifra, pegada al arco, a la altura
// de la línea entre los dos niveles) y, después, por fuera de ellos, el salto del económico al
// máximo (×100, en acento, con su cifra centrada en la altura de su arco). A la derecha, las
// generaciones de cada familia, con su cabecera a la altura de la tabla.
// Pasos: 1 familias en el centro · 2 bajo el título y, seguidos, la tabla fila a fila, los saltos
// entre niveles y el del económico al máximo · 3 generaciones.
// Datos: guion 2.1 y research_notes/Graficas y tools para el guion/modelos_y_coste_rendimiento.md, §3.
import { gsap } from 'gsap';
import { s, v } from '../../design/motion.js';
import { icono } from '../../design/iconos.js';
import { saltos } from '../../design/dibujos.js';
import logoOpenai from '../../design/assets/logos/openai.svg';
import logoAnthropic from '../../design/assets/logos/anthropic.svg';
import logoDevin from '../../design/assets/logos/devin-avatar-fondo-claro.svg';
import { en, cabecera, fuente, crearPasos, marcar, decimal, encadenar } from './comun.js';

// Cada familia, solo con su logo y su nombre.
const PROVEEDORES = [[logoOpenai, 'GPT'], [logoAnthropic, 'Claude'], [logoDevin, 'SWE', ' proveedor--devin']];
const OTROS = 'y otros: Gemini, Kimi, GLM…';
// Niveles, del más caro al más barato, con su precio de entrada (para los saltos) y de lista.
const NIVELES = [
  ['Máximo', 'GPT-6 Astra', 'Fable 5.1', 10, '10 $ / 50 $'],
  ['Alto', '—', 'Opus 5.5', 4, '4 $ / 20 $'],
  ['Medio', 'GPT-6 Sol · 6.1 Sol', 'Sonnet 5.5', 2, '2 $ / 10 $'],
  ['Económico', 'GPT-6 Luna', 'Haiku 5.5', 0.1, '0,10 $ / 0,50 $'],
];
// Generaciones de cada familia, de la más antigua a la actual.
const GENERACIONES = [['GPT', ['5.5', '5.6', '6', '6.1']], ['Claude', ['4.x', '5', '5.5']]];
const FILA_Y = 316, TABLA_Y = 412, X2 = 1340, ANCHO2 = 460;
// Los proveedores, al presentarlos: centrados en la pantalla y más grandes.
const GRANDE = { x: 960, y: 600, escala: 1.7 };

export default function ({ escena, raiz }) {
  let pasos = null, fila = null, centrada = null;
  const linea = gens => gens.map((g, i) =>
    `<span class="etiqueta${i < gens.length - 1 ? ' atenuado' : ''}" style="${i === gens.length - 1 ? 'font-weight:var(--peso-fuerte)' : ''}">${g}</span>`)
    .join(`<span style="color:var(--color-texto-3);display:flex">${icono('arrow-right', 'icono--s')}</span>`);
  const ponerFila = grande => gsap.set(fila, grande ? centrada : { x: 0, y: 0, scale: 1 });

  return {
    montar() {
      raiz.innerHTML =
        // El título es largo: a --tipo-titulo-ajustado cabe en una línea.
        cabecera(escena, 1680, 120, 'tipo-titulo-ajustado') +
        en(120, FILA_Y, `<div data-fila style="display:flex;align-items:center;gap:var(--esp-6)">${PROVEEDORES.map(([logo, familia, clase = '']) =>
          `<span class="proveedor${clase}" data-paso="1" data-efecto="entrarConMuelle"><img class="proveedor__logo" src="${logo}" alt="">${familia}</span>`).join('')}</div>`) +
        `<p class="tipo-texto-s" data-otros style="position:absolute;top:${FILA_Y}px;margin:0;color:var(--color-texto-2);line-height:var(--proveedor-logo)" data-paso="2" data-orden="1">${OTROS}</p>` +
        en(120, TABLA_Y, `<table class="tabla" data-tabla><thead data-paso="2" data-orden="2"><tr><th>Nivel</th><th>OpenAI · GPT-6</th><th>Anthropic · Claude</th><th class="tabla__cifra">Entrada / salida por 1M</th></tr></thead><tbody>
          ${NIVELES.map(([n, o, a, , p], i) => `<tr data-paso="2" data-orden="${3 + i}"><td class="tipo-etiqueta" style="color:var(--color-texto-2)">${n}</td><td>${o}</td><td>${a}</td><td class="tabla__cifra">${p}</td></tr>`).join('')}
          </tbody></table>`) +
        en(120, 812, fuente('OpenAI y Anthropic · precios de lista · 14-10-2026'), { paso: 2, orden: 7 }) +
        // Generaciones: su cabecera, como la de la tabla y a su altura.
        en(X2, TABLA_Y, `<div class="tipo-etiqueta" style="padding:var(--esp-2) 0;border-bottom:var(--trazo-contorno) solid var(--color-contorno);color:var(--color-texto-3)">Generaciones</div>`,
          { paso: 3, estilo: `width:${ANCHO2}px` }) +
        GENERACIONES.map(([familia, gens], i) => en(X2, TABLA_Y + 92 + i * 100,
          `<div class="tipo-etiqueta" style="color:var(--color-texto-3)">${familia}</div><div style="display:flex;align-items:center;gap:var(--esp-1);margin-top:var(--esp-1)">${linea(gens)}</div>`, { paso: 3 })).join('') +
        en(X2, TABLA_Y + 300, '<p class="tipo-texto" style="margin:0;text-wrap:balance">El nombre de la familia no&nbsp;basta: <b style="font-weight:var(--peso-enfasis)">es necesario tener en cuenta la generación</b>.</p>',
          { paso: 3, orden: 1, estilo: `width:${ANCHO2}px` }) +
        '<svg data-saltos style="position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible"></svg>';

      // Medidas en la pantalla (px de 1920 × 1080): las filas de la tabla y la fila de proveedores.
      const caja = raiz.getBoundingClientRect(), k = caja.width / 1920;
      const rect = el => { const r = el.getBoundingClientRect(); return { x: (r.left - caja.left) / k, y: (r.top - caja.top) / k, ancho: r.width / k, alto: r.height / k }; };
      const tabla = rect(raiz.querySelector('[data-tabla]'));
      const centros = [...raiz.querySelectorAll('[data-tabla] tbody tr')].map(tr => { const r = rect(tr); return r.y + r.alto / 2; });
      fila = raiz.querySelector('[data-fila]');
      const f = rect(fila);
      raiz.querySelector('[data-otros]').style.left = `${f.x + f.ancho + 64}px`;
      // La fila, centrada y ampliada (desde su esquina): x e y llevan su centro al de GRANDE.
      centrada = { x: GRANDE.x - f.ancho * GRANDE.escala / 2 - f.x, y: GRANDE.y - f.alto * GRANDE.escala / 2 - f.y, scale: GRANDE.escala, transformOrigin: '0 0' };

      // Saltos: entre niveles vecinos (tras la tabla, con su cifra pegada al arco) y, enseguida, sin
      // que se vayan, el del económico al máximo: un semicírculo por fuera de ellos, con sus
      // extremos algo apartados de la tabla para no pisar las cifras ×20 y ×2,5, y su cifra pegada al
      // vértice, centrada en la altura del arco.
      const [maximo, alto, medio, economico] = centros, precio = NIVELES.map(n => n[3]);
      const veces = (a, b) => {
        const r = Math.round((precio[a] / precio[b]) * 10) / 10;
        return `×${decimal(r, Number.isInteger(r) ? 0 : 1)}`;
      };
      const svg = raiz.querySelector('[data-saltos]');
      const x0 = tabla.x + tabla.ancho + 24;
      svg.innerHTML = saltos({
        x: x0,
        saltos: [
          { desde: economico, hasta: medio, curva: 40, texto: veces(2, 3), pegada: true },
          { desde: medio, hasta: alto, curva: 40, texto: veces(1, 2), pegada: true },
          { desde: alto, hasta: maximo, curva: 40, texto: veces(0, 1), pegada: true },
          { desde: economico, hasta: maximo, redondo: true, aparte: 36, texto: veces(0, 3), pegada: true, acento: true },
        ],
      });
      const trazo = { efecto: 'trazar', opciones: { duration: s('--dur-trazado-serie') } };
      svg.querySelectorAll('.salto').forEach((g, i) => {
        const [arco, pegada] = g.querySelectorAll('.salto__arco, .salto__cifra');
        // Tras la fuente, los tres saltos vecinos a la vez y sus cifras; enseguida, en el mismo paso,
        // el del económico al máximo y su cifra.
        marcar(arco, 2, { ...trazo, orden: i < 3 ? 8 : 10 });
        marcar(pegada, 2, { orden: i < 3 ? 9 : 11 });
      });
      pasos = crearPasos(raiz);
      pasos.poner(0);
      ponerFila(true);
    },

    irA(n, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(n);
        return void ponerFila(n <= 1);
      }
      if (n !== 2) return void pasos.animar(n, tl);
      // Las familias se colocan bajo el título, despacio; después, encadenados: las demás, la tabla
      // fila a fila, su fuente, los tres saltos entre niveles a la vez y sus cifras y el salto grande.
      const colocar = gsap.timeline().to(fila, { x: 0, y: 0, scale: 1, duration: s('--dur-desplazar'), ease: v('--ease-desplazar') });
      encadenar(tl, [colocar, ...pasos.ordenes(2).map(o => pasos.animar(2, gsap.timeline(), { orden: o }))]);
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
