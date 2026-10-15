// Enlace entre la presentación y la vista de ponente, con postMessage: funciona también
// desde file://, donde BroadcastChannel no es fiable.
// - La presentación abre la vista con window.open (tecla P) y le envía su estado.
// - La vista de ponente envía un latido cada segundo a window.opener. Si la presentación
//   se recarga, el latido le llega a la página nueva y la conexión se recupera sola;
//   pulsar P otra vez también la recupera.
// - Solo se aceptan mensajes con la marca y del mismo origen. Se usa self.origin: en file://
//   vale «null» (el origen real, opaco), mientras que location.origin vale «file://».

export const MARCA = 'devin-presentacion';
export const LATIDO_MS = 1000;
const NOMBRE_VENTANA = 'devin-ponente';

const ORIGEN = self.origin;
export const esNuestro = ev => ev.data?.marca === MARCA && ev.origin === ORIGEN;
// Destino de postMessage: el propio origen; en file:// el origen es opaco y hay que usar «*».
export const DESTINO = ORIGEN === 'null' ? '*' : ORIGEN;

/** Lado de la presentación. alRecibir(mensaje) recibe { tipo: 'hola' | 'avanzar' | 'retroceder' | 'general' | 'avanzados' | 'final' }. */
export function crearEnlace({ alRecibir }) {
  let ponente = null;
  addEventListener('message', ev => {
    if (!esNuestro(ev) || !ev.source || ev.source === window) return;
    ponente = ev.source;
    alRecibir(ev.data);
  });
  return {
    abrir() {
      if (ponente && !ponente.closed) { ponente.focus(); return; }
      const url = new URL(location.href);
      url.search = '?ponente';
      url.hash = '';
      ponente = window.open(url.href, NOMBRE_VENTANA, 'popup,width=1440,height=900');
    },
    enviar(estado) {
      if (ponente && !ponente.closed) ponente.postMessage({ marca: MARCA, tipo: 'estado', estado }, DESTINO);
    },
  };
}
