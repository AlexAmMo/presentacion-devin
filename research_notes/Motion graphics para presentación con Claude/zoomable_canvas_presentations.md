# Zoomable "big map / infinite canvas" HTML presentations (Prezi-style camera): frameworks and DIY techniques, as of October 2026

Method note: Repository metrics (stars, last commit, latest release, license) were pulled from the GitHub REST API and the npm registry on 2026-10-14. Each repo URL is cited inline. "Last commit" means the latest commit on the default branch. Many 2026 commits are only dependabot or dependency bumps, and the notes say so where it matters.

## What options exist, and how do they compare on camera model, motion-graphics hooks and presenter features?

### Takeaway
No ready-made tool combines a Prezi-style free camera with first-class presenter tooling and a no-cost, permissive license. impress.js is the only maintained, MIT-licensed, code-first library built around a camera that flies between positioned, scaled and rotated steps. It ships substeps, a speaker console, an overview, and `stepenter`/`stepleave` events for triggering GSAP timelines. reveal.js, Slidev, Spectacle and Marp have far better presenter, export and maintenance stories, but they are linear slide decks with no canvas camera. Canvas and whiteboard engines (tldraw, React Flow, Konva, pixi-viewport, panzoom, d3-zoom) provide a good animated camera API but no presenter features.

### Cited Findings

