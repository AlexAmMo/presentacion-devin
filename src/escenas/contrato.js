// Contrato de escena y marcador de posición.
//
// Cada escena real vive en src/escenas/EXX.js (EXX es su id en escenas.md) y exporta
// por defecto una función que recibe { escena, raiz } y devuelve su controlador:
//
//   export default function ({ escena, raiz }) {
//     return {
//       montar() { … },
//       irA(paso, { animar, tl }) { … },
//       desmontar() { … },
//       encuadreAvanzado(paso) { … },   // opcional
//     };
//   }
//
// - escena: sus datos de src/datos/escenas.js (id, título, mensaje, pasos…).
// - raiz: un elemento de --escena-ancho × --escena-alto ya colocado en el mundo. La escena
//   dibuja dentro con posiciones en px de 1920×1080 y nunca toca nada de fuera.
// - montar(): crea su DOM en el estado 0, el de antes del primer paso.
// - irA(paso, { animar: false }): pone al instante el estado final de ese paso
//   (0 = antes del primero; pasos.length = terminada). Tiene que poder llamarse en
//   cualquier orden: así se salta, se retrocede y se recarga en cualquier paso.
// - irA(paso, { animar: true, tl }): añade al timeline tl la animación que lleva del
//   paso − 1 al paso, encadenando efectos de motion.js con s()/v(). El esqueleto la
//   coloca después del vuelo y de --pausa-tras-camara: la escena nunca mueve la cámara.
//   Los cambios de clase van con tl.set(…, { attr: { class } }), para que el timeline
//   pueda completarse de golpe si el ponente avanza antes de que termine.
// - desmontar(): mata sus timelines y vacía raiz.
// - encuadreAvanzado(paso): opcional. Rectángulo { x, y, ancho, alto }, relativo a la
//   escena, al que se acerca la cámara en un paso [A]. Sin él, la cámara no se acerca.
// - reservaInferior(): opcional, solo en las escenas que se ven desde la vista general
//   (E01 y E30). Alto en px de 1920×1080 que su capa ocupa abajo: la cámara sube el
//   mapa para que no quede tapado.
//
// Las escenas sin fichero usan el marcador de posición de abajo: una isla con el id,
// el título, el mensaje y la lista de pasos, con el paso actual resaltado.
import { icono } from '../../design/iconos.js';
import { esc, enLinea } from '../texto.js';
import { px } from '../../design/motion.js';
import { ZONAS, HUB } from '../datos/mapa.js';

const PIEZAS = Object.fromEntries(HUB.piezas.map(p => [p.id, p]));
const marca = (ic, texto) => `<span class="etiqueta marcador__marca">${ic ? icono(ic, 'icono--s') : ''}${texto}</span>`;

/** Clases de la fila de un paso en el paso actual de la escena. */
const clasesFila = (fila, actual) => {
  const n = Number(fila.dataset.paso);
  const base = fila.getAttribute('class').split(/\s+/).filter(c => c !== 'paso--hecho' && c !== 'paso--actual');
  return [...base, ...(n < actual ? ['paso--hecho'] : n === actual ? ['paso--actual'] : [])].join(' ');
};

/**
 * Marcador de posición de una escena. Variantes: 'escena' (isla a pantalla completa),
 * 'panel' (escenas del hub: a la derecha del agente) y 'pantalla' (E01 y E30: sobre la
 * vista general, en la capa fija de la pantalla).
 */
