// E18 · Plugins. En el hub: la caja de plugin entra como pieza (src/hub.js) y lo envuelve todo.
// A la derecha, en el panel, todo en una sola entrada, grupo a grupo: qué trae un plugin (seis
// piezas, en una cuadrícula de dos columnas y tres filas), cómo lo marca la organización (en una
// fila, con el icono en color) y lo que tiene el departamento: un plugin, centrado, y debajo lo
// que incluye, unido a él por flechas curvas (abanico en vertical) que se trazan.
// Pasos: 1 qué trae, cómo se marca y el plugin del departamento.
import { icono } from '../../design/iconos.js';
import { abanico } from '../../design/dibujos.js';
import { px } from '../../design/motion.js';
import { en, cabecera, crearPasos, marcar } from './comun.js';
import { PANEL } from './hub.js';

// Guion 2.9: skills y, opcionalmente, rules, hooks, servidores MCP y subagentes; y tools (Cambios.md).
const TRAE = [['scroll-text', 'Rules'], ['puzzle', 'Skills'], ['wrench', 'Tools'], ['plug', 'Servidores MCP'], ['git-fork', 'Subagentes'], ['repeat', 'Hooks']];
const MARCAS = [['lock', 'Obligatorio', 'obligatorio'], ['circle-check', 'Opcional', 'opcional'], ['ban', 'Prohibido', 'prohibido']];
// El plugin del departamento (Cambios.md) y lo que incluye.
const INCLUYE = ['MCPs', 'Skills', 'Tools', 'Rules'];
// Altura de cada grupo: su rótulo y, debajo, sus etiquetas. Las del plugin del departamento, en
// dos filas (el plugin y lo que incluye) con las flechas entre ellas.
const Y = { trae: 312, marcas: 572, departamento: 708, plugin: 756, incluye: 892 };

// Las etiquetas de una cuadrícula ocupan su celda entera, con el contenido centrado.
const etiqueta = (ic, texto, clase = '', atrs = '') =>
  `<span class="etiqueta${clase}" style="justify-content:center"${atrs}>${ic ? icono(ic, 'icono--s') : ''}${texto}</span>`;
const rotulo = texto => `<p class="tipo-texto-s" style="margin:0;color:var(--color-texto-2)">${texto}</p>`;
const atrs = orden => ` data-paso="1" data-orden="${orden}"`;
const cuadricula = (y, columnas, etiquetas) =>
  en(PANEL.x, y, `<div style="display:grid;grid-template-columns:repeat(${columnas},1fr);gap:var(--esp-2);width:${PANEL.ancho}px">${etiquetas}</div>`);

export default function ({ escena, raiz }) {
  let pasos = null;
  const x = PANEL.x;
  return {
    montar() {
      raiz.innerHTML =
        cabecera(escena, PANEL.ancho, x) +
        '<svg data-flechas style="position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible"></svg>' +
        en(x, Y.trae, rotulo('Se instala de una vez y trae:'), { paso: 1 }) +
        cuadricula(Y.trae + 48, 2, TRAE.map(([ic, t]) => etiqueta(ic, t, '', atrs(0))).join('')) +
        en(x, Y.marcas, rotulo('La organización lo marca como:'), { paso: 1, orden: 1 }) +
        en(x, Y.marcas + 48, `<div style="display:flex;justify-content:space-between;width:${PANEL.ancho}px">${MARCAS.map(([ic, t, marca]) =>
          etiqueta(ic, t, ` etiqueta--compacta etiqueta--${marca}`, atrs(1))).join('')}</div>`) +
        en(x, Y.departamento, rotulo('El departamento tiene:'), { paso: 1, orden: 2 }) +
        en(x, Y.plugin, `<div style="display:flex;justify-content:center;width:${PANEL.ancho}px">${etiqueta('package', '1 plugin: <span class="tipo-mono-s">ods-ds-mcp</span>', '', ` data-plugin${atrs(2)}`)}</div>`) +
        cuadricula(Y.incluye, 4, INCLUYE.map(t => etiqueta('', t, ' etiqueta--compacta', ` data-incluye${atrs(4)}`)).join(''));

      // Las flechas, del borde de abajo del plugin al de arriba de cada cosa que incluye (px de la pantalla).
      const caja = nodo => {
        let [cx, cy] = [0, 0];
        for (let n = nodo; n && n !== raiz; n = n.offsetParent) [cx, cy] = [cx + n.offsetLeft, cy + n.offsetTop];
        return { x: cx, y: cy, ancho: nodo.offsetWidth, alto: nodo.offsetHeight };
      };
      const plugin = caja(raiz.querySelector('[data-plugin]')), hueco = px('--esp-1');
      const svg = raiz.querySelector('[data-flechas]');
      svg.innerHTML = abanico({
        desde: [plugin.x + plugin.ancho / 2, plugin.y + plugin.alto + hueco],
        hasta: [...raiz.querySelectorAll('[data-incluye]')].map(caja).map(c => [c.x + c.ancho / 2, c.y - hueco]),
        vertical: true,
      });
      marcar(svg.querySelectorAll('.abanico__flecha'), 1, { orden: 3, efecto: 'trazar' });
      pasos = crearPasos(raiz);
      pasos.poner(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) return void pasos.poner(paso);
      pasos.animar(paso, tl);
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
