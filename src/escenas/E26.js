// E26 · Planificar. Tercera parada del circuito.
// Arriba, los dos caminos: un cambio pequeño y claro se ejecuta directamente; una tarea amplia
// pasa por el modo planificación. Debajo, a la derecha del segundo, la tarjeta del plan.
// Pasos: 1 los dos caminos · 2 el plan.
import { icono } from '../../design/iconos.js';
import { en, cabecera, crearPasos } from './comun.js';

const CAMINOS = [
  ['Cambio pequeño y claro', 'terminal', 'Ejecución directa'],
  ['Tarea amplia, con alternativas o dependencias', 'list-checks', 'Modo planificación: investigar y acordar un plan antes de tocar nada'],
];
const PLAN = ['Qué cambiar', 'Por qué', 'Qué riesgos hay', 'Cómo validarlo'];

export default function ({ escena, raiz }) {
  let pasos = null;
  return {
    montar() {
      const camino = ([situacion, ic, resultado], i) =>
        en(120, 392 + i * 128, `<div style="display:grid;grid-template-columns:640px auto 1fr;align-items:center;gap:var(--esp-4)">
            <p class="tipo-texto" style="margin:0;font-weight:var(--peso-enfasis)">${situacion}</p>
            <span style="color:var(--color-texto-3)">${icono('arrow-right', 'icono--l')}</span>
            <p class="tipo-texto" style="margin:0;display:flex;align-items:center;gap:var(--esp-3)">${icono(ic)}<span>${resultado}</span></p></div>`,
          { paso: 1, orden: i, estilo: 'width:1680px' });
      const plan = PLAN.map((t, i) => `<div style="display:grid;grid-template-columns:auto 1fr;align-items:center;gap:var(--esp-3)">
          <span class="tipo-texto-s" style="font-weight:var(--peso-enfasis);width:260px"><span class="tabla__mono" style="color:var(--color-texto-3)">${i + 1}</span>  ${t}</span>
          <span class="documento__linea" style="width:${[300, 220, 260, 240][i]}px"></span></div>`).join('');

      raiz.innerHTML =
        cabecera(escena, 1020) +
        CAMINOS.map(camino).join('') +
        en(828, 640, `<div class="documento" style="width:700px;height:auto;box-sizing:border-box"><div class="documento__cabecera">${icono('list-checks', 'icono--s')}Plan</div>
            <div class="documento__cuerpo" style="gap:var(--esp-3)">${plan}</div></div>`, { paso: 2, efecto: 'entrarConMuelle' }) +
        en(120, 672, '<p class="tipo-texto-s" style="margin:0;color:var(--color-texto-2)">Con una extensión proporcional a la tarea.</p>', { paso: 2, orden: 1, estilo: 'width:640px' });
      pasos = crearPasos(raiz);
      pasos.poner(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) return pasos.poner(paso);
      pasos.animar(paso, tl);
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
