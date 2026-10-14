// Las tapas: una por bloque del mapa (región), con su título, que es el de su parte en
// escenas.md. La del centro lleva además el logo de Devin, centrado en la pantalla del
// hub: la portada (E01/1) es esa tapa vista de cerca.
// Tapan su bloque hasta que se entra en él por primera vez. Su estado sale del paso,
// como el del hub: al saltar, retroceder o recargar, cada una está abierta o cerrada.
import { gsap } from 'gsap';
import logoDevin from '../design/assets/logos/devin-avatar-fondo-claro.svg';
import { ESCENAS } from './datos/escenas.js';
import { esc } from './texto.js';

// px del mundo alrededor del bloque: al encuadrar una de sus pantallas, el borde de la tapa no asoma.
const HOLGURA = 160;
// Separación entre la pantalla del hub y el título de la tapa del centro, que queda debajo
// para que la portada sea solo el logo.
const BAJO_EL_HUB = 160;

const quitar = (el, clase) => el.getAttribute('class').split(/\s+/).filter(c => c !== clase).join(' ');

/**
 * Monta las tapas en el mundo y devuelve:
 * - pintar(abiertas): pone al instante las tapas; abiertas = Set de regiones.
 * - abrir(region, tl): añade a tl la tapa que se levanta.
 */
export function crearTapas({ mundo }) {
  const bloques = new Map();
  for (const e of ESCENAS) {
    if (e.x == null) continue;
    // El título es el de la parte de la primera escena del bloque (E19 está en el hub, pero es de la parte 3).
    const b = bloques.get(e.region) ?? { titulo: e.bloqueTitulo, x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity, hub: null };
    Object.assign(b, { x0: Math.min(b.x0, e.x), y0: Math.min(b.y0, e.y), x1: Math.max(b.x1, e.x + e.ancho), y1: Math.max(b.y1, e.y + e.alto) });
    if (e.zona === 'hub') b.hub = e;
    bloques.set(e.region, b);
  }
  const tapas = new Map();
  for (const [region, b] of bloques) {
    const [x, y] = [b.x0 - HOLGURA, b.y0 - HOLGURA];
    const tapa = document.createElement('div');
    tapa.className = 'tapa';
    tapa.dataset.region = region;
    tapa.setAttribute('aria-hidden', 'true');
    tapa.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${b.x1 - b.x0 + 2 * HOLGURA}px;height:${b.y1 - b.y0 + 2 * HOLGURA}px`;
    const titulo = `<h2 class="tapa__titulo"${b.hub ? ` style="position:absolute;left:0;right:0;top:${b.hub.y + b.hub.alto + BAJO_EL_HUB - y}px"` : ''}>${esc(b.titulo)}</h2>`;
    tapa.innerHTML = b.hub ? `<img class="tapa__logo" src="${logoDevin}" alt="">${titulo}` : titulo;
    mundo.append(tapa);
    tapas.set(region, tapa);
  }

  return {
    pintar(abiertas) {
      for (const [region, tapa] of tapas) {
        gsap.killTweensOf(tapa);
        gsap.set(tapa, { clearProps: 'opacity,visibility' });
        tapa.classList.toggle('oculto', abiertas.has(region));
      }
    },
    abrir(region, tl) {
      const tapa = tapas.get(region);
      if (!tapa) return;
      tl.desaparecer(tapa)
        .set(tapa, { attr: { class: (i, el) => `${quitar(el, 'oculto')} oculto` } })
        .set(tapa, { clearProps: 'opacity,visibility' });
    },
  };
}
