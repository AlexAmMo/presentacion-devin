// E13 · Skills. Pantalla propia.
// Arriba, una skill plegada (validar-migracion: solo se ven su nombre y su descripción) y, a su
// lado, las dos formas de activarla, centradas juntas. Cuando llega una tarea, las dos se corren a
// la izquierda para dejarle sitio a su derecha y el contenido de la skill cae en la ventana.
// Debajo, la ventana de contexto: al empezar solo entra la descripción (unas líneas). Abajo,
// cuándo crear una (procedimientos propios repetitivos), con un abanico de flechas hacia lo
// que debe explicar, y el consejo. Cifras ficticias, sin rótulo.
// Pasos: 1 la skill y cómo se activa · 2 llega una tarea: su contenido entra · 3 cuándo crear una.
import { gsap } from 'gsap';
import { px, s, v } from '../../design/motion.js';
import { icono } from '../../design/iconos.js';
import { abanico } from '../../design/dibujos.js';
import { en, paso, cabecera, consejo, miles, crearPasos, marcar, encadenar } from './comun.js';

// Guion 2.5: la skill del ejemplo.
const SKILL = ['validar-migracion', 'Valida una migración de base de datos antes de aplicarla'];

// Tokens (cifras ficticias): su descripción y su contenido completo.
const CAPACIDAD = 200, DESCRIPCION = 300, CONTENIDO = 10000;
const [VX, VY, VANCHO] = [120, 580, 1680];
// Cuándo crear una: lo que debe explicar una skill, una parte encima de otra, a la derecha.
const PARTES = ['Cuándo', 'Qué necesita', 'Pasos', 'Resultado'];
const PARTES_X = 760, PARTE_Y = i => 812 + i * 48, ABANICO_X = 600;
const ARRIBA = 300;

