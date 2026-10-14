# Motion graphics with Claude Opus 5.5 (and Claude Code / Claude Design / Claude Motion): trend, showcase examples, workflows and prompting techniques (2025 to Oct 2026)

Research date: 2026-10-14. Source note: Most of the community material is in blogs, aggregators, prompt libraries and social posts. Few primary sources (Anthropic pages, GitHub repos) could be fetched directly. X/Twitter posts could not be opened. Where a claim reached me only through an aggregator, it is marked "(secondhand)". Search-result snippets I could not open are marked "(search snippet only)".

## 1. What are the viral or notable examples, who made them, with which tools, and how long did they take?

### Takeaway
The trend took off right after Opus 5.5 launched (September 22, 2026). Its anchor was a one-line "make a 15-second motion graphics video that shows what an incredible motion designer you are" prompt that reportedly went past 2M views. In the following weeks came a wave of code-rendered shorts (three.js/HTML/canvas rendered frame by frame to MP4, Manim explainers, Remotion and HyperFrames videos). On October 8, 2026 Anthropic launched its own "Claude Motion" feature, which also builds animated explainers from code. I could not verify per-example build times except for a few game builds.

### Cited Findings
**Timeline and official products**
- Anthropic's Opus 5.5 page gives the release date as "September 22, 2026". — [Anthropic, Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5)
- Claude Design launched April 17, 2026 as an experimental product for prototypes, slides and one-pagers. It was powered by Opus 4.7 and exported to PDF, PPTX, URL/HTML or Canva. — [TechCrunch](https://techcrunch.com/2026/04/17/anthropic-launches-claude-design-a-new-product-for-creating-quick-visuals/); [Unite.ai](https://www.unite.ai/anthropic-launches-claude-design-for-visual-prototyping-and-presentations/)
- Claude Motion was announced October 8, 2026 (beta, Team and Enterprise only). Anthropic: "Claude writes code that animates your text, charts, shapes, and images, so you can change any word, number, or timing." Also: "It doesn't use a video generation model, so there's no generated footage and no AI-generated people." Example uses: a 30-second all-hands explainer, motion added to a chart in a board deck, a product onboarding walkthrough. Output can be edited in an editor or by asking Claude, then downloaded as MP4. Exports also go to Adobe, Descript, HeyGen, Higgsfield, invideo, Luma AI and Runway. It is invoked with "/motion" in the message box. — [Anthropic/Claude, "Build live dashboards and animate explainers with Claude" (Oct 8, 2026)](https://claude.com/resources/articles/dashboards-and-motion)
- On the same date, Docs, Slides and Design left beta for all plans. Per secondhand coverage, Design has worked inside every Claude conversation since September 16, 2026, and the standalone claude.ai/design site stays up until December 14, 2026. — [AI Catchup (secondhand)](https://aicatchup.com/news/claude-dashboards-motion-beta)
- HeyGen released HyperFrames (open source, Apache 2.0, "Write HTML. Render video. Built for agents.") on April 17, 2026. When fetched, the GitHub page showed about 63.2k stars. — [GitHub heygen-com/hyperframes](https://github.com/heygen-com/hyperframes); launch date from [noqta.tn (secondhand)](https://www.noqta.tn/en/blog/heygen-hyperframes-html-to-mp4-ai-agent-video-2026)

**Viral / notable community examples (Opus 5.5 era)**
- **@stephanlivera** posted the "make a dynamic 15-second motion graphics video that shows what an incredible motion designer you are" result. iArt reports it passed **two million views**. The output had seven cuts in 15 seconds, timed to a 128 bpm track that Claude also wrote, with one red dot recurring across scenes. Link given: x.com/stephanlivera/status/2103315922098470926. I could not open the X post. — [iArt.ai blog (Zhangcan Ding, updated Oct 10, 2026)](https://www.iart.ai/blog/claude-motion-graphics)
- **Charlie Hills** (MarTech AI Substack, Sep 27, 2026) used the same prompt, extended with "Go all out.", pasted into Claude Code. He says Opus 5.5 picked up his brand colours from his existing Claude Code setup. His Threads summary: "Opus 5.5 can (actually) make (good) motion graphics. Here's how I set Claude up in 10 steps." — [Substack](https://charliehills.substack.com/p/claude-code-motion-graphics); [Threads](https://www.threads.com/@charliehills/post/Dd1FLJRFhjB/opus-can-actually-make-good-motion-graphics-heres-how-i-set-claude-up-in-steps)
- A daily.dev "Collections" roundup (published Sep 26, 2026) cites these X posts. All are secondhand, and I could not open the X posts themselves:
  - @mattshumer_: an animated short film made entirely in code.
  - @petergyang: a Golden-Gate-Bridge-like video, a Sonnet 5.5 hype reel with music, and an AI/robots video.
  - @rohanpaul_ai: a Paul Graham essay turned into a video essay from a one-line prompt.
  - @Hesamation: a **Manim explainer on pointers** with music, plus a Pink Floyd "Time" animation.
  - @kloss_xyz: a 90-second motion design piece with a piano score the model wrote.
  - @mattpocockuk: **animatics with TTS narration for planning lessons**.
  - @felixrieseberg: rebuilt his homepage with music, hand-drawn textures and Blender models.
  - @trq212: had the model build an animation editor to tune a game jump. The roundup's community-reaction section is based on @trq212's thread.

  [daily.dev Collections (secondhand aggregator)](https://daily.dev/posts/claude-opus-5-5-generates-motion-design-and-visual-scenes-entirely-in-code-yqmdx7qnw)
- Build times, from the same aggregator: one developer built four 3D browser games at about 40 minutes each, and a Mega Bonk clone was built autonomously over about 20 hours. The aggregator contradicts itself, saying "a single afternoon session" in the FAQ and ~40 min each in the body. — [daily.dev (secondhand)](https://daily.dev/posts/claude-opus-5-5-generates-motion-design-and-visual-scenes-entirely-in-code-yqmdx7qnw)
- YouTube tutorial "How To Make Beautiful Animations With Claude Opus 5.5 (my exact workflow)". The fetched page title read "How I make insane motion graphics with Claude Opus 5.5 (my exact workflow)". The channel, date and description could not be retrieved. — [YouTube](https://www.youtube.com/watch?v=H6lBZ7AfDDE)
- Earlier wave (pre-Opus 5.5): YouTube tutorials on Claude Code + Remotion Agent Skills. Titles include "How I Created a Professional Motion Graphics Video With Claude Code + Remotion Skills (No Editing)" and "Claude Code + Remotion = FREE Motion Graphics Tutorial (No Subscription)" (search snippet only; dates and creators not verified). — [videohighlight.com xAUifztpib8](https://videohighlight.com/v/xAUifztpib8); [videohighlight.com kXmY6yQa5q4](https://videohighlight.com/v/kXmY6yQa5q4)
- Prompt libraries appeared quickly:
  - [GitHub TripoGrowthLab/awesome-opus-5-5-prompts](https://github.com/TripoGrowthLab/awesome-opus-5-5-prompts): "Claude Opus 5.5 prompts for 3D scenes, games, animation and simulations… in 14 languages" (search snippet only).
  - [youmind.com/opus-5-5-prompts](https://youmind.com/opus-5-5-prompts) (search snippet only).
  - [aiidelist.com, 24 named templates](https://aiidelist.com/blog/opus-5-5-motion-design).

### Inferences
- The trend has two layers. (a) Community: Opus 5.5 + Claude Code + a render harness (HyperFrames, Remotion, raw canvas/three.js + ffmpeg) producing MP4s. (b) Anthropic productizing the same "code-not-pixels" idea as Claude Motion (MP4 export) and Claude Design (HTML/PPTX export). For a *live HTML* presentation, layer (a) with HTML/CSS/GSAP in the browser is the direct fit. The MP4 render step can be skipped entirely.
- The most-cited showcase pattern is short (15–90 s), music-synced and fully code-drawn, not photoreal.

### Gaps
- I could not open any X/Twitter post directly. View counts, dates and exact prompts for @stephanlivera, @mattshumer_, @petergyang and the others are secondhand.
- I found no Reddit (r/ClaudeAI, r/motiongraphics) or Hacker News threads on this topic through search. Community sentiment on those platforms is unverified.
- Charlie Hills' steps 3–10 are paywalled.
- The YouTube channel and description could not be retrieved.

## 2. What workflows do practitioners describe (storyboard → design system → scene-by-scene → render/screenshot → feedback loop; skills; references; style prompts)?

### Takeaway
The workflow that keeps recurring has five parts:
1. Define the goal and gather real assets.
2. Write a timed storyboard before any code.
3. Lock a single design system (one palette, type, accent and motion philosophy).
4. Build with an agent skill pack (HyperFrames for HTML+GSAP, Remotion for React, or JS-animation skill packs).
5. Render representative still frames ("contact sheets"), critique them as a motion director with prioritized fixes, and only then render the final output.

Edits are made in plain language or at frame level ("move the logo reveal 12 frames later").

### Cited Findings
**Charlie Hills' setup (visible steps only)**
- Step 1, test it: paste the one-line prompt into Claude Code. Every frame is drawn in code and compiled into an MP4. Edit by describing changes in plain language (slow a scene, swap text, change a colour).
- Step 2, install it: `npx skills add heygen-com/hyperframes`, plus a free "motion-graphics-skills" pack from GitHub whose 13 skill folders go in `~/.claude/skills/`. It includes a "vox-explainer" skill that asks for facts and sources before drawing anything.
- Choose Opus 5.5 in the desktop app's Code tab or with `/model` in the terminal.
- Visible step 4 is titled "Build your brand design system".

[Charlie Hills, Substack (Sep 27, 2026)](https://charliehills.substack.com/p/claude-code-motion-graphics)

**aiidelist workflow** (Oct 5, 2026, no author named)

The loop is "generate → preview → inspect → critique → revise → render", and the advice is to treat Opus 5.5 as "a motion designer plus creative developer, not as a one-click video model." Steps:
1. Define the communication goal, not effects.
2. Gather real assets (logo, colors, fonts, screenshots, approved claims, real metrics, audio).
3. Write a storyboard with timed scenes (e.g. 0–2s hook, 2–5s problem, 5–9s feature, 9–13s proof, 13–15s resolution).
4. Choose a stack.
5. Render representative frames and check clipping, hierarchy, colors, spacing, morphs, safe areas and logo proportions.
6. Review timing (entries, holds, exits, rhythm, overshoot, dead time, beat alignment).
7. Render the full-resolution MP4 only after visual and timing QA.

[aiidelist.com](https://aiidelist.com/blog/opus-5-5-motion-design)

**QA and critique**
- Use contact sheets of stills from every major scene and transition, with timestamp checkpoints at 0, 2, 5, 8, 11, 14 s and the final frame.
- Use a separate critique prompt: "review as a motion director, reference exact timestamps, rank fixes P0/P1/P2."
- Render-QA template line: "Fix visible issues before producing the final MP4."

[aiidelist.com](https://aiidelist.com/blog/opus-5-5-motion-design)

**HyperFrames production loop** (primary source)
- Authoring model: compositions are plain HTML with `data-composition-id`, `data-start`, `data-duration`, `data-track-index` and `data-width`/`data-height`. Timed elements use the `clip` class. GSAP timelines are created **paused** and registered on `window.__timelines`. CSS, Lottie, Three.js, Anime.js and WAAPI are also supported. No build step is needed.
- Skills: the `/hyperframes` router dispatches to creation workflows `/product-launch-video`, `/faceless-explainer`, `/motion-graphics` and `/slideshow` (21 published skills).
- The skills teach a loop of plan → valid HTML → wire animations → add media → lint → preview → render.
- CLI: `npx hyperframes init|preview|render|lint|check|snapshot`.
- Rendering is deterministic: it seeks each frame in headless Chrome and encodes with FFmpeg.
- Sample prompt: "Using `/hyperframes`, create a 10-second product intro with a fade-in title, a background video, and subtle background music."

[GitHub heygen-com/hyperframes](https://github.com/heygen-com/hyperframes)

**Remotion route**
- Remotion published Agent Skills for Claude Code. Install with `npx skills add remotion-dev/skills` (or `npx create-video@latest` for new projects), preview in Remotion Studio, and render to MP4 from the CLI. One guide names the skills /remotion-create, /remotion-markup, /remotion-studio and /remotion-render. Not verified against official Remotion docs.
- Remotion is free for individuals and companies with up to 3 employees. Larger companies need a Company License (secondhand).

[autoae.online](https://autoae.online/blog/claude-code-remotion-tutorial); [MindStudio](https://mindstudio.ai/blog/remotion-claude-code-animated-logo-reveals-motion-graphics) (search snippets only)

**Other workflow details**
- iArt route: install the open-source skill pack github.com/iart-ai/javascript-animation-skills plus Node, a headless browser and ffmpeg. Opus 5.5 writes code that draws each frame on a 2D canvas and synthesizes the soundtrack. iArt ran each prompt once and kept the first result. — [iArt.ai](https://www.iart.ai/blog/claude-motion-graphics)
- Planning layer: CLAUDE.md with business context, plan mode, and a **design.md for colors and fonts**. — [daily.dev (secondhand)](https://daily.dev/posts/claude-opus-5-5-generates-motion-design-and-visual-scenes-entirely-in-code-yqmdx7qnw)
- Audio: the model wrote Suno prompts and SFX specs. The human picked takes by ear, and the model measured tempo and loudness to cut audio, because "Claude can't hear". — [daily.dev (secondhand)](https://daily.dev/posts/claude-opus-5-5-generates-motion-design-and-visual-scenes-entirely-in-code-yqmdx7qnw)
- Tool limits: a large render crashed Claude Design, so the creator moved to Claude Code for frame-by-frame rendering. — [daily.dev (secondhand)](https://daily.dev/posts/claude-opus-5-5-generates-motion-design-and-visual-scenes-entirely-in-code-yqmdx7qnw)
- Website builds: tutorials describe a website build with design skills plus **Playwright testing**, and a "six-stage Claude Code workflow ending in a 3D scrolling site". — [daily.dev (secondhand)](https://daily.dev/posts/claude-opus-5-5-generates-motion-design-and-visual-scenes-entirely-in-code-yqmdx7qnw)
- Another guide recommends asking for a storyboard first and stating "the audience, outcome, duration, aspect ratio, factual sources, visual style, audio policy, and required output". One creator reported that a Claude Code + motion-design-skill result "took a review and refinement pass; it was not a one-prompt result" (search snippet). — [nocode.mba / joaoqueiros / aiidelist results](https://www.nocode.mba/articles/claude-opus-5-5-motion-graphics)
- One creator's recipe: "pick one motion, show Claude a reference and name every state, ask for HTML and SVG, fix it round by round" (search snippet only; creator not identified). — [Medium, Opus 5.5 Prompt Library for Creators](https://medium.com/@nr7670/opus-5-5-prompt-library-for-creators-motion-graphics-ai-video-ca43a6d562ad)
- Style-reference prompts: aiidelist includes an "Apple-Keynote-Style Product Film" template, as well as "Technical Explainer", "Hand-Drawn Canvas Explainer", "Map Explainer" and "Code-Change Explainer" templates. — [aiidelist.com](https://aiidelist.com/blog/opus-5-5-motion-design)
- Charlie Hills' "vox-explainer" skill is a named-style example (Vox-style explainer). — [Charlie Hills](https://charliehills.substack.com/p/claude-code-motion-graphics)

### Inferences
- For a live, interactive Prezi-style page, the HyperFrames authoring model transfers well even without rendering to MP4. That means paused GSAP timelines per scene, a central registry, and declarative timing attributes. Each "zone" can own a paused timeline that the camera-move controller plays on arrival.
- The "contact sheet" QA step maps directly to having Claude Code take screenshots (for example with Playwright) of each zone and of mid-transition states, then critique them P0/P1/P2.
- A design.md/CLAUDE.md holding palette, type and motion tokens is the community's way of keeping one visual language across many prompting sessions.

### Gaps
- Exact Remotion skill names and commands were not verified against remotion.dev docs.
- The "motion-graphics-skills" 13-folder pack (Charlie Hills) has no repo URL in the visible content.
- I found no source specifically describing a Prezi-style camera/zoom HTML presentation built with Claude. The search returned only Prezi's own docs ([Prezi support, Using zoom](https://support.prezi.com/hc/en-us/articles/360003498793-Using-zoom)), which define the model: a canvas, frames as zoom targets, a path of steps, and overview zoom-outs.

## 3. Prompting tips and pitfalls (timing/easing vocabulary, avoiding AI slop, consistent visual language, performance, reduced motion, single source of truth, components)

### Takeaway
Practitioners say to prompt like a motion director. Name the easing per purpose, require holds and stillness, ban generic effects (particles, glow, lens flares, meaningless 3D spins), keep one design system, make every scene emerge from an object already on screen, and make animation a deterministic function of time. Reported failure modes are sparse openings, thin lines and small text unreadable on small screens, awkward morph folds, and invented UI or metrics.

### Cited Findings
**Timing and easing vocabulary**
- Terms used: spring, expo-out, ease-in-out, ease-out, progressive easing, overshoot, anticipation, follow-through, squash and stretch, secondary motion.
- Suggested mapping:
  - tight spring for UI interaction
  - smooth ease-in-out for camera moves
  - controlled ease-out for logo reveals
  - progressive easing for data growth
  - fast acceleration with a short settle for impact
- Ban default elastic bounce.
- Add a 300–600 ms pause before a reveal.
- Hold a headline at least 1.2 s before the next major transition.
- Make frame-level edits at 60 fps ("Move the logo reveal 12 frames later").

[aiidelist.com](https://aiidelist.com/blog/opus-5-5-motion-design)

**Single source of truth**
- "The same time value must always produce the same visual state."
- Remove unseeded randomness and playback-history-dependent state.
- Tie timing notes to the storyboard so revisions change the timeline, not scattered effects.

[aiidelist.com](https://aiidelist.com/blog/opus-5-5-motion-design). HyperFrames enforces this structurally with paused, seekable GSAP timelines and data-start/data-duration attributes — [GitHub heygen-com/hyperframes](https://github.com/heygen-com/hyperframes)

**Scene structure and continuity**
- Give each scene one job, and define a primary, secondary and tertiary element per scene.
- "Every scene must emerge from an object already visible." Example chain: search bar → progress bar → chart axis → comparison table → logo underline.
- Define two or three transition families and reuse them.
- UI Morph template: "Never cut to a different object."
- Kinetic Typography template: "Typography must carry the story."

[aiidelist.com](https://aiidelist.com/blog/opus-5-5-motion-design)

**Anti-"AI slop"**
- Use fewer effects. One background family, one type system, one accent color, one icon style, one motion philosophy.
- Ban generic particles, excess glow, lens flares, RGB split, constant camera shake, meaningless 3D spins and generic floating cards.
- No fake dashboards or invented UI.
- Use intentional stillness.
- Run a separate critique pass that assumes v1 is not final.
- Template lines: "Do not invent metrics, customers, pricing, or interface states"; "Never alter or invent numbers."

[aiidelist.com](https://aiidelist.com/blog/opus-5-5-motion-design)

**iArt tips**
- Give a length and format.
- Focus on one idea, not a feature list.
- Quote exact text and numbers, because text is drawn as real type.
- Describe the moment that matters (the impact, the speed-up).
- Leave room for Claude to choose the visuals.

[iArt.ai](https://www.iart.ai/blog/claude-motion-graphics)

**Pitfalls reported by iArt**
- Opening seconds can be sparse (a lone dot).
- Thin lines vanish on phones, and small credit text is hard to read.
- A headline showing a clock year beside a count can be misread.
- Morphing shapes show surface folds mid-transition.

[iArt.ai](https://www.iart.ai/blog/claude-motion-graphics)

**Pitfalls and skepticism**
- Living things and animals look off, lighting tends to be overexposed, and long builds use a lot of usage.
- @wesbos said the motion graphics "aren't especially good". In his view the achievement is that they can be made at all, and taste and asset libraries matter most.
- Pushback also questioned whether frameworks are more token-efficient than custom tooling.
- The aggregator's rough sentiment split was ~70% positive, 25% mixed, 5% skeptical (its own estimate, method unknown).

[daily.dev (secondhand)](https://daily.dev/posts/claude-opus-5-5-generates-motion-design-and-visual-scenes-entirely-in-code-yqmdx7qnw)

**QA checklist**
- Confirm on-screen text against audio and logo correctness.
- Review text wrapping, timing, and empty or crowded layouts frame by frame.

[aiidelist / search snippet](https://aiidelist.com/blog/opus-5-5-motion-design)

**Code-not-pixels limits**
- Claude writes a program that draws the film, so text and numbers stay exact and editable. Photoreal camera footage isn't produced. For photoreal footage, use a dedicated video model.

[iArt.ai](https://www.iart.ai/blog/claude-motion-graphics); [aiidelist.com](https://aiidelist.com/blog/opus-5-5-motion-design); [Anthropic, Claude Motion](https://claude.com/resources/articles/dashboards-and-motion)

### Inferences
- For the Devin presentation, the "ease-in-out for camera" guidance applies to zone-to-zone camera moves. The "hold ≥1.2 s" and "pause 300–600 ms before reveal" rules apply to concept reveals inside each zone.
- The "emerge from an object already visible" rule suits a Prezi-style map especially well. Example: the context-window bar from zone 1 becomes the cache row in zone 2.
- "Never invent numbers" matters here. Token counts, context sizes and prices shown on screen should come from verified docs.

### Gaps
- I found no community source that specifically discusses `prefers-reduced-motion`, accessibility, or runtime performance (60 fps, GPU-friendly transforms) for Claude-generated motion. These remain unsourced in this research. Standard web guidance applies but was not researched here.
- I found no source on splitting into React/Motion components specifically for Claude-generated animations, beyond Remotion's React structure.

## 4. Is there evidence that Opus 5.5 is specifically better at this than prior models or competitors?

### Takeaway
There is no rigorous evidence. Anthropic's own Opus 5.5 page makes **no design, animation or motion claims** and lists no design benchmark. Its only visual-quality claim is a tester's game-building note. Community claims of a jump in motion-graphics quality are anecdotal. On third-party Design Arena web-design boards, Opus 5.5 was reportedly 3rd (behind Muse Spark 1.3 and Kimi K3) as of Oct 7, 2026, and the boards move a lot and conflict across mirrors.

### Cited Findings
**Anthropic's official page**
- No explicit frontend, design, animation or motion claims.
- The only visual-quality quote comes from an unnamed tester's game-building test: "Opus 5.5 scored higher than any other model on the strength of its graphics and polish."
- Related benchmarks:

  | Benchmark | Opus 5.5 | Fable 5.1 | Opus 5 |
  |---|---|---|---|
  | Chartography (with tools) | 89.0% | 88.4% | 83.4% |
  | OSWorld 2.1 | 81.8% | 80.7% | 74.0% |

- Pricing: $4 / $20 per 1M input/output tokens (Opus 5: $5 / $25). Cache reads cost $0.20 and cache writes $5. Anthropic says it is ~40% cheaper than Opus 5 on typical default-setting workloads.
- Default effort is medium, with Low/Med/High/Xhigh/Max shown.

[Anthropic, Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5)

**Design Arena**
- A Towards AI article reports that two public copies of the Design Arena web design board, read Oct 7, 2026, put Muse Spark 1.3 1st, Kimi K3 2nd and **Claude Opus 5.5 3rd**.
- It also says a Design Arena note dated July 15, 2026 ranked GPT 5.6 Sol first on single-turn HTML web design, while other board copies put it 6th or outside the top 15.

[Towards AI (search snippet; the page returned 403 on fetch)](https://pub.towardsai.net/which-ai-model-is-best-for-web-design-5-picks-for-2026-6b7b5abfb937)
- Benchmarklist's undated Design Arena snapshots show Kimi K3 leading Web Design Overall and claude-opus-5 at rank 4 (1358). Opus 5.5 is not listed by name. — [benchmarklist.com Design Arena](https://benchmarklist.com/arenas/design_arena/); [Data Viz board](https://benchmarklist.com/arenas/design_arena_data_viz/)

**Anecdotal claims**
- Charlie Hills says the biggest gain with Opus 5.5 is in motion graphics.
- He also claims Opus 5.5 at medium effort beats "Astra" and "Fable" at their highest settings on "Anthropic's Terminal-Bench chart", and that it is cheaper than Astra and Opus 5.
- I could not verify the Astra comparison. Anthropic's page compares against Fable 5.1 and Opus 5.

[Charlie Hills](https://charliehills.substack.com/p/claude-code-motion-graphics); [Anthropic](https://www.anthropic.com/claude-opus-5-5)

**Pre-5.5 baseline**
- Claude Design launched on Opus 4.7. — [TechCrunch](https://techcrunch.com/2026/04/17/anthropic-launches-claude-design-a-new-product-for-creating-quick-visuals/)
- Claude Code + Remotion tutorials predate Opus 5.5. — [autoae.online](https://autoae.online/blog/claude-code-remotion-tutorial)

So code-generated motion with Claude was already a pattern. Opus 5.5 amplified it rather than created it.

### Inferences
- The best-supported statement is that Opus 5.5 is a strong, cheaper Opus that the community perceives as a step up for code-rendered motion. Evidence for "best in class for motion" is anecdotal. On web-design arenas it is top-3 but not #1 on the sources found.
- The quality ceiling is driven by the harness (skills, render loop, design system) and human taste as much as by the model, per @wesbos's critique and the "review and refinement pass" reports.

### Gaps
- I found no head-to-head animation or motion benchmark (Opus 5.5 vs Gemini vs GPT) from a reputable source.
- The Design Arena primary leaderboard was not fetched directly, so ranks are secondhand and time-sensitive.
- WebDev Arena (LMArena) standings for Opus 5.5 were not found.

## 5. Recommended patterns for explaining technical concepts visually (context window filling with tokens, cache hit/miss, main agent spawning subagents)

### Takeaway
I found **no published template or showcase** that specifically animates context windows, prompt caching or subagents with Claude. The closest community analogues are code-drawn technical explainers: @Hesamation's Manim pointer explainer, @mattpocockuk's TTS animatics for lessons, the "Technical Explainer" and "Code-Change Explainer" templates, and HyperFrames' `/faceless-explainer` workflow. Anthropic's Claude Motion targets exactly this use ("animate a chart or process walkthrough"). The concept-to-visual mappings below are therefore inferences, anchored on sourced facts about each concept.

### Cited Findings
- Technical-explainer precedents:
  - @Hesamation: a Manim explainer on pointers.
  - @mattpocockuk: animatics with TTS narration for planning lessons.

  [daily.dev (secondhand)](https://daily.dev/posts/claude-opus-5-5-generates-motion-design-and-visual-scenes-entirely-in-code-yqmdx7qnw)
- aiidelist has "Technical Explainer", "Code-Change Explainer", "Data Visualization" ("Never alter or invent numbers") and "Map Explainer" templates. It recommends Manim for math/science explainers and Canvas/SVG for geometric and procedural 2D. — [aiidelist.com](https://aiidelist.com/blog/opus-5-5-motion-design)
- HyperFrames ships `/faceless-explainer` and `/slideshow` workflows and a `data-chart` catalog block. — [GitHub heygen-com/hyperframes](https://github.com/heygen-com/hyperframes)
- Anthropic suggests Claude Motion for "a 30-second explainer for an all-hands", animated charts and product walkthroughs, describing it as "built for explaining your own work". — [Anthropic/Claude](https://claude.com/resources/articles/dashboards-and-motion). A secondary source suggests first animating an existing chart or process walkthrough, then checking that labels, numbers and timing can be fixed without regenerating. — [AI Catchup](https://aicatchup.com/news/claude-dashboards-motion-beta)

**Facts about the concepts to animate (Claude Code context; verify Devin specifics separately)**
- Claude Code's main session has a 200K-token window. System prompts, tool definitions, MCP schemas and memory files consume about 30–40K tokens before the user types anything.
- One guide says quality starts degrading around 147K.
- Each subagent gets its own separate window, and the main session receives only a summary.

[morphllm (secondhand, not Anthropic docs)](https://morphllm.com/claude-code-context-window); [mindstudio, subagents cost tokens](https://www.mindstudio.ai/blog/claude-code-subagents-cost-tokens)
- Opus 5.5 cache reads cost $0.20/MTok vs $4/MTok base input (20x cheaper), and cache writes cost $5/MTok. — [Anthropic, Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5)
- Opus 5.5 effort levels shown are Low, Med, High, Xhigh and Max, with medium as the default. — [Anthropic, Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5)
- Opus 5.5 is reported to have a 1M-token context window and up to 128K output tokens. Anthropic's page did not mention context size, so this is unverified. — [techjacksolutions (secondhand)](https://techjacksolutions.com/?p=89516)

### Inferences
These are design suggestions synthesized from the sourced principles above. None comes from a published example.

- **Context window:** use a fixed-width horizontal bar (one "tray") that fills with small token blocks colour-coded by source: system prompt, rules/AGENTS.md, tool definitions, conversation, file reads. Show the pre-filled overhead before the "user" types, which follows the sourced 30–40K overhead point. As it nears the limit, older blocks compress or slide out (compaction). Following the "never invent numbers" rule, label the bar with real sizes for the model actually used in Devin.
- **Tokens:** use kinetic typography where a sentence splits into token chips. This reuses "typography must carry the story" and the "emerge from an object already visible" continuity rule, since the chips become the blocks in the context bar.
- **Cache hit vs miss:** show the same prefix blocks in two rows. On a miss, every block is re-processed (each block lights up sequentially, with a slow progressive ease). On a hit, the cached prefix flashes once and only the new suffix is processed. A price counter ticks at the real per-MTok rates ($4 vs $0.20 for Opus 5.5 if that model is used).
- **Effort:** use a dial or slider (Low → Max) that lengthens a "thinking" trail and a time/cost meter. Keep the one-accent-color rule.
- **Rules / AGENTS.md and skills:** rules show as a file always loaded into the bottom of the context bar. Skills show as cards whose short description sits in context while the full body loads only when invoked (progressive disclosure). Devin's actual loading semantics need separate verification.
- **Subagents:** a main-agent node spawns two or three child nodes. Each child gets its own empty context bar and fills it with exploration. Only a small "summary" chip travels back to the main bar. This mirrors the sourced "separate window, summary returned" behavior and visualizes why subagents protect main-context space but multiply total token cost.
- **Prezi-style structure:** put all zones on one large canvas, using Prezi's own model of frames as zoom targets, an ordered path and overview zoom-outs ([Prezi support](https://support.prezi.com/hc/en-us/articles/360003498793-Using-zoom)). Implement the camera as a GSAP tween of one world-container transform (ease-in-out for camera, per aiidelist). Give each zone a paused timeline in a central registry (HyperFrames pattern), played on arrival. Keep one tokens file (colors, type, easing, durations) as the single source of truth.

### Gaps
- I found no published example, template or skill specifically animating context windows, KV/prompt caching, effort levels or subagent spawning.
- I found no source for Devin-specific semantics (how Devin handles models, effort, context, cache, AGENTS.md, skills and subagents). Those must come from Devin's own docs, which are out of scope for this note.
- Opus 5.5's context window size is not stated on Anthropic's page and is only secondhand (1M).
