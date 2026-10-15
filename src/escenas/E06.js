// E06 · Modelos: coste y rendimiento. Comparte pantalla con E05 y E07.
// La gráfica de Terminal-Bench 4.0 (Anthropic, lanzamiento de Opus 5.5): una línea por modelo
// y un punto por nivel de esfuerzo (Low a Max). A la derecha, centrada en la altura de la gráfica,
// la lectura de cada paso.
// Pasos: 1 ejes y fuente y, enseguida, las líneas, seguidas; Opus 5.5, la última, en acento y con
// el nombre de cada nivel según la línea llega a él · 2 la generación pesa: Opus 5.5 en Medium
// frente a Opus 5 en Max · 3 un modelo más barato con más esfuerzo iguala a uno caro con poco:
// Opus 5 en XHigh frente a GPT-6 Astra en Low, pagando ~×2,7 por intento (13,48 $ frente a 4,95 $).
// En los pasos 2 y 3, lo resaltado antes y su lectura se van rápido; después, a la vez, la lectura
// nueva, las series que toca mirar y sus anillos; la flecha, al final. Las series que no se
// comparan se atenúan más que lo demás (--opacidad-atenuado-serie).
// La lectura 2 (rendimientos decrecientes del esfuerzo) va en E08.
// Datos: research_notes/Graficas y tools para el guion/modelos_y_coste_rendimiento.md, §5.3.
import { s, v } from '../../design/motion.js';
import { grafica } from '../../design/dibujos.js';
import { en, cabecera, fuente, crearPasos, marcar, marcarSeries, trazarSeries, trazarPorPuntos } from './comun.js';

// Coste por intento (USD) → efectividad (%), de Low a Max. En el orden en que se dibujan.
const SERIES = [
  { nombre: 'GPT-5.6 Sol', estilo: 1, puntos: [[1.46, 7.9], [2.69, 20.9], [4.12, 26.1], [5.39, 28.5], [7.89, 37.3]] },
  { nombre: 'Opus 5', estilo: 2, dy: 56, puntos: [[4.25, 28.5], [7.00, 41.2], [10.64, 47.0], [13.48, 50.6], [15.83, 52.3]], resaltar: [4, 3], notas: [[4, 'Max', 'abajo'], [3, 'XHigh', 'abajo']] },
  { nombre: 'Fable 5.1', estilo: 4, puntos: [[5.70, 40.2], [7.80, 43.4], [10.50, 49.4], [15.80, 51.3], [19.50, 55.8]] },
  { nombre: 'GPT-6 Astra', estilo: 3, puntos: [[4.95, 49.7], [6.15, 53.9], [7.21, 57.9], [7.48, 57.6], [10.35, 56.7]], resaltar: [0], notas: [[0, 'Low', 'izquierda']] },
  // Opus 5.5 lleva el nombre de cada nivel: así se lee que cada punto es un esfuerzo mayor.
  { nombre: 'Opus 5.5', estilo: 'acento', puntos: [[1.29, 38.5], [2.94, 57.6], [3.88, 64.2], [7.35, 66.4], [11.24, 64.8]], resaltar: [1],
    notas: [[0, 'Low', 'abajo'], [1, 'Medium', 'izquierda'], [2, 'High', 'arriba'], [3, 'XHigh', 'arriba'], [4, 'Max', 'arriba']] },
];
const dolares = v => `${v} $`;
// Las lecturas, a la derecha: título y detalle; cada una en su paso.
const LECTURAS = [
  [1, 2, 'Arriba a la izquierda es mejor', 'Más efectividad por menos dinero. Cada punto de una línea es un nivel de esfuerzo, de Low a Max.'],
  [2, 3, 'La generación pesa tanto como el nivel', 'Opus 5.5 en su esfuerzo por defecto es más efectivo que Opus 5 en Max, por ~1/5 del coste.'],
  [3, null, 'No hay un modelo «mejor»', 'Un modelo más barato con más esfuerzo puede igualar a uno caro con poco: Opus 5 en XHigh ≈ <span style="white-space:nowrap">GPT-6 Astra</span> en Low, aunque pagando <span style="white-space:nowrap">~×2,7</span> por intento.'],
];
// La gráfica y, a su derecha, la columna de lectura, centrada en su altura.
const GRAFICA = { x: 120, y: 252, ancho: 1200, alto: 660 }, LECTURA = { x: 1300, ancho: 500 };

