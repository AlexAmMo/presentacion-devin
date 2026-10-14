# Modelos de OpenAI y Anthropic: tiers equivalentes, modelos en Devin y gráficas coste–rendimiento (a 2026-10-14)

Todas las fuentes se consultaron el 2026-10-14. Las páginas de documentación se descargaron como Markdown cuando el sitio lo ofrece (`developers.openai.com/...md`, `platform.claude.com/docs/...md`, `docs.devin.ai/...md`). Las gráficas de Anthropic y Cognition son SVG interactivos, no imágenes estáticas. Las capturé con Chrome headless en su estado final, sin animación y sin el banner de cookies. Los datos numéricos de las gráficas de Anthropic están incrustados en el HTML de cada post (CSV `series,x,y,label`) y los extraje de ahí.

**Etiquetas de evidencia:**
- **[PRIMARIA]**: página oficial de OpenAI, Anthropic, Cognition/Devin o del publicador del benchmark.
- **[SECUNDARIA]**: prensa o blogs de terceros. No está confirmado en la fuente primaria.
- **[INFERENCIA]**: razonamiento mío a partir de las fuentes citadas al lado.
- **[NO VERIFICADO]**: no lo pude comprobar.

**Limitación importante:** `openai.com` (blog y `openai.com/api/pricing`) devuelve 403 o una página de Cloudflare («Un momento…») tanto a curl como a Chrome headless. Los posts de lanzamiento de OpenAI (`openai.com/index/gpt-6-astra/`, `openai.com/index/introducing-gpt-6-1-sol/`) **no se han podido leer**. Todo lo de OpenAI sale de la documentación para desarrolladores, que es primaria: modelos, precios y changelog.

---

## 0. Resumen

- **OpenAI.** La generación actual es **GPT-6**. GPT-6 Astra salió el 2026-09-03, GPT-6 Sol y GPT-6 Luna el 2026-09-22, y GPT-6.1 Sol el 2026-09-29.
  - Tiers de mayor a menor capacidad: **Astra > Sol > (Terra) > Luna**.
  - **Terra solo existe en GPT-5.6.** No hay GPT-6 Terra ni en el catálogo ni en la tabla de precios.
  - El trío que recomienda OpenAI hoy es GPT-6 Astra, GPT-6.1 Sol y GPT-6 Luna.
- **Anthropic.** La generación actual es **Claude 5.5**, más Fable 5.1:
  - Fable 5.1 (2026-09-01)
  - Opus 5.5 (2026-09-22)
  - Sonnet 5.5 (2026-09-28)
  - Haiku 5.5 (2026-10-07)

  Mythos 5.1 existe con acceso limitado.
- **Mapeo por precio con la generación actual:**

  | OpenAI | Anthropic | Precio input/output por 1M tokens |
  |---|---|---|
  | GPT-6 Astra | Fable 5.1 | $10/$50 en ambos |
  | GPT-6 / 6.1 Sol | Sonnet 5.5 | $2/$10 en ambos |
  | GPT-6 Luna | Haiku 5.5 | $0,10/$0,50 en ambos |

  **Opus 5.5 ($4/$20) no tiene un equivalente GPT-6 exacto.** Por precio coincide con GPT-5.6 Sol (precio promocional, $4/$20).
- **El mapeo «Sol ↔ Opus» solo vale para la generación GPT-5.6.** En GPT-6, Sol tiene el precio de Sonnet, y la propia Anthropic compara Sonnet 5.5 con GPT-6 Sol.
- **Gráfica recomendada:** la de Terminal-Bench 4.0 «Accuracy vs Cost» del post de lanzamiento de Claude Opus 5.5 (Anthropic, 2026-09-22).
  - Tiene una línea por modelo (Opus 5.5, Fable 5.1, Opus 5, GPT-6 Astra y GPT-5.6 Sol) con 5 puntos de esfuerzo: Low, Med, High, Xhigh y Max.
  - Como complemento más reciente y más neutral, está el leaderboard FrontierCode de Cognition, actualizado el 2026-10-13. Incluye los 4 tiers Claude 5.x, GPT-6 Astra, GPT-6.1 Sol, GPT-6 Sol, GPT-6 Luna y SWE-2.

---

## 1. OpenAI: tiers y generaciones

### 1.1 Nombres de tier y orden

