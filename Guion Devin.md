# Devin en el día a día: cómo aprovecharlo mejor y controlar el consumo

> Versión 3 · primera versión final para construir la presentación · 14 de octubre de 2026 · Duración objetivo: ~1 h.
> La versión anterior está en `Guion Devin v2.md`.
> Las indicaciones entre corchetes son notas de preparación.
> Estructura: 1) primeros pasos, 2) cómo funciona cada pieza, 3) tokens y coste, 4) buenas prácticas. Los consejos propios de cada pieza van en su sección; los genéricos, al final.
> El caso práctico integrado queda pendiente de decidir (ver al final).

## Apertura [~2 min]

Buenos días. Para los que no me conozcáis, soy Alex, de MLOps, en el departamento de Data Science. Por petición popular, he decidido hacer este Show and Tell a modo de guía de introducción a Devin.

Sé que muchos de vosotros ya utilizáis Devin habitualmente para consultar código, corregir errores o implementar cambios, pero quizá aún no tenéis tan claro cuándo usar cada modelo, qué herramientas tenemos disponibles y qué trucos existen para optimizar el uso de ACUs. El objetivo de esta sesión es entender cómo tomar esas decisiones y convertirlas en hábitos útiles.

Empezaremos por las formas de usar Devin y dónde está cada control. Después veremos qué es cada pieza: modelos, effort, contexto, rules, skills, herramientas, subagentes y plugins. Luego, cuánto cuesta todo eso en tokens y cómo nos ayuda la caché. Y terminaremos con buenas prácticas para el día a día.

---

# Parte 1. Primeros pasos [~8 min]

## 1.1. Local y Cloud

Para elegir cómo trabajar con Devin conviene separar dos preguntas: dónde se ejecuta el trabajo y desde dónde interactuamos con él.

Según dónde se ejecuta, tenemos dos opciones:

- **Devin Local** trabaja en nuestra máquina, desde Desktop o desde la CLI. Nos da más control sobre qué modelo y qué esfuerzo usar, acceso a todo lo que tenemos en local (repositorios, servicios, herramientas) y una revisión visual de los cambios mucho más cómoda.
- **Devin Cloud** trabaja en un entorno remoto preparado para la tarea. Es la opción para delegar tareas autónomas con un objetivo claro y, sobre todo, para automatizar flujos repetitivos que se ejecutan solos, por ejemplo de forma periódica.

Dentro de Local, la diferencia es la interfaz:

| Opción | Para qué sirve | Ejemplo |
|---|---|---|
| **Devin Desktop** | Trabajar desde el IDE, con el código y los cambios a la vista. | Investigar un error y revisar la solución mientras se desarrolla. |
| **Devin CLI** | Usar el agente desde la terminal e integrarlo en comandos y scripts. | Analizar un proyecto desde consola o lanzar una tarea desde un script. |
| **Devin Cloud** | Delegar trabajo en un entorno remoto o automatizarlo. | Una tarea repetitiva que se ejecuta cada semana sin intervención. |

Las tres pueden combinarse dentro de un mismo flujo de trabajo.

