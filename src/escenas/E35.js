// E35 · Límites. Sexta parada del circuito, entre Verificar y Hábitos.
// Dos fases en la misma pantalla. Primera (pasos 1 y 2): el camino del agente a producción. A la
// izquierda, el agente con el comando de despliegue en su terminal; a la derecha, producción; entre
// los dos, un camino de puntos. En el paso 2 entran, una a una y de blanda a dura, tres barreras
// (rules, permisos y hooks, sandbox), cada una con su verbo y su ejemplo en mono; el punto recorre
// el camino, atraviesa la primera y se para en la segunda, con el hito ✕ en acento. Segunda (pasos 3
// y 4): a la izquierda, el AGENTS.md del repo en mono, por bloques; a la derecha, su pareja, la
// configuración de permisos con sus deny y, en el paso 4, el árbol del repositorio con una rule por
// directorio. Todo genérico: carpetas y comandos de ejemplo, sin la infraestructura de nadie.
// Pasos: 1 la situación · 2 las tres capas y el bloqueo · 3 el AGENTS.md y los deny · 4 rules por directorio.
import { gsap } from 'gsap';
import { s, px } from '../../design/motion.js';
import { icono } from '../../design/iconos.js';
import { en, cabecera, crearPasos, pausa, encadenar } from './comun.js';

// Guion 2.4 y 4.5.
const COMANDO = './scripts/deploy.sh --env prod';
// Las tres capas, de blanda a dura: [nombre, verbo, ejemplo, blanda].
const BARRERAS = [
  ['Rules', 'piden', 'AGENTS.md:\n«No despliegues»', true],
  ['Permisos y hooks', 'impiden', 'deny: Exec(ssh),\nExec(./scripts/deploy.sh)\nhook PreToolUse', false],
  ['Sandbox', 'limita', '--sandbox', false],
];
// El AGENTS.md del repo: bloques de un título y sus líneas, cortas.
const AGENTS = [
  ['Estructura', ['infra/ · funciones/ · permisos/ · scripts/ (solo lectura)']],
  ['Validar antes de proponer', ['make lint · make test · make validar']],
  ['Límites', ['No despliegues ni te conectes a servidores.', 'No ejecutes nada de scripts/.', 'Cada permiso nuevo, explicado uno a uno.']],
  ['Entregar', ['Diff, resumen de cambios y comprobaciones.', 'Lo que no hayas podido comprobar, dilo.']],
  ['Desplegar', ['Procedimiento en la skill /desplegar:', 'lo ejecuta una persona.']],
];
const CONFIG = ['{', '  "permissions": {', '    "deny": [', '      "Exec(ssh)",', '      "Exec(./scripts/deploy.sh)"', '    ]', '  }', '}'];
// Una rule por directorio, junto al código al que afecta.
const RULES = [
  ['infra/', 'valida la plantilla antes de proponer'],
  ['funciones/', 'ejecuta sus tests e invócala en local'],
  ['permisos/', 'mínimo privilegio: sin comodines y cada permiso explicado'],
  ['scripts/', 'solo lectura: no ejecutar'],
];

// Composición (px de la pantalla). El circuito ocupa de x 1060 a 1800 y de y 84 a 364.
const PY = 600;                                   // el camino
const X0 = 520, PRODUCCION = 1700;                // de la tarjeta del agente al hito de producción
const BX = [780, 1105, 1430];                     // el centro de cada barrera
const BLOQUEO = BX[1];                            // donde se para el punto: sobre la primera dura
const DX = 1060, DANCHO = 740;                    // la columna derecha de la segunda fase

