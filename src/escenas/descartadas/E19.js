// DESCARTADA (Cambios.md, «E19: Elimina esta diapositiva por completo»). No se carga: mundo.js solo importa src/escenas/EXX.js.
// E19 · Qué es un token. En el hub, ya completo y envuelto en su plugin: primera escena de la
// parte 3. A la derecha, en el panel, la frase que se parte en fichas de token y el contador de
// llamadas; en el hub, el bucle gira y, en cada vuelta, la línea de lectura recorre toda la
// ventana: el modelo relee el contexto entero.
// Pasos: 1 la frase se parte en fichas · 2 tres vueltas: se relee todo y las llamadas suben.
import { s, px } from '../../design/motion.js';
import { icono } from '../../design/iconos.js';
import { en, cabecera, crearPasos, pausa } from './comun.js';
import { PANEL, capasDeSesion, finDeSesion, fichaEn, sitio, vuelta, lectura } from './hub.js';

const FICHAS = ['Arre', 'gla', ' la', ' pagin', 'ación'];
const VUELTAS = ['buscar', 'leer', 'editar'];
const ANCHO_CAPA = 16;

const ficha = t => `<span class="ficha ficha--s ficha--entrada">${t.startsWith(' ') ? '<span class="ficha__espacio">·</span>' : ''}${t.trim()}</span>`;

export default function ({ escena, raiz, hub }) {
  let pasos = null;
  const cifra = () => raiz.querySelector('[data-cifra]');
  return {
    montar() {
      const x = PANEL.x;
      raiz.innerHTML =
        cabecera(escena, PANEL.ancho, x) +
        en(x, 380, '<p class="tipo-entradilla" style="margin:0">«Arregla la paginación»</p>', { paso: 1, hasta: 1 }) +
        en(x, 380, `<div class="fichas">${FICHAS.map(ficha).join('')}</div>`, { paso: 1, propio: true, estilo: `width:${PANEL.ancho}px` }) +
        en(x, 470, '<p class="tipo-texto-s" style="margin:0;color:var(--color-texto-2)">Un token es un trozo de palabra, un signo o un fragmento de código.</p>',
          { paso: 1, orden: 1, estilo: `width:${PANEL.ancho}px` }) +
        en(x, 640, `<span class="contador">${icono('repeat')}<span data-cifra>3</span><span class="contador__unidad">llamadas al modelo</span></span>`, { paso: 2, propio: true }) +
        en(x, 740, '<p class="tipo-texto" style="margin:0">Por eso un mensaje corto puede desencadenar una ejecución costosa.</p>',
          { paso: 2, orden: 1, estilo: `width:${PANEL.ancho}px` }) +
        capasDeSesion('E19', VUELTAS.map((_, i) => [ANCHO_CAPA, ` data-paso="2" data-propio data-vuelta="${i}"`])) +
        lectura(' data-paso="2" data-hasta="2" data-propio') +
        VUELTAS.map((h, i) => fichaEn(sitio(h), 'resultado', ` data-paso="2" data-hasta="2" data-propio data-ficha="${i}"`)).join('');
      pasos = crearPasos(raiz);
      pasos.poner(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(paso);
        cifra().textContent = '3';
        return;
      }
      if (paso === 1) {
        // La frase entra entera; tras una pausa, se va y en su sitio salen sus fichas, una tras otra.
        const [frase, fichas] = raiz.querySelectorAll('[data-paso="1"]');
        tl.aparecer(frase);
        pausa(tl);
        tl.desaparecer(frase)
          .set(fichas, { autoAlpha: 1 })
          .aparecer(fichas.querySelectorAll('.ficha'), { stagger: s('--escalonado-tokens') });
        pasos.animar(1, tl, { orden: 1 });
        return;
      }
      // Tres vueltas: en cada una, antes de decidir, la línea de lectura recorre lo ocupado
      // (cada vez más) y la cuenta de llamadas sube.
      const contador = cifra().closest('[data-propio]');
      const linea = raiz.querySelector('.ventana__lectura');
      // Desde su sitio (borde de la caja, contorno y holgura) hasta el final de lo ocupado, sin pasarse.
      const inicio = parseFloat(linea.parentElement.style.left) + px('--trazo-contorno') + linea.offsetLeft;
      cifra().textContent = '0';
      tl.aparecer(contador);
      pasos.animar(2, tl, { orden: 1 });
      VUELTAS.forEach((h, i) => {
        const fin = finDeSesion('E19', Array(i).fill(ANCHO_CAPA)) - inicio - px('--trazo-fuerte');
        tl.subirContador(cifra(), { desde: i, hasta: i + 1, duration: s('--dur-micro') })
          .releerVentana(linea, { hasta: fin }, '<');
        vuelta(tl, hub, { herramienta: h, ficha: raiz.querySelector(`[data-ficha="${i}"]`), capa: raiz.querySelector(`[data-vuelta="${i}"]`), duracion: s('--dur-vuelta-rapida') });
      });
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
