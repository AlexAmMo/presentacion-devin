// Los pasos: una lista plana con todos los pasos de todas las escenas, y la navegación.
// - Avanzar anima: primero la cámara (si cambia el encuadre), después --pausa-tras-camara
//   y después el paso de la escena y la pieza que llega al hub.
// - Retroceder, saltar y recargar no animan: ponen al instante el estado del paso.
// - Cada paso tiene su URL (#E05/3).
// - Los pasos [A] se pueden saltar (tecla A); la preferencia dura la sesión.
import { gsap } from 'gsap';
import { s, esEstatico } from '../design/motion.js';
import { ESCENAS } from './datos/escenas.js';
import { HUB } from './datos/mapa.js';

export const PASOS = ESCENAS.flatMap((escena, ie) => escena.pasos.map(p => ({ ...p, escena, ie, ref: `${escena.id}/${p.n}` })));
const indiceDe = ref => PASOS.findIndex(p => p.ref === ref);
const LLEGADAS = HUB.piezas.map(p => ({ id: p.id, en: indiceDe(p.llega) }));
const piezasHasta = i => new Set(LLEGADAS.filter(l => l.en <= i).map(l => l.id));
const centro = e => ({ x: e.x + e.ancho / 2, y: e.y + e.alto / 2 });
const PREFERENCIA = 'devin-sin-avanzados';

