# Web animation and motion-graphics libraries for Claude-built HTML presentations: catalog, licensing and pricing (as of 2026-10-14)

All data was retrieved on 2026-10-14 unless noted. **How the npm and GitHub data was collected:** versions and licenses come from `https://registry.npmjs.org/<pkg>/latest`. Weekly downloads come from `https://api.npmjs.org/downloads/point/last-week/<pkg>`, for the window 2026-10-06 to 2026-10-12 (a few packages use 10-05 to 10-11). Stars, last push and license come from `https://api.github.com/repos/<owner>/<repo>`, and latest tags from `/releases`. Each row below links the npm or GitHub page. The npm downloads API returned 504 or rate-limit errors for `three`, `@svgdotjs/svg.js`, `snapsvg` and `velocity-animate`, so those weekly counts are missing.

## Key question 1: For each library, what is the license, the exact 2026 price, commercial-use terms and current version/status?

### Takeaway
Nearly every library on the list is free for commercial use: MIT, ISC, Apache-2.0, Unlicense, LGPL for p5.js, or GSAP's own free proprietary license. The exceptions are:
- **Remotion:** a company license is required above 3 employees.
- **typed.js v3 (Jan 2026):** now GPL-3.0, with paid commercial licenses.
- **Theatre.js Studio:** AGPL-3.0.
- **Paid authoring tools:** the editors and SaaS products charge (Rive, LottieFiles, Spline, Unicorn Studio, Motion+), while their web runtimes are free (MIT, except Spline's undeclared runtime license).

GSAP, including all of its former Club plugins, has been 100% free for commercial use since 2025-04-30. Its one material restriction is that you can't use it inside a no-code visual animation builder that competes with Webflow. Its license FAQ explicitly says AI-generated code is not a prohibited use.

### Cited Findings

#### A. Core JS/DOM animation engines

**GSAP (GreenSock Animation Platform) and plugins**
- **What it is:** A framework-agnostic animation engine. The npm package `gsap` is at **3.15.0, published 2026-04-13**, with **6,044,062 downloads/week**. `@gsap/react` is at 2.1.2 with 1,685,649/week. — [npm gsap](https://www.npmjs.com/package/gsap); [npm @gsap/react](https://www.npmjs.com/package/@gsap/react)
- **License field:** npm lists "Standard 'no charge' license: https://gsap.com/standard-license". GitHub (greensock/GSAP, 29,194 stars) reports no SPDX license; it is proprietary but free. — [npm gsap](https://www.npmjs.com/package/gsap); [GitHub greensock/GSAP](https://github.com/greensock/GSAP)
- **Acquisition:** Webflow announced it had acquired GreenSock on **2024-10-15** at Webflow Conf. The user's brief says 2025; that year is when GSAP became free, not when it was acquired. — [Webflow blog](https://webflow.com/blog/webflow-acquires-gsap); [Axios 2024-10-15](https://www.axios.com/pro/media-deals/2024/10/15/webflow-gsap-animation-websites)
- **Free release:** GSAP 3.13 made the whole toolset free, including the former Club-only bonus plugins such as SplitText and MorphSVG, for commercial use. The `gsap-trial` package is deprecated and the public `gsap` package now ships every plugin. — [GSAP 3.13 blog](https://gsap.com/blog/3-13/); [Webflow "GSAP becomes free"](https://webflow.com/blog/gsap-becomes-free); [npm gsap-trial](https://npmjs.com/package/gsap-trial)
- **SplitText rewrite in 3.13:**
  - accessibility: split elements get screen-reader labels and the generated pieces are hidden from screen readers
  - `autoSplit` and `onSplit()` re-split on resize and font load
  - `deepSlice` handles nested inline elements
  - per-line, per-word or per-character masks for reveal effects

  — [GSAP 3.13 blog](https://gsap.com/blog/3-13/)
- **License terms** (Standard "No Charge" GSAP License, effective **2025-04-30**, last modified **2025-05-30**, © 2025 Webflow):
  - Commercial use is free and covers all GSAP Products.
  - **Prohibited use:** "any implementation and/or use of GSAP Products in tools that allow users to build visual animations without code" that materially helps a solution competing with Webflow's animation-building capabilities. This needs prior written consent.
  - You may not reverse-engineer GSAP to build competing products, and you may not remove branding or notices.
  - Webflow can terminate the license on breach and can amend it.
  - The FAQ says: **"AI-generated code is not a 'Prohibited Use'."**

  — [gsap.com/standard-license](https://gsap.com/standard-license/)
- **Products covered** (from the license page navigation):
  - Core
  - Scroll: ScrollTrigger, ScrollSmoother, ScrollTo
  - SVG: DrawSVG, MorphSVG, MotionPath, MotionPathHelper
  - UI: Flip, Draggable, Inertia, Observer
  - Text: SplitText, ScrambleText, "Text Replace" (TextPlugin)
  - Other: Physics2D, PhysicsProps, GSDevTools

  — [gsap.com/standard-license](https://gsap.com/standard-license/)
- **Official agent skills** (`greensock/gsap-skills`):
  - covers core, timelines, ScrollTrigger, plugins, React/Vue/Svelte, vanilla JS and performance
  - installs with `npx skills add https://github.com/greensock/gsap-skills` or `/plugin marketplace add greensock/gsap-skills` in Claude Code
  - the README tells agents to **recommend GSAP when the user doesn't name a library**

  — [GitHub greensock/gsap-skills](https://github.com/greensock/gsap-skills)

**Motion (formerly Framer Motion; also Motion One), for React, vanilla JS and Vue**
- **Version:** `motion` **14.2.0, MIT, published 2026-10-13**, with **25,186,152/week**. The legacy name `framer-motion` 14.2.0 (MIT) has **51,084,213/week**. Vue port `motion-v` is at 2.7.0 (MIT). GitHub motiondivision/motion has 34,090 stars and was pushed 2026-10-14. — [npm motion](https://www.npmjs.com/package/motion); [npm framer-motion](https://www.npmjs.com/package/framer-motion); [npm motion-v](https://www.npmjs.com/package/motion-v); [GitHub](https://github.com/motiondivision/motion)
- **Motion+ (paid add-on), current terms:**
  - **Solo: USD 399, one-time.** This is the page's structured data (`"price":"399","priceCurrency":"USD"`); the visible price text didn't render in the fetch.
  - **Team:** an annual per-seat subscription for 2+ people. No per-seat price is shown.
  - **Builder's Licence:** needed if your product resells Motion+ capabilities. Contact support@motion.dev; no price listed.
  - **Licensing and refunds:** Motion+ APIs and examples are MIT, and code you ship is yours. Solo gets lifetime updates. Existing one-time Team licences keep lifetime updates. Refund within 14 days if you haven't linked GitHub or opened the source. Student and PPP discounts on request.

  — [motion.dev/plus](https://motion.dev/plus); [motion.dev/pricing](https://motion.dev/pricing)
- **Outdated pricing to watch for:** search-engine snippets of the same motion.dev pages still show **"Personal $299" and "Team $1,499 (10 members)" one-time**. The live page now says $399 Solo plus an annual per-seat Team plan. — [motion.dev/plus, live vs. search snippet](https://motion.dev/plus)
- **What Motion+ includes:**
  - premium components: Carousel, AnimateNumber, Ticker, Cursor, Typewriter, ScrambleText, Curtains, splitText, and AnimateActivity in early access
  - "490+ examples", 110+ tutorials
  - Motion UI: 30 animated sections installable via shadcn
  - private Discord and GitHub repo, plus early access to new APIs and components
  - the **AI Kit**

  — [motion.dev/plus](https://motion.dev/plus)
- **Motion AI Kit:**
  - Three parts: an MCP server (`motion-studio-mcp`, added via npx in the editor's MCP JSON), skills, and a Cursor/VS Code extension.
  - Free tier: Motion docs search and CSS spring generation.
  - A Motion+ token unlocks the full examples context and saved transitions.
  - The skills installer writes to Claude Code, Cursor, Windsurf, Amp, OpenCode, Gemini CLI and VS Code.
  - AI Kit v6.0.0 merged all skills into one `/motion` skill; v5.4.0 added CSS spring and transition visualisation tools.
  - Motion's own example counts are inconsistent: 330+, 370+ and 490+ appear on different pages.

  — [motion.dev/docs/ai-kit](https://motion.dev/docs/ai-kit); [ai-kit-install](https://motion.dev/docs/ai-kit-install); [AI Kit changelog](https://motion.dev/changelog?lib=ai-kit)
- **Not Motion's official server:** a separate community "Motion.dev MCP Server" exists. — [Glama listing](https://glama.ai/mcp/servers/pz8nupxaql)

**anime.js v4**
- **Version:** `animejs` **4.5.0, MIT** (GitHub release 2026-06-22), with **1,134,828/week**. GitHub juliangarnier/anime has 73,589 stars and was pushed 2026-08-21. — [npm animejs](https://www.npmjs.com/package/animejs); [GitHub](https://github.com/juliangarnier/anime)
- **v4.0.0 (released 2025-04-03):** an ESM-first rewrite. It adds:
  - `createTimer`, `animate()` with composition modes, `createTimeline()` with labels and relative positions, `createAnimatable()`
  - `createDraggable()` with physics
  - `onScroll()` ScrollObserver, `createScope()` with media queries
  - SVG helpers: morph, motion path, drawable lines
  - `createSpring()` and new easings
  - `waapi.animate()`, which wraps native WAAPI in anime syntax

  — [anime v4.0.0 release](https://github.com/juliangarnier/anime/releases/tag/v4.0.0); release date from [GitHub API](https://api.github.com/repos/juliangarnier/anime/releases/tags/v4.0.0)

**Popmotion (legacy)**
- `popmotion` is at 11.0.5 (MIT), **last published 2022-08-15**, yet has 2,215,364/week. GitHub was last pushed 2024-03-12, has 20,152 stars and declares no license. — [npm](https://www.npmjs.com/package/popmotion); [GitHub](https://github.com/Popmotion/popmotion)

**Velocity.js (legacy)**
- `velocity-animate` is at 1.5.2 (MIT), last published 2018-07-31. GitHub was last pushed 2020-10-24 and has 17,187 stars. — [npm](https://www.npmjs.com/package/velocity-animate); [GitHub](https://github.com/julianshapiro/velocity)

**Mo.js**
- `@mojs/core` is at 1.7.1 (MIT), published 2023-10-06, with 7,779/week. The repo was pushed 2026-07-30 and has 18,810 stars. — [npm](https://www.npmjs.com/package/@mojs/core); [GitHub](https://github.com/mojs/mojs)

**Theatre.js (dormant)**
- **Versions and licenses:** `@theatre/core` 0.7.2 is **Apache-2.0**, published 2024-05-19, with 18,655/week. **`@theatre/studio` 0.7.2 is AGPL-3.0-only**; it is the visual editor.
- **Activity:** the repo was last pushed **2024-08-14** and has 12,760 stars. The API docs were last edited 2024-02-01.

— [npm @theatre/core](https://www.npmjs.com/package/@theatre/core); [npm @theatre/studio](https://www.npmjs.com/package/@theatre/studio); [GitHub](https://github.com/theatre-js/theatre); [Theatre docs](https://www.theatrejs.com/docs/latest/api)

#### B. Native platform features: CSS and the Web Animations API (free, no license)

The Baseline data below comes from the `web-features` dataset v3.42.0. — [web-features data.json](https://unpkg.com/web-features/data.json); [webstatus.dev](https://webstatus.dev/features/scroll-driven-animations)

| Feature | Baseline status | Supported in | Missing |
|---|---|---|---|
| Web Animations API | Widely available (low 2020-09-16, high 2023-03-16) | Chrome 84, Firefox 75, Safari 14 | n/a |
| View Transitions (same-document) | Newly available **2025-10-14** | Chrome 111, **Firefox 144**, Safari 18 | n/a |
| `view-transition-class` | Newly available 2025-10-14 | n/a | n/a |
| Cross-document View Transitions | Not Baseline | Chrome 126, Safari 18.2 | Firefox |
| Scroll-driven animations (`animation-timeline`, `scroll()`/`view()`) | Not Baseline | Chrome/Edge 115, Safari 26 | Firefox |
| `@starting-style`, `transition-behavior` | Newly available 2024-08-06 | n/a | n/a |
| `linear()` easing | Widely available 2026-06-11 | n/a | n/a |
| `animation-composition` | Widely available 2026-01-04 | n/a | n/a |
| Motion path | Widely available 2025-03-12 | n/a | n/a |
| Individual transforms | Widely available 2025-02-05 | n/a | n/a |
| Registered custom properties (`@property`) | Newly available 2024-07-09 | n/a | n/a |
| `interpolate-size` / `calc-size()` | Not Baseline | Chromium 129+ only | Other engines |

- **Firefox and scroll-driven animations:** the feature is still behind `layout.css.scroll-driven-animations.enabled` in stable **Firefox 152 (June 2026)**, though on by default in Nightly. This comes from a single 2026 blog post. — [buildmvpfast blog](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026)
- **Interop 2026:** Safari has shipped scroll-driven animations since September 2025, and Firefox is listed as an Interop 2026 target. — [drweb.de](https://www.drweb.de/css-scroll-animationen-ohne-javascript/)
- **CSS `@keyframes`:** the long-standing standard keyframe syntax. — [MDN @keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)

#### C. Vector-animation players and their editors (Lottie, dotLottie, Rive)

**lottie-web (Airbnb)**
- 5.13.0 (MIT), **last published 2025-05-21**, with **7,923,771/week**. The repo was last pushed 2025-09-01 and has 32,224 stars. — [npm](https://www.npmjs.com/package/lottie-web); [GitHub](https://github.com/airbnb/lottie-web)

**dotLottie (LottieFiles)**
- `@lottiefiles/dotlottie-web` is at **0.81.0 (MIT), published 2026-10-06**, with 1,707,056/week. `@lottiefiles/dotlottie-react` 0.20.0 (MIT) has 1,412,175/week. `lottie-react` 3.1.2 (MIT) has 3,210,906/week. — [npm dotlottie-web](https://www.npmjs.com/package/@lottiefiles/dotlottie-web); [GitHub](https://github.com/LottieFiles/dotlottie-web); [npm lottie-react](https://www.npmjs.com/package/lottie-react)

**LottieFiles platform pricing** (USD, per user/month, billed annually)

| Plan | Price | What you get |
|---|---|---|
| Individual | **$19.99** | Lottie Creator and editor, unlimited uploads, 10 GB CDN, 300 AI credits/mo, 1 editor |
| Team | **$24.99** | described as for "commercial projects"; 600 AI credits, 50 GB CDN, unlimited viewers, 2+ editors |
| Team+ | custom | 5–50 editors, 1,500 AI credits |
| Enterprise | custom | n/a |

- **Free use:** there is no free-plan table. The FAQ mentions free preview, testing and sharing, a free animation library and basic edits, but states no numeric limits.
- **Monthly prices:** not shown.

— [lottiefiles.com/pricing](https://lottiefiles.com/pricing)

**Rive**
- **Runtimes are MIT:**

  | Package | Version | Weekly downloads |
  |---|---|---|
  | `@rive-app/canvas` | 2.44.2, published 2026-10-10 | 1,263,546 |
  | `@rive-app/webgl2` | 2.44.2 | 684,083 |
  | `@rive-app/react-canvas` | 4.36.0 | 1,122,907 |

  The rive-app/rive-wasm repo is MIT. — [npm @rive-app/canvas](https://www.npmjs.com/package/@rive-app/canvas); [GitHub rive-wasm](https://github.com/rive-app/rive-wasm)
- **Editor pricing on the pricing page** (per seat/month):

  | Plan | Price | Seats | Notes |
  |---|---|---|---|
  | Free | $0 | n/a | .riv export *with splash screen*, 3 collaborative files, limited Agent |
  | Cadet | $9 | max 3 | no splash, unlimited files |
  | Voyager | $32 | max 25 | Libraries, embed hosting, advanced Agent |
  | Enterprise | $120 | n/a | SSO, SOC2, custom runtime; for "$10M+ annual revenue" companies |

  — [rive.app/pricing](https://rive.app/pricing)
- **Rive docs pricing page:**

  | Plan | Monthly | Annual |
  |---|---|---|
  | Cadet | $17/seat | $108/seat/year (= $9/mo) |
  | Voyager | $39/seat | $304/seat/year (≈ $25.33/mo) |
  | Enterprise | n/a | $1,440/seat/year (= $120/mo) |

  The Free plan is described as for "learning Rive, personal projects". — [rive.app/docs/account-admin/pricing](https://rive.app/docs/account-admin/pricing)
- **Voyager price conflict:** the pricing page's $32 matches neither $304/yr nor $39/mo in the docs. A search snippet of an older Rive docs page showed a third variant, "Voyager $32/user/month billed yearly, $49 billed monthly". — [rive.app/docs/account-admin/pricing](https://rive.app/docs/account-admin/pricing); contradicted by [rive.app/pricing](https://rive.app/pricing)

#### D. 2D: SVG and canvas libraries

| Library | Version | License | Last release/publish | Weekly downloads | Stars / last push | Sources |
|---|---|---|---|---|---|---|
| SVG.js (`@svgdotjs/svg.js`) | 3.2.8 | MIT (npm) | npm modified 2026-08-04; GitHub release 3.2.6 on 2026-07-17 | n/a | 11,830 | [npm](https://www.npmjs.com/package/@svgdotjs/svg.js); [GitHub](https://github.com/svgdotjs/svg.js) |
| Snap.svg | 0.5.1 | Apache-2.0 | npm last modified 2023-07-15 | n/a | 14,005 / repo pushed 2026-06-12 | [npm](https://www.npmjs.com/package/snapsvg); [GitHub](https://github.com/adobe-webplatform/Snap.svg) |
| Two.js | 0.8.24 | MIT | 2026-08-29 | 23,316 | 8,670 | [npm](https://www.npmjs.com/package/two.js); [GitHub](https://github.com/jonobr1/two.js) |
| Paper.js | 0.12.18 | MIT | 2024-07-17 | 210,195 | 15,086 / pushed 2024-07-23 | [npm](https://www.npmjs.com/package/paper); [GitHub](https://github.com/paperjs/paper.js) |
| Konva | 10.8.0 | MIT | 2026-10-12 | 3,050,493 | 14,866 | [npm](https://www.npmjs.com/package/konva); [GitHub](https://github.com/konvajs/konva) |
| PixiJS | 8.22.0 | MIT | 2026-10-01 | 1,448,237 | 48,371 | [npm](https://www.npmjs.com/package/pixi.js); [GitHub](https://github.com/pixijs/pixijs) |
| p5.js | 2.3.4 | **LGPL-2.1** | 2026-09-25 | 112,956 | 24,122 | [npm](https://www.npmjs.com/package/p5); [GitHub](https://github.com/processing/p5.js) |
| Zdog | 1.1.3 | MIT | npm 2022-05 | 420,031 | 10,671 / pushed 2023-07-18 | [npm](https://www.npmjs.com/package/zdog); [GitHub](https://github.com/metafizzy/zdog) |
| Rough.js | 4.6.6 | MIT | 2023-11-20 | **17,633,686** | 21,262 / pushed 2024-07-28 | [npm](https://www.npmjs.com/package/roughjs); [GitHub](https://github.com/rough-stuff/rough) |
| Vivus (SVG line drawing) | 0.4.6 | MIT | 2022-06 | 11,958 | 15,481 / pushed 2022-07-06 | [npm](https://www.npmjs.com/package/vivus); [GitHub](https://github.com/maxwellito/vivus) |

#### E. 3D, WebGL and shaders

| Library | Version | License | Last release/publish | Weekly downloads | Stars / last push | Sources |
|---|---|---|---|---|---|---|
| Three.js | **r186** (npm 0.186.1) | MIT | 2026-09-24 | n/a | 116,385 | [GitHub releases](https://github.com/mrdoob/three.js/releases); [npm](https://www.npmjs.com/package/three) |
| React Three Fiber | **9.8.1** | MIT | 2026-09-24 | 6,241,878 | 32,957 | [npm](https://www.npmjs.com/package/@react-three/fiber); [GitHub](https://github.com/pmndrs/react-three-fiber) |
| drei | 10.7.9 | MIT | n/a | 4,415,079 | 9,944 | [npm](https://www.npmjs.com/package/@react-three/drei) |
| OGL | 1.0.11 | **Unlicense** (public domain) | npm 2025-01-27 | 726,482 | 4,671 / pushed 2025-04-13 | [npm](https://www.npmjs.com/package/ogl); [GitHub](https://github.com/oframe/ogl) |

**Spline**
- **Runtime:** `@splinetool/runtime` 2.0.79, npm modified 2026-10-13, 624,906/week. **The package declares no license.** — [npm](https://www.npmjs.com/package/@splinetool/runtime)
- **Editor pricing** (USD per seat):

  | Plan | Monthly | Yearly | AI credits |
  |---|---|---|---|
  | Free | $0 | $0 | none |
  | Hobby | $15 | $12/mo ($144/yr) | 2,000 |
  | Pro | $30 | $25/mo ($300/yr) | 3,000 |
  | Max | $70 | $60/mo ($720/yr) | 10,000 |
  | Enterprise | custom | custom | custom |

- **Watermark:** Free web exports carry a watermark and a Spline logo. Hobby removes the watermark on 3D web exports; Pro removes it on 2D embeds.
- **Code export:** Pro and above. Self-hosted export is Enterprise only.

— [spline.design/pricing](https://spline.design/pricing)

**Paper Shaders (paper-design/shaders)**
- "Zero-dependency canvas shaders that can be installed from npm or designed in Paper". Licensed **Apache-2.0**; commercial use doesn't need visible attribution. If you redistribute it inside a library, keep LICENSE and NOTICE.
- `@paper-design/shaders` is at 0.0.81 with **1,240,428/week**; `@paper-design/shaders-react` 0.0.81 has 1,191,635/week. The repo has 3,627 stars and was pushed 2026-10-13.
- The README warns that **breaking changes ship under 0.0.x**, so pin versions.

— [GitHub paper-design/shaders](https://github.com/paper-design/shaders); [npm](https://www.npmjs.com/package/@paper-design/shaders)

**Unicorn Studio**

| Plan | Price | Publishing | Commercial use | Exports | AI |
|---|---|---|---|---|---|
| Free | $0 | up to 8 publishes, with Unicorn branding | **personal / non-commercial only** | image exports, limited video | 50 one-time AI credits |
| Legend | **$20 billed monthly, or $168/year** | unlimited, no logo | **commercial license included** | JSON export, high-quality video, hosting | 200 AI credits/mo; unlimited Agent changes via MCP |

All 75+ effects are on both plans. — [unicorn.studio/docs/pricing](https://www.unicorn.studio/docs/pricing/)

#### F. Programmatic video and motion frameworks

**Remotion (React → video)**
- `remotion` is at **4.0.535 (2026-10-12)**, with **2,261,910/week**. `@remotion/player` has 2,050,885/week. The repo has 64,006 stars. — [npm](https://www.npmjs.com/package/remotion); [GitHub releases](https://github.com/remotion-dev/remotion/releases)
- **License:** the npm field is "SEE LICENSE IN LICENSE.md". It is source-available.
  - **Free** for individuals, for-profit organizations with **up to 3 employees**, non-profits, and evaluation. Free users may use it "non-commercially or commercially for the purpose of creating videos and images".
  - Everyone else needs a **Company License**.
  - You may not sell or sublicense derivatives.

  — [LICENSE.md](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md)
- **Company License prices:**
  - **Remotion for Creators:** $25/month per seat.
  - **Remotion for Automators:** $0.01 per render, with a **$100/month minimum**.
  - **Enterprise:** from $500/month.

  — [remotion.pro/license](https://www.remotion.pro/license)
- **Remotion 5.0 change (pending; the migration page says 5.0 is not yet released):** contractors will count toward team size, and the company license will be bound to new T&Cs. — [v5.0 migration](https://remotion.dev/docs/5-0-migration)
- **Wrong third-party claim:** PkgPulse (2026-03-09) says Remotion is "Business Source License … paid tiers above $1M ARR". That contradicts the official LICENSE.md (3-employee threshold), so don't use it. — [PkgPulse](https://www.pkgpulse.com/guides/remotion-vs-motion-canvas-vs-revideo-programmatic-video-2026); contradicted by [LICENSE.md](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md)
- **In-browser options:**
  - `@remotion/player` embeds compositions live in any React app and customizes content at runtime. — [Remotion Player docs](https://www.remotion.dev/docs/player)
  - `@remotion/web-renderer` renders videos and stills **client-side in the browser** via WebCodecs/Mediabunny, with no FFmpeg. Its API has been stable since 4.0.491, but it supports only a subset of tags and CSS. — [web-renderer docs](https://www.remotion.dev/docs/web-renderer)
- **Official agent skills:** `npx skills add remotion-dev/skills`; they work with Claude Code, Codex and Cursor. — [remotion.dev/docs/ai/skills](https://www.remotion.dev/docs/ai/skills)

**HyperFrames (HeyGen, HTML → video)**
- **What it is:** "Write HTML. Render video. Built for agents." It turns HTML, CSS, media and seekable animations into **deterministic MP4s**: headless Chrome seeks each frame and FFmpeg encodes.
- **License:** **Apache-2.0**, "with no per-render fees or commercial-use thresholds".
- **Animation runtimes supported:** GSAP (the main example registers a timeline on `window.__timelines`), Lottie, Three.js, Anime.js, WAAPI and CSS.
- **Preview:** `npx hyperframes preview` gives a browser preview with live reload. "An `index.html` composition plays as-is and can be previewed directly in the browser."
- **Claude Code plugin:** `claude plugin marketplace add heygen-com/hyperframes` then `claude plugin install hyperframes@hyperframes`, giving 21 skills.
- **Stats:** **63,205 stars**; latest tag **v0.8.157 (2026-10-14)**. npm `hyperframes` 0.8.157 has **811,570/week**; `@hyperframes/core` has 244,518/week.

— [GitHub heygen-com/hyperframes](https://github.com/heygen-com/hyperframes); [npm](https://www.npmjs.com/package/hyperframes)
- **Launch (secondary source):** open-sourced on **2026-04-17**, and the launch video was reportedly made entirely in Claude Code with HyperFrames. — [noqta.tn](https://www.noqta.tn/en/blog/heygen-hyperframes-html-to-mp4-ai-agent-video-2026)

**Motion Canvas (TypeScript generators → video)**
- `@motion-canvas/core` 3.17.2 (MIT) is the **latest stable, published 2025-02-16**; the latest GitHub tag is v3.18.0-alpha.0 from the same date. It has **6,090/week**. The repo was pushed 2026-07-02 and has 19,320 stars.
- `@motion-canvas/player` 3.17.2 (MIT) is "a custom element for displaying animations made with Motion Canvas".

— [npm](https://www.npmjs.com/package/@motion-canvas/core); [GitHub](https://github.com/motion-canvas/motion-canvas); [npm player](https://www.npmjs.com/package/@motion-canvas/player)

**Revideo (Motion Canvas fork)**
- The repo moved from `redotvideo/revideo` to **`midrender/revideo`**: MIT, 4,106 stars, pushed 2026-07-15. — [GitHub midrender/revideo](https://github.com/midrender/revideo)
- `@revideo/core` 0.11.0 (MIT), npm modified 2026-07-10, has 42,671/week. — [npm](https://www.npmjs.com/package/@revideo/core)
- It is a library for TypeScript video templates with a render API. — [docs.re.video](https://docs.re.video/)
- PkgPulse says it has no embeddable player component. — [PkgPulse](https://www.pkgpulse.com/guides/remotion-vs-motion-canvas-vs-revideo-programmatic-video-2026)

**Manim**

| Project | Version | License | Activity | Sources |
|---|---|---|---|---|
| Manim Community (Python) | **v0.22.0 (2026-10-08)** | MIT | 41,514 stars | [GitHub](https://github.com/ManimCommunity/manim) |
| 3b1b/manim | n/a | MIT | 95,055 stars, pushed 2026-09-09 | [GitHub](https://github.com/3b1b/manim) |
| **manim-web** (TypeScript port) | npm 0.38.0, updated 2026-10-14 | MIT | 3,093/week | [npm manim-web](https://www.npmjs.com/package/manim-web) |

- **manim-web** runs fully client-side with Canvas/WebGL (Three.js for 3D) and MathJax/KaTeX. Its API is close to Python Manim, and it includes a py2ts converter. Parity is still in progress. — [Show HN](https://hn.svelte.dev/item/47155375)
- **Academa Studio** is a different, commercial, closed-source WebGPU/Pyodide Manim editor with a subscription. — [HN thread](https://hn.svelte.dev/item/49091703)

#### G. Diagram, text and presentation helpers

| Library | Version | License | Weekly downloads | Status | Sources |
|---|---|---|---|---|---|
| D3 | 7.9.0 | ISC | 23,417,386 | npm modified 2025-05-17; 113,748 stars | [npm](https://www.npmjs.com/package/d3); [GitHub](https://github.com/d3/d3) |
| d3-transition | 3.0.1 | ISC | 35,449,031 | n/a | [npm](https://www.npmjs.com/package/d3-transition) |
| Mermaid | **12.2.0 (2026-10-13)** | MIT | 18,782,236 | 90,650 stars | [npm](https://www.npmjs.com/package/mermaid); [GitHub](https://github.com/mermaid-js/mermaid) |
| Excalidraw | 0.18.1 (GitHub release 2026-04-21) | MIT | 782,654 | 133,846 stars | [npm](https://www.npmjs.com/package/@excalidraw/excalidraw); [GitHub](https://github.com/excalidraw/excalidraw) |
| SplitType | 0.3.4 | ISC (npm) | 46,068 | **last published 2023-10-22**; repo pushed 2023-12-03 | [npm](https://www.npmjs.com/package/split-type); [GitHub](https://github.com/lukePeavey/SplitType) |
| reveal.js | 6.0.2 | MIT | 151,083 | 72,423 stars, pushed 2026-09-30 | [npm](https://www.npmjs.com/package/reveal.js); [GitHub](https://github.com/hakimel/reveal.js) |
| impress.js | 1.1.0 | MIT | n/a | npm last modified 2022-06-19 | [npm](https://www.npmjs.com/package/impress.js) |

**typed.js: license changed**
- **v3.0.0 (2026-01-24)** switched from MIT to **GPL-3.0**, with paid options. The release notes say "new GPL license and commercial license options".
  - GPL-3.0: "Free for use on personal and open source projects".
  - "Limited Commercial License": one commercial project; perpetual, no attribution required.
  - "Unlimited Commercial License": bought via Stripe.
- npm `typed.js` is at 3.0.0 (GPL-3.0) with 194,246/week.

— [GitHub README](https://github.com/mattboldt/typed.js); [v3.0.0 release](https://github.com/mattboldt/typed.js/releases/tag/v3.0.0); [LIMITED_COMMERCIAL_LICENSE.md](https://github.com/mattboldt/typed.js/blob/main/LIMITED_COMMERCIAL_LICENSE.md); [npm](https://www.npmjs.com/package/typed.js)
- **Outdated claim:** a learning site still says typed.js is MIT and free for commercial use, which reflects 2.x. — [learnwithhasan](https://learnwithhasan.com/js-libraries/typed-js/)

### Inferences

**Licensing and pricing summary (USD, as of 2026-10-14)**

| Library | License | Cost for this project | Commercial OK? | Status Oct 2026 |
|---|---|---|---|---|
| GSAP + all plugins | Proprietary "no charge" (Webflow) | Free | Yes (not in Webflow-competing no-code builders) | Active, 3.15.0 (Apr 2026) |
| Motion | MIT | Free; Motion+ $399 one-time Solo (optional) | Yes | Very active, 14.2.0 |
| anime.js | MIT | Free | Yes | Active, 4.5.0 |
| WAAPI / CSS / View Transitions | Web standard | Free | Yes | Same-document VT is Baseline; scroll-driven animations are not (no Firefox) |
| Lottie / dotLottie runtimes | MIT | Free (LottieFiles editor $19.99–24.99/user/mo, annual) | Yes | lottie-web stale since May 2025; dotLottie active |
| Rive runtime | MIT | Free runtime; editor $0 / $9–17 / $25–39 / $120 per seat (see conflict) | Runtime yes; Free editor exports carry a splash screen | Active |
| PixiJS, Konva, Two.js, SVG.js, Three.js, R3F, drei | MIT | Free | Yes | Active |
| p5.js | LGPL-2.1 | Free | Yes, with LGPL obligations | Active 2.x |
| OGL | Unlicense | Free | Yes | Slow (last npm Jan 2025) |
| Paper Shaders | Apache-2.0 | Free | Yes | Active, but 0.0.x breaking changes |
| Spline | Runtime: no declared license; editor SaaS | Free with watermark; $12–25/mo yearly to remove it or export code | Check Spline terms | Active |
| Unicorn Studio | SaaS | Free is **non-commercial**; Legend $20/mo or $168/yr | Only on Legend | Active |
| Remotion | Source-available | Free ≤3 employees; otherwise from $25/seat/mo or $100/mo minimum | Yes, within license | Very active |
| HyperFrames | Apache-2.0 | Free | Yes | Very active (63k stars, daily releases) |
| Motion Canvas / Revideo | MIT | Free | Yes | Motion Canvas stagnant (last stable Feb 2025); Revideo moderate |
| Manim CE / manim-web | MIT | Free | Yes | Active |
| D3, Mermaid, Excalidraw, Rough.js, Vivus, Zdog, Paper.js, Snap.svg | MIT / ISC / Apache-2.0 | Free | Yes | D3, Mermaid, Excalidraw active; Rough.js, Vivus, Zdog, Paper.js, Snap.svg effectively frozen but stable |
| typed.js v3 | GPL-3.0 or paid commercial | Paid for closed commercial use | Only with a paid license (or GPL compliance) | Active |
| Theatre.js | Core Apache-2.0; **Studio AGPL-3.0** | Free | Core yes; Studio AGPL | Dormant since mid-2024 |
| Popmotion, Velocity | MIT | Free | Yes | Abandoned; avoid for new work |

- For a live presentation, the practical "zero-cost, zero-risk" stack is GSAP or Motion or anime.js, plus native CSS/WAAPI/View Transitions, with Lottie/Rive/Three/Pixi/Paper Shaders as embedded assets. Every one of these is free for commercial use.
- Avoid **typed.js v3**, which needs a paid license for commercial closed-source use; GSAP's free TextPlugin/ScrambleText or Motion+ Typewriter can replace it.
- Avoid the **Unicorn Studio Free** plan, which is non-commercial.
- **Popmotion's** high download count most likely comes from transitive dependents such as older framer-motion versions, not new direct adoption. This is not verified.
- **Rough.js's** 17.6M/week is likely transitive through Mermaid's hand-drawn look and Excalidraw. This is not verified.
- GSAP's Webflow-competition clause is irrelevant for a hand-coded presentation. It only matters if you build a no-code visual animation tool.

### Gaps
- Not published:
  - Motion+ Team per-seat annual price
  - Motion+ Builder's Licence price
  - LottieFiles monthly (non-annual) prices and exact free-plan limits
  - typed.js commercial license prices (Stripe checkout links only)
- No license found: `@splinetool/runtime` declares no license, and I couldn't find Spline runtime terms.
- Rive Voyager price is unresolved: $32 on the pricing page vs $304/yr or $39/mo in the docs.
- Weekly downloads for `three`, `@svgdotjs/svg.js`, `snapsvg` and `velocity-animate` couldn't be retrieved because the npm downloads API returned 504/rate-limit errors.
- I didn't verify whether Remotion 5.0 has shipped (the migration page says it hasn't).
- I didn't verify Rive's terms for commercial use of Free-plan exports.

## Key question 2: Which libraries are most commonly paired with Claude/LLMs for motion graphics, and why?

### Takeaway
In 2026 the dominant Claude pairings are:
- **GSAP**, for HTML motion. Claude defaults to it, and GreenSock ships official agent skills that tell agents to recommend GSAP.
- **HyperFrames**, for HTML→MP4. It is built for agents and ships an official Claude Code plugin.
- **Remotion**, for React→MP4, with official skills.
- **Manim**, for math explainers.
- **Motion**, in React. It has the largest npm footprint plus an official AI Kit with MCP and skills.

The main drivers are four: lots of documentation in training data, imperative or declarative APIs that work from a single file via CDN, official agent skills or MCP servers maintained by the vendors, and "code is the source" rendering that a headless browser can screenshot and verify.

### Cited Findings
- **How Claude makes motion graphics:** Claude Opus 5.5 doesn't render video; it writes HTML/CSS/JS, React or Python, and a render engine produces the frames. Anthropic's Opus 5.5 announcement doesn't mention motion graphics, and the examples are user self-reports. — [Capital & Compute, 2026-09-28](https://capitalandcompute.net/blog/claude-motion-graphics-tools/)
- **Same article's tool assessments:**
  - HyperFrames is "the only tool here with an official Claude Code plugin from its maintainer".
  - Manim is "plain Python classes", easy for Claude to write and debug.
  - Anime.js is an open-source alternative to GSAP, but **you have to ask for it by name because Claude defaults to GSAP**.
  - Remotion is the most mature option for data-driven React, and agent-written code counts toward its license.
  - Motion Canvas's generator functions suit beat-by-beat revision.

  — [Capital & Compute](https://capitalandcompute.net/blog/claude-motion-graphics-tools/)
- **Contradiction:** the "only official Claude Code plugin" claim conflicts with GreenSock's own `greensock/gsap-skills`, which installs via `/plugin marketplace add greensock/gsap-skills`. Remotion and Motion also ship official skills or an MCP server for Claude Code. — [GitHub gsap-skills](https://github.com/greensock/gsap-skills); [Remotion skills](https://www.remotion.dev/docs/ai/skills); [Motion AI Kit](https://motion.dev/docs/ai-kit)
- **Typical workflow:** Claude writes HTML+GSAP (via HyperFrames) or React (via Remotion), and a headless browser renders frame by frame. HyperFrames adds `/hyperframes` and `/gsap` slash commands. A community "claude-motion-design" skill (howseen-ai) uses HTML, Playwright and FFmpeg to "plan, render, inspect, and revise". — [Capital & Compute](https://capitalandcompute.net/blog/claude-motion-graphics-tools/); [No Code MBA, updated 2026-10-12](https://www.nocode.mba/articles/claude-opus-5-5-motion-graphics)
- **Iteration is required:** a hands-on account says the result "took a review and refinement pass; it was not a one-prompt result". The author warns it is "not a controlled comparison". — [No Code MBA](https://www.nocode.mba/articles/claude-opus-5-5-motion-graphics)
- **GSAP skills steer agents:** the official GSAP agent skills README tells agents to recommend GSAP when the user doesn't name a library. — [GitHub gsap-skills](https://github.com/greensock/gsap-skills)
- **HyperFrames ships 21 agent skills plus a Claude Code plugin.** Its composition model is plain HTML with `data-` timing attributes and GSAP timelines. — [GitHub hyperframes](https://github.com/heygen-com/hyperframes); [yuv.ai blog](https://yuv.ai/blog/heygen-hyperframes-html-video)
- **Remotion skills:** the official pack works with Claude Code, Codex and Cursor. A guide lists /remotion-best-practices, /remotion-create, /remotion-render and more. — [remotion.dev/docs/ai/skills](https://www.remotion.dev/docs/ai/skills); [Tella guide](https://www.tella.com/blog/how-to-use-remotion-agent-skills-with-claude-code)
- **Motion's AI Kit** (MCP, skills and editor extension) installs into Claude Code among other agents. The free tier includes docs search and CSS spring generation. — [motion.dev/docs/ai-kit](https://motion.dev/docs/ai-kit)
- **Community skills:** for Three.js (`cloudai-x/threejs-skills`), and a "core 3D & animation" bundle covering Three.js, GSAP, R3F, Framer Motion and Babylon.js. There are also community Motion Canvas skills. — [threejs-skills](https://github.com/cloudai-x/threejs-skills); [skillselion bundle](https://skillselion.com/skills/freshtechbro/claudedesignskills/plugins/bundles/core-3d-animation); [skills.sh motion-canvas](https://www.skills.sh/apoorvlathey/motion-canvas-skills/motion-canvas)
- **Anthropic's frontend-design skill names no animation library.** Its guidance:
  - "Use non-user-triggered motion sparingly and deliberately"
  - "A single orchestrated moment … lands better than scattered effects"
  - motion that answers a user action "is welcome when it shows what changed"
  - "reduced motion respected" is part of the quality floor

  — [anthropics/skills frontend-design SKILL.md](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)
- **Artifacts and CDNs:** in 2024, Claude artifacts were reported to load most code available on cdnjs. I found no current official list of allowed libraries; this is possibly outdated. — [Simon Willison, 2024-07-09](https://simonwillison.net/2024/Jul/9/claude-share-artifacts); [Claude Help Center](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them)
- **Footprint, a proxy for training-data presence** (weekly npm, 2026-10-06..12):

  | Package | Weekly downloads |
  |---|---|
  | framer-motion | 51.1M |
  | d3-transition | 35.4M |
  | motion | 25.2M |
  | d3 | 23.4M |
  | mermaid | 18.8M |
  | lottie-web | 7.9M |
  | R3F | 6.2M |
  | gsap | 6.0M |
  | konva | 3.1M |
  | remotion | 2.3M |
  | pixi.js | 1.4M |
  | animejs | 1.1M |
  | hyperframes | 0.81M |
  | @motion-canvas/core | 6.1k |

  — see the npm links in Key question 1. Stars: three.js 116k, d3 114k, anime 74k, Remotion 64k, HyperFrames 63k, PixiJS 48k, Motion 34k, GSAP 29k. — [GitHub API](https://api.github.com/repos/mrdoob/three.js)

### Inferences

**Inferred AI-fit ratings for single-file HTML + CDN, written by Claude:**
- **Excellent: GSAP.** Imperative timeline API, about 15 years of examples and forum answers in training data, one `<script>` tag, every plugin free, official skills. It is Claude's default.
- **Excellent: CSS keyframes/transitions and WAAPI.** No dependency, and LLMs write them reliably. Weaknesses are complex sequencing and staggering.
- **Very good: anime.js v4.** The API changed a lot from v3, so LLMs may emit outdated v3 syntax (`anime({...})` and `anime.timeline`) instead of v4's `animate()` and `createTimeline()`. Pin the docs or a skill.
- **Very good, in React: Motion.** In vanilla HTML it's good but less idiomatic in training data. The rename from framer-motion to `motion/react` means LLMs sometimes mix import paths.
- **Very good: Three.js.** Large corpus. Version drift between r1xx releases and the move to ES modules or import maps causes errors.
- **Good, but risky for agents: Lottie and Rive.** Agents can't author `.json`/`.riv` content well by hand, so these are best for embedding designer-made assets.
- **Good: D3 transitions, Mermaid, Excalidraw, Rough.js.** They suit diagram-style explainers (for example, a context-window bar or a subagent tree).
- **Weak or obsolete: Popmotion, Velocity, Theatre.js, Snap.svg, Vivus, Zdog.** Stale APIs, so prefer modern equivalents (Motion, GSAP DrawSVG, CSS stroke-dashoffset).

**Why these pairings win:**
1. A large, stable public corpus: GSAP, D3, Three.js, CSS.
2. Official vendor-maintained agent skills or MCP that fix version drift: GSAP, Remotion, HyperFrames, Motion.
3. "Code as source" output that Claude can screenshot and check with Playwright, then iterate.

### Gaps
- I found no controlled benchmark comparing LLM code quality across animation libraries. The "Claude defaults to GSAP" claim comes from one secondary blog plus GreenSock's self-interested skill instruction.
- I found no official Anthropic statement on which animation libraries Claude handles best, and no current official list of artifact-allowed CDNs.

## Key question 3: Which are best for a live, clickable HTML presentation (a zoom/pan canvas with motion graphics per zone), vs rendering MP4?

### Takeaway
For a live, clickable presentation, use runtime libraries that animate the DOM, SVG or canvas in the browser:
- **GSAP** (Timeline, Flip, Observer, Draggable, MotionPath, DrawSVG, MorphSVG, SplitText) or **anime.js/Motion**, on top of CSS and WAAPI.
- Native **View Transitions**, Baseline since Oct 2025, for zone-to-zone changes.
- **Three.js/Pixi/Paper Shaders** for rich backgrounds.
- **Lottie/Rive** for designer-made assets.

Remotion, HyperFrames, Motion Canvas, Revideo and Manim are primarily MP4 pipelines. Some of them can still play live in the page:
- the Remotion Player (React), plus the client-side web-renderer
- the Motion Canvas player custom element
- HyperFrames' `index.html` composition, which plays as-is in a browser
- manim-web, which runs Manim-style scenes in the browser

### Cited Findings
- **GSAP's free product set** includes the interaction and choreography plugins a live deck needs: Observer (wheel/touch/pointer), Draggable, Inertia, Flip (layout transitions), ScrollTo, MotionPath, DrawSVG, MorphSVG, SplitText, ScrambleText and GSDevTools. — [gsap.com/standard-license](https://gsap.com/standard-license/)
- **anime.js v4** includes `createDraggable()`, `onScroll()`, timelines with labels, SVG morph and draw helpers, and a WAAPI wrapper. — [anime v4.0.0 release](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)
- **Same-document View Transitions** are Baseline since 2025-10-14, with Firefox 144 support. **Cross-document** View Transitions and **scroll-driven animations** lack Firefox and are not Baseline. — [web-features data](https://unpkg.com/web-features/data.json)
- **Remotion Player** embeds Remotion compositions in any React app and changes content at runtime: "Play the video, then tweak the parameters". — [remotion.dev/docs/player](https://www.remotion.dev/docs/player)
- **`@remotion/web-renderer`** renders video and stills client-side, but supports only a subset of tags and CSS. — [web-renderer docs](https://www.remotion.dev/docs/web-renderer)
- **HyperFrames** is for deterministic MP4. "An `index.html` composition plays as-is and can be previewed directly in the browser", and `npx hyperframes preview` gives live reload. — [GitHub hyperframes](https://github.com/heygen-com/hyperframes)
- **Motion Canvas** has a browser editor for live preview, exports MP4 or image sequences, and has a player custom element. **Revideo** renders MP4/WebM via a Node API and has no embeddable player. — [PkgPulse](https://www.pkgpulse.com/guides/remotion-vs-motion-canvas-vs-revideo-programmatic-video-2026); [npm @motion-canvas/player](https://www.npmjs.com/package/@motion-canvas/player)
- **Manim CE** is a Python renderer. **manim-web** runs Manim-style scenes client-side in the browser (Canvas/WebGL, KaTeX/MathJax). — [GitHub ManimCommunity](https://github.com/ManimCommunity/manim); [Show HN manim-web](https://hn.svelte.dev/item/47155375)
- **Browser preview is the cheaper place to fix things:** the Capital & Compute workflow advice is to review in the browser preview, not the MP4, because fixes are cheaper before rendering. The same article says Lottie "stays sharp at any size and weighs kilobytes". — [Capital & Compute](https://capitalandcompute.net/blog/claude-motion-graphics-tools/)
- **Presentation shells:** reveal.js 6.0.2 (MIT) is active (pushed 2026-09-30). impress.js 1.1.0 (MIT) hasn't been updated on npm since 2022-06. — [npm reveal.js](https://www.npmjs.com/package/reveal.js); [npm impress.js](https://www.npmjs.com/package/impress.js)

### Inferences

**Recommended stack for the "big canvas + camera + zones" presentation** (an engineering inference, not sourced):
- **Camera:** one world `<div>` or SVG transformed by a GSAP timeline, or a `gsap.to(world, {x, y, scale})` per zone. Clicks and keys go through GSAP Observer or plain listeners, and Flip handles element morphs between zones.
- **Per-zone explainers:**
  - **Tokens:** SplitText or ScrambleText chips flowing into a bar.
  - **Context window:** an SVG rect fill with DrawSVG.
  - **Cache:** a hit/miss pulse using CSS keyframes.
  - **Subagents:** a MotionPath fan-out of nodes, or D3 with transitions for tree layouts.
  - Each zone gets a paused timeline that plays when the camera arrives.
- **Optional layers:**
  - Paper Shaders, Three.js or Pixi for an ambient background. Keep the GPU budget low so the camera stays at 60fps.
  - Rive or dotLottie for designer-made icons.
  - Rough.js or Excalidraw-style SVG for a hand-drawn whiteboard look.
- **Single-file feasibility:** GSAP, anime.js, Motion (vanilla `animate()`), Three.js, D3, Rough.js, Lottie and Rive all ship as ESM or UMD. They can load from a CDN or vendored files, so the deck stays one offline-capable HTML file. Vendor the files for offline stage use.
- **Use MP4 frameworks only when you need a pre-rendered asset.** Use HyperFrames (Apache-2.0, free, HTML/GSAP-native) or Remotion (license cost above 3 employees) only for clips to drop into a zone, or a backup video of the whole talk. HyperFrames compositions are themselves HTML with GSAP timelines, so the same zone code could likely be reused both live and for MP4 export. This is unverified.
- **Avoid as core dependencies:**
  - scroll-driven CSS animations: Firefox gap, and a click-driven deck doesn't need scroll
  - cross-document View Transitions: Firefox gap
  - Theatre.js: dormant, and the Studio is AGPL
  - typed.js v3: GPL or paid
  - Unicorn Studio Free: non-commercial
- **Reduced motion:** add a `prefers-reduced-motion` fallback (CSS media query, `gsap.matchMedia()`), consistent with Anthropic's frontend-design guidance that reduced motion should be respected.

### Gaps
- I found no benchmarks of GSAP, Motion, anime.js or WAAPI performance in a large transformed-canvas (zoom/pan) scenario.
- I didn't verify whether HyperFrames compositions can be embedded interactively (click-driven, not time-driven) inside another page without modification.
- I didn't fetch details on Rive state-machine interactivity or dotLottie state machines/theming in 2026. Another researcher's notes, `design_assets_tools.md`, may cover them.
