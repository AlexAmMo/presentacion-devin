// E16 · MCP. Pantalla propia, en dos fases que se relevan.
// Fase 1 (pasos 1–2), por qué hace falta: arriba, tres agentes; abajo, tres servicios. Sin un
// estándar, cada agente necesita su integración con cada servicio (nueve cables); con MCP, todo
// pasa por el conector: cada servicio publica un servidor una vez y cualquier agente lo usa.
// Fase 2 (pasos 3–4), para qué sirve: Devin, con el conector en su borde, unido al servidor de
// GitHub, que trae sus tools; entre ellas, create_pull_request, la del ejemplo de Tools propias.
// Después, el servidor ocupa su sitio entre los MCPs del departamento, externos e internos, y al
// pie, centrado, dónde está la guía de instalación.
// Pasos: 1 sin estándar · 2 con MCP · 3 qué trae un servidor · 4 los MCPs del departamento.
import { gsap } from 'gsap';
import { s, v, px } from '../../design/motion.js';
import { icono } from '../../design/iconos.js';
import { abanico } from '../../design/dibujos.js';
import { en, cabecera, crearPasos, marcar } from './comun.js';
import logoGithub from '../../design/assets/logos/github.svg';
import logoAtlassian from '../../design/assets/logos/atlassian.svg';
import logoSonar from '../../design/assets/logos/sonar.svg';
import logoOpenbank from '../../design/assets/logos/openbank-llave.svg';

const SANCHO = 320;   // ancho de todos los servidores
// Fase 1: agentes arriba y servicios abajo, en las mismas tres columnas (sus centros).
const AGENTES = ['Devin', 'Otro agente', 'IDE con IA'];
const SERVICIOS = [[logoGithub, 'GitHub'], [logoAtlassian, 'Atlassian'], [logoSonar, 'Sonar']];
const COLUMNAS = [440, 960, 1480];
const FILA_AGENTES = 300, FILA_SERVICIOS = 700, NUDO_Y = 575, LEYENDA_Y = 830;
// Fase 2, centrada en la altura C: el agente, el servidor de GitHub en el paso 3 (GX) y la columna
// de los del departamento en el paso 4 (LX). Sus grupos (data-orden) empiezan en F2.
const F2 = 10, C = 560, AX = 300, GX = 900, LX = 1300;
// Algunas tools del servidor MCP oficial de GitHub; la del medio es la del ejemplo de E15.
const TOOLS = ['get_file_contents', 'create_branch', 'create_pull_request', 'list_issues', 'search_code'];
const EJEMPLO = 2;
// Los MCPs del departamento (Cambios.md), por grupos; DS-Workspace, con la llave de Openbank.
const DISPONIBLES = [
  ['Externos', [[logoGithub, 'GitHub'], [logoAtlassian, 'Atlassian'], [logoSonar, 'Sonar']]],
  ['Internos', [[logoOpenbank, 'DS-Workspace', ' servidor__logo--apaisado']]],
];

const servidor = ([logo, nombre, clase = ''], atrs = '') =>
  `<div class="servidor" style="width:${SANCHO}px;box-sizing:border-box"${atrs}><img class="servidor__logo${clase}" src="${logo}" alt=""><span class="servidor__nombre">${nombre}</span></div>`;
const cable = (d, opciones) => `<path class="conector__cable" d="${d}" data-efecto="trazar"${opciones}/>`;
// Un cable que sale y llega en vertical (fase 1) o en horizontal (fase 2).
const vertical = ([x0, y0], [x1, y1]) => `M${x0} ${y0}C${x0} ${(y0 + y1) / 2} ${x1} ${(y0 + y1) / 2} ${x1} ${y1}`;
const horizontal = ([x0, y0], [x1, y1]) => `M${x0} ${y0}C${(x0 + x1) / 2} ${y0} ${(x0 + x1) / 2} ${y1} ${x1} ${y1}`;

