// Láminas de 1920×1080 de design-system.html. Solo componen piezas de
// componentes.css y dibujos.js: aquí no se define ningún aspecto nuevo.
// Las posiciones y tamaños en px son de composición (permitidos); colores,
// tipografía y movimiento salen siempre de las variables.
import { icono } from '../iconos.js';
import { px } from '../motion.js';
import { grafica, dial, temporizador, circuito, bucle } from '../dibujos.js';
import logoClaro from '../assets/logos/openbank-logo-fondo-claro.svg';

const en = (x, y, html, estilo = '') => `<div class="abs" style="left:${x}px;top:${y}px;${estilo}">${html}</div>`;
const lamina = (id, etiqueta, contenido) =>
  `<div class="lamina" data-lamina="${id}" data-etiqueta="${etiqueta}">${contenido}</div>`;
const cabecera = (texto, ficticio = false) =>
  en(120, 64, `<span class="etiqueta">${texto}</span>`) +
  (ficticio ? `<div class="abs" style="right:120px;top:64px"><span class="ficticio">${icono('info', 'icono--s')}Cifras ficticias</span></div>` : '');
const columna = (x, titulo, cuerpo, regla, ancho = 390, arriba = 150, alto = 866, hueco = 'var(--esp-3)') =>
  en(x, arriba, `<div class="vh">${titulo}</div>${cuerpo}${regla ? `<div class="vregla">${regla}</div>` : ''}`,
    `width:${ancho}px;height:${alto}px;display:flex;flex-direction:column;align-items:flex-start;gap:${hueco}`);
const vet = texto => `<div class="vet">${texto}</div>`;
// En «Aplicado» no se usan los rótulos de las láminas (.vh, .vet): solo lo que existirá en escena.
const rotulo = (texto, estilo = '') => `<div class="tipo-texto" style="font-weight:var(--peso-enfasis);${estilo}">${texto}</div>`;
const apoyo = (texto, estilo = '') => `<div class="tipo-etiqueta" style="color:var(--color-texto-3);${estilo}">${texto}</div>`;

const ficha = (tipo, texto, clase = '') =>
  `<span class="ficha ficha--${tipo}${clase}">${texto.startsWith(' ') ? '<span class="ficha__espacio">·</span>' : ''}${texto.trim()}</span>`;
const fichas = (tipo, partes) => `<div class="fichas">${partes.map(t => ficha(tipo, t)).join('')}</div>`;
const capa = (tipo, alto, texto = '', clase = '') => `<div class="capa capa--${tipo}${clase}" style="height:${alto}px">${texto}</div>`;
const herramienta = (ic, nombre) =>
  `<div class="herramienta"><div class="herramienta__circulo">${icono(ic, 'icono--l')}</div><span class="herramienta__nombre">${nombre}</span></div>`;
const agente = (nombre = 'Agente', detalle = 'modelo · effort') =>
  `<div class="agente">${icono('bot', 'icono--l')}<div><div class="agente__nombre">${nombre}</div><div class="agente__detalle">${detalle}</div></div></div>`;
const hueco = (ic, texto, ancho, alto, variante = '', claseIcono = '') =>
  `<div class="hueco${variante ? ` hueco--${variante}` : ''}" style="width:${ancho}px;height:${alto}px">${icono(ic, claseIcono)}${texto}</div>`;
const isla = (numero, ic, nombre, clase = '', extra = '') =>
  `<div class="isla${clase}"><div class="isla__cabecera"><span class="isla__numero">${numero}</span>${icono(ic)}</div><div class="isla__nombre">${nombre}</div>${extra}</div>`;
const servidor = (ic, nombre, detalle) =>
  `<div class="servidor">${icono(ic)}<div><div class="servidor__nombre">${nombre}</div><div class="servidor__detalle">${detalle}</div></div></div>`;
// Distancia del borde exterior del recipiente a sus capas: contorno + --esp-1 (.recipiente__capas).
const holgura = () => px('--trazo-contorno') + px('--esp-1');
const lienzo = () => `width="${px('--escena-ancho')}" height="${px('--escena-alto')}"`;
const formato = (n, decimales) => n.toLocaleString('es-ES', { minimumFractionDigits: decimales, maximumFractionDigits: decimales, useGrouping: 'always' });

// ── Vocabulario ───────────────────────────────────────────────────────────

