// Vista de ponente: la abre la presentación con la tecla P (index.html?ponente).
// Muestra la escena (su mensaje y, debajo, su texto del guion, para saber qué decir), lo que se
// ve en el paso actual y, en una línea, lo que viene después; el progreso y un cronómetro. Desde
// ella también se avanza (botones o teclado). Las acotaciones técnicas de escenas.md no se ven.
// El cronómetro empieza con el primer avance y se guarda en sessionStorage: sobrevive
// si esta ventana se recarga.
import { icono } from '../design/iconos.js';
import { MARCA, LATIDO_MS, DESTINO, esNuestro } from './enlace.js';
import { enLinea, sinTecnica, primeraFrase } from './texto.js';

const CRONOMETRO = 'devin-cronometro';
const minutos = n => `${String(Math.round(n * 10) / 10).replace('.', ',')}\u00a0min`;

// ── Cronómetro ──────────────────────────────────────────────────────────────

const leer = () => { try { return JSON.parse(sessionStorage.getItem(CRONOMETRO)); } catch { return null; } };
const guardar = c => { try { sessionStorage.setItem(CRONOMETRO, JSON.stringify(c)); } catch { /* sin almacenamiento: solo en memoria */ } };
let crono = leer() ?? { inicio: null, pausa: null };
const transcurrido = () => (crono.inicio == null ? 0 : (crono.pausa ?? Date.now()) - crono.inicio);
const reloj = ms => {
  const t = Math.floor(ms / 1000), h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), seg = t % 60;
  return `${h ? `${h}:${String(m).padStart(2, '0')}` : m}:${String(seg).padStart(2, '0')}`;
};