export default function ({ escena, raiz }) {
  let pasos = null, fila = null, corrimiento = 0;
  const borde = () => px('--trazo-contorno') + px('--esp-1');
  const porMil = () => (VANCHO - 2 * borde()) / CAPACIDAD;
  // Las descripciones, a escala, no se verían: cada una lleva el mínimo que se distingue.
  const anchoDescripcion = () => px('--esp-1');
  const anchoContenido = () => Math.round((CONTENIDO / 1000) * porMil()) - px('--trazo-contorno');
  const cifra = () => raiz.querySelector('[data-cifra]');

  return {
    montar() {
      const [nombre, descripcion] = SKILL;
      const tarjeta = `<div class="skill skill--plegada"${paso(1, { efecto: 'entrarConMuelle' })}><div class="skill__cuerpo">
          <div class="skill__titulo">${icono('puzzle')}<span class="skill__nombre">${nombre}</span></div>
          <div class="skill__descripcion">${descripcion}</div></div></div>`;
      const forma = (ic, quien, como) =>
        `<div style="display:flex;align-items:center;gap:var(--esp-2)">${icono(ic, 'icono--s')}<span class="tipo-texto-s" style="font-weight:var(--peso-enfasis)">${quien}</span>${como}</div>`;

      raiz.innerHTML =
        cabecera(escena, 1240) +
        // Arriba, en una fila centrada: la skill, cómo se activa y, en el paso 2, la tarea que llega.
        // Hasta entonces, la fila va corrida a la derecha: la skill y cómo se activa quedan centradas.
        en(120, ARRIBA, `<div style="width:1680px;display:flex;justify-content:center"><div data-fila style="display:flex;align-items:center;gap:var(--esp-6)">
            ${tarjeta}
            <div style="display:grid;gap:var(--esp-1)"${paso(1, { orden: 1 })}><p class="tipo-etiqueta" style="margin:0 0 var(--esp-1);color:var(--color-texto-3)">Dos formas de activarla</p>
              ${forma('user', 'Tú:', `<span class="tipo-mono-s">/${nombre}</span>`)}
              ${forma('bot', 'El agente:', '<span class="tipo-texto-s">por su descripción</span>')}</div>
            <div data-tarea style="width:420px"${paso(2)}><p class="tipo-etiqueta" style="margin:0;color:var(--color-texto-3)">Llega una tarea</p>
              <p class="tipo-texto-s" style="display:flex;gap:var(--esp-2);margin:var(--esp-1) 0 0">${icono('message-square')}<span>Valida la migración 0042 antes de desplegarla</span></p></div>
          </div></div>`) +
        // La ventana: la descripción desde el principio; el contenido, solo cuando se usa.
        en(VX, VY, `<div class="ventana" style="width:${VANCHO}px"><div class="ventana__relleno"><div class="capa capa--entrada" style="width:${anchoDescripcion()}px"></div>
            <div class="capa capa--entrada" data-contenido data-paso="2" data-propio style="width:${anchoContenido()}px"></div>
          </div><span class="ventana__capacidad">${CAPACIDAD}K</span></div>`, { paso: 1, orden: 2 }) +
        // El contenido de la skill: sale de su tarjeta y cae en la ventana (va después, para quedar encima).
        en(VX + px('--esp-6'), VY + (px('--ventana-alto') - 104) / 2, `<div class="documento" style="width:300px;height:104px"><div class="documento__cabecera" style="white-space:nowrap">${icono('puzzle', 'icono--s')}validar-migracion</div><div class="documento__cuerpo" style="gap:var(--esp-2);padding:var(--esp-3)">${[220, 160].map(a => `<span class="documento__linea" style="width:${a}px"></span>`).join('')}</div></div>`,
          { paso: 2, hasta: 2, propio: true }) +
        en(VX, VY + 120, `<div style="display:flex;gap:var(--esp-3);align-items:center">
            <span class="contador">${icono('puzzle')}<span>${miles(DESCRIPCION)}</span><span class="contador__unidad">tokens · descripción de ${nombre}</span></span>
            <span class="contador contador--coste" data-paso="2" data-propio>${icono('puzzle')}<span data-cifra>${miles(CONTENIDO)}</span><span class="contador__unidad">tokens · ${nombre} completa</span></span>
          </div>`, { paso: 1, orden: 2 }) +
        // Cuándo crear una: el concepto a la izquierda, centrado en la altura de sus partes, y el abanico hacia ellas.
        en(VX, (PARTE_Y(0) + PARTE_Y(PARTES.length - 1)) / 2, `<div style="transform:translateY(-50%)"><p class="tipo-texto" style="margin:0;font-weight:var(--peso-enfasis)">Cuándo crear una</p>
          <p class="tipo-texto-s" style="margin:var(--esp-1) 0 0;color:var(--color-texto-2)">Procedimientos propios repetitivos</p></div>`, { paso: 3 }) +
        `<svg data-abanico style="position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible">${abanico({
          desde: [ABANICO_X, (PARTE_Y(0) + PARTE_Y(PARTES.length - 1)) / 2], hasta: PARTES.map((_, i) => [PARTES_X - px('--esp-2'), PARTE_Y(i)]) })}</svg>` +
        PARTES.map((parte, i) => en(PARTES_X, PARTE_Y(i), `<span class="tipo-texto-s" style="display:block;transform:translateY(-50%);white-space:nowrap">${parte}</span>`,
          { paso: 3, orden: 1 })).join('') +
        en(1040, (PARTE_Y(0) + PARTE_Y(PARTES.length - 1)) / 2, `<div style="transform:translateY(-50%)">${consejo('Descripción clara: con ella decide el agente')}</div>`, { paso: 3, orden: 2, efecto: 'entrarConMuelle' });
      marcar(raiz.querySelectorAll('.abanico__flecha'), 3, { orden: 1, efecto: 'trazar' });
      // Lo que va corrida la fila hasta que llega la tarea: la mitad de la tarea y de su hueco.
      fila = raiz.querySelector('[data-fila]');
      const k = raiz.getBoundingClientRect().width / 1920;
      corrimiento = (raiz.querySelector('[data-tarea]').getBoundingClientRect().width / k + px('--esp-6')) / 2;
      pasos = crearPasos(raiz);
      pasos.poner(0);
      gsap.set(fila, { x: corrimiento });
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(paso);
        cifra().textContent = miles(CONTENIDO);
        gsap.set(fila, { x: paso >= 2 ? 0 : corrimiento });
        return;
      }
      if (paso !== 2) return void pasos.animar(paso, tl);
      // Encadenados: la skill y cómo se activa se corren a la izquierda, la tarea llega a su
      // derecha y el contenido de la skill cae en la ventana, donde se convierte en capa mientras
      // sube su contador.
      const doc = raiz.querySelector('.documento').parentElement;
      const contenido = raiz.querySelector('[data-contenido]');
      const contador = cifra().closest('.contador');
      cifra().textContent = '0';
      encadenar(tl, [
        gsap.timeline().to(fila, { x: 0, duration: s('--dur-desplazar'), ease: v('--ease-desplazar') }),
        pasos.animar(2, gsap.timeline()),
        gsap.timeline().set(doc, { autoAlpha: 1 })
          .entrarEnVentana(doc)
          .desaparecer(doc)
          .set(contenido, { autoAlpha: 1 }, '<')
          .llenarVentana(contenido, {}, '<')
          .aparecer(contador, {}, '<')
          .subirContador(cifra(), { desde: 0, hasta: CONTENIDO }, '<'),
      ]);
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