function v1(n) {
  const alto = 540, k = holgura();
  const marcas = [[k, '200k'], [alto / 2, '100k'], [alto - k, '0']].map(([y, t]) => `<span class="escala__marca" style="top:${y}px">${t}</span>`).join('');
  const pila = (fallo = false) => `<div style="display:flex;gap:var(--esp-2);align-items:flex-end;height:184px">
      <div style="width:140px;display:flex;flex-direction:column-reverse;gap:3px">${capa('entrada', 80)}${capa('razonamiento', 30)}${capa('entrada', 60)}</div>
      <div class="corchete${fallo ? ' corchete--fallo' : ''}" style="height:176px"></div>
      <div class="corchete-etiqueta${fallo ? ' corchete-etiqueta--fallo' : ''}" style="align-self:center">${icono('check', 'icono--s corchete-etiqueta__acierto')}${icono('x', 'icono--s corchete-etiqueta__fallo')}${fallo ? 'Fallo' : 'Acierto'}<span class="corchete-etiqueta__detalle">${fallo ? 'se reprocesa' : 'se reutiliza'}</span></div>
    </div>`;
  return lamina('vocabulario-1', `Vocabulario ${n} · Tokens y contexto`,
    cabecera(`Vocabulario · ${n} · Tokens y contexto`, true) +
    columna(120, 'Ficha de token',
      vet('Entrada') + fichas('entrada', ['Arre', 'gla', ' la']) +
      vet('Salida') + fichas('salida', ['Cam', 'bio', ' el']) +
      vet('Razonamiento') + fichas('razonamiento', ['Rev', 'iso', ' use']) +
      vet('Pequeña') + `<span class="ficha ficha--s ficha--entrada">${icono('corner-down-left', 'icono--s')}resumen + evidencias</span>`,
      'Píldora en DM Mono. Un espacio inicial se dibuja como «·» atenuado.') +
    columna(550, 'Ventana y capas',
      `<div style="position:relative;width:390px;height:${alto}px">
        <div class="escala" style="position:absolute;left:0;top:0;width:80px;height:${alto}px">${marcas}</div>
        <div class="recipiente" style="position:absolute;left:96px;top:0;width:220px;height:${alto}px"><div class="recipiente__capas">
          ${capa('entrada', 110, 'Entrada')}${capa('razonamiento', 44)}${capa('salida', 28)}${capa('entrada', 58)}
        </div></div>
        <div class="nivel" style="left:84px;width:244px;top:277px"><span class="nivel__cifra">48 %</span></div>
      </div>`,
      'Muchos tokens del mismo tipo forman una capa. El recipiente se llena de abajo arriba; la línea roja marca el nivel.') +
    columna(980, 'Corchete de caché',
      pila() + pila(true) +
      `<div class="leyenda" style="width:390px">
        <span class="leyenda__elemento"><i class="leyenda__muestra leyenda__muestra--entrada"></i>Entrada</span>
        <span class="leyenda__elemento"><i class="leyenda__muestra leyenda__muestra--salida"></i>Salida</span>
        <span class="leyenda__elemento"><i class="leyenda__muestra leyenda__muestra--razonamiento"></i>Razonamiento</span>
        <span class="leyenda__elemento"><i class="leyenda__muestra leyenda__muestra--corchete"></i>Caché</span>
      </div>`,
      `Corchete a la derecha de lo que cubre: continuo con ${icono('check', 'icono--s')} si acierta, discontinuo con ${icono('x', 'icono--s')} si falla. Debajo, la leyenda.`) +
    columna(1410, 'Contador',
      `<span class="contador contador--coste">${icono('coins')}0,050<span class="contador__unidad">u.</span></span>
       <span class="contador">${icono('repeat')}12<span class="contador__unidad">llamadas</span></span>
       <span class="contador">${icono('hourglass')}8,4<span class="contador__unidad">s</span></span>
       <div class="cifra" style="margin-top:16px"><span class="cifra__etiqueta">${icono('coins', 'icono--s')}Coste acumulado</span><span class="cifra__valor">0,33</span><span class="cifra__unidad">unidades · ficticio</span></div>`,
      'Siempre con su unidad. El coste va en navy sólido; llamadas y latencia, huecos.'));
}