export function iniciarPonente() {
  document.body.className = 'ponente';
  document.title = 'Ponente · Devin en el día a día';
  document.body.innerHTML = `
    <header class="ponente__barra">
      <p class="ponente__conexion" data-conexion role="status"></p>
      <div class="ponente__crono">
        <span class="ponente__tiempo" data-tiempo role="timer" aria-label="Tiempo transcurrido">0:00</span>
        <button class="ponente__boton" data-accion="pausar"></button>
        <button class="ponente__boton" data-accion="reiniciar">Reiniciar</button>
      </div>
    </header>
    <main class="ponente__cuerpo">
      <div class="ponente__columna">
        <section class="ponente__escena" aria-label="Escena actual">
          <p class="ponente__lugar" data-lugar></p>
          <h1 class="ponente__titulo" data-titulo></h1>
          <p class="ponente__mensaje" data-mensaje></p>
          <div class="ponente__guion" data-guion></div>
        </section>
        <section class="ponente__progreso" aria-label="Progreso">
          <p data-progreso></p>
          <div class="ponente__barra-progreso"><span data-barra style="width:0"></span></div>
        </section>
      </div>
      <div class="ponente__columna">
        <section class="ponente__paso" aria-label="Paso actual">
          <h2 class="ponente__rotulo" data-rotulo-actual></h2>
          <div class="ponente__texto" data-actual></div>
        </section>
        <section class="ponente__paso ponente__paso--siguiente" aria-label="Paso siguiente">
          <h2 class="ponente__rotulo" data-rotulo-siguiente>Siguiente</h2>
          <p class="ponente__texto" data-siguiente></p>
        </section>
      </div>
    </main>
    <nav class="ponente__mandos" aria-label="Mandos">
      <button class="ponente__boton" data-accion="retroceder">${icono('arrow-left', 'icono--s')}Anterior</button>
      <button class="ponente__boton ponente__boton--principal" data-accion="avanzar">Siguiente${icono('arrow-right', 'icono--s')}</button>
      <button class="ponente__boton" data-accion="general" aria-keyshortcuts="O">Vista general (O)</button>
      <button class="ponente__boton" data-accion="avanzados" aria-keyshortcuts="A">Pasos avanzados (A)</button>
      <button class="ponente__boton" data-accion="final" aria-keyshortcuts="End">Ir a las preguntas (Fin)</button>
    </nav>`;
  const $ = q => document.querySelector(q);
  const principal = window.opener;
  let ultimo = 0, estado = null, pintado = '', conexion = '';
  // Solo se toca el DOM si el texto cambia: el latido llega cada segundo y no debe repintar
  // ni hacer hablar al lector de pantalla.
  const poner = (q, html) => { const el = $(q); if (el.innerHTML !== html) el.innerHTML = html; };

  const enviar = tipo => {
    if (principal && !principal.closed) principal.postMessage({ marca: MARCA, tipo }, DESTINO);
  };

  const pintarCrono = () => {
    poner('[data-tiempo]', reloj(transcurrido()));
    poner('[data-accion="pausar"]', crono.inicio == null ? 'Iniciar' : crono.pausa ? 'Reanudar' : 'Pausar');
  };
  const empezarSiNoHaEmpezado = () => {
    if (crono.inicio == null) { crono = { inicio: Date.now(), pausa: null }; guardar(crono); }
  };

  const pintarConexion = () => {
    const conectada = Date.now() - ultimo < LATIDO_MS * 2.5;
    const ahora = !principal ? 'sin' : conectada ? 'si' : 'no';
    if (ahora === conexion) return;
    conexion = ahora;
    $('[data-conexion]').innerHTML = !principal
      ? `${icono('info', 'icono--s')}Abre esta vista desde la presentación con la tecla P.`
      : conectada ? `${icono('check', 'icono--s')}Conectada con la presentación`
        : `${icono('triangle-alert', 'icono--s')}Sin conexión: pulsa P en la presentación`;
    document.body.classList.toggle('ponente--desconectada', !conectada);
  };

  const pintar = () => {
    const { escena: e, paso, siguiente, progreso, general, haciaGeneral, conAvanzados, minutos: m } = estado;
    $('[data-lugar]').textContent = `${e.bloque} · ${e.id}${e.minutos != null ? ` · ~${minutos(e.minutos)}` : ''}`;
    $('[data-titulo]').innerHTML = enLinea(e.titulo);
    $('[data-mensaje]').innerHTML = enLinea(e.mensaje);
    // El guion de la escena: sus párrafos, subapartados y puntos, tal como están en Guion Devin.md.
    const notas = e.notas ?? [];
    const lista = items => `<ul>${items.map(t => `<li>${enLinea(t.slice(2))}</li>`).join('')}</ul>`;
    let guion = '', puntos = [];
    for (const t of notas) {
      if (t.startsWith('- ')) { puntos.push(t); continue; }
      if (puntos.length) { guion += lista(puntos); puntos = []; }
      guion += t.startsWith('### ') ? `<h3>${enLinea(t.slice(4))}</h3>` : `<p>${enLinea(t)}</p>`;
    }
    if (puntos.length) guion += lista(puntos);
    poner('[data-guion]', notas.length ? `<h2 class="ponente__rotulo">Guion${e.guion ? ` · ${enLinea(e.guion)}` : ''}</h2>${guion}` : '');
    $('[data-rotulo-actual]').textContent = `Ahora · paso ${paso.n} de ${paso.total}${paso.avanzado ? ' · avanzado' : ''}${general ? ' · en la vista general' : ''}`;
    // Lo que se ve en el paso, sin las acotaciones técnicas; del siguiente, solo su primera frase.
    const texto = p => `<p>${enLinea(sinTecnica(p.texto))}</p>${p.detalle?.length ? `<ul>${p.detalle.map(d => `<li>${enLinea(sinTecnica(d))}</li>`).join('')}</ul>` : ''}`;
    $('[data-actual]').innerHTML = texto(paso);
    // Al final de un bloque, la próxima pulsación lleva a la vista general; la de después, a lo que se anuncia.
    $('[data-rotulo-siguiente]').textContent = siguiente
      ? `Siguiente · ${haciaGeneral ? 'vista general y, después, ' : ''}${siguiente.escena === e.id ? `paso ${siguiente.n}` : `${siguiente.escena} · ${siguiente.titulo}, paso ${siguiente.n}`}${siguiente.avanzado ? ' · avanzado' : ''}`
      : 'Siguiente · fin de la presentación';
    $('[data-siguiente]').innerHTML = siguiente ? enLinea(primeraFrase(siguiente.texto)) : '';
    $('[data-progreso]').textContent = `Paso ${progreso.n} de ${progreso.total} · previsto hasta el final de esta escena: ~${minutos(m.hastaAqui)} de ~${minutos(m.total)}`;
    $('[data-barra]').style.width = `${(progreso.n / progreso.total) * 100}%`;
    $('[data-accion="general"]').textContent = general ? 'Volver al paso (O)' : 'Vista general (O)';
    $('[data-accion="avanzados"]').textContent = conAvanzados ? 'Pasos avanzados: se muestran (A)' : 'Pasos avanzados: se saltan (A)';
  };

  addEventListener('message', ev => {
    if (!esNuestro(ev) || ev.source !== principal || ev.data.tipo !== 'estado') return;
    const anterior = estado?.paso.ref;
    estado = ev.data.estado;
    ultimo = Date.now();
    if (anterior && anterior !== estado.paso.ref) empezarSiNoHaEmpezado();
    const huella = JSON.stringify(estado);
    if (huella !== pintado) { pintado = huella; pintar(); }
    pintarConexion();
  });

  const acciones = {
    avanzar: () => { empezarSiNoHaEmpezado(); enviar('avanzar'); },
    retroceder: () => enviar('retroceder'),
    general: () => enviar('general'),
    avanzados: () => enviar('avanzados'),
    final: () => enviar('final'),
    pausar: () => {
      const ahora = Date.now();
      if (crono.inicio == null) crono = { inicio: ahora, pausa: null };
      else if (crono.pausa) crono = { inicio: crono.inicio + ahora - crono.pausa, pausa: null };
      else crono = { ...crono, pausa: ahora };
      guardar(crono);
      pintarCrono();
    },
    reiniciar: () => {
      crono = { inicio: null, pausa: null };
      guardar(crono);
      pintarCrono();
    },
  };
  document.addEventListener('click', ev => {
    const boton = ev.target.closest('[data-accion]');
    if (boton) acciones[boton.dataset.accion]();
  });
  // El mando de presentación envía sus teclas a la ventana que tenga el foco: esta también avanza.
  addEventListener('keydown', ev => {
    if (ev.metaKey || ev.ctrlKey || ev.altKey || ev.repeat) return;
    if ((ev.key === ' ' || ev.key === 'Enter') && ev.target.closest('button')) return;
    const accion = {
      ArrowRight: 'avanzar', ' ': 'avanzar', PageDown: 'avanzar', ArrowLeft: 'retroceder', PageUp: 'retroceder',
      o: 'general', O: 'general', a: 'avanzados', A: 'avanzados', End: 'final',
    }[ev.key];
    if (!accion) return;
    ev.preventDefault();
    acciones[accion]();
  });

  enviar('hola');
  setInterval(() => { enviar('hola'); pintarConexion(); }, LATIDO_MS);
  setInterval(pintarCrono, 250);
  pintarCrono();
  pintarConexion();
}
