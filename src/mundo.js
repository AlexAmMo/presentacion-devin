// El mundo: #escenario (16:9, a pantalla completa y centrado) y #mundo con todas las
// pantallas en su sitio, el hub y las tapas de los bloques. Las escenas de una misma zona
// comparten pantalla: se apilan en el mismo sitio y solo se ve una (pasos.js decide cuál).
// Cada escena se monta con su fichero de src/escenas/EXX.js si existe; si no, con el
// marcador de posición. Las de la vista general (E01) no tienen pantalla: su raíz no
// entra en el mundo.
import { px } from '../design/motion.js';
import { ESCENAS } from './datos/escenas.js';
import { crearMarcador } from './escenas/contrato.js';
import { crearHub } from './hub.js';
import { crearTapas } from './tapas.js';

const REALES = import.meta.glob('./escenas/E[0-9][0-9].js', { eager: true });

export function montarMundo(cuerpo) {
  cuerpo.innerHTML = `
    <h1 class="solo-lectores">Devin en el día a día: cómo aprovecharlo mejor y controlar el consumo</h1>
    <main id="escenario" aria-roledescription="presentación">
      <div id="mundo"></div>
    </main>
    <p id="anuncio" class="solo-lectores" aria-live="polite"></p>`;
  const [escenario, mundo] = ['#escenario', '#mundo'].map(q => cuerpo.querySelector(q));

  const escenas = new Map();
  ESCENAS.forEach((e, indice) => {
    const raiz = document.createElement('section');
    raiz.className = 'escena oculto';
    raiz.dataset.escena = e.id;
    raiz.setAttribute('aria-label', `${e.id} · ${e.titulo}`);
    if (e.x != null) {
      raiz.style.cssText = `left:${e.x}px;top:${e.y}px;width:${e.ancho}px;height:${e.alto}px`;
      mundo.append(raiz);
    }
    const real = REALES[`./escenas/${e.id}.js`];
    const ctrl = real ? real.default({ escena: e, raiz }) : crearMarcador({ escena: e, raiz, variante: e.zona === 'hub' ? 'panel' : 'escena' });
    ctrl.montar();
    escenas.set(e.id, { datos: e, raiz, ctrl, indice, estado: 0 });
  });

  // El hub va debajo de sus escenas (E04, E14, E18, E19: su marcador es el panel de la
  // derecha) y las tapas, encima de todo.
  const primeraDelHub = ESCENAS.find(e => e.zona === 'hub');
  const hubRect = { x: primeraDelHub.x, y: primeraDelHub.y, ancho: px('--escena-ancho'), alto: px('--escena-alto') };
  const hub = crearHub({ mundo, ...hubRect });
  mundo.insertBefore(hub.raiz, escenas.get(primeraDelHub.id).raiz);
  const tapas = crearTapas({ mundo });

  return { escenario, mundo, escenas, hub, tapas, anuncio: cuerpo.querySelector('#anuncio') };
}