[Nota: en Devin Web, el selector de capacidades agrupa los modelos en niveles («Ultra», «Normal»), mientras que en Local se elige el modelo exacto y su nivel de esfuerzo. Comprobar cómo se ve en vuestra cuenta. Fuente: [release notes 2026](https://docs.devin.ai/release-notes/2026).]

**Transición:** Nos centraremos en Desktop, que es donde trabajamos normalmente.

## 1.2. Dónde está cada control en Desktop

Ahora solo vamos a ver dónde está cada cosa. Qué hace cada una lo veremos en la segunda parte.

- **El cuadro de mensajes**, donde escribimos las peticiones.
- **El selector de modelo**, debajo del cuadro. Ahí también vemos la información de precios de nuestra cuenta.
- **El nivel de esfuerzo** (effort), junto al modelo. [En la CLI se cambia con Alt/Opt+T.]
- **El modo de trabajo**: consultar, planificar o ejecutar.
- **El indicador de contexto**, que muestra cuánto llevamos ocupado.
- **El consumo de la sesión.** [Pendiente: localizar dónde se ve el consumo en ACUs por sesión y en total.]

Antes de empezar una tarea, conviene echar un vistazo rápido a modelo, effort y modo. No hace falta cambiarlos constantemente, pero sí de forma consciente cuando la tarea cambia.

[Mostrar en captura o clip, no en directo: los cinco controles señalados sobre la interfaz.]

---

# Parte 2. Cómo funciona: las piezas [~25 min]

## 2.1. Modelos [~5 min]

En el selector aparecen familias de distintos proveedores: GPT de OpenAI, Claude de Anthropic, SWE de Cognition (la empresa que hace Devin) y otras. Cada familia tiene **niveles**, de más capaz y caro a más rápido y barato, y los niveles de OpenAI y Anthropic se corresponden bastante bien:

| Nivel | OpenAI (GPT-6) | Anthropic (Claude) | Precio de lista por millón de tokens (entrada / salida) |
|---|---|---|---|
| Máximo | GPT-6 Astra | Fable 5.1 | 10 $ / 50 $ |
| Alto | — | Opus 5.5 | 4 $ / 20 $ |
| Medio | GPT-6 Sol · GPT-6.1 Sol | Sonnet 5.5 | 2 $ / 10 $ |
| Económico | GPT-6 Luna | Haiku 5.5 | 0,10 $ / 0,50 $ |

Además del nivel, cada familia tiene **generaciones**: GPT-5.5, 5.6, 6, 6.1…; Claude 4.x, 5, 5.5… Una generación nueva del mismo nivel suele rendir más por el mismo precio, así que no basta con fijarse en el nombre del nivel: hay que mirar también la generación. Y no todos los niveles se renuevan a la vez.

Por eso los nombres no deben leerse como una escala universal. Tenemos que comprobar qué modelo concreto representa cada opción de nuestro selector.

[Notas de preparación:
- En la generación anterior, GPT-5.6, había tres niveles: Sol, Terra y Luna. Ahí Sol era el equivalente de Opus y Terra el de Sonnet. En GPT-6 no hay Terra y Sol bajó a 2 $ / 10 $, el mismo precio que Sonnet 5.5; la propia Anthropic compara Sonnet 5.5 con GPT-6 Sol. Por eso Opus 5.5 queda sin par exacto en GPT-6, entre Astra y Sol.
- Precios de lista a 2026-10-14: [OpenAI](https://developers.openai.com/api/docs/pricing), [Anthropic](https://platform.claude.com/docs/en/about-claude/pricing). En Devin coinciden con los de lista ([modelos de Devin](https://docs.devin.ai/desktop/models)).
- Haiku 5.5 todavía no aparece en el selector de Devin; está Haiku 4.5. Comprobar antes de la charla.
- Modelo propio de Cognition: SWE-2 (lista 3 $ / 15 $; en Enterprise, 75 % de descuento hasta el 31-12-2026). Decidir si se añade como fila aparte.
- Devin también ofrece Adaptive (un enrutador que elige modelo) y Fusion (un modelo principal con un ayudante más barato). Mencionar solo si están habilitados en la cuenta.]

### La relación entre rendimiento y coste

Los proveedores publican gráficas como esta para comparar modelos. Cada línea es un modelo, cada punto es un nivel de esfuerzo, el eje horizontal es el coste por intento y el vertical el porcentaje de tareas resueltas. Arriba a la izquierda es mejor: más acierto por menos dinero.

[Gráfica: `referencias/graficas/coste-rendimiento_anthropic-opus55-terminalbench4_2026-09.png`. Terminal-Bench 4.0, publicada por Anthropic con el lanzamiento de Opus 5.5 (22-09-2026). Incluye Opus 5.5, Fable 5.1, Opus 5, GPT-6 Astra y GPT-5.6 Sol, con los puntos Low a Max. [Fuente](https://www.anthropic.com/news/claude-opus-5-5).]

Tres lecturas:

- **La generación pesa tanto como el nivel.** Según Anthropic, Opus 5.5 con su esfuerzo por defecto supera a Opus 5 en esfuerzo máximo por una quinta parte del coste. En esta prueba, incluso queda por encima de Fable 5.1, que es de un nivel superior.
- **Subir el esfuerzo encarece mucho más de lo que mejora.** Las líneas suben rápido al principio y luego se aplanan: los últimos niveles cuestan bastante más y apenas añaden acierto.
- **Un modelo más barato con más esfuerzo puede igualar a uno caro con poco.** Por eso no hay un modelo "mejor"; hay una combinación de modelo y esfuerzo adecuada para cada tarea.

Es una referencia de potencia, no una medida exacta: la gráfica es de un proveedor, usa una sola prueba y los datos de GPT son los que publica OpenAI.

[Alternativa más neutral si se prefiere: el leaderboard FrontierCode de Cognition, que incluye todos los niveles de ambos proveedores y SWE-2 (`referencias/graficas/coste-rendimiento_cognition-frontiercode-leaderboard-tiers_2026-10.png`, [fuente](https://cognition.com/frontiercode)). Sus puntos de esfuerzo no van etiquetados.]

### Cómo elegir

Yo utilizaría estas categorías prácticas como punto de partida, que después debemos contrastar con nuestras tareas:

| Tipo de tarea | Estrategia inicial |
|---|---|
| Localizar código o explicar una función sencilla | Opción rápida, con esfuerzo contenido. |
| Cambio pequeño y bien definido | Modelo con buen equilibrio entre calidad y consumo. |
| Diagnóstico complejo o cambio con muchas dependencias | Modelo de mayor capacidad y esfuerzo proporcionado. |
| Revisión de un cambio importante | Capacidad suficiente para analizar consecuencias y evidencia. |
| Trabajo repetitivo | Comparar varias opciones sobre casos representativos. |

El modelo con menor tarifa puede terminar costando más si necesita varios intentos. También puede ocurrir lo contrario: pagar por máxima capacidad para una tarea mecánica aporta poco.

La comparación útil es **cuánto cuesta completar correctamente una tarea**, incluyendo repeticiones y revisión.

## 2.2. Effort [~3 min]

El effort, o esfuerzo de razonamiento, regula cuánto "piensa" el modelo antes de responder. Los niveles habituales son Low, Medium, High, XHigh y Max, aunque dependen del modelo: algunos GPT añaden "sin razonamiento" y SWE-2 solo tiene Medium, High y Max.

Un esfuerzo mayor puede ayudar ante un problema difícil, pero aumenta la latencia y el consumo. Para localizar una función o hacer una modificación mecánica, un esfuerzo elevado aporta poco. Para diagnosticar un fallo en un flujo de Cefeo con múltiples etapas, un razonamiento alto puede ser muy útil.

[Volver a la gráfica de 2.1 y resaltar solo los puntos de una línea: de Low a Medium el salto es grande; de XHigh a Max, casi nulo o incluso negativo.]

Sin embargo, el esfuerzo no sustituye a un buen contexto: si falta información clave, pensar más no la crea.

**Consejo:** no uséis siempre el máximo. Empezad por un nivel medio y subid cuando la dificultad lo justifique.

## 2.3. Contexto [~5 min]

El contexto es toda la información que el modelo tiene disponible en cada llamada: nuestras instrucciones, la conversación, las reglas del proyecto, el código que ha leído y los resultados de las herramientas. Se mide en tokens, que veremos en detalle en la tercera parte; por ahora basta con saber que son trozos de texto.

Hay tres conceptos distintos:

- **Capacidad de contexto:** cuánto puede admitir el modelo.
- **Contexto utilizado:** cuánto se está ocupando.
- **Información relevante:** qué parte ayuda realmente a resolver la tarea.

### Por qué no conviene llenarlo

Tener una ventana grande no significa que debamos llenarla. Los modelos rinden peor cuanto más contexto tienen que manejar, y la caída empieza mucho antes de llegar al límite.

[Gráfica: `referencias/graficas/degradacion-contexto_contextarena-gdm-mrcrv2-8needle_2026-10.png`. Context Arena, prueba GDM-MRCR v2 (8 agujas): el modelo debe recuperar un dato concreto de una conversación larga llena de datos parecidos. Redibujarla con el design system. [Fuente](https://contextarena.ai), consultada el 14-10-2026.]

Por ejemplo:

- **Claude Sonnet 5** acierta el 96 % con 8.000 tokens, el 53 % con 128.000 y el 32 % con 512.000.
- **Claude Opus 5** pasa del 99 % al 91 % y después al 42,5 %.
- **GPT-5.6 Sol** pasa del 100 % al 92 % y después al 62 %.

Con ventanas de un millón de tokens, la caída empieza alrededor de los 64.000–256.000, es decir, con una cuarta parte de la ventana ocupada o menos.

Y la idea más importante, con un experimento muy sencillo: **la misma pregunta, al mismo modelo, con solo la información relevante (unos 300 tokens) o con todo el historial (unos 113.000)**. Claude Opus 4 pasa de acertar el 92 % a acertar el 38 %.

[Gráfica secundaria: `referencias/graficas/degradacion-contexto_chroma-longmemeval-focused-vs-full-claude_2025-07.png`. Chroma, informe "Context Rot", 14-07-2025. Modelos de 2025, pero es el ejemplo más claro de "solo lo relevante".]

[Notas de preparación:
- Context Arena aún no ha medido Opus 5.5, Fable 5.1, Sonnet 5.5 ni GPT-6. Para los modelos actuales solo hay dos puntos por modelo, en la ficha de Gemini 4 Argon publicada por Google (prueba GraphWalks, F1): Opus 5.5 pasa de 90,6 (hasta 128K) a 66,8 (256K–1M); GPT-6 Astra, de 98,7 a 71,8. El patrón es el mismo. [Fuente](https://deepmind.google/models/model-cards/gemini-4-argon/).
- Son pruebas sintéticas de recuperación, no tareas de programación reales; el grado de caída depende de la tarea y del nivel de esfuerzo.
- La gráfica antigua ("Context Rot Rate – How Models Lose Their Minds") no tiene fuente localizable y parece ilustrativa. No usarla.
- Datos completos para redibujar: `research_notes/Graficas y tools para el guion/degradacion_contexto.md`.]

[Localizar el indicador de contexto de vuestra versión y explicar qué mide.]

### Continuar, compactar o empezar de nuevo

| Situación | Decisión orientativa |
|---|---|
| Misma tarea y contexto relevante | Continuar. |
| Misma tarea con mucha exploración acumulada | Considerar compactar. |
| Nuevo objetivo independiente | Abrir una sesión nueva. |
| Conversación llena de hipótesis descartadas | Preparar un traspaso y valorar una sesión nueva. |
| Falta un dato concreto | Aportarlo; reiniciar no lo resuelve. |

Compactar reduce el historial a una versión más breve. Puede perder matices, así que antes de compactar o cambiar de sesión guardaríamos:

- Objetivo y criterios de aceptación.
- Decisiones y restricciones.
- Archivos relevantes y cambios realizados.
- Pruebas ejecutadas y resultados.
- Hipótesis descartadas y siguiente paso.

No propondría compactar siempre al alcanzar un porcentaje fijo. La decisión depende de la relevancia del contexto y del trabajo pendiente.

[La CLI documenta `/compact`; comprobar su acceso desde vuestra versión de Desktop y si existe un comando para limpiar el contexto. [Comandos esenciales](https://docs.devin.ai/cli/essential-commands).]

**Consejos:**

- Una sesión por objetivo: mezclar tareas independientes llena el contexto de información que no ayuda.
- No reiniciéis continuamente: se pierde el contexto útil y, como veremos en la tercera parte, también la caché.

## 2.4. Rules y AGENTS.md [~2 min]

Las rules y el archivo AGENTS.md guardan instrucciones que el agente debe seguir siempre en un proyecto: su estructura, los comandos de validación, las convenciones y las restricciones importantes.

Tienen niveles. El AGENTS.md de la raíz se carga al inicio de cada sesión; los de los subdirectorios se descubren cuando el agente trabaja en ellos. Eso permite acercar las instrucciones al código al que afectan.

**Consejo:** como se cargan en cada sesión y se releen en cada llamada, conviene que sean breves y estables. Evitaría duplicidades, instrucciones contradictorias y documentos largos que solo hacen falta en situaciones concretas; para eso están las skills, y una rule puede simplemente indicar qué skill usar en cada caso.

[[Rules y AGENTS.md](https://docs.devin.ai/cli/extensibility/rules).]

## 2.5. Skills [~2 min]

Una skill es un procedimiento reutilizable: instrucciones, y si hace falta scripts o plantillas, para una tarea que repetimos.

La diferencia clave con las rules es cuándo se cargan. Al empezar, el agente solo ve el nombre y la descripción de cada skill, unas pocas líneas. El contenido completo se carga únicamente cuando se usa. Podemos invocarla nosotros (con `/nombre-de-la-skill`) o dejar que el agente la elija cuando la descripción encaje con la tarea.

**Cuándo crear una:** cuando repetimos un procedimiento con pasos y criterios propios. Por ejemplo, preparar una revisión, validar una migración o generar documentación con el formato del departamento.

Para que funcione, la skill debe explicar cuándo se aplica, qué necesita, qué pasos sigue y qué resultado entrega. Y la descripción tiene que ser clara, porque es lo que el agente usa para decidir si la necesita.

[[Skills](https://docs.devin.ai/cli/extensibility/skills/overview).]

## 2.6. Tools: las herramientas del departamento [~4 min]

Hasta ahora hemos hablado del modelo, que decide, y del contexto, que es lo que lee. Lo que convierte un modelo en un **agente** son las herramientas: el modelo decide qué hacer, una herramienta lo ejecuta y el resultado vuelve al contexto. Ese ciclo se repite hasta terminar la tarea.

[Animación del bucle: modelo → herramienta → resultado → contexto → modelo. Este bucle se reutiliza en la tercera parte.]

Devin trae sus herramientas de serie: leer y editar archivos, buscar en el código, ejecutar comandos. Las usa constantemente sin que tengamos que hacer nada. Lo interesante para nosotros son las **herramientas propias**: las que crea el departamento para que el agente trabaje con nuestros sistemas.

### Cómo las usa el agente

El agente no ve el código de una herramienta. Ve su **nombre, su descripción y sus parámetros**, y con eso decide si la necesita. La descripción es el disparador: si no explica bien qué hace y cuándo usarla, el agente no la usará, o la usará cuando no toca.

En Devin Local esto ocurre en tres pasos:

1. Al empezar, el agente solo conoce la lista de servidores de herramientas disponibles.
2. Cuando reconoce una necesidad, pide las herramientas de ese servidor. Sus nombres, descripciones y parámetros entran en el contexto y se quedan ahí.
3. La llama. Al contexto solo vuelven los argumentos y el resultado. El código, las credenciales y las llamadas a nuestros sistemas se quedan fuera.

[Nota: basado en la documentación y el comportamiento de la CLI actual; puede cambiar. En Devin Cloud el mecanismo no está documentado: allí basta con decir que el agente decide por el nombre y la descripción. Fuente y detalle: `research_notes/Graficas y tools para el guion/tools_propias_vs_skills.md`.]

### ¿Tool o skill?

| | Tool propia | Skill |
|---|---|---|
| Qué aporta | Una capacidad nueva: actuar sobre un sistema o consultar sus datos. | Conocimiento: cómo y cuándo hacer algo. |
| Cómo se ejecuta | Código nuestro, siempre igual. | El modelo sigue instrucciones en texto. |
| Entradas y salidas | Con estructura definida. | Texto libre. |
| Credenciales y permisos | Se quedan en la herramienta; se puede permitir, preguntar o denegar cada una. | Las que tenga el entorno del agente. |
| Qué entra en el contexto | Solo la llamada y el resultado. | El procedimiento entero y todo lo que el agente ejecute al seguirlo. |
| Reutilización | Cualquier agente o IDE compatible. | Devin y otros agentes que siguen el mismo estándar. |
| Coste de crearla | Hay que desarrollarla, alojarla y mantenerla. | Un archivo Markdown en el repositorio. |

La regla práctica: **una tool le da al agente manos; una skill le da oficio**. Una tool cuando hay que actuar sobre un sistema interno o consultarlo con credenciales, con un resultado exacto. Una skill cuando lo que falta es un procedimiento o una convención.

Y no compiten: lo habitual es una herramienta acompañada de una skill que explica cuándo y cómo usarla.

### Nuestras herramientas

[Completar con herramientas reales; los siguientes son ejemplos de categorías.]

| Herramienta interna | Problema que resuelve | Qué mostrar |
|---|---|---|
| Consulta de documentación | Encontrar información del proyecto | Una consulta y su fuente. |
| Consulta de incidencias | Obtener contexto del trabajo | Una incidencia con criterios de aceptación. |
| Validación del proyecto | Ejecutar las comprobaciones acordadas | Un resultado y cómo interpretarlo. |
| Procedimiento de revisión | Aplicar criterios comunes | Un informe breve y accionable. |

De cada herramienta debemos saber dónde encontrarla, qué permisos necesita y quién la mantiene.

**Consejos para quien crea herramientas:**

- La descripción debe decir qué hace, cuándo usarla, cuándo no y qué significa cada parámetro.
- Mejor varias herramientas pequeñas y bien delimitadas que una enorme: cuando el agente las pide, todas sus definiciones entran en el contexto.
- Resultados cortos y útiles: todo lo que devuelve una herramienta se queda en el contexto y se relee en cada llamada.

## 2.7. MCP [~1 min]

MCP es el estándar con el que conectamos esas herramientas a Devin. Un servidor MCP puede ejecutarse en nuestra máquina o ser un servicio remoto.

- **En Local**, se añaden con `devin mcp add`. Por defecto quedan en un fichero local que no se sube al repositorio; también pueden compartirse con todo el proyecto.
- **En Cloud**, desde Customize → MCPs.
- **Credenciales**: nunca en ficheros que se suben al repositorio. Se usan variables de entorno, inicio de sesión (OAuth) o los secretos de Devin.

[[MCP en Devin](https://docs.devin.ai/work-with-devin/mcp). Comprobar qué servidores MCP tiene habilitados la organización.]

## 2.8. Subagentes [~3 min]

Los subagentes permiten dividir una tarea. En Devin Local, cada uno trabaja en su propia conversación: comparte herramientas y contexto del repositorio, pero no hereda el historial de conversación del principal.

Eso permite que una investigación extensa se desarrolle aparte y que el principal reciba solo su resultado. A cambio, cada subagente hace sus propias llamadas y consume por su cuenta.

El modelo depende del perfil: el subagente general hereda el del principal; el de exploración puede usar otro elegido por el sistema. No debemos asumir que todos cuestan igual.

[[Funcionamiento y coste de los subagentes](https://docs.devin.ai/cli/subagents).]

### Cuándo compensan

Los utilizaría cuando hay partes independientes con entregables claros: investigar varios módulos, analizar compatibilidad o revisar un aspecto concreto. Los evitaría para cambios triviales o cuando varias ejecuciones necesitarían modificar los mismos archivos a la vez.

Las ventajas son el trabajo enfocado, el contexto separado y, cuando corresponde, el paralelismo. Los costes son la preparación, las lecturas repetidas, la ejecución y la integración de los resultados.

### Cómo hacer el encargo

El subagente necesita contexto suficiente para su encargo, pero no toda nuestra conversación. Y como el resumen puede perder detalles, pediría evidencias y referencias a archivos, además de conclusiones:

> Investiga cómo se valida la sesión en el backend. No modifiques archivos. Devuelve los puntos de entrada, las comprobaciones actuales y los riesgos encontrados, con referencias al código.

Contexto separado no significa archivos aislados: si varias tareas editan código, hay que repartir qué archivos toca cada una o usar entornos separados.

**Consejo:** no creéis muchos subagentes por defecto. Usadlos cuando separar el trabajo aporte más valor que el coste de coordinarlo.

## 2.9. Plugins [~1 min]

Un plugin es un paquete que agrupa todo lo anterior: skills y, opcionalmente, rules, hooks, servidores MCP y subagentes personalizados. Se instala de una vez desde un repositorio y la organización puede marcarlo como obligatorio, recomendado o prohibido.

Para un departamento es la forma natural de distribuir sus herramientas: un servidor MCP, las skills que explican cómo usarlo y un AGENTS.md mínimo, todo en un paquete.

[Los hooks son acciones automáticas que se ejecutan en momentos concretos de la sesión. Mencionarlos solo de pasada. [Plugins](https://docs.devin.ai/cli/extensibility/plugins/overview); comprobar si Desktop los admite igual que la CLI.]

**Transición:** Ya conocemos las piezas. Veamos ahora cuánto cuesta usarlas.

---

# Parte 3. Tokens y coste [~10 min]

## 3.1. Qué es un token

Los modelos procesan el contenido en unidades llamadas tokens. Un token puede ser una parte de una palabra, un signo o un fragmento de código.

El consumo incluye mucho más que lo que escribimos y la respuesta final. ¿Recordáis el bucle del agente? Cada vuelta es una llamada al modelo, y **en cada llamada el modelo vuelve a leer todo el contexto**: instrucciones, conversación, archivos leídos y resultados de herramientas. Por eso un mensaje corto puede desencadenar una ejecución costosa.

## 3.2. Qué pagamos en Devin

En nuestra cuenta, el consumo se mide en ACUs. Según la documentación de Devin, el consumo de ACUs crece con los tokens utilizados y con el modelo elegido.

Para tener una referencia, en el departamento hicimos una prueba interna comparando agentes sobre unas pocas tareas: el coste que Devin reportaba en ACUs salía aproximadamente un 20 % por encima del coste calculado a partir de los tokens. No es una cifra oficial ni exacta, pero sirve como aproximación rápida: **coste en ACUs ≈ coste en tokens + 20 %**.

Por eso vamos a centrarnos en los tokens, que es lo que podemos controlar.

[Nota: presentar el +20 % siempre como resultado de un benchmark interno con pocas tareas, no como tarifa. La tarifa del ACU se fija en el contrato Enterprise. [Facturación Enterprise](https://docs.devin.ai/admin/billing/enterprise).]

## 3.3. Los cuatro tipos de token

| Tipo | Qué representa |
|---|---|
| **Input sin caché** | Entrada que el modelo procesa desde cero. |
| **Cache write** | Entrada que se guarda en caché para reutilizarla en las siguientes llamadas. Algunos proveedores la cobran algo más cara que el input normal; otros no la cobran aparte. |
| **Cache read** | Entrada que se reutiliza de la caché. Es mucho más barata: entre un 2,5 % y un 10 % del precio de input, según el modelo. |
| **Output** | Tokens que genera el modelo, incluido normalmente su razonamiento. Es el tipo más caro por token. |

[Completar con las tarifas reales de los modelos habilitados (por millón de tokens, con unidad, plan y fecha). Referencia pública en Devin: Opus 5.5 4 $ / 20 $ / cache read 0,20 $; Sonnet 5.5 2 $ / 10 $ / 0,20 $; GPT-6 Astra 10 $ / 50 $ / 1 $. [Fuente](https://docs.devin.ai/desktop/models).]

## 3.4. La caché

Como en cada llamada el principio del contexto es igual que en la anterior, el proveedor puede guardarlo y reutilizarlo. Esa es la caché: lo que ya se leyó en la llamada anterior se vuelve a leer a precio reducido, y solo lo nuevo se paga completo.

La caché caduca. Su duración depende del proveedor y de la configuración del agente; como referencia, Anthropic usa por defecto cinco minutos, que se renuevan cada vez que se reutiliza. Si hacemos una pausa más larga, la siguiente llamada tiene que volver a escribir todo el contexto.

[Referencia: [caché de Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-caching). Pendiente de verificar en Devin: duración de la caché y si cambiar de modelo o editar las rules a mitad de sesión obliga a reescribirla (en las APIs, la caché es por modelo y por prefijo idéntico).]

## 3.5. Una conversación normal, paso a paso

[Animación principal de la charla. Datos completos en el Anexo A.]

Veámoslo con una tarea de 12 llamadas y tarifas ficticias, para separar el mecanismo de los precios reales. Partimos de 20.000 tokens fijos (instrucciones, AGENTS.md, definiciones de herramientas), y en cada llamada se añaden 4.000 tokens nuevos (nuestro mensaje y resultados de herramientas) y el modelo genera 1.000 de salida.

**Sin caché**, cada llamada vuelve a pagar todo el contexto a precio completo. El contexto crece llamada a llamada, así que cada una cuesta más que la anterior: la primera, 0,058 unidades; la duodécima, 0,168. **Total: 1,36 unidades.**

**Con caché**, la primera llamada es algo más cara, porque escribe todo en caché (0,070). A partir de ahí, lo ya visto se lee a precio de caché y solo lo nuevo se paga completo: cada llamada cuesta unas 0,03 unidades y apenas crece. **Total: 0,43 unidades, un 69 % menos.**

Dos momentos de la animación:

1. **Una pausa larga en la llamada 7.** La caché ha caducado y esa llamada vuelve a escribir los 54.000 tokens: cuesta 0,145 unidades, más que la misma llamada sin caché. La sesión termina costando 0,54 en lugar de 0,43, un 27 % más.
2. **Una compactación.** El contexto baja de golpe y cada llamada siguiente es más barata, pero la propia compactación también cuesta. En una tarea corta como esta apenas cambia el total; en una sesión de 30 llamadas, compactar a mitad ahorra un 12 % adicional.

Las conclusiones:

- La caché es lo que más ahorra, y ahorra más cuanto más larga es la sesión: un 69 % en 12 llamadas y un 79 % en 30.
- Las pausas largas y los reinicios la desperdician.
- Compactar sirve sobre todo para la calidad, porque el modelo rinde mejor con menos contexto. El ahorro en dinero solo aparece en sesiones largas.

[Fórmula de cada tipo: tokens ÷ 1.000.000 × tarifa. Tarifas ficticias por millón: input 2, cache write 2,5, cache read 0,2, output 10. Este ejemplo no representa la facturación real de Devin.]

---

# Parte 4. Buenas prácticas [~10 min]

## 4.1. Definir una tarea resoluble

Una petición útil responde a cinco preguntas:

1. ¿Qué resultado necesito?
2. ¿Qué contexto permite entenderlo?
3. ¿Cuál es el alcance?
4. ¿Qué restricciones hay?
5. ¿Cómo comprobaremos que funciona?

Petición inicial:

> Arregla la paginación.

Petición mejorada:

> En la tabla de clientes, al cambiar el filtro desde la página 3, la tabla queda vacía aunque existen resultados. Corrige el comportamiento para volver a la primera página cuando cambien los filtros. Empieza por el componente de tabla y la gestión de filtros. Mantén la API actual y evita cambios visuales. Verifica este caso y comprueba que la paginación normal sigue funcionando.

La segunda petición es más larga, pero reduce ambigüedad: define el comportamiento esperado y cómo evaluarlo.

## 4.2. Aportar contexto de forma progresiva

Empezaremos por el error exacto, los pasos de reproducción y los archivos que sabemos que están relacionados.

Si no conocemos la causa, lo diremos. Podemos aportar una hipótesis sin convertirla en una orden: «Sospecho de la gestión del estado, pero comprueba la causa antes de modificarla».

Evitaría pegar miles de líneas de logs sin filtrar. Aportaría el fragmento relevante y dejaría accesible el resto si hace falta.

## 4.3. Planificar cuando aporte valor

Para un cambio pequeño y claro, podemos pedir ejecución directa.

Para una tarea amplia, con alternativas o dependencias importantes, conviene usar el modo de planificación: investigar y acordar un plan antes de tocar nada. El plan debería identificar qué cambiar, por qué, qué riesgos existen y cómo validarlo, con una extensión proporcional a la tarea.

## 4.4. Intervenir cuando se desvía

Si vemos un supuesto equivocado, conviene corregirlo pronto con información concreta. En lugar de «eso está mal», diríamos:

> El endpoint responde correctamente; el fallo ocurre después, al actualizar el estado del cliente. Reproduce ese paso antes de seguir cambiando el backend.

Si encadena intentos fallidos, pediremos una pausa de diagnóstico:

> Resume qué has probado, qué evidencia apoya cada hipótesis y qué información falta. No hagas más cambios hasta identificar el siguiente experimento útil.

## 4.5. Verificar y revisar

Una respuesta convincente no demuestra que el cambio funcione.

Revisaremos qué archivos cambió, si el alcance es el esperado y qué comprobaciones realizó. Para este bug, necesitamos evidencia del caso corregido y de que la paginación habitual sigue funcionando. Las pruebas deben ser proporcionales al cambio, y debe quedar claro qué no se ha podido comprobar.

Petición de cierre:

> Resume los cambios, las comprobaciones realizadas y sus resultados. Indica cualquier limitación o punto pendiente.

## 4.6. Hábitos que generan gasto innecesario

| Hábito | Alternativa |
|---|---|
| Pedir que revise todo el repositorio | Delimitar la pregunta y ampliar la búsqueda cuando haga falta. |
| Repetir «prueba otra cosa» | Aportar evidencia o revisar las hipótesis. |
| Pedir informes extensos en cada turno | Solicitar decisiones, resultados y evidencia relevante. |
| Eliminar validaciones para ahorrar | Elegir comprobaciones proporcionadas al riesgo. |

[Los hábitos propios de cada pieza ya se han dado en su sección: effort máximo (2.2), mezclar tareas y reiniciar (2.3), subagentes por defecto (2.8).]

---

## Cierre [~2 min]

Para aprovechar mejor Devin, tenemos que tomar unas pocas decisiones de forma consciente: dónde ejecutar, qué modelo y esfuerzo utilizar, qué contexto aportar y cómo comprobar el resultado.

La caché, las skills, las herramientas del departamento y los subagentes pueden ayudarnos mucho, pero su utilidad depende de la tarea y de cómo los empleemos.

Antes de pulsar Enter, podemos hacernos cinco preguntas:

- ¿Está claro el resultado que necesito?
- ¿He elegido una configuración proporcionada?
- ¿He aportado contexto relevante, y solo el relevante?
- ¿Existe una herramienta o procedimiento del equipo que deba utilizar?
- ¿Cómo sabré que el trabajo está terminado?

El objetivo es completar tareas correctas, verificables y fáciles de revisar, con menos trabajo innecesario.

---

## Pendiente de decidir: caso práctico integrado

En la versión 2 había un caso práctico que aplicaba todo al bug de paginación (entorno, modelo y esfuerzo, contexto, instrucciones, delegación, ejecución, verificación y consumo). Opciones: recuperarlo como recorrido final de unos 5 minutos, convertirlo en una demo grabada o eliminarlo. Con la duración estimada (~57 min), incluirlo obligaría a recortar en otra parte o usar el tiempo de preguntas.

## Pendientes para la siguiente revisión

- [ ] Completar las tarifas reales de los modelos habilitados (3.3).
- [ ] Localizar en Desktop: indicador de contexto, consumo de la sesión, `/compact` y limpiar contexto.
- [ ] Comprobar si Haiku 5.5, SWE-2, Adaptive y Fusion están en el selector de la cuenta.
- [ ] Verificar en Devin la duración de la caché y qué la invalida (cambio de modelo, edición de rules).
- [ ] Comprobar si Desktop admite plugins como la CLI.
- [ ] Incorporar las herramientas reales del departamento y cómo se distribuyen (2.6).
- [ ] Redibujar las gráficas de 2.1 y 2.3 con el design system.

---

## Anexo A. Datos de la animación de tokens (3.5)

Supuestos: 20.000 tokens fijos; en cada llamada, 4.000 tokens nuevos de entrada y 1.000 de salida (la salida pasa a formar parte del contexto en la llamada siguiente). Tarifas ficticias por millón de tokens: input 2, cache write 2,5, cache read 0,2, output 10. Con caché, en cada llamada se lee de caché el contexto de la llamada anterior y se escribe lo nuevo.

| Llamada | Contexto | Sin caché: coste | Con caché: write / read | Con caché: coste | Con pausa en 7: coste |
|---:|---:|---:|---:|---:|---:|
| 1 | 24.000 | 0,058 | 24.000 / 0 | 0,070 | 0,070 |
| 2 | 29.000 | 0,068 | 5.000 / 24.000 | 0,027 | 0,027 |
| 3 | 34.000 | 0,078 | 5.000 / 29.000 | 0,028 | 0,028 |
| 4 | 39.000 | 0,088 | 5.000 / 34.000 | 0,029 | 0,029 |
| 5 | 44.000 | 0,098 | 5.000 / 39.000 | 0,030 | 0,030 |
| 6 | 49.000 | 0,108 | 5.000 / 44.000 | 0,031 | 0,031 |
| 7 | 54.000 | 0,118 | 5.000 / 49.000 | 0,032 | **0,145** (write 54.000) |
| 8 | 59.000 | 0,128 | 5.000 / 54.000 | 0,033 | 0,033 |
| 9 | 64.000 | 0,138 | 5.000 / 59.000 | 0,034 | 0,034 |
| 10 | 69.000 | 0,148 | 5.000 / 64.000 | 0,035 | 0,035 |
| 11 | 74.000 | 0,158 | 5.000 / 69.000 | 0,036 | 0,036 |
| 12 | 79.000 | 0,168 | 5.000 / 74.000 | 0,037 | 0,037 |
| **Total** | | **1,356** | | **0,425** | **0,538** |

Compactación: tras la llamada 8 se resume el historial en 3.000 tokens (la llamada de compactación cuesta 0,044). En 12 llamadas el total pasa de 0,425 a 0,445; en una sesión de 30 llamadas, de 1,268 a 1,112.

Reparto del coste con caché en 12 llamadas: cache write 46 %, output 28 %, cache read 25 %.

## Anexo B. Gráficas y fuentes

| Uso | Archivo | Fuente |
|---|---|---|
| Coste-rendimiento (principal) | `referencias/graficas/coste-rendimiento_anthropic-opus55-terminalbench4_2026-09.png` | [Anthropic, 22-09-2026](https://www.anthropic.com/news/claude-opus-5-5) |
| Coste-rendimiento (alternativa) | `referencias/graficas/coste-rendimiento_cognition-frontiercode-leaderboard-tiers_2026-10.png` | [Cognition FrontierCode](https://cognition.com/frontiercode) |
| Degradación del contexto (principal) | `referencias/graficas/degradacion-contexto_contextarena-gdm-mrcrv2-8needle_2026-10.png` | [Context Arena](https://contextarena.ai) |
| Solo lo relevante frente a todo el historial | `referencias/graficas/degradacion-contexto_chroma-longmemeval-focused-vs-full-claude_2025-07.png` | Chroma, "Context Rot", 14-07-2025 |

Notas de investigación completas: `research_notes/Graficas y tools para el guion/`.
