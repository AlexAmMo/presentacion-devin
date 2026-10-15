// Láminas de 1920×1080 de design-system.html. Solo componen piezas de
// componentes.css y dibujos.js: aquí no se define ningún aspecto nuevo.
// Las posiciones y tamaños en px son de composición (permitidos); colores,
// tipografía y movimiento salen siempre de las variables.
import { icono } from '../iconos.js';
import { px } from '../motion.js';
import { grafica, dial, temporizador, circuito, bucle, repeticion, codo, saltos, abanico, traspaso, llave, moneda } from '../dibujos.js';
import logoClaro from '../assets/logos/openbank-logo-fondo-claro.svg';
import logoOpenai from '../assets/logos/openai.svg';
import logoAnthropic from '../assets/logos/anthropic.svg';
import logoDevin from '../assets/logos/devin-avatar-fondo-claro.svg';
import logoGithub from '../assets/logos/github.svg';
import logoLlave from '../assets/logos/openbank-llave.svg';

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
const herramienta = (ic, nombre) =>
  `<div class="herramienta"><div class="herramienta__circulo">${icono(ic, 'icono--l')}</div><span class="herramienta__nombre">${nombre}</span></div>`;
const agente = (nombre = 'Agente', detalle = 'modelo · effort') =>
  `<div class="agente">${icono('bot', 'icono--l')}<div><div class="agente__nombre">${nombre}</div><div class="agente__detalle">${detalle}</div></div></div>`;
const isla = (numero, ic, nombre, clase = '', extra = '') =>
  `<div class="isla${clase}"><div class="isla__cabecera"><span class="isla__numero">${numero}</span>${icono(ic)}</div><div class="isla__nombre">${nombre}</div>${extra}</div>`;
const servidor = (ic, nombre, detalle) =>
  `<div class="servidor">${icono(ic)}<div><div class="servidor__nombre">${nombre}</div><div class="servidor__detalle">${detalle}</div></div></div>`;
// Distancia del borde exterior de la ventana a sus capas: contorno + --esp-1 (.ventana__relleno).
const holgura = () => px('--trazo-contorno') + px('--esp-1');
/**
 * Ventana de contexto horizontal: capas [tipo, ancho, texto], su capacidad dentro, a la derecha, y
 * opcionalmente la línea de nivel donde acaban las capas. Los hijos absolutos se miden desde el
 * borde interior (dentro del contorno): de ahí el contorno que se resta en el nivel.
 */
const ventana = (ancho, capas, capacidad = '', { clase = '', nivel = '' } = {}) => {
  const g = px('--trazo-contorno');
  const ocupado = capas.reduce((a, [, w]) => a + w + g, 0) - g;
  const linea = nivel ? `<div class="nivel" style="left:${px('--esp-1') + ocupado + g / 2 - px('--trazo-fuerte') / 2}px;top:${-px('--esp-3') / 2 - g}px"><span class="nivel__cifra">${nivel}</span></div>` : '';
  const relleno = capas.length ? `<div class="ventana__relleno">${capas.map(([tipo, w, texto = '']) => `<div class="capa capa--${tipo}" style="width:${w}px">${texto}</div>`).join('')}</div>` : '';
  return `<div class="ventana${clase}" style="width:${ancho}px">${relleno}${capacidad ? `<span class="ventana__capacidad">${capacidad}</span>` : ''}${linea}</div>`;
};
/** Corchete de caché bajo el principio de una ventana (desde su primera capa), con su etiqueta debajo. */
const corcheteBajo = (ancho, fallo = false, texto = fallo ? 'Fallo' : 'Acierto', detalle = fallo ? 'se reprocesa' : 'se reutiliza') =>
  `<div style="display:grid;gap:var(--esp-1);margin-left:${holgura()}px">
    <div class="corchete${fallo ? ' corchete--fallo' : ''}" style="width:${ancho}px"></div>
    <div class="corchete-etiqueta${fallo ? ' corchete-etiqueta--fallo' : ''}">${icono('check', 'icono--s corchete-etiqueta__acierto')}${icono('x', 'icono--s corchete-etiqueta__fallo')}${texto}<span class="corchete-etiqueta__detalle">${detalle}</span></div>
  </div>`;