export function crearNavegacion({ mundo, camara, alCambiar = () => {} }) {
  const { escenas, hub, anuncio } = mundo;
  const DEL_HUB = ESCENAS.filter(e => e.zona === 'hub');
  let actual = 0, general = false, animacion = null;
  let conAvanzados = true;
  try { conAvanzados = sessionStorage.getItem(PREFERENCIA) !== 'si'; } catch { /* sin almacenamiento: se incluyen */ }

  const incluido = i => conAvanzados || !PASOS[i].avanzado;
  const buscar = (desde, paso) => {
    for (let i = desde + paso; i >= 0 && i < PASOS.length; i += paso) if (incluido(i)) return i;
    return null;
  };

  // Completa de golpe lo que esté animándose: el siguiente paso parte de un estado limpio.
  const terminar = () => {
    if (!animacion) return;
    animacion.progress(1).kill();
    animacion = null;
    camara.reposar();
  };

  // Escenas anteriores, terminadas; posteriores, en su estado 0; la actual, en su paso.
  const ponerEscenas = (i, salvoActual) => {
    const p = PASOS[i];
    for (const x of escenas.values()) {
      const objetivo = x.indice < p.ie ? x.datos.pasos.length : x.indice > p.ie ? 0 : p.n;
      if (salvoActual && x.indice === p.ie) continue;
      if (x.estado !== objetivo) { x.ctrl.irA(objetivo, { animar: false }); x.estado = objetivo; }
    }
  };

  // Qué marcador del hub se ve (el de la escena del hub en curso o la última vista) y si se ve la capa de pantalla.
  const ponerVisibles = (i, enGeneral) => {
    const p = PASOS[i];
    // Solo la escena actual está en el árbol de accesibilidad; las demás, inert.
    for (const x of escenas.values()) {
      x.raiz.classList.toggle('escena--actual', x.indice === p.ie);
      x.raiz.inert = x.indice !== p.ie;
    }
    const delHub = p.escena.zona === 'hub' ? p.escena : [...DEL_HUB].reverse().find(e => escenas.get(e.id).indice < p.ie) ?? DEL_HUB[0];
    for (const e of DEL_HUB) escenas.get(e.id).raiz.classList.toggle('oculto', e !== delHub);
    for (const x of escenas.values()) {
      if (x.datos.zona === 'general') x.raiz.classList.toggle('oculto', !(enGeneral && x.indice === p.ie));
    }
  };
  const enVistaGeneral = vista => vista.region === 'general';

  function ir(i, { animar = false } = {}) {
    terminar();
    const p = PASOS[i];
    const destino = camara.vistaDe(p);
    general = false;
    if (!animar) {
      ponerEscenas(i, false);
      hub.pintar(piezasHasta(i));
      camara.poner(destino);
      ponerVisibles(i, enVistaGeneral(destino));
    } else {
      ponerEscenas(i, true);
      hub.pintar(piezasHasta(i - 1));
      // La capa de E01 y E30 se queda si la cámara ya está en la vista general; si llega volando, aparece al llegar.
      const yaEnGeneral = enVistaGeneral(destino) && camara.actual?.region === 'general';
      ponerVisibles(i, yaEnGeneral);
      const tl = gsap.timeline();
      if (camara.volar(tl, destino) && !esEstatico()) tl.to({}, { duration: s('--pausa-tras-camara') });
      if (enVistaGeneral(destino) && !yaEnGeneral) tl.add(() => ponerVisibles(i, true));
      // El contrato anima desde el paso anterior: si se ha saltado un [A], primero se pone ese estado.
      const x = escenas.get(p.escena.id);
      if (x.estado !== p.n - 1) x.ctrl.irA(p.n - 1, { animar: false });
      x.ctrl.irA(p.n, { animar: true, tl });
      x.estado = p.n;
      if (p.hub) hub.llegar(p.hub, tl, p.viaja ? centro(p.escena) : null);
      animacion = tl;
    }
    actual = i;
    history.replaceState(null, '', `#${p.ref}`);
    anuncio.textContent = `${p.escena.id} · ${p.escena.titulo}. Paso ${p.n} de ${p.escena.pasos.length}: ${p.texto}`;
    alCambiar();
  }

  const nav = {
    get actual() { return PASOS[actual]; },
    get general() { return general; },
    get conAvanzados() { return conAvanzados; },
    get animando() { return Boolean(animacion && animacion.progress() < 1); },

    avanzar() {
      const i = buscar(actual, 1);
      if (i != null) ir(i, { animar: true });
    },
    retroceder() {
      const i = buscar(actual, -1);
      if (i != null) ir(i);
    },
    irA: ref => {
      const i = indiceDe(ref);
      if (i >= 0) ir(i);
      return i >= 0;
    },

    /** Vista general del mapa, y volver al paso. */
    alternarGeneral() {
      terminar();
      const tl = gsap.timeline();
      general = !general;
      ponerVisibles(actual, false);
      const propia = camara.vistaDe(PASOS[actual]);
      camara.volar(tl, general ? camara.general() : propia);
      // E01 y E30 se ven desde la vista general con su capa: con O se ve el mapa entero, sin ella, y al volver, la capa vuelve.
      if (enVistaGeneral(propia) && !general) tl.add(() => ponerVisibles(actual, true));
      animacion = tl;
      alCambiar();
    },

    /** Incluir o saltar los pasos [A]. */
    alternarAvanzados() {
      conAvanzados = !conAvanzados;
      document.documentElement.classList.toggle('sin-avanzados', !conAvanzados);
      try { sessionStorage.setItem(PREFERENCIA, conAvanzados ? 'no' : 'si'); } catch { /* sin almacenamiento */ }
      alCambiar();
    },

    /** Posición entre los pasos que se van a dar (sin los [A] si se saltan). */
    progreso() {
      const incluidos = PASOS.map((_, i) => i).filter(incluido);
      return { n: incluidos.filter(i => i <= actual).length, total: incluidos.length };
    },
    siguiente() {
      const i = buscar(actual, 1);
      return i == null ? null : PASOS[i];
    },
  };

  document.documentElement.classList.toggle('sin-avanzados', !conAvanzados);
  addEventListener('hashchange', () => nav.irA(decodeURIComponent(location.hash.slice(1))));
  if (!nav.irA(decodeURIComponent(location.hash.slice(1)))) ir(0);
  return nav;
}
