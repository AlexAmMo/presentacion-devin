# Claude Design vs Claude Code for building an animated "infinite canvas" HTML presentation (state as of 2026-10-14)

Context of the decision: a developer (Spanish-speaking, company employee) with a finished Markdown script wants a single large HTML "map" where the camera pans/zooms from zone to zone on each "next", with custom motion graphics per zone explaining tokens, cache, context window, subagents.

Important framing: Claude Design's product shape changed several times in 2026 (standalone Labs app in April, then Claude Code integration in June-August, then folded into Claude chat as an artifact template by October). Many blog posts describe the April version. Where sources conflict, the newest official source (support.claude.com article 14604416, "Updated this week" when fetched 2026-10-14) is treated as current.

## 1. What exactly is Claude Design (launch, model, outputs, exports, design systems, editing, collaboration, limits)?

### Takeaway
Claude Design launched 2026-04-17 as an Anthropic Labs research preview (on Opus 4.7) for prototypes, slides, one-pagers. As of October 2026 it is no longer mainly a standalone app: it is a "Design" artifact template inside Claude chat, Claude Code (`/design`, `/design-sync`) and mobile, and the standalone claude.ai/design shuts down on 2026-12-14. It outputs code-based HTML/CSS/JS designs and exports to .zip, PDF, PPTX, Google Slides, standalone HTML plus many partner integrations.