function v2(n) {
  const lineas = [200, 240, 170, 220].map(a => `<span class="documento__linea" style="width:${a}px"></span>`).join('');
  const nodo = (ic, nombre, clase = '') => `<span class="arbol__nodo${clase}">${icono(ic, 'icono--s')}<span class="arbol__nombre">${nombre}</span></span>`;
  const descripcion = '<div class="skill__descripcion">Revisa una migración antes de aplicarla.</div>';
  const anatomia = `<ol class="skill__anatomia">${['cuándo', 'qué necesita', 'pasos', 'resultado'].map(t => `<li>${t}</li>`).join('')}</ol>`;
  return lamina('vocabulario-2', `Vocabulario ${n} · Piezas del agente`,
    cabecera(`Vocabulario · ${n} · Piezas del agente`) +
    columna(120, 'Agente y subagente',
      agente() +
      `<svg width="40" height="56" style="margin:-8px 0 -8px 52px"><path class="camino" d="M20 6V54"/></svg>
       <div style="display:flex;gap:var(--esp-2);align-items:flex-end">
         <div class="subagente">${icono('bot')}<div><div class="subagente__nombre">Subagente</div><div class="subagente__detalle">contexto propio</div></div></div>
         <div class="recipiente recipiente--mini"><div class="recipiente__capas">${capa('entrada', 36)}</div></div>
       </div>
       <span class="ficha ficha--s ficha--entrada">${icono('corner-down-left', 'icono--s')}resumen + evidencias</span>`,
      'El subagente es el mismo símbolo, más pequeño y hueco, y siempre lleva su propia ventana.') +
    columna(550, 'Documento y árbol',
      `<div style="position:relative;width:390px;height:280px">
        <div class="documento" style="position:absolute;left:72px;top:0;height:220px"><div class="documento__cabecera">${icono('file-text', 'icono--s')}rules/*.md</div></div>
        <div class="documento" style="position:absolute;left:0;top:56px;height:220px;box-shadow:var(--elevacion-1)"><div class="documento__cabecera">${icono('file-text', 'icono--s')}AGENTS.md</div><div class="documento__cuerpo">${lineas}</div></div>
      </div>
      <ul class="arbol"><li>${nodo('folder-open', 'repo/')}<ul>
        <li>${nodo('file-text', 'AGENTS.md', ' arbol__nodo--cargado')}</li>
        <li>${nodo('folder-open', 'api/')}<ul><li>${nodo('file-text', 'AGENTS.md')}</li></ul></li>
        <li>${nodo('folder', 'ui/')}</li>
      </ul></li></ul>`,
      'Documento con su nombre de fichero en mono. En el árbol, el AGENTS.md cargado se rellena como un token de entrada.') +
    columna(980, 'Skill',
      `<div style="display:grid;gap:var(--esp-1)">${vet('Plegada')}
        <div class="skill skill--plegada"><div class="skill__cuerpo"><div class="skill__titulo">${icono('puzzle')}<span class="skill__nombre">revisar-migracion</span></div>${descripcion}${anatomia}</div></div></div>
      <div style="display:grid;gap:var(--esp-1)">${vet('Desplegada')}
        <div class="skill"><div class="skill__cuerpo"><div class="skill__titulo">${icono('puzzle', 'icono--l')}<span class="skill__nombre">revisar-migracion</span></div>${descripcion}${anatomia}</div></div></div>`,
      'Pieza con pestaña. Plegada, solo su nombre y su descripción; solo entra en la ventana cuando se usa.', 390, 150, 866, 'var(--esp-2)') +
    columna(1410, 'Herramienta',
      `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--esp-3);justify-items:center;width:390px">
        ${herramienta('file-text', 'leer')}${herramienta('pencil', 'editar')}${herramienta('search', 'buscar')}${herramienta('terminal', 'ejecutar')}
      </div>
      <div style="color:var(--color-texto-3);align-self:center">${icono('arrow-down')}</div>
      <span class="ficha ficha--s ficha--entrada" style="align-self:center"><span>resultado</span>${icono('arrow-right', 'icono--s')}<span>entrada</span></span>`,
      'Círculo con el icono de la acción y su nombre en mono. Su resultado entra en la ventana como tokens de entrada.'));
}

function v3(n) {
  return lamina('vocabulario-3', `Vocabulario ${n} · El hub`,
    cabecera(`Vocabulario · ${n} · El hub`) +
    en(120, 150, '<div class="vh">Bucle del agente</div>') +
    en(24, 200, bucle({ etiquetas: ['el modelo decide', 'usa una herramienta', 'lee el resultado'] })) +
    en(325, 429, agente()) +
    en(120, 860, '<div class="vregla" style="width:780px">Una vuelta por llamada: decide, usa una herramienta y lee su resultado. Un punto recorre el círculo.</div>') +
    en(1100, 150, '<div class="vh">Hueco del hub</div>') +
    en(1100, 210, `<div style="position:relative;width:700px;height:400px">
        ${en(0, 0, hueco('cpu', 'Modelo', 220, 96, 'lleno'))}
        ${en(240, 0, hueco('gauge', 'Effort', 220, 96))}
        ${en(480, 0, hueco('wrench', 'Tools', 112, 112, 'circulo'))}
        ${en(612, 12, hueco('plug', 'MCP', 88, 88, 'circulo', 'icono--s'))}
        ${en(0, 136, hueco('app-window', 'Contexto', 150, 240, 'recipiente'))}
        ${en(170, 136, hueco('file-text', 'AGENTS.md', 170, 200, 'documento'))}
        ${en(360, 136, hueco('puzzle', 'Skills', 220, 110))}
        ${en(360, 266, hueco('git-fork', 'Subagente', 300, 96))}
      </div>`) +
    en(1100, 640, '<div class="vh">Caja de plugin</div>') +
    en(1100, 720, `<div class="plugin"><span class="plugin__etiqueta">${icono('package', 'icono--s')}plugin · equipo-datos</span>
        <div style="display:flex;gap:var(--esp-5);align-items:flex-start">${herramienta('wrench', 'docs')}${herramienta('wrench', 'incidencias')}
          <div style="display:grid;justify-items:center;gap:var(--esp-2);padding-top:12px"><div class="conector">${icono('plug')}</div><span class="tipo-mono-s" style="padding-top:12px">mcp · jira</span></div></div>
      </div>`));
}

