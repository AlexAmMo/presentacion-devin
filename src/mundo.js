// El mundo: #escenario (16:9, a pantalla completa y centrado) y #mundo con todas las
// pantallas en su sitio, el hub, el circuito de Buenas prácticas y las tapas de los bloques.
// Las escenas de una misma zona
// comparten pantalla: se apilan en el mismo sitio y solo se ve una (pasos.js decide cuál).
// Cada escena se monta con su fichero de src/escenas/EXX.js si existe; si no, con el
// marcador de posición. Las de la vista general (E01) no tienen pantalla: su raíz no
// entra en el mundo.
import { px } from '../design/motion.js';
import { ESCENAS } from './datos/escenas.js';
import { crearMarcador } from './escenas/contrato.js';
import { crearHub } from './hub.js';
import { crearTapas } from './tapas.js';
import { crearCircuito } from './circuito.js';
import { CIRCUITO } from './datos/mapa.js';

const REALES = import.meta.glob('./escenas/E[0-9][0-9].js', { eager: true });

export function montarMundo(cuerpo) {
  cuerpo.innerHTML = `
    <h1 class="solo-lectores">Devin en el día a día: cómo aprovecharlo mejor y controlar el consumo</h1>
    <main id="escenario" aria-roledescription="presentación">
      <div id="mundo"></div>
    </main>
    <p id="anuncio" class="solo-lectores" aria-live="polite"></p>`;
  const [escenario, mundo] = ['#escenario', '#mundo'].map(q => cuerpo.querySelector(q));

  // El hub va debajo de todas las escenas (las suyas, E04, E14 y E18, dibujan su panel
  // encima) y las tapas, encima de todo. Las escenas del hub reciben el hub para animar su bucle,
  // y E01, las tapas, para sus títulos.
  const primeraDelHub = ESCENAS.find(e => e.zona === 'hub');
  const hubRect = { x: primeraDelHub.x, y: primeraDelHub.y, ancho: px('--escena-ancho'), alto: px('--escena-alto') };
  const hub = crearHub({ mundo, ...hubRect });

  // El circuito de Buenas prácticas, fijo en su pantalla mientras sus escenas se relevan.
  const primeraDelCircuito = ESCENAS.find(e => e.zona === CIRCUITO.zona);
  const circuito = crearCircuito({ mundo, x: primeraDelCircuito.x, y: primeraDelCircuito.y });

  // Las tapas se crean antes que las escenas (E01 levanta sus títulos) y su capa va al final:
  // encima de todo.
  const capaTapas = document.createElement('div');
  const tapas = crearTapas({ capa: capaTapas });

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
    const ctrl = real
      ? real.default({ escena: e, raiz, hub: e.zona === 'hub' ? hub : null, tapas: e.zona === 'general' ? tapas : null })
      : crearMarcador({ escena: e, raiz, variante: e.zona === 'hub' ? 'panel' : 'escena' });
    ctrl.montar();
    escenas.set(e.id, { datos: e, raiz, ctrl, indice, estado: 0 });
  });

  mundo.append(capaTapas);

  return { escenario, mundo, escenas, hub, circuito, tapas, anuncio: cuerpo.querySelector('#anuncio') };
}
