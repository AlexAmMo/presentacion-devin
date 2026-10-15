// E17 · Subagentes. Pantalla propia, en cuatro fases que se relevan.
// Fase 1 (pasos 1–3): a la izquierda, el agente con su ventana; a la derecha, el subagente que
// lanza por el camino de puntos, con su propia ventana, vacía (las dos ventanas, a la misma
// altura). El subagente llena la suya y al final queda su resultado, en rojo; una flecha, por
// debajo, lo lleva al final de la del agente (solo vuelve eso) y, a la vez, sube el coste de
// cada uno. Al final, centrado, qué modelo usa cada uno.
// Fase 2 (pasos 4–5): cuándo compensan, sin apenas texto. Arriba, tres subagentes; abajo, el
// agente con su ventana a la derecha. Sí: cada subagente lee lo suyo y solo vuelve su resultado.
// No: cada uno vuelve a cargar el contexto que el agente ya tenía para un resultado mínimo.
// Fase 3 (pasos 6–7): a la izquierda, en dos etapas, una debajo de otra: dos subagentes en el
// mismo archivo (conflicto) y, debajo, un worktree para cada uno, en el que edita su copia del
// mismo archivo. A la derecha, «contexto separado no significa archivos aislados» y el consejo.
// Pasos: 1 lanzar · 2 llenar, devolver y coste · 3 tipos de subagente y su modelo · 4 cuándo sí ·
// 5 cuándo no · 6 archivos · 7 consejo.
import { s, px } from '../../design/motion.js';
import { icono } from '../../design/iconos.js';
import { traspaso } from '../../design/dibujos.js';
import { en, cabecera, consejo, crearPasos, pausa, decimal, marcar } from './comun.js';

// Ventanas de 200K (en miles de tokens): lo que ya tiene el agente, lo que lee el subagente y
// el resultado que vuelve.
const CAPACIDAD = 200, AGENTE_YA = 46, LECTURAS = [22, 30, 18, 26, 24], RESULTADO = 12;
const VANCHO = 680;
const A_Y = 300;                                            // las tarjetas del agente y del subagente
const VY = 520;                                             // las dos ventanas, centradas a la misma altura
const COSTE = { agente: 0.06, subagente: 0.41 };
// Paso 3: tres tipos de subagente, de menos a más complejo, cada uno con un modelo (los de E07:
// el sencillo para lo sencillo, los potentes para lo complejo), en tres columnas.
const TIPOS = [['Documentación', 'GPT-6 Luna'], ['Research', 'SWE-2'], ['Análisis', 'GPT-6.1 Sol']];
const COLUMNAS = [480, 960, 1440], TIPOS_Y = 620;
// Un camino que sale y llega en vertical.
const lanzar = ([x0, y0], [x1, y1]) => `M${x0} ${y0}C${x0} ${(y0 + y1) / 2} ${x1} ${(y0 + y1) / 2} ${x1} ${y1}`;
// Fase 2: todas las ventanas, de 200K y de este ancho. Arriba, los subagentes (x de cada uno);
// abajo, el agente y, a su derecha, su ventana; a la derecha de esta, la leyenda.
const W2 = 520, SUBS = [120, 700, 1280], SUB_Y = 300, A2 = { x: 120, y: 720 }, AV2_X = 620, LEYENDA_X = 1200;
// Sí: cada subagente lee lo suyo y devuelve su resultado; el agente solo guarda los tres.
const SI = { agente: 46, lecturas: [[20, 28, 16], [26, 18, 30], [16, 24, 20]], resultado: 12 };
// No: cada uno vuelve a cargar el contexto del agente (base), lee muy poco y devuelve casi nada.
const NO = { base: 120, lecturas: [6, 4, 8], resultado: 8 };
// Altura del tramo horizontal de cada flecha de la fase 2: la del segundo, más arriba que la del
// tercero, para que no se crucen (los dos van hacia la izquierda).
const PASILLOS = [604, 604, 652];
// Grupos (data-orden) del paso 3 y de las fases 2 y 3, para que no se mezclen con los de la anterior, que sale antes.
const F1B = 5, F2 = 10, F3 = 20;
// Fase 3: en cada etapa, su título (y) y la y de cada subagente; los archivos, en ARCHIVO_X; a la
// derecha, la frase y el consejo, en DERECHA_X.
const ETAPAS = [{ y: 290, fichas: [340, 480] }, { y: 640, fichas: [690, 830] }];
const ARCHIVO = { x: 640, ancho: 240, alto: 120 }, DERECHA_X = 1160;