- La doc «Using GPT-6» ordena así la familia [PRIMARIA] ([Using GPT-6](https://developers.openai.com/api/docs/guides/latest-model)):
  - **GPT-6 Astra**: «Highest intelligence».
  - **GPT-6.1 Sol**: «Balanced speed, cost, and intelligence… Near-Astra performance for complex work at a lower cost».
  - **GPT-6 Luna**: «Fastest and most cost-effective».
- El catálogo de modelos dice [PRIMARIA] ([Models](https://developers.openai.com/api/docs/models)):
  - «use GPT-6 Astra, our flagship model… Choose GPT-6.1 Sol to balance intelligence and cost, or GPT-6 Luna for cost-sensitive, high-volume workloads».
  - En la generación GPT-5.6 aparecen tres modelos: «GPT-5.6 Sol: flagship model», «GPT-5.6 Terra: balances intelligence and cost» y «GPT-5.6 Luna: optimized for cost-sensitive workloads».
- **Orden de mayor a menor capacidad: Astra > Sol > Terra > Luna.** Astra aparece en GPT-6. En GPT-5.6 el tope era Sol. [PRIMARIA + INFERENCIA]
- **No existe «GPT-6 Terra»**: no figura en el catálogo, en precios ni en el changelog [PRIMARIA, por ausencia] ([Models](https://developers.openai.com/api/docs/models), [Pricing](https://developers.openai.com/api/docs/pricing)).
- Hay reportes de que **GPT-6.1 Astra** se canceló por motivos de seguridad. Según The Batch, citando al WSJ: «The Wall Street Journal reported that OpenAI scrapped the release…». [SECUNDARIA] ([The Batch, 2026-10-09](https://www.deeplearning.ai/the-batch/sol-nearly-eclipses-astra), [ProPakistani](https://propakistani.pk/2026/09/30/gpt-6-1-sol-brings-astra-level-performance-at-5x-lower-cost/))
- Se ha reportado una configuración «GPT-6-Astra-Pro» para planes de ChatGPT. No aparece en la API. [SECUNDARIA / NO VERIFICADO] ([orcarouter](https://www.orcarouter.ai/blog/gpt-6-astra-pro-rollout))

### 1.2 Cronología (changelog oficial de la API)

Fuente: [Changelog de la API de OpenAI](https://developers.openai.com/api/docs/changelog) [PRIMARIA].

| Fecha | Evento |
|---|---|
| 2026-07-09 | Se lanza la familia **GPT-5.6**: Sol («frontier capability»), Terra («balance of intelligence and cost») y Luna («efficient, high-volume»). El alias `gpt-5.6` apunta a `gpt-5.6-sol`. |
| 2026-07-30 | Luna baja un 80 % y Terra un 20 %. «Fast mode» sustituye a Priority Processing. |
| 2026-08-21 | «GPT-5.6 Sol now costs $4 per million input tokens and $20 per million output tokens… promotional pricing is available at least through November 21, 2026». |
| 2026-09-03 | Se lanza **GPT-6 Astra**: «our most capable model, built for the hardest end-to-end work». |
| 2026-09-22 | Se lanzan **GPT-6 Sol** (`gpt-6-sol`) y **GPT-6 Luna** (`gpt-6-luna`). |
| 2026-09-29 | Se lanza **GPT-6.1 Sol** (`gpt-6.1-sol`), «at a lower cost than GPT-6 Astra». Se añade Ultrafast mode para Astra. |

- El precio de lanzamiento de GPT-5.6 Sol era **$5/$30**. Lo deduzco del recorte del 20 % en input y del 33 % en output hasta $4/$20. [INFERENCIA, coincide con la [SECUNDARIA](https://lmmarketcap.com/reports/gpt-5-6-sol-terra-luna)]

### 1.3 Niveles de esfuerzo (reasoning.effort)

- **GPT-6.1 Sol:** `low`, `medium` (por defecto), `high`, `xhigh`, `max`. No admite `none` ni `minimal`. [PRIMARIA] ([GPT-6.1 Sol](https://developers.openai.com/api/docs/models/gpt-6.1-sol))
- **GPT-6 Astra:** `low`, `medium`, `high`, `xhigh`, `max`. [PRIMARIA] ([GPT-6 Astra](https://developers.openai.com/api/docs/models/gpt-6-astra))
- **GPT-6 Sol y GPT-6 Luna:** `none`, `low`, `medium` (por defecto), `high`, `xhigh`, `max`. [PRIMARIA] ([GPT-6 Sol](https://developers.openai.com/api/docs/models/gpt-6-sol), [GPT-6 Luna](https://developers.openai.com/api/docs/models/gpt-6-luna))

### 1.4 Precios de lista (Standard, prompts de hasta 272K tokens, USD por 1M tokens)

Fuente: [developers.openai.com/api/docs/pricing](https://developers.openai.com/api/docs/pricing), consultada el 2026-10-14 [PRIMARIA].

| Modelo | Tier | Input | Cached input | Cache write | Output | Long context (>272K) in / cached / out |
|---|---|---|---|---|---|---|
| `gpt-6-astra` | Astra (GPT-6) | $10,00 | $1,00 | $12,50 | $50,00 | $20 / $2 / $75 |
| `gpt-6.1-sol` | Sol (GPT-6.1) | $2,00 | $0,10 | $2,50 | $10,00 | $4 / $0,20 / $15 |
| `gpt-6-sol` | Sol (GPT-6) | $2,00 | $0,20 | $2,50 | $10,00 | $4 / $0,40 / $15 |
| `gpt-6-luna` | Luna (GPT-6) | $0,10 | $0,01 | $0,125 | $0,50 | $0,20 / $0,02 / $0,75 |
| `gpt-5.6-sol` | Sol (GPT-5.6) | $4,00 (promo) | $0,40 | $5,00 | $20,00 (promo) | $8 / $0,80 / $30 |
| `gpt-5.6-terra` | Terra (GPT-5.6) | $2,00 | $0,20 | $2,50 | $12,00 | $4 / $0,40 / $18 |
| `gpt-5.6-luna` | Luna (GPT-5.6) | $0,20 | $0,02 | $0,25 | $1,20 | $0,40 / $0,04 / $1,80 |

- Los modos Batch y Flex cuestan el 50 % de Standard. Fast mode cuesta el doble («twice the price»). [PRIMARIA] ([Pricing](https://developers.openai.com/api/docs/pricing), [Changelog 2026-07-30](https://developers.openai.com/api/docs/changelog))

---

## 2. Anthropic: tiers y generaciones

### 2.1 Gama actual

Fuente: [Models overview](https://platform.claude.com/docs/en/models/overview) [PRIMARIA].

| Modelo | API ID | Lanzamiento | Descripción oficial | Esfuerzo por defecto |
|---|---|---|---|---|
| Claude Fable 5.1 | `claude-fable-5-1` | 2026-09-01 ([ficha](https://platform.claude.com/docs/en/models/fable-5-1/overview)) | «For demanding reasoning and long-horizon agentic work» | `high` |
| Claude Opus 5.5 | `claude-opus-5-5` | 2026-09-22 ([post](https://www.anthropic.com/news/claude-opus-5-5)) | «For long-running agentic coding and knowledge work» | `medium` |
| Claude Sonnet 5.5 | `claude-sonnet-5-5` | 2026-09-28 ([ficha](https://platform.claude.com/docs/en/models/sonnet-5-5/overview), [post](https://www.anthropic.com/news/claude-sonnet-5-5)) | «The best combination of speed and intelligence» | `high` |
| Claude Haiku 5.5 | `claude-haiku-5-5` | 2026-10-07 ([ficha](https://platform.claude.com/docs/en/models/haiku-5-5/overview), [post](https://www.anthropic.com/news/claude-haiku-5-5)) | «For high-volume, latency-sensitive tasks such as classification, extraction, and routing» | `medium` |

- La doc recomienda: «start with Claude Opus 5.5 for most workloads. Use Claude Fable 5.1 for demanding reasoning and long-horizon agentic work, or when your evals on Claude Opus 5.5 at higher effort still fall short». [PRIMARIA] ([Models overview](https://platform.claude.com/docs/en/models/overview))
- **Orden de capacidad:** Fable > Opus > Sonnet > Haiku. Lo deduzco de las descripciones, la latencia («Slower / Moderate / Fast / Fastest») y el precio. [PRIMARIA + INFERENCIA]
- También existe **Claude Mythos 5.1**, de acceso limitado a organizaciones verificadas. Tiene el mismo precio que Fable 5.1. [PRIMARIA] ([Pricing](https://platform.claude.com/docs/en/about-claude/pricing))
- **Niveles de esfuerzo:** «Low, Medium (default), High, Xhigh, and Max» para Opus 5.5. El thinking ya no se puede desactivar. [PRIMARIA] ([post de Opus 5.5](https://www.anthropic.com/news/claude-opus-5-5))
- **Generación anterior:**
  - Claude Sonnet 5: 2026-06-30 ([post](https://www.anthropic.com/news/claude-sonnet-5))
  - Claude Opus 5: 2026-07-24 ([post](https://www.anthropic.com/news/claude-opus-5))
  - Fable 5, Opus 4.8 y Haiku 4.5 siguen en la tabla de precios. [PRIMARIA]
- Comprobación de lo que daba por supuesto el usuario:
  - «Opus 5.5 launched 2026-09-22»: ✔
  - «Fable 5.1?»: ✔, es del 2026-09-01.
  - El tier Fable existe en 5 y 5.1. No existe «Fable 5.5».

### 2.2 Precios de lista (USD por 1M tokens)

Fuente: [platform.claude.com/docs/en/about-claude/pricing](https://platform.claude.com/docs/en/about-claude/pricing) [PRIMARIA].

| Modelo | Input | Cache write 5 min | Cache write 1 h | Cache read (hits) | Output |
|---|---|---|---|---|---|
| Claude Fable 5.1 | $10 | $12,50 | $20 | $0,25 (0,025×) | $50 |
| Claude Mythos 5.1 (acceso limitado) | $10 | $12,50 | $20 | $0,25 | $50 |
| Claude Opus 5.5 | $4 | $5 | $8 | $0,20 (0,05×) | $20 |
| Claude Sonnet 5.5 | $2 | $2,50 | $4 | $0,10 (0,05×) | $10 |
| Claude Haiku 5.5 (prompt ≤100K tokens) | $0,10 | $0,125 | $0,20 | $0,01 | $0,50 |
| Claude Haiku 5.5 (prompt >100K tokens) | $0,50 | $0,625 | $1 | $0,05 | $2,50 |
| *Ref.: Claude Opus 5* | $5 | $6,25 | $10 | $0,50 | $25 |
| *Ref.: Claude Sonnet 5* | $2 | $2,50 | $4 | $0,20 | $10 |

- Batch cuesta un 50 % menos. Fast mode de Opus 5.5 cuesta $8/$40. [PRIMARIA] ([Models overview](https://platform.claude.com/docs/en/models/overview), [post de Opus 5.5](https://www.anthropic.com/news/claude-opus-5-5))

---

## 3. Tabla de tiers equivalentes y evaluación del mapeo propuesto

### 3.1 Comparación directa con la generación actual (precios Standard, contexto corto)

| Nivel | OpenAI | In / Cache read / Out | Anthropic | In / Cache read / Out | Encaje |
|---|---|---|---|---|---|
| Máximo | **GPT-6 Astra** | $10 / $1,00 / $50 | **Claude Fable 5.1** | $10 / $0,25 / $50 | Precio de input y output **idéntico**. También coincide el cache write ($12,50). |
| Alto / «caballo de batalla» | *(no hay GPT-6 a este precio)*. GPT-5.6 Sol (gen. anterior, precio promo) | $4 / $0,40 / $20 | **Claude Opus 5.5** | $4 / $0,20 / $20 | Por precio, solo coincide con GPT-5.6 Sol. Por rendimiento, Anthropic lo compara con **GPT-6 Astra** (ver §5). |
| Medio | **GPT-6.1 Sol** / GPT-6 Sol | $2 / $0,10 (6.1) o $0,20 (6) / $10 | **Claude Sonnet 5.5** | $2 / $0,10 / $10 | Precio **idéntico**. Anthropic compara Sonnet 5.5 directamente con GPT-6 Sol. |
| Económico | **GPT-6 Luna** | $0,10 / $0,01 / $0,50 | **Claude Haiku 5.5** (≤100K) | $0,10 / $0,01 / $0,50 | Precio **idéntico**. Anthropic compara Haiku 5.5 directamente con GPT-6 Luna. |
| *(solo GPT-5.6)* | GPT-5.6 Terra | $2 / $0,20 / $12 | Claude Sonnet 5 / 5.5 | $2 / $0,20 o $0,10 / $10 | Por precio y posicionamiento («balance»), Terra ≈ Sonnet. |

Fuentes:
- Precios: [OpenAI Pricing](https://developers.openai.com/api/docs/pricing) y [Claude Pricing](https://platform.claude.com/docs/en/about-claude/pricing).
- Qué modelos compara Anthropic en cada post (series de las gráficas): [Opus 5.5](https://www.anthropic.com/news/claude-opus-5-5), [Sonnet 5.5](https://www.anthropic.com/news/claude-sonnet-5-5) y [Haiku 5.5](https://www.anthropic.com/news/claude-haiku-5-5).
  - Opus 5.5 frente a GPT-6 Astra y GPT-5.6 Sol.
  - Sonnet 5.5 frente a GPT-6 Sol y GPT-5.6 Sol.
  - Haiku 5.5 frente a GPT-6 Luna.

[PRIMARIA]

### 3.2 Evaluación del mapeo del usuario (Astra ↔ Fable, Sol ↔ Opus, Terra ↔ Sonnet, Luna ↔ Haiku)

- **Astra ↔ Fable: razonable.** Ambos son el tope de su gama y tienen el mismo precio, $10/$50. [PRIMARIA + INFERENCIA]
- **Luna ↔ Haiku: razonable.** Tienen el mismo precio en GPT-6 / Claude 5.5 ($0,10/$0,50) y Anthropic pone a GPT-6 Luna como rival de Haiku 5.5 en sus gráficas. [PRIMARIA + INFERENCIA]
- **Sol ↔ Opus: solo es correcto para la generación GPT-5.6.**
  - Al lanzarse, GPT-5.6 Sol costaba $5/$30 y Opus 5 $5/$25. Hoy GPT-5.6 Sol cuesta $4/$20 en promoción, igual que Opus 5.5.
  - **En GPT-6, Sol cuesta lo mismo que Sonnet 5.5 ($2/$10)**, y la propia Anthropic enfrenta Sonnet 5.5 a GPT-6 Sol.
  - A su favor: OpenAI vende GPT-6.1 Sol como «near-Astra performance». En FrontierCode 1.1, GPT-6.1 Sol saca 50,2 % y queda entre Sonnet 5.5 (52,1 %) y Haiku 5.5 (46,4 %), por debajo de Opus 5.5 (54,6 %) ([leaderboard FrontierCode](https://cognition.com/frontiercode)).
  - [PRIMARIA + INFERENCIA]
- **Terra ↔ Sonnet: razonable solo en GPT-5.6.** No hay GPT-6 Terra. [PRIMARIA]
- **Propuesta para la diapositiva** [INFERENCIA]:
  - Mostrar dos filas, una por generación, o la fila actual: **Astra ↔ Fable · Sol ↔ Sonnet · Luna ↔ Haiku**, con **Opus 5.5 entre Astra y Sol** (a $4/$20 no tiene par en GPT-6).
  - Añadir la nota de que los nombres no son una escala universal, como ya advierte el guion en la §3.

---

## 4. Modelos disponibles en Devin

### 4.1 `docs.devin.ai/cli/models` (Devin CLI)

Fuente: [Models](https://docs.devin.ai/cli/models) [PRIMARIA].

- No lista modelos concretos. Dice que dan soporte a «the latest and greatest models from Anthropic, OpenAI, Google, and Cognition within minutes of their launch» y a modelos abiertos («DeepSeek, Kimi, and GLM»).
- Nombres cortos: «`opus`, `sonnet`, `swe`, `codex`, and `gemini` always resolve to the latest version in that model family». En los consejos también aparece `gpt`: «At minimum we recommend trying `swe`, `gpt`, and `opus`».
- Esfuerzo: «Some models support configurable reasoning levels… cycle the thinking level with Alt+T (macOS: Opt+T)». La página no dice qué niveles hay.
- El ejemplo de configuración usa `"model": "swe-1-6-fast"`. No dice que sea el modelo por defecto.
- No habla de precios ni de ACUs.
- Recomienda **Fusion** («pairing a frontier lead model with a cost-efficient sidekick»).
- **Fusion** ([Fusion CLI](https://docs.devin.ai/cli/fusion)) [PRIMARIA]:
  - «Start with Fable 5.1 + SWE-2. This is our recommended pairing».
  - Cada modelo se cobra a su propia tarifa. En Enterprise se mide en ACUs.
  - No está disponible en planes legacy de créditos.
- **Adaptive** ([Adaptive](https://docs.devin.ai/cli/adaptive)) [PRIMARIA]:
  - Es un router. En self-serve tiene tarifa fija: $0,50 input, $2,00 output y $0,10 cache read por 1M tokens.
  - En Enterprise «ACU consumption scales with the tokens used and the model selected».

### 4.2 Tabla completa del selector: `docs.devin.ai/desktop/models`

Fuente: [AI Models (Devin Desktop)](https://docs.devin.ai/desktop/models) [PRIMARIA].

La página dice: «The following models are available in Devin Desktop and Devin CLI», con una pestaña «Enterprise (ACUs)». Los datos están incrustados en la página (`modelCostData`). Estos son los de la generación actual:

**«Recommended» (marcados `is_recommended`, en self-serve y en Enterprise):**
- Adaptive
- Claude Fable 5.1 Medium
- Claude Opus 5.5 Medium
- Claude Sonnet 5.5 Medium
- GPT-6 Astra Medium
- GPT-6 Sol Medium
- GPT-6 Luna Medium
- Gemini 4 Argon Medium
- Kimi K3 High
- GLM-5.2 High (en self-serve también GLM-5.3 Low/High/Max)
- SWE-2 High
- SWE-1.7 Lightning Max

**Familias actuales con variantes de esfuerzo y precio** (Enterprise, USD por 1M tokens: input / output / cache read):

| Familia en Devin | Variantes de esfuerzo | Precio en Devin | Nota |
|---|---|---|---|
| Claude Fable 5.1 | Low, Medium, High, XHigh, Max | $10 / $50 / $0,25 | |
| Claude Opus 5.5 | Low, Medium, High, XHigh, Max, cada una también «Fast» | $4 / $20 / $0,20. Fast: $8 / $40 / $0,40 | |
| Claude Sonnet 5.5 | Low, Medium, High, XHigh, Max | $2 / $10 / $0,20 | El cache read figura a $0,20 en Devin. Anthropic lista $0,10. |
| GPT-6 Astra | Low, Medium, High, XHigh, Max, y versión «Fast» | $10 / $50 / $1. Fast: $20 / $100 / $2 | |
| GPT-6.1 Sol | Low, Medium, High, XHigh, Max, y versión «Fast» | $2 / $10 / $0,10 | |
| GPT-6 Sol | No Thinking, Low, Medium, High, XHigh, Max, y versión «Fast» | $2 / $10 / $0,20 | |
| GPT-6 Luna | No Thinking, Low, Medium, High, XHigh, Max, y versión «Fast» | $0,10 / $0,50 / $0,01 | |
| GPT-5.6 Sol / Terra / Luna | No Thinking, Low a Max, y versión «Fast» | $4/$20 · $2/$12 · $0,20/$1,20 | Generación anterior |
| SWE-2 (Cognition) | Medium, High, Max | Enterprise: $0,75 / $3,75 / $0,075 | «SWE-2 is 75% off list price ($3.00/1M input, $15.00/1M output, $0.30/1M cache input) through December 31, 2026». En self-serve: «free… through October 15, 2026». |
| SWE-1.7 / SWE-1.7 Lightning | Medium, Max | $0,50 / $2,50 · Lightning $2,50 / $12,50 | Lightning «runs on Cerebras» |
| SWE-1.6 / SWE-1.6 Fast | — | $0,50 / $2,50 (self-serve) | Generación anterior |
| Gemini 4 Argon | Low, Medium, High | Enterprise $4 / $20. Self-serve en promo $2 / $10 | Promos hasta el 2026-10-27 y el 2026-12-01 |
| Otros | — | — | Gemini 3.5–3.8 Flash, Grok 4.5–4.7, Kimi K3 / K2.6 / K2.7, GLM-5.2 / 5.3, DeepSeek V4 / V4.1, Inkling (Thinking Machines), Nemotron 3 Ultra, GPT-5.x y Claude 4.x heredados |

- **Modelos propios de Cognition** («SWE model family of in-house frontier models»):
  - `SWE-2`: «latest… Medium, High, and Max reasoning effort».
  - `SWE-1.7`, `SWE-1.7 Lightning`, `SWE-1.6` y `SWE-1.6 Fast`.
  - `SWE-1-mini`: el de Tab.
  - `swe-grep`: el de Fast Context.
  - `swe-check`: el de Quick Review.

  [PRIMARIA] ([AI Models](https://docs.devin.ai/desktop/models))
- **No aparece Claude Haiku 5.5** en la tabla de Devin a 2026-10-14. Solo está Claude Haiku 4.5 ($1/$5). Tampoco aparece Mythos. [PRIMARIA, por ausencia]
- La tabla también tiene un campo `credit_multiplier` (por ejemplo, Opus 5.5 Medium ×80 y GPT-6 Astra Medium ×50). Parece aplicarse a la pestaña «Legacy enterprise (credits)». No lo usaría para comparar costes. [INFERENCIA]
- **Devin Web (cloud):** el 2026-09-23 el selector de capacidades pasó a nombrar los modelos:
  - «Ultra reads "Highest intelligence available with Fable 5.1 and GPT-6 Astra"».
  - «Normal lists Fable 5.1, Opus 5 and GPT-6 Astra».

  [PRIMARIA] ([Release notes 2026](https://docs.devin.ai/release-notes/2026))

### 4.3 Facturación y ACUs

- Enterprise: «billed in Agent Compute Units (ACUs) at the rate set in their order form. Contact sales for pricing». No hay un precio público del ACU. [PRIMARIA] ([Enterprise billing](https://docs.devin.ai/admin/billing/enterprise))
- Self-serve [PRIMARIA] ([Self-serve plans](https://docs.devin.ai/admin/billing/self-serve)):
  - Free.
  - Pro: $20/mes.
  - Max: $200/mes.
  - Teams: mínimo $80/mes, con asientos completos a $40.
- «Your quota and extra usage is billed based on the token cost of the model you select». [PRIMARIA] ([AI Models](https://docs.devin.ai/desktop/models))
- **[NO VERIFICADO]** El guion dice: «coste total en ACUs ≈ coste en tokens + 20 %». No he encontrado ese +20 % en la documentación pública de Devin.

---

## 5. Gráficas coste–rendimiento

### 5.1 Candidatas evaluadas

| # | Publicador (tipo) | Fecha | URL | Benchmark | Modelos (y esfuerzos) | ¿Cumple? (Claude 5.5 + GPT-6) |
|---|---|---|---|---|---|---|
| A | **Anthropic** (proveedor). Post de lanzamiento de Claude Opus 5.5 | 2026-09-22 | https://www.anthropic.com/news/claude-opus-5-5 | 6 gráficas «Accuracy vs Cost», eje X logarítmico. **Terminal-Bench 4.0**, FrontierCode v1.1 main, CursorBench 4.0, GDPval-AA v2.1 (Elo), AutomationBench y WANDR | Opus 5.5, Fable 5.1, Opus 5, **GPT-6 Astra** y GPT-5.6 Sol, cada uno con Low/Med/High/Xhigh/Max. CursorBench no incluye Astra. WANDR solo incluye Claude. | **Sí** |
| B | **Anthropic** (proveedor). Post de Claude Sonnet 5.5 | 2026-09-28 | https://www.anthropic.com/news/claude-sonnet-5-5 | Terminal-Bench 4.0, FrontierCode v1.1, CursorBench 4.0 y AA-Briefcase v1.1 | Sonnet 5.5, Opus 5.5 y Sonnet 5. **GPT-6 Sol** en FrontierCode y AA-Briefcase. GPT-5.6 Sol en TB4 y CursorBench. 5 esfuerzos. | **Sí** (Sonnet ↔ Sol) |
| C | **Anthropic** (proveedor). Post de Claude Haiku 5.5 | 2026-10-07 | https://www.anthropic.com/news/claude-haiku-5-5 | OSWorld 2.1 (subconjunto offline), GDPval-AA v2.1, HLE (sin herramientas) y Terminal-Bench 4.0 | Haiku 5.5, Haiku 4.5 y Sonnet 5.5. **GPT-6 Luna** en OSWorld y GDPval-AA. 5 esfuerzos. | **Sí** (Haiku ↔ Luna) |
| D | **Cognition** (tercero respecto a OpenAI y Anthropic, pero es el fabricante de Devin y de SWE-2). Leaderboard FrontierCode | Changelog actualizado el **2026-10-13** | https://cognition.com/frontiercode | FrontierCode 1.1 Main, «Score vs Cost», eje X logarítmico, «avg cost (USD) per rollout» | 46 modelos. Por defecto se ven 13: Opus 5.5, Fable 5, Opus 5, GPT-6 Astra, Sonnet 5.5, Fable 5.1, GPT-6.1 Sol, SWE-2, GPT-6 Sol, Grok 4.6, Haiku 5.5, Kimi K3 y Gemini 3.7 Flash. «Each line connects a model's runs across reasoning efforts». | **Sí** (la más reciente) |
| E | **OpenAI** (proveedor). Post de GPT-6.1 Sol (DevDay) | 2026-09-29 | https://openai.com/index/introducing-gpt-6-1-sol/ (URL según [The Batch](https://www.deeplearning.ai/the-batch/sol-nearly-eclipses-astra)) | Según DataCamp: AutomationBench, GDP.pdf y Terminal-Bench Science 0.1, con coste por tarea | GPT-6.1 Sol frente a «Opus 5.5 w/ fallbacks» | **[NO VERIFICADO]**: openai.com bloquea el acceso (403). Solo hay descripción [SECUNDARIA] en [DataCamp](https://www.datacamp.com/blog/gpt-6-1-sol-vs-opus-5-5). |
| F | **Datacurve** (tercero). Leaderboard DeepSWE v1.1 | La portada dice «updated September 22, 2026». La última entrada del changelog es del 2026-09-03 (GPT-6 Astra). | https://deepswe.datacurve.ai/ · https://deepswe.datacurve.ai/changelog | DeepSWE v1.1, pass@1 frente a coste medio por tarea, con modo «All effort levels» | gpt-6-astra, claude-opus-5, claude-fable-5, gpt-5.6-sol/terra/luna… **Sin modelos Claude 5.5**, sin GPT-6 Sol/Luna/6.1 Sol y sin Fable 5.1. | **No** |
| G | **Cognition** (tercero). Post de SWE-2 | 2026-09-10 | https://cognition.com/blog/swe-2 | Frontera coste–rendimiento en FrontierCode 1.1 Main y DeepSWE 1.1 | SWE-2, Kimi K3, Grok 4.6, Fable 5.1, GPT-5.6 Sol, GPT-6 Astra y SWE-1.7 | **No**: es anterior a Claude 5.5. |
| H | **Artificial Analysis** (tercero) | Continua | https://artificialanalysis.ai/ | Intelligence Index y «Cost to Run» | Según The Batch: Opus 5.5 = 58, Sonnet 5.5 = 56, GPT-6 Astra = 53 y GPT-6.1 Sol (max) = 52, con $0,72 por tarea frente a $3,26 de Astra. | No descargada. Es un punto por variante y no una línea por esfuerzo. Datos [SECUNDARIA] vía [The Batch](https://www.deeplearning.ai/the-batch/sol-nearly-eclipses-astra). |

**Sobre la gráfica antigua del usuario** («Cost–Performance Frontiers · Upper-left is better · marker size shows DeepSWE score per dollar», con gpt-5.6-sol/terra/luna, claude-fable-5, claude-opus-4.8 y claude-sonnet-5):
- Los identificadores en minúsculas (`gpt-5.6-sol`, `claude-opus-4.8`, `claude-fable-5`…) siguen exactamente la nomenclatura del leaderboard **DeepSWE de Datacurve**, y esos modelos se añadieron allí en junio y julio de 2026 ([changelog](https://deepswe.datacurve.ai/changelog)). Por eso es muy probable que la gráfica use datos de DeepSWE. [INFERENCIA]
- **[NO VERIFICADO]** No encontré la frase «Upper-left is better / marker size shows DeepSWE score per dollar» en deepswe.datacurve.ai (ni en el HTML ni en sus bundles JS) ni en el blog de Cognition. El autor exacto de esa gráfica sigue sin identificar.
- **No hay versión nueva de DeepSWE con Claude 5.5.** A 2026-10-14 no ha añadido ningún modelo Claude 5.5 ni GPT-6 Sol/Luna/6.1 Sol. [PRIMARIA, por ausencia]

### 5.2 Imágenes descargadas

Carpeta: `/Users/ton/Desktop/Presentacion/referencias/graficas/`. Son capturas de las gráficas publicadas (SVG interactivo) renderizadas con Chrome headless a 2×. Las abrí todas con Read para comprobarlas.

1. **`coste-rendimiento_anthropic-opus55-terminalbench4_2026-09.png`** (RECOMENDADA)
   - Fuente: https://www.anthropic.com/news/claude-opus-5-5 (Anthropic, 2026-09-22). Pestaña «Agentic terminal coding».
   - Título: «Terminal-Bench 4.0 · Accuracy vs Cost».
   - Ejes: Y = «Score (%)» de 0 a 70. X = «Cost per attempt (USD, log scale)» de 2 a 20.
   - Una línea por modelo con 5 puntos (Low, Med, High, Xhigh, Max). Leyenda: Opus 5.5 (naranja), Fable 5.1 (verde), Opus 5 (amarillo), GPT-6 Astra (gris oscuro) y GPT-5.6 Sol (gris claro).
   - Lo que se ve: Opus 5.5 queda arriba a la izquierda (más rendimiento por menos coste). GPT-6 Astra está entre 50 % y 58 % y cuesta de $5 a $10. Fable 5.1 y Opus 5 son más caros y rinden menos. GPT-5.6 Sol queda abajo.
   - Pie de la gráfica: «Opus 5.5 at default effort beats Opus 5 at max effort for about a fifth of the cost. It matches GPT-6 Astra at about 40% of the cost.»
   - Aviso del propio post: «GPT-6 Astra and GPT-5.6 Sol figures are as reported by OpenAI»; Claude se ejecuta con el harness de Claude Code.
2. **`coste-rendimiento_anthropic-opus55-frontiercode_2026-09.png`**
   - Mismo post, pestaña «Agentic coding: FrontierCode».
   - Título: «FrontierCode v1.1, main set · Accuracy vs Cost».
   - Ejes: Y de 35 % a 55 % (con corte en el eje). X = «Cost per task (USD, log scale)» de $0,50 a $10.
   - Mismos 5 modelos y 5 esfuerzos.
   - Lo que se ve: Opus 5.5 en Medium (54,6 %, unos $0,80) supera el mejor punto de GPT-6 Astra (Max, 53,3 %, unos $4,36). Es la misma métrica que el leaderboard de Cognition, así que sirve para cruzar datos.
3. **`coste-rendimiento_cognition-frontiercode-leaderboard-tiers_2026-10.png`** (la más reciente y la que cubre todos los tiers)
   - Fuente: https://cognition.com/frontiercode (Cognition, changelog del 2026-10-13).
   - Título: «FrontierCode 1.1 Main · Score vs Cost».
   - Ejes: X logarítmico, «avg cost (USD) per rollout», de $0,02 a $20. Y = «Score (%)» de 25 a 55.
   - **Es una vista filtrada por mí** con el selector de modelos de la propia página: Fable 5.1, Opus 5.5, Sonnet 5.5, Haiku 5.5, GPT-6 Astra, GPT-6.1 Sol, GPT-6 Luna y SWE-2.
   - Colores por proveedor: Anthropic en naranja, OpenAI en verde y Cognition (SWE-2) en azul. Las etiquetas de modelo están al final de cada línea. **No etiqueta cada nivel de esfuerzo**; la tabla 5.3 da los valores.
   - Leyenda del publicador: «Each line connects a model's runs across reasoning efforts. The most efficient models sit top-left. The x axis uses a log scale.»
   - **Extra:** `extra/coste-rendimiento_cognition-frontiercode-leaderboard-default_2026-10.png` es la vista por defecto del publicador, con 13 modelos (añade Fable 5, Opus 5, GPT-6 Sol, Grok 4.6, Kimi K3 y Gemini 3.7 Flash).

Otros extras (en `extra/`), también comprobados con Read:
- **`coste-rendimiento_anthropic-sonnet55-frontiercode_2026-09.png`**
  - Fuente: post de Sonnet 5.5 (2026-09-28), «FrontierCode v1.1, main set · Accuracy vs. cost».
  - Modelos: Sonnet 5.5, Opus 5.5, Sonnet 5 y **GPT-6 Sol**, con 5 esfuerzos.
  - Pie: «At High effort, the default on the Claude Platform, Sonnet 5.5 matches GPT-6 Sol's best score for about a fifth of the cost per task.»
- **`coste-rendimiento_anthropic-haiku55-gdpval-aa_2026-10.png`**
  - Fuente: post de Haiku 5.5 (2026-10-07), «GDPval-AA v2.1 · Accuracy vs. cost».
  - Ejes: Y = Elo de 0 a 2000 (con corte). X = coste por tarea de $0,005 a $5, logarítmico.
  - Modelos: Haiku 5.5, Haiku 4.5 (un solo punto), Sonnet 5.5 y **GPT-6 Luna**.
  - Lo que se ve: Haiku 5.5 y GPT-6 Luna van casi superpuestos hasta High; Haiku sigue subiendo en Xhigh y Max.

### 5.3 Datos de las gráficas recomendadas

**Terminal-Bench 4.0.** Datos incrustados en el post de [Opus 5.5](https://www.anthropic.com/news/claude-opus-5-5) [PRIMARIA]. Cada celda es «coste por intento en USD → puntuación %».

| Modelo | Low | Med | High | Xhigh | Max |
|---|---|---|---|---|---|
| Opus 5.5 | $1,29 → 38,5 | $2,94 → 57,6 | $3,88 → 64,2 | $7,35 → 66,4 | $11,24 → 64,8 |
| Fable 5.1 | $5,70 → 40,2 | $7,80 → 43,4 | $10,50 → 49,4 | $15,80 → 51,3 | $19,50 → 55,8 |
| Opus 5 | $4,25 → 28,5 | $7,00 → 41,2 | $10,64 → 47,0 | $13,48 → 50,6 | $15,83 → 52,3 |
| GPT-6 Astra | $4,95 → 49,7 | $6,15 → 53,9 | $7,21 → 57,9 | $7,48 → 57,6 | $10,35 → 56,7 |
| GPT-5.6 Sol | $1,46 → 7,9 | $2,69 → 20,9 | $4,12 → 26,1 | $5,39 → 28,5 | $7,89 → 37,3 |

**FrontierCode 1.1 Main.** Datos del [leaderboard de Cognition](https://cognition.com/frontiercode), vista «All reasoning levels», a 2026-10-14 [PRIMARIA]. Cada celda es «coste por rollout en USD → puntuación %».

| Modelo | Low | Medium | High | XHigh | Max |
|---|---|---|---|---|---|
| Claude Fable 5.1 | $2,38 → 49,8 | $3,28 → 50,9 | $5,27 → 50,3 | $9,27 → 48,7 | $12,83 → 50,3 |
| Claude Opus 5.5 | $0,40 → 47,3 | $0,80 → 54,6 | $1,09 → 54,0 | $2,25 → 51,4 | $6,19 → 54,4 |
| Claude Sonnet 5.5 | $0,19 → 29,3 | $0,24 → 36,5 | $0,42 → 49,4 | $1,59 → 52,1 | $20,78 → 46,2 |
| Claude Haiku 5.5 | $0,06 → 34,8 | $0,13 → 41,6 | $0,26 → 41,9 | $0,63 → 45,8 | $1,33 → 46,4 |
| GPT-6 Astra | $1,70 → 45,3 | $2,43 → 48,8 | $3,01 → 50,9 | $3,28 → 50,6 | $4,59 → 53,3 |
| GPT-6.1 Sol | $0,25 → 45,5 | $0,36 → 50,2 | $0,50 → 48,0 | $0,56 → 49,3 | $0,85 → 47,6 |
| GPT-6 Sol | $0,43 → 37,3 | $0,77 → 45,9 | $1,04 → 47,7 | $1,32 → 48,4 | $2,07 → 49,3 |
| GPT-6 Luna | $0,02 → 25,7 | $0,05 → 35,5 | $0,06 → 37,3 | $0,07 → 37,1 | $0,10 → 42,4 |
| SWE-2 (Cognition) | — | $0,37 → 43,1 | $0,78 → 47,2 | — | $1,18 → 50,0 |

- Las puntuaciones de FrontierCode coinciden entre el post de Anthropic y el leaderboard de Cognition. Algunos costes difieren un poco: GPT-6 Astra Max cuesta $4,36 en Anthropic y $4,59 en Cognition, y Cognition indica que «Fixed GPT-6 Astra… pricing» el 2026-09-10. Fable 5.1 Low también cambia: 52,8 % en Anthropic frente a 49,8 % en Cognition. [PRIMARIA]
- Para el post de SWE-2, Cognition explica que evalúa «using the harness for which it was primarily developed: Claude Code for Anthropic models, Codex for OpenAI models… Devin CLI for open-weight models» ([SWE-2, apéndice A](https://cognition.com/blog/swe-2)). **[NO VERIFICADO]** No he comprobado que el leaderboard use ese mismo harness.

### 5.4 Recomendación para la diapositiva

- **Gráfica principal:** `coste-rendimiento_anthropic-opus55-terminalbench4_2026-09.png`.
  - Es la publicada por un proveedor, la preferencia (1). Incluye Opus 5.5 y GPT-6 Astra, con líneas por modelo y puntos etiquetados por esfuerzo, que es exactamente el estilo pedido.
  - Pie sugerido: «Fuente: Anthropic, *Introducing Claude Opus 5.5*, 22-sep-2026. Datos de GPT según OpenAI.»
  - Advertencia: es una gráfica de marketing de Anthropic. Elige benchmarks y rivales, y no incluye GPT-6.1 Sol.
- **Gráfica complementaria, más reciente y con todos los tiers:** `coste-rendimiento_cognition-frontiercode-leaderboard-tiers_2026-10.png`.
  - Encaja especialmente bien en una charla sobre Devin porque incluye SWE-2.
  - Pie sugerido: «Fuente: Cognition, FrontierCode Leaderboard, consultado el 14-oct-2026. Selección de modelos propia.»

---

## 6. Pendiente o no verificado

- **[NO VERIFICADO]** Contenido y gráficas de los posts de lanzamiento de OpenAI (GPT-6 Astra del 2026-09-03 y GPT-6.1 Sol del 2026-09-29), porque openai.com bloquea el acceso (403/Cloudflare).
  - Según [DataCamp](https://www.datacamp.com/blog/gpt-6-1-sol-vs-opus-5-5) [SECUNDARIA], el post de GPT-6.1 Sol incluye gráficas con coste por tarea frente a «Opus 5.5 w/ fallbacks» en AutomationBench, GDP.pdf y Terminal-Bench Science 0.1.
  - Si alguien puede abrir https://openai.com/index/introducing-gpt-6-1-sol/ en un navegador normal, es la candidata natural a «gráfica de OpenAI que incluye Claude 5.5».
- **[NO VERIFICADO]** Quién publicó la gráfica antigua «Cost–Performance Frontiers… marker size shows DeepSWE score per dollar» (ver §5.1).
- **[NO VERIFICADO]** El «+20 %» entre ACUs y coste en tokens que aparece en el guion.
- **[NO VERIFICADO]** «GPT-6-Astra-Pro» (solo en ChatGPT) y la cancelación de GPT-6.1 Astra. Solo hay fuentes secundarias.
- **Claude Haiku 5.5 aún no aparece en la tabla de modelos de Devin** (2026-10-14). Conviene comprobarlo en el selector real de la cuenta antes de la charla.
- Los precios de Devin de esta nota son los publicados en la documentación. La propia página avisa: «For the most up-to-date pricing and availability, please refer to the model selector in the agent panel».
