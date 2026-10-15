// El hub: el agente en un círculo, sus herramientas de serie pegadas a él sobre el bucle y, en un
// anillo alrededor, una pieza por tema (src/datos/mapa.js, HUB): todas, círculos iguales.
// Su estado sale solo del paso: las piezas cuya llegada es ese paso o uno anterior están
// puestas. Así es correcto al saltar, retroceder o recargar en cualquier paso.
// Las piezas de los temas de alrededor se colocan sin animación (el hub no está a la
// vista); las que llegan en un paso del hub (E14, E18) entran animadas en su sitio.
// Cada pieza tiene dos dibujos en el mismo sitio: el hueco (silueta punteada) y la pieza puesta
// (el círculo en sólido). Contexto tiene un tercero, la ventana de contexto, con una capa por cada
// pieza que deja algo en ella: en los pasos en que se anima el contexto, el círculo se transforma
// en ella (HUB.contextoComoVentana) y, después, vuelve a ser círculo.
import { gsap } from 'gsap';
import { icono } from '../design/iconos.js';
import { bucle } from '../design/dibujos.js';
import { px, s, v } from '../design/motion.js';
import { HUB } from './datos/mapa.js';

const caja = (x, y, html, extra = '') => `<div style="position:absolute;left:${x}px;top:${y}px"${extra}>${html}</div>`;
const quitar = (el, clase) => el.getAttribute('class').split(/\s+/).filter(c => c !== clase).join(' ');
const LIMPIAR = { clearProps: 'opacity,visibility,transform,clipPath,strokeDasharray,strokeDashoffset' };
// El círculo de Contexto, además, vuelve a su caja y a sus colores (los de su clase).
const LIMPIAR_FORMA = { clearProps: 'opacity,visibility,transform,width,height,backgroundColor,borderColor' };

// Las cuatro herramientas de serie, sobre el bucle (ángulo desde arriba, en sentido horario).
export const HERRAMIENTAS = [['search', 'buscar', 45], ['file-text', 'leer', 135], ['pencil', 'editar', 225], ['terminal', 'ejecutar', 315]];

const enCirculo = (radio, angulo) => {
  const a = (angulo * Math.PI) / 180;
  return { x: HUB.centro.x + radio * Math.sin(a), y: HUB.centro.y - radio * Math.cos(a) };
};

/** Centro de cada herramienta de serie en la pantalla del hub. */
export const sitioHerramienta = angulo => enCirculo(px('--bucle-diametro') / 2, angulo);

/** Centro de cada pieza del anillo en la pantalla del hub. */
export const sitioPieza = angulo => enCirculo(HUB.anillo, angulo);

/** Las capas de la ventana de Contexto con las piezas puestas, y dónde acaba lo ocupado (px desde el borde interior del relleno). */
export const capasHub = puestas => {
  const capas = HUB.ventanaCapas.filter(([id]) => puestas.has(id));
  return { capas, fin: capas.reduce((a, [, w]) => a + w + px('--trazo-contorno'), 0) };
};

const circulo = (p, lleno) => `<div class="hueco hueco--pieza${lleno ? ' hueco--lleno' : ''}">${icono(p.icono)}<span>${p.nombre}</span></div>`;

/**
 * Monta el hub en su pantalla (x, y del mundo) y devuelve:
 * - raiz y centro (el del agente y el bucle, en px de la pantalla).
 * - pintar(llegadas, { ventana, base }): pone al instante el hub con esas piezas (un Set de ids),
 *   Contexto como círculo o como ventana y, si base es false, sin nada (antes de que aparezca).
 * - entrar(tl): añade a tl la aparición del hub: Devin, sus herramientas y los huecos de las
 *   piezas, en el orden de la ruta, en una animación rápida y seguida.
 * - llegar(pieza, tl): añade a tl la entrada de la pieza en su sitio, con el hub a la vista.
 * - transformar(tl, aVentana): añade a tl el cambio de Contexto, de círculo a ventana o al revés.
 * Las escenas del hub (E14) pueden animar el punto del bucle y pulsar las herramientas:
 * son movimientos que vuelven a su sitio y no cambian el estado.
 */
