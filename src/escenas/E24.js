// E24 · Definir la tarea. Primera parada del circuito de Buenas prácticas (arriba a la derecha,
// fijo: src/circuito.js). A la izquierda, las cinco preguntas; a la derecha, la petición
// inicial y la mejorada, en mono. Cada pregunta lleva su número en su color; al final, la
// mejorada se subraya de un trazo, fila a fila, y cada fragmento en el color de la pregunta que
// responde (sin números en el texto).
// Pasos: 1 preguntas · 2 petición inicial · 3 petición mejorada · 4 qué responde cada fragmento.
import { en, cabecera, peticion, crearPasos } from './comun.js';

// Guion 4.1.
const PREGUNTAS = ['¿Qué resultado necesito?', '¿Qué contexto permite entenderlo?', '¿Cuál es el alcance?', '¿Qué restricciones hay?', '¿Cómo comprobaremos que funciona?'];
// La petición mejorada, por fragmentos, con la pregunta que responde cada uno.
const MEJORADA = [
  [2, 'En la tabla de clientes, al cambiar el filtro desde la página 3, la tabla queda vacía aunque existen resultados.'],
  [1, 'Corrige el comportamiento para volver a la primera página cuando cambien los filtros.'],
  [3, 'Empieza por el componente de tabla y la gestión de filtros.'],
  [4, 'Mantén la API actual y evita cambios visuales.'],
  [5, 'Verifica este caso y comprueba que la paginación normal sigue funcionando.'],
];

export default function ({ escena, raiz }) {
  let pasos = null;
  const fragmentos = () => [...raiz.querySelectorAll('[data-fragmento]')];
  // El subrayado (paso 4): entero o sin empezar (al animar, el efecto subrayar).
  const subrayar = (el, si) => { el.style.backgroundSize = ''; el.classList.toggle('subrayado--vacio', !si); };

  return {
    montar() {
      // Cada pregunta, con su número grande en su color: el del subrayado de lo que la responde.
      const numero = n => `<span class="tipo-texto" style="color:var(--color-pregunta-${n});font-weight:var(--peso-fuerte)">${n}</span>`;
      const preguntas = PREGUNTAS.map((p, i) =>
        `<p class="tipo-texto-s" style="margin:0;display:grid;grid-template-columns:var(--esp-5) 1fr;align-items:baseline">${numero(i + 1)}<span>${p}</span></p>`).join('');
      const mejorada = MEJORADA.map(([n, texto]) => `<span class="subrayado subrayado--pregunta-${n}" data-fragmento>${texto}</span>`).join(' ');

      raiz.innerHTML =
        cabecera(escena, 1020) +
        en(120, 340, `<div style="display:grid;gap:var(--esp-3)">${preguntas}</div>`, { paso: 1, estilo: 'width:680px' }) +
        en(120, 700, '<p class="tipo-texto-s" style="margin:0;color:var(--color-texto-2)">La segunda es más larga, pero reduce la ambigüedad: define el comportamiento esperado y cómo evaluarlo.</p>',
          { paso: 3, orden: 1, estilo: 'width:640px' }) +
        en(860, 392, peticion('Petición inicial', 'Arregla la paginación.', 940), { paso: 2, atenua: 3, efecto: 'entrarConMuelle' }) +
        en(860, 548, peticion('Petición mejorada', mejorada, 940), { paso: 3, efecto: 'entrarConMuelle' });
      pasos = crearPasos(raiz);
      pasos.poner(0);
      fragmentos().forEach(f => subrayar(f, false));
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(paso);
        fragmentos().forEach(f => subrayar(f, paso >= 4));
        return;
      }
      pasos.animar(paso, tl);
      // Toda la petición mejorada se subraya de un trazo, en orden de lectura.
      if (paso === 4) tl.subrayar(fragmentos());
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