export default function ({ escena, raiz }) {
  let pasos = null;
  return {
    montar() {
      const r = px('--hito-diametro') / 2;
      const fin = PRODUCCION - r - 12;            // donde acaba el camino, antes del hito
      const hito = (x, ic, { clase = '', texto = '' } = {}, opciones) => en(x - r, PY - r,
        `<div class="hito${clase}"><div class="hito__circulo">${icono(ic)}</div>${texto ? `<p class="hito__texto">${texto}</p>` : ''}</div>`, opciones);
      const barrera = ([nombre, verbo, ejemplo, blanda]) =>
        `<div class="barrera${blanda ? ' barrera--blanda' : ''}"><div class="barrera__barra"></div><div class="barrera__nombre">${nombre}</div><div class="barrera__verbo">${verbo}</div><div class="barrera__ejemplo">${ejemplo}</div></div>`;
      const documento = (ic, nombre, cuerpo, ancho) =>
        `<div class="documento" style="width:${ancho}px;height:auto;box-sizing:border-box"><div class="documento__cabecera">${icono(ic, 'icono--s')}${nombre}</div><div class="documento__cuerpo" style="gap:var(--esp-2)">${cuerpo}</div></div>`;
      const linea = (texto, estilo = '') => `<p class="tipo-mono-s" style="margin:0;${estilo}">${texto}</p>`;
      const agents = AGENTS.map(([titulo, lineas]) =>
        `<div>${linea(`## ${titulo}`, 'font-weight:var(--peso-enfasis)')}${lineas.map(l => linea(l, 'color:var(--color-texto-2)')).join('')}</div>`).join('');
      const config = `<div>${CONFIG.map(l => linea(l, 'white-space:pre;color:var(--color-texto-2)')).join('')}</div>`;
      // El árbol: el AGENTS.md de la raíz y, en cada carpeta, el suyo con su rule en una línea.
      const nodo = (ic, nombre, clase = '') => `<span class="arbol__nodo${clase}">${icono(ic, 'icono--s')}<span class="arbol__nombre">${nombre}</span></span>`;
      const cascada = ` data-paso="4" data-opciones='${JSON.stringify({ stagger: s('--escalonado-filas') })}'`;
      const rule = ([carpeta, regla]) => `<li${cascada}>${nodo('folder-open', carpeta)}<ul><li>
          <span class="arbol__nodo arbol__nodo--cargado" style="align-items:flex-start;white-space:normal">${icono('file-text', 'icono--s')}<span class="arbol__nombre">AGENTS.md</span><span class="tipo-etiqueta" style="color:var(--color-texto-2);font-weight:var(--peso-texto)">«${regla}»</span></span>
        </li></ul></li>`;

      raiz.innerHTML =
        cabecera(escena, 920) +
        // ── Primera fase: el camino del agente a producción.
        `<svg style="position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible">
          <path class="camino" data-paso="1" data-hasta="3" data-orden="1" data-efecto="trazar" d="M${X0} ${PY}H${fin}"/>
          <circle class="camino__punto" data-paso="2" data-hasta="2" data-propio cx="${X0}" cy="${PY}" r="${px('--punto-diametro') / 2}"/></svg>` +
        en(120, PY - px('--agente-alto') / 2, `<div class="agente">${icono('bot', 'icono--l')}<div><div class="agente__nombre">Agente</div><div class="agente__detalle">shell local</div></div></div>`,
          { paso: 1, hasta: 3, efecto: 'entrarConMuelle' }) +
        en(540, 460, `<p class="tipo-mono-s" style="margin:0;display:flex;align-items:center;gap:var(--esp-2);color:var(--color-texto-2)">${icono('terminal', 'icono--s')}${COMANDO}</p>`,
          { paso: 1, hasta: 3 }) +
        hito(PRODUCCION, 'server', { clase: ' hito--abajo', texto: 'Producción' }, { paso: 1, hasta: 3, orden: 2, efecto: 'entrarConMuelle' }) +
        en(120, 700, '<p class="tipo-texto-s" style="margin:0;color:var(--color-texto-2)">Sin CI, el único control es el nuestro.</p>', { paso: 1, hasta: 3, orden: 3, estilo: 'width:400px' }) +
        BARRERAS.map((b, i) => en(BX[i] - px('--barrera-ancho') / 2, PY - px('--barrera-alto') / 2, barrera(b), { paso: 2, hasta: 3, orden: i })).join('') +
        hito(BLOQUEO, 'x', { clase: ' hito--bloqueo' }, { paso: 2, hasta: 3, orden: 3, efecto: 'entrarConMuelle' }) +
        en(120, 900, '<p class="tipo-texto" style="margin:0;font-weight:var(--peso-enfasis);color:var(--color-acento)">Las rules piden; los permisos impiden</p>', { paso: 2, hasta: 3, orden: 4 }) +
        // ── Segunda fase: el AGENTS.md (con su pie debajo) y, a la derecha, los deny y después el árbol.
        en(120, 304, `<div style="display:grid;gap:var(--esp-2)">
            <div data-paso="3" data-atenua="4" data-efecto="entrarConMuelle">${documento('file-text', 'AGENTS.md', agents, 880)}</div>
            <p class="tipo-etiqueta" data-paso="3" data-orden="2" data-atenua="4" style="margin:0;color:var(--color-texto-3)">≈ 1.500 tokens: releerlo en cada llamada cuesta poco</p>
          </div>`) +
        en(DX, 392, documento('braces', '.devin/config.json', config, DANCHO), { paso: 3, hasta: 4, orden: 1, efecto: 'entrarConMuelle' }) +
        en(DX, 786, '<p class="tipo-texto-s" style="margin:0;color:var(--color-texto-2)">Lo que el AGENTS.md pide, la configuración lo impide; fijado por la organización, nadie lo anula.</p>',
          { paso: 3, hasta: 4, orden: 2, estilo: `width:${DANCHO}px` }) +
        // El árbol entero va oculto hasta su paso (propio): si no, la guía de su sangría se vería antes.
        en(DX, 392, `<div data-arbol data-paso="4" data-propio><ul class="arbol" style="width:${DANCHO}px"><li><span class="arbol__nodo"${cascada}>${icono('folder-open', 'icono--s')}<span class="arbol__nombre">repo/</span></span><ul>
            <li${cascada}>${nodo('file-text', 'AGENTS.md', ' arbol__nodo--cargado')}</li>
            ${RULES.map(rule).join('')}
          </ul></li></ul></div>`);
      // El camino se traza al ritmo de las líneas seguidas, como en E27.
      raiz.querySelector('.camino').dataset.opciones = JSON.stringify({ duration: s('--dur-trazado-serie') });
      pasos = crearPasos(raiz);
      pasos.poner(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) return pasos.poner(paso);
      if (paso === 2) {
        // Las barreras entran una a una, de blanda a dura; después el punto recorre el camino,
        // atraviesa la primera y se para sobre la segunda, donde aparece el hito ✕; al final, la frase.
        encadenar(tl, BARRERAS.map((_, o) => pasos.animar(2, gsap.timeline(), { orden: o })));
        const punto = raiz.querySelector('.camino__punto'), pista = raiz.querySelector('.camino');
        const fin = pista.getTotalLength();
        tl.set(punto, { autoAlpha: 1 })
          .recorrerCamino(punto, { camino: pista, desde: 0, hasta: (BLOQUEO - X0) / fin });
        pasos.animar(2, tl, { orden: 3 });
        tl.set(punto, { autoAlpha: 0 }, '<');
        pausa(tl);
        pasos.animar(2, tl, { orden: 4 });
        return;
      }
      if (paso === 3) {
        // Cambio de fase: se va todo lo del camino de una vez y entra el AGENTS.md, luego los deny y la frase.
        pasos.salir(3, tl);
        pasos.ordenes(3).forEach(o => pasos.animar(3, tl, { orden: o, sinSalidas: true }));
        return;
      }
      if (paso === 4) {
        // Se van los deny y su frase; el árbol se descubre y sus filas entran en cascada.
        pasos.salir(4, tl);
        tl.set(raiz.querySelector('[data-arbol]'), { autoAlpha: 1 });
        pasos.animar(4, tl, { sinSalidas: true });
        return;
      }
      pasos.animar(paso, tl);
    },

    desmontar() {
      gsap.killTweensOf(raiz.querySelectorAll('*'));
      raiz.innerHTML = '';
    },
  };
}
