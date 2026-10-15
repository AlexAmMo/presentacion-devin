// E08 · Effort. Pantalla propia.
// Tres columnas, de dos en dos: primero el dial de effort y, debajo, lo que crece al subirlo
// (latencia y coste, cifras ficticias); a su derecha, la gráfica de E06 en pequeño con la línea
// de Opus 5.5: de Low a Medium el salto es grande; de XHigh a Max, nulo o negativo. Después, las
// columnas se desplazan un sitio: el dial sale por la izquierda, la gráfica ocupa su sitio y entra
// entera, por la derecha, la tercera: el esfuerzo no sustituye al contexto, y el consejo.
// Pasos: 1 el dial · 2 gira de Low a Max · 3 la gráfica · 4 las columnas se desplazan.
import { dial, grafica } from '../../design/dibujos.js';
import { gsap } from 'gsap';
import { s, v } from '../../design/motion.js';
import { icono } from '../../design/iconos.js';
import { en, cabecera, fuente, consejo, decimal, crearPasos, marcar } from './comun.js';

const NIVELES = ['Low', 'Medium', 'High', 'XHigh', 'Max'];
// Por nivel (cifras ficticias): latencia (s) y coste (u.).
const POR_NIVEL = [[3, 0.02], [6, 0.04], [12, 0.08], [22, 0.15], [35, 0.24]];
// Terminal-Bench 4.0 (E06): las demás líneas, atenuadas y sin nombre (ya se vieron en E06); Opus 5.5, con la lectura.
const SERIES = [
  { nombre: '', estilo: 4, puntos: [[1.46, 7.9], [2.69, 20.9], [4.12, 26.1], [5.39, 28.5], [7.89, 37.3]], marcar: false },
  { nombre: '', estilo: 3, puntos: [[4.25, 28.5], [7.00, 41.2], [10.64, 47.0], [13.48, 50.6], [15.83, 52.3]], marcar: false },
  { nombre: '', estilo: 2, puntos: [[5.70, 40.2], [7.80, 43.4], [10.50, 49.4], [15.80, 51.3], [19.50, 55.8]], marcar: false },
  { nombre: '', estilo: 1, puntos: [[4.95, 49.7], [6.15, 53.9], [7.21, 57.9], [7.48, 57.6], [10.35, 56.7]], marcar: false },
  { nombre: 'Opus 5.5', estilo: 'acento', puntos: [[1.29, 38.5], [2.94, 57.6], [3.88, 64.2], [7.35, 66.4], [11.24, 64.8]],
    resaltar: [0, 1, 3, 4], notas: [[0, 'Low', 'abajo'], [1, 'Medium +19', 'izquierda'], [3, 'XHigh', 'arriba'], [4, 'Max −2', 'abajo']] },
];
// Columnas: dos a la vista; en el paso 4 todas se desplazan un sitio a la izquierda (de la segunda a la primera).
const COLUMNAS = [120, 1000], ANCHO = 800, BANDA = { y: 276, alto: 708 };
const DESPLAZA = COLUMNAS[1] - COLUMNAS[0];