export function crearMarcador({ escena, raiz, variante = 'escena' }) {
  let filas = [];
  return {
    montar() {
      const zona = ZONAS[escena.zona];
      const lugar = escena.zona === 'general' ? escena.bloqueCorto : `${escena.bloqueCorto} · ${zona.nombre}`;
      // En el panel del hub y en la capa de la vista general no hay cabecera: el id va en la etiqueta.
      const conCabecera = variante === 'escena';
      const meta = [escena.guion && `Guion: ${escena.guion}`, escena.minutos != null && `~${String(escena.minutos).replace('.', ',')}\u00a0min`].filter(Boolean).join(' · ');
      const pasos = escena.pasos.map(p => {
        const marcas = [
          p.avanzado && marca('', 'Avanzado'),
          p.detalleAvanzado && marca('', 'Detalle avanzado'),
          p.hub && marca(PIEZAS[p.hub].icono, `${p.viaja ? 'Pieza al hub' : 'Entra en el hub'} · ${PIEZAS[p.hub].nombre}`),
        ].filter(Boolean).join('');
        const detalle = p.detalle.length ? `<ul class="marcador__detalle">${p.detalle.map(d => `<li>${enLinea(d)}</li>`).join('')}</ul>` : '';
        return `<li class="paso${p.avanzado ? ' paso--avanzado' : ''}" data-paso="${p.n}">
          <span class="paso__n">${p.n}</span><div class="paso__texto">${enLinea(p.texto)}${detalle}${marcas ? `<div class="paso__marcas">${marcas}</div>` : ''}</div></li>`;
      }).join('');
      const panel = variante === 'panel' ? ` style="left:${HUB.panel.x}px;top:${HUB.panel.y}px;width:${HUB.panel.ancho}px;height:${HUB.panel.alto}px"` : '';
      raiz.innerHTML = `<article class="isla marcador marcador--${variante}"${panel}>
        ${conCabecera ? `<div class="isla__cabecera"><span class="isla__numero">${escena.id}</span>${icono(zona.icono)}</div>` : ''}
        <div class="marcador__cuerpo">
          <header class="marcador__ficha">
            <span class="etiqueta">${conCabecera ? '' : `${icono(zona.icono, 'icono--s')}${escena.id} · `}${esc(lugar)}</span>
            <h2 class="marcador__titulo tipo-titulo-s">${enLinea(escena.titulo)}</h2>
            <p class="marcador__mensaje tipo-texto">${enLinea(escena.mensaje)}</p>
            <p class="marcador__meta tipo-etiqueta">${esc(meta)}${meta ? ' · ' : ''}Marcador provisional</p>
          </header>
          <ol class="marcador__pasos" aria-label="Pasos de ${escena.id}">${pasos}</ol>
        </div>
      </article>`;
      filas = [...raiz.querySelectorAll('.paso')];
    },

    /** Si la lista no cabe con el texto a --tipo-texto-s, pasa a --tipo-etiqueta (el mínimo). Se llama con las fuentes ya cargadas. */
    ajustar() {
      const lista = raiz.querySelector('.marcador__pasos');
      const isla = raiz.querySelector('.marcador');
      isla.classList.remove('marcador--denso');
      if (lista.scrollHeight > lista.clientHeight + 1) isla.classList.add('marcador--denso');
      return lista.scrollHeight <= lista.clientHeight + 1;
    },

    irA(paso, { animar = false, tl } = {}) {
      if (animar && tl) tl.set(filas, { attr: { class: (i, fila) => clasesFila(fila, paso) } });
      else filas.forEach(fila => fila.setAttribute('class', clasesFila(fila, paso)));
    },

    desmontar() {
      raiz.innerHTML = '';
      filas = [];
    },

    reservaInferior() {
      if (variante !== 'pantalla') return 0;
      const isla = raiz.querySelector('.marcador');
      return raiz.offsetHeight - isla.offsetTop;
    },

    /**
     * Paso [A]: la cámara se acerca ×1,5 a su fila. El encuadre empieza en la columna de pasos
     * (puede asomar unos px al hueco entre escenas, nunca a la escena vecina) y no se sale por arriba ni por abajo.
     */
    encuadreAvanzado(paso) {
      const fila = filas.find(f => Number(f.dataset.paso) === paso);
      if (!fila) return null;
      const enRaiz = el => {
        let [x, y] = [0, 0];
        for (; el && el !== raiz; el = el.offsetParent) { x += el.offsetLeft; y += el.offsetTop; }
        return { x, y };
      };
      const lista = raiz.querySelector('.marcador__pasos');
      const [ancho, alto] = [escena.ancho / 1.5, escena.alto / 1.5];
      const x = Math.min(enRaiz(lista).x - px('--esp-4'), escena.ancho - ancho + px('--esp-6'));
      const y = enRaiz(fila).y + fila.offsetHeight / 2 - alto / 2;
      return { x: Math.max(x, 0), y: Math.min(Math.max(y, 0), escena.alto - alto), ancho, alto };
    },
  };
}
