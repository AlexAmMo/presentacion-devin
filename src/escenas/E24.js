// E24 · Definir la tarea. Primera parada del circuito de Buenas prácticas (arriba a la derecha,
// fijo: src/circuito.js). A la izquierda, las cinco preguntas; a la derecha, la petición
// inicial y la mejorada, en mono. Al final, cada fragmento de la mejorada se subraya con el
// número de la pregunta que responde.
// Pasos: 1 preguntas · 2 petición inicial · 3 petición mejorada · 4 qué responde cada fragmento.
import { s, esEstatico } from '../../design/motion.js';
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
  // El subrayado (paso 4): la línea pasa de transparente al color del contorno.
  const subrayar = (el, si) => { el.style.textDecorationColor = si ? 'var(--color-contorno)' : 'transparent'; };

  return {
    montar() {
      const numero = n => `<span class="tabla__mono" style="color:var(--color-texto-3)">${n}</span>`;
      const preguntas = PREGUNTAS.map((p, i) => `<p class="tipo-texto-s" style="margin:0">${numero(i + 1)}  ${p}</p>`).join('');
      const mejorada = MEJORADA.map(([n, texto]) =>
        `<span data-fragmento style="text-decoration-line:underline;text-decoration-thickness:var(--trazo-contorno);text-underline-offset:var(--esp-1);text-decoration-color:transparent">${texto}</span><sup class="tabla__mono" data-numero data-paso="4" style="display:inline-block;margin:0 var(--esp-1) 0 var(--esp-1);color:var(--color-texto-3)">${n}</sup>`).join(' ');

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
      if (paso !== 4) return void pasos.animar(paso, tl);
      // Fragmento a fragmento, en el orden de las preguntas: se subraya y aparece su número.
      const numeros = [...raiz.querySelectorAll('[data-numero]')];
      const inicio = tl.duration();
      [...MEJORADA.keys()].sort((a, b) => MEJORADA[a][0] - MEJORADA[b][0]).forEach((i, orden) => {
        const pos = inicio + (esEstatico() ? 0 : orden * s('--dur-entrada'));
        tl.add(() => subrayar(fragmentos()[i], true), pos)
          .aparecer(numeros[i], { distancia: 0 }, pos);
      });
      tl.add(() => fragmentos().forEach(f => subrayar(f, true)));
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