function v4(n) {
  return lamina('vocabulario-4', `Vocabulario ${n} · Herramientas propias y MCP`,
    cabecera(`Vocabulario · ${n} · Herramientas propias y MCP`) +
    en(120, 150, '<div class="vh">Definición de herramienta</div>') +
    en(120, 230, herramienta('wrench', 'incidencias')) +
    en(290, 264, `<div style="color:var(--color-texto-3)">${icono('arrow-right')}</div>`) +
    en(350, 230, `<div class="definicion">
        <div class="definicion__cabecera">${icono('wrench', 'icono--s')}buscar_incidencias</div>
        <div class="definicion__campo definicion__campo--resaltado"><span class="definicion__clave">Descripción</span><span class="definicion__valor">Busca incidencias abiertas de un servicio. Úsala cuando pregunten por errores en producción.</span></div>
        <div class="definicion__campo"><span class="definicion__clave">Parámetros</span><span class="definicion__valor definicion__valor--mono">servicio: texto · desde: fecha</span></div>
      </div>`) +
    en(120, 860, '<div class="vregla" style="width:780px">Lo que el agente lee: nombre, descripción y parámetros. La descripción es el disparador y se resalta.</div>') +
    en(1000, 150, '<div class="vh">Conector MCP</div>') +
    en(1000, 230, agente('Agente', 'conectado por MCP')) +
    `<svg class="abs" style="left:0;top:0" ${lienzo()}><path class="conector__cable" d="M1434 305C1470 305 1462 252 1500 252"/><path class="conector__cable" d="M1434 305C1470 305 1462 392 1500 392"/></svg>` +
    en(1346, 261, `<div class="conector">${icono('plug')}</div>`) +
    en(1500, 202, servidor('laptop', 'Local', 'devin mcp add'), 'display:grid;width:300px') +
    en(1500, 342, servidor('cloud', 'Remoto', 'Cloud · MCPs'), 'display:grid;width:300px') +
    en(1000, 560, '<div class="vh">Candado</div>') +
    en(1000, 620, `<div class="candado"><div class="candado__icono">${icono('lock', 'icono--l')}</div><span class="candado__texto">Credenciales nunca en el repositorio</span></div>`) +
    en(1000, 860, '<div class="vregla" style="width:800px">El cable, continuo y navy, une piezas. Los puntos son siempre un recorrido (cámara, subagente); la guía, fina y gris, une una etiqueta con lo que señala.</div>'));
}

function v5(n) {
  const dinero = n => `${formato(n, n < 1 ? 1 : 0)} $`;
  return lamina('vocabulario-5', `Vocabulario ${n} · Datos y tiempo`,
    cabecera(`Vocabulario · ${n} · Datos y tiempo`, true) +
    en(120, 150, '<div class="vh">Gráfica de líneas</div>') +
    en(120, 200, grafica({
      ancho: 960, alto: 480,
      x: { min: 0.1, max: 10, log: true, marcas: [0.1, 0.3, 1, 3, 10], formato: dinero, titulo: 'Coste por intento' },
      y: { min: 40, max: 80, marcas: [40, 50, 60, 70, 80], formato: n => `${n} %`, titulo: 'Acierto' },
      franja: { desde: 3, hasta: 10, texto: 'Poco a ganar' },
      series: [
        { nombre: 'Modelo A', estilo: 1, puntos: [[0.15, 46], [0.5, 53], [2, 56], [10, 57]] },
        { nombre: 'Modelo B', estilo: 2, puntos: [[0.3, 48], [1, 57], [3, 62], [10, 63]] },
        { nombre: 'Modelo C', estilo: 4, puntos: [[0.8, 50], [2.5, 63], [5, 67], [10, 69]] },
        { nombre: 'Modelo D', estilo: 'acento', puntos: [[0.3, 60], [0.8, 68], [2, 73], [10, 76]] },
      ],
    })) +
    en(120, 700, '<div class="fuente">Fuente:<span class="fuente__referencia">ejemplo del design system · cifras ficticias</span></div>') +
    en(120, 780, '<div class="vh">Tabla</div>') +
    en(120, 836, `<table class="tabla"><thead><tr><th>Tarea</th><th>Estrategia inicial</th></tr></thead><tbody>
        <tr><td>Cambio pequeño y claro</td><td>Modelo medio, effort bajo</td></tr>
        <tr><td>Bug difícil de reproducir</td><td>Modelo alto, effort medio</td></tr>
      </tbody></table>`) +
    en(1160, 150, '<div class="vh">Dial de effort</div>') +
    en(1144, 196, dial({ actual: 2 })) +
    en(1160, 580, '<div class="vh">Temporizador</div>') +
    en(1160, 640, temporizador({ segundos: 300 })) +
    en(1440, 690, '<div class="vregla" style="width:360px;border:0;padding:0">Cinco minutos de caché. Al agotarse, el corchete pasa a discontinuo.</div>'));
}

