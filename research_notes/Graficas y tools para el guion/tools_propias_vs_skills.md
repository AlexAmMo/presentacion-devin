# Department-built tools in Devin (Local/CLI and Cloud) vs skills: how they're provided, what the agent loads into context, and when to use each (as of 2026-10-14)

All sources were retrieved on 2026-10-14. The Devin pages were fetched as Markdown from `https://docs.devin.ai/<page>.md`, found through `https://docs.devin.ai/llms.txt`, and searched across the full dump `https://docs.devin.ai/llms-full.txt`.

**Evidence labels used on every claim:**
- **[DEVIN-DOC]**: stated in Devin's official documentation, changelog or release notes.
- **[DEVIN-BIN]**: seen in the Devin CLI binary installed on this Mac: `devin 3000.6.14`, released 2026-09-03, at `~/.local/share/devin/cli/_versions/3000.6.14/bin/devin`. I ran `devin --help` and `strings` on the binary and nothing else. This is real evidence of how the harness behaves, but it is not documented, it may change in any release, and the docs changelog already goes up to v3000.11.3 (2026-09-22).
- **[GENERAL]**: from vendor docs about LLM agents in general (Anthropic, OpenAI, the MCP spec, the Agent Skills spec). It is not a claim about Devin.
- **[INFERENCE]**: my own reasoning from the sources cited next to it.

