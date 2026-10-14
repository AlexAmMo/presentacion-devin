// El hub: la tarjeta del agente con un hueco por pieza (src/datos/mapa.js, HUB).
// Su estado sale solo del paso: las piezas cuya llegada es ese paso o uno anterior
// están encajadas. Así es correcto al saltar, retroceder o recargar en cualquier paso.
// Las piezas de los temas de alrededor se colocan sin animación (el hub no está a la
// vista); las que llegan en un paso del hub (E14, E18) entran animadas en su sitio.
import { gsap } from 'gsap';
import { icono } from '../design/iconos.js';
import { bucle } from '../design/dibujos.js';
import { HUB } from './datos/mapa.js';

const formaDe = p => (['circulo', 'recipiente', 'documento'].includes(p.forma) ? ` hueco--${p.forma}` : '');
const silueta = p =>
  `<div class="hueco${formaDe(p)}" style="width:${p.ancho}px;height:${p.alto}px">${icono(p.icono, p.ancho < 112 ? 'icono--s' : '')}${p.nombre}</div>`;
const quitar = (el, clase) => el.getAttribute('class').split(/\s+/).filter(c => c !== clase).join(' ');

/**
 * Monta el hub en su pantalla (x, y del mundo) y devuelve:
 * - pintar(llegadas): pone al instante el hub con esas piezas (un Set de ids).
 * - llegar(pieza, tl): añade a tl la entrada de la pieza en su sitio, con el hub a la vista.
 */
export function crearHub({ mundo, x, y, ancho, alto }) {
  const raiz = document.createElement('div');
  raiz.className = 'hub';
  raiz.style.cssText = `left:${x}px;top:${y}px;width:${ancho}px;height:${alto}px`;
  const piezas = HUB.piezas;
  const huecos = piezas.filter(p => !['bucle', 'plugin'].includes(p.forma));
  const plugin = piezas.find(p => p.forma === 'plugin');

  raiz.innerHTML = `
    <div class="plugin hub__plugin oculto" data-pieza="plugin" style="left:${plugin.x}px;top:${plugin.y}px;width:${plugin.ancho}px;height:${plugin.alto}px">
      <span class="plugin__etiqueta">${icono('package', 'icono--s')}plugin</span></div>
    <div class="hub__bucle oculto" data-pieza="bucle">${bucle()}</div>
    <div class="agente hub__agente" style="left:${HUB.agente.x}px;top:${HUB.agente.y}px">${icono('bot', 'icono--l')}<div><div class="agente__nombre">Agente</div><div class="agente__detalle">Devin</div></div></div>
    ${huecos.map(p => `<div class="hub__pieza" style="left:${p.x}px;top:${p.y}px">${silueta(p).replace('class="hueco', `data-pieza="${p.id}" class="hueco`)}</div>`).join('')}`;
  mundo.append(raiz);

  // El bucle se centra en la tarjeta del agente (su tamaño real, con el relleno).
  const agente = raiz.querySelector('.hub__agente');
  const centro = { x: HUB.agente.x + agente.offsetWidth / 2, y: HUB.agente.y + agente.offsetHeight / 2 };
  const svgBucle = raiz.querySelector('.bucle');
  const [bx, by] = svgBucle.dataset.centro.split(' ').map(Number);
  Object.assign(raiz.querySelector('.hub__bucle').style, { left: `${centro.x - bx}px`, top: `${centro.y - by}px` });

  const conHueco = new Set(huecos.map(p => p.id));
  const elDe = id => raiz.querySelector(`[data-pieza="${id}"]`);

  return {
    raiz,
    pintar(llegadas) {
      for (const p of piezas) {
        const el = elDe(p.id);
        gsap.killTweensOf(el);
        gsap.set(el, { clearProps: 'opacity,visibility,transform' });
        if (conHueco.has(p.id)) el.classList.toggle('hueco--lleno', llegadas.has(p.id));
        else el.classList.toggle('oculto', !llegadas.has(p.id));
      }
      const restos = raiz.querySelectorAll('.bucle__flecha, .bucle__punto');
      gsap.killTweensOf(restos);
      gsap.set(restos, { clearProps: 'opacity,visibility,transform' });
      gsap.set(raiz.querySelectorAll('.bucle__pista'), { clearProps: 'strokeDasharray,strokeDashoffset' });
    },

    llegar(id, tl) {
      const p = piezas.find(q => q.id === id);
      const el = elDe(id);
      if (conHueco.has(id)) {
        tl.set(el, { attr: { class: (i, h) => `${quitar(h, 'hueco--lleno')} hueco--lleno` } }).entrarConMuelle(el);
      } else if (p.forma === 'bucle') {
        tl.set(el, { attr: { class: (i, h) => quitar(h, 'oculto') } })
          .trazar(el.querySelector('.bucle__pista'))
          .aparecer(el.querySelectorAll('.bucle__flecha, .bucle__punto'));
      } else {
        tl.set(el, { attr: { class: (i, h) => quitar(h, 'oculto') } }).entrarConMuelle(el);
      }
    },
  };
}