const PARADAS = [['24', 'Definir'], ['25', 'Contexto'], ['26', 'Planificar'], ['27', 'Intervenir'], ['28', 'Verificar'], ['29', 'Hábitos']].map(([id, nombre]) => ({ id, nombre }));

// Un solo acento por lámina, como en escena: la isla actual aquí, el resaltado en la 7 y el circuito con parada actual en el mapa de «Aplicado».
function v6(n) {
  return lamina('vocabulario-6', `Vocabulario ${n} · Mapa y apoyo`,
    cabecera(`Vocabulario · ${n} · Mapa y apoyo`) +
    en(120, 150, '<div class="vh">Isla · normal, actual y atenuada</div>') +
    en(120, 210, isla('01', 'laptop', 'Local')) +
    en(480, 210, isla('02', 'cloud', 'Cloud', ' isla--actual')) +
    en(840, 210, isla('03', 'gauge', 'Effort', ' atenuado')) +
    en(1240, 150, '<div class="vh">Etiqueta, ventaja y marcas</div>') +
    en(1240, 210, `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:var(--esp-2);width:560px">
        <span class="etiqueta">${icono('map-pin', 'icono--s')}Parte 2 · Modelos</span>
        <span class="ficticio">${icono('info', 'icono--s')}Cifras ficticias</span>
        <span class="etiqueta etiqueta--ventaja">${icono('check', 'icono--s')}Acceso a lo local</span>
        <div class="fuente">Fuente:<span class="fuente__referencia">Context Arena · 14-10-2026</span></div>
      </div>`) +
    en(120, 470, '<div class="vh">Tarjeta de consejo</div>') +
    en(120, 530, `<div class="consejo">${icono('lightbulb')}<span class="consejo__rotulo">Consejo</span><span class="consejo__texto">Empieza por un nivel medio; sube cuando lo justifique la tarea.</span></div>`) +
    en(960, 470, '<div class="vh">Circuito · sin parada actual</div>') +
    en(960, 530, circuito({ ancho: 840, alto: 250, actual: null, hechas: 2, paradas: PARADAS })) +
    en(120, 860, '<div class="vregla" style="width:1680px">Un solo acento por pantalla: aquí lo lleva la isla actual, así que el circuito va sin parada actual (las hechas, en sólido). Con parada actual, en acento y con su punto, en el mapa de «Aplicado».</div>'));
}

function v7(n) {
  const [x, y, ancho, alto] = [120, 210, 1120, 630];
  const resaltado = { left: 760, top: 520, width: 280, height: 72 };
  const [gx, gy] = [x + resaltado.left + resaltado.width + px('--trazo-fuerte'), y + resaltado.top + resaltado.height / 2];
  const muestra = (texto, clase) => `<div style="display:grid;gap:var(--esp-2)">${vet(texto)}<svg width="480" height="16"><path class="${clase}" d="M8 8H472"/></svg></div>`;
  return lamina('vocabulario-7', `Vocabulario ${n} · Captura, guía y tapa`,
    cabecera(`Vocabulario · ${n} · Captura, guía y tapa`) +
    en(x, 150, '<div class="vh">Captura con resaltado</div>') +
    en(x, y, `<div class="captura" style="width:${ancho}px;height:${alto}px">
        <div class="captura__pendiente">${icono('image', 'icono--l')}Captura pendiente · Devin Desktop</div>
        <div class="resaltado" style="left:${resaltado.left}px;top:${resaltado.top}px;width:${resaltado.width}px;height:${resaltado.height}px"></div>
      </div>`) +
    `<svg class="abs" style="left:0;top:0" ${lienzo()}><path class="camino camino--guia" d="M${gx} ${gy}H1300"/></svg>` +
    en(1316, gy - 24, `<span class="etiqueta">${icono('gauge', 'icono--s')}Effort</span>`) +
    en(1320, 150, '<div class="vh">Ruta y guía</div>') +
    en(1320, 230, `<div style="display:grid;gap:var(--esp-5)">${muestra('Ruta · puntos: recorrido de la cámara o del subagente', 'camino')}${muestra('Guía · línea fina: une una etiqueta con lo que señala', 'camino camino--guia')}</div>`) +
    en(1320, 430, '<div class="vh">Tapa de bloque</div>') +
    // En el mapa se dibuja ×--tapa-escala; aquí, a escala 1: así se ve desde la vista general.
    en(1320, 490, '<div class="tapa" style="--tapa-escala:1;width:280px;height:175px"><h2 class="tapa__titulo">Primeros pasos</h2></div>') +
    en(1624, 500, vet('En el mapa, ×8: así se ve desde la vista general'), 'width:200px') +
    en(x, 870, '<div class="vregla" style="width:1680px">Sin captura real, el marcador «Captura pendiente» queda a la vista. El resaltado rodea el control que se explica y una guía lo une a su etiqueta.</div>'));
}

