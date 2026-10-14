# Construye el gran mapa con Claude Code

Desarrolla la presentación en **Claude Code** (mejor en la app de escritorio y con Opus 5.5). Claude Design te sirve, como mucho, para explorar el lenguaje visual del mapa antes de construirlo. Claude Code trabaja sobre tus archivos locales (el guion en Markdown, git, las librerías que elijas), arranca un servidor y comprueba visualmente lo que construye en su panel de navegador. Claude Design, en cambio, es ya una plantilla de artefacto dentro de Claude, y su web independiente claude.ai/design **cierra el 14 de diciembre de 2026**, así que no conviene empezar ahí ningún proyecto ([Claude Help Center](https://support.claude.com/en/articles/14604416)).

La gente que hace motion graphics con Opus 5.5 (lanzado el 22 de septiembre de 2026) sigue el patrón "código, no píxeles". Claude escribe HTML/CSS/JS (casi siempre con **GSAP**), React (Remotion) o Python (Manim), y un navegador sin interfaz renderiza o captura fotogramas para revisarlos. En tu caso no hace falta renderizar vídeo. El stack recomendado tiene cuatro piezas:

- un "mundo" HTML/SVG con una cámara propia animada con GSAP, que es gratis también para uso comercial e incluye todos sus plugins;
- una línea de tiempo pausada por zona, que se reproduce cuando llega la cámara;
- las skills oficiales `frontend-design` y `gsap-skills`;
- Playwright MCP o Chrome DevTools MCP, para que Claude vea lo que construye.

Todo ese núcleo cuesta **0 €** aparte de la suscripción a Claude (Pro a 20 $/mes o Max 5x a 100 $/mes, más el 21 % de IVA en España). La evidencia tiene dos límites. No hay ningún ejemplo publicado de una presentación tipo Prezi hecha con Claude, así que la cámara es trabajo a medida (o puedes partir de impress.js). Y que Opus 5.5 sea mejor que otros modelos en motion graphics solo está respaldado por anécdotas.

## Claude Code construye; Claude Design solo sirve para decidir el aspecto

### Claude Design ha cambiado tres veces de forma en seis meses

Claude Design nació el **17 de abril de 2026** como research preview de Anthropic Labs, con Opus 4.7, para prototipos, slides y one-pagers ([Anthropic](https://www.anthropic.com/news/claude-design-anthropic-labs)). En octubre de 2026 el centro de ayuda oficial ya lo describe como "una plantilla de artefacto con edición en el lienzo". Se abre de varias formas: desde una conversación (Output > Design), desde la pestaña Artifacts, desde Claude Code con `/design` y desde las apps móviles. Exporta a .zip, PDF, PPTX, Google Slides y **HTML independiente**, y se integra con Netlify, Vercel, Canva, Hyperframes y otros. Lo incluyen los planes Free, Pro, Max, Team y Enterprise. Además, **consume del mismo cupo de uso que el chat y Claude Code**; antes tenía un cupo semanal propio, que ya no existe ([Claude Help Center](https://support.claude.com/en/articles/14604416)). Una fuente secundaria dice que Docs, Slides y Design salieron de beta el 8 de octubre ([AI Catchup](https://aicatchup.com/news/claude-dashboards-motion-beta)), aunque en varios sitios todavía aparece como preview.

### Por qué gana Claude Code en tu caso

Claude Design genera código HTML/CSS/JS y se usa para animaciones y explicadores ([AI Blew My Mind](https://aiblewmymind.substack.com/p/claude-design-animations)). Sin embargo, **ninguna fuente documenta una presentación con cámara tipo Prezi hecha en Claude Design**, ni confirma que admita GSAP. Las reseñas también señalan problemas:

- **Fallos de preview y "estilo de la casa".** Hay comentarios que desaparecen, un estilo reconocible y una deriva respecto al sistema de diseño real ([eesel](https://www.eesel.ai/blog/claude-design-review-2026)).
- **Decks largos inconsistentes.** Pasadas las 20 diapositivas se vuelven incoherentes si el prompt no es muy estructurado ([MindStudio](https://www.mindstudio.ai/blog/claude-design-animated-prototypes-slide-decks), blog de un proveedor).
- **Bloqueos con proyectos grandes.** Un creador tuvo que pasarse a Claude Code porque un render grande colgó Claude Design ([daily.dev](https://daily.dev/posts/claude-opus-5-5-generates-motion-design-and-visual-scenes-entirely-in-code-yqmdx7qnw), fuente secundaria).

Claude Code, en cambio, trabaja con tus ficheros, guarda historial en git, instala librerías y, en la app de escritorio, **arranca un servidor de desarrollo y lo abre en su panel de navegador para verificar los cambios**. Ahí hace capturas, inspecciona el DOM, hace clic y corrige lo que encuentra, con `autoVerify` activado por defecto ([Claude Code docs](https://code.claude.com/docs/en/desktop)). El propio diseñador que creó Claude Design lo resume así: "Claude Code es para programar; Claude Design es para el resto del trabajo de diseño" ([Claude blog](https://claude.com/blog/how-the-product-designer-who-built-claude-design-uses-it-to-explore-ideas-before-building-them)). Tu proyecto tiene una zona por sección del guion, un motor de cámara y muchas iteraciones de timing. Eso es, ante todo, software.

### La opción híbrida y sus requisitos

Claude Design tiene ventajas reales. Las ediciones directas en el lienzo **no consumen tokens** ([Claude blog](https://claude.com/blog/how-the-product-designer-who-built-claude-design-uses-it-to-explore-ideas-before-building-them)), y ofrece sliders creados por Claude para ajustar espaciado y color, comentarios en línea y variantes rápidas. Por eso es útil para decidir la paleta, la tipografía, el aspecto del mapa completo y una o dos zonas de muestra, y para enseñárselas a compañeros antes de construir.

El híbrido recomendado funciona así:

1. Explora dos o tres direcciones con `/design` dentro de Claude Code, o con Output > Design en el chat. **Nunca en claude.ai/design.**
2. Lleva el resultado al proyecto local con "Handoff to Claude Code" o con `/design-sync`, que sincroniza el sistema de diseño en los dos sentidos ([Claude Help Center](https://support.claude.com/en/articles/14604416); [pasqualepillitteri.it](https://pasqualepillitteri.it/en/news/5308/claude-code-claude-design-two-way-sync-design-sync)).

Antes de contar con ello, comprueba cómo accede tu empresa a Claude. `/design` necesita sesión de claude.ai, y no funciona con claves de API, ni en Bedrock/Vertex/Foundry, ni en organizaciones con CMEK/HIPAA/ZDR ([blakecrosley.com](https://blakecrosley.com/blog/claude-code-design-skill); [Serverworks](https://blog.serverworks.co.jp/claude-design-sync)).

### Otras superficies de Anthropic y lo que cuesta usarlas

| Superficie | Qué te aporta en este proyecto | Disponibilidad y precio | Veredicto |
|---|---|---|---|
| **Claude Code (app de escritorio)** | Construcción completa, git, servidor local, panel de navegador con verificación automática ([docs](https://code.claude.com/docs/en/desktop)) | Incluido en Pro, Max, Team y Enterprise ([pricing](https://claude.com/pricing)) | **Herramienta principal** |
| **Claude Design** (`/design`, Output > Design) | Explorar el lenguaje visual; ediciones en lienzo sin tokens | Free a Enterprise; cupo compartido. La web independiente cierra el 14-12-2026 ([Help Center](https://support.claude.com/en/articles/14604416)) | Opcional, solo para explorar |
| **Claude Motion** (`/motion`) | Explicadores animados escritos en código, exportados a MP4; "no usa un modelo de generación de vídeo" ([Anthropic](https://claude.com/resources/articles/dashboards-and-motion)) | Beta desde el 8-10-2026, **solo Team y Enterprise** | Útil para clips incrustados o un vídeo de respaldo |
| **Claude Slides** | Decks convencionales con exportación a PowerPoint/PDF ([eesel](https://www.eesel.ai/blog/claude-slides)) | Planes de pago, beta desde el 16-9-2026 | No sirve: pierde la cámara |
| **Artifacts** | Publicar el HTML final para compartirlo | Web y escritorio ([Help Center](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)) | Posible; no hay límites de tamaño documentados |

En dinero, la página oficial da estos precios en USD: Pro **20 $/mes** (17 $ en anual), Max 5x **desde 100 $/mes**, Team estándar 25 $/asiento y Team premium 125 $/asiento ([Claude pricing](https://claude.com/pricing)). Max 20x cuesta **200 $/mes** según guías de agosto y septiembre, cifra **[no verificada en la página oficial]** ([geotoolbox.ai](https://geotoolbox.ai/es/blog/precio-claude)). En España se añade un **21 % de IVA**.

Anthropic afirma que Opus 5.5 es un **~40 % más barato que Opus 5** en cargas típicas, así que el cupo da más de sí ([Claude webinar](https://claude.com/de/resources/webinars/opus-5-5-for-work)). Aun así, una construcción intensa con muchas iteraciones de animación puede agotar el plan Pro. Mi estimación es que Max 5x es la opción segura, y si tu empresa tiene asientos Team, comprueba si el tuyo es estándar o premium.

## Un mundo HTML con cámara GSAP da la máxima libertad creativa

### Ningún producto hecho combina cámara, presentador y licencia libre

**No existe ninguna herramienta lista para usar que combine una cámara libre tipo Prezi, herramientas de presentador y una licencia permisiva y gratuita.** Estas son las opciones más cercanas:

- **impress.js** es la única librería MIT y basada en código que se mantiene en torno a una cámara. Coloca cada paso con `data-x/y/z/scale/rotate`, revela elementos por pasos con `substep`, abre una consola de ponente con la tecla P y emite eventos `impress:stepenter`/`stepleave` en los que puedes enganchar animaciones GSAP. Pero su última versión, v2.0.0, es de **2022**, y en npm sigue en la **1.1.0** ([GitHub impress.js](https://github.com/impress/impress.js); [documentación](https://github.com/impress/impress.js/blob/master/DOCUMENTATION.md)).
- **reveal.js y Slidev** tienen la mejor vista de ponente, pero son decks lineales sin cámara. El plugin "zoom" de reveal.js es una lupa ([plugin zoom](https://github.com/hakimel/reveal.js/blob/master/plugin/zoom/plugin.js)).
- **tldraw** tiene una API de cámara excelente, pero su licencia exige clave para cualquier uso en "producción", y el uso interno en una empresa cuenta como comercial ([tldraw LICENSE](https://github.com/tldraw/tldraw/blob/main/LICENSE.md); [appdevelopermagazine](https://appdevelopermagazine.com/tldraw-sdk-4.0-release-new-starter-kits-and-licensing-model/)).

La vía con más libertad es construir la cámara a medida. Un contenedor `#world` contiene todas las zonas, posicionadas en absoluto. Un array `steps[]` define, para cada paso, la zona destino, el margen de cámara y sus animaciones de entrada y salida. Una pequeña máquina de estados hace que "avanzar" reproduzca primero los subpasos de la zona actual y solo después vuele a la siguiente.

El encuadre es geometría estándar. Con `transform-origin: 0 0`, la escala es `s = min(W/(w+2p), H/(h+2p))` y la traslación es `tx = W/2 − s·(x + w/2)`, `ty = H/2 − s·(y + h/2)`. Esto no viene de una fuente concreta; es el mismo cálculo que hacen `zoomToBounds` en tldraw o `fitBounds` en React Flow.

Para la sensación Prezi de "alejarse, viajar, acercarse", usa **`d3.interpolateZoom`**. Implementa el algoritmo de van Wijk y Nuij, ajusta la curvatura con `rho` y sugiere una duración según la longitud del recorrido ([d3js.org](https://d3js.org/d3-interpolate/zoom)). GSAP solo tiene que mover el parámetro t de 0 a 1.

Cada zona tiene una **línea de tiempo GSAP pausada**, guardada en un registro central, que se reproduce al llegar la cámara. Es el mismo patrón que usa HyperFrames, con timelines pausadas registradas en `window.__timelines` ([GitHub HyperFrames](https://github.com/heygen-com/hyperframes)). A eso se suman varias piezas de robustez para el directo, que propongo yo y que no salen de una fuente única:

- `location.hash` para retomar la presentación en el mismo paso tras una recarga;
- teclas para mando de presentación (flechas, AvPág/RePág, espacio);
- una ventana de ponente sincronizada con `BroadcastChannel`;
- un modo `?static` que corta en lugar de volar;
- un modo `?print` para generar el PDF.

La alternativa de menor riesgo es impress.js v2, cargado desde GitHub o jsDelivr y no desde npm, con GSAP enganchado a `impress:stepenter`. El propio README de impress.js lo orienta a presentar "desde tu portátil", así que pruébalo en el navegador exacto que usarás.

### Texto borroso y mareo son los dos fallos clásicos del zoom

**El texto borroso aparece al rasterizar una capa a una escala y después escalarla.** Chrome vuelve a rasterizar cuando cambia la escala, salvo que la capa tenga `will-change: transform`. Si quitas `will-change` al llegar a la zona, fuerzas un re-rasterizado nítido ([Chrome for Developers](https://developer.chrome.com/blog/re-rastering-composite)). Ese artículo es de 2016 y no he encontrado confirmación actual, así que pruébalo. En la práctica:

- diseña cada zona de forma que la cámara repose a **escala ≈ 1**, como hace impress.js con su escala inversa;
- activa `will-change` solo durante el vuelo;
- redondea las traslaciones a píxeles enteros.

Si usas CSS3D de three.js, el truco es usar una fuente diez veces más grande en un objeto reducido ([three.js forum](https://discourse.threejs.org/t/blurry-text-on-css3d/53966)).

**El mareo es real.** Los zooms grandes desencadenan reacciones vestibulares, y WCAG 2.3.3 recomienda poder desactivar la animación con `prefers-reduced-motion` (técnica C39) ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)). En una sala con proyector, la configuración del sistema de cada asistente no se aplica, así que añade un interruptor manual de "modo estático". Mantén además vuelos cortos (0,8-1,5 s), con ease-in-out y `rho` bajo; estas cifras son una recomendación mía, no un estándar.

Para presentar sin conexión, sirve la carpeta con un servidor local en lugar de abrir el HTML con doble clic, porque Lottie falla al cargar JSON vía `file://` ([foro de Ghost](https://forum.ghost.org/t/help-in-using-lottie-with-ghost/7992)). Integra también las fuentes en el propio proyecto.

### Stack recomendado

| Capa | Elección principal | Alternativa | Coste |
|---|---|---|---|
| Entorno | Claude Code (escritorio) + Opus 5.5 | Claude Design solo para explorar el aspecto | Suscripción a Claude |
| Cámara | `#world` a medida + GSAP + `d3.interpolateZoom` | impress.js v2 + GSAP | Gratis |
| Animación por zona | GSAP (Timeline, SplitText, DrawSVG, MorphSVG, MotionPath, Flip) + CSS/WAAPI | Motion (MIT) o anime.js v4 | Gratis ([GSAP](https://gsap.com/standard-license/)) |
| Estilo dibujado o diagramas | SVG propio + Rough.js / D3 | Mermaid, Excalidraw | Gratis |
| Fondos y ambiente | Paper Shaders (Apache-2.0) | Three.js / PixiJS con poco gasto de GPU | Gratis |
| Iconos y microanimaciones | Lucide/Phosphor/Tabler vía Iconify; useAnimations (MIT) | dotLottie, Rive runtime | Gratis |
| Skills | `frontend-design` + `gsap-skills` | Motion AI Kit si usas React | Gratis |
| Verificación visual | Playwright MCP (capturas y vídeo) | Chrome DevTools MCP, Claude in Chrome | Gratis |
| Documentación | Context7 (Free: 1.000 llamadas/mes) | Skills oficiales | Gratis o 10 $/asiento/mes |
| Vídeo de respaldo (opcional) | HyperFrames, render local | Grabación de pantalla; Claude Motion | Gratis |
| Alojamiento | GitHub Pages o Cloudflare Pages + servidor local en el directo | Netlify | Gratis |

### Cómo traducir el guion a zonas del mapa

La regla de los practicantes que mejor encaja con un mapa es que **"cada escena debe nacer de un objeto que ya está en pantalla"**. La otra regla clave es **"no inventes cifras"** ([aiidelist](https://aiidelist.com/blog/opus-5-5-motion-design)). Tu guion ya usa tarifas ficticias en el ejemplo numérico de la sección 4.5. Etiquétalas así en pantalla, y cualquier dato real de Devin (ventana de contexto, ACUs, carga de rules y skills) debe salir de la documentación de Devin. Las investigaciones no cubren esa documentación. Las cifras de Claude Code que circulan (200K de ventana, 30-40K consumidos antes de escribir nada) son de segunda mano y se refieren a Claude Code, no a Devin ([morphllm](https://morphllm.com/claude-code-context-window)).

La tabla siguiente es una **propuesta propia**: no existe ningún ejemplo publicado que anime ventanas de contexto, caché o subagentes.

| Sección del guion | Zona del mapa | Idea de motion graphic | Herramientas |
|---|---|---|---|
| Apertura | Vista general | Zoom-out total; los caminos entre zonas se dibujan solos | DrawSVG, `interpolateZoom` |
| 1. Cloud, Desktop, CLI | Tres "islas" | Una tarea viaja de la terminal al IDE y luego a la nube; dos preguntas: "desde dónde interactúo" y "dónde se ejecuta" | Flip, MotionPath |
| 2. Agente, modelo, modo, effort, contexto | Panel de control | Dial de effort (Low→Max) que alarga una estela de "pensamiento" y un contador de coste; barra de contexto vacía | GSAP, SVG |
| 3. Modelos | Vitrina de modelos | Tarjetas que se reordenan según el criterio elegido (coste, capacidad) | Flip |
| 4. Tokens y caché | Bandeja de tokens | Una frase se parte en fichas (SplitText) que caen en la barra de contexto; la misma barra se duplica en dos filas, caché fallida y caché acertada, con contador de coste usando las tarifas ficticias del guion; compactación al final | SplitText, CSS keyframes |
| 5. Rules, AGENTS.md, skills, subagentes | Taller | AGENTS.md anclado siempre al fondo de la barra; skills como cartas de las que solo se ve la descripción hasta invocarlas; el agente principal lanza subagentes con barra propia y solo vuelve una ficha de "resumen" | MotionPath, D3 |
| 6. Cómo trabajar | Circuito | Bucle "definir, planificar, ejecutar, intervenir, verificar" recorrido por un punto | DrawSVG |
| 7. Caso práctico | Ruta por el mapa | La cámara vuelve a recorrer las zonas anteriores en el orden de las decisiones | `steps[]` reutilizados |
| Cierre | Vista general | Zoom-out final con todo iluminado | GSAP |

### El flujo de trabajo que recomiendan los practicantes

El flujo que más se repite tiene cinco pasos ([aiidelist](https://aiidelist.com/blog/opus-5-5-motion-design); [Charlie Hills](https://charliehills.substack.com/p/claude-code-motion-graphics)):

1. Define el objetivo de comunicación de cada escena, no los efectos.
2. Escribe un storyboard con tiempos antes de tocar código.
3. Fija un único sistema de diseño en un `design.md` o `CLAUDE.md` (paleta, tipografía, color de acento, curvas de easing y duraciones).
4. Construye primero el motor de cámara y después las zonas, una por una, con un commit de git por zona.
5. Revisa con "hojas de contacto": capturas de cada paso y de mitad de cada transición, que una pasada crítica separada ordena por prioridad (P0/P1/P2).

Con Playwright MCP, Claude puede hacer esas capturas y además **grabar vídeo** (`browser_start_video`, requiere `--caps=devtools`) ([Playwright MCP](https://github.com/microsoft/playwright-mcp)). Aun así, el ritmo y el easing tiene que juzgarlos un humano mirando. Es una inferencia mía, pero la refuerza un dato: Claude in Chrome graba GIF y no puede analizarlos después ([claudeissues](https://claudeissues.com/issue/14805-feature-request-claude-in-chrome-analyze-recorded-gifs-video-for-dynamic-ui-test)).

Para los prompts, habla como un director de motion ([aiidelist](https://aiidelist.com/blog/opus-5-5-motion-design)):

- **Cámara:** ease-in-out para los movimientos de cámara.
- **Pausas:** 300-600 ms antes de cada revelado, y titulares visibles al menos 1,2 s.
- **Prohibiciones:** nada de partículas genéricas, brillos, destellos de lente ni giros 3D sin sentido.
- **Cifras:** "no inventes métricas".

La skill `frontend-design` de Anthropic va en la misma línea: "un único momento orquestado funciona mejor que efectos dispersos", y respetar el movimiento reducido forma parte del mínimo de calidad ([SKILL.md](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)). Si prefieres anime.js, pídelo por su nombre, porque Claude usa GSAP por defecto ([Capital & Compute](https://capitalandcompute.net/blog/claude-motion-graphics-tools/)).

## Opus 5.5 convirtió el motion graphics hecho con código en tendencia

### Un prompt de una línea encendió la ola de septiembre

Anthropic publicó Opus 5.5 el **22 de septiembre de 2026** ([Anthropic](https://www.anthropic.com/claude-opus-5-5)). Pocos días después se hizo viral un prompt de una sola línea, "make a dynamic 15-second motion graphics video that shows what an incredible motion designer you are", publicado por @stephanlivera. Según iArt superó los **dos millones de visualizaciones**, con siete cortes en 15 segundos sincronizados a una pista de 128 bpm que también escribió Claude. Es un dato de segunda mano: el post de X no pudo abrirse ([iArt.ai](https://www.iart.ai/blog/claude-motion-graphics)).

El 27 de septiembre Charlie Hills publicó su configuración: pegar el prompt en Claude Code y añadir dos packs de skills.

- **HyperFrames:** se instala con `npx skills add heygen-com/hyperframes`.
- **"motion-graphics-skills":** un pack gratuito de 13 carpetas que incluye un `vox-explainer`, el cual pide hechos y fuentes antes de dibujar. No encontré la URL del repositorio.

Hills cuenta que Opus 5.5 tomó sus colores de marca de la configuración que ya tenía en Claude Code ([Charlie Hills](https://charliehills.substack.com/p/claude-code-motion-graphics)). Un resumen de daily.dev recoge más ejemplos ([daily.dev](https://daily.dev/posts/claude-opus-5-5-generates-motion-design-and-visual-scenes-entirely-in-code-yqmdx7qnw), fuente secundaria):

- @mattshumer_: un cortometraje hecho íntegramente en código;
- @Hesamation: un explicador de punteros con Manim;
- @mattpocockuk: animatics con narración TTS para planificar clases;
- @felixrieseberg: rehízo su web con modelos de Blender.

Anthropic convirtió la idea en producto el 8 de octubre con Claude Motion ([Anthropic](https://claude.com/resources/articles/dashboards-and-motion)).

### Cuatro rutas técnicas dominan, y todas son código

Los practicantes usan cuatro rutas:

- **HTML + GSAP con HyperFrames.** Es de HeyGen, con licencia Apache-2.0 y 63.000 estrellas en GitHub. Trae 21 skills, entre ellas `slideshow`, `motion-graphics` y `faceless-explainer`, y está en el marketplace oficial de plugins ([GitHub](https://github.com/heygen-com/hyperframes)).
- **React con Remotion.** Tiene skills oficiales ([Remotion](https://www.remotion.dev/docs/ai/skills)).
- **Canvas o three.js fotograma a fotograma, más ffmpeg.** Por ejemplo, con el pack abierto `iart-ai/javascript-animation-skills` ([iArt.ai](https://www.iart.ai/blog/claude-motion-graphics)).
- **Manim.** Para explicadores técnicos y matemáticos.

El bucle de trabajo se repite: generar, previsualizar, inspeccionar, criticar, revisar y renderizar. El consejo es tratar a Opus 5.5 "como un motion designer más un desarrollador creativo, no como un modelo de vídeo de un clic" ([aiidelist](https://aiidelist.com/blog/opus-5-5-motion-design)). Para el audio, Claude escribe prompts para Suno y mide tempo y volumen para los cortes, pero el humano elige las tomas porque "Claude no oye" ([daily.dev](https://daily.dev/posts/claude-opus-5-5-generates-motion-design-and-visual-scenes-entirely-in-code-yqmdx7qnw)).

Las cifras de adopción confirman qué herramientas mandan, aunque los canales no son comparables entre sí:

| Herramienta | Indicador | Fuente |
|---|---|---|
| `frontend-design` | **1.134.112 instalaciones** como plugin de Claude Code | [claude.com/plugins](https://claude.com/plugins/frontend-design) |
| HyperFrames | 1,0 M instalaciones de su skill CLI en skills.sh; 2,65 M descargas npm al mes | [skills.sh](https://skills.sh/); [npm](https://api.npmjs.org/downloads/point/last-month/hyperframes) |
| Remotion | 615.000 instalaciones de su skill de buenas prácticas | [skills.sh](https://skills.sh/) |
| Playwright MCP | 319.887 instalaciones como plugin | [claude.com/plugins](https://claude.com/plugins/playwright) |

### La superioridad de Opus 5.5 es anecdótica

La página oficial de Opus 5.5 **no hace ninguna afirmación sobre diseño, animación o motion**. Solo cita a un probador anónimo que dice que el modelo puntuó mejor que ninguno "por la fuerza de sus gráficos y su pulido" en un test de juegos. Esa misma página fija el precio en **4 $/20 $ por millón de tokens** de entrada y salida, con **lectura de caché a 0,20 $** y escritura a 5 $, y ofrece cinco niveles de effort (Low a Max), con Medium por defecto ([Anthropic](https://www.anthropic.com/claude-opus-5-5)).

En las clasificaciones de diseño web de Design Arena, Opus 5.5 aparecía **tercero** el 7 de octubre, por detrás de Muse Spark 1.3 y Kimi K3, según un artículo de Towards AI que solo pude leer como snippet ([Towards AI](https://pub.towardsai.net/which-ai-model-is-best-for-web-design-5-picks-for-2026-6b7b5abfb937)). Hay también voces escépticas. @wesbos opina que los resultados "no son especialmente buenos" y que lo notable es que se puedan hacer, porque el gusto y las bibliotecas de assets pesan más ([daily.dev](https://daily.dev/posts/claude-opus-5-5-generates-motion-design-and-visual-scenes-entirely-in-code-yqmdx7qnw)). Un análisis práctico admite que su resultado "necesitó una pasada de revisión, no salió de un solo prompt" ([No Code MBA](https://www.nocode.mba/articles/claude-opus-5-5-motion-graphics)). La afirmación de Charlie Hills de que Opus 5.5 con effort medio supera a "Astra" y "Fable" al máximo **no se ha podido verificar**. La ventana de 1M tokens de Opus 5.5 también está **sin verificar**, porque Anthropic no la menciona en esa página ([techjacksolutions](https://techjacksolutions.com/?p=89516)). Ninguna fuente pudo leerse directamente en X, Reddit o Hacker News.

## Catálogo: casi todo es gratis y lo que cuesta, cuesta poco

Leyenda de marcas:

| Marca | Significado |
|---|---|
| **[no verificado]** | Precio de fuentes de terceros, o página oficial bloqueada |
| **[conflicto]** | Las fuentes discrepan |
| **[desactualizado]** | Hay información antigua que circula y ya no es válida |

Precios en USD salvo indicación; versiones y fechas a 14 de octubre de 2026.

### Librerías de animación: GSAP es el motor por defecto y no cuesta nada

**Motores DOM/SVG (el núcleo de una presentación en directo)**

| Nombre | Para qué sirve | Precio / licencia | Notas |
|---|---|---|---|
| **GSAP 3.15** (SplitText, MorphSVG, DrawSVG, Flip, MotionPath, Observer, Draggable, ScrambleText, GSDevTools…) | Líneas de tiempo para DOM/SVG/canvas; cámara y animaciones de zona | **Gratis, también para uso comercial**; licencia propietaria "no charge" de Webflow, no open source | Todos los plugins son gratis desde la 3.13 (licencia vigente desde el 30-4-2025). Solo se prohíbe usarlo en constructores no-code que compitan con Webflow. "AI-generated code is not a Prohibited Use". 6 M descargas/semana ([licencia](https://gsap.com/standard-license/); [npm](https://www.npmjs.com/package/gsap)) |
| **Motion 14.2** (antes Framer Motion) | Animación para React, JS y Vue | MIT, gratis | **Motion+**: 399 $ pago único (Solo); Team anual por asiento sin precio publicado. Las cifras de "299 $ / 1.499 $" que salen en buscadores están **[desactualizadas]** ([motion.dev/plus](https://motion.dev/plus)) |
| **anime.js 4.5** | Alternativa ligera: timelines, morph SVG, draggable, envoltorio WAAPI | MIT | La API v4 cambió mucho; los LLM pueden escribir sintaxis v3 ([release v4](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)) |
| **CSS @keyframes / WAAPI / View Transitions** | Animación nativa del navegador | Estándar web, gratis | View Transitions dentro del mismo documento: Baseline desde el 14-10-2025. Animaciones ligadas al scroll y transiciones entre documentos: **sin Firefox** ([web-features](https://unpkg.com/web-features/data.json)) |

**Vectoriales, 2D, 3D y shaders**

| Nombre | Para qué sirve | Precio / licencia | Notas |
|---|---|---|---|
| **lottie-web 5.13** | Reproductor de animaciones Lottie JSON | MIT | Sin publicaciones desde mayo de 2025 ([npm](https://www.npmjs.com/package/lottie-web)) |
| **dotLottie web 0.81** | Reproductor Lottie moderno (WASM, `<dotlottie-wc>`) | MIT | Activo ([GitHub](https://github.com/LottieFiles/dotlottie-web)) |
| **Rive runtime 2.44** | Reproduce .riv interactivos con máquinas de estado | MIT | El editor es de pago (ver diseño) ([GitHub](https://github.com/rive-app/rive-wasm)) |
| **Three.js r186** / **React Three Fiber 9.8** / **drei 10.7** | 3D WebGL; CSS3DRenderer para meter HTML en 3D | MIT | Más riesgo: GPU, proyector, texto borroso en CSS3D ([three.js](https://github.com/mrdoob/three.js)) |
| **PixiJS 8.22** | 2D WebGL de alto rendimiento | MIT | Activo ([npm](https://www.npmjs.com/package/pixi.js)) |
| **Konva 10.8** | Canvas 2D con demo de lienzo infinito | MIT | Activo ([GitHub](https://github.com/konvajs/konva)) |
| **Two.js 0.8**, **SVG.js 3.2** | Dibujo 2D / manipulación de SVG | MIT | Activos ([Two.js](https://github.com/jonobr1/two.js); [SVG.js](https://github.com/svgdotjs/svg.js)) |
| **p5.js 2.3** | Arte generativo (lo usa la skill `algorithmic-art`) | **LGPL-2.1** | Obligaciones LGPL ([npm](https://www.npmjs.com/package/p5)) |
| **OGL 1.0** | WebGL mínimo | Unlicense (dominio público) | Poca actividad desde enero de 2025 ([GitHub](https://github.com/oframe/ogl)) |
| **Paper Shaders 0.0.81** | Fondos animados (mesh gradient, grano) sin dependencias | Apache-2.0, sin atribución visible | Versión 0.0.x con cambios incompatibles: **fija la versión** ([GitHub](https://github.com/paper-design/shaders)) |
| **Spline runtime 2.0** | Reproduce escenas 3D de Spline | **Sin licencia declarada** | Revisa los términos de Spline ([npm](https://www.npmjs.com/package/@splinetool/runtime)) |

**Diagramas y texto**

| Nombre | Para qué sirve | Precio / licencia | Notas |
|---|---|---|---|
| **D3 7.9** (+ d3-transition, d3-zoom) | Diagramas de datos, árboles, transiciones, zoom | ISC | `interpolateZoom` para vuelos tipo Prezi ([npm](https://www.npmjs.com/package/d3)) |
| **Mermaid 12.2** | Diagramas desde texto | MIT | Activo ([npm](https://www.npmjs.com/package/mermaid)) |
| **Excalidraw 0.18** | Pizarra con estilo dibujado a mano | MIT | Las presentaciones son de Excalidraw+ (de pago) ([GitHub](https://github.com/excalidraw/excalidraw)) |
| **Rough.js 4.6** | Estilo "boceto" para SVG/canvas | MIT | Congelado desde 2023, pero estable ([npm](https://www.npmjs.com/package/roughjs)) |
| **typed.js 3.0** | Efecto de máquina de escribir | **GPL-3.0 o licencia comercial de pago** (precio no publicado) | **Evítalo**. Que "es MIT" es **[desactualizado]** (eso era la v2). Sustitúyelo por TextPlugin o ScrambleText de GSAP ([release v3](https://github.com/mattboldt/typed.js/releases/tag/v3.0.0)) |
| **SplitType 0.3** | Dividir texto en letras o palabras | ISC | Sin publicaciones desde 2023; SplitText de GSAP ya es gratis ([npm](https://www.npmjs.com/package/split-type)) |

**Vídeo programático (solo si quieres MP4 o clips incrustados)**

| Nombre | Para qué sirve | Precio / licencia | Notas |
|---|---|---|---|
| **HyperFrames 0.8** (HeyGen) | HTML + GSAP a MP4 determinista (Chrome sin interfaz + FFmpeg) | **Apache-2.0, sin tarifas por render** | Admite GSAP, Lottie, Three.js, anime.js, WAAPI y CSS. Necesita Node 22+ y FFmpeg. El `index.html` se reproduce tal cual en el navegador ([GitHub](https://github.com/heygen-com/hyperframes)) |
| **Remotion 4.0** | React a vídeo; `@remotion/player` para incrustarlo en vivo | Source-available: **gratis para particulares y empresas de hasta 3 empleados**. Si no: Creators 25 $/asiento/mes, Automators 0,01 $/render (mínimo 100 $/mes), Enterprise desde 500 $/mes | En una empresa más grande necesitas licencia, también para código escrito por IA. La afirmación de PkgPulse ("BSL, pago por encima de 1 M$ de ARR") es **errónea** ([LICENSE](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md); [precios](https://www.remotion.pro/license)) |
| **Motion Canvas 3.17** | Animación en TypeScript con generadores; player como custom element | MIT | Última versión estable de febrero de 2025: estancado ([GitHub](https://github.com/motion-canvas/motion-canvas)) |
| **Revideo 0.11** | Fork de Motion Canvas con API de render | MIT | El repositorio se movió a `midrender/revideo` ([GitHub](https://github.com/midrender/revideo)) |
| **Manim CE 0.22** / **manim-web 0.38** | Explicadores técnicos (Python) / port a TypeScript en el navegador | MIT | manim-web aún no tiene paridad completa ([Manim](https://github.com/ManimCommunity/manim); [manim-web](https://www.npmjs.com/package/manim-web)) |

**Legado: evita usarlas como base nueva.** Son Popmotion (último npm en 2022), Velocity (2018), Theatre.js (inactivo desde 2024; Studio con licencia **AGPL-3.0**), Zdog, Vivus, Snap.svg y Paper.js, todas congeladas ([npm Popmotion](https://www.npmjs.com/package/popmotion); [npm Theatre Studio](https://www.npmjs.com/package/@theatre/studio)).

### Lienzos con zoom: impress.js es la única cámara lista, y está en mantenimiento

| Nombre | Para qué sirve | Precio / licencia | Notas (cámara, presentador, estado) |
|---|---|---|---|
| **Cámara a medida** (`#world` + GSAP) | Máxima libertad: easing, rutas, rotación, línea de tiempo por zona | Gratis | Tú construyes el modo presentador y el PDF. Ver arquitectura arriba |
| **d3-zoom / `d3.interpolateZoom`** | Vuelo suave "alejar, viajar, acercar" (van Wijk-Nuij) | ISC | Estable desde 2021 ([d3js.org](https://d3js.org/d3-interpolate/zoom)) |
| **impress.js v2.0** | Presentación con cámara 3D por pasos | MIT | Subpasos, consola de ponente (P), vista general, eventos `stepenter`. Último release en 2022; **npm atascado en 1.1.0** ([GitHub](https://github.com/impress/impress.js)) |
| **reveal.js 6.0** | Deck lineal con la mejor vista de ponente | MIT | Sin cámara. Auto-Animate. La vista de ponente requiere servidor local ([releases](https://github.com/hakimel/reveal.js/releases)). Slides.com: Lite 5 $/7 $, Pro 10 $/14 $, Team 20 $/28 $ al mes, anual/mensual ([pricing](https://slides.com/pricing)) |
| **Slidev v53** | Deck en Vue/Vite | MIT | Vista de ponente sincronizada, exporta PDF/PPTX por clic. Sin cámara y con paso de build ([GitHub](https://github.com/slidevjs/slidev)) |
| **Spectacle 10.2** | Deck en React | MIT | En mantenimiento: último release en octubre de 2025 ([GitHub](https://github.com/FormidableLabs/spectacle)) |
| **Marp CLI 4.5** | Deck desde Markdown con View Transitions | MIT | Sin cámara ([GitHub](https://github.com/marp-team/marp-cli)) |
| **Sozi 23.07** | Zoom sobre un único SVG, con consola | MPL-2.0 | Sin releases desde 2023 ([GitHub](https://github.com/sozi-projects/Sozi)) |
| **Strut** | Editor visual estilo impress.js, ahora app alojada en strut.io | **AGPL-3.0** | Reescrito en 2026 ([GitHub](https://github.com/tantaman/strut)) |
| **tldraw SDK 5.5** | Lienzo infinito con `zoomToBounds` animado y modo slideshow | **Licencia propia**: producción requiere clave; prueba de 100 días; precio comercial no público; licencia hobby gratis bajo solicitud | El uso interno en una empresa cuenta como comercial; puede enviar datos de uso ([LICENSE](https://github.com/tldraw/tldraw/blob/main/LICENSE.md); [pricing](https://tldraw.dev/pricing)) |
| **Excalidraw+ presentaciones** | Marcos de Excalidraw convertidos en diapositivas, con mando por QR | De pago, **precio no publicado**; prueba de 14 días | Sin notas del ponente documentadas ([Excalidraw+](https://plus.excalidraw.com/use-cases/presentations)) |
| **excalidraw-smart-presentation** | Fork que anima elementos compartidos entre marcos | MIT | 108★; sin soporte táctil ([GitHub](https://github.com/excalidraw-smart-presentation/excalidraw-smart-presentation.github.io)) |
| **CanvaSlide** | App de escritorio con lienzo infinito y cámara por marco; exporta HTML | MIT | Muy nueva (septiembre de 2026, 13★) ([GitHub](https://github.com/hwantage/CanvaSlide)) |
| **React Flow 12.12** | `fitView`/`setCenter` animados | MIT | Sin presentador ([API](https://reactflow.dev/api-reference/types/react-flow-instance)) |
| **@panzoom/panzoom 4.6** / **anvaka/panzoom 9.4** | Pan y zoom por transform CSS sobre cualquier DOM o SVG | MIT | Problemas con texto SVG (issue #593) ([timmywil](https://github.com/timmywil/panzoom); [anvaka](https://github.com/anvaka/panzoom)) |
| **pixi-viewport 6.0** | Cámara para PixiJS | MIT | Mantenimiento a la baja ([GitHub](https://github.com/pixijs-userland/pixi-viewport)) |
| **camera-controls 3.1** / drei `<CameraControls/>` | Transiciones de cámara 3D con `await` y `fitToBox` | MIT | Para una ruta 3D ([GitHub](https://github.com/yomotsu/camera-controls)) |
| **Prezi** | Referencia comercial | ~7-29 $/mes **[no verificado][conflicto]** | Sin página de precios oficial accesible ([CostBench](https://www.costbench.com/software/ai-presentations/prezi/)) |
| jmpress.js, MDX Deck, WebSlides | Antiguas herramientas de decks | MIT / sin licencia | **Abandonadas** ([jmpress](https://github.com/jmpressjs/jmpress.js); [mdx-deck](https://github.com/jxnblk/mdx-deck)) |

### MCP: los imprescindibles son los que dejan a Claude ver lo que construye

**Verificación visual y documentación**

| Nombre | Para qué sirve | Precio / licencia | Notas |
|---|---|---|---|
| **Playwright MCP** (Microsoft) | Capturas, **grabación de vídeo**, trazas, emulación de movimiento reducido | Gratis, Apache-2.0 | `claude mcp add playwright npx @playwright/mcp@latest`; el vídeo requiere `--caps=devtools`. El README sugiere CLI + skills para ahorrar tokens ([GitHub](https://github.com/microsoft/playwright-mcp)) |
| **Chrome DevTools MCP** (Google) | Capturas, trazas de rendimiento, throttling de CPU, `prefersReducedMotion`, screencast experimental | Gratis, Apache-2.0 | Envía estadísticas de uso por defecto (`--no-usage-statistics`) ([GitHub](https://github.com/ChromeDevTools/chrome-devtools-mcp)) |
| **Claude in Chrome** (Anthropic) | Controla tu Chrome; graba GIF de demos | Incluido; requiere plan directo de Anthropic | Beta; solo Chrome/Edge; no analiza los GIF que graba ([docs](https://code.claude.com/docs/en/chrome)) |
| **Context7** (Upstash) | Documentación actualizada de librerías | Free: 1.000 llamadas/mes; Pro **10 $/asiento/mes** | "60 peticiones/hora gratis y Pro a 7 $" está **[desactualizado]** ([plans](https://context7.com/plans)) |
| **Remotion Docs MCP** | Búsqueda en la documentación de Remotion | Gratis "por ahora" | Solo documentación; no renderiza ([docs](https://remotion.dev/docs/ai/mcp)) |
| **Motion AI Kit MCP** | Documentación de Motion, MotionScore (auditoría de rendimiento), springs CSS | Gratis lo básico; el resto requiere Motion+ (399 $) | ([AI Kit](https://motion.dev/docs/ai-kit)) |
| **HyperFrames by HeyGen (conector alojado)** | `compose` y `render_video` en la nube de HeyGen | Beta; requiere cuenta de HeyGen; **precio no publicado** | El render local es gratis ([conector](https://claude.com/connectors/hyperframes); [guía](https://hyperframes.heygen.com/guides/mcp)) |
| Puppeteer MCP de referencia | Control de navegador | — | **[desactualizado]**: archivado ([servers-archived](https://github.com/modelcontextprotocol/servers-archived)) |

**Diseño y aplicaciones creativas**

| Nombre | Para qué sirve | Precio / licencia | Notas |
|---|---|---|---|
| **Figma MCP** (oficial) | Contexto de diseño, tokens y componentes a código | MCP gratis; límites según asiento. View/Collab: 20 llamadas/mes. Dev/Full: 200/día (Pro/Org) o 600/día (Enterprise) | El límite antiguo de "6 llamadas/mes" está **[desactualizado]** ([rate limits](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/)) |
| Framelink Figma MCP / TalkToFigma | Leer (y escribir) en Figma | Gratis | Comunidad ([Framelink](https://github.com/GLips/Figma-Context-MCP); [TalkToFigma](https://github.com/grab/cursor-talk-to-figma-mcp)) |
| **Canva MCP** (oficial) | Crear y editar diseños de Canva | **[conflicto]**: cualquier plan según Canva, o solo planes de pago según terceros; los conectores requieren Claude de pago | No produce animación HTML ([Growth Method](https://growthmethod.com/canva-mcp-server/)) |
| **Paper MCP** | Leer y escribir archivos de Paper desde Claude Code | Free: 100 llamadas/semana; Pro **16 $/editor/mes** (anual) | El puente diseño ↔ Claude Code más maduro encontrado ([docs](https://paper.design/docs/mcp); [pricing](https://paper.design/pricing)) |
| **LottieFiles MCP** (Creator + alojado) | El agente crea capas y tiempos en Lottie Creator; gestiona assets | **Precio no verificado** | Creator MCP desde abril de 2026 ([blog](https://lottiefiles.com/blog/working-with-lottie-animations/your-ai-can-now-control-lottie-creator-heres-what-that-actually-means)) |
| **Rive MCP** (oficial) | Claude edita el archivo abierto en el editor de Rive | **Precio no verificado** | Early Access, primero en Mac, "aún no para producción" ([docs](https://rive.app/docs/editor/ai/mcp)) |
| **Excalidraw MCP App** | Diagramas dibujados a mano con control de cámara | Gratis, MIT | 5.520★ ([GitHub](https://github.com/excalidraw/excalidraw-mcp)) |
| **tldraw MCP App** | Lienzo de tldraw dentro del chat | No indicado | Fallo conocido: timeout a los 30 s ([claudeissues](https://claudeissues.com/issue/69784-bug-claude-ai-tldraw-mcp-app-exec-tool-call-times-out-after-30s-even-though-edit)) |
| **Unicorn Studio (agente MCP)** | Efectos WebGL sin código | Free: 200 cambios/mes; Legend ilimitado | Ver precios en diseño ([docs](https://www.unicorn.studio/docs/pricing/)) |
| **Webflow MCP** | CMS y Designer API | Gratis (MIT); requiere cuenta de Webflow | Relevante solo si alojas en Webflow ([GitHub](https://github.com/webflow/mcp-server)) |
| Framer MCP (unframer) | Editar proyectos de Framer | **[no verificado]** | **No es oficial** ([marketplace](https://www.framer.com/marketplace/plugins/mcp)) |
| Penpot MCP | Diseño open source | No verificado | El repo independiente está **archivado**; ahora vive en el repo principal ([GitHub](https://github.com/penpot/penpot-mcp)) |
| Spline MCP | API 3D de Spline | Gratis | Solo de la comunidad, 85★ ([GitHub](https://github.com/aydinfer/spline-mcp-server)) |
| **Blender** (conector oficial) / BlenderMCP (comunidad) | Escenas 3D por lenguaje natural | Blender es GPL; precio del conector no indicado / MIT | BlenderMCP tiene 30.752★ ([Anthropic](https://www.anthropic.com/news/claude-for-creative-work); [GitHub](https://github.com/ahujasid/blender-mcp)) |
| **Adobe for creativity** | Más de 50 herramientas de Creative Cloud | Algunas funciones requieren Adobe ID | **Soporte de After Effects no confirmado** ([Anthropic](https://www.anthropic.com/news/claude-for-creative-work)) |
| MCP de After Effects, Premiere, Cinema 4D, DaVinci | Control de apps de vídeo y 3D | MCP gratis; requieren la app de pago | Solo de la comunidad; el de AE más popular no se actualiza desde abril ([AE](https://github.com/Dakkshin/after-effects-mcp); [Resolve](https://github.com/samuelgursky/davinci-resolve-mcp)) |
| Manim MCP | Render de Manim | Gratis | **Estancado** desde mayo de 2025 ([GitHub](https://github.com/abhiemj/manim-mcp-server)) |

### Skills y plugins: frontend-design y gsap-skills son el núcleo gratuito

**Oficiales**

| Nombre | Para qué sirve | Precio / licencia | Notas |
|---|---|---|---|
| **frontend-design** (Anthropic) | Dirección de arte y tipografía; evita el aspecto de "IA genérica" | Gratis | 1,13 M instalaciones; "capa de gusto, no de corrección" ([plugin](https://claude.com/plugins/frontend-design); [dev.to](https://dev.to/nishilbhave/how-to-use-claude-codes-frontend-design-plugin-511i)) |
| **gsap-skills** (GreenSock) | Core, timelines, plugins, rendimiento, React | Gratis, MIT | `/plugin marketplace add greensock/gsap-skills`; 16.356★ ([GitHub](https://github.com/greensock/gsap-skills)) |
| **HyperFrames** (HeyGen) | 21 skills: `slideshow`, `motion-graphics`, `faceless-explainer`, `figma`, `remotion-to-hyperframes`… | Gratis, Apache-2.0 | `claude plugin marketplace add heygen-com/hyperframes` + `claude plugin install hyperframes@hyperframes`. Está en el marketplace oficial ([GitHub](https://github.com/heygen-com/hyperframes)) |
| **Remotion skills + plugin** | Crear, editar y renderizar vídeos en React | Skills gratis; se aplica la licencia de Remotion | `npx skills add remotion-dev/skills`; plugin `remotion@remotion` ([docs](https://www.remotion.dev/docs/ai/skills); [plugin](https://remotion.dev/docs/ai/claude-code-plugin)) |
| **Motion `/motion` skill** | Buenas prácticas de Motion, springs, transiciones | Freemium (Motion+) | La v6 unificó todas las skills en una sola ([changelog](https://motion.dev/changelog?lib=ai-kit)) |
| **anthropics/skills** | `canvas-design`, `algorithmic-art` (p5.js), `web-artifacts-builder`, `theme-factory`, `slack-gif-creator`, `webapp-testing` (Playwright) | Gratis (la mayoría Apache-2.0) | `/plugin marketplace add anthropics/skills` ([GitHub](https://github.com/anthropics/skills)) |
| **playground** (Anthropic) | Exploradores HTML con controles: útil para afinar easing y tiempos | Gratis | Marketplace oficial ([README](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/playground)) |
| superdesign, modern-web-guidance (Google Chrome) | Diseño en lienzo infinito / buenas prácticas web actuales | No indicado / gratis | Marketplace oficial ([marketplace](https://github.com/anthropics/claude-plugins-official)) |

**Comunidad**

| Nombre | Para qué sirve | Precio / licencia | Notas |
|---|---|---|---|
| **slides-ai-plugin** | Decks HTML animados (GSAP + SplitText + notas) en un solo archivo | MIT | 41★; sin cámara ([GitHub](https://github.com/proyecto26/slides-ai-plugin)) |
| **frontend-slides** | Decks HTML de un archivo, 16:9, sin dependencias | MIT | 30.635★; sin zoom ([GitHub](https://github.com/zarazhangrui/frontend-slides)) |
| **presenter-mode** | Vista de ponente (notas, temporizador, lupa) para cualquier deck HTML | MIT | Chrome/Edge; adaptable a tu cámara ([GitHub](https://github.com/jinnyjiinlee/presenter-mode)) |
| **javascript-animation-skills** (iArt) | Animación canvas fotograma a fotograma + ffmpeg | Open source | Ruta de los vídeos virales ([iArt](https://www.iart.ai/blog/claude-motion-graphics)) |
| **motion-graphics-skills** (Charlie Hills) | 13 skills, incluida `vox-explainer` | Gratis | **URL del repositorio no localizada** ([Substack](https://charliehills.substack.com/p/claude-code-motion-graphics)) |
| **claude-motion-design** (howseen-ai) | HTML + Playwright + FFmpeg: planificar, renderizar, inspeccionar, revisar | No indicado | ([No Code MBA](https://www.nocode.mba/articles/claude-opus-5-5-motion-graphics)) |
| threejs-skills, core-3d-animation, motion-canvas-skills | Skills para Three.js, R3F, Motion Canvas | Gratis | ([threejs-skills](https://github.com/cloudai-x/threejs-skills); [bundle](https://skillselion.com/skills/freshtechbro/claudedesignskills/plugins/bundles/core-3d-animation)) |
| Skills de gusto: ui-ux-pro-max, taste-skill, impeccable, emil-design-eng, web-design-guidelines | Criterio visual general | Gratis | Entre 32.000 y 135.000★ ([taste-skill](https://github.com/Leonxlnx/taste-skill); [impeccable](https://github.com/pbakaus/impeccable); [emilkowalski](https://github.com/emilkowalski/skills)) |
| claude-video-vision, peepshow | Extraen fotogramas de vídeo o GIF para que Claude "vea" el movimiento | Gratis | 1.362★ / 68★ ([video-vision](https://github.com/jordanrendric/claude-video-vision); [peepshow](https://github.com/t0mtaylor/peepshow)) |
| easing-wizard, animation-helper, keynot, slidecast, videozero | Curvas de easing, animaciones CSS, decks HTML, decks con voz a MP4 | Gratis | Marketplace de la comunidad; muy pequeños ([marketplace](https://github.com/anthropics/claude-plugins-community)) |
| html-video (nexu-io) | HTML a vídeo en local | Apache-2.0 | 4.684★ ([GitHub](https://github.com/nexu-io/html-video)) |
| Librerías de prompts | Plantillas para Opus 5.5 ("Technical Explainer", "Map Explainer"…) | Gratis | ([aiidelist](https://aiidelist.com/blog/opus-5-5-motion-design); [awesome-opus-5-5-prompts](https://github.com/TripoGrowthLab/awesome-opus-5-5-prompts)) |

### Diseño y assets: ojo con los planes gratuitos no comerciales

Tu charla es interna, para un departamento. Varias licencias tratan el uso interno de una empresa como comercial; tldraw lo dice expresamente. Por eso conviene evitar los planes gratuitos marcados como no comerciales.

**Herramientas de motion y diseño**

| Nombre | Para qué sirve | Precio / licencia | Notas |
|---|---|---|---|
| **Rive** (editor) | Animaciones vectoriales interactivas con máquinas de estado | Free 0 $ (exporta con **pantalla de presentación de Rive**); Cadet 9 $; Voyager 32 $; Enterprise 120 $ por asiento/mes | **[conflicto]** Voyager: 32 $ en la página de precios frente a 304 $/año o 39 $/mes en la documentación ([pricing](https://rive.app/pricing); [docs](https://rive.app/docs/account-admin/pricing)) |
| **LottieFiles / Lottie Creator** | Crear y alojar Lottie | Individual 19,99 $, Team 24,99 $ por usuario/mes (anual) | Límites del plan gratuito no publicados ([pricing](https://lottiefiles.com/pricing)) |
| **Jitter** | Motion design en el navegador; exporta Lottie y vídeo | Free (720p, marca de agua); Pro ~15-19 $/mes **[no verificado]** | Los precios no cargaban en la web oficial ([pricing](https://jitter.video/pricing/)) |
| **Spline** | 3D web interactivo | Free (marca de agua); Hobby 15 $/12 $; Pro 30 $/25 $; Max 70 $/60 $ al mes (mensual/anual) | Exportar código requiere Pro ([pricing](https://spline.design/pricing)) |
| **Unicorn Studio** | Efectos WebGL y shaders sin código | Free **solo no comercial**, con marca; Legend **20 $/mes o 168 $/año** con licencia comercial | ([docs](https://www.unicorn.studio/docs/pricing/)) |
| **Paper** (paper.design) | Lienzo de diseño nativo HTML/CSS | Free; Pro 16 $/editor/mes (anual) | Incluye MCP ([pricing](https://paper.design/pricing)) |
| **Cavalry** | Motion 2D procedural (escritorio), exporta Lottie | **Gratis para particulares** (requiere cuenta de Canva) | Los precios de "Cavalry Pro" están **[desactualizados]**; Canva la compró en febrero de 2026 ([cavalry.studio](https://cavalry.studio/); [UKTN](https://www.uktech.news/saas/canva-acquires-manchester-animation-software-group-cavalry-20260224)) |
| **Linearity Move/Curve** | Motion y vectores | Free; Pro 10 €/8 €; Studio desde 30 €/25 € (mensual/anual, IVA incluido) | Exporta GIF y Lottie ([pricing](https://www.linearity.io/pricing/)) |
| **Figma** | Diseño, Slides con Smart Animate | Starter gratis; Professional Full 16 $, Dev 12 $; Organization Full 55 $; Enterprise Full 90 $ por asiento/mes | Base de facturación ambigua según la fuente ([pricing](https://www.figma.com/pricing/); [Banani](https://www.banani.co/blog/figma-pricing-and-credits)) |
| **Framer** / **Webflow** | Constructores web con animación | Framer: Free, Basic 10 $, Pro 30 $. Webflow: ~14-39 $ **[no verificado]** | Son plataformas de hosting, no exportadores ([Framer](https://www.framer.com/pricing); [nocode.mba](https://www.nocode.mba/articles/webflow-pricing-2026)) |
| **After Effects** | Motion profesional | 21,98 £/mes en Reino Unido (IVA incluido); ~22,99 $ **[no verificado]**; 20,99 $ **[desactualizado]** | ([Adobe](https://www.adobe.com/products/aftereffects/plans.html); [cgheven](https://cgheven.com/blog/compositing-software-subscription-costs-2026)) |
| **Blender** | 3D | Gratis, GPL; lo que creas es tuyo | ([licencia](https://www.blender.org/about/license/)) |
| **Haikei**, **fffuel** | Generadores de fondos SVG, grano, blobs y paletas | Gratis | Licencias no localizadas ([Haikei](https://haikei.app/); [fffuel](https://www.fffuel.co/)) |
| Fable (motion en el navegador) | Motion design web | **Estado en 2026 desconocido** | ([Crunchbase](https://news.crunchbase.com/news/fable-15m-series-a-motion-design)) |

**Assets gratuitos y alternativas de presentación**

| Nombre | Para qué sirve | Precio / licencia | Notas |
|---|---|---|---|
| **Iconify** (Lucide ISC, Phosphor MIT, Tabler MIT, Heroicons MIT, Material Symbols Apache-2.0…) | 227 sets de iconos SVG | Gratis, open source | Ideal para que Claude los integre directamente ([Iconify](https://icon-sets.iconify.design/)) |
| **Open Peeps**, **Humaaans** | Personas ilustradas | **CC0** | ([Open Peeps](https://www.openpeeps.com/); [Humaaans](https://www.humaaans.com/)) |
| **unDraw** | Ilustraciones | Gratis, también comercial | **Prohíbe la descarga automatizada y el entrenamiento de IA**: no lo uses en flujos con agente ([licencia](https://undraw.co/license)) |
| **useAnimations** | Unas 300 microanimaciones Lottie | MIT | ([useAnimations](https://useanimations.com/)) |
| **Lordicon** | Iconos animados | Free con **atribución obligatoria**; PRO 8 $/16 $ al mes (anual/mensual) | Embed limitado a 1 M de peticiones a la CDN ([pricing](https://lordicon.com/pricing)) |
| **LottieFiles (biblioteca libre)** | Animaciones Lottie | Lottie Simple License: uso comercial permitido | ([licencia](https://lottiefiles.com/page/license)) |
| **Fontshare** | Fuentes | Gratis, también comercial (ITF FFL) | **[conflicto]** sobre si se puede autoalojar ([ITF](https://www.indiantypefoundry.com/news/introducing-fontshare)) |
| Pitch / Gamma | Decks con IA | Pitch: Free, Plus 10 €. Gamma: ~8-100 $ **[no verificado]** | Sin cámara ([Pitch](https://pitch.com/pricing); [eesel](https://www.eesel.ai/blog/gamma-pricing)) |
| Tome | Decks con IA | — | **Cerró el 30-4-2025** ([chatslide](https://www.chatslide.ai/articles/tome-ai-shut-down-what-happened)) |

### IA generativa: solo hace falta para ilustraciones SVG o metraje real

Para un mapa diagramático, el SVG y el código dan resultados más nítidos y ligeros que el vídeo generado. El único generador realmente útil aquí es uno que produzca **SVG animable**, y para eso destaca Recraft.

| Nombre | Para qué sirve | Precio / licencia | Notas |
|---|---|---|---|
| **Recraft** | Ilustraciones **SVG** de marca; vectorizar imágenes | Free: **imágenes públicas y no comerciales**. Basic 12 $/10 $, Advanced 33 $/27 $, Pro 60 $/48 $ al mes (mensual/anual) **[parcialmente no verificado]**. API: SVG desde 0,022-0,04 $/imagen; vectorizar 0,01 $ | MCP alojado ([pricing](https://www.recraft.ai/pricing); [llms.txt](https://www.recraft.ai/llms.txt)) |
| **Google Nano Banana / Veo 3.1** (API de Gemini) | Imagen y vídeo | Nano Banana Pro 0,134 $/imagen (1K/2K); Nano Banana 2 0,045-0,151 $; Veo 3.1 0,40 $/s (Fast 0,10-0,30 $, Lite 0,05-0,08 $) | Sin capa gratuita en la API. El Nano Banana original (`gemini-2.5-flash-image`) se **retiró el 2-10-2026** ([pricing](https://ai.google.dev/gemini-api/docs/pricing)) |
| **OpenAI GPT Image** | Imagen | gpt-image-2: 8 $/30 $ por 1 M de tokens de imagen (entrada/salida) | ([pricing](https://developers.openai.com/api/docs/pricing)) |
| **Midjourney** | Imagen | 10 $/30 $/60 $/120 $ al mes **[no verificado]** | No se encontró API ([eesel](https://www.eesel.ai/blog/midjourney-pricing)) |
| **Ideogram** | Imágenes con texto legible | Free (salida **pública**); Plus 20 $/15 $; Pro 60 $/42 $ (mensual/anual) | ([docs](https://docs.ideogram.ai/plans-and-billing/available-plans.md)) |
| **Krea** | Imagen, vídeo y 3D multimodelo | Free 100 unidades/día; Pro 21 $; Max 63 $ | **[conflicto]** sobre si es mensual o anual, y sobre la licencia comercial del plan Free ([pricing](https://www.krea.ai/pricing)) |
| **Runway** | Vídeo (Gen-4.5, Aleph) | Free 125 créditos; Standard 15 $/12 $; Pro 35 $/28 $ (incluye MCP); Max 95 $/76 $. API prepago, mínimo 10 $ | El antiguo servidor MCP está **archivado**; ahora se usan las skills `runway-api-skills` ([pricing](https://runway.com/pricing); [skills](https://github.com/runwayml/skills)) |
| **Luma** | Vídeo | Plus 30 $/25 $ (uso comercial); Pro 90 $/75 $; Ultra 300 $/250 $ | ([pricing](https://lumalabs.ai/pricing)) |
| **Kling** | Vídeo | 10 $/37 $/92 $/180 $ al mes **[no verificado]** | Sin MCP oficial ([eesel](https://www.eesel.ai/en/blog/kling-ai-pricing)) |
| **Higgsfield** | Agregador de modelos de vídeo e imagen; MCP alojado | **[conflicto]**: de 15 a 129 $ según la fuente; el MCP requiere suscripción o tiene 150 créditos gratis, según quién lo cuente | ([help](https://higgsfield.ai/creator-hub/help-center/integrations/how-do-i-connect-higgsfield-to-ai-agent); [Techsy](https://techsy.io/en/blog/higgsfield-mcp-claude-code)) |
| **Meshy** / **Tripo** | Modelos 3D | Meshy: Free (CC BY), Pro 19 €. Tripo **[no verificado]** | Los planes gratuitos exigen atribución CC BY ([Meshy](https://www.meshy.ai/pricing)) |
| **fal.ai MCP** / **Replicate MCP** | Acceso a cientos de modelos desde Claude | MCP gratis; **pagas cada ejecución** | ([fal](https://fal.ai/docs/model-apis/mcp); [Replicate](https://replicate.com/docs/reference/mcp)) |
| **ElevenLabs MCP** | Voz en off | MCP gratis; consume créditos de la cuenta | El MCP local `uvx elevenlabs-mcp` está **[desactualizado]**: archivado el 22-8-2026; ahora es alojado ([changelog](https://elevenlabs.io/docs/changelog/2026/8/22)) |
| Suno | Música (la usan los creadores virales) | **Precio no investigado** | ([daily.dev](https://daily.dev/posts/claude-opus-5-5-generates-motion-design-and-visual-scenes-entirely-in-code-yqmdx7qnw)) |

### Hosting: GitHub Pages o Cloudflare Pages, y un servidor local el día de la charla

| Nombre | Para qué sirve | Precio / licencia | Notas |
|---|---|---|---|
| **GitHub Pages** | Publicar el HTML estático | Gratis; 1 GB por sitio; ~100 GB/mes | Solo se prohíbe como hosting gratuito de un negocio online, e-commerce o SaaS transaccional; una charla no entra ahí ([límites](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)) |
| **Cloudflare Pages** | Publicar el HTML estático | Gratis; 500 builds/mes; 25 MiB por archivo | ([límites](https://developers.cloudflare.com/pages/platform/limits/)) |
| **Netlify** | Publicar e integrar con Claude Design | Free 300 créditos (~15 GB de tráfico); Personal 9 $; Pro 20 $ | ([pricing](https://www.netlify.com/pricing/)) |
| **Vercel** | Publicar | Hobby gratis pero **"personal, no comercial"**; Pro 20 $ | Evítalo para una charla de empresa ([pricing](https://vercel.com/pricing)) |
| **Servidor local** (`python3 -m http.server`) | Presentar sin conexión desde el portátil | Gratis | Evita `file://`, que rompe Lottie ([foro](https://forum.ghost.org/t/help-in-using-lottie-with-ghost/7992)) |
| **Artefacto de claude.ai** | Compartir internamente | Incluido en el plan | Límites de tamaño no documentados; respeta la política de datos de tu empresa |

## Doce datos que ya no son lo que parecen

Esta información circula todavía por blogs y buscadores y conviene descartarla o confirmarla antes de pagar nada.

| Dato que circula | Situación real (14-10-2026) | Fuente |
|---|---|---|
| "Claude Design es una app independiente con cupo semanal propio" | Ahora es una plantilla de artefacto con cupo compartido; claude.ai/design cierra el 14-12-2026 | [Help Center](https://support.claude.com/en/articles/14604416) |
| "Claude Design no exporta a PPTX" (MindStudio) | Exporta a PPTX, PDF, Google Slides y HTML | [Help Center](https://support.claude.com/en/articles/14604416) |
| "Claude Design no tiene plan gratuito" | Disponible en Free | [Help Center](https://support.claude.com/en/articles/14604416) |
| Exportación de vídeo de Claude Design | **[conflicto]**; la lista oficial no incluye vídeo (para MP4, usa Claude Motion o HyperFrames) | [Help Center](https://support.claude.com/en/articles/14604416) |
| Motion+ a 299 $ / Team 1.499 $ | 399 $ Solo, pago único; Team anual por asiento | [motion.dev/plus](https://motion.dev/plus) |
| typed.js es MIT | GPL-3.0 o licencia comercial de pago desde la v3 (enero de 2026) | [release](https://github.com/mattboldt/typed.js/releases/tag/v3.0.0) |
| Remotion "BSL, pago por encima de 1 M$" | Gratis hasta 3 empleados; después, licencia de empresa | [LICENSE](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md) |
| Context7: 60 peticiones/hora gratis, Pro a 7 $ | Free: 1.000 llamadas/mes; Pro 10 $/asiento | [plans](https://context7.com/plans) |
| Figma MCP: 6 llamadas/mes en Starter | 20/mes con asiento View/Collab; 200/día con Dev/Full | [Figma](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/) |
| ElevenLabs MCP local, Runway MCP, Puppeteer MCP | Archivados; usa el MCP alojado o las skills | [ElevenLabs](https://elevenlabs.io/docs/changelog/2026/8/22); [Runway](https://github.com/runwayml/runway-api-mcp-server) |
| Precios de Cavalry Pro | Gratis para particulares desde la compra de Canva | [cavalry.studio](https://cavalry.studio/) |
| impress.js en npm | npm se quedó en 1.1.0 (2020); usa la v2.0.0 de GitHub | [npm](https://www.npmjs.com/package/impress.js) |

Además de los marcados **[no verificado]** en las tablas, quedan sin confirmar en fuente oficial estos precios: Max 20x de Claude, Prezi, Gamma, Midjourney, Kling, Tripo, Jitter, Webflow y Higgsfield, el render en la nube de HyperFrames, los MCP de LottieFiles y Rive, y los precios en euros de Claude, de los que solo hay estimaciones de terceros.

## Conclusión

La ventaja competitiva en motion graphics con Claude no está en el modelo sino en el arnés. Los resultados buenos de la comunidad combinan skills de un proveedor que corrigen la deriva de versiones, un sistema de diseño fijado por escrito y un bucle de capturas y crítica. Los resultados mediocres son los de "un prompt y listo". Tu proyecto cae justo en el hueco que nadie ha cubierto todavía: una presentación en directo, con cámara, que explica conceptos técnicos. Eso significa que no hay plantilla que copiar. También significa que el primer entregable no debe ser ninguna zona bonita, sino el **motor de cámara con dos zonas vacías**, probado con tu mando de presentación, en tu portátil y en el proyector real. Cuando eso funcione, cada zona es un módulo independiente que Claude Code puede iterar y versionar sin miedo.

La inestabilidad de las superficies de Anthropic, con Claude Design cambiando de forma tres veces en 2026, refuerza la decisión de **ser dueño del código**: un HTML con GSAP en tu repositorio no caduca el 14 de diciembre. Si construyes cada zona como una línea de tiempo pausada y buscable, al estilo HyperFrames, es probable que puedas reutilizar las mismas zonas para generar un MP4 de respaldo o clips para compartir después de la charla. No lo he verificado, pero sale gratis si lo tienes en cuenta desde el principio. El coste real del proyecto no estará en las herramientas, casi todas gratuitas, sino en el cupo de uso de Claude que consuman las iteraciones de animación.