#### A. Dedicated "zooming / spatial" presentation tools
- **impress.js** has 38,150 stars and an MIT license. The latest GitHub release is v2.0.0 (2022-07-22). The last commit (2026-07-23) is a docs change. Earlier recent commits set up CI (2025-09) or fixed typos (2024). — [GitHub impress/impress.js](https://github.com/impress/impress.js)
  - The npm package `impress.js` is stuck at 1.1.0 (2020-04-12), so v2.0.0 has to be loaded from GitHub or jsDelivr builds. — [npm impress.js](https://www.npmjs.com/package/impress.js); [GitHub impress/impress.js](https://github.com/impress/impress.js)
  - The camera model positions each step with `data-x`, `data-y`, `data-z`, `data-scale`, `data-rotate` and `data-rotate-x/y/z`, plus `data-rotate-order`. `data-scale="4"` makes a step appear 4x larger, so the camera scales down to show it at its correct size. — [impress.js DOCUMENTATION.md](https://github.com/impress/impress.js/blob/master/DOCUMENTATION.md)
  - For animation hooks, it fires the events `impress:init`, `impress:stepenter` and `impress:stepleave` on the root element. `api.goto("overview")` jumps to an overview step. — [impress.js DOCUMENTATION.md](https://github.com/impress/impress.js/blob/master/DOCUMENTATION.md)
  - Built-in plugins in `src/plugins` are: autoplay, blackout, bookmark, extras, form, fullscreen, goto, help, impressConsole, media, mobile, mouse-timeout, navigation, navigation-ui, progress, rel, resize, skip, stop, substep, toolbar, touch. — [GitHub impress.js src/plugins](https://github.com/impress/impress.js/tree/master/src/plugins)
  - The substep plugin handles fragments. While a step has elements with `class="substep"`, `next()`/`prev()` reveal or hide them instead of leaving the step. It adds `substep-visible` and `substep-active` classes, and `data-substep-order` controls the order. `goto()` ignores substeps. — [substep README](https://github.com/impress/impress.js/blob/master/src/plugins/substep/README.md)
  - The impressConsole plugin opens a speaker console with the P key. It shows the current slide, a preview of the next slide, speaker notes from `<div class="notes">`, and navigation. — [impressConsole README](https://github.com/impress/impress.js/blob/master/src/plugins/impressConsole/README.md)
  - Browser caveats: it relies on CSS 3D transforms and transitions. "Recent Firefox and Chrome work well," and the main use case is presenting from your own laptop. Embedding in web pages may not render for all visitors. — [GitHub impress/impress.js README](https://github.com/impress/impress.js)
- **jmpress.js** has 1,486 stars and no license detected by GitHub. The last commit (2026-05-25) merged a PR named "fix_CVE-2015-9251". The npm `jmpress` package's last version is 0.4.5 (2014-01-19), so the project is effectively abandoned. — [GitHub jmpressjs/jmpress.js](https://github.com/jmpressjs/jmpress.js); [npm jmpress](https://www.npmjs.com/package/jmpress)
- **Strut** is AGPL-3.0 with 1,892 stars and no releases. The repo has been rewritten as a hosted GUI app. Its README describes "an HTML5 GUI authoring tool for spatial presentations — … arrange the slides in 3-D space, and play the deck as a camera flight through that world (the impress.js model, made visual and editable)." It runs on React 19, TanStack Start and the Rindle data layer, with uploads to Cloudflare R2. The last commit (2026-09-17) is titled "finish migration to rindle cloud." The live app is at strut.io. — [GitHub tantaman/strut](https://github.com/tantaman/strut)
- **Sozi** is an SVG zooming presentation editor under MPL-2.0, with 1,715 stars. The latest release is v23.07 (2023-07-25), built on Electron 20. It fixed PDF export and transformations of embedded SVGs. The 2026 commits are dependabot merges (latest 2026-10-11). — [GitHub sozi-projects/Sozi](https://github.com/sozi-projects/Sozi); [Sozi v23.07 release](https://github.com/sozi-projects/Sozi/releases/tag/v23.07)
  - The official website is stale. Its news lists 21.02 (Feb 2021) as the latest release, and the newest item is a Nov 2021 book announcement. A presenter console arrived in 19.04 (2019). — [sozi.baierouge.fr](https://sozi.baierouge.fr/)
- **Prezi**, the commercial benchmark, has no official price list I could access, and third-party sources disagree. Standard is about $7/month. Plus is listed at $15–19/month and includes offline mode and PDF export. Premium is listed at $25–29/month. — [CostBench](https://www.costbench.com/software/ai-presentations/prezi/); [Dupple review](https://dupple.com/reviews/prezi); [Layer3 Labs](https://www.layer3labs.io/guides/is-prezi-worth-it)
- **Excalidraw+ presentations** turn frames into slides, with a laser pointer, a phone remote paired by QR code, and PDF/PPTX export. This is an Excalidraw+ (paid) feature with a 14-day trial. The page lists no price and does not mention speaker notes. — [Excalidraw+ presentations](https://plus.excalidraw.com/use-cases/presentations)
  - **excalidraw-smart-presentation** is an MIT community fork with 108 stars, last pushed 2025-07-21. Frames are ordered by vertical position, elements shared by consecutive frames animate between them, and arrow keys navigate. It has no touch support, and animation timing is fixed. — [GitHub excalidraw-smart-presentation](https://github.com/excalidraw-smart-presentation/excalidraw-smart-presentation.github.io); [HN Show HN](https://hn.svelte.dev/item/43514976)
- **CanvaSlide** (new in 2026) is MIT with 13 stars, created 2026-09-13. It is a Tauri 2 + React 19 desktop app that lays presentation frames on an infinite canvas with "continuous zoom/pan and per-frame camera motion." It exports HTML with a built-in player, or a PDF with one page per frame. It includes a laser pointer and a "Create with AI" prompt plus a portable skill for AI authoring. — [GitHub hwantage/CanvaSlide](https://github.com/hwantage/CanvaSlide)
- **Koboyo** has 69 stars and no license file, created 2026-07. It is an "Infinite canvas for diagrams, docs, and presentations" that imports from Mermaid, Excalidraw and tldraw and exports PNG, SVG and PDF. — [GitHub koboyohq/koboyo](https://github.com/koboyohq/koboyo)

#### B. Slide-deck frameworks (linear decks; no free camera built in)
- **reveal.js** is MIT with 72,423 stars. The latest release is 6.0.2 (2026-09-10). 6.0.0 (2026-03-11) added the official `@revealjs/react` wrapper (Deck/Slide/Fragment), moved the build from gulp to Vite, shipped TypeScript types, and changed plugin paths to `dist/plugin/<name>.js`. 6.0.2 fixed a postMessage XSS, fixed pinch-to-zoom triggering slide changes, and "round[s] slide scale to two decimal places." — [reveal.js releases](https://github.com/hakimel/reveal.js/releases)
  - The **zoom plugin** is a magnifier, not camera navigation. Alt+click (Ctrl on Linux) zooms the view into the click point at `zoomLevel` (default 2). It is disabled in overview mode. — [reveal.js plugin/zoom/plugin.js](https://github.com/hakimel/reveal.js/blob/master/plugin/zoom/plugin.js)
  - **Auto-Animate**: put `data-auto-animate` on adjacent `<section>`s. Matching elements, matched by content or by `data-id`, animate position via CSS transform plus color, font-size, padding and margin. Easing, duration and delay are configurable. It fires an `autoanimate` event with `fromSlide`/`toSlide`. — [revealjs.com/auto-animate](https://revealjs.com/auto-animate/)
  - **Speaker view**: press S for a separate window with notes (`<aside class="notes">` or `data-notes`), a next-slide preview, timers and a pacing timer (`defaultTiming`/`totalTime`). Notes can be printed in PDF export (`showNotes`, `"separate-page"`). When used locally it "requires running reveal.js from a local web server." A Node notes server can show notes on another device. — [revealjs.com/speaker-view](https://revealjs.com/speaker-view/)
  - 5.2.0 added `controls: "speaker-only"` and lightbox sync to the speaker view. 5.1.0 added an `enter-fullscreen` class for any element. — [reveal.js releases](https://github.com/hakimel/reveal.js/releases)
  - **Slides.com pricing** (the commercial host behind reveal.js): Lite is $5/month billed annually or $7 monthly. Pro is $10 or $14 and adds custom CSS. Team is $20 or $28 for 2 users, plus $10 or $14 per extra user. Lite and Pro include PDF export and "present offline." The page does not mention HTML or reveal.js export. — [slides.com/pricing](https://slides.com/pricing)
- **Slidev** (Vue/Vite) is MIT with 49,047 stars. The latest release is v53.0.0 (2026-09-16). — [GitHub slidevjs/slidev](https://github.com/slidevjs/slidev)
  - **Animations**: `v-click`, `v-after`, `v-clicks`, `v-switch`, and `v-motion` (@vueuse/motion) with `click-x` variants that tie motion to click counts. Slide transitions include an experimental `view-transition`. The animations page describes no zoom or camera feature. — [sli.dev/guide/animations](https://sli.dev/guide/animations)
  - **Presenter mode** at `/presenter` keeps multiple windows in sync and shows current, next and notes in three layouts, plus a Screen Mirror. It also has Quick Overview (`o`), fullscreen (`f`) and goto (`g`). — [sli.dev/guide/ui](https://sli.dev/guide/ui)
  - **Export**: PDF, image PPTX, editable PPTX, PNG and MD. `--with-clicks` exports each click step as a page. It requires `playwright-chromium`, and the browser exporter may not work well outside Chromium. A hosted SPA build keeps interactivity. — [sli.dev/guide/exporting](https://sli.dev/guide/exporting)
- **Spectacle** (React) is MIT with 10,177 stars. The latest release is spectacle@10.2.3 (2025-10-10), and the last commit (2026-09-24) is a dependency upgrade. Its homepage has moved to Nearform. — [GitHub FormidableLabs/spectacle](https://github.com/FormidableLabs/spectacle)
  - It has Presenter Mode (notes, timer, upcoming slide; Alt+Shift+P), Overview (Alt+Shift+O), Fullscreen (Alt+Shift+F), a ⌘/Ctrl+K command bar, and `?exportMode=true` for PDF via browser print. — [Spectacle presenting-controls.mdx](https://github.com/FormidableLabs/spectacle/blob/main/docs/presenting-controls.mdx)
- **Marp** (Markdown): marp-cli is MIT, v4.5.1 (2026-09-06). Marpit is v3.2.3 (2026-09-04). — [GitHub marp-team/marp-cli](https://github.com/marp-team/marp-cli); [GitHub marp-team/marpit](https://github.com/marp-team/marpit)
  - The default `bespoke` HTML template has fragmented lists (`*` or `1)` bullets), a presenter view (`p`, which "may become disabled when not fulfilled requirements"), an overview (`o`), and slide transitions plus morphing animations through the View Transition API. — [marp-cli README](https://github.com/marp-team/marp-cli)
- **MDX Deck** is MIT. The last commit was 2021-08-03 and the last npm release 4.1.1 (2020-03-12), so it is **abandoned**. — [GitHub jxnblk/mdx-deck](https://github.com/jxnblk/mdx-deck); [npm mdx-deck](https://www.npmjs.com/package/mdx-deck)
- **WebSlides** is MIT. The last commit was 2020-09-05 and the last npm release 1.5.0 (2019-05-14), so it is **abandoned**. — [GitHub webslides/WebSlides](https://github.com/webslides/WebSlides)
- **"Inkline"** is not a presentation framework. The repo (now uxfront-com/inkline) describes itself as "the intuitive UI Components library … for building … Vue.js 3 Design Systems." — [GitHub uxfront-com/inkline](https://github.com/uxfront-com/inkline)
- **Shower** (HTML presentation engine) is MIT and has 2026 dependency commits. — [GitHub shower/shower](https://github.com/shower/shower)
- **Bespoke.js** was last pushed 2020-09-08, but Marp's default template still builds on it. — [GitHub bespokejs/bespoke](https://github.com/bespokejs/bespoke); [marp-cli README](https://github.com/marp-team/marp-cli)

#### C. Canvas, whiteboard and viewport engines (camera APIs; you build the presenter layer)
- **tldraw SDK** is v5.5.2 (2026-10-02) with 50,911 stars, under a custom source-available license. — [GitHub tldraw/tldraw](https://github.com/tldraw/tldraw)
  - **License**: you may use it in Development Environments, but agree "Not to use the Software in Production Environments" unless you hold a trial or commercial license key. "Production Environment" covers any deployment "where the software is used to provide functionality to end users, customers, or the public." The software includes technical measures to "verify License Key validity, detect deployment environments … ensure proper watermark display" and "may collect and transmit usage data." — [tldraw LICENSE.md](https://github.com/tldraw/tldraw/blob/main/LICENSE.md)
  - **Pricing**: a 100-day free trial with no card, a commercial license with "value-based pricing" (no public price; contact sales), startup discounts, and a free hobby license by application. — [tldraw.dev/pricing](https://tldraw.dev/pricing)
  - Internal company use counts as commercial. Classroom and student projects don't need a license. A secondary source says the hobby license must show a "made with tldraw" watermark. — [appdevelopermagazine (SDK 4.0)](https://appdevelopermagazine.com/tldraw-sdk-4.0-release-new-starter-kits-and-licensing-model/); [x-cmd blog](https://x-cmd.com/blog/250926)
  - **Camera API**: `setCamera({x,y,z})`, `zoomToBounds(bounds,{inset,targetZoom})`, `zoomToFit`, `zoomToSelection` and `centerOnPoint`. Each accepts `animation: {duration, easing}` with built-in `EASINGS`. Camera constraints (`bounds`, `behavior`, `isLocked`) are available, and there is a "Slideshow (fixed camera)" example. — [tldraw.dev/sdk-features/camera](https://tldraw.dev/sdk-features/camera)
- **Excalidraw** (library) is MIT with 133,846 stars. `@excalidraw/excalidraw` is 0.18.1 (2026-04-20). Presentations are part of the paid Excalidraw+ (see A). — [GitHub excalidraw/excalidraw](https://github.com/excalidraw/excalidraw); [npm @excalidraw/excalidraw](https://www.npmjs.com/package/@excalidraw/excalidraw)
- **Konva** is MIT (LICENSE file; npm "MIT") and 10.8.0 (2026-10-12), so it is actively maintained. Its "Infinite Canvas" demo zooms relative to the cursor and pans by dragging. — [GitHub konvajs/konva](https://github.com/konvajs/konva); [Konva Infinite Canvas demo](https://konvajs.org/docs/sandbox/Infinite_Canvas.html)
- **pixi-viewport** is MIT, 6.0.3 (2024-11-27), last commit 2025-02-03. It supports pixi.js v8. Features include drag, pinch, wheel, decelerate, follow, "animate," "snap to point," "snap to zoom" and clamp. Maintenance is slowing. — [GitHub pixijs-userland/pixi-viewport](https://github.com/pixijs-userland/pixi-viewport)
- **React Flow / xyflow** is MIT. `@xyflow/react` is 12.12.0 (2026-09-24). The viewport API offers `fitView({nodes, padding, duration, ease…})`, `setCenter(x,y,{zoom,duration})`, `fitBounds(rect,{padding})`, `setViewport` and `zoomTo`, with `duration`, `ease` and `interpolate: "smooth" | "linear"`. — [reactflow.dev ReactFlowInstance](https://reactflow.dev/api-reference/types/react-flow-instance); [GitHub xyflow/xyflow](https://github.com/xyflow/xyflow)
- **d3-zoom** is ISC, v3.0.0 (2021). It is stable or "finished" rather than active (last push 2024-04-30). — [GitHub d3/d3-zoom](https://github.com/d3/d3-zoom)
  - **d3.interpolateZoom** implements van Wijk & Nuij, "Smooth and efficient zooming and panning." It interpolates `[cx, cy, width]` views along a curved zoom-out-then-in path. `rho` sets the curvature (default √2; near 0 is almost linear). It also exposes a recommended `duration` based on path length. — [d3js.org/d3-interpolate/zoom](https://d3js.org/d3-interpolate/zoom)
- **@panzoom/panzoom** is MIT, 4.6.2 (2026-04-02). It "uses CSS transforms to take advantage of hardware/GPU acceleration… the element can be _anything_: an image, a video, an iframe, a canvas, text." It supports SVG and `zoom(2, {animate: true})` with a duration option. Its FAQ notes "weird text resizing" with SVG text (issue #593). — [GitHub timmywil/panzoom](https://github.com/timmywil/panzoom)
- **panzoom (anvaka)** is MIT, npm 9.4.4 (2026-03-26). It is an "Extensible, mobile friendly pan and zoom framework (supports DOM and SVG)." — [GitHub anvaka/panzoom](https://github.com/anvaka/panzoom); [npm panzoom](https://www.npmjs.com/package/panzoom)
- **Zumly** is MIT, npm 0.97.0 (2026-09-06), 209 stars. Its description was not verified. — [GitHub zumerlab/zumly](https://github.com/zumerlab/zumly); [npm zumly](https://www.npmjs.com/package/zumly)

#### D. Animation engines for the DIY camera and for zone motion graphics
- **GSAP** is 3.15.0 (2026-04-13) under the "Standard 'no charge' license." Commercial use is free, including formerly members-only plugins such as SplitText and MorphSVG, and Flip and DrawSVG are listed as plugins. It is **not** open source or MIT: Webflow keeps the IP. Using it in visual no-code animation tools that compete with Webflow needs consent. "AI-generated code is not a Prohibited Use." The page does not mention CustomEase specifically. — [gsap.com/standard-license](https://gsap.com/standard-license); [npm gsap](https://www.npmjs.com/package/gsap)
- **Motion** (motion.dev) is MIT on npm, at 14.2.0 (2026-10-13), and is very active. The optional **Motion+** costs $399 one-time for a Solo license with lifetime updates, or an annual per-seat Team plan. It adds premium components, 490+ examples and an "AI Kit." — [npm motion](https://www.npmjs.com/package/motion); [motion.dev/plus](https://motion.dev/plus)

#### E. 3D camera approach
- **three.js** is MIT, r186 (2026-09-24). The repo ships CSS3DRenderer examples (`css3d_periodictable`, `css3d_sprites`, `css3d_youtube`, `css3d_mixed`, `css3d_orthographic`), which let real DOM/HTML live in a 3D scene. — [GitHub mrdoob/three.js](https://github.com/mrdoob/three.js); [three.js examples tree](https://github.com/mrdoob/three.js/tree/dev/examples)
- **camera-controls** is MIT, v3.1.2 (2025-11-17). It offers "smooth transitions": `fitToBox(mesh, enableTransition, {padding…})`, `fitToSphere`, `setLookAt`, `lerpLookAt`, `moveTo`, `setTarget`, `smoothTime`, "complex transitions with `await`", and `rest`/`sleep`/`transitionstart` events. — [GitHub yomotsu/camera-controls](https://github.com/yomotsu/camera-controls)
- **drei `<CameraControls/>`** is "an implementation of the camera-controls library" for React Three Fiber. drei is 10.7.9 (2026-09-25) and R3F 9.8.1 (2026-09-24), both MIT. — [drei docs camera-controls.mdx](https://github.com/pmndrs/drei/blob/master/docs/controls/camera-controls.mdx); [GitHub pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber)

#### F. AI/Claude-built HTML presentation projects (2025–2026)
- **frontend-slides** is MIT with 30,635 stars, v2.1.0 (2026-05-26). It is a Claude Code plugin/skill that makes "Zero Dependencies — Single HTML files with inline CSS/JS," "fixed 16:9" decks and converts PPT. It is slide-based, with no zoomable canvas described. — [GitHub zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides)
- **slides-ai-plugin** is MIT with 41 stars, created 2026-04-12. It is a Claude Code plugin producing "animated HTML decks (GSAP + CSS, single-file, viewport-fitted)" with GSAP timelines, SplitText and speaker notes, or editable PPTX. — [GitHub proyecto26/slides-ai-plugin](https://github.com/proyecto26/slides-ai-plugin)
- **presenter-mode** is MIT with 22 stars, from 2026-07. It adds a "PowerPoint-grade presenter view" (current/next, notes, timer, ink, area zoom, magnifier) to any HTML deck and works offline in Chrome/Edge. It is designed to be attached by pasting a prompt into Claude Code. — [GitHub jinnyjiinlee/presenter-mode](https://github.com/jinnyjiinlee/presenter-mode)
- **Other Claude Code HTML-deck skills found**: Keith-cclarity/presentation-slides-skill, alexanderop/html-presentation, bluedusk/html-slides and thmsgo18/presentation-forge (single self-contained index.html). The tosea.ai directory lists more. None advertises a zoom/pan camera in its search snippet. — [presentation-slides-skill](https://github.com/Keith-cclarity/presentation-slides-skill); [html-presentation](https://github.com/alexanderop/html-presentation); [html-slides](https://github.com/bluedusk/html-slides); [presentation-forge](https://github.com/thmsgo18/presentation-forge); [tosea.ai/slide-skills](https://tosea.ai/slide-skills)
- **Prezi-style hobby repos (2025–2026), all tiny**:
  - **Zlide** (0 stars, 2025-11) uses "a camera transform matrix," SVG `viewBox` manipulation, and "journeys" (ordered waypoints of frame IDs plus target zoom) that the presentation traverses. — [GitHub abhijeetunreal/Zlide](https://github.com/abhijeetunreal/Zlide)
  - **zoomieshyd-mail/prezi-style-presentation** has 0 stars and 1 commit, with no technical details. — [GitHub](https://github.com/zoomieshyd-mail/prezi-style-presentation)
  - **BillyRybka/peak-experience** describes itself as a "Prezi-style infinite canvas presentation system for YouTube videos" (0 stars). — [GitHub](https://github.com/BillyRybka/peak-experience)
- **Press coverage**: an XDA article describes "vibe-coding" slides instead of using PowerPoint. It was not fetched, so its details are unverified. — [XDA](https://www.xda-developers.com/vibe-coded-my-slides-instead-of-powerpoint/)

### Inferences
- **Feature matrix** (synthesised from the findings above):
  - **impress.js** has a native camera (pan, zoom, rotate, 3D), fragments (substep), presenter view (P console with notes and next), overview (`goto("overview")`), and hooks (`stepenter`/`stepleave`). PDF export is not built in. It can be a single offline file.
  - **reveal.js** has the best presenter tooling: speaker view, timers, pacing, PDF with notes, fragments, overview and an `autoanimate` event. It has no camera. The speaker view needs a local server when run locally, which weakens the double-clicked single-file case.
  - **Slidev** has a great presenter mode, click steps and PDF/PPTX export with clicks. It has no camera and needs a build step.
  - **Sozi** has a real camera over one SVG and a presenter console. Its editor and output are tied to an SVG/Inkscape workflow, and only maintenance-level updates have appeared since 2023.
  - **tldraw, React Flow, Konva, pixi-viewport, panzoom and d3-zoom** give an animated camera (`zoomToBounds`, `fitView`, `setCenter`, `animate`) but no notes, presenter view or PDF.
- **For custom motion graphics**, every option that exposes a DOM step-enter event (impress.js, reveal.js `slidechanged`/`fragmentshown`/`autoanimate`, Slidev hooks, or a DIY state machine) can start a GSAP/Motion timeline per zone. Canvas-only engines (Konva, Pixi) need the motion graphics drawn inside the canvas, or a DOM overlay synced to the camera.
- **A pragmatic hybrid**: use reveal.js for presenter, notes, PDF and fragments, and put your own camera layer on top. One full-viewport "world" div is tweened by GSAP on every `slidechanged`/`fragmentshown` event, with reveal.js slides used only as transparent step markers. This inherits reveal's speaker view and keyboard and clicker handling. I found no published example to cite.
- **The DIY "fit target element" computation** (standard math, not taken from a source): with `transform-origin: 0 0` on the world, let the target rect in world units be (x, y, w, h), the viewport (W, H) and the padding p. Then `s = min(W/(w+2p), H/(h+2p))`, `tx = W/2 − s·(x + w/2)`, `ty = H/2 − s·(y + h/2)`, and you tween the world to `translate(tx,ty) scale(s)`. For rotation, rotate the world by −θ around the target centre. tldraw's `zoomToBounds({inset})`, React Flow's `fitBounds({padding})` and camera-controls' `fitToBox(padding)` are library versions of the same idea.
- **For Prezi's "zoom out, travel, zoom in" feel**, interpolate the camera with `d3.interpolateZoom` (or port the van Wijk–Nuij formula) and drive t with GSAP. A linear tween of translate and scale feels flatter.

### Gaps
- I found no reliable first-party source on Prezi's 2026 prices; the third-party figures conflict.
- I could not verify Zumly's feature set or Hovercraft's (regebro/hovercraft, last push 2022-04-14) current role.
- Whether impress.js can export to PDF (for example by printing each step) is not documented in the sources I checked.
- tldraw publishes no commercial price, and the license does not say whether presenting a talk from localhost counts as a "Development Environment." Ask tldraw sales.
- I found no 2025–2026 Codrops, Smashing or CSS-Tricks tutorial specifically on a GSAP "camera" for Prezi-style decks. GSAP forum threads ask the question, but the snippets show no answers. — [GSAP forum tag](https://gsap.com/community/tags/fractal%20zooming%20navigation/)

## Which approach gives the most creative freedom while staying robust for a live talk?

### Takeaway
The most creative freedom comes from a DIY world-plus-camera in plain HTML/SVG, animated with GSAP (free for commercial use) or Motion (MIT). That gives full control of easing, flight paths (van Wijk zoom), rotation and per-zone timelines, and it can ship as one offline HTML file. The most robust low-effort base is impress.js (MIT, battle-tested camera, substeps, speaker console, step events) with GSAP timelines started on `impress:stepenter`. 3D (three.js, CSS3DRenderer, camera-controls) adds spectacle but more risk: blurry CSS3D text and GPU or projector variability. tldraw is very capable but its license needs a key for any public or production use.

### Cited Findings
- impress.js already provides the camera transforms (`data-x/y/z/scale/rotate`), substeps, a speaker console with notes and next preview, an overview step, and `impress:stepenter`/`stepleave` events for triggering custom animation. — [impress.js DOCUMENTATION.md](https://github.com/impress/impress.js/blob/master/DOCUMENTATION.md); [substep README](https://github.com/impress/impress.js/blob/master/src/plugins/substep/README.md); [impressConsole README](https://github.com/impress/impress.js/blob/master/src/plugins/impressConsole/README.md)
- impress.js's own README positions it for presenting "from your own laptop" and warns that embedding in web pages may not render for all visitors. — [GitHub impress/impress.js](https://github.com/impress/impress.js)
- GSAP, including plugins such as SplitText, MorphSVG, Flip and DrawSVG, is free for commercial use, and AI-generated code is explicitly allowed. — [gsap.com/standard-license](https://gsap.com/standard-license)
- d3.interpolateZoom gives a smooth, efficient pan-and-zoom path with an adjustable curvature `rho` and a recommended duration based on path length. — [d3js.org/d3-interpolate/zoom](https://d3js.org/d3-interpolate/zoom)
- @panzoom/panzoom shows the CSS-transform camera pattern on arbitrary DOM, SVG, canvas or iframe content with GPU acceleration. — [GitHub timmywil/panzoom](https://github.com/timmywil/panzoom)
- tldraw's camera API supports animated `zoomToBounds` and `setCamera` with easing and a locked camera for slideshows. However, production or public use requires a license key, watermark enforcement exists, and the software may send usage data. — [tldraw.dev/sdk-features/camera](https://tldraw.dev/sdk-features/camera); [tldraw LICENSE.md](https://github.com/tldraw/tldraw/blob/main/LICENSE.md)
- camera-controls and drei `<CameraControls/>` give promise-based (`await`) camera transitions, `fitToBox` with padding, and `rest` events. Those make zone-arrival triggers easy in a 3D scene. — [GitHub yomotsu/camera-controls](https://github.com/yomotsu/camera-controls); [drei camera-controls.mdx](https://github.com/pmndrs/drei/blob/master/docs/controls/camera-controls.mdx)
- CSS3DRenderer text can be blurry because `scale.set` uses CSS `transform: scale`. The fix reported on the three.js forum is to enlarge the font (for example 10×) and scale the object down. — [three.js forum: Blurry text on CSS3D](https://discourse.threejs.org/t/blurry-text-on-css3d/53966)
- Robust presenter features are strongest in reveal.js (speaker view, pacing timer, PDF with notes), Slidev (synced presenter windows, PDF/PPTX per click) and Spectacle (presenter mode, overview, PDF export mode). None offers a Prezi-style camera. — [revealjs.com/speaker-view](https://revealjs.com/speaker-view/); [sli.dev/guide/ui](https://sli.dev/guide/ui); [sli.dev/guide/exporting](https://sli.dev/guide/exporting); [Spectacle presenting-controls](https://github.com/FormidableLabs/spectacle/blob/main/docs/presenting-controls.mdx)
- A standalone presenter-view add-on exists for any HTML deck (jinnyjiinlee/presenter-mode: notes, timer, next slide, ink, magnifier; offline; Chrome/Edge). It could be adapted to a DIY camera deck. — [GitHub jinnyjiinlee/presenter-mode](https://github.com/jinnyjiinlee/presenter-mode)

### Inferences
- **Recommended architecture for maximum freedom and live robustness** (synthesis):
  1. One `#world` container holding absolutely positioned zone elements in DOM or SVG.
  2. A `steps[]` array; each step has a zone target, optional rotation, a camera-padding override and an `enter()`/`leave()` timeline.
  3. A small state machine with `next`/`prev` that first plays a zone's remaining sub-steps (fragments), then flies the camera.
  4. `location.hash = #/step-N` for reload-safe recovery mid-talk.
  5. Keyboard mapping for clickers: most clickers send PageUp/PageDown, arrow keys or B/period. Handle `ArrowRight`/`ArrowLeft`, `PageDown`/`PageUp`, `Space` and `Enter`.
  6. A presenter window synced with `BroadcastChannel` or `postMessage`, showing notes, next step and a timer.
  7. A `?static`/reduced-motion mode that cuts instead of flying.
  8. A `?print` mode that lays each zone out as a page for PDF.

  All of this is plain web-platform code that Claude can generate. It is offline-safe as a single file if fonts and assets are inlined. None of it comes from one cited source; it combines the patterns documented above.
- **Lowest risk with less custom code**: use impress.js v2 (from GitHub or jsDelivr, not the stale npm 1.1.0), its substep and console plugins, and GSAP timelines keyed on `impress:stepenter`. Test the deck in the exact browser and laptop used on stage, since impress.js targets self-presentation.
- **Prefer 2D DOM/SVG over Canvas (Konva or Pixi)** for text-heavy talks. DOM text can be re-rastered crisp at rest, while canvas text has to be redrawn at the right pixel ratio. Choose Canvas or WebGL only when particle-heavy motion graphics require it.
- **Use 3D (three.js or R3F)** only if spatial depth is central to the story. It adds GPU dependence, CSS3D text-blur workarounds and a heavier bundle.

### Gaps
- I found no benchmark comparing frame rates of DOM-transform, SVG-viewBox and canvas cameras on typical presentation laptops or projectors.
- I found no published reference implementation of a "reveal.js + custom camera layer" hybrid to cite.

## Which are actively maintained in 2026? Licenses and any costs?

### Takeaway
**Actively maintained in 2026, with releases or substantive commits**: reveal.js 6.x, Slidev v53, Marp CLI 4.5, tldraw 5.5, Excalidraw, Konva 10.8, React Flow 12.12, @panzoom/panzoom 4.6, anvaka/panzoom 9.4, three.js r186, drei and R3F, Motion 14.x, GSAP 3.15. **Maintenance mode**: impress.js (last release 2022; docs and CI commits in 2025–2026), Spectacle (last release Oct 2025), Sozi (last release 2023; dependabot only), pixi-viewport (last commit Feb 2025), d3-zoom (stable since 2021). **Abandoned**: jmpress.js, MDX Deck, WebSlides. **Strut** has been reborn as a hosted AGPL app. Nearly everything is MIT, ISC or MPL and free. The exceptions are tldraw (custom license; production needs a paid or trial key, price not published), GSAP (free but proprietary), Slides.com ($5–$28/month), Excalidraw+ (presentations are a paid feature) and Prezi (about $7–29/month per third-party sources).

### Cited Findings
- reveal.js: MIT, 6.0.2 (2026-09-10), 6.0.0 (2026-03-11). — [reveal.js releases](https://github.com/hakimel/reveal.js/releases)
- Slidev: MIT, v53.0.0 (2026-09-16). — [GitHub slidevjs/slidev](https://github.com/slidevjs/slidev)
- Marp CLI: MIT, v4.5.1 (2026-09-06). Marpit v3.2.3 (2026-09-04). — [marp-cli](https://github.com/marp-team/marp-cli); [marpit](https://github.com/marp-team/marpit)
- Spectacle: MIT, last release 10.2.3 (2025-10-10). The last commit (2026-09-24) is a dependency upgrade. — [GitHub FormidableLabs/spectacle](https://github.com/FormidableLabs/spectacle)
- impress.js: MIT, last release v2.0.0 (2022-07-22). The 2025–2026 commits are CI, typo and docs changes; npm is stuck at 1.1.0 (2020). — [GitHub impress/impress.js](https://github.com/impress/impress.js); [npm impress.js](https://www.npmjs.com/package/impress.js)
- jmpress.js: npm last release 2014-01-19, and GitHub shows no license file. — [npm jmpress](https://www.npmjs.com/package/jmpress); [GitHub jmpressjs/jmpress.js](https://github.com/jmpressjs/jmpress.js)
- Sozi: MPL-2.0, last release v23.07 (2023-07-25). The 2026 commits are dependabot merges. — [GitHub sozi-projects/Sozi](https://github.com/sozi-projects/Sozi)
- Strut: AGPL-3.0, rewritten as a hosted app on React 19, TanStack Start and Rindle. Last commit 2026-09-17. — [GitHub tantaman/strut](https://github.com/tantaman/strut)
- MDX Deck: last commit 2021-08-03. WebSlides: last commit 2020-09-05. — [mdx-deck](https://github.com/jxnblk/mdx-deck); [WebSlides](https://github.com/webslides/WebSlides)
- tldraw: v5.5.2 (2026-10-02). Its custom license forbids production use without a key. It offers a 100-day trial, value-based commercial pricing, startup discounts and a free hobby license. — [tldraw LICENSE.md](https://github.com/tldraw/tldraw/blob/main/LICENSE.md); [tldraw.dev/pricing](https://tldraw.dev/pricing)
- Excalidraw: MIT, 0.18.1 (2026-04-20). Presentations require Excalidraw+ (14-day trial). — [GitHub excalidraw](https://github.com/excalidraw/excalidraw); [Excalidraw+ presentations](https://plus.excalidraw.com/use-cases/presentations)
- Konva: MIT, 10.8.0 (2026-10-12). — [GitHub konvajs/konva](https://github.com/konvajs/konva)
- pixi-viewport: MIT, 6.0.3 (2024-11-27), last commit 2025-02-03. — [GitHub pixi-viewport](https://github.com/pixijs-userland/pixi-viewport)
- xyflow: MIT, `@xyflow/react` 12.12.0 (2026-09-24). — [GitHub xyflow/xyflow](https://github.com/xyflow/xyflow)
- d3-zoom: ISC, v3.0.0 (2021-06-11). — [GitHub d3/d3-zoom](https://github.com/d3/d3-zoom)
- @panzoom/panzoom: MIT, 4.6.2 (2026-04-02). anvaka/panzoom: MIT, 9.4.4 (2026-03-26). — [timmywil/panzoom](https://github.com/timmywil/panzoom); [anvaka/panzoom](https://github.com/anvaka/panzoom)
- three.js: MIT, r186 (2026-09-24). camera-controls: MIT, v3.1.2 (2025-11-17). drei: MIT, 10.7.9 (2026-09-25). R3F: MIT, v9.8.1 (2026-09-24). — [three.js](https://github.com/mrdoob/three.js); [camera-controls](https://github.com/yomotsu/camera-controls); [drei](https://github.com/pmndrs/drei); [react-three-fiber](https://github.com/pmndrs/react-three-fiber)
- GSAP: 3.15.0 (2026-04-13). It is free under the proprietary Standard "no charge" license, including commercial use. — [gsap.com/standard-license](https://gsap.com/standard-license); [npm gsap](https://www.npmjs.com/package/gsap)
- Motion: MIT, 14.2.0 (2026-10-13). Motion+ is $399 one-time (Solo) or an annual per-seat Team plan. — [npm motion](https://www.npmjs.com/package/motion); [motion.dev/plus](https://motion.dev/plus)
- Slides.com: Lite $5/$7, Pro $10/$14, Team $20/$28 per month (annual/monthly). — [slides.com/pricing](https://slides.com/pricing)
- Prezi: about $7 (Standard), $15–19 (Plus) and $25–29 (Premium) per month; the sources conflict. — [CostBench](https://www.costbench.com/software/ai-presentations/prezi/); [Dupple](https://dupple.com/reviews/prezi); [Layer3 Labs](https://www.layer3labs.io/guides/is-prezi-worth-it)

### Inferences
- **For a zero-cost, license-clean deck**, combine impress.js or DIY, GSAP or Motion, and optionally three.js. All are free. GSAP is free but not OSI-licensed, so prefer Motion or WAAPI if an open-source-only policy matters.
- "Last commit in 2026" overstates the health of several repos (Sozi, Shower, jmpress) because those commits are dependabot or security merges. Use release dates as the better signal.

### Gaps
- Exact tldraw commercial prices are not public.
- I found no official statement on whether impress.js is seeking maintainers or plans a v3.

## Known pitfalls: blurry text when zooming, motion sickness and accessibility, projector resolution, fullscreen

### Takeaway
Blurry text comes mainly from rasterising content at one scale and then scaling it. Chrome re-rasters on scale change unless `will-change: transform` is set, so keep `will-change` on only during the flight and remove it at rest to get a crisp re-raster. Better still, design each zone so the camera rests at scale ≈ 1, which is how impress.js's inverse-scale model works. CSS3D needs a "big font, small object" trick. Large zoom and pan flights are a vestibular trigger, so honour `prefers-reduced-motion` (WCAG 2.3.3 AAA, technique C39) with a cut or crossfade fallback, and keep flights short and shallow (low `rho`). I found no authoritative sources on projector-specific rendering.

### Cited Findings
- Since Chrome 53, "all content is re-rastered when its transform scale changes." The post says this applies to scale changes made by script, not to CSS animations or Web Animations. — [Chrome for Developers: Re-rastering composited layers on scale change (2016)](https://developer.chrome.com/blog/re-rastering-composite)
- `will-change: transform` means "please animate it fast." Content is rastered into a fixed bitmap that is not re-rastered on transform updates. Removing `will-change` triggers a crisp re-raster on the next animation frame. You can remove it and re-add it in `requestAnimationFrame` to re-raster mid-animation, and add `transform: translateZ(0)` to keep the composited layer. — [Chrome for Developers](https://developer.chrome.com/blog/re-rastering-composite)
- A CSSWG issue asks for a way to raise raster resolution, so zoom-ins stay sharp without losing the fast path. That means no standard solution exists yet. — [w3c/csswg-drafts#7848](https://github.com/w3c/csswg-drafts/issues/7848)
- GSAP community articles report the trap of rastering at a small initial scale and growing to blurry, and they recommend toggling `will-change` back to `auto` after the animation. — [gsap.com community articles](https://gsap.com/community/tags/articles/); [GSAP forum: blurry text after animation in Chrome](https://greensock.com/forums/topic/29123-blurry-text-after-animation-in-chrome-any-updates/)
- Community reports (not authoritative):
  - Fractional translate values can blur text, and rounding them fixed one case. — [Glide issue via Lightrun](https://lightrun.com/answers/glidejs-glide-blurry-text-when-translate3d-is-a-decimal)
  - A parent's transform can be the cause. — [Webflow forum](https://discourse.webflow.com/t/scaling-text-issue/119239)
  - `perspective(1px) scale(...)` was reported to help in 2014. — [CSS-Tricks forum](https://css-tricks.com/?p=241806)
  - A WebKit bug blurs scaled containers that hold iframes with fixed content. — [WebKit bug 133801](https://bugs.webkit.org/show_bug.cgi?id=133801)
- CSS3DRenderer blur: scale the font up about 10× and scale the CSS3DObject down, or size the text element at full window width and scale down. — [three.js forum](https://discourse.threejs.org/t/blurry-text-on-css3d/53966)
- @panzoom/panzoom's FAQ flags "weird text resizing" with SVG text elements (issue #593). — [GitHub timmywil/panzoom](https://github.com/timmywil/panzoom)
- impress.js's `data-scale` semantics: a step with `data-scale="4"` appears 4× larger, so the presentation scales it down to its correct size when it is active. — [impress.js DOCUMENTATION.md](https://github.com/impress/impress.js/blob/master/DOCUMENTATION.md)
- WCAG 2.3.3 Animation from Interactions (Level AAA): "Motion animation triggered by interaction can be disabled, unless the animation is essential…" The intent cites vestibular reactions (dizziness, nausea, headaches) and gives parallax as an example. The recommended technique is C39, the CSS `prefers-reduced-motion` query. — [W3C Understanding 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- Secondary guidance lists zoom effects among vestibular triggers and recommends a static alternative under `prefers-reduced-motion`. — [openskillindex accessible-motion](https://openskillindex.com/skills/majiayu000-claude-skill-registry-accessible-motion); [U-Michigan KB: vertigo and vestibular disorders](https://teamdynamix.umich.edu/TDClient/30/Portal/KB/Article/14019/Accommodating-Vertigo-and-Vestibular-Disorders)
- `d3.interpolateZoom.rho()` near 0 makes the path almost linear, meaning less dramatic zoom-out. The default is √2. — [d3js.org/d3-interpolate/zoom](https://d3js.org/d3-interpolate/zoom)
- Live-talk robustness notes from the frameworks:
  - reveal.js speaker view needs a local web server when run locally.
  - reveal.js 6.0.2 fixed pinch-to-zoom triggering slide changes.
  - Marp's presenter view "may become disabled" if its requirements aren't met.
  - Slidev's browser exporter may not work well outside Chromium.
  - presenter-mode supports Chrome and Edge.
  - [revealjs.com/speaker-view](https://revealjs.com/speaker-view/); [reveal.js releases](https://github.com/hakimel/reveal.js/releases); [marp-cli README](https://github.com/marp-team/marp-cli); [sli.dev/guide/exporting](https://sli.dev/guide/exporting); [presenter-mode](https://github.com/jinnyjiinlee/presenter-mode)
- Fullscreen affordances exist in most tools:
  - reveal.js `enter-fullscreen` class (5.1.0)
  - Spectacle Alt+Shift+F
  - Slidev `f`
  - impress.js fullscreen plugin
  - [reveal.js releases](https://github.com/hakimel/reveal.js/releases); [Spectacle controls](https://github.com/FormidableLabs/spectacle/blob/main/docs/presenting-controls.mdx); [sli.dev/guide/ui](https://sli.dev/guide/ui); [impress.js plugins](https://github.com/impress/impress.js/tree/master/src/plugins)
- Excalidraw smart-presentation's fork has no touch support and fixed animation timing. — [GitHub excalidraw-smart-presentation](https://github.com/excalidraw-smart-presentation/excalidraw-smart-presentation.github.io)

### Inferences
- **Text crispness checklist for a DIY camera**:
  - Author each zone at the size it will be viewed. When the camera rests, the world scale for that zone should be about 1, so zones that appear "small" on the map are built at normal font size and placed with a small `scale()`, impress.js style.
  - Set `will-change: transform` on the world only during flights and remove it on arrival, which forces a crisp re-raster.
  - Round the resting translate to whole device pixels.
  - Prefer SVG text or vector content for huge zoom ratios.
  - Avoid nesting extra scaled parents.
  - Test in the exact browser you will present from; the Chrome guidance dates from 2016 and Safari and Firefox behave differently.
- **Motion-sickness mitigations**:
  - Shorter flights (about 0.8–1.5 s).
  - Ease-in-out.
  - A low zoom-out curvature (`rho` < √2).
  - Avoid continuous rotation.
  - A `prefers-reduced-motion` or `?reduced` switch that cuts or crossfades between zones.
  - A manual "static mode" toggle for the presenter, because a projected room cannot rely on the audience's OS setting.
- **Projector resolution and fullscreen**:
  - Fit the camera to the actual viewport (`innerWidth`/`innerHeight`, recalculated on `resize` and fullscreen change) rather than a hard-coded 1920×1080.
  - Keep generous padding so 4:3 or low-resolution projectors don't crop zones.
  - Enter fullscreen from a key handler, since browsers generally require a user gesture.
  - Inline fonts so offline machines render identically.
  - These are engineering practice, not cited facts.
- **Single-file offline caveat**: a reveal.js-style separate speaker window or a notes server may need `http://` rather than `file://`, so a DIY presenter window synced with BroadcastChannel should also be tested from `file://`.

### Gaps
- I found no authoritative 2025–2026 source on projector-specific issues (scaling, color, refresh) for HTML presentations.
- I found no current (2025–2026) Chrome, Firefox or Safari documentation confirming that the 2016 re-raster behaviour is unchanged.
- I found no measured data on the prevalence of motion sickness from Prezi-style zooming; one testparty.ai figure ("35% of adults over 40 have vestibular disorders") had no primary source and is excluded.
- I found no source quantifying safe flight duration or zoom ratio for vestibular comfort.
