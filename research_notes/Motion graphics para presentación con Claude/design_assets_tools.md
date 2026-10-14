# Complementary design & asset tools for Claude-built animated HTML presentations (catalog, pricing, licenses) — as of Oct 2026

Research date: 2026-10-14. Official pricing pages were fetched live on that date unless the entry says "third-party". Where only third-party sources were reachable (official page blocked with HTTP 403 or rendered without prices), the entry is marked **[3rd-party / unverified]**. Currency is as shown on the page; some pages geolocated to EUR/GBP.

---

## Key Question 1 — What is each tool, how does it plug into an HTML/JS deck, export formats, free tier, paid prices, and commercial-use license?

### Takeaway
You can build a high-quality animated "big map" deck for almost nothing. GSAP (all plugins free for commercial use), open-source icons (Lucide, Phosphor, Tabler, Heroicons via Iconify), CC0 illustrations (Open Peeps, Humaaans), Paper Shaders (Apache-2.0), the MIT-licensed Lottie and Rive web runtimes, and free hosting (GitHub Pages or Cloudflare Pages) cover the core. The paid extras worth considering are only in a few places:
- Rive Cadet ($9/seat/mo) or Unicorn Studio Legend ($20/mo), to remove the branding or splash screen.
- Recraft (from about $10–12/mo), for commercial-rights vector/SVG generation.
- One video or image generator if you want hero footage.

Watch for free tiers that are **non-commercial** or **public-by-default**. That applies to Unicorn Studio Free, Recraft Free, Ideogram Free, Vercel Hobby, Meshy Free (CC BY) and Tripo Free (CC BY).

### Cited Findings

#### A. No-code / low-code motion & interactive tools with web-embeddable output

