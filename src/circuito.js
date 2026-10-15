// El circuito de Buenas prácticas (src/datos/mapa.js, CIRCUITO): fijo en su pantalla mientras
// E24–E29 se relevan. Como el hub, su estado sale del paso (pasos.js): la parada de la escena
// que se ve en esa pantalla va en acento, con el punto encima, y las anteriores, hechas.
import { gsap } from 'gsap';
import { circuito } from '../design/dibujos.js';
import { CIRCUITO } from './datos/mapa.js';

/**
 * Monta el circuito en la pantalla (x, y del mundo) y devuelve:
 * - pintar(actual): al instante, con la parada «actual» (índice; null: ninguna todavía).
 * - mover(tl, desde, hasta): añade a tl el paso de una parada a otra: el punto recorre la pista.
 */
export function crearCircuito({ mundo, x, y }) {
  const raiz = document.createElement('div');
  raiz.className = 'circuito-fijo';
  raiz.style.cssText = `position:absolute;left:${x + CIRCUITO.x}px;top:${y + CIRCUITO.y}px`;
  // Cada parada, numerada por su orden en el método (1 a 6), no por su escena.
  const paradas = Object.entries(CIRCUITO.paradas).map(([, nombre], i) => ({ id: String(i + 1), nombre }));
  raiz.innerHTML = circuito({ paradas, ancho: CIRCUITO.ancho, alto: CIRCUITO.alto, actual: 0 });
  mundo.append(raiz);

  const svg = raiz.querySelector('.circuito');
  const pista = svg.querySelector('.circuito__pista'), punto = svg.querySelector('.circuito__punto');
  const grupos = [...svg.querySelectorAll('.circuito__parada')];
  const fracciones = svg.dataset.fracciones.split(',').map(Number);
  const clases = (actual, i) => `circuito__parada${i === actual ? ' circuito__parada--actual' : actual != null && i < actual ? ' circuito__parada--hecha' : ''}`;
  const sitio = i => grupos[i].querySelector('circle');

  return {
    raiz,
    pintar(actual) {
      gsap.killTweensOf(punto);
      grupos.forEach((g, i) => g.setAttribute('class', clases(actual, i)));
      gsap.set(punto, { autoAlpha: actual == null ? 0 : 1 });
      if (actual != null) gsap.set(punto, { attr: { cx: sitio(actual).getAttribute('cx'), cy: sitio(actual).getAttribute('cy') } });
    },
    mover(tl, desde, hasta) {
      if (desde == null || hasta == null || desde === hasta) {
        tl.add(() => this.pintar(hasta));
        return;
      }
      // La parada de la que se sale queda hecha; el punto recorre la pista y la nueva pasa a actual.
      tl.set(grupos, { attr: { class: (i) => clases(null, i) + (i < hasta ? ' circuito__parada--hecha' : '') } })
        .recorrerCamino(punto, { camino: pista, desde: fracciones[desde], hasta: fracciones[hasta] + (fracciones[hasta] < fracciones[desde] ? 1 : 0) })
        .set(grupos, { attr: { class: (i) => clases(hasta, i) } });
    },
  };
}