/** Cada lámina recibe su número («1 de 7») al montarse. */
export const VOCABULARIO = [v1, v2, v3, v4, v5, v6, v7];

// ── Aplicado ──────────────────────────────────────────────────────────────

/** Mapa de escenas.md: una cruz de cinco bloques, con Devin en el centro de una cuadrícula de 3 × 3. */
export function mapa(duraciones) {
  const [cx, cy, dx, dy] = [1020, 560, 350, 170];
  // Alrededor de Devin, en sentido horario desde arriba: [columna, fila, icono, nombre, escenas].
  const temas = [
    [0, -1, 'cpu', 'Modelos', 'E05–E07'], [1, -1, 'gauge', 'Effort', 'E08'], [1, 0, 'app-window', 'Contexto', 'E09–E11'], [1, 1, 'file-text', 'Rules', 'E12'],
    [0, 1, 'puzzle', 'Skills', 'E13'], [-1, 1, 'wrench', 'Tools propias', 'E15'], [-1, 0, 'plug', 'MCP', 'E16'], [-1, -1, 'git-fork', 'Subagentes', 'E17'],
  ].map(([c, f, ic, nombre, ids]) =>
    `<div class="abs" style="left:${cx + c * dx}px;top:${cy + f * dy}px;transform:translate(-50%,-50%)"><span class="etiqueta">${icono(ic, 'icono--s')}${nombre} · ${ids}</span></div>`).join('');
  const bloque = (x, y, numero, ic, nombre, ids) => en(x, y, isla(numero, ic, nombre, '', `<span class="tipo-mono-s">${ids}</span>`), 'width:320px');
  const leyenda = duraciones.map(([texto, valor]) => `<div class="leyenda__elemento">${texto} · ${valor}</div>`).join('');
  return lamina('mapa', 'Mapa · cruz de cinco bloques',
    `<svg class="abs" style="left:0;top:0" ${lienzo()}>
      <path class="camino camino--guia" d="M${cx} 290V${cy}M${cx} ${cy}H1540M${cx} ${cy}V800M${cx} ${cy}H500"/>
    </svg>` +
    en(120, 64, `<div class="etiqueta" style="padding:var(--esp-2) var(--esp-4)"><img src="${logoClaro}" alt="Openbank" style="height:32px"></div>`) +
    en(120, 150, '<div class="tipo-etiqueta" style="width:440px;font-weight:var(--peso-texto);color:var(--color-texto-2)">Apertura: la portada es el logo de Devin y, desde la vista general, los cinco bloques tapados. Cada tapa se levanta al entrar en su bloque.</div>') +
    en(120, 830, `<div class="leyenda" style="flex-direction:column;align-items:flex-start;gap:var(--esp-1)">${rotulo('Ruta de la cámara', 'margin-bottom:var(--esp-1);color:var(--color-texto-1)')}${leyenda}</div>`) +
    bloque(cx - 160, 96, '1', 'map-pin', 'Primeros pasos', 'E02 E03') +
    temas +
    en(cx - 195, cy - 75, agente('2 · Devin', 'E04 E14 E18 E19')) +
    bloque(1540, 452, '3', 'coins', 'Coste', 'E19–E23') +
    bloque(180, 452, '5', 'map-pin', 'Preguntas', 'E30 E31') +
    en(cx - 410, 800, circuito({
      ancho: 820, alto: 240, actual: 0,
      paradas: ['Definir', 'Contexto', 'Planificar', 'Intervenir', 'Verificar', 'Hábitos'].map((nombre, i) => ({ id: String(24 + i), nombre })),
    })) +
    en(1480, 900, `<span class="etiqueta">${icono('list-checks', 'icono--s')}4 · Buenas prácticas</span>`));
}

