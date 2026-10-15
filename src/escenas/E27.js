// E27 · Intervenir. Cuarta parada del circuito.
// A la izquierda, el recorrido del agente: va bien, se desvía hacia un supuesto equivocado y,
// con la corrección concreta (a la derecha, en mono), vuelve al fallo real. Abajo, la pausa
// de diagnóstico, para cuando encadena intentos fallidos.
// Pasos: 1 desvío y corrección · 2 pausa de diagnóstico.
import { icono } from '../../design/iconos.js';
import { gsap } from 'gsap';
import { s, px } from '../../design/motion.js';
import { en, cabecera, peticion, crearPasos, encadenar } from './comun.js';

const CORRECCION = 'El endpoint responde correctamente; el fallo ocurre después, al actualizar el estado del cliente. Reproduce ese paso antes de seguir cambiando el backend.';
const DIAGNOSTICO = 'Resume qué has probado, qué evidencia apoya cada hipótesis y qué información falta. No hagas más cambios hasta identificar el siguiente experimento útil.';
// El recorrido (px de la pantalla): el tramo común, el desvío (que se atenúa) y la vuelta.
const [X0, Y0, XD] = [150, 560, 440];
const DESVIO = { x: 680, y: 440 }, BUENO = { x: 860, y: Y0 };

export default function ({ escena, raiz }) {
  let pasos = null;
  return {
    montar() {
      // Un hito del recorrido, centrado en su punto: el desvío (✕) o el fallo real (✓).
      const r = px('--hito-diametro') / 2;
      const marca = ({ x, y }, ic, texto, opciones, abajo = false) => en(x - r, y - r,
        `<div class="hito${abajo ? ' hito--abajo' : ''}"><div class="hito__circulo">${icono(ic)}</div><p class="hito__texto">${texto}</p></div>`, opciones);
      raiz.innerHTML =
        cabecera(escena, 1020) +
        `<svg style="position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible">
          <path class="camino" data-paso="1" data-efecto="trazar" d="M${X0} ${Y0}H${XD}"/>
          <g data-atenua="1" data-orden="2"><path class="camino" data-paso="1" data-efecto="trazar" d="M${XD} ${Y0}C${XD + 120} ${Y0} ${DESVIO.x - 110} ${DESVIO.y} ${DESVIO.x - 30} ${DESVIO.y}"/></g>
          <path class="camino" data-paso="1" data-orden="2" data-efecto="trazar" d="M${XD} ${Y0}H${BUENO.x - 30}"/></svg>` +
        // El desvío entra primero y se atenúa cuando llega la vuelta (grupo 2).
        `<div data-atenua="1" data-orden="2">${marca(DESVIO, 'x', 'Seguir con el backend', { paso: 1, orden: 0, efecto: 'entrarConMuelle' })}</div>` +
        marca(BUENO, 'check', 'El fallo real', { paso: 1, orden: 2, efecto: 'entrarConMuelle' }, true) +
        en(1040, 392, '<p class="tipo-etiqueta" style="margin:0;color:var(--color-texto-3)">En lugar de «eso está mal», información concreta</p>', { paso: 1, orden: 1, estilo: 'width:760px' }) +
        en(1040, 440, peticion('La corrección', CORRECCION, 760), { paso: 1, orden: 1, efecto: 'entrarConMuelle' }) +
        en(120, 716, '<p class="tipo-etiqueta" style="margin:0;color:var(--color-texto-3)">Si encadena intentos fallidos: una pausa de diagnóstico</p>', { paso: 2, estilo: 'width:1680px' }) +
        en(120, 764, peticion('Pausa de diagnóstico', DIAGNOSTICO, 1680), { paso: 2, efecto: 'entrarConMuelle' });
      // Los tramos del recorrido se trazan al ritmo de las líneas seguidas.
      raiz.querySelectorAll('.camino').forEach(c => { c.dataset.opciones = JSON.stringify({ duration: s('--dur-trazado-serie') }); });
      pasos = crearPasos(raiz);
      pasos.poner(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) return pasos.poner(paso);
      if (paso !== 1) return void pasos.animar(paso, tl);
      // Encadenados, sin pausas: se desvía, llega la corrección y el recorrido vuelve al fallo real.
      encadenar(tl, [0, 1, 2].map(o => pasos.animar(1, gsap.timeline(), { orden: o })));
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