Devin terminology used below:
- **Devin Local** is the default agent in Devin Desktop. It is the same harness as **Devin CLI** [DEVIN-DOC] ([Devin Local](https://docs.devin.ai/desktop/devin-local)).
- **Cascade** is the *legacy* Desktop agent. It has its own MCP config and limits [DEVIN-DOC] ([Cascade MCP](https://docs.devin.ai/desktop/cascade/mcp)).
- **Devin Cloud** is cloud sessions in app.devin.ai.

---

## Key question 1: In Devin, how can a department provide its own tools? How are they configured, shared and given credentials?

### Takeaway
There are four Devin-documented ways for a department to add tools of its own:
1. **An MCP server**, either local (stdio) or remote (Streamable HTTP or SSE).
2. **A plugin** that bundles MCP servers with skills, rules, hooks and subagents. This is the recommended unit for distributing to a team. It is governed by managed manifests at the enterprise, organization, repo and user levels.
3. **Plain CLIs and scripts** the agent runs through its shell tool. In Cloud they are installed via the environment blueprint and authenticated with Devin Secrets. In Local they are simply on the machine, subject to `Exec(...)` permissions.
4. **Scripts bundled inside a skill.**

Native integrations (Slack, Jira, Linear, GitHub…) are Cognition-built and are not a department-authoring path. Knowledge is deprecated and is being migrated to skills in plugins. Credentials should never sit in committed config:
- **Local:** gitignored `*.local.json` files, `${env:VAR}` / `${file:…}` references, or OAuth via `devin mcp login`.
- **Cloud:** Devin Secrets, `${NAME}` references in plugin MCP configs, or OAuth with **Organization** (shared service account) or **Personal** (per-member) access.

### Cited Findings

#### 1.1 The extensibility layers Devin itself defines
- Devin CLI is extended with **rules/AGENTS.md, skills, plugins, custom subagents, MCP servers and hooks**. Per the docs: "Rules … are always active", "Skills give the agent new capabilities it can invoke on demand", "MCP Servers provide entirely new tools the agent can call", and "Hooks run shell commands or LLM prompts at lifecycle events". **[DEVIN-DOC]** — [Extensibility Overview](https://docs.devin.ai/cli/extensibility/index)
- Project configuration lives in `.devin/`. The MCP files are `.devin/mcp_config.json` (shared) and `.devin/mcp_config.local.json` ("Personal MCP servers and secrets (gitignored)"). User-level config is in `~/.config/devin/`. "Files with `.local.` in the name are automatically excluded from git." **[DEVIN-DOC]** — [Extensibility Overview](https://docs.devin.ai/cli/extensibility/index)
- Devin CLI imports MCP servers from other tools, including Claude Code's project `.mcp.json`, `.cursor/mcp.json`, OpenCode and Zed. This is on by default and controlled by `read_config_from`. **[DEVIN-DOC]** — [Configuration Import](https://docs.devin.ai/cli/reference/configuration/read-config-from)
- In Cloud, the integrations overview lists three connection methods:
  - **Native integrations**
  - **Plugins and MCP servers**: "Giving Devin tools to query data and act in external services, with optional skills explaining how to use them"
  - **Secrets Manager**: "API keys and credentials for command-line tools or custom workflows"

  **[DEVIN-DOC]** — [Integrations overview](https://docs.devin.ai/integrations/overview)

#### 1.2 MCP servers in Devin CLI / Devin Local
- **What MCP gives you:** "When you configure an MCP server, its tools become available to the agent just like built-in tools. The agent can discover what tools are available and call them as needed." **[DEVIN-DOC]** — [MCP Overview (CLI)](https://docs.devin.ai/cli/extensibility/mcp/overview)
- **Adding a server:**
  - From the command line: `devin mcp add <name> -- <command> [args…]` for stdio, or `devin mcp add <name> <URL>` for HTTP.
  - The default scope is **local** (`.devin/mcp_config.local.json`, gitignored). `-s project` writes the shared `.devin/mcp_config.json`; `-s user` writes the global file.
  - Other commands: `list/get/remove/login/logout/enable/disable`.

  **[DEVIN-DOC]** — [MCP Configuration](https://docs.devin.ai/cli/extensibility/mcp/configuration)
- **Transports:**
  - stdio: `command`, `args`, `env`.
  - Remote: `url`, `transport` (`http` by default, `sse` for legacy), `headers`, and `oauthClientId`/`oauthClientSecret`/`oauthResource`.
  - HTTP falls back to SSE on non-auth 4xx errors.

  **[DEVIN-DOC]** — [MCP Configuration](https://docs.devin.ai/cli/extensibility/mcp/configuration)
- **The docs' own "custom server" example:** `"my-tools": { "command": "python", "args": ["./scripts/mcp-server.py"], "env": { "DB_URL": … } }`. This is exactly the shape of a department-written server. **[DEVIN-DOC]** — [MCP Configuration](https://docs.devin.ai/cli/extensibility/mcp/configuration)
- **Secrets pattern for teams:**
  - "Define the server in `.devin/mcp_config.json` with placeholder or no env vars"; then "Each team member adds their personal keys in `.devin/mcp_config.local.json`".
  - Secrets can also be referenced as `${env:VAR}` or `${file:/path}` (the docs show this for the OAuth fields).
  - OAuth: run `devin mcp login <server>`. Tokens are stored locally and refreshed automatically. Each MCP client (Windsurf, Claude Code, Devin CLI) authenticates separately.

  **[DEVIN-DOC]** — [MCP Configuration](https://docs.devin.ai/cli/extensibility/mcp/configuration)
- **Naming and permissions:**
  - MCP tools are exposed as `mcp__<server>__<tool>`.
  - They go through the same permission system as built-in tools, with `allow`/`deny`/`ask` at the levels `mcp__server__tool`, `mcp__server__*` and `mcp__*`.
  - "MCP tools default to prompting for approval."

  **[DEVIN-DOC]** — [MCP Overview](https://docs.devin.ai/cli/extensibility/mcp/overview), [Permissions](https://docs.devin.ai/cli/reference/permissions)
- **Devin Local:** "the default configuration of the Devin Local agent prompts for approval before calling any MCP tool". Users can allow one tool or the whole server, for the session or permanently. Enterprise admins can default-allow trusted servers or tools. **[DEVIN-DOC]** — [Devin Local](https://docs.devin.ai/desktop/devin-local)
- **Doc inconsistency to be aware of:**
  - The Devin Local page still lists MCP config in `.devin/config.json` and `~/.config/devin/config.json`.
  - The CLI docs say MCP moved to the dedicated `mcp_config.json` files in v3000.3 (Local 3.6). Old `mcpServers` entries are migrated automatically.

  **[DEVIN-DOC]** — [Devin Local](https://docs.devin.ai/desktop/devin-local), [Config file](https://docs.devin.ai/cli/reference/configuration/config-file)
- **MCP prompts become slash commands:** a server that publishes MCP *prompts* gets them as `/mcp__<server>__<prompt> [args]`. This lets the same server deliver user-triggered procedures as well as tools. **[DEVIN-DOC]** — [MCP Overview](https://docs.devin.ai/cli/extensibility/mcp/overview)
- **Per-tool trimming:** `disabledTools` in the MCP config: "Disabled tools are hidden from the agent and rejected at call time" (CLI changelog v2026.4.24-1). `devin mcp disable <name>` skips the whole server during tool discovery. **[DEVIN-DOC]** — [CLI changelog](https://docs.devin.ai/cli/changelog/stable), [MCP Configuration](https://docs.devin.ai/cli/extensibility/mcp/configuration)
- **Enterprise governance for local agents:**
  - Admins can turn MCP off completely, allowlist servers, or point to one or more **MCP registries** (the official registry or their own) with an **enforcement** toggle.
  - Team permission rules have the "highest precedence and cannot be overridden".
  - At org level, overrides replace lists entirely rather than merging them.

  **[DEVIN-DOC]** — [CLI Team Settings](https://docs.devin.ai/cli/enterprise/team-settings), [Local Agent Controls](https://docs.devin.ai/enterprise/local/controls)

#### 1.3 MCP servers in Devin Cloud
- **Where they live:** MCPs are managed on **Customize → MCPs** at Personal, Organization or Enterprise scope. "The recommended way to add an integration is to install its **plugin** from the plugin marketplace … most official plugins are a single MCP server, often with skills that teach Devin how to use it." **[DEVIN-DOC]** — [MCP servers and marketplace](https://docs.devin.ai/work-with-devin/mcp)
- **Custom department servers:**
  - Created with **Add custom MCP**, which requires the **Manage MCP Servers** permission. Others can use **Suggest MCP Integration**.
  - Supported transports: STDIO (command/args/env, e.g. `npx`, `uvx`, Docker), SSE, or HTTP (URL plus None / Auth Header / OAuth).
  - "Test tools" lists the server's tools for SSE and HTTP servers. STDIO servers can only be tested inside a session.

  **[DEVIN-DOC]** — [MCP servers and marketplace](https://docs.devin.ai/work-with-devin/mcp)
- **Documented patterns that fit a department:** "Connecting to an internal API", "Connecting to a database" (with the advice to use a read-only user), and "Connecting to a custom tool or script — Wrap any CLI tool or script as an MCP server". **[DEVIN-DOC]** — [MCP servers and marketplace](https://docs.devin.ai/work-with-devin/mcp)
- **OAuth access modes:**
  - **Organization**: everyone shares one connection. "We strongly recommend connecting a service account."
  - **Personal**: each member authenticates individually.
  - "Installation and authorization are separate steps."

  **[DEVIN-DOC]** — [MCP servers and marketplace](https://docs.devin.ai/work-with-devin/mcp), [Plugins guide](https://docs.devin.ai/product-guides/plugins)
- **Secrets:** "Pass sensitive values through environment variables … Devin's Secrets feature can manage these values." **[DEVIN-DOC]** — [MCP servers and marketplace](https://docs.devin.ai/work-with-devin/mcp)
- **Execution location:** "MCP tools now run from Devin's servers rather than the session's remote machine" (release notes, 2026-07-31). The troubleshooting section still says STDIO dependencies must be "available in Devin's environment". **[DEVIN-DOC]** — [Release notes 2026](https://docs.devin.ai/release-notes/2026), [MCP servers](https://docs.devin.ai/work-with-devin/mcp)
  - **[INFERENCE]** For an internal (non-public) MCP server, confirm with Cognition what network path Cloud uses. The candidates are a VPN, Outposts, or an allowlist (the troubleshooting section mentions "accessible from the internet (or from Devin's network if using VPN)").
- **Security profiles:** these can restrict Cloud sessions to an **allowlist of MCP servers**. "MCP access is managed independently of the network policy." **[DEVIN-DOC]** — [Security Profiles](https://docs.devin.ai/product-guides/security-profiles)

#### 1.4 Plugins: the unit for sharing tools and skills across a department
- **What a plugin is:**
  - "A **plugin** is a bundle of skills and optional rules, hooks, MCP servers, or custom subagents".
  - It works "across Devin cloud sessions, the Devin CLI, and Devin Desktop".
  - The layout is `.devin-plugin/plugin.json`, `AGENTS.md`, `rules/`, `agents/`, `hooks.json`, `.mcp.json` and `skills/<name>/SKILL.md`.
  - "The plugin is the unit of installation."

  **[DEVIN-DOC]** — [CLI plugins](https://docs.devin.ai/cli/extensibility/plugins/overview)
- **MCP in plugins:**
  - Plugins "can provide optional MCP servers that start with the session".
  - "A plugin MCP config may set an OAuth client ID and scopes, but never a client secret … Reference secrets as `${NAME}`; literal values written into the config are stripped."
  - Claude-format plugins (`.claude-plugin/plugin.json`, root `.mcp.json`) and the Agent Plugins 1.0.0 layout also load. **[DEVIN-DOC]** — [CLI plugins](https://docs.devin.ai/cli/extensibility/plugins/overview)
- **Scopes and sync:** plugins install at Personal, Organization or Enterprise scope. Each scope is backed by a **managed manifest** in Devin Cloud that the CLI and Desktop also read, so "a plugin you install on the web appears on your laptop". **[DEVIN-DOC]** — [Plugins guide](https://docs.devin.ai/product-guides/plugins)
- **Governance:**
  - Policy is expressed with `requiredPlugins` / `optionalPlugins` / `forbiddenPlugins` at the enterprise, org, repo (`.devin/config.json`) and user levels. "Higher authority wins."
  - A full lockdown is `"forbiddenPlugins": ["*"]` plus an allow-list.
  - Governance **fails open** if the managed manifest can't be fetched.

  **[DEVIN-DOC]** — [CLI plugins](https://docs.devin.ai/cli/extensibility/plugins/overview), [Plugin ecosystem](https://docs.devin.ai/product-guides/plugin-ecosystem)
- **Releases:**
  - "Merging to your plugin repo's default branch **is** the release." Plugins can be pinned to a `sha`.
  - Cognition provides template repos ([plugin-template](https://github.com/CognitionAI/plugin-template), [team-marketplace-template](https://github.com/CognitionAI/team-marketplace-template)) with a validator and CI.

  **[DEVIN-DOC]** — [Plugin ecosystem](https://docs.devin.ai/product-guides/plugin-ecosystem), [Quickstart: team marketplace](https://docs.devin.ai/cli/extensibility/plugins/quickstart)
- **Cloud plugin env and secrets:** add `env` to a manifest entry using references such as `secret:org:NAME`, `secret:personal:NAME`, `secret:repo:owner/repo:NAME`. These configure *command hooks*. Plugin MCP configs use `${NAME}` instead, and members fill in the values in the server's details sheet. **[DEVIN-DOC]** — [Plugins guide](https://docs.devin.ai/product-guides/plugins)
- **Limitations:**
  - Plugin **subagents** load only in local agents.
  - Plugin **hooks** are "best effort and fail open".
  - Plugins don't apply to legacy Cascade.

  **[DEVIN-DOC]** — [Plugin ecosystem](https://docs.devin.ai/product-guides/plugin-ecosystem)

#### 1.5 CLIs and scripts run through the shell (no MCP)
- **Cloud environment:** each session boots from a **snapshot** built from a blueprint ("tools installed, dependencies resolved, environment variables set"). Secrets are referenced as `$VARIABLE_NAME` and "injected as environment variables during builds and sessions". **[DEVIN-DOC]** — [Environment setup](https://docs.devin.ai/onboard-devin/environment)
- **How secrets reach commands:**
  - "Devin provides each secret to the specific commands and tools that need it … For shell commands, it binds secrets as environment variables whenever needed."
  - "Secrets are not exported into every shell … tell Devin which environment variable it reads and Devin will bind it."
  - Secret scopes: organization, personal, repo (blueprint) and session.

  **[DEVIN-DOC]** — [Secrets](https://docs.devin.ai/product-guides/secrets)
- **A real Devin-documented example of the three paths:** the MongoDB guide offers
  - (A) **CLI in a blueprint**: `mongosh` / Atlas CLI with secrets.
  - (B) a **custom STDIO MCP server** with `--readOnly --indexCheck` guardrails.
  - (C) a **marketplace plugin**: a hosted MCP plus MongoDB's agent skills, with OAuth.

  Its key line: "Authentication says who Devin is; database and Atlas roles say what it can touch. MCP flags and knowledge instructions are conveniences on top, not the boundary." **[DEVIN-DOC]** — [Connect Devin to MongoDB](https://docs.devin.ai/integrations/mongodb)
- **Local agent:** shell commands run through the `exec` tool under `Exec(cmd)` permission rules. An optional OS sandbox and enterprise team rules also apply. **[DEVIN-DOC]** — [Permissions](https://docs.devin.ai/cli/reference/permissions), [CLI Team Settings](https://docs.devin.ai/cli/enterprise/team-settings)
- **Scripts inside skills:** Desktop describes skills as bundling "SKILL.md instructions with scripts and templates". Devin Local describes skills as "model-invoked bundles of instructions (and optional scripts)". **[DEVIN-DOC]** — [Cascade Skills](https://docs.devin.ai/desktop/cascade/skills), [Devin Local](https://docs.devin.ai/desktop/devin-local)

#### 1.6 Related Cloud features that are *not* tools
- **Knowledge** "is deprecated and will be removed … Existing Knowledge is being migrated to Skills in Plugins automatically." **[DEVIN-DOC]** — [Knowledge Onboarding](https://docs.devin.ai/onboard-devin/knowledge-onboarding)
- **Playbooks** are "shareable, reusable prompts" that are attached manually to a session. The docs advise: "Most best practices, style guides, or other project-specific instructions should be shared with Devin by using Skills." **[DEVIN-DOC]** — [Creating Playbooks](https://docs.devin.ai/product-guides/creating-playbooks), [Skills](https://docs.devin.ai/product-guides/skills)
- **Built-in Devin MCP:** sessions have Devin's own management tools through it (child sessions, playbooks, schedules). Security profiles can make it read-only. **[DEVIN-DOC]** — [Security Profiles](https://docs.devin.ai/product-guides/security-profiles)

---

## Key question 2: What does the agent load into context so it can use a tool "when it recognises a need"? Up front or deferred? Limits? What comes back?

### Takeaway
**General mechanism [GENERAL]:**
- With classic tool calling, every tool's **name + description + input JSON schema** is serialized into the system prompt on **every** request. They count as input tokens; prompt caching reduces the price but not the context used.
- The model decides to call a tool by matching the user's request against the **descriptions**.
- When it calls one, the client executes it, and only the **call (arguments) and the result** enter the conversation. The tool's code never does.
- Vendors now offer **deferred loading / tool search**: only a search tool plus a few core tools load up front, and the rest are fetched on demand. They recommend this above roughly 10 tools or about 10k tokens of definitions.

**Devin specifically:**
- The *prose* docs do not describe how MCP tool definitions are placed in context. They say only that the agent "discovers what tools the server provides" and calls them.
- **Devin's documentation does list** four **MCP management tools** in the core toolset: `mcp_list_servers`, `mcp_list_tools`, `mcp_call_tool`, `mcp_read_resource`.
- The changelog says `mcp_list_tools` now returns each tool's `input_schema` "so the agent can discover parameter requirements without needing to trigger a tool call error first".
- The CLI binary (3000.6.14) contains a system-prompt section "## Available MCP Servers (for third-party tools)" with the instruction "You MUST call `mcp_list_tools` for a server before calling `mcp_call_tool` on it … Never guess tool names or arguments".

**[INFERENCE, strong]** Devin Local and the CLI use a **gateway / on-demand discovery pattern**:
- Up front, the model sees the **list of connected MCP servers** plus four generic meta-tools.
- A server's tool names, descriptions and schemas enter context only when the agent calls `mcp_list_tools` for that server. They arrive as a tool result and then stay in the conversation history.
- The actual call goes through `mcp_call_tool`, and its result is returned "as structured data".

The binary also contains code for provider-hosted **tool search** (Anthropic's `regex`/`bm25` variants, `defer_loading`). Whether and when Devin uses it is undocumented.

For **Devin Cloud**, how tool definitions reach context is **not documented**. For legacy **Cascade**, the documented cap is **100 tools** at any time.

### Cited Findings

#### 2.1 General mechanism (vendor docs)
- **Anthropic: the tool-use system prompt.** "When you call the Claude API with the `tools` parameter, the API constructs a special system prompt from the tool definitions…", which contains "Here are the functions available in JSONSchema format: {{ TOOL DEFINITIONS IN JSON SCHEMA }}". **[GENERAL]** — [Define tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools)
- **Anthropic: pricing.** Requests are priced on input tokens "including in the `tools` parameter". The extra tokens come from "The `tools` parameter in API requests (tool names, descriptions, and schemas)", "`tool_use` content blocks" and "`tool_result` content blocks". On top of that is a fixed tool-use system prompt of about 286 to 675 tokens, depending on the model. **[GENERAL]** — [Tool use overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
- **Anthropic: how the model decides.** "With the default `tool_choice` of `auto`, Claude determines on each turn whether to call a tool … It calls a tool when the request maps to that tool's described capability and the answer isn't already in context." **[GENERAL]** — [Tool use overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
- **Anthropic: what the model sees.** "Claude never sees your implementation; it only sees the schema you provided and the result you returned." **[GENERAL]** — [How tool use works](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works)
- **OpenAI says the same.** "Under the hood, functions are injected into the system message … callable function definitions count against the model's context limit and are billed as input tokens." Guidance: "Aim for fewer than 20 functions available at the start of a turn", and "Use tool search to defer large or infrequently used parts of your tool surface". **[GENERAL]** — [OpenAI function calling](https://developers.openai.com/api/docs/guides/function-calling)
- **MCP spec: what a server advertises.**
  - Through `tools/list`, each tool has `name`, optional `title`, `description`, `inputSchema`, optional `outputSchema` and optional `annotations`.
  - Results come back as `content` (unstructured) and/or `structuredContent`, with `isError` for failures.
  - Tools are "model-controlled", resources are "application"-controlled, and prompts are "user"-controlled.
  - "There SHOULD always be a human in the loop with the ability to deny tool invocations."

  **[GENERAL]** — [MCP spec: Tools (2026-07-28)](https://modelcontextprotocol.io/specification/2026-07-28/server/tools), [Understanding MCP servers](https://modelcontextprotocol.io/docs/learn/server-concepts)
- **The cost of loading everything up front:**
  - "Most MCP clients load all tool definitions upfront directly into context."
  - "Every intermediate result must pass through the model."
  - In Anthropic's example, code execution cut usage from 150,000 to 2,000 tokens.

  **[GENERAL]** — [Code execution with MCP (Anthropic, 2025-11-04)](https://www.anthropic.com/engineering/code-execution-with-mcp)
- **The scale problem:**
  - "58 tools consuming approximately 55K tokens before the conversation even starts". "At Anthropic, we've seen tool definitions consume 134K tokens before optimization."
  - "The most common failures are wrong tool selection and incorrect parameters", especially with similar names.

  **[GENERAL]** — [Advanced tool use (Anthropic, 2025-11-24)](https://www.anthropic.com/engineering/advanced-tool-use)
- **Tool search / deferred loading:**
  - "Instead of loading all tool definitions into the context window up front, Claude searches your tool catalog … and loads only the tools it needs."
  - It typically cuts definition tokens by over 85%.
  - "Claude's ability to pick the right tool degrades once you exceed 30–50 available tools."
  - Use it when there are "10 or more tools", "more than 10k tokens", or "multiple MCP servers (200+ tools)". Keep the "3–5 most frequently used tools non-deferred".
  - Tools loaded through search "count as input tokens like any other tool definition".

  **[GENERAL]** — [Tool search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool)
- **A contrasting agent, Claude Code:** "Only tool names and server instructions load at session start". MCP tool output is limited to 25,000 tokens by default, with a warning above 10,000. This shows what one agent does; it says nothing about Devin. **[GENERAL]** — [Claude Code MCP docs](https://code.claude.com/docs/en/mcp)

#### 2.2 What Devin documents
- **CLI flow:** "Configure a server → Server launches → **Tool discovery**: The agent discovers what tools the server provides (e.g., `create_issue`, `list_repos`) → **Tool execution** … the request flows through the server to the external service and the result is returned." **[DEVIN-DOC]** — [MCP Overview (CLI)](https://docs.devin.ai/cli/extensibility/mcp/overview)
- **The core tool names list** includes "MCP management | `mcp_list_servers`, `mcp_list_tools`, `mcp_call_tool`, `mcp_read_resource`". It also says "MCP server tools appear as `mcp__<server>__<tool>`", which is the name hooks and permissions match on. **[DEVIN-DOC]** — [Lifecycle Hooks](https://docs.devin.ai/cli/extensibility/hooks/lifecycle-hooks)
- **Changelog v2026.3.16-0:** "`mcp_list_tools` now includes the `input_schema` for each tool, so the agent can discover parameter requirements without needing to trigger a tool call error first." **[DEVIN-DOC]** — [CLI changelog](https://docs.devin.ai/cli/changelog/stable)
- **Troubleshooting "Tools not appearing":** "Ask the agent to list MCP servers and tools." **[DEVIN-DOC]** — [MCP Configuration](https://docs.devin.ai/cli/extensibility/mcp/configuration)
- **Plan mode (changelog v3000.3.22):** "now allows read-only MCP tools (those annotated `readOnlyHint: true`) plus listing MCP servers, tools, and resources." **[DEVIN-DOC]** — [CLI changelog](https://docs.devin.ai/cli/changelog/stable)
- **Legacy Cascade:** "Cascade has a limit of 100 total tools that it has access to at any given time." Individual tools can be disabled with `disabledTools`. **[DEVIN-DOC]** — [Cascade MCP](https://docs.devin.ai/desktop/cascade/mcp)
- **No equivalent limit is documented** for Devin Local, the CLI or Cloud. **[DEVIN-DOC, absence]** I searched the full llms-full.txt for "tool search", "defer", "number of tools" and "limit".
- **Devin Local** "is significantly more token-efficient, with a greater focus on prompt caching. Most tasks take up to 30% fewer tokens than Cascade". **[DEVIN-DOC]** — [Devin Local](https://docs.devin.ai/desktop/devin-local)
- **Context visibility:** `/context` shows context-window usage and `/session-stats` shows token usage in the CLI. **[DEVIN-DOC]** — [Commands](https://docs.devin.ai/cli/reference/commands)
- **Hooks:** `PreToolUse` hooks can block, rewrite (`updatedInput`) or add context. They receive a `tool_provenance` object "identifying the skill or MCP server behind the call" (v3000.10.21). `PostToolUse` can inject `additionalContext`. **[DEVIN-DOC]** — [Hooks](https://docs.devin.ai/cli/extensibility/hooks/overview), [CLI changelog](https://docs.devin.ai/cli/changelog/stable)

#### 2.3 What the installed Devin CLI binary shows (v3000.6.14)
- A system-prompt fragment: "## Available MCP Servers (for third-party tools) — IMPORTANT: You MUST call `mcp_list_tools` for a server before calling `mcp_call_tool` on it. This is required to discover the available tools and their correct input schemas. Never guess tool names or arguments … always list tools first." **[DEVIN-BIN]**
- **Meta-tool descriptions:**
  - `mcp_list_tools`: "List available tools and resources from MCP servers. Use this to discover what capabilities are available before calling mcp_call_tool."
  - `mcp_call_tool`: "Execute a tool on an MCP server. Use this to interact with external services like Linear, GitHub, Slack, databases, and more. The tool result will be returned as structured data."
  - `mcp_read_resource`: "Read a resource from an MCP server…"
  - An error string: "… Use mcp_list_tools to see available tools."

  **[DEVIN-BIN]**
- **Tool search support code:** `toolbox/src/tools/tool_search.rs`, `HostedToolSearchConfig` with `anthropic_variant` (`regex`/`bm25`), `defer_loading`, `ToolSearchResult` / `loaded_tool_names`. **[DEVIN-BIN]** The harness has support for provider tool search with deferred tools. Nothing documented says which tools are deferred, or when.

#### 2.4 What this means for the talk [INFERENCE]
- **In Devin Local and the CLI**, a department MCP server costs very little context at startup: roughly its name and any server-level text, plus the four meta-tool definitions shared by all servers. The *server's* identity and purpose are what the model first matches against the user's need.
- **Discovery:** once the agent decides the server is relevant, it calls `mcp_list_tools(server)`. All of that server's tool names, descriptions and schemas then enter context as a tool result and stay there until compaction.
  - **Consequence 1:** a server with dozens of verbose tools is expensive the first time it is listed.
  - **Consequence 2:** small, well-scoped servers beat one giant "department" server.
- **Results:** only the arguments and the result of `mcp_call_tool` enter context. The code, credentials and network calls stay in the server process. The size of the result is the server author's responsibility; Devin's per-result cap is not documented.
- **In Devin Cloud**, the mechanism isn't documented. The safe statement for the talk is: "the agent sees what each tool does through its name and description, and decides by matching them against the task". Avoid claiming that Cloud loads everything up front, or that it defers.
- **Caveat:** these internals come from a September 2026 binary and may change. Present it as "how it works today in the Devin CLI, according to its own prompts", not as a contractual feature.

---

## Key question 3: Skills in Devin. What loads up front, what loads on invocation, and how are they triggered?

### Takeaway
- **Up front:** the agent sees the **name + description** of each available skill. This is verified for Cloud ("At the start of every session, Devin sees a list of all available skills (name + description)") and for Desktop/Cascade (progressive disclosure). For the CLI, the changelog strongly implies it: the skill list costs tokens at session start and can be re-listed after compaction.
- **On invocation:** the **full body of `SKILL.md`** is injected. Supporting files and scripts are read or run only when needed.
- **Triggers:**
  - `triggers: [user, model]` by default. Set `[user]` to stop the agent auto-invoking a skill.
  - Users invoke with `/skill-name` (CLI and Local), `/<plugin>:<skill>` for plugin skills, `@skills:name` (Cloud), or `@skill-name` (Cascade).
  - The agent auto-invokes "when relevant", which depends on the `description`.
- **Cloud limits:** "Devin can only have one skill active at a time." Cloud also documents `$ARGUMENTS` / `$1…$9` and `` !`command` `` for live context.

### Cited Findings
- **Cloud, up front and on invocation:** "At the start of every session, Devin sees a list of all available skills (name + description). When a skill is **invoked**, Devin reads the full `SKILL.md` file and injects its body into its current context as a system-level instruction." **[DEVIN-DOC]** — [Devin Skills](https://docs.devin.ai/product-guides/skills)
- **Cloud discovery and placement:**
  - Skills are discovered from indexed repos and cloned repos in `.agents/skills/` (recommended), `.devin/skills/`, `.github/skills/`, `.claude/skills/`, `.cognition/skills/` and `.windsurf/skills/`.
  - They can also come from plugins at Personal, Organization or Enterprise scope.
  - "Devin can search for skills by keyword or directory if it needs to find the right one mid-session."

  **[DEVIN-DOC]** — [Devin Skills](https://docs.devin.ai/product-guides/skills)
- **Cloud triggering and limits:**
  - "When Devin determines a skill is relevant to the current task, it invokes it automatically."
  - `@skills:skill-name` invokes a skill explicitly.
  - "Devin can only have one skill active at a time. Invoking a new skill replaces the previous one."
  - Cloud's `allowed-tools` "Restricts which tools Devin can use while the skill is active". This is stated differently in the CLI docs, below.

  **[DEVIN-DOC]** — [Devin Skills](https://docs.devin.ai/product-guides/skills)
- **Desktop / Cascade progressive disclosure:**
  - "only the skill's `name` and `description` are shown to the model by default. The full `SKILL.md` content and supporting files are loaded **only when Cascade decides to invoke the skill**."
  - Skills are "In system prompt? No — only name + description until invoked".
  - Rules are always-on, glob-based, or model-decided.

  **[DEVIN-DOC]** — [Cascade Skills](https://docs.devin.ai/desktop/cascade/skills)
- **Devin Local** "uses the Devin CLI skills format and discovery". **[DEVIN-DOC]** — [Cascade Skills](https://docs.devin.ai/desktop/cascade/skills), [Devin Local](https://docs.devin.ai/desktop/devin-local)
- **CLI invocation:**
  - Users invoke with `/skill-name`; "The agent can invoke skills on its own when relevant."
  - On invocation: "The skill's prompt is injected into the conversation". Tools listed in `allowed-tools` are auto-approved, the skill's `permissions` apply, and the `model` override is used.
  - The CLI warns: "`allowed-tools` is **not** a restriction". Use `permissions.deny` to block tools.

  **[DEVIN-DOC]** — [Skills Overview (CLI)](https://docs.devin.ai/cli/extensibility/skills/overview), [Creating Skills](https://docs.devin.ai/cli/extensibility/skills/creating-skills)
- **CLI frontmatter:** `name`, `description` ("Shown in slash command completions"), `argument-hint`, `model`, `subagent`, `agent`, `allowed-tools`, `permissions`, `triggers`. With `subagent: true`, the skill runs in its own context window and only the subagent's result returns to the parent. **[DEVIN-DOC]** — [Creating Skills](https://docs.devin.ai/cli/extensibility/skills/creating-skills)
- **CLI internals from the changelog** (the skill is invoked through a `skill` tool, also listed in the hooks tool-name table):
  - "Invoking a skill passes the whole `SKILL.md` to the model instead of truncating it to the tool-result budget" (v3000.5.20).
  - "Skills discovered mid-session are listed again after context compaction" (v3000.5.20).
  - "skills dropped from context by compaction are discovered again when the agent next touches their trigger paths" (v3000.10.21).
  - "Skill discovery no longer picks up duplicate skills … reducing token usage at session start" (v2026.4.30-0).
  - "`skill search` can find model-invocable skills recursively … and filter them by keywords" (v2026.5.5-0).

  **[DEVIN-DOC]** — [CLI changelog](https://docs.devin.ai/cli/changelog/stable), [Lifecycle Hooks](https://docs.devin.ai/cli/extensibility/hooks/lifecycle-hooks)
- **CLI help** (v3000.6.14): "`skills` — Manage agent skills (slash commands and agent-triggered context blobs)" and "`rules` — Manage agent rules (always-on context blobs)". **[DEVIN-BIN]** (output of `devin --help`)
- **Rules vs skills on context cost:**
  - "we highly recommend **using Skills instead whenever possible**. Skills are only injected into the context when relevant. **Rules and AGENTS should be kept as small as possible.** Our recommended pattern is to use a rule to reference skills."
  - Cloud auto-includes "up to 16 KiB" of each always-on `AGENTS.md` or rule file.
  - "Keep `AGENTS.md` short — it costs context in every session for everyone who has the plugin."

  **[DEVIN-DOC]** — [Rules & AGENTS.md](https://docs.devin.ai/cli/extensibility/rules), [AGENTS.md](https://docs.devin.ai/onboard-devin/agents-md), [Plugin ecosystem](https://docs.devin.ai/product-guides/plugin-ecosystem)
- **General standard behind it:**
  - Agent Skills progressive disclosure has three levels: metadata of about 100 tokens, loaded at startup for all skills; instructions under 5,000 tokens, loaded on activation; resources loaded as needed. "Keep your main `SKILL.md` under 500 lines."
  - Anthropic: "Scripts run through bash, and only their output enters context."
  - OpenAI Codex: "start with each skill's name and description, then load the full `SKILL.md`". The initial list is capped at 2% of the context window by default.

  **[GENERAL]** — [Agent Skills specification](https://agentskills.io/specification), [Agent Skills overview (Anthropic)](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview), [Codex skills](https://developers.openai.com/codex/skills)

---

## Key question 4: Custom tool (MCP) vs skill for a department. Pros, cons, when to choose each, and how to combine them

### Takeaway
Use a **tool (MCP server)** when the agent must **act on, or read from, an internal system**. That covers:
- deterministic code
- typed inputs and outputs
- credentials the agent shouldn't hold
- per-tool permissions
- only the result entering context
- reuse across agents and clients

Use a **skill** when the agent needs **know-how**. That covers:
- a procedure or checklist
- conventions
- *how and when* to use tools, including your MCP tools
- with no infrastructure, written in Markdown, versioned with the repo

They are complementary. Devin's own marketplace pattern is "**a plugin = one MCP server + skills that teach Devin how to use it**". The MongoDB guide shows both side by side. Short version: **MCP for connectivity and action, skills for procedure, plugin for distribution**.

### Comparison table
The labels in each cell show where each point comes from.

| Dimension | Custom tool (MCP server) | Skill (`SKILL.md`) |
|---|---|---|
| What it gives the agent | A new capability: an action or data access through code you wrote [DEVIN-DOC: "MCP Servers provide entirely new tools the agent can call"](https://docs.devin.ai/cli/extensibility/index) | Instructions and know-how, optionally with scripts and templates [DEVIN-DOC](https://docs.devin.ai/product-guides/skills) |
| Determinism | High: your code runs and the model only fills in arguments [GENERAL](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works) | Low to medium: the model follows prose; bundled scripts add determinism [GENERAL](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) |
| Inputs/outputs | Typed `inputSchema` / `outputSchema` / `structuredContent` [GENERAL](https://modelcontextprotocol.io/specification/2026-07-28/server/tools) | Free text; arguments via `$ARGUMENTS`, `$1…` [DEVIN-DOC](https://docs.devin.ai/product-guides/skills) |
| Credentials | Live in the server's env or headers, OAuth, or Devin Secrets; Org service account or per-member access [DEVIN-DOC](https://docs.devin.ai/work-with-devin/mcp) | Whatever the agent's shell has (secrets bound as env vars) [DEVIN-DOC](https://docs.devin.ai/product-guides/secrets) |
| Permissions / governance | Per-tool `allow/ask/deny` (`mcp__srv__tool`), enterprise allowlist or registry, security-profile MCP allowlist, `PreToolUse` hooks with provenance [DEVIN-DOC](https://docs.devin.ai/cli/reference/permissions) | Skill-scoped `permissions`; plugin governance; `triggers: [user]` [DEVIN-DOC](https://docs.devin.ai/cli/extensibility/skills/creating-skills) |
| Context cost | **Devin Local/CLI:** a server list up front, then the tool list when the agent lists that server, then only call and result [DEVIN-DOC + DEVIN-BIN + INFERENCE]. **Classic clients:** every definition on every request [GENERAL](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) | About 100 tokens of name and description up front; the full body (under ~5k tokens recommended) on invocation [DEVIN-DOC](https://docs.devin.ai/product-guides/skills) / [GENERAL](https://agentskills.io/specification) |
| What enters context during use | Only the arguments and the result. Large intermediate data stays out if the tool aggregates it [GENERAL](https://www.anthropic.com/engineering/code-execution-with-mcp) | The whole procedure text, plus every command output the agent runs while following it [INFERENCE] |
| Reuse | Any MCP client (Devin Cloud/CLI/Desktop, other agents and IDEs) [GENERAL](https://modelcontextprotocol.io/docs/learn/server-concepts) | Agent Skills standard; same files in Devin, Claude, Codex, Copilot… [DEVIN-DOC](https://docs.devin.ai/product-guides/skills) |
| Testing / versioning | A normal software artifact: unit tests, CI, pinned versions; Cloud has "Test tools" [DEVIN-DOC](https://docs.devin.ai/work-with-devin/mcp) | Versioned in git; test by invoking `/skill-name` and iterating [DEVIN-DOC](https://docs.devin.ai/cli/extensibility/skills/creating-skills) |
| Infrastructure | A process or service to build, host, secure, and keep reachable from Cloud [DEVIN-DOC](https://docs.devin.ai/work-with-devin/mcp) | None: a Markdown file in a repo or plugin [DEVIN-DOC](https://docs.devin.ai/product-guides/skills) |
| Who can write it | Developers (code, protocol, auth) [INFERENCE] | Anyone who can write a clear procedure; Devin even suggests skills itself [DEVIN-DOC](https://docs.devin.ai/product-guides/skills) |
| Orchestration | One operation per tool (or a consolidated "action" tool) [GENERAL](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools) | Can sequence several tools, skills or subagents ("orchestrator" skills in the CLI) [DEVIN-DOC](https://docs.devin.ai/cli/extensibility/skills/creating-skills) |
| Failure mode | Wrong tool chosen, or wrong arguments, with similar names or vague descriptions [GENERAL](https://www.anthropic.com/engineering/advanced-tool-use) | Not triggered (vague description), or steps skipped or interpreted loosely [INFERENCE] |

### Cited Findings
- **How Anthropic frames it:**
  - "MCP connects Claude to data; Skills teach Claude what to do with that data." "MCP for connectivity, Skills for procedural knowledge."
  - "If you need Claude to access the database or Excel files in the first place, that's MCP."

  **[GENERAL]** — [Skills explained (Claude blog, 2026-03-05)](https://claude.com/blog/skills-explained)
- **Why code beats prose for some jobs:**
  - Skills "can also include code for Claude to execute as tools at its discretion".
  - "sorting a list via token generation is far more expensive than simply running a sorting algorithm".
  - "many applications require the deterministic reliability that only code can provide."
  - Anthropic also planned for skills to "complement Model Context Protocol (MCP) servers by teaching agents more complex workflows that involve external tools".

  **[GENERAL]** — [Equipping agents for the real world with Agent Skills (2025-10-16)](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- **When tools fit:** "Actions with side effects", "Fresh or external data", "Structured, guaranteed-shape outputs", "Calling into existing systems". Tools don't fit when "The model can answer from training alone". **[GENERAL]** — [How tool use works](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works)
- **Devin's marketplace combines them:** "most official plugins are a single MCP server, often with skills that teach Devin how to use it". **[DEVIN-DOC]** — [MCP servers and marketplace](https://docs.devin.ai/work-with-devin/mcp)
- **A skill can pre-approve your MCP tools:** `allowed-tools: [read, mcp__github__list_issues, mcp__github__create_issue]` auto-approves those MCP tools while the skill runs. This is the concrete Devin mechanism for "a skill that tells the agent how to use the department's MCP tools". **[DEVIN-DOC]** — [Creating Skills](https://docs.devin.ai/cli/extensibility/skills/creating-skills)
- **A rule can point to skills:** "Our recommended pattern is to use a rule to reference skills that the model should use in particular scenarios." **[DEVIN-DOC]** — [Rules & AGENTS.md](https://docs.devin.ai/cli/extensibility/rules)
- **The MongoDB guide gives all three options:**
  - "Option A: CLI in a blueprint — Work Devin runs and repeats in a repo… Start here."
  - "Option B: MongoDB MCP server — Schema discovery and query/index analysis as tools, with `--readOnly` and `--indexCheck` guardrails… Adds to Option A."
  - "Option C: MongoDB Atlas plugin — … without storing a MongoDB credential in the session" (OAuth MCP plus MongoDB's agent skills).
  - "MCP flags and knowledge instructions are conveniences on top, not the boundary." The real boundary is the identity and roles.

  **[DEVIN-DOC]** — [Connect Devin to MongoDB](https://docs.devin.ai/integrations/mongodb)
- **Plan mode benefit:** read-only MCP tools (`readOnlyHint: true`) are allowed in Plan mode. A department can mark its query tools read-only so the agent can use them while planning. **[DEVIN-DOC]** — [CLI changelog v3000.3.22](https://docs.devin.ai/cli/changelog/stable)
- **Cloud skills vs playbooks:** skills live in the repo and are triggered automatically or by `@skills:`. Playbooks live in the web app and are attached manually. **[DEVIN-DOC]** — [Devin Skills](https://docs.devin.ai/product-guides/skills)
- **Security of skills:** "Third-party skills can execute arbitrary code, so install them at your own risk." **[DEVIN-DOC]** — [Skills Overview (CLI)](https://docs.devin.ai/cli/extensibility/skills/overview). Before a plugin is first installed, Devin shows a security notice. **[DEVIN-DOC]** — [Plugins guide](https://docs.devin.ai/product-guides/plugins)

### When to choose which [INFERENCE, grounded in the sources above]
- **Choose an MCP tool** when any of these apply:
  - it touches an internal system (API, database, ticketing, deploy) that needs credentials, auditing or per-action approval;
  - the output must be structured;
  - the logic must be exact, every time;
  - the raw data is large and you want only a summary or aggregate to reach the model;
  - you want the same capability in several agents or IDEs.
- **Choose a skill** when any of these apply:
  - it's a procedure (release checklist, review rubric, how to run our tests);
  - it's a convention, or "how we use tool X";
  - it changes often and non-developers should be able to edit it;
  - existing tools (shell, git, existing MCPs) are already enough to do the job.
- **Start with a skill plus a CLI or script** if the department already has a CLI. Promote it to an MCP server when you need typed I/O, server-side credentials, per-tool permissions, or reuse outside Devin. The MongoDB guide's order (A, then B, then C) mirrors this.
- **Ship both in a plugin** for the department: `.mcp.json` with the server, `skills/` with "how and when to use it", and a short `AGENTS.md` that points to the skills. Distribute through the org or enterprise manifest, and pin a `sha` if needed.

---

## Key question 5: Best practices for naming and describing tools so the agent knows when to use them, and keeping the set small

### Takeaway
The description is the trigger. Describe each tool:
- **what it does**
- **when to use it (and when not to)**
- **what each parameter means**
- **what it returns**

Aim for 3–4+ sentences. Use unambiguous, **namespaced** names. Consolidate related operations, return only high-signal data, and paginate or truncate big outputs. Keep the active set small: under 20 tools (OpenAI's soft guide), with accuracy dropping beyond 30–50 tools (Anthropic). Above that, use deferred loading or tool search.

In Devin, also:
- give each **server** a clear name and purpose, because the agent picks a server first (DEVIN-BIN);
- prune with `disabledTools` or `devin mcp disable`;
- add `readOnlyHint` annotations;
- write a skill that says when to use the server.

### Cited Findings
- **Anthropic, "Best practices for tool definitions":**
  - "Provide extremely detailed descriptions. This is by far the most important factor in tool performance."
  - Cover: what it does; "When it should be used (and when it shouldn't)"; parameters; caveats. "Aim for at least 3–4 sentences per tool description."
  - "Consolidate related operations into fewer tools". "Use meaningful namespacing in tool names" (e.g. `github_list_prs`).
  - "Design tool responses to return only high-signal information."
  - Use `input_examples` for complex inputs.

  **[GENERAL]** — [Define tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools)
- **Anthropic, "Writing effective tools for agents" (2025-09-11):**
  - Don't just wrap every API endpoint. "More tools don't always lead to better outcomes."
  - Namespacing "can help delineate boundaries".
  - Use a `response_format` "concise/detailed" option; "pagination, range selection, filtering, and/or truncation". "For Claude Code, we restrict tool responses to 25,000 tokens by default."
  - Describe tools as "to a new hire"; "instead of a parameter named `user`, try … `user_id`".
  - Build evals.

  **[GENERAL]** — [Writing tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents)
- **Anthropic, "Effective context engineering" (2025-09-29):**
  - "bloated tool sets that cover too much functionality" lead to "ambiguous decision points".
  - "If a human engineer can't definitively say which tool should be used in a given situation, an AI agent can't be expected to do better."
  - Curate "a minimal viable set of tools".

  **[GENERAL]** — [Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- **Tool search optimization tips:**
  - Use consistent prefixes "so one search matches the whole group".
  - "Use keywords in descriptions that match how users describe tasks."
  - "Add a system prompt section describing available tool categories."

  **[GENERAL]** — [Tool search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool)
- **OpenAI:**
  - "Explicitly describe the purpose of the function and each parameter".
  - "Use the system prompt to describe when (and when not) to use each function".
  - "Use enums". "Pass the intern test". "Combine functions that are always called in sequence".
  - "Aim for fewer than 20 functions available at the start of a turn".

  **[GENERAL]** — [OpenAI function calling](https://developers.openai.com/api/docs/guides/function-calling)
- **MCP spec on tool names:**
  - 1–128 characters, case-sensitive, using only `A-Z a-z 0-9 _ - .`, unique within a server.
  - Clients SHOULD disambiguate collisions across servers, e.g. by prefixing with the server name. Devin does this: `mcp__<server>__<tool>`.

  **[GENERAL]** — [MCP spec: Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools); **[DEVIN-DOC]** — [MCP Overview](https://docs.devin.ai/cli/extensibility/mcp/overview)
- **Devin-specific pruning levers:**
  - `disabledTools` ("hidden from the agent and rejected at call time")
  - `devin mcp disable`
  - org allowlists and registries
  - security profile MCP allowlists in Cloud
  - Cascade's 100-tool cap

  **[DEVIN-DOC]** — [CLI changelog](https://docs.devin.ai/cli/changelog/stable), [MCP Configuration](https://docs.devin.ai/cli/extensibility/mcp/configuration), [CLI Team Settings](https://docs.devin.ai/cli/enterprise/team-settings), [Security Profiles](https://docs.devin.ai/product-guides/security-profiles), [Cascade MCP](https://docs.devin.ai/desktop/cascade/mcp)
- **Skill descriptions:** "Write descriptions that clearly explain what the skill does and when it should be used"; "`deploy-to-staging` is better than `deploy1`". The Agent Skills spec caps `description` at 1024 characters and asks it to say "what the skill does and when to use it". **[DEVIN-DOC]** — [Cascade Skills](https://docs.devin.ai/desktop/cascade/skills); **[GENERAL]** — [Agent Skills spec](https://agentskills.io/specification)
- **[INFERENCE] Devin-specific advice from the gateway pattern (2.3):**
  - **Name** the server by domain (`facturacion`, `inventario-interno`), not `tools` or `api`.
  - Make the server's own description or instructions say which tasks it covers. The model decides to list a server's tools from what it sees about the server.
  - Keep each server's tool count modest and descriptions tight. The *whole* list arrives the first time the agent lists the server.

---

## Open points / not verified
- **Cloud context mechanism:** how Devin Cloud puts MCP tool definitions into context (up front, deferred or gateway) is not documented. Ask Cognition if the talk needs it.
- **Per-call result cap:** whether Devin truncates large MCP results, and at what size, is not documented. Claude Code's 25k-token default is only an analogy.
- **Server descriptions:** whether the Cloud "Short Description" of a custom MCP, or the server's MCP `instructions`, is shown to the model is unknown. [INFERENCE] Probably the latter, but it is unverified.
- **Conflicting docs:**
  - Cloud skills page: `allowed-tools` "restricts". CLI page: `allowed-tools` "is not a restriction". Both are [DEVIN-DOC].
  - The Devin Local page's MCP file paths are outdated versus the CLI docs.
- **Binary findings are from v3000.6.14.** Re-check on the current version (`devin update`) before stating them on stage.

## Suggested lines for the slides (ES) [INFERENCE: wording, grounded in the sources above]
- «Una *tool* le da al agente **manos**: ejecuta código nuestro, con nuestras credenciales y permisos, y al contexto solo vuelve el resultado.»
- «Una *skill* le da al agente **oficio**: le explica cómo y cuándo hacer algo, incluido cuándo usar nuestras tools.»
- «El agente no ve el código de la tool: ve su **nombre y su descripción**, y por ahí decide si la necesita. La descripción es el disparador.»
- «En Devin Local/CLI el agente ve primero la **lista de servidores MCP**, pide las tools del que necesita (`mcp_list_tools`) y luego llama (`mcp_call_tool`).» (Mark this one: based on the CLI prompts and docs, not a formal guarantee.)
- «Para el departamento: **un plugin** = servidor MCP + skills que explican cómo usarlo + un AGENTS.md mínimo, distribuido por el manifiesto de la organización.»