/** Fotograma de E23 en la llamada 12: con y sin caché (Anexo A del guion, cifras ficticias). */
export function e23() {
  // Anexo A: 20.000 tokens fijos; por llamada, 4.000 de entrada y 1.000 de salida.
  // Tarifas ficticias por millón: input 2, cache write 2,5, cache read 0,2, output 10.
  const contexto = k => 24000 + 5000 * (k - 1);
  const sin = k => contexto(k) * 2e-6 + 1000 * 10e-6;
  const con = k => (k === 1 ? 24000 * 2.5e-6 : 5000 * 2.5e-6 + contexto(k - 1) * 0.2e-6) + 1000 * 10e-6;
  const llamadas = Array.from({ length: 12 }, (_, i) => i + 1);
  const acumulado = f => llamadas.reduce((a, k) => [...a, (a.at(-1) ?? 0) + f(k)], []);
  const [totalSin, totalCon] = [acumulado(sin).at(-1), acumulado(con).at(-1)];
  const write = (24000 + 11 * 5000) * 2.5e-6, read = llamadas.slice(1).reduce((a, k) => a + contexto(k - 1), 0) * 0.2e-6, output = 12 * 1000 * 10e-6;
  const c2 = n => formato(n, 2);
  // Bajo el título de cada lado, cuatro contadores y el total (escenas.md, E23).
  const contadores = (filas, total) => `<div style="display:flex;flex-direction:column;align-items:flex-start;gap:var(--esp-2)">
    ${filas.map(([t, n]) => `<span class="contador">${c2(n)}<span class="contador__unidad">${t}</span></span>`).join('')}
    <span class="contador contador--coste">${icono('coins')}${c2(total)}<span class="contador__unidad">total</span></span></div>`;
  // Capas de la llamada 12: 20.000 fijos, 4.000 de la llamada 1 y 5.000 por cada llamada siguiente.
  // Recipiente de 300×500 para 100.000 tokens; entre capas, el contorno.
  const [y0, ancho, alto] = [500, 300, 500];
  const k = holgura(), gap = px('--trazo-contorno'), util = alto - 2 * k;
  const tokens = [20000, 4000, ...Array(11).fill(5000)];
  const altoCapa = n => Math.round((n / 100000) * util) - gap;
  const capas = tokens.map((n, i) => capa('entrada', altoCapa(n), i === 0 ? 'Fijo · 20.000' : '')).join('');
  const recipiente = x => en(x, y0, `<div class="recipiente" style="width:${ancho}px;height:${alto}px"><div class="recipiente__capas">${capas}</div></div>`);
  // El corchete cubre lo leído de caché: las 12 primeras capas (74.000 tokens).
  const fondo = y0 + alto - k;
  const corcheteAlto = tokens.slice(0, 12).reduce((a, n) => a + altoCapa(n) + gap, 0) - gap;
  const xd = 960;
  return lamina('e23', 'E23 · Fotograma de la llamada 12',
    cabecera('E23 · Una conversación, paso a paso · llamada 12 de 12', true) +
    en(540, 120, grafica({
      ancho: 900, alto: 320, margenDerecho: 220,
      x: { min: 1, max: 12, marcas: [1, 4, 8, 12], titulo: 'Llamada' },
      y: { min: 0, max: 1.4, marcas: [0, 0.7, 1.4], formato: n => formato(n, 1), titulo: 'Coste acumulado' },
      series: [
        { nombre: `Sin caché · ${c2(totalSin)}`, estilo: 2, marcar: false, puntos: acumulado(sin).map((c, i) => [i + 1, c]) },
        { nombre: `Con caché · ${c2(totalCon)}`, estilo: 1, marcar: false, puntos: acumulado(con).map((c, i) => [i + 1, c]) },
      ],
    })) +
    en(120, 440, rotulo('Sin caché')) +
    recipiente(120) +
    en(120 + ancho + 40, y0, contadores([['input', totalSin - output], ['cache write', 0], ['cache read', 0], ['output', output]], totalSin)) +
    en(xd, 440, rotulo('Con caché')) +
    recipiente(xd) +
    en(xd + ancho + 12, fondo - corcheteAlto, `<div class="corchete" style="height:${corcheteAlto}px"></div>`) +
    en(xd + ancho + 52, fondo - corcheteAlto / 2 - 36, `<div class="corchete-etiqueta">${icono('check', 'icono--s corchete-etiqueta__acierto')}${icono('x', 'icono--s corchete-etiqueta__fallo')}Cache read<span class="corchete-etiqueta__detalle">74.000</span></div>`) +
    en(xd + ancho + 52, fondo - corcheteAlto - 70, apoyo('Cache write<br><span class="tipo-mono-s">5.000</span>')) +
    en(1520, y0, contadores([['input', 0], ['cache write', write], ['cache read', read], ['output', output]], totalCon)) +
    // Sobre los totales sin redondear (1,356 y 0,4253), como el guion: −69 %. Con los redondeados saldría −68 %.
    en(1530, 150, `<div class="tipo-titulo" style="color:var(--color-acento)">−${Math.round((1 - totalCon / totalSin) * 100)} %</div>${apoyo('frente a sin caché')}`));
}

