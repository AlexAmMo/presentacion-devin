// E30 · Antes de pulsar Enter. Comparte pantalla con E31.
// Las cinco preguntas, en cascada (una tras otra, sin pausas), cada una con la etiqueta del bloque
// (o la parada) donde se explica. Abajo, el mensaje final, con lo que toca al consumo en acento.
// Pasos: 1 las cinco preguntas · 2 el mensaje final.
import { icono } from '../../design/iconos.js';
import { s } from '../../design/motion.js';
import { en, cabecera, crearPasos } from './comun.js';

// Guion, «Cierre»: cada pregunta, con dónde se explica (con los iconos del hub y de E03).
const PREGUNTAS = [
  ['¿Está claro el resultado que necesito?', [['route', 'Buenas prácticas']]],
  ['¿He elegido una configuración proporcionada?', [['cpu', 'Modelo'], ['gauge', 'Effort'], ['code-xml', 'Modo']]],
  ['¿He aportado contexto relevante, y solo el relevante?', [['app-window', 'Contexto']]],
  ['¿Existe una herramienta o procedimiento del equipo que deba utilizar?', [['wrench', 'Tools'], ['puzzle', 'Skills']]],
  ['¿Cómo sabré que el trabajo está terminado?', [['shield-check', 'Verificar']]],
];

export default function ({ escena, raiz }) {
  let pasos = null;
  return {
    montar() {
      const fila = ([pregunta, bloques], i) => en(120, 332 + i * 92, `<div data-fila style="display:grid;grid-template-columns:48px 1010px 1fr;align-items:center">
          <span class="tabla__mono" style="color:var(--color-texto-3)">${i + 1}</span>
          <p class="tipo-texto" style="margin:0">${pregunta}</p>
          <div style="display:flex;gap:var(--esp-2)">${bloques.map(([ic, nombre]) => `<span class="etiqueta">${icono(ic, 'icono--s')}${nombre}</span>`).join('')}</div></div>`,
        { paso: 1, propio: true, estilo: 'width:1680px' });
      raiz.innerHTML =
        cabecera(escena, 1680) +
        PREGUNTAS.map(fila).join('') +
        // El mensaje final, del guion, con el consumo (la promesa de la charla) en acento: el único de la pantalla.
        en(120, 840, '<p class="tipo-entradilla" style="margin:0">Tareas correctas, verificables y fáciles de revisar, <span style="color:var(--color-acento);white-space:nowrap">con menos trabajo y consumo innecesarios</span>.</p>',
          { paso: 2, estilo: 'width:1300px' });
      pasos = crearPasos(raiz);
      pasos.poner(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) return pasos.poner(paso);
      if (paso !== 1) return void pasos.animar(paso, tl);
      // En cascada: cada fila llega poco después de la anterior, en un solo movimiento.
      pasos.animar(1, tl);
      tl.aparecer([...raiz.querySelectorAll('[data-fila]')].map(f => f.closest('[data-paso]')), { stagger: s('--escalonado-filas') });
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
