// El mundo: #escenario (16:9, a pantalla completa y centrado), #mundo con todas las
// escenas en su sitio y el hub, y #pantalla, la capa fija de las escenas que se ven
// desde la vista general (E01 y E30). Cada escena se monta con su fichero de
// src/escenas/EXX.js si existe; si no, con el marcador de posición.
import { px } from '../design/motion.js';
import { ESCENAS } from './datos/escenas.js';
import { crearMarcador } from './escenas/contrato.js';
import { crearHub } from './hub.js';

const REALES = import.meta.glob('./escenas/E[0-9][0-9].js', { eager: true });

export function montarMundo(cuerpo) {
  cuerpo.innerHTML = `
    <h1 class="solo-lectores">Devin en el día a día: cómo aprovecharlo mejor y controlar el consumo</h1>
    <main id="escenario" aria-roledescription="presentación">
      <div id="mundo"></div>
      <div id="pantalla"></div>
    </main>
    <p id="anuncio" class="solo-lectores" aria-live="polite"></p>`;
  const [escenario, mundo, pantalla] = ['#escenario', '#mundo', '#pantalla'].map(q => cuerpo.querySelector(q));

  const escenas = new Map();
  ESCENAS.forEach((e, indice) => {
    const general = e.x == null, enHub = e.zona === 'hub';
    const raiz = document.createElement('section');
    raiz.className = `escena${general || enHub ? ' oculto' : ''}`;
    raiz.dataset.escena = e.id;
    raiz.setAttribute('aria-label', `${e.id} · ${e.titulo}`);
    if (general) pantalla.append(raiz);
    else {
      raiz.style.cssText = `left:${e.x}px;top:${e.y}px;width:${e.ancho}px;height:${e.alto}px`;
      mundo.append(raiz);
    }
    const real = REALES[`./escenas/${e.id}.js`];
    const ctrl = real ? real.default({ escena: e, raiz }) : crearMarcador({ escena: e, raiz, variante: general ? 'pantalla' : enHub ? 'panel' : 'escena' });
    ctrl.montar();
    escenas.set(e.id, { datos: e, raiz, ctrl, indice, estado: 0 });
  });

  // El hub va debajo de sus escenas (E04, E14, E18, E19: su marcador es el panel de la derecha)
  // y las siluetas que viajan, encima de todo.
  const primeraDelHub = ESCENAS.find(e => e.zona === 'hub');
  const hubRect = { x: primeraDelHub.x, y: primeraDelHub.y, ancho: px('--escena-ancho'), alto: px('--escena-alto') };
  const viajeros = document.createElement('div');
  viajeros.className = 'viajeros';
  const hub = crearHub({ mundo, viajeros, ...hubRect });
  mundo.insertBefore(hub.raiz, escenas.get(primeraDelHub.id).raiz);
  mundo.append(viajeros);

  return { escenario, mundo, pantalla, escenas, hub, hubRect, anuncio: cuerpo.querySelector('#anuncio') };
}
