// E03 · Dónde está cada control. Comparte pantalla con E02.
// A la izquierda, Devin Desktop: primero entero y después ampliado en el panel de la sesión, donde
// están todos los controles. Paso a paso, la captura cambia de estado (el desplegable del modelo,
// el del modo, el aviso del contexto), un resaltado rodea el control y una guía en codo lo une a su
// etiqueta, a la derecha. Solo el resaltado del paso está a la vista (es el acento); las etiquetas
// se quedan. Al final, lo que hay que mirar antes de empezar.
// Capturas: grabación de Devin Desktop del 15-10-2026 (src/escenas/capturas). Las medidas, en px
// de esa grabación (1512 × 949 pt a 2×).
// Pasos: 1 captura · 2 mensajes · 3 modelo · 4 effort · 5 modo · 6 contexto · 7 antes de empezar.
import { gsap } from 'gsap';
import { px } from '../../design/motion.js';
import { icono } from '../../design/iconos.js';
import { codo } from '../../design/dibujos.js';
import { en, paso, cabecera, crearPasos } from './comun.js';
import base from './capturas/devin-desktop.png';
import conModelo from './capturas/devin-desktop-modelo.png';
import conModo from './capturas/devin-desktop-modo.png';
import conContexto from './capturas/devin-desktop-contexto.png';

const FOTO = { ancho: 3024, alto: 1898 };
// La zona ampliada: el panel de la sesión con sus desplegables (misma proporción que el marco).
const ZONA = { x: 1370, y: 860, ancho: 1654, alto: 1038 };
const MARCO = { x: 120, y: 272, ancho: 1121, alto: 704 };
const ENTERA = { escala: MARCO.ancho / FOTO.ancho, x: 0, y: 0 };
const k = MARCO.ancho / ZONA.ancho;
const AMPLIADA = { escala: k, x: -ZONA.x * k, y: -ZONA.y * k };
// Los estados de la captura: cada uno, la zona ampliada con algo abierto, desde su paso hasta el siguiente.
const ESTADOS = [[conModelo, 3, 5], [conModo, 5, 6], [conContexto, 6, 7]];
// Cada control: icono y texto de su etiqueta, su caja en px de la zona ampliada y por dónde sale
// su guía: por la derecha (a la altura «y», si se da) o por abajo, por debajo de la barra de mensajes.
const CONTROLES = [
  ['message-square', 'Cuadro de mensajes', [960, 710, 1634, 896], 'derecha'],
  ['cpu', 'Modelo', [1086, 820, 1266, 876], 'abajo'],
  ['gauge', 'Effort', [510, 382, 1056, 510], 'derecha', 420],
  ['code-xml', 'Modo', [1030, 820, 1090, 876], 'abajo'],
  ['app-window', 'Contexto', [1388, 821, 1442, 875], 'abajo'],
];
const ANTES = [['cpu', 'Modelo'], ['gauge', 'Effort'], ['code-xml', 'Modo']];
// Las etiquetas, en columna a la derecha; las guías bajan por un carril entre la captura y ellas.
const EX = 1300, EY = i => 300 + i * 72, CARRIL_X = 1272;

