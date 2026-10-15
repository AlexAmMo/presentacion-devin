// E33 · Post-créditos. Comparte pantalla con E30 y E31 y va después de las preguntas (Fin sigue
// llevando a E31). Sencilla: las tecnologías principales con que se ha hecho la presentación, en
// dos columnas, cada una con su icono (Claude Code, con el logo de Anthropic) y para qué sirvió;
// debajo, una línea sobre cómo está hecha.
// Pasos: 1 las tecnologías.
import { icono } from '../../design/iconos.js';
import logoAnthropic from '../../design/assets/logos/anthropic.svg';
import { en, cabecera, crearPasos } from './comun.js';

const TECNOLOGIAS = [
  [`<img class="proveedor__logo" src="${logoAnthropic}" alt="">`, 'Claude Code', 'Agentes con Claude Opus 5.5: código, diseño y pruebas'],
  [icono('clapperboard'), 'GSAP', 'La cámara y todas las animaciones'],
  [icono('spline'), 'd3-interpolate', 'El vuelo de la cámara: alejar, viajar y acercar'],
  [icono('zap'), 'Vite y vite-plugin-singlefile', 'Todo en un único HTML que funciona sin conexión'],
  [icono('pen-tool'), 'Impeccable', 'Criterio de diseño y revisión'],
  [icono('drama'), 'Playwright', 'Pruebas en un navegador sin ventanas'],
  [icono('shapes'), 'Lucide', 'Los iconos'],
  [icono('type'), 'Outfit, DM Mono e Inter', 'Las tipografías'],
];

export default function ({ escena, raiz }) {
  let pasos = null;
  // Cada tecnología: el icono a la izquierda; a su derecha, el nombre y, debajo, para qué sirvió.
  const fila = ([ic, nombre, uso]) =>
    `<div data-paso="1" style="display:grid;grid-template-columns:var(--esp-6) 1fr;column-gap:var(--esp-3);align-items:center;align-content:center">
      <span style="display:flex;justify-content:center;grid-row:span 2">${ic}</span>
      <span class="tipo-texto" style="font-weight:var(--peso-enfasis)">${nombre}</span>
      <span class="tipo-texto-s" style="color:var(--color-texto-2)">${uso}</span></div>`;
  return {
    montar() {
      raiz.innerHTML =
        cabecera(escena, 1680, 120, 'tipo-titulo-s', 'popcorn') +
        en(120, 336, `<div style="display:grid;grid-template-columns:1fr 1fr;grid-auto-flow:column;grid-template-rows:repeat(4, auto);gap:var(--esp-5) var(--esp-6)">${TECNOLOGIAS.map(fila).join('')}</div>`, 'width:1680px') +
        en(120, 912, '<p class="tipo-texto-s" style="margin:0;color:var(--color-texto-2)">HTML, CSS y JavaScript, sin frameworks: todos los colores, medidas y movimientos salen de un design system de variables.</p>',
          { paso: 1, orden: 1, estilo: 'width:1680px' });
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
