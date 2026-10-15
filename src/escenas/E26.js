// E26 · Planificar. Tercera parada del circuito.
// Arriba, los dos caminos: un cambio pequeño y claro se ejecuta directamente; una tarea amplia
// pasa por el modo planificación. Debajo, en la columna de la derecha, la tarjeta del plan y, a su
// izquierda, centrado con ella, cuánto debe ocupar. Las tres filas comparten columnas: la de la
// izquierda, tan ancha como su texto más largo, para que cada flecha quede a la misma distancia
// de las dos.
// Pasos: 1 los dos caminos · 2 el plan.
import { icono } from '../../design/iconos.js';
import { en, cabecera, crearPasos } from './comun.js';

const CAMINOS = [
  ['Cambio pequeño y claro', 'terminal', 'Ejecución directa'],
  ['Tarea amplia, con alternativas o dependencias', 'list-checks', 'Modo planificación: investigar y acordar un plan antes de tocar nada'],
];
const PLAN = ['Qué cambiar', 'Por qué', 'Qué riesgos hay', 'Cómo validarlo'];
// La columna de la izquierda: «Tarea amplia, con alternativas» (456 px) cabe en una línea.
const IZQ = 460;
const columnas = `display:grid;grid-template-columns:${IZQ}px auto 1fr;align-items:center;gap:var(--esp-4)`;

export default function ({ escena, raiz }) {
  let pasos = null;
  return {
    montar() {
      const camino = ([situacion, ic, resultado], i) =>
        en(120, 392 + i * 128, `<div style="${columnas}">
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
        // El plan, en la columna de la derecha, y su extensión, centrada en su fila (la columna de las
        // flechas, vacía, con una flecha invisible para que mida lo mismo).
        en(120, 640, `<div style="${columnas}">
            <p class="tipo-texto-s" data-paso="2" data-orden="1" style="margin:0;color:var(--color-texto-2);text-wrap:balance">Con una extensión proporcional a la tarea.</p>
            <span style="visibility:hidden">${icono('arrow-right', 'icono--l')}</span>
            <div class="documento" data-paso="2" data-efecto="entrarConMuelle" style="width:700px;height:auto;box-sizing:border-box"><div class="documento__cabecera">${icono('list-checks', 'icono--s')}Plan</div>
              <div class="documento__cuerpo" style="gap:var(--esp-3)">${plan}</div></div></div>`, { estilo: 'width:1680px' });
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
