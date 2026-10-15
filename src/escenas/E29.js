// E29 · Hábitos. Última parada del circuito.
// Arriba, los cuatro hábitos que gastan sin aportar, cada uno con su alternativa. Debajo, el
// recordatorio de los hábitos propios de cada pieza, con el icono de su zona (donde se explicaron)
// y el mismo ⊘ que los hábitos de arriba.
// Pasos: 1 los cuatro hábitos · 2 los de cada pieza.
import { icono } from '../../design/iconos.js';
import { en, cabecera, crearPasos } from './comun.js';

// Guion 4.6.
const HABITOS = [
  ['Pedir que revise todo el repositorio', 'Delimitar la pregunta y ampliar la búsqueda cuando haga falta'],
  ['Repetir «prueba otra cosa»', 'Aportar evidencia o revisar las hipótesis'],
  ['Pedir informes extensos en cada turno', 'Solicitar decisiones, resultados y evidencia relevante'],
  ['Eliminar validaciones para ahorrar', 'Elegir comprobaciones proporcionadas al riesgo'],
];
const PROPIOS = [['gauge', 'Effort', 'Effort máximo por defecto'], ['app-window', 'Contexto', 'Mezclar tareas y reiniciar'], ['git-fork', 'Subagentes', 'Subagentes por defecto']];


export default function ({ escena, raiz }) {
  let pasos = null;
  return {
    montar() {
      const filas = HABITOS.map(([h, a], i) => `<tr data-paso="1" data-orden="${i + 1}">
          <td data-habito style="width:640px"><span style="display:flex;align-items:center;gap:var(--esp-2)">${icono('ban', 'icono--s')}${h}</span></td>
          <td><span data-alternativa style="display:flex;align-items:center;gap:var(--esp-2)">${icono('check', 'icono--s')}${a}</span></td></tr>`).join('');
      const propios = PROPIOS.map(([ic, zona, habito], i) =>
        en(120 + i * 570, 852, `<span class="etiqueta" data-zona>${icono(ic, 'icono--s')}${zona}</span>
          <p class="tipo-texto-s" style="margin:var(--esp-2) 0 0;display:flex;align-items:center;gap:var(--esp-2)">${icono('ban', 'icono--s')}${habito}</p>`, { paso: 2, orden: 1, estilo: 'width:540px;display:grid;justify-items:center;text-align:center' })).join('');
      raiz.innerHTML =
        cabecera(escena, 1020) +
        en(120, 392, `<table class="tabla" style="width:1680px"><thead data-paso="1"><tr><th>Hábito que gasta</th><th>Alternativa</th></tr></thead><tbody>${filas}</tbody></table>`) +
        en(120, 795, '<p class="tipo-etiqueta" style="margin:0;color:var(--color-texto-3)">Y los de cada pieza, que ya vimos en su sección</p>', { paso: 2 }) +
        propios;
      // La columna «Alternativa» (su rótulo y sus iconos) empieza donde la etiqueta «Contexto», la del
      // centro de abajo: las dos partes de la pantalla comparten ese borde.
      const caja = raiz.getBoundingClientRect(), k = caja.width / 1920;
      const izquierda = el => (el.getBoundingClientRect().left - caja.left) / k;
      const desfase = izquierda(raiz.querySelectorAll('[data-zona]')[1]) - izquierda(raiz.querySelector('[data-alternativa]'));
      raiz.querySelectorAll('[data-habito]').forEach(td => { td.style.width = `${parseFloat(td.style.width) + desfase}px`; });
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
