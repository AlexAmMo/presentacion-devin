// Contrato de escena y marcador de posición.
//
// Cada escena real vive en src/escenas/EXX.js (EXX es su id en escenas.md) y exporta
// por defecto una función que recibe { escena, raiz } y devuelve su controlador:
//
//   export default function ({ escena, raiz, hub }) {
//     return {
//       montar() { … },
//       irA(paso, { animar, tl }) { … },
//       desmontar() { … },
//     };
//   }
//
// - escena: sus datos de src/datos/escenas.js (id, título, mensaje, pasos…).
// - hub: solo en las escenas del hub (E04, E14, E18), el hub de src/hub.js, que está debajo
//   de su raíz. Pueden recorrer su bucle y pulsar sus herramientas (movimientos que vuelven a
//   su sitio); sus piezas las pone el esqueleto.
// - raiz: un elemento de --escena-ancho × --escena-alto ya colocado en el mundo. La escena
//   dibuja dentro con posiciones en px de 1920×1080 y nunca toca nada de fuera. Si varias
//   escenas comparten pantalla (un tema con varias escenas), sus raíces están en el mismo
//   sitio: el esqueleto muestra una y hace el relevo (la anterior desaparece y esta aparece).
// - montar(): crea su DOM en el estado 0, el de antes del primer paso.
// - irA(paso, { animar: false }): pone al instante el estado final de ese paso
//   (0 = antes del primero; pasos.length = terminada). Tiene que poder llamarse en
//   cualquier orden: así se salta, se retrocede y se recarga en cualquier paso.
// - irA(paso, { animar: true, tl }): añade al timeline tl la animación que lleva del
//   paso − 1 al paso, encadenando efectos de motion.js con s()/v(). El esqueleto la
//   coloca después del vuelo y de --pausa-tras-camara: la escena nunca mueve la cámara.
//   Los cambios de clase van con tl.set(…, { attr: { class } }), para que el timeline
//   pueda completarse de golpe si el ponente avanza antes de que termine.
// - activa(si) (opcional): la escena pasa a ser la actual (true) o deja de serlo (false). Para
//   lo que se mueve sin fin mientras se ve (la flecha que gira de E02): se pausa al irse.
// - desmontar(): mata sus timelines y vacía raiz.
// - Los pasos [A] ocurren en la misma pantalla, sin acercar la cámara.
//
// Las escenas sin fichero usan el marcador de posición de abajo: una isla con el id,
// el título, el mensaje y la lista de pasos, con el paso actual resaltado.
import { icono } from '../../design/iconos.js';
import { esc, enLinea } from '../texto.js';
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
 * Marcador de posición de una escena. Variantes: 'escena' (isla a pantalla completa) y
 * 'panel' (escenas del hub: a la derecha del agente).
 */
export function crearMarcador({ escena, raiz, variante = 'escena' }) {
  let filas = [];
  return {
    montar() {
      const zona = ZONAS[escena.zona];
      const lugar = `${escena.bloqueCorto} · ${zona.nombre}`;
      // En el panel del hub no hay cabecera: el id va en la etiqueta.
      const conCabecera = variante === 'escena';
      const meta = [escena.guion && `Guion: ${escena.guion}`, escena.minutos != null && `~${String(escena.minutos).replace('.', ',')}\u00a0min`].filter(Boolean).join(' · ');
      const pasos = escena.pasos.map(p => {
        const marcas = [
          p.avanzado && marca('', 'Avanzado'),
          p.detalleAvanzado && marca('', 'Detalle avanzado'),
          p.hub && marca(PIEZAS[p.hub].icono, `${escena.zona === 'hub' ? 'Entra en el hub' : 'Se coloca en el hub'} · ${PIEZAS[p.hub].nombre}`),
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
  };
}