export default function ({ escena, raiz }) {
  let pasos = null;
  const g = () => px('--trazo-contorno');
  const borde = () => g() + px('--esp-1');
  // Ancho de n miles de tokens en una ventana de este ancho.
  const ancho = (n, w = VANCHO) => Math.round((n * (w - 2 * borde())) / CAPACIDAD) - g();
  const cifras = () => [...raiz.querySelectorAll('[data-cifra]')];
  const ponerCifras = () => cifras().forEach((c, i) => { c.textContent = decimal(i ? COSTE.subagente : COSTE.agente, 2); });
  const todos = q => [...raiz.querySelectorAll(q)];
  // Lo propio que acaba en el paso n: se va con lo demás (crearPasos no lo saca).
  const propiosQueAcaban = n => todos(`[data-propio][data-hasta="${n}"]`);
  // Llenar o vaciar unas capas (propias): las de cada ventana, a su ritmo, y todas las ventanas a
  // la vez. Con «pos», a partir de ahí; si no, al final.
  const porVentana = capas => [...new Set(capas.map(c => c.closest('.ventana')))].map(v => capas.filter(c => c.closest('.ventana') === v));
  const llenar = (tl, capas, pos = tl.duration()) => {
    const inicio = typeof pos === 'number' ? pos : tl.duration();
    tl.set(capas, { autoAlpha: 1 }, inicio);
    porVentana([].concat(capas)).forEach(grupo => tl.llenarVentana(grupo, {}, inicio));
    return tl;
  };
  const vaciar = (tl, capas, inicio) => porVentana(capas).forEach(grupo => tl.vaciarVentana(grupo, {}, inicio));
  // Trazar unas líneas propias (flechas, cables) a la vez y deprisa (--dur-trazado-serie).
  const trazarJuntas = (tl, lineas) => tl.set(lineas, { autoAlpha: 1 }).trazar(lineas, { duration: s('--dur-trazado-serie'), stagger: 0 }, '<');

  return {
    montar() {
      const capa = (n, atrs = '', tipo = 'entrada', w = VANCHO, texto = '') => `<div class="capa capa--${tipo}" style="width:${ancho(n, w)}px"${atrs}>${texto}</div>`;
      const propia = (n, hasta, marca) => ` data-paso="${n}"${hasta ? ` data-hasta="${hasta}"` : ''} data-propio ${marca}`;
      const subagente = (detalle = 'contexto propio', nombre = 'Subagente') =>
        `<div class="subagente">${icono('bot')}<div><div class="subagente__nombre">${nombre}</div><div class="subagente__detalle">${detalle}</div></div></div>`;
      const agente = `<div class="agente">${icono('bot', 'icono--l')}<div><div class="agente__nombre">Agente</div><div class="agente__detalle">Devin</div></div></div>`;
      const archivo = nombre => `<div class="documento" style="width:240px;height:120px"><div class="documento__cabecera">${icono('file-text', 'icono--s')}${nombre}</div>
          <div class="documento__cuerpo" style="gap:var(--esp-2);padding:var(--esp-3)">${[150, 110].map(a => `<span class="documento__linea" style="width:${a}px"></span>`).join('')}</div></div>`;
      const centrado = (y, html, opciones) => en(120, y, html, { ...opciones, estilo: 'width:1680px;text-align:center' });

      // Medidas de las tarjetas (con su relleno y su borde).
      raiz.innerHTML = `<div style="position:absolute">${subagente()}</div><div style="position:absolute">${agente}</div>`;
      const [subAncho, subAlto] = [raiz.querySelector('.subagente').offsetWidth, raiz.querySelector('.subagente').offsetHeight];
      const [agenteAncho, agenteAlto] = [raiz.querySelector('.agente').offsetWidth, raiz.querySelector('.agente').offsetHeight];
      const [ventanaAlto, miniAlto, e1] = [px('--ventana-alto'), px('--ventana-mini-alto'), px('--esp-1')];

      // ── Fase 1: dónde acaba lo ocupado en cada ventana (ahí va el resultado) y la flecha.
      // Dos columnas, cada una centrada en su ventana: la tarjeta, la ventana y el coste.
      const AV = { x: 120, y: VY }, SV = { x: 1120, y: VY + (ventanaAlto - miniAlto) / 2 };
      const [colA, colS] = [AV.x + VANCHO / 2, SV.x + VANCHO / 2];
      const A = { x: colA - agenteAncho / 2, y: A_Y }, S = { x: colS - subAncho / 2, y: A_Y + (agenteAlto - subAlto) / 2 };
      const debajo = AV.y + ventanaAlto, pasillo = debajo + px('--esp-5');
      const xa = AV.x + borde() + ancho(AGENTE_YA) + g() + ancho(RESULTADO) / 2;
      const xs = SV.x + borde() + LECTURAS.reduce((a, n) => a + ancho(n) + g(), 0) + ancho(RESULTADO) / 2;
      const flecha1 = traspaso([[xs, SV.y + miniAlto + e1], [xs, pasillo], [xa, pasillo], [xa, debajo + e1]]);

      // ── Fase 2: las ventanas de los subagentes (debajo de su tarjeta) y la del agente.
      const sv2 = SUB_Y + subAlto + px('--esp-2');
      const av2 = A2.y + px('--agente-alto') / 2 - ventanaAlto / 2;
      // Centro de la capa k-ésima de resultado en la ventana del agente, tras «previo» miles.
      const enAgente = (previo, res, k) => AV2_X + borde() + ancho(previo, W2) + g() + k * (ancho(res, W2) + g()) + ancho(res, W2) / 2;
      const enSub = (i, ocupado, res) => SUBS[i] + borde() + ocupado + ancho(res, W2) / 2;
      const flechas2 = (fines, previo, res) => fines.map((fin, i) =>
        traspaso([[enSub(i, fin, res), sv2 + miniAlto + e1], [enSub(i, fin, res), PASILLOS[i]], [enAgente(previo, res, i), PASILLOS[i]], [enAgente(previo, res, i), av2 - e1]])).join('');
      const ocupadoSi = SI.lecturas.map(l => l.reduce((a, n) => a + ancho(n, W2) + g(), 0));
      const ocupadoNo = NO.lecturas.map(n => ancho(NO.base, W2) + g() + ancho(n, W2) + g());
      const ventanaSub = i => `<div class="ventana ventana--mini" style="width:${W2}px">
          <div class="ventana__relleno">${SI.lecturas[i].map(n => capa(n, propia(4, 5, 'data-si="lectura"'), 'entrada', W2)).join('')}${capa(SI.resultado, propia(4, 5, 'data-si="resultado"'), 'resultado', W2)}</div>
          <div class="ventana__relleno">${capa(NO.base, propia(5, 6, 'data-no="base"'), 'entrada', W2)}${capa(NO.lecturas[i], propia(5, 6, 'data-no="lectura"'), 'entrada', W2)}${capa(NO.resultado, propia(5, 6, 'data-no="resultado"'), 'resultado', W2)}</div></div>`;
      const ventanaAgente = `<div class="ventana" style="width:${W2}px">
          <div class="ventana__relleno">${capa(SI.agente, propia(4, 5, 'data-si="agente"'), 'entrada', W2)}${[0, 1, 2].map(() => capa(SI.resultado, propia(4, 5, 'data-si="vuelve"'), 'resultado', W2)).join('')}</div>
          <div class="ventana__relleno">${capa(NO.base, propia(5, 6, 'data-no="agente"'), 'entrada', W2, 'Contexto del agente')}${[0, 1, 2].map(() => capa(NO.resultado, propia(5, 6, 'data-no="vuelve"'), 'resultado', W2)).join('')}</div></div>`;
      const leyenda = (ic, titulo, texto, opciones) => en(LEYENDA_X, A2.y + px('--agente-alto') / 2, `<div style="transform:translateY(-50%)">
          <p class="tipo-texto-s" style="margin:0;display:flex;align-items:center;gap:var(--esp-2);font-weight:var(--peso-enfasis)">${icono(ic)}${titulo}</p>
          <p class="tipo-etiqueta" style="margin:var(--esp-1) 0 0;font-weight:var(--peso-texto);color:var(--color-texto-2)">${texto}</p></div>`, { ...opciones, estilo: 'width:600px' });

      // ── Fase 3. En la primera etapa, un archivo entre los dos subagentes; en la segunda, uno
      // para cada uno, a su altura. Los cables, del subagente a su archivo, los traza la escena,
      // más deprisa que un cable que entra solo.
      const archivosDe = e => (e ? ETAPAS[1].fichas : [(ETAPAS[0].fichas[0] + ETAPAS[0].fichas[1] + subAlto) / 2 - ARCHIVO.alto / 2])
        .map(y => (e ? y + (subAlto - ARCHIVO.alto) / 2 : y));
      const cables = e => `<g data-cables="${e}">${ETAPAS[e].fichas.map((y, i) => {
        const [x0, y0] = [120 + subAncho, y + subAlto / 2];
        const [x1, y1] = [ARCHIVO.x, archivosDe(e)[e ? i : 0] + ARCHIVO.alto / 2];
        const xm = (x0 + x1) / 2;
        return `<path class="conector__cable" data-paso="6" data-propio d="M${x0} ${y0} C${xm} ${y0} ${xm} ${y1} ${x1} ${y1}"/>`;
      }).join('')}</g>`;
      const etapa = (e, titulo, orden) =>
        en(120, ETAPAS[e].y, `<p class="tipo-texto-s" style="margin:0;font-weight:var(--peso-enfasis)">${titulo}</p>`, { paso: 6, orden }) +
        ETAPAS[e].fichas.map((y, i) => en(120, y, subagente(i ? 'tarea B' : 'tarea A'), { paso: 6, orden, efecto: 'entrarConMuelle' })).join('') +
        archivosDe(e).map(y => en(ARCHIVO.x, y, archivo('sesion.ts'), { paso: 6, orden, efecto: 'entrarConMuelle' })).join('');

      raiz.innerHTML =
        cabecera(escena, 1680) +
        // Los caminos y las flechas de todas las fases, en un lienzo.
        `<svg style="position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible">
          <path class="camino" data-paso="1" data-hasta="3" data-efecto="trazar" data-camino d="M0 0"/>
          ${COLUMNAS.map(x => `<path class="camino" data-paso="3" data-hasta="4" data-orden="${F1B + 1}" data-efecto="trazar" d="${lanzar([960, A_Y + agenteAlto + px('--esp-3')], [x, TIPOS_Y - px('--esp-3')])}"/>`).join('')}
          <g data-flechas="1">${flecha1}</g><g data-flechas="si">${flechas2(ocupadoSi, SI.agente, SI.resultado)}</g><g data-flechas="no">${flechas2(ocupadoNo, NO.base, NO.resultado)}</g>
          ${cables(0)}${cables(1)}</svg>` +

        // Fase 1.
        en(A.x, A.y, agente, { paso: 1, hasta: 3, efecto: 'entrarConMuelle' }) +
        en(AV.x, AV.y, `<div class="ventana" style="width:${VANCHO}px"><div class="ventana__relleno">${capa(AGENTE_YA)}${capa(RESULTADO, propia(2, 0, 'data-resultado'), 'resultado')}</div>
            <span class="ventana__capacidad">${CAPACIDAD}K</span></div>`, { paso: 1, hasta: 3 }) +
        en(S.x, S.y, subagente(), { paso: 1, hasta: 3, orden: 1, efecto: 'entrarConMuelle' }) +
        en(SV.x, SV.y, `<div class="ventana ventana--mini" style="width:${VANCHO}px"><div class="ventana__relleno">${LECTURAS.map(n => capa(n, propia(2, 0, 'data-lectura'))).join('')}${capa(RESULTADO, propia(2, 0, 'data-resultado'), 'resultado')}</div></div>`,
          { paso: 1, hasta: 3, orden: 1 }) +
        // Sobre la ventana del subagente, lo que la distingue; debajo, la flecha deja sitio.
        en(SV.x, SV.y - 50, '<p class="tipo-etiqueta" style="margin:0;color:var(--color-texto-2)">Su propia ventana, vacía: no hereda la conversación</p>',
          { paso: 1, hasta: 2, orden: 2, estilo: `width:${VANCHO}px;text-align:center` }) +
        en(SV.x, SV.y - 50, '<p class="tipo-etiqueta" style="margin:0;color:var(--color-texto-2)">Hace sus propias llamadas y lee por su cuenta</p>',
          { paso: 2, hasta: 3, estilo: `width:${VANCHO}px;text-align:center` }) +
        // El rótulo de la flecha, centrado bajo su tramo horizontal.
        en(xa, pasillo + px('--esp-2'), '<p class="tipo-etiqueta" data-rotulo style="margin:0;color:var(--color-texto-2)">El agente solo ve el resultado y mantiene limpio su contexto</p>',
          { paso: 2, hasta: 3, propio: true, estilo: `width:${xs - xa}px;text-align:center` }) +
        // El coste de cada uno: sube a la vez que la flecha.
        en(AV.x, 776, `<span class="contador" data-columna="${colA}">${icono('coins')}<span data-cifra>${decimal(COSTE.agente, 2)}</span><span class="contador__unidad">u. · agente</span></span>`,
          { paso: 2, hasta: 3, propio: true }) +
        en(SV.x, 776, `<span class="contador contador--coste" data-columna="${colS}">${icono('coins')}<span data-cifra>${decimal(COSTE.subagente, 2)}</span><span class="contador__unidad">u. · subagente</span></span>`,
          { paso: 2, hasta: 3, propio: true }) +
        // Paso 3: el agente, con el modelo del IDE, lanza tres tipos de subagente, cada uno con
        // un modelo según la complejidad de su tarea; debajo, la frase.
        en(960 - agenteAncho / 2, A_Y, agente.replace('>Devin<', '>modelo del IDE<'), { paso: 3, hasta: 4, orden: F1B, efecto: 'entrarConMuelle' }) +
        TIPOS.map(([tipo, modelo], i) => en(COLUMNAS[i] - subAncho / 2, TIPOS_Y, subagente(modelo, tipo), { paso: 3, hasta: 4, orden: F1B + 2, efecto: 'entrarConMuelle' })).join('') +
        centrado(TIPOS_Y + subAlto + px('--esp-6'), '<p class="tipo-texto-s" style="margin:0">El agente usa siempre el modelo que elegimos en el IDE; el subagente puede usar otros<br>para optimizar tanto la efectividad como el coste.</p>',
          { paso: 3, hasta: 4, orden: F1B + 3 }) +

        // Fase 2.
        en(A2.x, A2.y, agente, { paso: 4, hasta: 6, orden: F2, efecto: 'entrarConMuelle' }) +
        en(AV2_X, av2, ventanaAgente, { paso: 4, hasta: 6, orden: F2 }) +
        SUBS.map((x, i) => en(x, SUB_Y, subagente(), { paso: 4, hasta: 6, orden: F2 + 1, efecto: 'entrarConMuelle' }) +
          en(x, sv2, ventanaSub(i), { paso: 4, hasta: 6, orden: F2 + 1 })).join('') +
        leyenda('thumbs-up', 'Cuándo sí', 'Partes independientes, cada una con su resultado', { paso: 4, hasta: 5, orden: F2 + 2 }) +
        leyenda('ban', 'Cuándo no', 'Cada subagente vuelve a cargar el contexto que el agente ya tenía: lo pagamos tres veces por un resultado mínimo', { paso: 5, hasta: 6, orden: F2 + 3 }) +

        // Fase 3. Primera etapa: el mismo archivo y, centrado bajo él, el conflicto.
        etapa(0, 'Mismo archivo', F3) +
        en(ARCHIVO.x, archivosDe(0)[0] + ARCHIVO.alto + px('--esp-2'), `<p class="tipo-texto-s" style="margin:0;display:flex;align-items:center;gap:var(--esp-2);color:var(--color-acento);font-weight:var(--peso-enfasis)">${icono('triangle-alert')}Conflicto</p>`,
          { paso: 6, orden: F3 + 1, efecto: 'entrarConMuelle', estilo: `width:${ARCHIVO.ancho}px;display:flex;justify-content:center` }) +
        // Segunda etapa: un worktree para cada uno, con su copia del archivo.
        etapa(1, 'Un worktree por subagente: pueden editar el mismo archivo', F3 + 2) +
        archivosDe(1).map((y, i) => en(ARCHIVO.x + ARCHIVO.ancho + px('--esp-3'), y + ARCHIVO.alto / 2,
          `<span class="tipo-mono-s" style="display:flex;align-items:center;gap:var(--esp-1);transform:translateY(-50%);color:var(--color-texto-2)">${icono('git-branch', 'icono--s')}worktree ${i ? 'B' : 'A'}</span>`,
          { paso: 6, orden: F3 + 2 })).join('') +
        // A la derecha, centrados en la altura del gráfico: la frase y, en el paso 7, el consejo.
        en(DERECHA_X, 470, '<p class="tipo-texto" style="margin:0;font-weight:var(--peso-enfasis)">Contexto separado no significa archivos aislados</p>',
          { paso: 6, orden: F3 + 3, estilo: `width:${1800 - DERECHA_X}px` }) +
        en(DERECHA_X, 600, consejo('No por defecto: cuando separar aporte más que coordinar'), { paso: 7, efecto: 'entrarConMuelle', estilo: `width:${1800 - DERECHA_X}px` });

      // Los costes, centrados en su columna.
      for (const c of todos('[data-columna]')) c.parentElement.style.left = `${c.dataset.columna - c.offsetWidth / 2}px`;
      // El camino de puntos: del borde derecho del agente al izquierdo del subagente.
      const tarjeta = raiz.querySelector('.agente'), sub = raiz.querySelector('.subagente');
      const [x0, y0] = [A.x + tarjeta.offsetWidth + px('--esp-3'), A.y + tarjeta.offsetHeight / 2];
      const [x1, y1] = [S.x - px('--esp-3'), S.y + sub.offsetHeight / 2];
      raiz.querySelector('[data-camino]').setAttribute('d', `M${x0} ${y0} C${(x0 + x1) / 2} ${y0} ${(x0 + x1) / 2} ${y1} ${x1} ${y1}`);
      // Las flechas del resultado: las anima la escena.
      marcar(raiz.querySelectorAll('[data-flechas="1"] .traspaso'), 2, { hasta: 3, propio: true });
      marcar(raiz.querySelectorAll('[data-flechas="si"] .traspaso'), 4, { hasta: 5, propio: true });
      marcar(raiz.querySelectorAll('[data-flechas="no"] .traspaso'), 5, { hasta: 6, propio: true });
      pasos = crearPasos(raiz);
      pasos.poner(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(paso);
        ponerCifras();
        return;
      }
      // Lo que acaba en este paso se va de una vez, lo propio también; lo nuevo entra después.
      const salir = () => {
        pasos.salir(paso, tl);
        const propios = propiosQueAcaban(paso);
        if (propios.length) tl.desaparecer(propios, {}, '<');
      };
      const entrar = desde => pasos.ordenes(paso).filter(o => o >= desde).forEach(o => pasos.animar(paso, tl, { orden: o, sinSalidas: true }));

      if (paso === 2) {
        // La ventana del subagente se llena y al final queda su resultado, en rojo; la flecha lo
        // lleva, por debajo, al final de la del agente. A la vez que la flecha, sube el coste de
        // cada uno; al llegar, el resultado en la del agente y el rótulo.
        const [enAgente, enSub] = todos('[data-resultado]');
        const flecha = raiz.querySelector('[data-flechas="1"] .traspaso');
        const contadores = cifras().map(c => c.closest('[data-paso]'));
        const rotulo = raiz.querySelector('[data-rotulo]').closest('[data-paso]');
        const [agente, sub] = cifras();
        agente.textContent = '0';
        sub.textContent = '0';
        salir();
        entrar(0);
        llenar(tl, todos('[data-lectura]'), '<');
        llenar(tl, enSub);
        trazarJuntas(tl, [flecha]);
        const llega = tl.duration();
        tl.aparecer(contadores, {}, '<')
          .subirContador(agente, { desde: 0, hasta: COSTE.agente, decimales: 2 }, '<')
          .subirContador(sub, { desde: 0, hasta: COSTE.subagente, decimales: 2 }, '<');
        llenar(tl, enAgente, llega);
        tl.aparecer(rotulo, {}, '<');
        return;
      }
      if (paso === 4) {
        // Cambio de fase. El agente, con lo suyo; los tres subagentes, que leen cada uno lo suyo
        // y devuelven su resultado: al agente solo llegan los tres resultados.
        salir();
        pasos.animar(4, tl, { orden: F2, sinSalidas: true });
        llenar(tl, todos('[data-si="agente"]'), '<');
        pasos.animar(4, tl, { orden: F2 + 1, sinSalidas: true });
        llenar(tl, todos('[data-si="lectura"]'));
        llenar(tl, todos('[data-si="resultado"]'));
        trazarJuntas(tl, todos('[data-flechas="si"] .traspaso'));
        llenar(tl, todos('[data-si="vuelve"]'));
        pasos.animar(4, tl, { orden: F2 + 2, sinSalidas: true });
        return;
      }
      if (paso === 5) {
        // Lo de antes se vacía. El agente ya tenía mucho contexto, y cada subagente lo vuelve a
        // cargar entero para leer muy poco y devolver casi nada.
        const vacian = propiosQueAcaban(5).filter(el => el.classList.contains('capa'));
        pasos.salir(5, tl);
        const inicio = tl.duration();
        vaciar(tl, vacian, inicio);
        tl.desaparecer(todos('[data-flechas="si"] .traspaso'), {}, inicio)
          .set(vacian, { autoAlpha: 0 });
        llenar(tl, todos('[data-no="agente"]'));
        llenar(tl, todos('[data-no="base"]'));
        llenar(tl, todos('[data-no="lectura"]'));
        llenar(tl, todos('[data-no="resultado"]'));
        trazarJuntas(tl, todos('[data-flechas="no"] .traspaso'));
        llenar(tl, todos('[data-no="vuelve"]'));
        entrar(F2);
        return;
      }
      if (paso === 6) {
        // Cambio de fase: lo anterior se va de una vez. Los dos subagentes y el archivo entran a la
        // vez, sus cables se trazan deprisa y aparece el conflicto; tras una pausa, la solución,
        // igual de deprisa, y la frase.
        salir();
        pasos.animar(6, tl, { orden: F3, sinSalidas: true });
        trazarJuntas(tl, todos('[data-cables="0"] path'));
        pasos.animar(6, tl, { orden: F3 + 1, sinSalidas: true });
        pausa(tl);
        pasos.animar(6, tl, { orden: F3 + 2, sinSalidas: true });
        trazarJuntas(tl, todos('[data-cables="1"] path'));
        pasos.animar(6, tl, { orden: F3 + 3, sinSalidas: true });
        return;
      }
      salir();
      entrar(0);
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
