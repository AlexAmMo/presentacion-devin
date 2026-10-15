// Arranque: la presentación o, con ?ponente, la vista de ponente (el mismo HTML).
import { gsap } from 'gsap';
import { px } from '../design/motion.js';
import { ESCENAS } from './datos/escenas.js';
import { montarMundo } from './mundo.js';
import { crearCamara } from './camara.js';
import { crearNavegacion } from './pasos.js';
import { crearEnlace } from './enlace.js';
import { iniciarPonente } from './ponente.js';

async function iniciarPresentacion() {
  document.body.className = 'presentacion';
  const mundo = montarMundo(document.body);
  // Con las fuentes cargadas, cada marcador comprueba si su lista cabe (y, si no, usa el tamaño mínimo).
  await document.fonts.ready;
  for (const x of mundo.escenas.values()) {
    if (x.ctrl.ajustar?.() === false) console.warn(`${x.datos.id}: la lista de pasos no cabe ni a --tipo-etiqueta; se recorta.`);
  }

  const camara = crearCamara({ mundo: mundo.mundo, portada: mundo.tapas.portada });
  const ajustar = () => {
    const [W, H] = [px('--escena-ancho'), px('--escena-alto')];
    const k = Math.min(innerWidth / W, innerHeight / H);
    const [ancho, alto] = [Math.round(W * k), Math.round(H * k)];
    Object.assign(mundo.escenario.style, {
      width: `${ancho}px`, height: `${alto}px`,
      left: `${Math.round((innerWidth - ancho) / 2)}px`, top: `${Math.round((innerHeight - alto) / 2)}px`,
    });
    camara.ajustar(ancho, alto);
  };
  ajustar();
  addEventListener('resize', ajustar);

  let nav = null;
  const minutosHasta = i => ESCENAS.slice(0, i + 1).reduce((a, e) => a + (e.minutos ?? 0), 0);
  const estado = () => {
    const p = nav.actual, e = p.escena, sig = nav.siguiente();
    const resumen = x => x && { ref: x.ref, escena: x.escena.id, titulo: x.escena.titulo, n: x.n, total: x.escena.pasos.length, texto: x.texto, detalle: x.detalle, avanzado: x.avanzado };
    return {
      escena: { id: e.id, titulo: e.titulo, bloque: e.bloque, mensaje: e.mensaje, minutos: e.minutos },
      paso: resumen(p), siguiente: resumen(sig), progreso: nav.progreso(),
      general: nav.general, conAvanzados: nav.conAvanzados,
      minutos: { hastaAqui: minutosHasta(p.ie), total: minutosHasta(ESCENAS.length - 1) },
    };
  };
  const enlace = crearEnlace({
    alRecibir: m => {
      if (m.tipo === 'avanzar') nav.avanzar();
      else if (m.tipo === 'retroceder') nav.retroceder();
      else if (m.tipo === 'general') nav.alternarGeneral();
      else if (m.tipo === 'avanzados') nav.alternarAvanzados();
      enlace.enviar(estado());
    },
  });
  nav = crearNavegacion({ mundo, camara, alCambiar: () => nav && enlace.enviar(estado()) });

  addEventListener('keydown', ev => {
    // Una tecla mantenida no avanza varios pasos.
    if (ev.metaKey || ev.ctrlKey || ev.altKey || ev.repeat) return;
    const accion = {
      ArrowRight: nav.avanzar, ' ': nav.avanzar, PageDown: nav.avanzar,
      ArrowLeft: nav.retroceder, PageUp: nav.retroceder,
      o: nav.alternarGeneral, O: nav.alternarGeneral,
      a: nav.alternarAvanzados, A: nav.alternarAvanzados,
      p: enlace.abrir, P: enlace.abrir,
    }[ev.key];
    if (!accion) return;
    ev.preventDefault();
    accion();
  });

  // Para las pruebas y la consola: estado y navegación.
  window.presentacion = { nav, camara, gsap };
}

if (new URLSearchParams(location.search).has('ponente')) iniciarPonente();
else iniciarPresentacion();