export function crearHub({ mundo, x, y, ancho, alto }) {
  const raiz = document.createElement('div');
  raiz.className = 'hub';
  raiz.style.cssText = `left:${x}px;top:${y}px;width:${ancho}px;height:${alto}px`;
  const piezas = HUB.piezas;
  const { centro } = HUB;
  const plugin = piezas.find(p => p.forma === 'plugin');
  const diametro = px('--herramienta-diametro'), D = px('--hub-pieza-diametro');

  // Herramientas de serie: el hueco y la herramienta, cada una en su sitio del bucle. En el hub
  // van sin nombre; sus nombres los da el panel de E14.
  const herramientas = HERRAMIENTAS.map(([ic, nombre, angulo]) => {
    const { x: hx, y: hy } = sitioHerramienta(angulo);
    return caja(hx - diametro / 2, hy - diametro / 2, `
      <div class="hueco hueco--circulo" data-parte="hueco" style="width:${diametro}px;height:${diametro}px">${icono(ic)}</div>
      <div class="herramienta" data-parte="lleno" data-herramienta="${nombre}" style="position:absolute;left:0;top:0">
        <div class="herramienta__circulo">${icono(ic, 'icono--l')}</div></div>`);
  }).join('');

  // Cada pieza del anillo, con su esquina en su sitio; Contexto lleva además su ventana, en su sitio
  // de la pantalla (relativo a la esquina del círculo).
  const anillo = piezas.filter(p => p.angulo != null).map(p => {
    const c = sitioPieza(p.angulo), [px0, py0] = [c.x - D / 2, c.y - D / 2];
    const ventana = p.ventana ? (() => {
      const capas = HUB.ventanaCapas.map(([id, w]) => `<div class="capa capa--entrada" data-capa-de="${id}" style="width:${w}px"></div>`).join('');
      return `<div data-parte="ventana" style="position:absolute;left:${p.ventana.x - px0}px;top:${p.ventana.y - py0}px">
        <span class="tipo-etiqueta" data-rotulo style="position:absolute;bottom:100%;margin-bottom:var(--esp-1);white-space:nowrap;display:flex;align-items:center;gap:var(--esp-1)">${icono(p.icono, 'icono--s')}${p.nombre}</span>
        <div class="ventana" style="width:${p.ventana.ancho}px;height:${p.ventana.alto}px"><div class="ventana__relleno">${capas}</div></div></div>`;
    })() : '';
    return `<div class="hub__pieza" data-pieza="${p.id}" style="left:${px0}px;top:${py0}px">
      <div data-parte="hueco">${circulo(p, false)}</div><div data-parte="lleno" style="position:absolute;left:0;top:0">${circulo(p, true)}</div>${ventana}</div>`;
  }).join('');

  raiz.innerHTML = `
    <div class="plugin hub__plugin" data-pieza="plugin" style="left:${plugin.x}px;top:${plugin.y}px;width:${plugin.ancho}px;height:${plugin.alto}px">
      <span class="plugin__etiqueta">${icono('package', 'icono--s')}plugin</span></div>
    <div class="hub__bucle" data-pieza="bucle">${bucle()}</div>
    <div class="agente agente--circulo hub__agente">${icono('bot', 'icono--l')}<div class="agente__nombre">Devin</div></div>
    ${anillo}
    <div class="hub__pieza" data-pieza="herramientas" style="left:0;top:0">${herramientas}</div>`;
  mundo.append(raiz);

  // El agente y el bucle, centrados en HUB.centro.
  const agente = raiz.querySelector('.hub__agente');
  Object.assign(agente.style, { left: `${centro.x - agente.offsetWidth / 2}px`, top: `${centro.y - agente.offsetHeight / 2}px` });
  const [bx, by] = raiz.querySelector('.bucle').dataset.centro.split(' ').map(Number);
  Object.assign(raiz.querySelector('.hub__bucle').style, { left: `${centro.x - bx}px`, top: `${centro.y - by}px` });

  const elDe = id => raiz.querySelector(`[data-pieza="${id}"]`);
  const partes = (el, parte) => [...el.querySelectorAll(`:scope [data-parte="${parte}"]`)];
  const capas = () => [...raiz.querySelectorAll('[data-capa-de]')];
  const todo = () => [...raiz.querySelectorAll('.hub__agente, [data-pieza], [data-parte], [data-parte] > .hueco, [data-parte] > .hueco > *, [data-rotulo], [data-capa-de], .bucle *')];
  // Lo que aparece con el hub: Devin, sus herramientas y el anillo de piezas (en el orden de la ruta).
  const anilloEnOrden = () => piezas.filter(p => p.angulo != null).map(p => elDe(p.id));
  const bases = () => [raiz.querySelector('.hub__agente'), elDe('herramientas'), ...anilloEnOrden()];

  // Contexto: su círculo puesto, su ventana y la caja de la ventana relativa a la esquina del círculo.
  const contexto = piezas.find(p => p.id === 'contexto');
  const circuloContexto = () => elDe('contexto').querySelector('[data-parte="lleno"] > .hueco');
  const ventanaContexto = () => partes(elDe('contexto'), 'ventana')[0];
  const cajaVentana = () => {
    const c = sitioPieza(contexto.angulo);
    return { x: contexto.ventana.x - (c.x - D / 2), y: contexto.ventana.y - (c.y - D / 2), width: contexto.ventana.ancho, height: contexto.ventana.alto };
  };

  return {
    raiz,
    centro,
    /** El camino del bucle y su punto, para que una escena del hub lo recorra. */
    get bucle() { return { pista: raiz.querySelector('.bucle__pista'), punto: raiz.querySelector('.bucle__punto') }; },
    herramienta: nombre => raiz.querySelector(`[data-herramienta="${nombre}"] .herramienta__circulo`),

    pintar(llegadas, { ventana = false, base = true } = {}) {
      const els = todo();
      gsap.killTweensOf(els);
      gsap.set(els, LIMPIAR);
      gsap.set(circuloContexto(), LIMPIAR_FORMA);
      for (const el of bases()) el.classList.toggle('oculto', !base);
      for (const p of piezas) {
        const el = elDe(p.id), puesta = llegadas.has(p.id);
        if (p.forma === 'bucle' || p.forma === 'plugin') { el.classList.toggle('oculto', !puesta); continue; }
        const comoVentana = Boolean(p.ventana) && ventana;
        partes(el, 'hueco').forEach(h => h.classList.toggle('oculto', puesta));
        partes(el, 'lleno').forEach(h => h.classList.toggle('oculto', !puesta || comoVentana));
        partes(el, 'ventana').forEach(h => h.classList.toggle('oculto', !puesta || !comoVentana));
      }
      for (const c of capas()) c.classList.toggle('oculto', !llegadas.has(c.dataset.capaDe));
    },

    entrar(tl) {
      const [agente, herramientas, ...anillo] = bases();
      const solape = `-=${s('--dur-entrada') / 2}`;
      tl.set(bases(), { attr: { class: (i, el) => quitar(el, 'oculto') } })
        .entrarConMuelle(agente)
        .entrarConMuelle(partes(herramientas, 'hueco'), {}, solape)
        .entrarConMuelle(anillo.map(el => partes(el, 'hueco')[0]), {}, solape);
    },

    llegar(id, tl) {
      const el = elDe(id);
      const p = piezas.find(q => q.id === id);
      if (p.forma === 'bucle') {
        tl.set(el, { attr: { class: (i, h) => quitar(h, 'oculto') } })
          .trazar(el.querySelector('.bucle__pista'))
          .aparecer(el.querySelectorAll('.bucle__flecha, .bucle__punto'), { distancia: 0 });
        return;
      }
      if (p.forma === 'plugin') {
        tl.set(el, { attr: { class: (i, h) => quitar(h, 'oculto') } }).entrarConMuelle(el, { escala: 0.95 });
        return;
      }
      const huecos = partes(el, 'hueco'), llenos = partes(el, 'lleno');
      tl.set(huecos, { attr: { class: (i, h) => `${quitar(h, 'oculto')} oculto` } })
        .set(llenos, { attr: { class: (i, h) => quitar(h, 'oculto') } }, '<')
        .entrarConMuelle(llenos, {}, '<');
      // Lo que la pieza deja en la ventana de contexto aparece con ella (se ve si Contexto es ventana).
      const capa = raiz.querySelector(`[data-capa-de="${id}"]`);
      if (capa) tl.set(capa, { attr: { class: (i, h) => quitar(h, 'oculto') } }, '<');
    },

    transformar(tl, aVentana) {
      const circ = circuloContexto(), wrap = circ.parentElement, ven = ventanaContexto();
      const capasVisibles = () => [...ven.querySelectorAll('[data-capa-de]')].filter(c => !c.classList.contains('oculto'));
      const comoVentana = { ...cajaVentana(), backgroundColor: v('--color-superficie'), borderColor: v('--color-contorno') };
      if (aVentana) {
        // El círculo pierde su contenido, se estira hasta la ventana y la ventana ocupa su lugar;
        // después, su rótulo y sus capas.
        tl.transformar(circ, { caja: cajaVentana(), fondo: v('--color-superficie'), borde: v('--color-contorno') })
          .set(wrap, { attr: { class: () => 'oculto' } })
          .set(ven, { attr: { class: () => '' } })
          .set(circ, LIMPIAR_FORMA)
          .set(circ.children, LIMPIAR)
          .aparecer(ven.querySelector('[data-rotulo]'), { distancia: 0 })
          .add(() => gsap.effects.llenarVentana(capasVisibles()), '<');
      } else {
        // La ventana deja su sitio al círculo, que se encoge desde ella y recupera su contenido.
        tl.set(circ, comoVentana)
          .set(circ.children, { autoAlpha: 0 })
          .set(ven, { attr: { class: () => 'oculto' } })
          .set(wrap, { attr: { class: () => '' } })
          .transformar(circ, { caja: { x: 0, y: 0, width: D, height: D }, fondo: v('--color-superficie-inversa'), borde: v('--color-superficie-inversa'), contenido: true })
          .set(circ, LIMPIAR_FORMA)
          .set(circ.children, LIMPIAR);
      }
    },
  };
}
