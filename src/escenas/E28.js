// E28 · Verificar. Quinta parada del circuito.
// Arriba, el rótulo «Convincente ≠ funciona». Debajo, a la izquierda, qué revisar (y lo que no
// se ha podido comprobar); a la derecha, la petición de cierre.
// Pasos: 1 rótulo · 2 qué revisar · 3 petición de cierre.
import { icono } from '../../design/iconos.js';
import { en, cabecera, peticion, crearPasos } from './comun.js';

// Guion 4.5.
const REVISAR = [
  ['check', 'Qué archivos ha cambiado'],
  ['check', 'Si el alcance es el esperado'],
  ['check', 'Qué ha comprobado: el caso corregido y la paginación habitual'],
  ['info', 'Qué no se ha podido comprobar'],
];
const CIERRE = 'Resume los cambios, las comprobaciones realizadas y sus resultados. Indica cualquier limitación o punto pendiente.';

export default function ({ escena, raiz }) {
  let pasos = null;
  return {
    montar() {
      const lista = REVISAR.map(([ic, t]) => `<p class="tipo-texto-s" style="margin:0;display:flex;align-items:flex-start;gap:var(--esp-3)">${icono(ic)}<span>${t}</span></p>`).join('');
      raiz.innerHTML =
        cabecera(escena, 1020) +
        en(120, 360, `<p class="tipo-titulo" style="margin:0;display:flex;align-items:center;gap:var(--esp-4)">Convincente${icono('equal-not', 'icono--l')}funciona</p>`,
          { paso: 1, efecto: 'entrarConMuelle' }) +
        en(120, 540, '<p class="tipo-etiqueta" style="margin:0;color:var(--color-texto-3)">Qué revisar · pruebas proporcionales al cambio</p>', { paso: 2 }) +
        en(120, 588, `<div style="display:grid;gap:var(--esp-3)">${lista}</div>`, { paso: 2, estilo: 'width:820px' }) +
        en(1040, 540, '<p class="tipo-etiqueta" style="margin:0;color:var(--color-texto-3)">Para cerrar</p>', { paso: 3 }) +
        en(1040, 588, peticion('Petición de cierre', CIERRE, 760), { paso: 3, efecto: 'entrarConMuelle' });
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
