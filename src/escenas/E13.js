// E13 · Skills. Pantalla propia.
// Arriba, tres skills plegadas (los tres ejemplos del guion): solo se ven su nombre y su
// descripción. A la derecha, la tarea que llega y las dos formas de activar una skill.
// Debajo, la ventana de contexto: al empezar solo entran las descripciones (unas líneas);
// cuando una skill se usa, las demás se atenúan y su contenido cae en la ventana. Abajo,
// cuándo crear una (procedimientos propios repetitivos), con un abanico de flechas hacia lo
// que debe explicar, y el consejo. Cifras ficticias, sin rótulo.
// Pasos: 1 plegadas · 2 una tarea encaja: su contenido entra · 3 cómo se activa · 4 cuándo crear una.
import { px } from '../../design/motion.js';
import { icono } from '../../design/iconos.js';
import { abanico } from '../../design/dibujos.js';
import { en, cabecera, consejo, miles, crearPasos, marcar } from './comun.js';

// Guion 2.5: los tres ejemplos de «cuándo crear una». La primera es la que se usa.
const SKILLS = [
  ['validar-migracion', 'Valida una migración de base de datos antes de aplicarla'],
  ['preparar-revision', 'Prepara una revisión con los criterios del departamento'],
  ['documentar-api', 'Genera la documentación con el formato del departamento'],
];

// Tokens (cifras ficticias): cada descripción y el contenido completo de la skill usada.
const CAPACIDAD = 200, DESCRIPCION = 300, CONTENIDO = 12000;
const [VX, VY, VANCHO] = [120, 580, 1680];
// Cuándo crear una: lo que debe explicar una skill, una parte encima de otra, a la derecha.
const PARTES = ['Cuándo', 'Qué necesita', 'Pasos', 'Resultado'];
const PARTES_X = 760, PARTE_Y = i => 812 + i * 48, ABANICO_X = 600;
const ARRIBA = 280;
const SKILL_X = i => 120 + i * (390 + 24);
const DERECHA = 1386;

