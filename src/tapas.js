// Las tapas: una por bloque del mapa (región), con su título, que es el de su parte en
// escenas.md, y el icono de su zona. La del centro lleva en su lugar el logo de Devin y, debajo,
// su nombre: la portada (E01/1) encuadra ese logo y ese nombre.
// Tapan su bloque hasta que se entra en él por primera vez. Su estado sale del paso,
// como el del hub: al saltar, retroceder o recargar, cada una está abierta o cerrada.
// Los títulos de las de fuera llegan con la vista general (E01/2): hasta entonces solo se ve
// su icono, centrado; al llegar, el icono sube y el título aparece debajo.
import { gsap } from 'gsap';
import logoDevin from '../design/assets/logos/devin-avatar-fondo-claro.svg';
import { s, v } from '../design/motion.js';
import { icono } from '../design/iconos.js';
import { ESCENAS } from './datos/escenas.js';
import { ZONAS, TAPAS } from './datos/mapa.js';
import { esc } from './texto.js';

const quitar = (el, clase) => el.getAttribute('class').split(/\s+/).filter(c => c !== clase).join(' ');

/**
 * Monta las tapas en «capa» (dentro del mundo) y devuelve:
 * - pintar(abiertas): pone al instante las tapas; abiertas = Set de regiones.
 * - abrir(region, tl, posicion): añade a tl la tapa que se levanta (en «posicion» de tl, si se da).
 * - titulos(visibles): pone al instante los títulos de las de fuera (o solo sus iconos, centrados).
 * - mostrarTitulos(tl): añade a tl la llegada de los títulos: cada icono sube y aparece su título.
 * - portada(): el rectángulo del mundo que encuadra la portada.
 */
export function crearTapas({ capa }) {
  const bloques = new Map();
  for (const e of ESCENAS) {
    if (e.x == null) continue;
    // El título es el de la parte de la primera escena del bloque.
    const b = bloques.get(e.region) ?? { titulo: e.bloqueTitulo, icono: ZONAS[e.zona].icono, x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity, centro: false };
    Object.assign(b, { x0: Math.min(b.x0, e.x), y0: Math.min(b.y0, e.y), x1: Math.max(b.x1, e.x + e.ancho), y1: Math.max(b.y1, e.y + e.alto) });
    if (e.zona === 'hub') b.centro = true;
    bloques.set(e.region, b);
  }
  const tapas = new Map();
  for (const [region, b] of bloques) {
    const [hx, hy] = b.centro ? TAPAS.holgura : TAPAS.holguraFuera;
    const tapa = document.createElement('div');
    tapa.className = b.centro ? 'tapa tapa--centro' : 'tapa';
    tapa.dataset.region = region;
    tapa.setAttribute('aria-hidden', 'true');
    tapa.style.cssText = `position:absolute;left:${b.x0 - hx}px;top:${b.y0 - hy}px;width:${b.x1 - b.x0 + 2 * hx}px;height:${b.y1 - b.y0 + 2 * hy}px`;
    tapa.innerHTML = b.centro
      ? `<div class="tapa__contenido"><img class="tapa__logo" src="${logoDevin}" alt=""><h2 class="tapa__titulo">${esc(TAPAS.tituloCentro)}</h2></div>`
      : `<div class="tapa__contenido">${icono(b.icono, 'tapa__icono')}<h2 class="tapa__titulo">${esc(b.titulo)}</h2></div>`;
    capa.append(tapa);
    tapas.set(region, tapa);
  }
  let marco = null;
  const fuera = [...tapas.values()].filter(t => !t.classList.contains('tapa--centro'));
  const iconos = fuera.map(t => t.querySelector('.tapa__icono'));
  const titulos = fuera.map(t => t.querySelector('.tapa__titulo'));
  // Lo que baja cada icono para quedar centrado solo: la mitad de su título y del hueco que los separa.
  const bajada = (i, el) => {
    const contenido = el.parentElement;
    return (titulos[i].offsetHeight + parseFloat(getComputedStyle(contenido).rowGap)) / 2;
  };

  return {
    pintar(abiertas) {
      for (const [region, tapa] of tapas) {
        gsap.killTweensOf(tapa);
        gsap.set(tapa, { clearProps: 'opacity,visibility' });
        tapa.classList.toggle('oculto', abiertas.has(region));
      }
    },
    abrir(region, tl, posicion) {
      const tapa = tapas.get(region);
      if (!tapa) return;
      tl.desaparecer(tapa, {}, posicion)
        .set(tapa, { attr: { class: (i, el) => `${quitar(el, 'oculto')} oculto` } })
        .set(tapa, { clearProps: 'opacity,visibility' });
    },
    titulos(visibles) {
      gsap.killTweensOf([...iconos, ...titulos]);
      gsap.set(iconos, { y: visibles ? 0 : bajada });
      gsap.set(titulos, visibles ? { clearProps: 'opacity,visibility,transform' } : { autoAlpha: 0 });
    },
    mostrarTitulos(tl) {
      tl.to(iconos, { y: 0, duration: s('--dur-entrada'), ease: v('--ease-aparicion') })
        .aparecer(titulos, { distancia: 0 }, '<');
    },
    portada() {
      // El logo y el nombre ocupan TAPAS.portada del alto; el ancho sale de la proporción de la
      // pantalla. Se mide una vez, con la tapa a la vista aunque ya esté levantada.
      if (marco) return marco;
      const tapa = [...tapas.values()].find(t => t.classList.contains('tapa--centro'));
      const contenido = tapa.querySelector('.tapa__contenido');
      const oculta = tapa.classList.contains('oculto');
      tapa.classList.remove('oculto');
      const cx = tapa.offsetLeft + tapa.clientLeft + contenido.offsetLeft + contenido.offsetWidth / 2;
      const cy = tapa.offsetTop + tapa.clientTop + contenido.offsetTop + contenido.offsetHeight / 2;
      const alto = contenido.offsetHeight / TAPAS.portada, ancho = (alto * 16) / 9;
      if (oculta) tapa.classList.add('oculto');
      marco = { x: cx - ancho / 2, y: cy - alto / 2, ancho, alto };
      return marco;
    },
  };
}