### Cited Findings
**Launch (April 2026, older info, still accurate historically)**
- Launched 2026-04-17: "Today, we're launching Claude Design, a new Anthropic Labs product" for "designs, prototypes, slides, one-pagers, and more" — [Anthropic news](https://www.anthropic.com/news/claude-design-anthropic-labs)
- At launch it was powered by Claude Opus 4.7, described as "our most capable vision model" — [Anthropic news](https://www.anthropic.com/news/claude-design-anthropic-labs); also [Unite.AI](https://www.unite.ai/anthropic-launches-claude-design-for-visual-prototyping-and-presentations/)
- Inputs at launch: text prompts, images, DOCX/PPTX/XLSX uploads, codebases, and a web-capture tool to grab elements from a live site — [Anthropic news](https://www.anthropic.com/news/claude-design-anthropic-labs)
- Design-system ingestion: during onboarding Claude "builds a design system for your team by reading your codebase and design files"; teams can maintain more than one — [Anthropic news](https://www.anthropic.com/news/claude-design-anthropic-labs)
- Editing: chat, inline comments on specific elements, direct text edits, and adjustment "knobs"/custom sliders made by Claude to tweak spacing, color, layout live — [Anthropic news](https://www.anthropic.com/news/claude-design-anthropic-labs)
- Collaboration at launch: org-scoped sharing (private / view by link within org / edit access for group conversations with Claude) — [Anthropic news](https://www.anthropic.com/news/claude-design-anthropic-labs)
- Launch export list: internal URLs, save as folder, Canva, PDF, PPTX, standalone HTML; plus "handoff bundle" to Claude Code with a single instruction — [Anthropic news](https://www.anthropic.com/news/claude-design-anthropic-labs)
- Launch announcement mentions "code-powered prototypes with voice, video, shaders, 3D and built-in AI" — [Anthropic news](https://www.anthropic.com/news/claude-design-anthropic-labs)

**Current state (October 2026, official help center)**
- Claude Design is now described as "an artifact template with on-canvas editing" that creates designs, interactive prototypes, one-pagers; your org's design system is included — [Claude Help Center 14604416](https://support.claude.com/en/articles/14604416)
- Where it lives now: in conversations (ask for a design, or Output > Design in the message box), Artifacts tab (Design template), Claude Code (ask, or `/design` on desktop or terminal), iOS/Android apps (create/view/edit; sharing changes need web/desktop), and standalone claude.ai/design until it closes — [Claude Help Center 14604416](https://support.claude.com/en/articles/14604416)
- Standalone claude.ai/design closes 2026-12-14; existing projects stay until then; design systems can be migrated into Claude before that date — [Claude Help Center 14604416](https://support.claude.com/en/articles/14604416)
- Current exports: .zip, PDF, PPTX, Google Slides, standalone HTML; integrations with Adobe products, Base44, Canva, Gamma, HubSpot, Hyperframes, Lovable, Miro, Netlify, Replit, v0, Vercel, Wix — [Claude Help Center 14604416](https://support.claude.com/en/articles/14604416)
- Sharing now: private by default; share with view, comment or edit access — [Claude Help Center 14604416](https://support.claude.com/en/articles/14604416)
- Design systems can be imported from a GitHub repo, design files, uploads, or a local codebase via `/design-sync` in Claude Code — [Claude Help Center 14604416](https://support.claude.com/en/articles/14604416)
- The help page does not name the model now used — [Claude Help Center 14604416](https://support.claude.com/en/articles/14604416)
- Opus 5.5 is the current Opus listed on the pricing page (Opus 5, 4.8, 4.7, 4.6, 4.5 listed as legacy) — [Claude pricing](https://claude.com/pricing); Opus 5.5 reportedly launched ~2026-09-22 and replaced Opus 5 as default in the apps — [Syracuse ITS](https://its.syr.edu/?p=5555), [Kiro changelog](https://kiro.dev/changelog/models/claude-opus-5-5/) (secondary sources)
- Direct edits on the canvas "use no tokens" (per the product designer who built it) — [Claude blog, 2026-07-24](https://claude.com/blog/how-the-product-designer-who-built-claude-design-uses-it-to-explore-ideas-before-building-them)
- Claude Design writes HTML/CSS/JS rather than manipulating vectors, so no pixel-level vector editing — [MindStudio](https://www.mindstudio.ai/blog/what-is-claude-design-anthropic-design-tool) (vendor blog)

**Known issues reported (mostly April-May 2026, research preview)**
- Reported bugs: git access failures after authorization, inline comments disappearing before processing, video exports limited to screen recordings, model selector visibility problems; no native Figma export; real-time multi-designer co-editing not available — [eesel review, last edited 2026-05-08](https://www.eesel.ai/blog/claude-design-review-2026) (competitor-published)
- Inline comment bug and "compact view save error" noted; "research preview means the product is usable, not that it is stable" — [alexcloudstar review](https://alexcloudstar.com/blog/claude-design-review-developer-first-look-2026/)
- Output approximates the design system rather than using real components, causing drift in fonts/colors/spacing — [eesel review](https://www.eesel.ai/blog/claude-design-review-2026)

### Inferences
- The "model powering Claude Design" question is now probably moot: since it is an artifact template inside chat/Claude Code, it most likely runs on whatever model the session uses (default Opus 5.5). Not officially confirmed.
- Anything built in the standalone claude.ai/design app now has a hard expiry (2026-12-14); a new project should not be started there.
- Claude Design is still labeled research preview/beta in several places; expect UX changes and bugs.

### Gaps
- No official statement found on which model Claude Design uses as of October 2026.
- No official per-project size limits (number of screens, file size, code length) found.
- Exact date Claude Design moved into chat as an artifact template not found (the help page says only "Updated this week").

## 2. Plans, prices, shared usage limits, Spain/EU availability

### Takeaway
Both Claude Code and Claude Design are included in Pro, Max, Team and Enterprise; the pricing page and help center now also list Claude Design on Free. As of October 2026 Claude Design shares the same usage pool as chat and Claude Code (earlier it had its own weekly allowance). USD list prices: Pro $20/mo, Max 5x $100, Max 20x $200, Team $25/$125 per seat; no official EUR prices found; Spain adds 21% IVA.

### Cited Findings
- Pricing page (fetched 2026-10-14), USD: Free $0; Pro $20/mo or $17/mo billed annually ($200/yr); Max 5x "from $100"/mo; Team Standard seat $25/mo ($20 annual); Team Premium seat $125/mo ($100 annual), with "5x more usage than standard seats"; Enterprise $20/seat (annual) plus usage at API rates. Claude Code and Claude Design marked as included on Pro, Max, Team, Enterprise; Claude Design also on Free. No EUR prices shown — [Claude pricing](https://claude.com/pricing)
- Max 20x is $200/month (Aug-Sep 2026 guides) — [geotoolbox.ai (ES)](https://geotoolbox.ai/es/blog/precio-claude); (note: the automated fetch of the pricing page summarized Max 20x ambiguously as "from $100", so the $200 figure is from secondary sources)
- Usage limits reset on a rolling five-hour session window; paid plans also have weekly limits; Anthropic may apply limits "at our discretion" — [Claude pricing](https://claude.com/pricing)
- Claude Design is available on Free, Pro, Max, Team, Enterprise and on by default; Enterprise turns on by default 2026-10-15 (owners can enable earlier in Organization settings > Artifacts) — [Claude Help Center 14604416](https://support.claude.com/en/articles/14604416)
- Usage is now shared: Claude Design draws from the same pool as all other Claude work including Claude Code; no separate weekly allowance; with usage credits enabled you can continue after limits — [Claude Help Center 14604416](https://support.claude.com/en/articles/14604416)
- OLDER (superseded): earlier help article said Claude Design had a separate weekly allowance resetting every seven days, separate from chat and Claude Code; Enterprise usage-based billing at API rates — [Claude Help Center 14667344 (search snippet; page now 404)](https://support.claude.com/en/articles/14667344-claude-design-subscription-usage-and-pricing); merge into shared pool reported by [pasqualepillitteri.it](https://pasqualepillitteri.it/en/news/3673/claude-design-shares-usage-limits-claude-ai-claude-code)
- OLDER (superseded): in April-May 2026 reviewers reported no free tier, and Pro users hitting the Claude Design cap after a few prompts, Max 5x in ~2 hours; one tester paid $200 mid-session — [eesel review](https://www.eesel.ai/blog/claude-design-review-2026)
- Spain pricing: prices exclude tax; 21% IVA added at checkout based on billing address; Max 20x ≈ €210-216/month incl. tax depending on FX; mobile app prices in Spain can be 40%+ higher than web for Max 5x — [geotoolbox.ai (ES)](https://geotoolbox.ai/es/blog/precio-claude), [geotoolbox.ai (FR)](https://geotoolbox.ai/fr/blog/prix-claude.md) (secondary, unverified against Anthropic)
- Spain/EU availability: the official Claude Design help page lists no regional restrictions — [Claude Help Center 14604416](https://support.claude.com/en/articles/14604416); a secondary blog states Claude Design inherits Claude.ai coverage including Spain — [pasqualepillitteri.it (ES)](https://pasqualepillitteri.it/es/news/977/claude-design-anthropic-labs-alternativa-figma)
- `/design-sync` and Claude Design tooling do not work on Amazon Bedrock, Google Cloud, or Microsoft Foundry (tools can't reach claude.ai) — [Serverworks blog (JP)](https://blog.serverworks.co.jp/claude-design-sync); the `/design` skill requires a claude.ai sign-in and is unavailable with API keys or on Bedrock/Vertex/Foundry, or with CMEK/HIPAA/ZDR orgs — [blakecrosley.com](https://blakecrosley.com/blog/claude-code-design-skill)
- Opus 5.5 is reportedly ~40% cheaper than Opus 5 on typical token-billed workloads (Anthropic's own testing), which stretches allowances — [Claude webinar page](https://claude.com/de/resources/webinars/opus-5-5-for-work)

### Inferences
- Because the pool is now shared, Claude Design iterations and Claude Code sessions compete for the same budget; there is no "free extra" design quota anymore.
- For a heavy one-off build (many zones, many animation iterations), Pro may run out quickly; Max 5x ($100 + IVA) is the safer tier. If the company has Team/Enterprise seats, check whether the user's seat is Standard or Premium and whether the org uses Bedrock/Vertex (which would block Claude Design features in Claude Code).
- If the company is on Enterprise, Claude Design is enabled by default from 2026-10-15 unless the admin disabled it.

### Gaps
- No official EUR price list found; EUR figures are third-party estimates.
- Exact Max 20x price could not be confirmed from the official page in this session (secondary sources say $200).
- No official per-plan quantitative token/message limits published.

## 3. Can Claude Design produce animated/motion content, and what are its limitations for a pan/zoom canvas presentation?

### Takeaway
Yes, Claude Design produces code-based (HTML/CSS/JS) output and is used for animations, motion graphics and interactive 3D; standalone HTML is the export that preserves animation/interactivity, while PPTX/Canva degrade it. No source confirms GSAP or a Prezi-style camera pan/zoom presentation specifically, and the main limitations for this use case are code ownership/version control, iteration over a large single project, and preview-stage bugs.

### Cited Findings
- Launch post: static mockups become interactive prototypes; "code-powered prototypes with voice, video, shaders, 3D and built-in AI"; Brilliant designer says "intricate interactivity and animations" were previously hard to prototype — [Anthropic news](https://www.anthropic.com/news/claude-design-anthropic-labs)
- "Animations, motion graphics, and interactive experiences with 3D elements" listed as uses; author made animated infographics, explainers and promo videos (Aug 20, 2026); limitations section paywalled — [AI Blew My Mind (Substack)](https://aiblewmymind.substack.com/p/claude-design-animations)
- The designer who built Claude Design made its intro animation by first having Claude build a custom video editor, and built an app with adjustable animation controls for tuning motion physics — [Claude blog, 2026-07-24](https://claude.com/blog/how-the-product-designer-who-built-claude-design-uses-it-to-explore-ideas-before-building-them)
- Claude Design can apply CSS keyframe animations, Tailwind, build multi-slide presentations with navigation, Chart.js charts; complex 3D animation needs significant prompting; decks of 20+ slides can become inconsistent without structured prompting — [MindStudio](https://www.mindstudio.ai/blog/claude-design-animated-prototypes-slide-decks) (vendor blog; same article claims no PPTX export, which contradicts official docs)
- Standalone HTML is the format that preserves interactivity and animation; avoid PPTX when those matter; PPTX fonts may swap and complex layouts shift; Canva export reported as weak by some — [horadecodar (PT)](https://horadecodar.com.br/?p=42625), [moda.app](https://moda.app/blog/claude-design-alternatives) (secondary; moda is a competitor)
- Video export: conflicting reports — one guide describes Share > Export > Video producing MP4 only; others (May 2026) say no native MP4 export; third-party tools (claude-video-export on GitHub, claude2video) render Claude Design animations to MP4 — [search results incl. notebooklm-guide.com](https://notebooklm-guide.com/notebooklm-claude-design-video-export/), [GitHub claude-video-export](https://github.com/dawoodtrumboo/claude-video-export). Current official export list does not include video but lists a Hyperframes integration — [Claude Help Center 14604416](https://support.claude.com/en/articles/14604416)
- The Claude Code `/design` skill publishes multiple artboards (`.dc.html` files) on "one pan/zoom canvas" — this is the editor canvas, not a presentation mode — [blakecrosley.com](https://blakecrosley.com/blog/claude-code-design-skill)
- Claude Design output is a self-contained HTML/CSS/JS artifact; it must be converted before engineers can maintain it; the article does not describe local-file or version-control workflows for Claude Design — [MindStudio comparison, 2026-04-27](https://www.mindstudio.ai/blog/claude-design-vs-claude-code-ui-prototypes) (vendor blog)
- Reddit reaction described as "resounding meh", outputs look alike with a recognizable house style — [eesel review](https://www.eesel.ai/blog/claude-design-review-2026)
- GSAP shows up in the Claude ecosystem via Claude Code/skills (e.g., Codrops rebuilding Claude mascot animations with SVG+GSAP; GSAP skills/MCP servers), not documented for Claude Design — [Codrops](https://tympanus.net/codrops/?p=114688), [mcpmarket GSAP skill](https://mcpmarket.com/tools/skills/cinematic-gsap-lenis-motion-system)

### Inferences
- Technically, since Claude Design generates HTML/JS, a camera pan/zoom deck with CSS transforms or a JS library is likely possible inside it, but no source documents it; treat as untested.
- For this specific project (one large canvas, ~N zones each with bespoke animated explainers, iterative fine-tuning of timing/easing), the pain points are: no git history/diffs, working on one big file through chat, harder to bring in local assets/the Markdown script, and dependence on a preview product with a shutdown date for the standalone app. These favor Claude Code for the build.
- Claude Design's strengths (fast visual variants, knobs/sliders, comments, brand/design-system ingestion) map well to deciding the look of the map and of 1-2 sample zones.
- Performance of smooth zoom/pan over a large DOM/SVG with many animations is a real engineering concern (layering, will-change, lazy-starting zone animations); this is general frontend knowledge, not from a source here.

### Gaps
- No source confirms GSAP support or performance limits inside Claude Design.
- No first-hand report found of building a Prezi-style zooming presentation in Claude Design.
- The paywalled "3 Claude Design animation limitations" section could not be read.

## 4. What Claude Code offers for this use case, and the Claude Code <-> Claude Design handoff

### Takeaway
Claude Code works on local files (fits a Markdown script + git), can run a dev server and verify visually in the desktop app's Browser pane (screenshots, DOM inspection, clicking, auto-verify on by default), use Claude in Chrome, install the official frontend-design skill, and publish artifacts. The two products are now bridged both ways: Claude Design "Hand off to Claude Code" bundles, and in Claude Code `/design` and `/design-sync`.

### Cited Findings
- Desktop app: "Claude can start a dev server and open it in the Browser pane to verify its changes"; Browser pane can open static HTML files, PDFs, images, videos; Cmd+Shift+B opens it; `.claude/launch.json` auto-created — [Claude Code docs: desktop](https://code.claude.com/docs/en/desktop)
- Verification: Claude "takes screenshots, inspects the DOM, clicks elements, fills forms, and fixes issues it finds"; `autoVerify` is on by default (can be disabled in launch.json) — [Claude Code docs: desktop](https://code.claude.com/docs/en/desktop)
- Browser pane uses a clean profile; Claude in Chrome extension is for logged-in sessions; both share safety model and site allow/block lists — [Claude Code docs: desktop](https://code.claude.com/docs/en/desktop)
- Handoff from Claude Design: Export menu includes "Handoff to Claude Code"; bundle includes design files, the chat, and a README, plus a prompt to paste into local Claude Code; Claude Code on the web is also an option; most valuable when a codebase is linked — [Claude tutorial: prototypes and UX](https://claude.com/resources/tutorials/using-claude-design-for-prototypes-and-ux), [claude-code-playbook](https://claude-code-playbook.pages.dev/en/docs/level-4/claude-design-handoff)
- Current official: from Claude Code, `/design` can import a design into your codebase, export code as a live prototype, or build the whole thing; `/design-sync` keeps the design system synced between Claude Design and Claude Code; Export can send designs to a local coding agent or to Claude Code on the web — [Claude Help Center 14604416](https://support.claude.com/en/articles/14604416)
- Two-way sync announced 2026-06-17 by @ClaudeDevs; `/design-sync` pulls a design system into a repo or pushes code back to Claude Design for canvas editing; incremental, one component at a time, with a plan you approve; first sync can take hours on large repos; `/design-login` authorizes — [pasqualepillitteri.it](https://pasqualepillitteri.it/en/news/5308/claude-code-claude-design-two-way-sync-design-sync), [Serverworks (JP)](https://blog.serverworks.co.jp/claude-design-sync)
- Claude Code `/design` skill (research preview, Anthropic Week 34 digest, Aug 2026): from a brief, publishes a canvas of editable UI artboards as an artifact; described as "an early preview of Claude Design inside Claude Code"; needs Claude Code v2.1.233+, Pro/Max/Team/Enterprise, claude.ai sign-in; animation not mentioned — [blakecrosley.com, 2026-08-25](https://blakecrosley.com/blog/claude-code-design-skill)
- The designer who built Claude Design: "Claude Code is for coding; Claude Design is for the other parts of the design work"; Claude Code "continues from your existing work" rather than rebuilding from a screenshot; Claude Design works inside Claude Code via `/design` — [Claude blog, 2026-07-24](https://claude.com/blog/how-the-product-designer-who-built-claude-design-uses-it-to-explore-ideas-before-building-them)
- frontend-design: official Anthropic plugin containing a single skill (SKILL.md) that loads automatically for UI work, aimed at distinctive rather than generic-looking interfaces; install e.g. `/plugin install frontend-design@claude-plugins-official` (marketplace name differs between sources); one review: improves aesthetics/typography but not code correctness ("a taste layer, not a correctness layer"); claimed 1.1M+ installs (unverified) — [claudelog](https://claudelog.com/faqs/what-is-frontend-design-skill-in-claude-code/), [dev.to](https://dev.to/nishilbhave/how-to-use-claude-codes-frontend-design-plugin-511i), [claudemarketplaces](https://claudemarketplaces.com/skills/anthropics/claude-plugins-official/frontend-design)
- Claude Code strengths per comparison: reads repo, matches conventions, runs builds, fixes errors, suits long-running projects; output lives in your project and goes through normal code review/git; weaknesses: needs dev environment, no visual canvas — [MindStudio comparison](https://www.mindstudio.ai/blog/claude-design-vs-claude-code-ui-prototypes)
- Guide on building presentations with Claude Code: describe the deck in plain English, Claude Code writes HTML/CSS/JS, result is a self-contained HTML file that runs in any browser (March 2026) — [designproject.io](https://designproject.io/blog/build-presentations-with-claude-code-stop-designing-decks-in-figma-and-ship-interactive-ones-instead/) (vendor-adjacent)
- UX Planet article on building complex animated effects in Claude Code exists (member-only, not read) — [UX Planet](https://uxplanet.org/complex-animated-effects-design-in-claude-code-b5cae7010b20)

### Inferences
- For a developer who already has the script in Markdown, Claude Code gives the most control: script file in the repo, one zone per component/file, git commits per zone, ability to add GSAP or similar libraries, and the Browser pane/auto-verify loop to screenshot each zone and the camera transitions.
- Practical hybrid: use Claude Design (in chat or via `/design` in Claude Code) to explore the visual language (palette, typography, map layout, one sample zone), then hand off/`/design-sync` to Claude Code to build and iterate the full presentation locally.
- Verification of animations via screenshots is partial (static frames); timing/easing judgments still need a human watching the result. This is an inference, not from a source.

### Gaps
- No official doc found on whether Claude Code's Browser pane can record video/GIF of animations (Claude in Chrome has GIF recording per its skill description, but not verified via a web source here).
- Playwright MCP was not researched in this pass.
- No official handoff-bundle file format spec found.

## 5. What practitioners/reviewers recommend

### Takeaway
The dominant recommendation (official and community) is "explore visual direction in Claude Design, then hand off to Claude Code to build"; reviewers praise speed and the handoff but criticize usage burn, preview bugs, generic house style, and drift from real components. Very little first-hand HN/Reddit material was retrievable.

### Cited Findings
- Official framing: use Claude Design for early ideation, collaboration and buy-in before building; hand off to Claude Code once it should become software — [Claude blog](https://claude.com/blog/how-the-product-designer-who-built-claude-design-uses-it-to-explore-ideas-before-building-them)
- "Both: explore the visual direction in Claude Design, document the decisions, then implement in Claude Code" — [MindStudio comparison](https://www.mindstudio.ai/blog/claude-design-vs-claude-code-ui-prototypes) (vendor)
- Handoff is "the feature that makes the tool worthwhile", but bugs add friction; "research preview means the product is usable, not that it is stable" — [alexcloudstar review](https://alexcloudstar.com/blog/claude-design-review-developer-first-look-2026/)
- Victor Dibia: handoff step "tighter than a typical HTML export"; he had to intervene on component placement and data choices — [eesel review](https://www.eesel.ai/blog/claude-design-review-2026)
- Brilliant: page recreation from "20+ prompts in other tools to 2 prompts"; Ran Segall: "10x better than Lovable or Replit"; one designer spent more time "fixing the AI's mistakes than it would have taken to build from scratch"; Reddit: "resounding meh", same-looking outputs — [eesel review](https://www.eesel.ai/blog/claude-design-review-2026) (competitor-published, quotes aggregated)
- Consultancy advice: keep a review step before anything merges — [hackceleration](https://hackceleration.com/agency/claude-design)
- April 2026 hands-on: separate quota used up quickly limiting iteration; output quality depends heavily on brief clarity (older; quota now shared) — [xencreate](https://www.xencreate.com/blog/claude-design-early-impressions-and-what-it-means-for-creative-workflows)
- HN: a thread "Thoughts and feelings around Claude Design" reportedly got 13 points/1 comment; another HN commenter said after giving it twelve screenshots of app pages it did a good job fixing them — [PromptZone summary](https://www.promptzone.com/farrah_dubois/claude-design-hn-discussion-insights-1o5b) (aggregator, unverified)
- Confusion noted between Claude Design and the newer Claude Slides: "two overlapping presentation surfaces" — [eesel: Claude Slides review](https://www.eesel.ai/blog/claude-slides-review)

### Inferences
- Community consensus fits this user's case: Claude Design for look-and-feel exploration and stakeholder sign-off at the company, Claude Code for building a bespoke, heavily animated, version-controlled presentation.

### Gaps
- No direct Reddit or Hacker News threads were successfully retrieved; opinions are via blogs/aggregators.
- No YouTube review was examined directly (a motion-graphics transcript exists at [gotranscript](https://gotranscript.com/public/create-motion-graphics-with-claude-design-ai) but was not read).
- No X/Twitter posts retrieved directly.

## 6. Other Anthropic surfaces relevant for presentations (Artifacts, Claude Slides, Cowork, desktop app)

### Takeaway
Since 2026-09-16 Cowork has been merged into regular Claude chat ("One Claude"), shipping Claude Docs and Claude Slides; Claude Slides is a beta in-chat deck editor exporting PowerPoint/PDF, aimed at conventional slides rather than custom motion canvases. Artifacts remain the general mechanism, and Claude Design is now itself an artifact template.

### Cited Findings
- 2026-09-16: Cowork merged into chat ("One Claude"), plus new Claude Docs and Claude Slides; Slides drafts decks from notes/files/connected apps, editable directly or by asking, present from Claude or export to PowerPoint/PDF, share by link; beta, paid plans, on by default for Pro/Max/Team, off on Enterprise until enabled; Free users can still get a .pptx file — [eesel: Claude Slides](https://www.eesel.ai/blog/claude-slides), [Siècle Digital, 2026-09-18](https://siecledigital.fr/2026/09/18/besoin-de-slides-pour-une-reunion-claude-peut-desormais-creer-votre-presentation-de-a-a-z/)
- Pricing page banner: "Claude Cowork is now just Claude"; lists Claude Design alongside Claude Slides and Claude Docs — [Claude pricing](https://claude.com/pricing)
- Google Slides creation/editing in a side pane (beta, help center updated 2026-09-25) — [eesel: Claude Slides](https://www.eesel.ai/blog/claude-slides)
- Artifacts can be created on web and Desktop; on mobile you can ask for a design, deck, or doc and view it in the Artifacts tab — [Claude Help Center: artifacts](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)
- Claude Design is now reachable as "Output > Design" in chat and as a Design template in the Artifacts tab — [Claude Help Center 14604416](https://support.claude.com/en/articles/14604416)

### Inferences
- Claude Slides is the right tool for a normal corporate deck, not for a single zooming map with bespoke motion graphics; a PPTX export would lose the camera-movement concept.
- Publishing the final HTML as a claude.ai artifact (from Claude Code) could be a convenient way to share the presentation internally, subject to company data policies; standalone HTML works offline for presenting.

### Gaps
- Official Anthropic announcement page for "One Claude"/Claude Slides was not fetched directly (info via secondary sources quoting help center).
- No source on size limits for artifacts hosting a large, asset-heavy HTML presentation.
