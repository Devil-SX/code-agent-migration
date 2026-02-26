# Citation Verification Report

- Generated: 2026-02-26
- Scope: `docs/index.html`, `README.md`, `CLI_TOOLS_CONFIG_COMPARISON.md`, `MIGRATION_QUICK_REFERENCE.md`, `EXAMPLES.md`
- Method: web search + fetch from official docs / primary repos

## Status Summary

| Status | Count |
|---|---:|
| verified | 17 |
| partially_verified | 1 |
| conflicted | 2 |
| unverified | 4 |
| total | 24 |

## Claim Details

### CLAIM-CODEX-CUSTOM-PROMPTS-DEPRECATED
- Concept: Codex custom prompts 已弃用，建议改用 skills。
- Site snippet: `Custom prompts are deprecated. Use skills for reusable instructions.`
- Source: [SRC-001](https://developers.openai.com/codex/custom-prompts)
- Source evidence: `Custom prompts are deprecated. Use skills ...`
- Status: `verified`

### CLAIM-CLAUDE-CLAUDEMD
- Concept: Claude Code 使用 CLAUDE.md 作为项目/全局指令载体。
- Site snippet: `系统提示：CLAUDE.md`
- Source: [SRC-005](https://docs.anthropic.com/en/docs/claude-code/memory)
- Source evidence: `Use CLAUDE.md files to give Claude instructions.`
- Status: `verified`

### CLAIM-CLAUDE-SKILLS-MCP
- Concept: Claude Code 支持 skills 和 MCP。
- Site snippet: `Skills + MCP`
- Sources: [SRC-007](https://docs.anthropic.com/en/docs/claude-code/slash-commands), [SRC-008](https://docs.anthropic.com/en/docs/claude-code/mcp)
- Source evidence: `Extend Claude Code with ... skills`; `... through MCP`
- Status: `verified`

### CLAIM-CLAUDE-SETTINGS-JSON
- Concept: Claude Code 主要配置文件为 settings.json。
- Site snippet: `settings.json`
- Source: [SRC-006](https://docs.anthropic.com/en/docs/claude-code/settings)
- Source evidence: `Global settings file is ~/.claude/settings.json`
- Status: `verified`

### CLAIM-CODEX-AGENTS
- Concept: Codex 使用 AGENTS.md 提供自定义指令。
- Site snippet: `支持 AGENTS.md 系统提示`
- Source: [SRC-002](https://developers.openai.com/codex/agents)
- Source evidence: `AGENTS.md files are a way to provide custom instructions.`
- Status: `verified`

### CLAIM-CODEX-SANDBOX
- Concept: Codex 具备隔离沙箱执行能力。
- Site snippet: `沙箱执行环境，严格隔离`
- Source: [SRC-003](https://developers.openai.com/codex/sandboxing)
- Source evidence: `Run each task in a separate cloud sandbox.`
- Status: `verified`

### CLAIM-CODEX-CONFIG-TOML
- Concept: Codex 配置文件为 `~/.codex/config.toml`。
- Site snippet: `TOML / config.toml`
- Source: [SRC-004](https://github.com/openai/codex)
- Source evidence: ``~/.codex/config.toml``
- Status: `verified`

### CLAIM-CODEX-SESSIONS-DATE
- Concept: Codex session 按 `YYYY/MM/DD` 层级存储。
- Site snippet: `按日期分层 / YYYY/MM/DD`
- Source: [SRC-004](https://github.com/openai/codex)
- Source evidence: ``~/.codex/sessions/YYYY/MM/DD``
- Status: `verified`

### CLAIM-OPENCODE-OPEN-SOURCE
- Concept: OpenCode 为开源项目。
- Site snippet: `100% 开源`
- Source: [SRC-009](https://opencode.ai)
- Source evidence: `Open source AI coding agent built for the terminal.`
- Status: `verified`

### CLAIM-OPENCODE-75-PROVIDERS
- Concept: OpenCode 支持 75+ providers。
- Site snippet: `75+ 提供商`
- Sources: [SRC-009](https://opencode.ai), [SRC-010](https://opencode.ai/docs/providers)
- Source evidence: `75+ LLM providers`; `75+ providers`
- Status: `verified`

### CLAIM-OPENCODE-OLLAMA
- Concept: OpenCode 支持本地模型（包括 Ollama）。
- Site snippet: `Ollama 本地`
- Source: [SRC-010](https://opencode.ai/docs/providers)
- Source evidence: `... use local models`; provider directory includes `Ollama`
- Status: `verified`

### CLAIM-OPENCODE-AGENTSMD
- Concept: OpenCode 会自动读取 AGENTS.md。
- Site snippet: `OpenCode reads AGENTS.md files automatically`
- Source: [SRC-011](https://opencode.ai/docs/agents)
- Source evidence: `OpenCode reads these files automatically: AGENTS.md`
- Status: `verified`

### CLAIM-OPENCODE-MIT
- Concept: OpenCode 仓库许可证为 MIT。
- Site snippet: `OpenCode: MIT License`
- Source: [SRC-012](https://github.com/sst/opencode)
- Source evidence: `MIT license`
- Status: `verified`

### CLAIM-KIMI-MOONSHOT
- Concept: Kimi Code CLI 由 Moonshot AI 提供。
- Site snippet: `Moonshot AI 工具`
- Source: [SRC-013](https://moonshotai.github.io/kimi-cli/en/getting-started.html)
- Source evidence: `Kimi Code is an AI coding assistant by Moonshot AI`
- Status: `verified`

### CLAIM-KIMI-ZSH-INTEGRATION
- Concept: Kimi CLI 支持深度 zsh 集成。
- Site snippet: `Shell 深度集成 / Zsh`
- Source: [SRC-014](https://moonshotai.github.io/kimi-cli/en/guide/key-features.html)
- Source evidence: `deep zsh integration`
- Status: `verified`

### CLAIM-KIMI-AUTO-SAVE
- Concept: Kimi CLI 会自动保存对话上下文。
- Site snippet: `自动保存`
- Source: [SRC-016](https://moonshotai.github.io/kimi-cli/en/guide/sessions.html)
- Source evidence: `automatically saves conversation history and context`
- Status: `verified`

### CLAIM-KIMI-SHELL-CTRLK
- Concept: Kimi Shell 快捷键为 Ctrl-K。
- Site snippet: `Ctrl-K 快捷键`
- Source: [SRC-015](https://moonshotai.github.io/kimi-cli/en/guide/interaction-mode.html)
- Source evidence: `Ctrl+X to enter Shell Mode`
- Status: `conflicted`
- Notes: 官方文档与仓库陈述不一致，建议改文案为 `Ctrl+X`。

### CLAIM-KIMI-CONTEXT-256K
- Concept: Kimi Code CLI 上下文窗口为 256K。
- Site snippet: `256K 上下文窗口`
- Source: N/A
- Status: `unverified`
- Notes: 官方 CLI 文档未检索到该数值。

### CLAIM-KIMI-CONFIG-TOML-PATH
- Concept: Kimi 全局配置位于 `~/.kimi/config.toml`。
- Site snippet: `config.toml / ~/.kimi/`
- Source: N/A
- Status: `unverified`
- Notes: 检索到命令示例，但未定位官方路径声明。

### CLAIM-CLAUDE-CONTEXT-200K
- Concept: Claude Sonnet 3.5 的上下文窗口为 200K。
- Site snippet: `200K / Claude 3.5 Sonnet`
- Source: [SRC-018](https://docs.anthropic.com/en/docs/about-claude/models/all-models)
- Source evidence: `200K context window`
- Status: `verified`

### CLAIM-CODEX-CONTEXT-128K
- Concept: Codex 上下文窗口为 128K（GPT-4 Turbo）。
- Site snippet: `128K / GPT-4 Turbo`
- Source: [SRC-017](https://platform.openai.com/docs/models/gpt-5-codex)
- Source evidence: `400,000 token context window`
- Status: `conflicted`
- Notes: 当前 Codex 模型文档与 128K 表述冲突。

### CLAIM-OHMYOPENCODE-100-COMPAT
- Concept: Oh My OpenCode 与 Claude Code 配置 100% 兼容。
- Site snippet: `100% 兼容 Skills 和 MCPs`
- Source: N/A
- Status: `unverified`

### CLAIM-OHMYOPENCODE-10X
- Concept: Oh My OpenCode 带来 10x+ 编辑成功率提升。
- Site snippet: `10x+ 性能提升`
- Source: N/A
- Status: `unverified`

### CLAIM-OPENCODE-MIGRATION-CLAUDE-TO-SKILLS
- Concept: 从 Claude 迁移到 OpenCode 时可映射 skills 到 `.opencode/skills/`。
- Site snippet: `Skills → .opencode/skills/`
- Source: [SRC-007](https://docs.anthropic.com/en/docs/claude-code/slash-commands)
- Source evidence: Anthropic 文档可证实 skills 概念；具体迁移步骤为本仓库建议。
- Status: `partially_verified`

## Unverified / Conflicted Priority List

1. `CLAIM-KIMI-SHELL-CTRLK` (conflicted): 建议改为 `Ctrl+X`。
2. `CLAIM-CODEX-CONTEXT-128K` (conflicted): 建议更新为当前模型文档口径或改成“取决于模型”。
3. `CLAIM-KIMI-CONTEXT-256K` (unverified): 建议先找官方模型规格页，再决定是否保留。
4. `CLAIM-KIMI-CONFIG-TOML-PATH` (unverified): 建议补充官方配置说明来源或移除具体路径。
5. `CLAIM-OHMYOPENCODE-100-COMPAT` / `CLAIM-OHMYOPENCODE-10X` (unverified): 建议增加可审计 benchmark 与方法说明。
