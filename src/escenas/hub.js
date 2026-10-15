// Lo que comparten las escenas del hub (E04, E14 y E18): el panel de la derecha, las capas
// que añade la sesión a la ventana del hub y las vueltas del bucle. El hub (src/hub.js) está
// debajo de la raíz de estas escenas, en las mismas coordenadas de pantalla.
import { s, v, px } from '../../design/motion.js';
import { HUB } from '../datos/mapa.js';
import { capasHub, sitioHerramienta, HERRAMIENTAS } from '../hub.js';

/** El panel de la derecha: x, y, ancho y alto. */
export const PANEL = HUB.panel;

// La ventana de Contexto: el sitio que ocupa cuando el círculo de Contexto se transforma en ella.
const CONTEXTO = HUB.piezas.find(p => p.id === 'contexto').ventana;
const PUESTAS_HASTA = { E14: ['contexto', 'rules', 'skills', 'herramientas'] };

/**
 * Capas que añade la sesión a la ventana del hub, encima de su sitio y justo detrás de las de las
 * piezas que ya están puestas en esa escena. capas: [[ancho, atributos de paso]].
 */
export function capasDeSesion(id, capas) {
  const { fin } = capasHub(new Set(PUESTAS_HASTA[id]));
  return `<div style="position:absolute;left:${CONTEXTO.x}px;top:${CONTEXTO.y}px;width:${CONTEXTO.ancho}px;height:${CONTEXTO.alto}px;box-sizing:border-box;border:var(--trazo-contorno) solid transparent">
    <div class="ventana__relleno"><div style="flex:none;width:${fin - px('--trazo-contorno')}px"></div>${capas.map(([w, atrs = '']) => `<div class="capa capa--entrada" style="width:${w}px"${atrs}></div>`).join('')}</div></div>`;
}

/** Una ficha centrada en un punto de la pantalla (envuelta: el envoltorio es lo que se mueve). */
export const fichaEn = ({ x, y }, texto, atrs = '') =>
  `<div style="position:absolute;left:${x}px;top:${y}px;width:0;height:0;display:flex;justify-content:center;align-items:center"${atrs}><span class="ficha ficha--s ficha--entrada" style="flex:none">${texto}</span></div>`;

/** El centro de una herramienta de serie del hub. */
export const sitio = nombre => sitioHerramienta(HERRAMIENTAS.find(([, n]) => n === nombre)[2]);

let vueltas = 0;
/**
 * Una vuelta del bucle (una llamada al modelo): el punto va de lo alto (el modelo decide) a la
 * herramienta, que pulsa; su resultado sale como ficha hacia la ventana y entra como capa,
 * mientras el punto vuelve arriba. Devuelve las etiquetas de sus tres momentos en tl:
 * { decide, actua, entra }, para sincronizar el panel.
 * - duracion: la del recorrido entero del punto (se reparte en proporción al camino).
 * - ficha: el envoltorio de la ficha (fichaEn), colocado sobre la herramienta; capa: la capa de sesión.
 */
export function vuelta(tl, hub, { herramienta, ficha, capa, duracion }) {
  const n = ++vueltas;
  const f = HERRAMIENTAS.find(([, nombre]) => nombre === herramienta)[2] / 360;
  const { pista, punto } = hub.bucle;
  const desde = sitio(herramienta);
  const ventana = capa.closest('.ventana__relleno');
  // El centro de su capa, en la pantalla: el envoltorio, el contorno, la holgura y su sitio en el relleno.
  const caja = ventana.parentElement;
  const hasta = {
    x: parseFloat(caja.style.left) + px('--trazo-contorno') + px('--esp-1') + capa.offsetLeft + capa.offsetWidth / 2,
    y: parseFloat(caja.style.top) + parseFloat(caja.style.height) / 2,
  };
  const [decide, actua, entra] = ['decide', 'actua', 'entra'].map(e => `${e}${n}`);
  tl.addLabel(decide)
    .recorrerCamino(punto, { camino: pista, desde: 0, hasta: f, duration: duracion * f })
    .addLabel(actua)
    .pulsar(hub.herramienta(herramienta), {}, actua)
    .aparecer(ficha, { distancia: 0 }, actua)
    .to(ficha, { x: hasta.x - desde.x, y: hasta.y - desde.y, duration: s('--dur-entrada'), ease: v('--ease-caida') })
    .addLabel(entra)
    .desaparecer(ficha, {}, entra)
    .set(capa, { autoAlpha: 1 }, entra)
    .llenarVentana(capa, {}, entra)
    .recorrerCamino(punto, { camino: pista, desde: f, hasta: 1, duration: duracion * (1 - f) }, actua);
  return { decide, actua, entra };
}