export default function ({ escena, raiz }) {
  let pasos = null;
  const caja = () => raiz.querySelector('[data-dial]');
  const cifras = () => [...raiz.querySelectorAll('[data-cifra]')];
  const columnas = () => [0, 1, 2].map(i => raiz.querySelector(`[data-columna="${i}"]`));
  const ponerContadores = k => {
    const [latencia, coste] = POR_NIVEL[k];
    const [l, c] = cifras();
    l.textContent = String(latencia);
    c.textContent = decimal(coste, 2);
  };
  // El dial y los contadores, al instante en el nivel k (0 = Low).
  const ponerNivel = k => {
    gsap.killTweensOf(caja().querySelectorAll('*'));
    caja().innerHTML = dial({ etiquetas: NIVELES, actual: k });
    ponerContadores(k);
  };
  // Las columnas, al instante: desde el paso 4, desplazadas (el dial fuera y la tercera dentro).
  const ponerColumnas = n => {
    const [dialCol, graficaCol, contextoCol] = columnas();
    gsap.killTweensOf([dialCol, graficaCol, contextoCol]);
    const desplazadas = n >= 4, limpiar = { clearProps: 'transform,opacity,visibility' };
    gsap.set(dialCol, desplazadas ? { x: -DESPLAZA, autoAlpha: 0 } : limpiar);
    gsap.set(graficaCol, desplazadas ? { x: -DESPLAZA } : limpiar);
    gsap.set(contextoCol, desplazadas ? limpiar : { autoAlpha: 0 });
  };
  // Una columna: centrada en la altura de la banda de contenido.
  const columna = (i, html) =>
    `<div data-columna="${i}" style="position:absolute;left:${COLUMNAS[Math.min(i, 1)]}px;top:${BANDA.y}px;width:${ANCHO}px;height:${BANDA.alto}px;display:flex;flex-direction:column;justify-content:center;align-items:center">${html}</div>`;

  return {
    montar() {
      const svg = grafica({
        ancho: ANCHO, alto: 440, margenDerecho: 150,
        x: { min: 1, max: 20, log: true, marcas: [1, 2, 5, 10, 20], formato: v => `${v} $`, titulo: 'Coste por intento' },
        y: { min: 0, max: 70, marcas: [0, 35, 70], formato: v => `${v} %`, titulo: 'Efectividad' },
        series: SERIES,
      });
      raiz.innerHTML =
        cabecera(escena, 1680) +
        columna(0, `<div data-paso="1"><div data-dial></div></div>
          <div data-paso="2" data-propio style="display:flex;gap:var(--esp-3);justify-content:center;margin-top:var(--esp-6)">
            <span class="contador">${icono('hourglass')}<span data-cifra>3</span><span class="contador__unidad">s</span></span>
            <span class="contador contador--coste">${icono('coins')}<span data-cifra>0,02</span><span class="contador__unidad">u.</span></span>
          </div>`) +
        columna(1, `<div data-paso="3">${svg}<div style="margin:var(--esp-3) 0 0 var(--esp-7);white-space:nowrap">${fuente('Terminal-Bench 4.0 · Anthropic, 22-09-2026')}</div></div>`) +
        // La tercera, en el sitio de la segunda: entra entera desde la derecha.
        columna(2, `<div style="width:100%">
            <p class="tipo-texto" style="margin:0;font-weight:var(--peso-enfasis)">El esfuerzo no sustituye al contexto</p>
            <p class="tipo-texto-s" style="margin:var(--esp-2) 0 0;color:var(--color-texto-2)">Dar al agente el contexto adecuado es la mejor manera de aumentar su eficacia.</p>
            <div style="margin-top:var(--esp-6)">${consejo('Empieza por un nivel medio; sube cuando lo justifique la tarea')}</div>
          </div>`);

      // La gráfica: las demás líneas atenuadas desde el principio; los anillos y notas de Opus 5.5, con ella.
      const g = raiz.querySelector('.grafica');
      g.querySelectorAll('.grafica__serie:not(.grafica__serie--acento)').forEach(serie => serie.classList.add('atenuado'));
      marcar(g.querySelectorAll('[data-resalta], [data-nota]'), 3, { orden: 1, opciones: { distancia: 0 } });
      pasos = crearPasos(raiz);
      pasos.poner(0);
      ponerNivel(0);
      ponerColumnas(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(paso);
        ponerNivel(paso >= 2 ? 4 : 0);
        ponerColumnas(paso);
        return;
      }
      pasos.animar(paso, tl);
      if (paso === 4) {
        // Todo se desplaza un sitio a la vez: el dial sale por la izquierda, la gráfica ocupa su
        // sitio y la tercera columna entra entera por la derecha.
        const [dialCol, graficaCol, contextoCol] = columnas();
        const mover = { duration: s('--dur-desplazar'), ease: v('--ease-desplazar') };
        tl.addLabel('desplaza')
          .to(dialCol, { x: -DESPLAZA, autoAlpha: 0, ...mover }, 'desplaza')
          .to(graficaCol, { x: -DESPLAZA, ...mover }, 'desplaza')
          .fromTo(contextoCol, { x: DESPLAZA, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ...mover }, 'desplaza');
        return;
      }
      if (paso !== 2) return;
      // De Low a Max, nivel a nivel: la aguja gira y suben los contadores.
      const contadores = raiz.querySelector('[data-cifra]').closest('[data-propio]');
      const [l, c] = cifras();
      tl.set(contadores, { autoAlpha: 1 }).aparecer(contadores, {}, '<');
      POR_NIVEL.slice(1).forEach(([latencia, coste], i) => {
        const [latAntes, costeAntes] = POR_NIVEL[i];
        tl.addLabel(`nivel${i + 1}`, `+=${s('--pausa-lectura-corta') / 3}`)
          .girarDial(caja().querySelector('.dial'), { posicion: i + 1 }, `nivel${i + 1}`)
          .subirContador(l, { desde: latAntes, hasta: latencia }, `nivel${i + 1}`)
          .subirContador(c, { desde: costeAntes, hasta: coste, decimales: 2 }, `nivel${i + 1}`);
      });
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