export default function ({ escena, raiz }) {
  let pasos = null, lienzo = null;
  return {
    montar() {
      // De px de la zona ampliada a px de la pantalla (dentro del contorno del marco).
      const b = px('--trazo-contorno'), t = px('--trazo-fuerte');
      const X = x => MARCO.x + b + x * k, Y = y => MARCO.y + b + y * k;
      const estados = ESTADOS.map(([src, desde, hasta]) =>
        `<img src="${src}" alt="" style="left:${ZONA.x}px;top:${ZONA.y}px;width:${ZONA.ancho}px;height:${ZONA.alto}px"${paso(desde, { hasta, opciones: { distancia: 0 } })}>`).join('');
      const resaltados = CONTROLES.map(([, , [x0, y0, x1, y1]], i) =>
        `<div class="resaltado" style="left:${X(x0) - t}px;top:${Y(y0) - t}px;width:${(x1 - x0) * k}px;height:${(y1 - y0) * k}px"${paso(i + 2, { hasta: i + 3, efecto: 'entrarConMuelle', orden: 1 })}></div>`).join('');

      raiz.innerHTML =
        cabecera(escena, 1680) +
        en(MARCO.x, MARCO.y, `<div class="captura" style="width:${MARCO.ancho}px;height:${MARCO.alto}px">
            <div class="captura__lienzo" style="width:${FOTO.ancho}px;height:${FOTO.alto}px"><img src="${base}" alt="Devin Desktop" style="left:0;top:0;width:${FOTO.ancho}px;height:${FOTO.alto}px">${estados}</div></div>`, { paso: 1 }) +
        resaltados +
        `<svg style="position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible">${CONTROLES.map((c, i) =>
          `<path class="resaltado__guia" data-guia${paso(i + 2, { hasta: i + 3, efecto: 'trazar', orden: 2 })}/>`).join('')}</svg>` +
        CONTROLES.map(([ic, texto], i) => en(EX, EY(i), `<span class="etiqueta" data-etiqueta>${icono(ic, 'icono--s')}${texto}</span>`, { paso: i + 2, orden: 3 })).join('') +
        en(EX, 712, '<p class="tipo-texto" style="margin:0;font-weight:var(--peso-enfasis)">Antes de empezar</p>', { paso: 7 }) +
        en(EX, 776, `<div style="display:flex;gap:var(--esp-4)">${ANTES.map(([ic, texto]) =>
          `<div class="vineta">${icono(ic)}<span class="vineta__titulo">${texto}</span></div>`).join('')}</div>`, { paso: 7, orden: 1 });

      // Cada guía sale del borde de su resaltado y llega al borde izquierdo de su etiqueta.
      const caja = raiz.getBoundingClientRect(), escala = caja.width / 1920;
      const etiquetas = [...raiz.querySelectorAll('[data-etiqueta]')].map(el => {
        const r = el.getBoundingClientRect();
        return [(r.left - caja.left) / escala, (r.top + r.height / 2 - caja.top) / escala];
      });
      const carrilY = Y(906);
      raiz.querySelectorAll('[data-guia]').forEach((guia, i) => {
        const [, , [x0, y0, x1, y1], salida, ys] = CONTROLES[i];
        const [ex, ey] = etiquetas[i];
        const puntos = salida === 'derecha'
          ? [[X(x1) + t / 2, Y(ys ?? (y0 + y1) / 2)], [CARRIL_X, Y(ys ?? (y0 + y1) / 2)], [CARRIL_X, ey], [ex, ey]]
          : [[X((x0 + x1) / 2), Y(y1) + t / 2], [X((x0 + x1) / 2), carrilY], [CARRIL_X, carrilY], [CARRIL_X, ey], [ex, ey]];
        guia.setAttribute('d', codo(puntos));
      });
      lienzo = raiz.querySelector('.captura__lienzo');
      pasos = crearPasos(raiz);
      pasos.poner(0);
      gsap.set(lienzo, { scale: ENTERA.escala, x: 0, y: 0, transformOrigin: '0 0' });
    },

    irA(n, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(n);
        const vista = n >= 2 ? AMPLIADA : ENTERA;
        return void gsap.set(lienzo, { scale: vista.escala, x: vista.x, y: vista.y });
      }
      // Paso 2: la captura se amplía hasta el panel de la sesión antes del primer resaltado.
      if (n === 2) tl.ampliarCaptura(lienzo, AMPLIADA);
      // El resaltado y la guía anteriores (y el estado de la captura) se van juntos; después,
      // por grupos: el nuevo estado, el resaltado, la guía y la etiqueta.
      pasos.salir(n, tl);
      pasos.ordenes(n).forEach(o => pasos.animar(n, tl, { orden: o, sinSalidas: true }));
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