**Rive (interactive vector animation + state machines; exports .riv played by a JS runtime)**
- Plans: Free $0/seat/mo; Cadet $9/seat/mo (max 3 seats); Voyager $32/seat/mo (max 25 seats; libraries, embed URL hosting); Enterprise $120/seat/mo, marked as needed for companies with "$10M+ annual revenue". The page has a yearly/monthly toggle, but the text only shows one price per tier, so whether these are annual or monthly rates is ambiguous. — [Rive pricing](https://rive.app/pricing)
- Free tier: editor + CLI; "Free exports play a Rive splash screen"; 3 collaborative files, 1 project, 1 workspace; imported assets up to 10 MB; "Agent with limits". Cadet removes the splash screen. — [Rive pricing](https://rive.app/pricing)
- Export formats: RIV (for runtimes), REV (backup), hosted share links, CDN-hosted assets, MP4, GIF, PNG sequence, WebM. Plan gating per format isn't visible except Free = .riv with splash. — [Rive pricing](https://rive.app/pricing)
- AI: the Voyager plan gets "Agent with advanced models", $20/seat in monthly Agent credits, and bring-your-own API key. Enterprise gets $40/seat in Agent credits. — [Rive pricing](https://rive.app/pricing)
- The commercial-use terms are not stated on the pricing page. — [Rive pricing](https://rive.app/pricing)
- The web runtime repo (rive-wasm) is MIT-licensed. — [GitHub rive-app/rive-wasm](https://github.com/rive-app/rive-wasm)
- Plain HTML usage:
  - Add `<script src="https://unpkg.com/@rive-app/webgl2@latest"></script>` plus a `<canvas>`, then call `new rive.Rive({ src, canvas, autoplay: true, autoBind: true, stateMachine: "…" })`.
  - `src` can be a URL or public asset path. A `buffer` (ArrayBuffer) option also exists.
  - `@rive-app/canvas-lite` is a smaller variant for files that don't use Rive Text, Layouts, Scripting or Audio.
  - Data binding uses `autoBind` and ViewModels.
  - Source: [Rive web-js docs](https://rive.app/docs/runtimes/web/web-js)

**LottieFiles / Lottie Creator (Lottie JSON & dotLottie ecosystem)**
- Plans:
  - Individual $19.99/user/mo, billed annually: 1 editor, 10 GB CDN, 300 AI credits/mo.
  - Team $24.99/user/mo, billed annually: 600 AI credits.
  - Team+ and Enterprise: custom pricing.
  - No monthly-billing price is shown. — [LottieFiles pricing](https://lottiefiles.com/pricing)
- Free tier: the FAQ mentions "unlimited preview, testing and sharing" plus the free library and basic edits. The page shows no numeric free-tier limits. — [LottieFiles pricing](https://lottiefiles.com/pricing)
- Export formats: "Optimized dotLottie & JSON formats", plus transparent video exports as "GIF, MP4, Transparent WebM & MOV". — [LottieFiles pricing](https://lottiefiles.com/pricing)
- Free-library license (Lottie Simple License):
  - Commercial use is allowed ("including for commercial purposes").
  - Attribution is not required but "strongly encouraged".
  - Derivatives must stay under the same license.
  - You may not compile files to build a competing service.
  - Source: [Lottie Simple License](https://lottiefiles.com/page/license)
- Web player: `@lottiefiles/dotlottie-web` (MIT), a Rust+WASM core using ThorVG. It renders via Canvas2D, WebGL2 or WebGPU (experimental) and plays both `.json` and `.lottie`. A web component (`<dotlottie-wc src=… autoplay loop>`, loaded from unpkg) and a React package are available. — [GitHub LottieFiles/dotlottie-web](https://github.com/LottieFiles/dotlottie-web)

**Jitter (browser motion design, Figma-like)**
- Tiers: Free, Pro, Max, Ultra and Enterprise.
  - Free: 720p@30fps export; Video, GIF and Lottie export; 3 workspace files; 20 MB uploads. The watermark is only removed on paid tiers.
  - Pro: adds ProRes, WebM and 1080p@60.
  - Max: adds transparent, batch and frame-by-frame export and 4K@120.
  - Annual billing saves 15%; prices are in USD excl. VAT. — [Jitter pricing](https://jitter.video/pricing/)
- **Prices did not render** on the official page. Third-party listings give Pro as $15/mo ([BityClips](https://bityclips.com/tool/jitter/pricing)) or $19/editor/mo billed monthly ([vijaytalksai](https://vijaytalksai.com/?p=2320)). **[3rd-party / unverified]**
- Commercial terms are not stated on the pricing page. — [Jitter pricing](https://jitter.video/pricing/)

**Spline (3D web design, interactive embeds)**
- Plans (USD per seat):
  - Free $0.
  - Hobby $15/mo, or $12/mo billed yearly ($144/yr), 2,000 AI credits.
  - Pro $30/mo, or $25/mo yearly ($300/yr), 3,000 AI credits.
  - Max $70/mo, or $60/mo yearly ($720/yr), 10,000 AI credits.
  - Enterprise: custom. — [Spline pricing](https://spline.design/pricing)
- Free tier: limited personal files; **web exports carry a watermark**; no AI, no video export, no Apple/Android export. — [Spline pricing](https://spline.design/pricing)
- Exports by plan:
  - Hobby: watermark-free 3D web exports.
  - Pro/Max: "Download Code Export", video export, USDZ, STL, and GLTF with textures; 2D web embeds also lose the watermark.
  - Enterprise: self-hosted export.
  - Extra AI credits cost $5/mo per 1,000. — [Spline pricing](https://spline.design/pricing)
- Commercial terms are not stated on the pricing page. — [Spline pricing](https://spline.design/pricing)

**Unicorn Studio (no-code WebGL effects/shaders for the web)**
- Plans:
  - Free $0: "Up to 8 publishes with Unicorn branding", **"Personal and non-commercial use"**, image exports, limited video, 50 free Agent credits.
  - **Legend: "$168/year or $20 billed monthly"**: unlimited publishes without the logo watermark, a **commercial license**, "JSON export, high-quality video exports, and hosting", custom 3D models/fonts, and 200 monthly AI credits. — [Unicorn Studio pricing docs](https://www.unicorn.studio/docs/pricing/)
- Removing the watermark is not retroactive; already-published projects stay as they are until republished. — [Unicorn Studio FAQ (via search)](https://www.unicorn.studio/docs/faqs)
- Embeddable code is available on Free, but with the logo. — [uithings guide](https://uithings.com/what-is-unicorn-studio) (3rd-party)

**Paper (paper.design — HTML/CSS-native design canvas + Paper Shaders)**
- Plans:
  - Free $0: unlimited viewers/editors, **100 MCP tool calls/week**, limited image generation, 25 MB max image.
  - Pro **$16/editor/mo billed yearly** ($20 monthly shown crossed out): 1M MCP tool calls/week, video export.
  - Organizations: custom. — [Paper pricing](https://paper.design/pricing)
- Paper Shaders (`@paper-design/shaders` vanilla JS, `@paper-design/shaders-react`):
  - Zero-dependency canvas shaders under the **Apache-2.0** license.
  - Usable in commercial sites "without visible attribution".
  - It is pre-1.0 (0.0.x), so "pin your dependency".
  - Examples include MeshGradient and DotOrbit.
  - Source: [GitHub paper-design/shaders](https://github.com/paper-design/shaders)

**Haikei (SVG background generator: blobs, waves, layered waves, low-poly, blurry gradients…)**
- Free, "no signups, no credit cards"; 15 generators; exports SVG and PNG, editable later "in any vector editing tool, CMS or code base". — [Haikei](https://haikei.app/)
- Paid plan and license terms were not visible in the fetched content (see Gaps).

**fffuel (free SVG generators + color tools)**
- Free generators include:
  - Noise and grain: nnnoise, gggrain.
  - Gradients and blobs: ffflux fluid gradients, ssshape blobs, bbblurry.
  - Patterns, waves, confetti and more.
  - Palette tools: pppalette, hhhue.
  - Base64 encoder for inlining SVG in CSS.
  - Source: [fffuel](https://www.fffuel.co/)
- License text was not in the fetched content (see Gaps).

**Framer (no-code site builder with built-in animation)**
- Site plans: Free $0 (1 GB bandwidth, Framer domain, 500 AI credits to try); Basic $10/mo; Pro $30/mo; Enterprise custom. The page says "All prices are monthly and billed according to the billing cycle selected at checkout." — [Framer pricing](https://www.framer.com/pricing)
- The pricing page does not mention code export. Framer is a hosting platform, not an asset exporter. — [Framer pricing](https://www.framer.com/pricing)

**GSAP (JS animation library; Webflow-owned)**
- "100% free for all users, thanks to Webflow's support"; the whole library, including SplitText, MorphSVG, DrawSVG and ScrollTrigger, is free. — [GSAP pricing](https://gsap.com/pricing/)
- License terms:
  - Commercial use is covered under the standard "no charge" license.
  - Prohibited: using GSAP in no-code visual animation builders that compete with Webflow.
  - The FAQ says "AI-generated code is not a Prohibited Use."
  - Source: [GSAP Standard License](https://gsap.com/community/standard-license/)

**Webflow (site builder; "Interactions with GSAP")** **[3rd-party / unverified]**
- Site plans reported: Basic about $14–15/mo (annual), Business about $39/mo. CMS/Premium tiers are reported inconsistently. Code export requires a Workspace plan (Core about $19/mo). The official page failed to load (header overflow). — [nocode.mba](https://www.nocode.mba/articles/webflow-pricing-2026); [wearefounders](https://www.wearefounders.uk/webflow-pricing-2026-every-plan-explained/)

**Cavalry (procedural 2D motion design, desktop)**
- Now "Completely free to download and use" for individuals, "with no restrictions or payment needed". A Canva account is required. Organizations go to Enterprise via Canva sales. The FAQ mentions legacy Pro/Teams subscriptions. **Lottie Export** is listed. — [cavalry.studio](https://cavalry.studio/)
- Canva acquired Cavalry in Feb 2026. One report says the technology will be integrated into Affinity, which is free. — [UKTN, 24 Feb 2026](https://www.uktech.news/saas/canva-acquires-manchester-animation-software-group-cavalry-20260224); [CG Channel](https://www.cgchannel.com/?p=174225)
- **Flag:** older articles listing Cavalry Pro prices are outdated.

**Linearity Move (motion) / Linearity Curve (vector)**
- Prices in EUR incl. VAT:
  - Free €0: 2,400 welcome credits valid 7 days, "Basic export options", Curve + Move "with usage limits".
  - Pro €10/mo or €8/mo yearly.
  - Studio from €30/mo (€25 yearly).
  - Business from €80/mo (€67 yearly).
  - Source: [Linearity pricing](https://www.linearity.io/pricing/)
- "GIF Export" and "Lottie Export" appear in the site navigation; the pricing page doesn't list Move's export formats per plan. — [Linearity pricing](https://www.linearity.io/pricing/)

**Fable (browser motion design)**
- Historic: web-based motion design platform with cloud exports to GIF, MP4, ProRes and Lottie. It raised a $15M Series A (total $22.4M); the announcement date was not shown. — [Crunchbase News](https://news.crunchbase.com/news/fable-15m-series-a-motion-design); [Fable blog](https://fable.app/blog/a-modern-take-on-motion-design)
- **Its current (2026) status and pricing could not be confirmed** (see Gaps).

**Motion Canvas (code-driven TypeScript animation + web editor)**
- MIT license. It includes a `player` package, described as "A custom element for displaying animations in a browser". — [GitHub motion-canvas](https://github.com/motion-canvas/motion-canvas)
- "Write animations in TypeScript with your favorite IDE"; the web-based editor syncs animations with audio. — [motioncanvas.io](https://motioncanvas.io/)

**Figma (Design, Slides, Make, Sites)**
- USD per seat per month:
  - Starter: free.
  - Professional: Full $16, Dev $12, Collab $3.
  - Organization (annual): Full $55, Dev $25, Collab $5.
  - Enterprise (annual): Full $90, Dev $35, Collab $5.
  - Starter AI credits: 150/day, up to 500/mo.
  - Source: [Figma pricing](https://www.figma.com/pricing/)
- Professional includes 3,000 AI credits/mo per Full seat and Dev Mode with the MCP Server, per a search capture of the official page. Third parties report Professional Full as $15 annual / $20 monthly, so billing basis may explain the $16 figure. Figma Make can't be bought standalone. — [Figma pricing (via search)](https://www.figma.com/pricing/); [banani.co](https://www.banani.co/blog/figma-pricing-and-credits)
- Figma Slides Smart Animate animates matching objects between sequential slides. Community-reported limits:
  - The first object animation triggers only "On click".
  - Smart Animate doesn't play when going backward.
  - Source: [Figma help (mirror)](https://figma-signup.helpjuice.com/create-slide-decks/use-slide-transitions); [Figma forum](https://forum.figma.com/suggest-a-feature-11/smart-animate-transition-in-both-directions-in-figma-slides-19230)

#### B. Traditional motion software (for comparison)

**Adobe After Effects**
- The official page (geolocated UK) shows After Effects at £21.98/mo incl. VAT (annual, billed monthly) and Creative Cloud Pro at £32.66/mo (promo; regular £66.49). — [Adobe AE plans](https://www.adobe.com/products/aftereffects/plans.html)
- **USD [3rd-party / unverified]:** $22.99/mo annual billed monthly; $34.49/mo month-to-month; $263.88/yr prepaid. An older $20.99 figure (Dec 2025) is outdated. — [cgheven 2026](https://cgheven.com/blog/compositing-software-subscription-costs-2026); [expertphotography](https://expertphotography.com/buy-adobe-after-effects)
- Lottie export from AE (Bodymovin/LottieFiles plugin) was not verified this session (see Gaps).

**Cavalry** — see above (now free for individuals).

**Blender (3D)**
- GPL. "Blender can be used commercially". "What you create with Blender is your sole property" (images, movies, .blend files). — [Blender license](https://www.blender.org/about/license/)

#### C. AI image / video / 3D generation for assets

**Recraft (vector/SVG generation — the key one for animatable SVG)**
- Free-plan images are **owned by Recraft, public in the community gallery, and "not licensed for commercial use"**. On paid plans you own the images and have commercial rights; images stay private. Annual billing saves 20%. — [Recraft pricing](https://www.recraft.ai/pricing)
- Plan prices (did not render on the pricing page; one search summary attributes these to recraft.ai/llms.txt, but the direct fetch of that file did not show them):
  - Basic $12/mo, or $10 annual, 1,000 credits.
  - Advanced $33, or $27 annual, 4,000 credits.
  - Pro $60, or $48 annual, 8,400 credits.
  - Free: 50 credits/day.
  - Vector images reportedly cost 2 credits vs 1 for raster.
  - **[partly unverified]** — [recraft.ai/llms.txt (via search)](https://www.recraft.ai/llms.txt); [pricepertoken](https://pricepertoken.com/recraft-pricing)
- API prices (official llms.txt):
  - V4.1 from $0.035/image (raster and SVG); V4 from $0.04 (raster and SVG).
  - V2 from $0.022, "the lowest-cost vector option in the API".
  - V4.1 Flash about $0.007 (raster only).
  - **Vectorize (raster→SVG) $0.01/request**; remove background $0.01.
  - Recraft offers a **hosted MCP server**.
  - Source: [recraft.ai/llms.txt](https://www.recraft.ai/llms.txt)

**Midjourney** **[3rd-party / unverified — official docs returned 403]**
- Basic $10, Standard $30, Pro $60, Mega $120 per month; about 20% off annually ($96 / $288 / $576 / $1,152 per year). Stealth (private) mode only on Pro/Mega. Relax mode on Standard and above. Companies with over $1M revenue reportedly must use Pro or Mega. — [eesel.ai](https://www.eesel.ai/blog/midjourney-pricing); [myarchitectai 2026](https://www.myarchitectai.com/blog/midjourney-pricing)

**Google Nano Banana family / Veo (Gemini API, paid tier, USD)**
- Per image:
  - `gemini-3-pro-image` (Nano Banana Pro): $0.134 at 1K/2K, $0.24 at 4K.
  - `gemini-3.1-flash-image` (Nano Banana 2): $0.045 (0.5K), $0.067 (1K), $0.101 (2K), $0.151 (4K).
  - `gemini-nano-banana-2.1`: $0.0336 (1K), $0.0504 (2K), $0.113 (4K).
  - `gemini-3.1-flash-lite-image`: $0.0336.
  - Batch is about 50% off.
  - The API has **no free tier for image models**; Google AI Studio use is free in supported regions.
  - Source: [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing)
- **Flag:** `gemini-2.5-flash-image` (original Nano Banana, $0.039) was scheduled for shutdown on **Oct 2, 2026**, so it is already retired as of this writing. — [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing)
- Veo 3.1 per second, with audio:
  - Standard $0.40 (720p/1080p), $0.60 (4K).
  - Fast $0.10 / $0.12 / $0.30.
  - Lite $0.05 / $0.08.
  - No free tier.
  - The pricing page has **no Imagen 4 pricing**. — [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing)

**OpenAI GPT Image (API)**
- Per 1M image tokens (input / output):
  - gpt-image-2: $8 / $30.
  - gpt-image-1.5: $8 / $32.
  - gpt-image-1-mini: $2.50 / $8.
  - gpt-image-1: $10 / $40.
  - gpt-image-2.5 variants are priced like gpt-image-2.
  - Per-image costs are only in the image-guide calculator. — [OpenAI API pricing](https://developers.openai.com/api/docs/pricing)

**Ideogram (strong text-in-image)**
- USD:
  - Free: 30 credits/week, Google/Apple/Microsoft sign-in only; **all output public**.
  - Plus $20/mo, or $15/mo yearly ($180/yr), 2,400 credits.
  - Pro $60, or $42 yearly ($504/yr), 7,500 credits.
  - Team $30, or $20 yearly, per user (min 2).
  - Basic is no longer sold. Paid images are private until published. — [Ideogram docs: available plans](https://docs.ideogram.ai/plans-and-billing/available-plans.md)
- Commercial terms are deferred to the ToS, which was not fetched. — [Ideogram ToS link](https://ideogram.ai/legal/tos)

**Krea (multi-model image/video/3D + realtime)**
- Free $0 at 100 units/day; Pro $21 (crossed-out $35); Max $63 (crossed-out $105); Business $160 (crossed-out $200). "Save 40% on yearly plans". The page is internally inconsistent on which price is monthly vs yearly, and on Max units (60k vs 40k). — [Krea pricing](https://www.krea.ai/pricing)
- Commercial license: included on paid plans. The Free plan's feature list says it includes one, but the FAQ says only paid plans do (contradiction). — [Krea pricing](https://www.krea.ai/pricing)

**Runway (video; Gen-4.5, Aleph, plus partner models)**
- USD:
  - Free: 125 one-time credits.
  - Standard $15/mo, or $12 yearly, 625 credits/mo, "no watermarks".
  - Pro $35, or $28 yearly, 2,250 credits, **Runway MCP**.
  - Max $95, or $76 yearly, 9,500 credits, MCP, ProRes/image-sequence output.
  - Gen-4.5 costs 12 credits per second.
  - Models include Gen-4.5, Aleph 2.0, Kling 3.0, Seedance 2.x and Nano Banana Pro.
  - Source: [Runway pricing](https://runway.com/pricing)

**Kling (video)** **[3rd-party / unverified]**
- Standard $10/mo (660 credits), Pro $37 (3,000), Premier $92 (8,000), Ultra $180 (26,000). Annual saves about 34%. Annual-equivalent prices are about $6.49 / $23.99 / $59.99. — [eesel.ai](https://www.eesel.ai/en/blog/kling-ai-pricing); [Atlas Cloud](https://www.atlascloud.ai/blog/guides/kling-ai-pricing)

**Luma (Dream Machine / Ray video)**
- Plus $30/mo, or $25 yearly ($300), 10,000 credits, **commercial use**. Pro $90, or $75 yearly, 40,000 credits. Ultra $300, or $250 yearly, 150,000 credits. The page doesn't mention a free tier, and API prices aren't shown. — [Luma pricing](https://lumalabs.ai/pricing)

**Higgsfield (aggregator of video/image models)** **[3rd-party / conflicting]**
- Reports vary: Starter $15 / Plus $39 / Ultra $99 (annual); or Starter about $19 / Plus $47–59 / Ultra $99–129; or Basic–Max $9–375 with region-adjusted pricing. The official page didn't render. — [Higgsfield blog](https://geo.higgsfield.ai/task/blog/higgsfield-ai-pricing-plans); [Creatify](https://creatify.ai/blog/higgsfield-pricing-(2026)-plans-and-what-you-ll-actually-pay)

**Meshy (AI 3D)**
- EUR:
  - Free: 100 credits/mo, **CC BY 4.0** (commercial with attribution to Meshy).
  - Pro €19/mo, 1,000 credits, API.
  - Premium €38, 3,000 credits.
  - Ultra €95, 8,000 credits.
  - Studio €67, 5,500 shared.
  - Paid assets are private and customer-owned.
  - Exports: FBX, OBJ, USDZ, GLB, STL, .blend.
  - Source: [Meshy pricing](https://www.meshy.ai/pricing)

**Tripo (AI 3D)** **[3rd-party / conflicting]**
- Free Basic: public models under CC BY 4.0 (300 or 600 credits/mo reported). Professional $15.90–19.90/mo (3,000 credits). Advanced $39.90–49.90 (8,000). The official page returned 403. — [Toolradar](https://toolradar.com/tools/tripo-ai/pricing); [CostBench](https://www.costbench.com/software/ai-3d-generation/tripo-ai/)

#### D. Free asset sources

**Icons (via Iconify)**
- Iconify catalogs 227 open-source icon sets. — [Iconify icon sets](https://icon-sets.iconify.design/)
- Sets, licenses and icon counts:
  - Lucide: ISC, 1,890 icons.
  - Phosphor: MIT, 9,072.
  - Heroicons: MIT, 1,288.
  - Tabler: MIT, 6,238.
  - Material Symbols: Apache-2.0, 15,728.
  - Remix: Apache-2.0, 3,188.
  - Fluent: MIT, 19,900.
  - Carbon: Apache-2.0, 2,631.
  - Simple Icons (brand logos): CC0, 3,466.
  - Source: [Iconify icon sets](https://icon-sets.iconify.design/)

**Illustrations**
- unDraw: free for commercial use, no attribution, modifiable.
  - Restrictions: no packs or redistribution, and no competing service.
  - **Explicitly prohibits use for AI training/fine-tuning.**
  - Restricts automated linking, embedding, scraping or downloading without consent.
  - Source: [unDraw license](https://undraw.co/license)
- Open Peeps (Pablo Stanley): hand-drawn people, 584,688+ combinations, **CC0**, PNG and SVG. — [Open Peeps](https://www.openpeeps.com/)
- Humaaans (Pablo Stanley): mix-and-match people, **CC0** ("Free for commercial or personal use"). — [Humaaans](https://www.humaaans.com/)

**Animated icons**
- Lordicon:
  - Plans: Free $0 (9,700 animated icons, commercial license, **attribution required**); PRO $8/mo annual or $16 monthly (38,300 icons, no attribution); Team PRO $39 annual or $59 monthly.
  - Exports: Lottie, GIF, MP4, WebP, PNG, SVG. — [Lordicon pricing](https://lordicon.com/pricing)
  - License: the free license is based on CC BY-ND 4.0 (modified). Embed HTML is capped at 1M CDN requests; above that, self-host the Lottie JSON. Icons can't be resold or used as an icon pack. — [Lordicon licenses](https://lordicon.com/licenses)
- useAnimations: about 300 free Lottie micro-animations, **MIT**, commercial OK, attribution not required. Available as JSON, SVG, ZIP, the `react-useanimations` package, and through the shadcn CLI. — [useAnimations](https://useanimations.com/)
- LottieFiles free library: under the Lottie Simple License (commercial OK, see section A). — [Lottie Simple License](https://lottiefiles.com/page/license)

**Fonts**
- Fontshare (ITF Free Font License):
  - Free for personal and commercial use, including web, app and broadcast.
  - Redistribution, font serving and modification are restricted.
  - **Sources conflict on self-hosting** the files (Fontshare's own launch post mentions OTF/WOFF/WOFF2 downloads; a blog says self-hosting is restricted). — [ITF launch post](https://www.indiantypefoundry.com/news/introducing-fontshare); [webdesignerdepot](https://webdesignerdepot.com/itf-launches-free-font-service-fontshare)
- Google Fonts license: not retrieved (see Gaps).

**Backgrounds, grain and palettes**
- Haikei and fffuel (section A) give free SVG backgrounds, grain/noise and palettes.
- Paper Shaders gives Apache-2.0 animated shader backgrounds. — [GitHub paper-design/shaders](https://github.com/paper-design/shaders)

#### E. Presentation-adjacent alternatives (for comparison with a custom HTML build)

**Pitch** (EUR, yearly billing)
- Free €0: 100 non-renewing AI credits; branded PDF export and embeds.
- Plus €10/mo; Team €15/mo; Business €20/mo.
- PPTX export is listed inconsistently (Plus vs Team).
- The pricing page doesn't mention animation.
- Source: [Pitch pricing](https://pitch.com/pricing)

**Gamma** **[3rd-party / unverified — official returned 403]**
- Free: 400 one-time credits.
- Plus about $8 annual / $10 monthly, 1,000 credits/mo.
- Pro about $15 annual / $20 monthly, 4,000 credits.
- Ultra about $100/mo, 20,000 credits.
- One tracker reports Team was replaced by Business in Aug 2026.
- Source: [eesel.ai](https://www.eesel.ai/blog/gamma-pricing); [Flexprice](https://flexprice.io/pricing-index/gamma); [CostBench](https://www.costbench.com/software/ai-presentations/gamma/)

**Prezi** **[3rd-party / conflicting]**
- Basic free (public, watermark); Standard about $7/mo; Teams $39/user/mo.
- Plus and Premium are reported anywhere from $4–19/mo and $7–29/mo.
- The official page returned empty.
- Source: [Layer3 Labs (Jul 2026)](https://www.layer3labs.io/guides/is-prezi-worth-it); [CostBench](https://www.costbench.com/software/ai-presentations/prezi/); [presentations.ai](https://www.presentations.ai/blog/prezi-pricing)

**Tome**
- **The slides product shut down on April 30, 2025.** The company pivoted to Lightfield, an AI-native CRM. These sources are secondary, and one is a competitor's page. — [chatslide.ai](https://www.chatslide.ai/articles/tome-ai-shut-down-what-happened); [Forbes Chile (Jul 2026)](https://forbes.cl/tecnologia/2026-07-22/startup-de-ia-pasa-de-demostraciones-llamativas-a-tecnologia-que-genera-ingresos)

#### F. Hosting / sharing a static HTML presentation

**GitHub Pages**
- Free. Site size up to 1 GB; soft limit of 100 GB/month bandwidth; soft limit of 10 builds/hour (not applied to custom Actions workflows).
- Prohibited as a free host for an online business, e-commerce site, or commercial-transaction SaaS. A talk deck is not in those categories.
- Source: [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)

**Cloudflare Pages (Free)**
- 500 builds/month, 20,000 files per site, 25 MiB max per file, 100 projects, 100 custom domains per project.
- Bandwidth isn't covered on the limits page.
- Source: [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)

**Netlify**
- Free $0 with a 300-credit limit; bandwidth uses 20 credits/GB, so about 15 GB if bandwidth-only (my calculation).
- Personal $9/mo; Pro $20/mo.
- The pricing page doesn't address commercial use on Free.
- Source: [Netlify pricing](https://www.netlify.com/pricing/)

**Vercel**
- Hobby is free but **"for personal, non-commercial use"**: 100 GB/month Fast Data Transfer, 1M CDN requests, no paid overages.
- Pro $20/mo, including a $20 usage credit.
- Source: [Vercel pricing](https://vercel.com/pricing)

**Offline from a laptop**
- Browsers block loading Lottie JSON when the page is opened via `file://`. Users report it works once the file is served over HTTP. A Sitely maintainer says the Lottie player's file loading "is not compatible with offline mode". These are forum sources. — [Ghost forum](https://forum.ghost.org/t/help-in-using-lottie-with-ghost/7992); [Sitely community](https://community.sitely.app/t/lottie-animation-not-visible/4753)
- Rive's JS runtime also accepts a `buffer` (ArrayBuffer) instead of a URL. — [Rive web-js docs](https://rive.app/docs/runtimes/web/web-js)

### Inferences
- **Zero-cost core stack** for the Devin "big map":
  - Claude-written HTML/SVG/CSS + GSAP for camera-pan/zoom "map" motion, MorphSVG/DrawSVG for connectors, and SplitText for kinetic type.
  - Lucide/Phosphor/Tabler icons via Iconify; Open Peeps/Humaaans (CC0) for people.
  - Paper Shaders for animated mesh-gradient/grain backgrounds; useAnimations or LottieFiles free Lotties for micro-interactions.
  - Host on GitHub Pages or Cloudflare Pages.
  - Every piece is free and allows commercial use (sources above).
- **Cheapest paid upgrades**, by impact:
  1. Recraft paid plan (about $10–12/mo) for brand-consistent, commercially licensed **SVG** illustrations that GSAP can animate path by path. Recraft Free output is public and non-commercial, so avoid it for a company talk.
  2. Rive Cadet ($9) if you want interactive state-machine widgets (e.g., an "agent loop" diagram that reacts to clicks) without the splash screen.
  3. Unicorn Studio Legend ($20/mo) only if you want a no-code WebGL hero effect *and* commercial use, since Free is non-commercial.
- **Avoid for this use case:**
  - Vercel Hobby, if the presentation is for a company or commercial event (non-commercial clause).
  - unDraw for agent-automated pipelines (anti-scraping/automation clause and AI-training ban).
  - Free tiers of Ideogram, Recraft, Tripo and Meshy, if you need private or unattributed assets.
- **Video generators** (Veo 3.1 Fast at about $0.10–0.12/s, Runway Standard $12–15/mo, Luma Plus $25–30/mo) only matter if you want cinematic B-roll loops. For a diagrammatic "big map", vector/SVG and Lottie give sharper, resolution-independent results and smaller files.
- For offline delivery from a laptop, run a local static server (e.g., `python3 -m http.server`) or inline Lottie JSON as `animationData`/Rive as a buffer. Don't double-click `index.html`. This is my recommendation, derived from the file:// reports above, not from an official doc.
- Cavalry going free (Canva, 2026) makes it the best no-cost "pro" motion tool with Lottie export for anyone who prefers a timeline UI over code.

### Gaps
- **Official pages blocked or not rendering prices:** Midjourney (403), Ideogram main pricing (403; docs used instead), Gamma (403), Tripo (403), Higgsfield (no content), Prezi (empty), Jitter (prices showed as "--"), Webflow (header overflow), Kling (not fetched). Their prices rely on third-party sources and should be checked before purchase.
- **Rive:** whether the $9/$32 prices are annual-billed or monthly is ambiguous on the page. Commercial-use terms for Free-tier exports (beyond the splash screen) were not found.
- **Licenses not found:** Spline, Jitter, Haikei and fffuel license or commercial terms weren't in the fetched content.
- **Google Fonts license** (widely known to be mostly SIL OFL) was not retrieved this session (the FAQ page returned no content). It's unverified here.
- **Fontshare self-hosting:** permissibility is disputed between sources; read the ITF FFL text directly.
- **Fable:** current 2026 operating status and pricing are unknown.
- **After Effects:** Bodymovin/LottieFiles Lottie export plugin details and official USD prices were not verified (Adobe geolocated to GBP).
- **Ownership terms not fetched:** OpenAI and Google image-output commercial terms. Midjourney's exact $1M-revenue clause wording is only reported by third parties.
- **Imagen 4** pricing is absent from the current Gemini API pricing page; it may be deprecated or moved (unconfirmed).
- **Linearity Move:** export formats per plan are not listed on the pricing page.

---

## Key Question 2 — Which tools are best suited to be driven or consumed by an AI agent (Claude Code): open formats (SVG/Lottie/.riv), APIs, MCP servers?

### Takeaway
The best fits for Claude Code are, first, code-native, open-licensed libraries that Claude can write directly: GSAP, Paper Shaders, Motion Canvas, raw SVG, and Lottie JSON played via dotlottie-web. Second come design tools with official MCP servers that write to the canvas or files: Paper MCP (explicitly supports Claude Code), Rive MCP (Early Access), Lottie Creator MCP, Figma MCP, and Unicorn Studio's agent/MCP. Third are generation APIs that output SVG (Recraft API, with a hosted MCP) or raster/video via plain HTTP APIs (Gemini, OpenAI, Runway with an MCP on Pro/Max).

### Cited Findings
- **Paper MCP:**
  - Agents "can read and write your Paper files through MCP".
  - It supports Claude (Chat tab extension) and **Claude Code**, plus Cursor, Codex, Copilot, VS Code and others.
  - Setup: install Paper Desktop, which starts the server and installs the `paper` CLI.
  - Use cases include building a site from a selected frame (React + Tailwind example) and syncing design tokens.
  - Source: [Paper MCP docs](https://paper.design/docs/mcp)
  - The Free plan includes 100 MCP tool calls/week; Pro raises this to 1M/week. — [Paper pricing](https://paper.design/pricing)
- **Paper Shaders:** zero-dependency npm packages (vanilla and React), Apache-2.0, so Claude can drop them straight into the deck's code. — [GitHub paper-design/shaders](https://github.com/paper-design/shaders)
- **Rive official MCP:**
  - The Rive Editor connects to AI tools via MCP to create View Models, State Machines, Layouts and Shapes.
  - It is **Early Access, Mac desktop app first, "not yet available for production"**, and uses a local endpoint (localhost:9791).
  - Source: [Rive MCP docs](https://rive.app/docs/editor/ai/mcp); [Rive MCP integration](https://rive.app/docs/editor/mcp/integration)
- **Rive third-party MCPs:** these claim to create, edit and render .riv files without the editor. They come from directory listings and are unverified. — [Glama rivemcp](https://glama.ai/mcp/servers/paradoxsyn/rivemcp-releases); [Glama rive-mcp](https://glama.ai/mcp/servers/ODU33104/rive-mcp)
- **Rive in-editor Agent:** included with limits on Free and Cadet, with advanced models and BYO key on Voyager. — [Rive pricing](https://rive.app/pricing)
- **Lottie Creator MCP:** an April 15, 2026 LottieFiles post says your AI can build and edit animations inside Lottie Creator, layer by layer. It connects to Claude, Cursor and Windsurf via a local bridge. — [LottieFiles blog](https://lottiefiles.com/blog/working-with-lottie-animations/your-ai-can-now-control-lottie-creator-heres-what-that-actually-means.md); [Lottie Creator MCP guide](https://lottiefiles.notion.site/lottie-creator-mcp)
- **LottieFiles hosted MCP:** a separate server at mcp.lottiefiles.com searches and manages workspace assets. It manages assets; it doesn't generate them. — [LottieFiles MCP docs](https://docs.lottiefiles.com/en/platform/mcp)
- **Lottie runtime:** the open format (`.json` and `.lottie`) plays via the MIT-licensed dotlottie-web, with a web component and a CDN script. — [GitHub dotlottie-web](https://github.com/LottieFiles/dotlottie-web)
- **Unicorn Studio:** Legend includes "unlimited agent changes under MCP" (Free: 200/month) and JSON export. — [Unicorn Studio pricing docs](https://www.unicorn.studio/docs/pricing/)
- **Figma:** Professional includes Dev Mode with an MCP Server (per a search capture of the official pricing page). — [Figma pricing](https://www.figma.com/pricing/)
- **Recraft:**
  - The API outputs **SVG** (V2/V3/V4/V4.1) from $0.022–0.04/image, and Vectorize (raster→SVG) costs $0.01.
  - Recraft runs a hosted MCP server "without any local installation".
  - This is the most direct path for an agent to obtain animatable vector art.
  - Source: [recraft.ai/llms.txt](https://www.recraft.ai/llms.txt)
- **Runway MCP:** included on Pro ($28–35/mo) and Max. — [Runway pricing](https://runway.com/pricing)
- **Gemini API:** per-image and per-second pricing for image (Nano Banana) and Veo models, callable from scripts Claude writes. — [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing)
- **OpenAI GPT Image:** API priced per token. — [OpenAI API pricing](https://developers.openai.com/api/docs/pricing)
- **GSAP:** "AI-generated code is not a Prohibited Use" under the GSAP standard license, so Claude-generated GSAP code is explicitly fine. — [GSAP Standard License](https://gsap.com/community/standard-license/)
- **Motion Canvas:** MIT and TypeScript-authored, with a browser `player` custom element. It is fully code-driven, so it's natural for an agent to author. — [GitHub motion-canvas](https://github.com/motion-canvas/motion-canvas); [motioncanvas.io](https://motioncanvas.io/)
- **Iconify:** "All icon sets are open source" (227 sets), so permissive SVG icons are easy for an agent to pull in programmatically. — [Iconify](https://icon-sets.iconify.design/)
- **Licenses that hinder agents:**
  - unDraw restricts automated scraping or downloading without consent and bans AI training use. — [unDraw license](https://undraw.co/license)
  - Lordicon Free requires attribution, and Embed HTML is capped at 1M CDN requests. — [Lordicon licenses](https://lordicon.com/licenses)

### Inferences
- **Most agent-friendly ranking** for this project:
  1. Pure code assets Claude writes itself: SVG + GSAP, Paper Shaders, CSS. There is no export step, everything is versionable, and it's free.
  2. Lottie JSON, since it is human-readable JSON, Claude can tweak colors and timing, and players are MIT.
  3. Recraft API/MCP for generated SVG illustrations.
  4. Paper MCP as a design canvas Claude Code can read and write. It is the most mature "design tool ↔ Claude Code" bridge found; Rive's is still Early Access.
  5. Rive .riv for interactive state machines. It's a binary format, so Claude edits it only via MCP/editor; the runtime API for data binding is code-friendly.
- **Binary/proprietary outputs** need the GUI or an MCP for every change, so they're less suited to iterative agent edits: Spline scenes, Unicorn Studio scenes, Jitter/Framer projects, and AE .aep files.
- Midjourney had no API found in this research. Use Nano Banana/Gemini, GPT Image, Ideogram or Recraft APIs if Claude should generate images autonomously.

### Gaps
- No evidence was found of official MCP servers for Spline, Jitter, Haikei, Cavalry, Midjourney, Ideogram or Krea. Absence wasn't exhaustively verified.
- Rive's official MCP feature set beyond the docs summary, and the reliability of third-party Rive MCPs, are unverified.
- Recraft MCP tool list and pricing (whether it consumes API units or plan credits) were not visible.
- A Midjourney API was not verified either way.