export default function ({ escena, raiz }) {
  let pasos = null;
  const todos = q => [...raiz.querySelectorAll(q)];

  return {
    montar() {
      const svg = grafica({
        ancho: GRAFICA.ancho, alto: GRAFICA.alto, margenDerecho: 168,
        x: { min: 1, max: 20, log: true, marcas: [1, 2, 5, 10, 20], formato: dolares, titulo: 'Coste por intento (escala log.)' },
        y: { min: 0, max: 70, marcas: [0, 20, 40, 60], formato: v => `${v} %`, titulo: 'Efectividad' },
        series: SERIES,
        flechas: [
          { desde: [15.83, 52.3], hasta: [2.94, 57.6] },
          { desde: [4.95, 49.7], hasta: [13.48, 50.6], discontinua: true },
        ],
      });
      raiz.innerHTML =
        cabecera(escena, 1680) +
        en(GRAFICA.x, GRAFICA.y, svg, { paso: 1 }) +
        en(GRAFICA.x + 128, 930, fuente('Terminal-Bench 4.0 · Anthropic, 22-09-2026 · datos de GPT según OpenAI'), { paso: 1 }) +
        LECTURAS.map(([desde, hasta, titulo, texto]) => en(LECTURA.x, GRAFICA.y,
          `<p class="tipo-texto" style="margin:0;font-weight:var(--peso-enfasis);text-wrap:balance">${titulo}</p><p class="tipo-texto-s" style="margin:var(--esp-2) 0 0;color:var(--color-texto-2);text-align:justify;hyphens:auto">${texto}</p>`,
          { paso: desde, ...(hasta && { hasta }), orden: 1, propio: desde > 1, estilo: `width:${LECTURA.ancho}px;height:${GRAFICA.alto}px;display:flex;flex-direction:column;justify-content:center` })).join('');

      // Dentro de la gráfica: las series en el paso 1, tras los ejes, con los niveles de Opus 5.5;
      // en el 2 se atenúan todas salvo Opus 5 y Opus 5.5 y salen sus anillos, la nota de Opus 5 y
      // la flecha; en el 3, Opus 5.5 deja paso a GPT-6 Astra.
      const g = raiz.querySelector('.grafica');
      const enSerie = (i, q) => g.querySelectorAll(`[data-serie="${i}"] > ${q}`);
      marcarSeries(g, 1, i => ({ 0: { atenua: 2 }, 2: { atenua: 2 }, 3: { atenua: 2, aviva: 3 }, 4: { atenua: 3 } }[i] ?? {}));
      marcar(enSerie(4, '[data-nota]'), 1, { propio: true });
      marcar([...enSerie(1, '[data-resalta="4"]'), ...enSerie(1, '[data-nota="4"]'), ...enSerie(4, '[data-resalta="1"]')], 2, { hasta: 3, propio: true });
      marcar([...enSerie(1, '[data-resalta="3"]'), ...enSerie(1, '[data-nota="3"]'), ...enSerie(3, '[data-resalta="0"]'), ...enSerie(3, '[data-nota="0"]')], 3, { propio: true });
      marcar(g.querySelectorAll('[data-flecha="0"]'), 2, { hasta: 3, propio: true });
      marcar(g.querySelectorAll('[data-flecha="1"]'), 3, { propio: true });
      pasos = crearPasos(raiz);
      pasos.poner(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) return pasos.poner(paso);
      const g = raiz.querySelector('.grafica'), series = [...g.querySelectorAll('.grafica__serie')];
      if (paso === 1) {
        // Los ejes, la fuente y la primera lectura; enseguida, las líneas: las demás, seguidas, y
        // Opus 5.5, sola, en cuanto acaban sus líneas.
        pasos.animar(1, tl);
        const inicio = tl.duration(), demas = series.slice(0, -1);
        trazarSeries(tl, g, { series: demas });
        return void trazarPorPuntos(tl, series.at(-1), inicio + (demas.length - 1) * s('--escalonado-series') + s('--dur-trazado-serie'));
      }
      // 2 y 3: lo resaltado y la lectura anteriores se van rápido y a la vez.
      tl.desaparecer(todos(`[data-hasta="${paso}"]`), { duration: s('--dur-micro') })
        .addLabel('entra');
      // Después, a la vez: la lectura nueva, las series que se atenúan o se avivan y los anillos y notas.
      pasos.animar(paso, tl, { sinSalidas: true });
      tl.aparecer(todos(`[data-paso="${paso}"]:not(.grafica *)`), {}, 'entra')
        .aparecer(todos(`.grafica [data-paso="${paso}"]:not([data-flecha])`), { distancia: 0, duration: s('--dur-micro'), ease: v('--ease-estado'), stagger: 0 }, 'entra');
      // Y la flecha que une lo resaltado, en cuanto están los anillos.
      const flecha = todos(`.grafica [data-flecha][data-paso="${paso}"]`);
      tl.set(flecha, { autoAlpha: 1 }, `entra+=${s('--dur-micro')}`)
        .trazar(flecha, { duration: s('--dur-trazado-serie') }, '<');
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
