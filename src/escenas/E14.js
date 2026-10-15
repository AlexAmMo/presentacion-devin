// E14 · El bucle del agente. En el hub: las herramientas de serie y el bucle entran como piezas
// (src/hub.js, al empezar los pasos 1 y 2); la escena hace girar el bucle y dibuja, en la
// ventana del hub, lo que añade la sesión. A la derecha, en el panel, lo que pasa en cada vuelta.
// Pasos: 1 las herramientas de serie · 2 tres vueltas, todas al mismo ritmo pausado (la primera,
// explicada): la ventana se llena; al final, «Esto es un agente».
import { s, px } from '../../design/motion.js';
import { icono } from '../../design/iconos.js';
import { en, cabecera, crearPasos, pausa } from './comun.js';
import { PANEL, capasDeSesion, fichaEn, sitio, vuelta } from './hub.js';
import { HERRAMIENTAS } from '../hub.js';

// Las tres vueltas: la herramienta que usa cada una. Todas lentas; la primera, explicada.
const VUELTAS = ['leer', 'editar', 'ejecutar'];
const ANCHO_CAPA = 16;
const REJILLA = 480;
const FASES = [['cpu', 'El modelo decide'], ['wrench', 'Una herramienta actúa'], ['app-window', 'Su resultado entra en el contexto']];

export default function ({ escena, raiz, hub }) {
  let pasos = null;
  return {
    montar() {
      const capas = VUELTAS.map((_, i) => [ANCHO_CAPA, ` data-paso="2" data-propio data-vuelta="${i}"`]);
      raiz.innerHTML =
        cabecera(escena, PANEL.ancho, PANEL.x) +
        // Qué son y, debajo, las herramientas de serie, en una rejilla de 2 × 2: todas del mismo tamaño.
        en(PANEL.x, 384, '<p class="tipo-texto-s" style="margin:0;color:var(--color-texto-2)">Por defecto, Devin incluye una serie de tools disponibles.</p>',
          { paso: 1, estilo: `width:${PANEL.ancho}px` }) +
        en(PANEL.x, 484, `<div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:var(--esp-2);width:${REJILLA}px">${HERRAMIENTAS.map(([ic, nombre]) =>
          `<span class="etiqueta" data-paso="1" data-orden="1" style="justify-content:center">${icono(ic, 'icono--s')}<span class="tipo-mono-s">${nombre}</span></span>`).join('')}</div>`) +
        FASES.map(([ic, texto], i) => en(PANEL.x, 656 + i * 56,
          `<div class="tipo-texto-s" style="display:flex;align-items:center;gap:var(--esp-2)"><span class="tipo-mono-s" style="color:var(--color-texto-3)">${i + 1}</span>${icono(ic, 'icono--s')}${texto}</div>`,
          { paso: 2, propio: true, estilo: `width:${PANEL.ancho}px` })).join('') +
        en(PANEL.x, 842, '<p class="tipo-titulo-s" style="margin:0;color:var(--color-acento);text-align:center">Esto es un agente</p>', { paso: 2, orden: 1, estilo: `width:${PANEL.ancho}px` }) +
        capasDeSesion('E14', capas) +
        VUELTAS.map((h, i) => fichaEn(sitio(h), 'resultado', ` data-paso="2" data-propio data-ficha="${i}"`)).join('');
      pasos = crearPasos(raiz);
      // Las fichas solo se ven mientras viajan.
      raiz.querySelectorAll('[data-ficha]').forEach(f => f.setAttribute('data-hasta', f.dataset.paso));
      pasos.poner(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) return void pasos.poner(paso);
      const ficha = i => raiz.querySelector(`[data-ficha="${i}"]`);
      const capa = i => raiz.querySelector(`[data-vuelta="${i}"]`);
      if (paso === 2) {
        // Tres vueltas, todas al ritmo lento: en la primera, cada fase del panel aparece cuando
        // ocurre; cada una, una capa más en la ventana. Después, el rótulo.
        const filas = [...raiz.querySelectorAll('[data-propio][data-paso="2"]')].filter(el => !el.matches('[data-ficha], .capa'));
        pausa(tl);
        const lenta = 2 * s('--dur-vuelta');
        const { decide, actua, entra } = vuelta(tl, hub, { herramienta: VUELTAS[0], ficha: ficha(0), capa: capa(0), duracion: lenta });
        tl.aparecer(filas[0], {}, decide).aparecer(filas[1], {}, actua).aparecer(filas[2], {}, entra);
        VUELTAS.slice(1).forEach((h, i) => vuelta(tl, hub, { herramienta: h, ficha: ficha(i + 1), capa: capa(i + 1), duracion: lenta }));
        pausa(tl);
        pasos.animar(2, tl, { orden: 1 });
      } else {
        pasos.animar(paso, tl);
      }
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
