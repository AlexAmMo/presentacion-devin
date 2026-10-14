# Degradación por contexto largo ("context rot"): gráficas y datos con fuente

Investigación hecha el 14-10-2026 para la sección 2.4 «Qué es el contexto» del guion. Cada afirmación lleva su URL. Si algo no se ha podido verificar, se indica.

---

## 1. Recomendación rápida

| # | Archivo (en `referencias/graficas/`) | Para qué sirve |
|---|---|---|
| 1 | `degradacion-contexto_contextarena-gdm-mrcrv2-8needle_2026-10.png` | **Gráfica principal.** Curva de precisión frente a longitud de contexto (8K→1M) con modelos de 2026: Claude Opus 5, Claude Sonnet 5, GPT-5.6 Sol, GPT-5.5 y Gemini 3.7 Flash. Es un benchmark independiente con intervalos de confianza y tamaños de muestra publicados. |
| 2 | `degradacion-contexto_chroma-longmemeval-focused-vs-full-claude_2025-07.png` | Refuerza el mensaje «solo lo relevante»: la misma pregunta con unos 300 tokens relevantes («focused») frente a unos 113K tokens de historial completo («full»). Los modelos son de 2025. |
| 3 | `degradacion-contexto_fictionlivebench_2026-04.png` | Contrapunto con una tarea real de comprensión (no de búsqueda de agujas). Los mejores modelos de principios de 2026 apenas caen hasta 192K, mientras que los peores caen desde 8K–16K. |

**No existe una gráfica publicada con curva completa para Opus 5.5, Fable 5.1, Sonnet 5.5, GPT-6 Astra / GPT-6.1 Sol ni Gemini 4 Argon.** Para esos modelos solo hay pares de puntos (contexto corto frente a largo) en las fichas de los fabricantes (sección 4-B y 4-C). Si se quiere una gráfica con la última generación, hay que redibujarla a partir de esos datos, con la advertencia de que son autoinformados.

Mi propuesta para la diapositiva es redibujar la gráfica 1 con el design system a partir de la tabla 4-A (eje X logarítmico en tokens absolutos). La captura se puede usar como referencia o respaldo.

---

## 2. Gráficas descargadas (comprobadas abriéndolas)

### 2.1 Context Arena: GDM-MRCR v2, 8 agujas (captura del 14-10-2026)
- Archivo: `/Users/ton/Desktop/Presentacion/referencias/graficas/degradacion-contexto_contextarena-gdm-mrcrv2-8needle_2026-10.png` (2800×1990, modo claro).
- Generada desde https://contextarena.ai/?needles=8&showExtra=true&showExtended=true&showCI=false&models=anthropic/claude-opus-5|max,anthropic/claude-sonnet-5|max,openai/gpt-5.6-sol|max,openai/gpt-5.5|xhigh,google/gemini-3.7-flash|high (captura con Chrome sin interfaz; los datos son los de la API pública del sitio, `https://contextarena.ai/api/needle-summary?needles=8`).
- Qué muestra: título «GDM-MRCRv2 Full (8-Needle)». El eje Y es «Average Score (%)» (0–100) y el eje X es «Context Length Bin» en escala logarítmica, de 8K a 1M tokens. Hay cinco líneas con etiquetas de valor y, debajo, una tabla con las puntuaciones por tramo, el contexto máximo y el AUC.
- Lectura: todos los modelos están cerca del 100 % hasta 16–32K. A partir de 64–128K empiezan a separarse, y a 512K el mejor (Gemini 3.7 Flash) baja al 77,7 % y el peor (Sonnet 5) al 32,0 %.