export default function ({ escena, raiz }) {
  let pasos = null, enEjemplo = {};
  const github = () => raiz.querySelector('[data-pieza="github"]');
  // Hasta el paso 3, el servidor de GitHub está en el sitio del ejemplo; desde el 4, en su columna.
  const ponerGithub = n => {
    gsap.killTweensOf(github());
    gsap.set(github(), n <= 3 ? enEjemplo : { clearProps: 'transform' });
  };

  return {
    montar() {
      const r = px('--conector-diametro') / 2;
      // La tarjeta del agente, medida (con su relleno): los cables salen de su centro y el conector va en su borde.
      raiz.innerHTML = `<div class="agente" style="position:absolute">${icono('bot', 'icono--l')}</div>`;
      const [agenteAncho, agenteAlto] = [raiz.firstChild.offsetWidth, raiz.firstChild.offsetHeight];
      const enchufe = '<div class="conector">' + icono('plug') + '</div>';
      const centrado = (y, html, opciones) => en(120, y, html, { ...opciones, estilo: 'width:1680px;text-align:center' });

      // Fase 1. Los nueve cables (paso 1) y los seis del conector (paso 2) se dibujan al medir.
      const fase1 =
        AGENTES.map((nombre, i) => en(COLUMNAS[i] - agenteAncho / 2, FILA_AGENTES,
          `<div class="agente">${icono('bot', 'icono--l')}<div class="agente__nombre">${nombre}</div></div>`,
          { paso: 1, hasta: 3, efecto: 'entrarConMuelle' })).join('') +
        SERVICIOS.map((sv, i) => en(COLUMNAS[i] - SANCHO / 2, FILA_SERVICIOS, servidor(sv, ' data-servicio'),
          { paso: 1, hasta: 3, orden: 1, efecto: 'entrarConMuelle' })).join('') +
        en(960 - r, NUDO_Y - r, enchufe, { paso: 2, hasta: 3, efecto: 'entrarConMuelle' }) +
        en(960 + r + px('--esp-2'), NUDO_Y - 20, '<span class="tipo-texto-s" style="font-weight:var(--peso-enfasis)">MCP</span>', { paso: 2, hasta: 3 }) +
        centrado(LEYENDA_Y, '<p class="tipo-texto-s" style="margin:0">Sin un estándar, cada agente necesita su propia integración con cada servicio: <b style="font-weight:var(--peso-enfasis)">3 × 3 = 9</b></p>',
          { paso: 1, hasta: 2, orden: 3 }) +
        centrado(LEYENDA_Y, `<p class="tipo-texto-s" style="margin:0">Con MCP, cada servicio publica un servidor una vez y cualquier agente compatible lo usa: <b style="font-weight:var(--peso-enfasis)">3 + 3 = 6</b></p>
          <p class="tipo-texto-s" style="margin:var(--esp-1) 0 0;color:var(--color-texto-2)">Cada servidor se ejecuta en nuestra máquina o como un servicio remoto.</p>`,
          { paso: 2, hasta: 3, orden: 2 });

      // Fase 2. El servidor de GitHub es el de la columna del paso 4: hasta entonces, desplazado.
      const columna = DISPONIBLES.map(([nombre, servidores], i) => `<div style="display:grid;gap:var(--esp-2);justify-items:center">
          <div class="tipo-etiqueta" style="color:var(--color-texto-2)" data-paso="4" data-orden="${F2 + 6 + i}">${nombre}</div>
          ${servidores.map(sv => sv[1] === 'GitHub'
            ? `<div data-paso="3" data-orden="${F2 + 2}" data-efecto="entrarConMuelle"><div data-pieza="github">${servidor(sv, ' data-columna')}</div></div>`
            : `<div data-paso="4" data-orden="${F2 + 6 + i}" data-efecto="entrarConMuelle">${servidor(sv, ' data-columna')}</div>`).join('')}</div>`).join('');
      const tools = TOOLS.map((t, i) =>
        `<div class="tipo-mono-s" data-tool style="display:flex;align-items:center;gap:var(--esp-1);white-space:nowrap${i === EJEMPLO ? '' : ';color:var(--color-texto-2)'}">${icono('wrench', 'icono--s')}${t}</div>`).join('');
      const fase2 =
        en(AX, C - agenteAlto / 2, `<div class="agente">${icono('bot', 'icono--l')}<div><div class="agente__nombre">Agente</div><div class="agente__detalle">Devin</div></div></div>`,
          { paso: 3, orden: F2, efecto: 'entrarConMuelle' }) +
        en(AX + agenteAncho - r, C - r, enchufe, { paso: 3, orden: F2, efecto: 'entrarConMuelle' }) +
        `<div data-lista style="position:absolute;left:${LX}px;top:0;width:${SANCHO}px;display:grid;gap:var(--esp-5)">${columna}</div>` +
        `<div data-tools style="position:absolute;left:${GX + SANCHO + 160}px;top:0;display:grid;gap:var(--esp-2)" data-paso="3" data-hasta="4" data-orden="${F2 + 3}">${tools}</div>` +
        centrado(760, `<p class="tipo-texto-s" style="margin:0;font-weight:var(--peso-enfasis)">Sus tools se suman a las de serie, con el mismo sistema de permisos</p>
          <p class="tipo-texto-s" style="margin:var(--esp-1) 0 0;color:var(--color-texto-2)">La del ejemplo de «Tools propias» llega por aquí: el agente la ve como <span class="tipo-mono-s" style="color:var(--color-texto-1)">mcp__github__create_pull_request</span></p>`,
          { paso: 3, hasta: 4, orden: F2 + 5 }) +
        centrado(1080 - px('--margen-y') - 40,
          '<p class="tipo-etiqueta" style="margin:0;font-weight:var(--peso-texto);color:var(--color-texto-2)">La guía de instalación completa está disponible en el repositorio <b style="font-weight:var(--peso-fuerte);color:var(--color-texto-1)">Master-Control-Program</b>.</p>',
          { paso: 4, orden: F2 + 9 });

      raiz.innerHTML =
        cabecera(escena, 1680) +
        '<svg data-cables style="position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible"></svg>' +
        fase1 + fase2;

      // Medidas en px de la pantalla (offset*: sin la escala de la cámara). La columna y las tools,
      // centradas en C; el servidor de GitHub, hasta el paso 4, a la altura del agente, en GX.
      const el = q => raiz.querySelector(q);
      const caja = nodo => {
        let [x, y] = [0, 0];
        for (let n = nodo; n && n !== raiz; n = n.offsetParent) [x, y] = [x + n.offsetLeft, y + n.offsetTop];
        return { x, y, ancho: nodo.offsetWidth, alto: nodo.offsetHeight };
      };
      for (const bloque of [el('[data-lista]'), el('[data-tools]')]) bloque.style.top = `${C - bloque.offsetHeight / 2}px`;
      const columnas = [...raiz.querySelectorAll('[data-columna]')].map(caja);
      const filas = [...raiz.querySelectorAll('[data-tool]')].map(caja);
      const servicios = [...raiz.querySelectorAll('[data-servicio]')].map(caja);
      enEjemplo = { x: GX - columnas[0].x, y: C - (columnas[0].y + columnas[0].alto / 2) };

      // El resaltado de la del ejemplo, alrededor de su fila.
      const f = filas[EJEMPLO], [hx, hy] = [px('--esp-2'), px('--esp-1')];
      raiz.insertAdjacentHTML('beforeend', en(f.x - hx, f.y - hy, '<div class="resaltado" style="inset:0"></div>',
        { paso: 3, hasta: 4, orden: F2 + 4, estilo: `width:${f.ancho + 2 * hx}px;height:${f.alto + 2 * hy}px` }));

      // Los cables. Fase 1: de cada agente a cada servicio (paso 1) y, con MCP, al conector (paso 2).
      // Fase 2: del conector al servidor de GitHub (paso 3) y a cada uno de la columna (paso 4).
      const abajo = i => [COLUMNAS[i], FILA_AGENTES + agenteAlto], arriba = i => [COLUMNAS[i], servicios[i].y];
      const salida = [AX + agenteAncho + r, C];
      const paso = (n, hasta, orden) => ` data-paso="${n}"${hasta ? ` data-hasta="${hasta}"` : ''} data-orden="${orden}"`;
      const svg = el('[data-cables]');
      svg.innerHTML =
        COLUMNAS.flatMap((_, a) => COLUMNAS.map((__, b) => cable(vertical(abajo(a), arriba(b)), paso(1, 2, 2)))).join('') +
        COLUMNAS.map((_, i) => cable(vertical(abajo(i), [960, NUDO_Y - r]), paso(2, 3, 1))).join('') +
        COLUMNAS.map((_, i) => cable(vertical([960, NUDO_Y + r], arriba(i)), paso(2, 3, 1))).join('') +
        cable(horizontal(salida, [GX, C]), paso(3, 4, F2 + 1)) +
        columnas.map(c => cable(horizontal(salida, [LX, c.y + c.alto / 2]), paso(4, null, F2 + 8))).join('') +
        `<g data-abanico>${abanico({ desde: [GX + SANCHO + px('--esp-3'), C], hasta: filas.map(t => [t.x - px('--esp-3'), t.y + t.alto / 2]) })}</g>`;
      marcar(svg.querySelectorAll('[data-abanico] .abanico__flecha'), 3, { hasta: 4, orden: F2 + 3, efecto: 'trazar' });

      pasos = crearPasos(raiz);
      pasos.poner(0);
      ponerGithub(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(paso);
        return void ponerGithub(paso);
      }
      // Primero se va de una vez lo que acaba (en el 3, toda la fase 1); después entra lo nuevo,
      // grupo a grupo. En el 4, entre medias, el servidor de GitHub va a su sitio en la columna.
      pasos.salir(paso, tl);
      if (paso === 4) tl.to(github(), { x: 0, y: 0, duration: s('--dur-desplazar'), ease: v('--ease-desplazar') });
      pasos.ordenes(paso).forEach(o => pasos.animar(paso, tl, { orden: o, sinSalidas: true }));
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