const lienzo = () => `width="${px('--escena-ancho')}" height="${px('--escena-alto')}"`;
const formato = (n, decimales) => n.toLocaleString('es-ES', { minimumFractionDigits: decimales, maximumFractionDigits: decimales, useGrouping: 'always' });

// ── Vocabulario ───────────────────────────────────────────────────────────

function v1(n) {
  const bloque = (titulo, cuerpo) => `<div style="display:grid;gap:var(--esp-2);justify-items:start">${vet(titulo)}${cuerpo}</div>`;
  // Tres capacidades superpuestas, cada una a la escala de la mayor (1M = 820 px).
  const capacidades = `<div style="position:relative;width:820px;height:var(--ventana-alto)">
      ${[[820, '1M'], [420, '512K'], [210, '256K']].map(([w, c], i) => `<div class="abs" style="left:0;top:0">${ventana(w, [], c, { clase: i ? ' ventana--menor' : '' })}</div>`).join('')}
    </div>`;
  // Si acierta, lo que cubre se relee de caché: en su color.
  const cache = fallo => `<div style="display:grid;gap:var(--esp-1)">${ventana(400, [[fallo ? 'entrada' : 'cacheada', 120], [fallo ? 'entrada' : 'cacheada', 72], ['salida', 40]])}${corcheteBajo(120 + 3 + 72, fallo)}</div>`;
  return lamina('vocabulario-1', `Vocabulario ${n} · Tokens y contexto`,
    cabecera(`Vocabulario · ${n} · Tokens y contexto`, true) +
    columna(120, 'Ficha de token',
      vet('Entrada') + fichas('entrada', ['Arre', 'gla', ' la']) +
      vet('Salida') + fichas('salida', ['Cam', 'bio', ' el']) +
      vet('Razonamiento') + fichas('razonamiento', ['Rev', 'iso', ' use']) +
      vet('Pequeña') + `<span class="ficha ficha--s ficha--entrada">${icono('corner-down-left', 'icono--s')}resumen + evidencias</span>` +
      `<div class="leyenda" style="width:390px;margin-top:var(--esp-2)">
        <span class="leyenda__elemento"><i class="leyenda__muestra leyenda__muestra--entrada"></i>Entrada</span>
        <span class="leyenda__elemento"><i class="leyenda__muestra leyenda__muestra--salida"></i>Salida</span>
        <span class="leyenda__elemento"><i class="leyenda__muestra leyenda__muestra--razonamiento"></i>Razonamiento</span>
        <span class="leyenda__elemento"><i class="leyenda__muestra leyenda__muestra--cacheada"></i>Leído de caché</span>
        <span class="leyenda__elemento"><i class="leyenda__muestra leyenda__muestra--corchete"></i>Caché</span>
      </div>`,
      'Píldora en DM Mono. Un espacio inicial se dibuja como «·» atenuado. Debajo, la leyenda.') +
    columna(550, 'Ventana de contexto, capas y caché',
      bloque('Se llena de izquierda a derecha; el nivel marca lo ocupado',
        ventana(820, [['entrada', 230, 'Instrucciones'], ['razonamiento', 70], ['salida', 56], ['entrada', 120]], '256K', { nivel: '61 %' })) +
      bloque('Capacidades comparadas, a la misma escala', capacidades) +
      bloque('Caché: el corchete cubre el principio, que se repite', `<div style="display:flex;gap:var(--esp-3)">${cache(false)}${cache(true)}</div>`),
      'Muchos tokens del mismo tipo forman una capa; su ancho es proporcional a los tokens. El corchete va bajo lo que cubre, desde la izquierda: continuo con ' +
      `${icono('check', 'icono--s')} si acierta (lo que cubre se relee de caché, en su color), discontinuo con ${icono('x', 'icono--s')} si falla.`, 820) +
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
       <div style="display:grid;gap:var(--esp-2)">
         <div class="subagente">${icono('bot')}<div><div class="subagente__nombre">Subagente</div><div class="subagente__detalle">contexto propio</div></div></div>
         ${ventana(312, [['entrada', 200], ['resultado', 24]], '', { clase: ' ventana--mini' })}
       </div>
       <svg width="312" height="40" style="overflow:visible;margin:calc(var(--esp-1) * -1) 0">${traspaso([[223, 0], [223, 20], [143, 20], [143, 40]])}</svg>
       ${ventana(312, [['entrada', 120], ['resultado', 24]], '', { clase: ' ventana--mini' })}`,
      'El subagente es el mismo símbolo, más pequeño y hueco, con su propia ventana debajo. Solo devuelve su resultado: una capa en rojo y su flecha.') +
    columna(550, 'Documento y árbol',
      `<div style="position:relative;flex:none;width:390px;height:280px">
        <div class="documento" style="position:absolute;left:72px;top:0;height:220px"><div class="documento__cabecera">${icono('file-text', 'icono--s')}rules/*.md</div></div>
        <div class="documento" style="position:absolute;left:0;top:56px;height:220px;box-shadow:var(--elevacion-1)"><div class="documento__cabecera">${icono('file-text', 'icono--s')}AGENTS.md</div><div class="documento__cuerpo">${lineas}</div></div>
      </div>
      <ul class="arbol"><li>${nodo('folder-open', 'repo/')}<ul>
        <li>${nodo('file-text', 'AGENTS.md', ' arbol__nodo--cargado')}</li>
        <li>${nodo('folder-open', 'api/')}<ul><li>${nodo('file-text', 'AGENTS.md')}</li></ul></li>
        <li>${nodo('folder', 'ui/')}</li>
      </ul></li></ul>
      ${vet('Subrayado')}
      <p class="tipo-mono-s" style="margin:calc(var(--esp-2) * -1) 0 0;width:390px;line-height:var(--interlineado-texto)">${[[2, 'Al filtrar, la tabla queda vacía.'], [1, 'Vuelve a la página 1.'], [4, 'Mantén la API.']]
        .map(([q, x]) => `<span class="subrayado subrayado--pregunta-${q}">${x}</span>`).join(' ')}</p>`,
      'Documento con su nombre de fichero en mono. En el árbol, el AGENTS.md cargado se rellena como un token de entrada. El subrayado, en el color de la pregunta que responde cada parte, sigue las filas.') +
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
    // El bucle y la tarjeta, con el mismo centro; las cuatro herramientas de serie, sobre el bucle.
    en(560 - (px('--bucle-diametro') / 2 + 2 * px('--esp-8')), 494 - (px('--bucle-diametro') / 2 + px('--esp-6')),
      bucle({ etiquetas: ['el modelo decide', 'usa una herramienta', 'lee el resultado'] })) +
    en(560, 494, `<div class="agente agente--circulo">${icono('bot', 'icono--l')}<div class="agente__nombre">Devin</div></div>`, 'transform:translate(-50%,-50%)') +
    [['search', 45], ['file-text', 135], ['pencil', 225], ['terminal', 315]].map(([ic, a]) => {
      const r = px('--bucle-diametro') / 2, rad = (a * Math.PI) / 180;
      return en(560 + r * Math.sin(rad), 494 - r * Math.cos(rad), `<div class="herramienta__circulo">${icono(ic, 'icono--l')}</div>`, 'transform:translate(-50%,-50%)');
    }).join('') +
    en(120, 860, '<div class="vregla" style="width:780px">Una vuelta por llamada: decide, usa una herramienta y lee su resultado. Un punto recorre el círculo.</div>') +
    en(1100, 150, '<div class="vh">Hueco del hub</div>') +
    en(1100, 210, `<div style="display:flex;align-items:center;gap:var(--esp-4)">
        <div class="hueco hueco--pieza hueco--lleno">${icono('cpu')}<span>Modelo</span></div>
        <div class="hueco hueco--pieza">${icono('wrench')}<span>Tools propias</span></div>
        <div class="hueco hueco--circulo" style="width:${px('--herramienta-diametro')}px;height:${px('--herramienta-diametro')}px">${icono('search')}</div>
      </div>`) +
    en(1100, 400, '<div class="vregla" style="width:700px">Todas las piezas, círculos iguales: puesta (sólido) o por llegar (punteado). Las herramientas de serie, en círculo de herramienta. Contexto se transforma en la ventana cuando se anima el contexto.</div>') +
    en(1100, 576, '<div class="vh">Caja de plugin y sus marcas</div>') +
    en(1100, 632, `<div style="display:flex;gap:var(--esp-2)">
        <span class="etiqueta etiqueta--compacta etiqueta--obligatorio">${icono('lock', 'icono--s')}Obligatorio</span>
        <span class="etiqueta etiqueta--compacta etiqueta--opcional">${icono('circle-check', 'icono--s')}Opcional</span>
        <span class="etiqueta etiqueta--compacta etiqueta--prohibido">${icono('ban', 'icono--s')}Prohibido</span></div>`) +
    en(1100, 748, `<div class="plugin"><span class="plugin__etiqueta">${icono('package', 'icono--s')}plugin · equipo-datos</span>
        <div style="display:flex;gap:var(--esp-5);align-items:flex-start">${herramienta('wrench', 'docs')}${herramienta('wrench', 'incidencias')}
          <div style="display:grid;justify-items:center;gap:var(--esp-2);padding-top:12px"><div class="conector">${icono('plug')}</div><span class="tipo-mono-s" style="padding-top:12px">mcp · jira</span></div></div>
      </div>`));
}

function v4(n) {
  return lamina('vocabulario-4', `Vocabulario ${n} · Herramientas propias y MCP`,
    cabecera(`Vocabulario · ${n} · Herramientas propias y MCP`) +
    en(120, 150, '<div class="vh">Definición de herramienta</div>') +
    en(120, 230, herramienta('wrench', 'incidencias')) +
    en(181, 396, `<div style="color:var(--color-texto-3)">${icono('arrow-down')}</div>`) +
    en(120, 448, `<div class="definicion">
        <div class="definicion__cabecera">${icono('wrench', 'icono--s')}buscar_incidencias</div>
        <div class="definicion__campo definicion__campo--resaltado"><span class="definicion__clave">Descripción</span><span class="definicion__valor">Busca incidencias abiertas de un servicio. Úsala cuando pregunten por errores en producción.</span></div>
        <div class="definicion__campo"><span class="definicion__clave">Parámetros</span><span class="definicion__valor definicion__valor--mono">servicio: texto · desde: fecha</span></div>
      </div>`) +
    en(120, 860, '<div class="vregla" style="width:780px">Lo que el agente lee: nombre, descripción y parámetros. La descripción es el disparador y se resalta.</div>') +
    en(1000, 150, '<div class="vh">Conector MCP</div>') +
    en(1000, 230, agente('Agente', 'Devin')) +
    `<svg class="abs" style="left:0;top:0" ${lienzo()}><path class="conector__cable" d="M1434 305C1470 305 1462 252 1500 252"/><path class="conector__cable" d="M1434 305C1470 305 1462 392 1500 392"/></svg>` +
    en(1346, 261, `<div class="conector">${icono('plug')}</div>`) +
    en(1500, 202, servidor('laptop', 'Local', 'stdio'), 'display:grid;width:300px') +
    en(1500, 342, servidor('cloud', 'Remoto', 'HTTP'), 'display:grid;width:300px') +
    en(1000, 490, '<div class="vh">Servidor real, con su logo</div>') +
    en(1000, 550, `<div style="display:flex;gap:var(--esp-3)"><div class="servidor"><img class="servidor__logo" src="${logoGithub}" alt=""><div class="servidor__nombre">GitHub</div></div>
      <div class="servidor"><img class="servidor__logo servidor__logo--apaisado" src="${logoLlave}" alt=""><div class="servidor__nombre">DS-Workspace</div></div></div>`) +
    en(1000, 664, '<div class="vh">Candado</div>') +
    en(1000, 724, `<div class="candado"><div class="candado__icono">${icono('lock', 'icono--l')}</div><span class="candado__texto">Credenciales nunca en el repositorio</span></div>`) +
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
        { nombre: 'Modelo D', estilo: 'acento', puntos: [[0.3, 60], [0.8, 68], [2, 73], [10, 76]], resaltar: [1], notas: [[1, 'Medium', 'arriba']] },
      ],
      flechas: [{ desde: [10, 69], hasta: [0.8, 68], texto: 'Lo mismo por 1/12', lado: 'abajo' }],
    })) +
    en(120, 700, '<div class="fuente">Fuente:<span class="fuente__referencia">ejemplo del design system · cifras ficticias</span></div>') +
    en(120, 780, '<div class="vh">Tabla y salto de precio</div>') +
    en(120, 836, `<table class="tabla" data-tabla-muestra><thead><tr><th>Tarea</th><th>Estrategia inicial</th></tr></thead><tbody>
        <tr><td>Cambio pequeño y claro</td><td>Modelo medio, effort bajo</td></tr>
        <tr><td>Bug difícil de reproducir</td><td>Modelo alto, effort medio</td></tr>
      </tbody></table>`) +
    // El salto, a la derecha de la tabla: de la segunda fila a la primera (centros de sus filas).
    `<svg class="abs" style="left:0;top:0;overflow:visible" ${lienzo()}>${saltos({ x: 900, xCifras: 980, saltos: [{ desde: 986, hasta: 928, curva: 64, texto: '×20' }] })}</svg>` +
    en(1160, 150, '<div class="vh">Dial de effort</div>') +
    en(1144, 196, dial({ actual: 2 })) +
    en(1160, 580, '<div class="vh">Temporizador</div>') +
    en(1160, 640, temporizador({ segundos: 300 })) +
    en(1440, 690, '<div class="vregla" style="width:360px;border:0;padding:0">Cinco minutos de caché. Al agotarse, el corchete pasa a discontinuo.</div>') +
    en(1160, 860, '<div class="vh">Proveedor de modelos</div>') +
    en(1160, 916, `<div style="display:flex;flex-wrap:wrap;gap:var(--esp-2) var(--esp-5);width:640px">${[[logoOpenai, 'GPT', 'OpenAI'], [logoAnthropic, 'Claude', 'Anthropic'], [logoDevin, 'SWE', 'Cognition', ' proveedor--devin']].map(([logo, familia, nombre, clase = '']) =>
      `<span class="proveedor${clase}"><img class="proveedor__logo" src="${logo}" alt="">${familia}<span class="proveedor__nombre">${nombre}</span></span>`).join('')}</div>`));
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
    en(1240, 150, '<div class="vh">Etiqueta, marcas y viñetas</div>') +
    en(1240, 200, `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:var(--esp-2);width:560px">
        <span class="etiqueta">${icono('map-pin', 'icono--s')}Parte 2 · Modelos</span>
        <span class="ficticio">${icono('info', 'icono--s')}Cifras ficticias</span>
        <div class="fuente">Fuente:<span class="fuente__referencia">Context Arena · 14-10-2026</span></div>
      </div>`) +
    en(1240, 320, `<div class="vinetas vinetas--anillo" style="gap:var(--esp-3);width:560px">
        <div class="vineta">${icono('check')}<span class="vineta__titulo">Acceso a lo local</span></div>
        <div class="vineta">${repeticion('calendar-clock')}<span class="vineta__titulo">Cada semana</span><span class="vineta__detalle">La misma tarea, sin intervención</span></div>
      </div>`) +
    en(120, 470, '<div class="vh">Tarjeta de consejo</div>') +
    en(120, 530, `<div class="consejo">${icono('lightbulb')}<span class="consejo__rotulo">Consejo</span><span class="consejo__texto">Empieza por un nivel medio; sube cuando lo justifique la tarea.</span></div>`) +
    en(960, 470, '<div class="vh">Circuito · sin parada actual</div>') +
    en(960, 530, circuito({ ancho: 840, alto: 250, actual: null, hechas: 2, paradas: PARADAS })) +
    en(120, 748, '<div class="vh">Abanico</div>') +
    en(120, 868, '<div style="transform:translateY(-50%)"><div class="tipo-texto-s" style="font-weight:var(--peso-enfasis)">Cuándo crear una</div><div class="tipo-etiqueta" style="color:var(--color-texto-2)">Procedimientos propios</div></div>') +
    `<svg class="abs" style="left:0;top:0;overflow:visible" ${lienzo()}>${abanico({ desde: [440, 868], hasta: [816, 851, 886, 921].map(y => [560, y]) })}</svg>` +
    ['Cuándo', 'Qué necesita', 'Pasos', 'Resultado'].map((t, i) => en(576, 816 + i * 35, `<span class="tipo-etiqueta" style="display:block;transform:translateY(-50%)">${t}</span>`)).join('') +
    en(960, 812, '<div class="vh">Llave</div>') +
    `<svg class="abs" style="left:0;top:0;overflow:visible" ${lienzo()}>${llave({ x0: 1140, x1: 1780, y: 830 })}</svg>` +
    en(120, 952, '<div class="vregla" style="width:1680px">Un solo acento por pantalla: aquí lo lleva la isla actual, así que el circuito va sin parada actual (las hechas, en sólido). Con parada actual, en acento y con su punto, en el mapa de «Aplicado».</div>'));
}

function v7(n) {
  const [x, y, ancho, alto] = [120, 210, 840, 630];
  const resaltado = { left: 480, top: 520, width: 280, height: 72 };
  // La guía sale del borde del resaltado y llega, en codo, al borde de su etiqueta.
  const [gx, gy] = [x + resaltado.left + resaltado.width + px('--trazo-fuerte') * 1.5, y + resaltado.top + resaltado.height / 2 + px('--trazo-fuerte')];
  const ey = 456;
  const muestra = (texto, clase) => `<div style="display:grid;gap:var(--esp-2)">${vet(texto)}<svg width="480" height="16"><path class="${clase}" d="M8 8H472"/></svg></div>`;
  return lamina('vocabulario-7', `Vocabulario ${n} · Captura, guía, tapa y moneda`,
    cabecera(`Vocabulario · ${n} · Captura, guía, tapa y moneda`) +
    en(x, 150, '<div class="vh">Captura con resaltado</div>') +
    en(x, y, `<div class="captura" style="width:${ancho}px;height:${alto}px">
        <div class="captura__pendiente">${icono('image', 'icono--l')}Captura pendiente · Devin Desktop</div>
        <div class="resaltado" style="left:${resaltado.left}px;top:${resaltado.top}px;width:${resaltado.width}px;height:${resaltado.height}px"></div>
      </div>`) +
    `<svg class="abs" style="left:0;top:0" ${lienzo()}><path class="resaltado__guia" d="${codo([[gx, gy], [1272, gy], [1272, ey], [1316, ey]])}"/></svg>` +
    en(1316, ey - 27, `<span class="etiqueta">${icono('gauge', 'icono--s')}Effort</span>`) +
    // La moneda, a media escala (en escena, sola en el centro y girando).
    en(1010, 150, '<div class="vh">Moneda</div>') +
    en(1010, 210, `<div style="transform:scale(0.5);transform-origin:0 0">${moneda()}</div>`) +
    en(1010, 430, vet('×0,5. En escena, sola en el centro, girando sobre su eje vertical'), 'width:250px') +
    en(1320, 150, '<div class="vh">Ruta y guía</div>') +
    en(1320, 230, `<div style="display:grid;gap:var(--esp-5)">${muestra('Ruta · puntos: recorrido de la cámara o del subagente', 'camino')}${muestra('Guía · línea fina: une una etiqueta con lo que señala', 'camino camino--guia')}</div>`) +
    en(1320, 510, '<div class="vh">Tapa de bloque</div>') +
    // En el mapa se dibuja ×--tapa-escala; aquí, a escala 1: así se ve desde la vista general.
    en(1320, 560, `<div class="tapa" style="--tapa-escala:1;width:330px;height:240px"><div class="tapa__contenido">${icono('footprints', 'tapa__icono')}<h2 class="tapa__titulo">Primeros pasos</h2></div></div>`) +
    en(1320, 815, vet('En el mapa, ×8: así se ve desde la vista general. Hasta llegar a ella, solo el icono, centrado'), 'width:480px') +
    en(x, 910, '<div class="vregla" style="width:1680px">Sin captura real, el marcador «Captura pendiente» queda a la vista. El resaltado rodea el control que se explica y una guía en rojo, en codo, lo une a su etiqueta.</div>'));
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
    en(cx - 195, cy - 75, agente('2 · Devin', 'E04 E14 E18')) +
    bloque(1540, 452, '3', 'coins', 'Coste', 'E20–E23') +
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
  const c3 = n => formato(n, 3);
  // A la derecha de cada ventana, su coste por tipo de token y el total.
  const desglose = (filas, total) => `<div style="display:grid;grid-template-columns:auto auto;justify-content:start;gap:var(--esp-1) var(--esp-5);align-items:baseline">
    ${filas.map(([t, n]) => `<span class="tipo-etiqueta" style="color:var(--color-texto-2)">${t}</span><span class="tipo-mono" style="text-align:right;font-variant-numeric:var(--cifras)">${c3(n)}</span>`).join('')}
    <span class="tipo-texto" style="font-weight:var(--peso-enfasis)">Total</span><span class="tipo-mono" style="text-align:right;font-weight:var(--peso-enfasis);font-variant-numeric:var(--cifras)">${c3(total)}</span></div>`;
  // La ventana de la llamada 12, a escala de 100.000 tokens: 20.000 fijos, y por llamada 4.000 de
  // entrada y, desde la segunda, los 1.000 de salida de la anterior. Entre capas, el contorno.
  const ancho = 1120, gap = px('--trazo-contorno'), porToken = (ancho - 2 * holgura()) / 100000;
  const tokens = [['entrada', 20000, 'Fijo · 20.000'], ['entrada', 4000], ...llamadas.slice(1).flatMap(() => [['salida', 1000], ['entrada', 4000]])];
  const capas = tokens.map(([tipo, n, texto]) => [tipo, Math.round(n * porToken) - gap, texto]);
  // El corchete cubre lo leído de caché en la llamada 12: el contexto de la 11 (74.000 tokens).
  const leido = Math.round(74000 * porToken) - gap;
  return lamina('e23', 'E23 · Fotograma de la llamada 12',
    cabecera('E23 · Una conversación, paso a paso · llamada 12 de 12', true) +
    en(120, 150, grafica({
      ancho, alto: 300, margenDerecho: 260,
      x: { min: 1, max: 12, marcas: [1, 4, 8, 12], titulo: 'Llamada' },
      y: { min: 0, max: 1.4, marcas: [0, 0.7, 1.4], formato: n => formato(n, 1), titulo: 'Coste acumulado' },
      series: [
        { nombre: `Sin caché · ${c3(totalSin)}`, estilo: 2, marcar: false, puntos: acumulado(sin).map((c, i) => [i + 1, c]) },
        { nombre: `Con caché · ${c3(totalCon)}`, estilo: 1, marcar: false, puntos: acumulado(con).map((c, i) => [i + 1, c]) },
      ],
    })) +
    en(1340, 170, `<span class="contador">${icono('repeat')}12<span class="contador__unidad">llamadas</span></span>`) +
    // Sobre los totales sin redondear (1,356 y 0,4253), como el guion: −69 %. Con los redondeados saldría −68 %.
    en(1340, 270, `<div class="tipo-titulo" style="color:var(--color-acento)">−${Math.round((1 - totalCon / totalSin) * 100)} %</div>${apoyo('con caché, frente a sin caché')}`) +
    en(120, 500, rotulo('Sin caché')) +
    en(120, 548, ventana(ancho, capas, '100K')) +
    en(1340, 500, desglose([['Input sin caché', totalSin - output], ['Output', output]], totalSin)) +
    en(120, 700, rotulo('Con caché')) +
    en(120, 748, `<div style="display:grid;gap:var(--esp-1)">${ventana(ancho, capas, '100K')}${corcheteBajo(leido, false, 'Cache read', '74.000 tokens')}</div>`) +
    en(1340, 700, desglose([['Cache write', write], ['Cache read', read], ['Output', output]], totalCon)));
}

/** E09 · el contexto, por pasos (la escena real, src/escenas/E09.js, con su composición). Devuelve la lámina y sus pasos animados con los efectos de motion.js. */
export function e09() {
  // Una fila por concepto; cada una, con su ventana a todo el ancho. Miles de tokens, cifras ficticias.
  const [X, ANCHO, VENTANA] = [120, 1680, 256];
  const capasDe = [['Instrucciones', 28], ['Reglas', 18], ['Conversación', 28], ['Código leído', 38], ['Resultados de herramientas', 54]];
  const g = px('--trazo-contorno'), porMil = (ANCHO - 2 * holgura()) / VENTANA;
  const usado = capasDe.reduce((a, [, n]) => a + n, 0);
  const ancho = n => Math.round(n * porMil) - g;
  const utilizadas = capasDe.map(([t, n]) => ['entrada', ancho(n), t]);
  // Relevante: todo atenuado salvo 16K del código leído (12K atenuados antes).
  const relevantes = capasDe.flatMap(([t, n]) => t !== 'Código leído' ? [['entrada', ancho(n), '', ' atenuado']] :
    [['entrada', ancho(12), '', ' atenuado'], ['entrada', ancho(16), ''], ['entrada', ancho(n - 28), '', ' atenuado']]);
  const conClase = capas => capas.map(([tipo, w, texto, clase = '']) => `<div class="capa capa--${tipo}${clase}" style="width:${w}px">${texto}</div>`).join('');
  const barra = (ancho, contenido, capacidad, clase = '') =>
    `<div class="ventana${clase}" style="width:${ancho}px">${contenido ? `<div class="ventana__relleno">${contenido}</div>` : ''}<span class="ventana__capacidad">${capacidad}</span></div>`;
  const FILAS = [240, 450, 660];
  const y = i => FILAS[i] + 59;
  const nivelX = X + holgura() + usado * porMil - g / 2 - px('--trazo-fuerte') / 2;
  const enPaso = (x, yy, html, estilo, paso) => en(x, yy, html, estilo).replace('class="abs"', `class="abs" data-e09-paso="${paso}"`);
  const concepto = (i, nombre, texto) => enPaso(X, FILAS[i],
    `<p class="tipo-texto" style="margin:0;display:flex;gap:var(--esp-3)"><span style="font-weight:var(--peso-enfasis)">${nombre}</span><span style="color:var(--color-texto-2)">${texto}</span></p>`, '', i + 1);
  const html = lamina('e09', 'E09 · Contexto: qué es',
    cabecera('E09 · Contexto: qué es', true) +
    en(120, 136, '<div class="tipo-titulo-s">El contexto es todo lo que el modelo lee en cada llamada</div>') +
    concepto(0, 'Capacidad', 'Cuánto puede admitir el modelo') +
    [[1000, '1M tokens'], [512, '512K tokens'], [256, '256K tokens']].map(([n, c], i) =>
      enPaso(X, y(0), barra(Math.round((ANCHO * n) / 1000), '', c, i ? ' ventana--menor' : ''), '', 1)).join('') +
    concepto(1, 'Utilizado', 'Cuánto se está ocupando') +
    enPaso(X, y(1), barra(ANCHO, conClase(utilizadas), '256K tokens'), '', 2) +
    enPaso(nivelX, y(1) - px('--esp-3') / 2, `<div class="nivel" data-e09="nivel" style="position:static"><span class="nivel__cifra">${Math.round((usado / VENTANA) * 100)} %</span></div>`, '', 2) +
    concepto(2, 'Relevante', 'Qué parte ayuda realmente a resolver la tarea') +
    enPaso(X, y(2), barra(ANCHO, conClase(relevantes), '256K tokens'), '', 3) +
    en(120, 960, '<p class="tipo-etiqueta" data-e09="texto" style="margin:0;color:var(--color-texto-3)"></p>'));
  const enFila = (b, paso) => b.querySelectorAll(`[data-e09-paso="${paso}"]`);
  const pasos = [
    { texto: 'Antes del primer paso: solo el mensaje.' },
    { texto: 'Capacidad: tres ventanas superpuestas, de 256K, 512K y 1M tokens. Depende del modelo.', animar: (tl, b) => tl.aparecer(enFila(b, 1)) },
    {
      texto: 'Utilizado: la ventana de 256K se llena de izquierda a derecha y el nivel marca el 65 %.',
      animar: (tl, b) => {
        const nivel = b.querySelector('[data-e09=nivel]');
        const [fila, barraUsada, envoltura] = enFila(b, 2);
        // La ventana se llena capa a capa y, donde acaba, aparece el nivel con su cifra subiendo.
        const cifra = nivel.querySelector('.nivel__cifra');
        tl.aparecer([fila, barraUsada])
          .llenarVentana(barraUsada.querySelectorAll('.capa'))
          .aparecer(envoltura)
          .subirContador(cifra, { desde: 0, hasta: Math.round((usado / VENTANA) * 100), sufijo: ' %' }, '<');
      },
    },
    {
      texto: 'Relevante: el mismo relleno, atenuado salvo el trozo del código leído que ayuda de verdad.',
      animar: (tl, b) => tl.aparecer(enFila(b, 3)),
    },
  ];
  const preparar = (gsap, b) => gsap.set(b.querySelectorAll('[data-e09-paso]'), { autoAlpha: 0 });
  return { html, pasos, preparar };
}
