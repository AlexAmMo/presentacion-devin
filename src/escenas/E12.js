// E12 · Rules y AGENTS.md. Pantalla propia.
// Arriba, la ventana de contexto: el documento AGENTS.md cae en ella y ocupa su principio
// («Se incluyen automáticamente en todos los prompts», encima).
// Debajo, a la izquierda, el árbol del repositorio: las rules de .devin/rules/ y el AGENTS.md
// de la raíz se cargan al empezar, y el de api/ cuando el agente entra en esa carpeta. A la
// derecha, lo que cuesta releerlos en cada llamada y el consejo: breve y estable; para lo
// largo, una skill, a la que una rule puede apuntar. Cifras ficticias, sin rótulo.
// Pasos: 1 AGENTS.md entra · 2 niveles · 3 largo y releído · 4 consejo.
import { s, v, px } from '../../design/motion.js';
import { icono } from '../../design/iconos.js';
import { en, cabecera, consejo, miles, crearPasos } from './comun.js';

// Miles de tokens (cifras ficticias): la ventana y lo que ocupa cada AGENTS.md.
const CAPACIDAD = 200, RAIZ = 6, LARGO = 24, API = 3;
const [VX, VY, VANCHO] = [120, 392, 1680];
const LLAMADAS = 3;

export default function ({ escena, raiz }) {
  let pasos = null;
  const borde = () => px('--trazo-contorno') + px('--esp-1');
  const porMil = () => (VANCHO - 2 * borde()) / CAPACIDAD;
  const ancho = n => Math.round(n * porMil()) - px('--trazo-contorno');
  const capaRaiz = () => raiz.querySelector('[data-capa="raiz"]');
  const cifras = () => [...raiz.querySelectorAll('[data-cifra]')];
  const ponerCifras = paso => {
    const [llamadas, releidos] = cifras();
    llamadas.textContent = String(LLAMADAS);
    releidos.textContent = miles(LLAMADAS * LARGO * 1000);
    capaRaiz().style.width = `${ancho(paso >= 3 ? LARGO : RAIZ)}px`;
  };

  return {
    montar() {
      const nodo = (ic, nombre, atrs = '', clase = '') =>
        `<span class="arbol__nodo${clase}"${atrs}>${icono(ic, 'icono--s')}<span class="arbol__nombre">${nombre}</span></span>`;
      const lineas = [180, 140].map(a => `<span class="documento__linea" style="width:${a}px"></span>`).join('');
      raiz.innerHTML =
        cabecera(escena, 1680) +
        en(VX, VY, `<div class="ventana" style="width:${VANCHO}px"><div class="ventana__relleno">
            <div class="capa capa--entrada" data-capa="raiz" data-paso="1" data-propio style="width:${ancho(RAIZ)}px"></div>
            <div class="capa capa--entrada" data-capa="api" data-paso="2" data-orden="1" data-efecto="llenarVentana" style="width:${ancho(API)}px"></div>
          </div><span class="ventana__capacidad">${CAPACIDAD}K</span><div class="ventana__lectura" data-paso="3" data-hasta="3" data-propio></div></div>`) +
        // El documento: cae sobre el principio de la ventana y allí se convierte en su primera capa
        // (va después de la ventana para quedar encima).
        en(VX + px('--esp-6'), VY + (px('--ventana-alto') - 104) / 2, `<div class="documento" style="width:220px;height:104px"><div class="documento__cabecera">${icono('file-text', 'icono--s')}AGENTS.md</div><div class="documento__cuerpo" style="gap:var(--esp-2);padding:var(--esp-3)">${lineas}</div></div>`,
          { paso: 1, hasta: 1, propio: true }) +
        en(VX, 300, '<p class="tipo-texto-s" style="margin:0"><b style="font-weight:var(--peso-enfasis)">Se incluyen automáticamente</b> en todos los prompts.</p>', { paso: 1, orden: 1 }) +
        en(VX, 536, `<ul class="arbol"><li>${nodo('folder-open', 'repo/')}<ul>
            <li>${nodo('folder-open', '.devin/rules/')}<ul>
              ${['rule-1.md', 'rule-2.md'].map(r => `<li>${nodo('file-text', r, '', ' arbol__nodo--cargado')}</li>`).join('')}</ul></li>
            <li>${nodo('file-text', 'AGENTS.md', '', ' arbol__nodo--cargado')}</li>
            <li><span class="arbol__nodo">${icono('folder-open', 'icono--s')}<span class="arbol__nombre">api/</span><span class="etiqueta" data-paso="2" style="margin-left:var(--esp-2);font-family:var(--fuente-texto)">${icono('bot', 'icono--s')}el agente entra aquí</span></span>
              <ul><li>${nodo('file-text', 'AGENTS.md', ' data-clase="2 arbol__nodo--cargado" data-orden="1"')}</li></ul></li>
            <li>${nodo('folder', 'ui/')}</li>
          </ul></li></ul>`, { paso: 2 }) +
        en(720, 552, `<div style="display:flex;gap:var(--esp-3);align-items:center">
            <span class="contador">${icono('repeat')}<span data-cifra>${LLAMADAS}</span><span class="contador__unidad">llamadas</span></span>
            <span class="contador contador--coste">${icono('file-text')}<span data-cifra>${miles(LLAMADAS * LARGO * 1000)}</span><span class="contador__unidad">tokens de rules y AGENTS.md releídos</span></span>
          </div>`, { paso: 3, propio: true }) +
        en(720, 638, '<p class="tipo-texto-s" style="margin:0;color:var(--color-texto-2)">Las rules y AGENTS.md se releen en cada llamada.</p>',
          { paso: 3, orden: 1, estilo: 'width:1080px' }) +
        en(720, 732, consejo('Breve y estable; para lo largo, una skill'), { paso: 4, efecto: 'entrarConMuelle' }) +
        en(1430, 740, `<p class="tipo-etiqueta" style="margin:0;color:var(--color-texto-3)">Una rule puede apuntar a una skill:</p>
          <p class="tipo-mono-s" style="margin:var(--esp-1) 0 0;white-space:nowrap">«Migraciones:</p><p class="tipo-mono-s" style="margin:0;white-space:nowrap">usa /revisar-migracion»</p>`,
          { paso: 4, orden: 1, estilo: 'width:370px' });
      pasos = crearPasos(raiz);
      pasos.poner(0);
      ponerCifras(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(paso);
        ponerCifras(paso);
        return;
      }
      if (paso === 1) {
        // El documento aparece, cae hasta la ventana y se convierte en su primera capa.
        const doc = raiz.querySelector('.documento').parentElement;
        tl.set(doc, { autoAlpha: 1 })
          .entrarEnVentana(doc)
          .desaparecer(doc)
          .set(capaRaiz(), { autoAlpha: 1 }, '<')
          .llenarVentana(capaRaiz(), {}, '<');
        pasos.animar(1, tl, { orden: 1 });
        return;
      }
      pasos.animar(paso, tl);
      if (paso !== 3) return;
      // El AGENTS.md se alarga; después, en cada llamada, la línea de lectura lo recorre todo.
      const [llamadas, releidos] = cifras();
      const contadores = llamadas.closest('[data-propio]');
      const linea = raiz.querySelector('.ventana__lectura');
      llamadas.textContent = '0';
      releidos.textContent = '0';
      tl.to(capaRaiz(), { width: ancho(LARGO), duration: s('--dur-entrada'), ease: v('--ease-llenado') })
        .aparecer(contadores);
      for (let k = 1; k <= LLAMADAS; k++) {
        tl.releerVentana(linea, { hasta: ancho(LARGO) + px('--trazo-contorno') + ancho(API) - px('--trazo-fuerte') })
          .subirContador(llamadas, { desde: k - 1, hasta: k, duration: s('--dur-micro') }, '<')
          .subirContador(releidos, { desde: (k - 1) * LARGO * 1000, hasta: k * LARGO * 1000 }, '<');
      }
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