export default function ({ escena, raiz }) {
  let pasos = null;
  const borde = () => px('--trazo-contorno') + px('--esp-1');
  const porMil = () => (VANCHO - 2 * borde()) / CAPACIDAD;
  // Las descripciones, a escala, no se verían: cada una lleva el mínimo que se distingue.
  const anchoDescripcion = () => px('--esp-1');
  const anchoContenido = () => Math.round((CONTENIDO / 1000) * porMil()) - px('--trazo-contorno');
  const cifra = () => raiz.querySelector('[data-cifra]');

  return {
    montar() {
      const tarjeta = ([nombre, descripcion]) => `<div class="skill skill--plegada"><div class="skill__cuerpo">
          <div class="skill__titulo">${icono('puzzle')}<span class="skill__nombre">${nombre}</span></div>
          <div class="skill__descripcion">${descripcion}</div></div></div>`;
      const tarjetas = SKILLS.map((sk, i) =>
        en(SKILL_X(i), ARRIBA, tarjeta(sk, i), { paso: 1, efecto: 'entrarConMuelle', ...(i > 0 && { atenua: 2, aviva: 4 }) })).join('');
      const descripciones = SKILLS.map(() => `<div class="capa capa--entrada" style="width:${anchoDescripcion()}px"></div>`).join('');
      const forma = (ic, quien, como) =>
        `<div style="display:flex;align-items:center;gap:var(--esp-2)">${icono(ic, 'icono--s')}<span class="tipo-texto-s" style="font-weight:var(--peso-enfasis)">${quien}</span>${como}</div>`;

      raiz.innerHTML =
        cabecera(escena, 1240) +
        tarjetas +
        // A la derecha: la tarea que encaja con la primera skill y, después, cómo se activa una skill.
        en(DERECHA, ARRIBA, `<p class="tipo-etiqueta" style="margin:0;color:var(--color-texto-3)">Llega una tarea</p>
          <p class="tipo-texto-s" style="display:flex;gap:var(--esp-2);margin:var(--esp-1) 0 0">${icono('message-square')}<span>Valida la migración 0042 antes de desplegarla</span></p>`,
          { paso: 2, estilo: 'width:414px' }) +
        en(DERECHA, ARRIBA + 140, `<p class="tipo-etiqueta" style="margin:0 0 var(--esp-1);color:var(--color-texto-3)">Dos formas de activarla</p>
          ${forma('user', 'Tú:', '<span class="tipo-mono-s">/validar-migracion</span>')}
          ${forma('bot', 'El agente:', '<span class="tipo-texto-s">por su descripción</span>')}`,
          { paso: 3, estilo: 'width:414px;display:grid;gap:var(--esp-1)' }) +
        // La ventana: las descripciones desde el principio; el contenido, solo cuando se usa.
        en(VX, VY, `<div class="ventana" style="width:${VANCHO}px"><div class="ventana__relleno">${descripciones}
            <div class="capa capa--entrada" data-contenido data-paso="2" data-propio style="width:${anchoContenido()}px"></div>
          </div><span class="ventana__capacidad">${CAPACIDAD}K</span></div>`, { paso: 1, orden: 1 }) +
        // El contenido de la skill: sale de su tarjeta y cae en la ventana (va después, para quedar encima).
        en(VX + px('--esp-6'), VY + (px('--ventana-alto') - 104) / 2, `<div class="documento" style="width:300px;height:104px"><div class="documento__cabecera" style="white-space:nowrap">${icono('puzzle', 'icono--s')}validar-migracion</div><div class="documento__cuerpo" style="gap:var(--esp-2);padding:var(--esp-3)">${[220, 160].map(a => `<span class="documento__linea" style="width:${a}px"></span>`).join('')}</div></div>`,
          { paso: 2, hasta: 2, propio: true }) +
        en(VX, VY + 120, `<div style="display:flex;gap:var(--esp-3);align-items:center">
            <span class="contador">${icono('puzzle')}<span>${miles(SKILLS.length * DESCRIPCION)}</span><span class="contador__unidad">tokens · 3 descripciones</span></span>
            <span class="contador contador--coste" data-paso="2" data-propio>${icono('file-text')}<span data-cifra>${miles(CONTENIDO)}</span><span class="contador__unidad">tokens · validar-migracion, entera</span></span>
          </div>`, { paso: 1, orden: 1 }) +
        // Cuándo crear una: el concepto a la izquierda, centrado en la altura de sus partes, y el abanico hacia ellas.
        en(VX, (PARTE_Y(0) + PARTE_Y(PARTES.length - 1)) / 2, `<div style="transform:translateY(-50%)"><p class="tipo-texto" style="margin:0;font-weight:var(--peso-enfasis)">Cuándo crear una</p>
          <p class="tipo-texto-s" style="margin:var(--esp-1) 0 0;color:var(--color-texto-2)">Procedimientos propios repetitivos</p></div>`, { paso: 4 }) +
        `<svg data-abanico style="position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible">${abanico({
          desde: [ABANICO_X, (PARTE_Y(0) + PARTE_Y(PARTES.length - 1)) / 2], hasta: PARTES.map((_, i) => [PARTES_X - px('--esp-2'), PARTE_Y(i)]) })}</svg>` +
        PARTES.map((parte, i) => en(PARTES_X, PARTE_Y(i), `<span class="tipo-texto-s" style="display:block;transform:translateY(-50%);white-space:nowrap">${parte}</span>`,
          { paso: 4, orden: 1 })).join('') +
        en(1040, (PARTE_Y(0) + PARTE_Y(PARTES.length - 1)) / 2, `<div style="transform:translateY(-50%)">${consejo('Descripción clara: con ella decide el agente')}</div>`, { paso: 4, orden: 2, efecto: 'entrarConMuelle' });
      marcar(raiz.querySelectorAll('.abanico__flecha'), 4, { orden: 1, efecto: 'trazar' });
      pasos = crearPasos(raiz);
      pasos.poner(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(paso);
        cifra().textContent = miles(CONTENIDO);
        return;
      }
      if (paso !== 2) return void pasos.animar(paso, tl);
      // La tarea llega y las otras skills se atenúan; el contenido de la que encaja cae en la
      // ventana, donde se convierte en capa mientras sube su contador.
      const doc = raiz.querySelector('.documento').parentElement;
      const contenido = raiz.querySelector('[data-contenido]');
      const contador = cifra().closest('.contador');
      cifra().textContent = '0';
      pasos.animar(2, tl);
      tl.set(doc, { autoAlpha: 1 })
        .entrarEnVentana(doc)
        .desaparecer(doc)
        .set(contenido, { autoAlpha: 1 }, '<')
        .llenarVentana(contenido, {}, '<')
        .aparecer(contador, {}, '<')
        .subirContador(cifra(), { desde: 0, hasta: CONTENIDO }, '<');
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