/** E09 · el contexto, por pasos. Devuelve la lámina y sus pasos animados con los efectos de motion.js. */
export function e09() {
  // Recipiente con sus medidas de componente; las capas ocupan su alto menos la holgura arriba y abajo.
  const [x, y] = [1180, 200];
  const k = holgura(), util = px('--recipiente-alto') - 2 * k, sobra = px('--esp-3') / 2;
  const fill = util / 200000;
  const capas = [['Instrucciones', 12000], ['Conversación', 30000], ['Código leído', 40000], ['Resultados de herramientas', 14000]];
  const usado = capas.reduce((a, [, n]) => a + n, 0);
  const marcas = [0, 50000, 100000, 150000, 200000].map(n =>
    `<span class="escala__marca" style="top:${Math.round(k + util - n * fill)}px">${formato(n, 0)}</span>`).join('');
  const alturaUsada = Math.round(usado * fill);
  const html = lamina('e09', 'E09 · Contexto: qué es',
    cabecera('E09 · Contexto: qué es', true) +
    en(120, 150, '<div class="tipo-titulo" style="width:800px">El contexto es todo lo que el modelo lee en cada llamada</div>') +
    en(120, 560, '<p class="tipo-texto" data-e09="texto" style="width:760px;color:var(--color-texto-2)"></p>') +
    en(x, 132, `<span class="etiqueta" data-e09="capacidad">${icono('app-window', 'icono--s')}Capacidad · 200.000 tokens</span>`) +
    en(x - 180, y, `<div class="escala" style="width:160px;height:var(--recipiente-alto)">${marcas}</div>`) +
    en(x, y, `<div class="recipiente"><div class="recipiente__capas">${capas.map(([t, n]) => capa('entrada', Math.round(n * fill) - px('--trazo-contorno'), `${t} · ${formato(n, 0)}`)).join('')}</div></div>`) +
    en(x - sobra, y + k + util - px('--trazo-fuerte') / 2, `<div class="nivel" data-e09="nivel" style="width:${px('--recipiente-ancho') + 2 * sobra}px"><span class="nivel__cifra">${Math.round((usado / 200000) * 100)} %</span></div>`) +
    en(790, y + k + util - Math.round((12000 + 30000 + 20000) * fill) - 26, `<span class="etiqueta" data-e09="relevante">${icono('search', 'icono--s')}Relevante</span>`));
  const pasos = [
    { texto: 'El recipiente vacío: aquí entra todo lo que el modelo lee.' },
    {
      texto: 'Entran las capas, de abajo arriba: instrucciones, conversación, código leído y resultados de herramientas.',
      animar: (tl, b) => tl.apilarCapa(b.querySelectorAll('.capa')),
    },
    {
      texto: 'Capacidad: lo máximo que cabe en la ventana.',
      animar: (tl, b) => tl.aparecer(b.querySelectorAll('.escala__marca')).entrarConMuelle(b.querySelector('[data-e09=capacidad]'), {}, '<'),
    },
    {
      texto: `Utilizado: ${formato(usado, 0)} tokens, la línea de nivel.`,
      animar: (tl, b) => tl.set(b.querySelector('[data-e09=nivel]'), { autoAlpha: 1 }).subirNivel(b.querySelector('[data-e09=nivel]'), { y: -alturaUsada }),
    },
    {
      texto: 'Relevante: solo una parte sirve para esta tarea; el resto se atenúa.',
      animar: (tl, b) => tl.atenuar([...b.querySelectorAll('.capa')].filter((_, i) => i !== 2)).aparecer(b.querySelector('[data-e09=relevante]'), {}, '<'),
    },
  ];
  const preparar = (gsap, b) => {
    gsap.set(b.querySelectorAll('.capa'), { scaleY: 0, transformOrigin: '50% 100%' });
    gsap.set([...b.querySelectorAll('.escala__marca'), ...b.querySelectorAll('[data-e09=capacidad],[data-e09=nivel],[data-e09=relevante]')], { autoAlpha: 0 });
  };
  return { html, pasos, preparar };
}