### 2.2 Chroma, «Context Rot»: LongMemEval focused frente a full (familia Claude)
- Archivo: `/Users/ton/Desktop/Presentacion/referencias/graficas/degradacion-contexto_chroma-longmemeval-focused-vs-full-claude_2025-07.png` (1189×590).
- Origen: https://www.trychroma.com/img/context_rot/longmemeval/claude.png, del informe https://www.trychroma.com/research/context-rot (antes research.trychroma.com/context-rot), publicado el 14-07-2025.
- Qué muestra: barras rojas («Focused») frente a azules («Full») para siete modelos Claude 2025 (Opus 4 ± thinking, Sonnet 4 ± thinking, Sonnet 3.7, Sonnet 3.5, Haiku 3.5). Por ejemplo, Claude Opus 4 pasa de 0,92 a 0,38 y Opus 4 con thinking de 0,95 a 0,72.
- Hay una gráfica equivalente para GPT (https://www.trychroma.com/img/context_rot/longmemeval/gpt.png), no descargada en la carpeta final. En ella GPT-4.1 pasa de 0,87 a 0,62 y o3 (high) de 0,94 a 0,81.

### 2.3 Fiction.LiveBench (actualización del 04-04-2026)
- Archivo: `/Users/ton/Desktop/Presentacion/referencias/graficas/degradacion-contexto_fictionlivebench_2026-04.png` (2340×1714).
- Origen: https://cdn6.fiction.live/file/fictionlive/a7be0188-9a0a-4b19-a4b3-97e7deecf52e.png, la imagen de resultados de la historia «Fiction.liveBench April 04 2026» (https://fiction.live/stories/Fiction-liveBench-April-04-2026/oQdzQvKHw8JyXbN87; datos obtenidos de la API pública `https://fiction.live/api/node/oQdzQvKHw8JyXbN87`).
- Qué muestra: una tabla (no una curva) con columnas 0, 400, 1k, 2k, 4k, 8k, 16k, 32k, 60k, 120k y 192k tokens, y 19 modelos. Los más recientes son gpt-5.2, gpt-5.2-pro, claude-opus-4-6, claude-opus-4-5, claude-sonnet-4-5, gemini-3-pro-preview y gemini-3-flash-preview.

---

## 3. Candidatos evaluados (ficha por fuente)

### A. Context Arena: leaderboard MRCR por longitud de contexto ★ el mejor con modelos actuales
- URL: https://contextarena.ai/ (API: `/api/needle-summary?needles=8`, `/api/models`). El archivo de OpenAI-MRCR anterior está en https://old.contextarena.ai/.
- Editor: proyecto independiente. La web enlaza a https://twitter.com/DillonUzar como autor.
- Fecha: datos consultados el 14-10-2026. Últimas ejecuciones por modelo: Opus 5, 13-08-2026; Sonnet 5, 09-07-2026; GPT-5.6 Sol/Terra/Luna, 09/10-07-2026; GPT-5.5, 25-04-2026; Gemini 3.7 Flash, 14-08-2026 (campo `latest_run_timestamp` de la API).
- Benchmark: GDM-MRCR v2 (Multi-Round Coreference de Google DeepMind, del paper Michelangelo, https://arxiv.org/abs/2409.12640; código en https://github.com/google-deepmind/eval_hub/tree/master/eval_hub/mrcr_v2). La conversación contiene ocho peticiones casi idénticas («agujas») mezcladas con distractores, y el modelo tiene que reproducir la n-ésima. La puntuación es la similitud `difflib.SequenceMatcher.ratio()` (texto del FAQ de la web). La web indica un «suelo de ruido» del 12,5 % con 8 agujas, es decir, lo que sacaría un modelo que acierta por azar. El README de DeepMind estima un ruido del ~15 % con 8 agujas (https://github.com/google-deepmind/eval_hub/blob/master/eval_hub/mrcr_v2/README.md).
- Eje X: tokens absolutos por tramo (8K, 16K, 32K, 64K, 128K, 256K, 512K, 1M). Cada tramo cubre el intervalo (tramo anterior, tramo]: el ejemplo de la web `mrcr_v2p1_4needle_in_(8192,16384)` tiene 16 089 tokens y cae en el tramo «16k». Los tokens se cuentan con o200k_base (tiktoken), según el texto de «Token Efficiency» de la web.
- Modelos con datos: Claude Opus 5, Sonnet 5, Opus 4.8, 4.7 y 4.6, Sonnet 4.6 y Haiku 4.5; GPT-5.6 Sol, Terra y Luna, GPT-5.5 y GPT-5.4; Gemini 3.7, 3.6 y 3.5 Flash, y 3.1 Pro; además de Qwen, DeepSeek, GLM, Grok, Kimi y otros (73 modelos con datos suficientes).
- **No aparecen** Opus 5.5, Fable 5.1, Sonnet 5.5, Haiku 5.5, GPT-6 Astra, GPT-6/6.1 Sol ni Gemini 4 Argon (comprobado en `/api/models` el 14-10-2026; `claude-fable-5` figura con `has_sufficient_data: false`).
- Conclusión: Claude Opus 5 (max) pasa de 98,7 % a 8K a 91,3 % a 128K y a 42,5 % a 512K. GPT-5.6 Sol (max) pasa de 100 % a 92,4 % y a 61,9 %. Gemini 3.7 Flash (high) pasa de 100 % a 88,6 %, 77,7 % y 63,5 % a 1M.
- Matices:
  - Es una prueba sintética de recuperación con distractores, no una tarea de programación.
  - Claude y GPT no tienen dato a 1M; la web atribuye estos huecos a límites de ventana de contexto.
  - El nivel de razonamiento cambia mucho el resultado. Por ejemplo, Claude Opus 4.6 sin razonamiento saca 37,5 % a 128K y con medium 72,5 %; Gemini 3.7 Flash a 1M saca 55,1 % con low y 63,5 % con high.

### B. Google DeepMind: ficha del modelo Gemini 4 Argon ★ único dato con la generación actual (Opus 5.5, Fable 5.1, GPT-6 Astra)
- URL: https://deepmind.google/models/model-cards/gemini-4-argon/ («Published 13 October 2026»). La metodología está en el PDF https://deepmind.google/models/evals-methodology/gemini-4-argon/. Anuncio del modelo: https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/ (30-09-2026).
- Benchmark: GraphWalks BFS (F1). El contexto se llena con un grafo de hashes y el modelo tiene que hacer una búsqueda en anchura. Según la metodología, «Graphwalks results for all models are self-computed», con 650 ítems de hasta 128K tokens y 200 problemas de entre 256K y 1M tokens.
- Eje X: solo dos puntos, «hasta 128K» y «de 256K a 1M» tokens. No hay curva.
- Modelos: Gemini 4 Argon, GPT-6 Astra, Claude Fable 5.1 y Claude Opus 5.5.
- Conclusión: todos caen de ≥90 % a 65–84 %. Opus 5.5 pasa de 90,6 % a 66,8 %, Fable 5.1 de 91,4 % a 65,0 %, GPT-6 Astra de 98,7 % a 71,8 % y Gemini 4 Argon de 99,7 % a 84,2 %.
- Matices: el fabricante mide a sus competidores y los presenta junto a su propio modelo. No hay gráfica dedicada (en el blog solo hay una tabla GIF general: https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/gemini-4-argon_table_blog.gif).

### C. OpenAI: «GPT-6 Astra: A new generation of intelligence»
- URL: https://openai.com/index/gpt-6-astra/. Devuelve 403 a WebFetch; se leyó a través de https://r.jina.ai/. La página incluye actualizaciones del 22-09-2026 (GPT-6 Sol y Luna) y del 29-09-2026 (GPT-6.1 Sol). Lanzamiento el 03-09-2026 según https://www.vellum.ai/blog/gpt-6-astra-benchmarks-explained.
- Benchmark: OpenAI MRCR v2, 8 agujas. Es otro dataset, distinto de GDM-MRCR v2, así que **no se puede mezclar con Context Arena**.
- Eje X: dos tramos, 256K–512K y 512K–1M.
- Modelos: GPT-6 Astra y GPT-5.6 Sol. Las columnas de Claude Fable 5.1, Fable 5, Opus 5 y Gemini 3.8 Flash aparecen con «-».
- Conclusión: Astra pasa de 100,0 % a 96,3 % y GPT-5.6 Sol de 91,5 % a 73,8 %. Según el propio OpenAI, Astra casi no se degrada en su prueba.
- Matices: es un dato autoinformado. En GraphWalks medido por Google (B), Astra cae a 71,8 % en 256K–1M. La página de GPT-6.1 Sol (https://openai.com/index/introducing-gpt-6-1-sol/) no incluye evaluaciones de contexto largo. La de Astra presenta además un mecanismo en Codex para «preserve and retrieve context when the context window fills», con notas entre ventanas como alternativa a la compactación. Es útil para el guion sobre la gestión de contexto.

### D. Anthropic: ficha de sistema de Claude Opus 5.5 (22-09-2026)
- Anuncio: https://www.anthropic.com/claude-opus-5-5. Ficha de sistema: https://www.anthropic.com/claude-opus-5-5-system-card → https://www-cdn.anthropic.com/fc1b44717c85dc068bc6ba5024219938094694bd/Claude%20Opus%205.5%20System%20Card.pdf
- La sección 8.10 «Long context» solo incluye **ProgramBench**, un benchmark agéntico de reconstrucción de programas: Opus 5.5 saca 91,2 %, Fable 5.1 87,6 % y Opus 5 85,4 %. La ficha dice que los episodios «cover a range of context lengths up to the full 1M token window», pero **no desglosa por longitud**. No hay MRCR ni GraphWalks.
- Lo mismo ocurre en las fichas de Opus 5 (24-07-2026, https://www-cdn.anthropic.com/ceaf5c7ff2783855203fde8208ec311252dced5b/Claude%20Opus%205%20System%20Card.pdf), Fable 5.1 y Mythos 5.1 (01-09-2026, https://www-cdn.anthropic.com/0339e6a7c5c7b87f5c07798616dc32c215d14235/Claude%20Fable%205.1%20&%20Claude%20Mythos%205.1%20System%20Card.pdf) y Sonnet 5.5 (28-09-2026, https://www-cdn.anthropic.com/870c8f525702625d2c62fc6dd04c857e3250bec1/Claude%20Sonnet%205.5%20System%20Card.pdf): solo ProgramBench.

### E. Anthropic: ficha de sistema de Claude Fable 5 y Mythos 5 (09-06-2026)
- URL: https://www-cdn.anthropic.com/57a52ea7d8f0e54e8a542e908266086df425cdf5/Claude%20Fable%205%20&%20Claude%20Mythos%205%20System%20Card.pdf (sección 8.13, tabla 8.13.A y figuras 8.13.B/C).
- Benchmark: GraphWalks BFS y Parents (F1), con subconjuntos de 256K y 1M.
- Modelos: Claude Mythos 5, Mythos Preview, Opus 4.8 y GPT-5.5 (este último con el dato publicado por OpenAI).
- Conclusión, BFS de 256K a 1M: Mythos 5 pasa de 91,1 a 79,4; Opus 4.8 de 85,9 a 68,1; GPT-5.5 de 73,7 a 45,4. En Parents: Mythos 5 pasa de 99,96 a 97,5; Opus 4.8 de 99,3 a 83,3; GPT-5.5 de 90,1 a 58,5.
- Matiz de la propia ficha: los resultados a 1M «are not reproducible via the public API, as the problems exceed its 1M token limit».

### F. Fiction.LiveBench
- URL: https://fiction.live/stories/Fiction-liveBench-April-04-2026/oQdzQvKHw8JyXbN87 (la historia lleva el título «Fiction.liveBench April 04 2026»; última modificación según la API: 03-05-2026; estado «hiatus»).
- Método: 36 preguntas sobre 30 historias, en versiones recortadas desde «0» tokens (solo lo relevante) hasta 192K tokens. Requiere comprensión (cronología, personajes, subtexto), no búsqueda literal (texto de la propia historia; véase también https://epoch.ai/benchmarks/fictionlivebench).
- Eje X: tokens absolutos (0 a 192k).
- Modelos más recientes: gpt-5.2, gpt-5.2-pro, claude-opus-4-6, claude-opus-4-5, claude-sonnet-4-5, gemini-3-pro-preview, gemini-3-flash-preview, glm-5, kimi-k2.5, qwen3.6-plus y otros. **No incluye la generación 5.x de Claude, GPT-5.6/6 ni Gemini ≥3.5.**
- Conclusión: gemini-3-flash-preview saca 100 % a 0 y 100 % a 192k; gpt-5.2 100 % a 0 y 96,9 % a 192k; claude-opus-4-6 87,5 % a 0 y 93,8 % a 120k. Los modelos más débiles caen pronto: minimax-m2.1 pasa de 87,5 % a 0 a 58,3 % a 8k y 21,9 % a 120k; nemotron-3-nano pasa de 100 % a 52,8 % a 8k.
- Matices: el 0,0 de los Claude a 192k parece un límite de ventana (200K en aquella versión), no una degradación real; la fuente no lo explica, así que esto no está verificado. Con 36 preguntas, cada pregunta vale unos 2,8 puntos, así que hay mucho ruido. En los modelos punteros la prueba está casi saturada.

### G. Chroma: «Context Rot: How Increasing Input Tokens Impacts LLM Performance» (origen del término)
- URL: https://www.trychroma.com/research/context-rot (14-07-2025; autores Kelly Hong, Anton Troynikov y Jeff Huber).
- Método: 18 modelos (Claude Opus 4, Sonnet 4, 3.7, 3.5 y Haiku 3.5; o3, GPT-4.1, 4.1 mini y nano, 4o, 4 Turbo y 3.5 Turbo; Gemini 2.5 Pro, 2.5 Flash y 2.0 Flash; Qwen3 235B, 32B y 8B) y unas 194 480 llamadas. Experimentos: NIAH con agujas semánticas, distractores, estructura del texto de relleno, LongMemEval y palabras repetidas.
- Eje X: tokens absolutos. LongMemEval compara unos 300 tokens («focused») con unos 113K («full»).
- Conclusión: el rendimiento cae al crecer la entrada incluso en tareas triviales, y dar solo lo relevante mejora mucho el resultado. Ejemplo en LongMemEval: Claude Opus 4 pasa de 0,92 (focused) a 0,38 (full).
- Matices: los modelos son de 2025. No he encontrado ninguna continuación de Chroma en 2026 con modelos nuevos. En Claude, parte de la caída se debe a que se abstiene de responder (lo dice el propio informe).

### H. Anthropic Fellows: «Classifier Context Rot: Monitor Performance Degrades with Context Length» (12-05-2026)
- URL: https://arxiv.org/abs/2605.12366 (Sam Martin, Anthropic Fellows Program, y Fabien Roger, Anthropic).
- Contexto relevante para Devin: monitorización de **transcripciones de agentes de programación** de más de 500K tokens.
- Modelos: Opus 4.6, GPT-5.4 y Gemini 3.1.
- Conclusión: los modelos fallan entre 2× y 30× más al detectar una acción peligrosa si va precedida de unos 800K tokens de actividad benigna. Opus 4.6 con thinking baja de 99,7 % de recall con 100K a 69 % con 800K. El razonamiento y los recordatorios periódicos lo mitigan en parte.
- Figura 4 (https://arxiv.org/html/2605.12366v1/lost_in_the_middle_v2.png, 675×283, baja resolución): mapa de calor de detección según el relleno previo y posterior, y detección según la posición de la aguja.

### I. Otros estudios (sin modelos actuales o sin curva útil)
- **Du et al., «Context Length Alone Hurts LLM Performance Despite Perfect Retrieval»** (06-10-2025), https://arxiv.org/abs/2510.05381. Con cinco modelos, el rendimiento cae entre un 13,9 % y un 85 % al alargar la entrada, aunque el modelo recupere toda la información relevante e incluso si el relleno son espacios en blanco. Es un buen argumento de que «no es solo encontrar la aguja».
- **NoLiMa** (Adobe/LMU, 07-02-2025, ICML 2025), https://arxiv.org/abs/2502.05167. De 13 modelos con ventana de al menos 128K, 11 caen por debajo del 50 % de su línea base a 32K. GPT-4o pasa de 99,3 % a 69,7 %.
- **RULER** (NVIDIA, 09-04-2024, COLM 2024), https://arxiv.org/abs/2404.06654. De 17 modelos que anuncian 32K o más, solo la mitad rinde satisfactoriamente a 32K.
- **LongCodeBench** (v3 del 22-10-2025), https://arxiv.org/abs/2505.07897. En programación a 1M, Claude 3.5 Sonnet pasa de 29 % a 3 % y Qwen2.5 de 70,2 % a 40 %.
- **SlopCodeBench** (v1 del 25-03-2026, v2 del 07-05-2026), https://arxiv.org/abs/2603.24755. Mide cómo se degradan los agentes de programación **por iteraciones**, no por tokens. El mejor agente pasa el 14,8 % de los checkpoints y hay erosión estructural en el 77 % de las trayectorias. No sirve como curva de contexto.
- **LongBench v2**: los agregadores (p. ej. https://benchlm.ai/benchmarks/longbench-v2) solo dan una puntuación global y no hay un desglose por longitud fácil de verificar. No lo he usado.
- **HELMET** y **Michelangelo**: no he encontrado actualizaciones de 2026 con modelos actuales (búsqueda sin resultados relevantes). No los he revisado a fondo.
- **Anthropic, «Effective context engineering for AI agents»** (29-09-2025), https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents. Reconoce el «context rot», habla de un «attention budget» y recomienda buscar «the smallest set of high-signal tokens that maximize the likelihood of your desired outcome». Es una buena cita para la diapositiva.
- **Cognition (Devin), «Rebuilding Devin for Claude Sonnet 4.5»** (29-09-2025), https://cognition.com/blog/devin-sonnet-4-5-lessons-and-challenges. Describe la «context anxiety»: el modelo resume por su cuenta al acercarse al límite y eso «can actually hurt performance». Su solución fue activar la beta de 1M y limitar el uso a 200K. Es una anécdota de 2025.

---

## 4. Datos para redibujar nuestra propia gráfica

### 4-A. Context Arena, GDM-MRCR v2 8 agujas, puntuación media (%) por tramo de contexto
Fuente: https://contextarena.ai/api/needle-summary?needles=8 (modo «full»), consultado el 14-10-2026. «–» significa que no hay resultado (la web lo atribuye a límites de ventana).

| Modelo (razonamiento) | 8K | 16K | 32K | 64K | 128K | 256K | 512K | 1M | Última ejecución |
|---|---|---|---|---|---|---|---|---|---|
| anthropic/claude-opus-5 (max) | 98.7 | 99.9 | 99.3 | 99.9 | 91.3 | 65.6 | 42.5 | – | 2026-08-13 |
| anthropic/claude-sonnet-5 (max) | 96.4 | 94.9 | 87.9 | 68.0 | 52.9 | 52.2 | 32.0 | – | 2026-07-09 |
| anthropic/claude-opus-4.8 (max) | 97.4 | 96.1 | 93.0 | 90.7 | 75.2 | 61.8 | 39.8 | – | n/d |
| anthropic/claude-opus-4.6 (high) | 98.2 | 84.4 | 86.2 | 74.3 | 68.1 | 69.1 | 54.3 | – | 2026-04-20 |
| openai/gpt-5.6-sol (max) | 100.0 | 100.0 | 98.0 | 98.8 | 92.4 | 83.5 | 61.9 | – | 2026-07-10 |
| openai/gpt-5.6-terra (max) | 98.8 | 100.0 | 94.3 | 89.7 | 80.2 | 67.9 | 49.8 | – | 2026-07-10 |
| openai/gpt-5.6-luna (max) | 96.4 | 93.9 | 90.2 | 71.5 | 58.4 | 45.1 | 37.6 | – | 2026-07-09 |
| openai/gpt-5.5 (xhigh) | 100.0 | 99.9 | 95.8 | 90.8 | 85.8 | 73.2 | 54.2 | – | 2026-04-25 |
| google/gemini-3.7-flash (high) | 100.0 | 100.0 | 98.6 | 93.1 | 88.6 | 89.0 | 77.7 | 63.5 | 2026-08-14 |
| google/gemini-3.6-flash (high) | 98.8 | 98.8 | 90.8 | 80.6 | 77.3 | 73.9 | 61.1 | 58.3 | 2026-07-22 |
| google/gemini-3.1-pro-preview (high) | 100.0 | 98.8 | 94.2 | 74.9 | 57.6 | 47.4 | 31.1 | 25.9 | 2026-04-20 |

Tamaño de muestra e intervalos de confianza al 95 % (de la misma API):

| Tramo | n tests (Opus 5 max) | IC95 Opus 5 max | IC95 GPT-5.6 Sol max | IC95 Gemini 3.7 Flash high |
|---|---|---|---|---|
| 8K | 80 | 96.2–100.0 | 100.0–100.0 | 100.0–100.0 |
| 16K | 80 | 99.9–100.0 | 100.0–100.0 | 100.0–100.0 |
| 32K | 136 | 97.8–100.0 | 95.3–100.0 | 96.4–100.0 |
| 64K | 85 | 99.9–100.0 | 96.5–100.0 | 86.2–97.7 |
| 128K | 103 | 85.6–96.1 | 86.7–97.2 | 81.9–94.2 |
| 256K | 141 | 57.7–73.0 | 76.7–89.1 | 83.6–93.8 |
| 512K | 236 | 36.3–48.4 | 55.6–67.9 | 72.0–82.7 |
| 1M | – | – | – | 57.8–68.4 |

Conversión aproximada a «% de ventana» para modelos de 1M (por si se quiere el eje del gráfico antiguo): 128K ≈ 13 %, 256K ≈ 26 %, 512K ≈ 51 %, 1M = 100 %. Es una conversión mía; ningún benchmark revisado usa el porcentaje de ventana como eje. Si en Devin la ventana efectiva es menor (p. ej. 200K), los porcentajes cambian; habría que comprobarlo.

### 4-B. Generación actual: GraphWalks BFS (F1), calculado por Google
Fuente: https://deepmind.google/models/model-cards/gemini-4-argon/ (13-10-2026) y su metodología, https://deepmind.google/models/evals-methodology/gemini-4-argon/

| Modelo | Hasta 128K | 256K–1M | Caída |
|---|---|---|---|
| Gemini 4 Argon | 99.7 | 84.2 | −15.5 pp |
| GPT-6 Astra | 98.7 | 71.8 | −26.9 pp |
| Claude Fable 5.1 | 91.4 | 65.0 | −26.4 pp |
| Claude Opus 5.5 | 90.6 | 66.8 | −23.8 pp |

### 4-C. Datos autoinformados de OpenAI y Anthropic
- OpenAI MRCR v2, 8 agujas (https://openai.com/index/gpt-6-astra/):

| Modelo | 256K–512K | 512K–1M |
|---|---|---|
| GPT-6 Astra | 100.0 | 96.3 |
| GPT-5.6 Sol | 91.5 | 73.8 |

- GraphWalks (F1), ficha de Fable 5 y Mythos 5 (09-06-2026, https://www-cdn.anthropic.com/57a52ea7d8f0e54e8a542e908266086df425cdf5/Claude%20Fable%205%20&%20Claude%20Mythos%205%20System%20Card.pdf):

| Modelo | BFS 256K | BFS 1M | Parents 256K | Parents 1M |
|---|---|---|---|---|
| Claude Mythos 5 | 91.1 | 79.4 | 99.96 | 97.5 |
| Claude Mythos Preview | 85.7 | 74.3 | 99.9 | 95.5 |
| Claude Opus 4.8 | 85.9 | 68.1 | 99.3 | 83.3 |
| GPT-5.5 (xhigh, dato de OpenAI) | 73.7 | 45.4 | 90.1 | 58.5 |

### 4-D. «Solo lo relevante»: Chroma LongMemEval, ~300 frente a ~113K tokens (2025)
Fuente: https://www.trychroma.com/research/context-rot (gráficas `longmemeval/claude.png` y `longmemeval/gpt.png`)

| Modelo | Focused | Full |
|---|---|---|
| Claude Opus 4 (thinking) | 0.95 | 0.72 |
| Claude Opus 4 | 0.92 | 0.38 |
| Claude Sonnet 4 (thinking) | 0.95 | 0.71 |
| Claude Sonnet 4 | 0.89 | 0.38 |
| o3 (high) | 0.94 | 0.81 |
| GPT-4.1 | 0.87 | 0.62 |
| GPT-4o | 0.87 | 0.55 |

**No mezclar las tablas 4-A, 4-B y 4-C en una misma gráfica**: son benchmarks distintos (GDM-MRCR frente a OpenAI-MRCR frente a GraphWalks), con métricas, tramos y responsables de la medición diferentes.

---

## 5. Origen del gráfico antiguo («Figure 3: Context Rot Rate – How Models Lose Their Minds»)

- **No he encontrado el origen.** Busqué sin resultados en motores web los títulos exactos «Context Rot Rate», «How Models Lose Their Minds» y «Production Danger Zone», y combinaciones con Claude 2.1, GPT-4, Gemini y «context window utilization». Un artículo de Medium de abril de 2026 sobre la ventana de 200K de Claude, firmado por Hareem Fatima (https://medium.com/data-and-beyond/claudes-context-window-claims-200k-tokens-your-production-app-can-t-actually-use-them-7e5616fd090f), tiene muro de pago y no he podido comprobar si contiene esa figura.
- Indicios de que es **ilustrativo y no se basa en datos medidos**:
  1. **Eje X en «% de utilización de la ventana».** Ningún benchmark revisado (RULER, NoLiMa, MRCR, GraphWalks, Fiction.LiveBench, Chroma, NIAH) usa ese eje; todos usan tokens absolutos.
  2. **Una «Production Danger Zone» por encima del 75 %** no aparece en ninguna fuente primaria. Además, los datos actuales muestran que la caída empieza mucho antes: en Context Arena, al 13–26 % de una ventana de 1M (128K–256K), y en Sonnet 5 ya a 64K (≈6 %).
  3. **El trío Claude 2.1 / GPT-4 / «Gemini» corresponde a finales de 2023 y principios de 2024.** Los únicos datos públicos conocidos con exactamente esos modelos son las pruebas de aguja en un pajar de Greg Kamradt: GPT-4-128K el 08-11-2023 y Claude 2.1 el 21-11-2023 (https://github.com/gkamradt/LLMTest_NeedleInAHaystack). Son mapas de calor de tokens × profundidad, no curvas por % de ventana. Anthropic mostró después que el mal resultado de Claude 2.1 en esa prueba subía de 27 % a 98 % con un simple cambio de prompt (06-12-2023, https://claude.com/blog/claude-2-1-prompting). Eso hace todavía menos fiable una curva de «Claude 2.1 pierde la cabeza».
  4. Las curvas son suaves y no indican tamaño de muestra, intervalos de confianza ni benchmark.
- Recomendación: no usarlo, o mostrarlo solo como «gráfico conceptual» sin cifras.

---

## 6. Huecos y advertencias

- **No hay curva completa por longitud para Opus 5.5, Fable 5.1, Sonnet 5.5, Haiku 5.5, GPT-6 Astra, GPT-6/6.1 Sol ni Gemini 4 Argon** en ninguna fuente pública revisada. Para ellos solo hay los dos puntos de 4-B (calculados por Google) y los de 4-C (autoinformados). Context Arena todavía no los ha evaluado (14-10-2026).
- Las fichas de Anthropic de la generación 5.x solo reportan ProgramBench (agregado, sin desglose por longitud).
- Benchmarks sintéticos (MRCR, GraphWalks, NIAH) frente a tareas reales: la caída depende mucho de la tarea. En comprensión de ficción (Fiction.LiveBench) los mejores modelos de principios de 2026 casi no caen hasta 192K, y en recuperación con distractores (MRCR de 8 agujas) caen con fuerza a partir de 128–256K.
- El nivel de razonamiento importa: con más thinking se degrada menos (Context Arena; Classifier Context Rot). Hay que indicar siempre con qué nivel se midió.
- Las cifras de los fabricantes son autoinformadas y cada uno elige el benchmark que le conviene. Ejemplo: Astra saca 96,3 % en el MRCR de OpenAI a 512K–1M, pero 71,8 % en el GraphWalks de Google a 256K–1M.
- La captura de Context Arena incluye la interfaz de la web. Para la diapositiva conviene redibujar con el design system (colores mediante `var(--color-…)`, según CLAUDE.md) y citar: «Fuente: Context Arena (contextarena.ai), GDM-MRCR v2 8 agujas, datos consultados el 14-10-2026».
