# CLI 编程工具配置对比报告

## 执行摘要

本报告对比了四个主流 AI 编程 CLI 工具的配置和迁移要点：
- **Claude Code CLI** (Anthropic)
- **Codex CLI** (OpenAI)
- **OpenCode** (开源/多模型)
- **Kimi Code CLI** (Moonshot AI)

基于 2026 年 2 月的最新文档和社区实践，本报告提供了配置项对比、迁移建议和最佳实践。

---

## 1. 系统提示文件 (System Prompt Files)

### Claude Code CLI
- **文件名**: `CLAUDE.md`
- **位置**:
  - 全局: `~/.claude/CLAUDE.md`
  - 项目级: `<project-root>/CLAUDE.md`
  - 支持嵌套目录，优先级最深
- **格式**: Markdown
- **特点**: 支持层次化配置，项目级覆盖全局级

### Codex CLI
- **文件名**: `AGENTS.md`
- **位置**:
  - 全局: `~/.codex/AGENTS.md`
  - 临时覆盖: `~/.codex/AGENTS.override.md`
- **格式**: Markdown
- **特点**: 支持临时覆盖文件用于实验性指令

### OpenCode
- **文件名**: 根据配置类型分散存储
- **位置**:
  - `.opencode/`（项目级）
  - `~/.config/opencode/`（用户级）
- **子目录**: `agents/`, `commands/`, `modes/`, `skills/`, `tools/`
- **特点**: 分布式配置，按功能组织

### Kimi Code CLI
- **文件名**: 尚未明确单一系统提示文件
- **位置**: `~/.kimi/config.toml`
- **格式**: TOML
- **特点**: 配置集中在 TOML 文件中

**迁移建议**:
- Claude Code → Codex: 将 `CLAUDE.md` 重命名为 `AGENTS.md`
- Claude Code → OpenCode: 需拆分为多个文件放入对应子目录
- 其他工具 → Kimi: 需转换为 TOML 格式

---

## 2. Session 存储位置

### Claude Code CLI
- **路径**: `~/.claude/projects/`
- **组织方式**: 按项目绝对路径编码
  - 示例: `/home/user/project` → `-home-user-project/`
- **文件格式**: JSONL (`.jsonl`)
- **结构**:
  ```
  ~/.claude/projects/
  ├── -home-user-project-a/
  │   ├── session-id-1.jsonl
  │   ├── session-id-2.jsonl
  │   └── memory/
  ```
- **注意**: 项目路径变更需手动重命名目录

### Codex CLI
- **路径**: `~/.codex/sessions/`
- **组织方式**: 按日期分层
  - 格式: `YYYY/MM/DD/`
- **文件格式**: JSON Lines
- **结构**:
  ```
  ~/.codex/sessions/
  ├── 2026/
  │   ├── 02/
  │   │   ├── 25/
  │   │   │   ├── session-abc123.jsonl
  ```
- **特点**: 时间导向，便于归档和清理

### OpenCode
- **路径**: 未明确统一 session 存储位置
- **特点**: 更关注实时连接而非持久化 session

### Kimi Code CLI
- **路径**: `~/.kimi/` 目录下
- **配置**: 保存在 `~/.kimi/config.toml`
- **特点**: 配置自动保存和重载

**迁移建议**:
- Claude Code 到 Codex: 需要重新组织目录结构（从路径编码改为日期分层）
- 手动迁移时注意 JSONL 格式兼容性
- 考虑使用 `/resume` 命令而非直接复制文件

---

## 3. 插件/扩展系统 (Plugins & Extensions)

### Claude Code CLI

#### Skills
- **位置**:
  - 用户级: `~/.claude/skills/`
  - 项目级: `.claude/skills/`
- **格式**: 目录结构，每个 skill 一个子目录
- **激活**: 自动发现，通过 `/skill-name` 调用

#### Plugins (Marketplace)
- **位置**: `~/.claude/plugins/`
- **安装方式**:
  - Marketplace: `claude plugin install <name>`
  - 本地开发: 直接放入目录
- **配置**: `settings.json` 中的 `plugins` 字段

#### MCP (Model Context Protocol)
- **配置位置**: `~/.claude/settings.json` → `mcpServers` 字段
- **示例**:
  ```json
  {
    "mcpServers": {
      "filesystem": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
      }
    }
  }
  ```

### Codex CLI

#### 插件系统
- **配置位置**: `~/.codex/config.toml`
- **类型**:
  - 工具扩展
  - 沙箱策略
  - 审批策略
- **特点**: 通过 TOML 配置启用/禁用

### OpenCode

#### 统一扩展架构
- **位置**:
  - 项目: `.opencode/plugins/`
  - 用户: `~/.config/opencode/plugins/`
- **来源**:
  - 本地文件
  - npm 包
  - MCP 服务器

#### MCP 支持
- **配置**: 通过 `mcp` 选项
- **特点**:
  - 支持本地和远程 MCP 服务器
  - 工具自动对 LLM 可用
- **命令**:
  - 添加: `opencode mcp add`
  - 列表: `opencode mcp list`

#### 技能系统
- **位置**: `.opencode/skills/` 或 `~/.config/opencode/skills/`
- **配置**: 通过插件配置启用

### Kimi Code CLI
- **扩展性**: 文档较少，主要依赖配置文件
- **Provider 配置**: 在 `config.toml` 中定义 API 提供商

**迁移建议**:
- Claude Code → OpenCode: Skills 需转换为 OpenCode 的技能格式
- MCP 服务器配置基本通用（遵循 MCP 协议）
- Marketplace 插件需逐个检查是否有对应实现

---

## 4. 环境隔离方法

### Claude Code CLI
- **变量**: `$PLUGIN_ROOT`
- **用途**: 隔离插件运行环境
- **特点**: 每个插件有独立的工作目录

### Codex CLI
- **沙箱**: 内置沙箱环境
- **工作区**:
  - 当前目录 + `/tmp`
  - 通过 `--add-dir` 添加额外目录
- **隔离**: 文件系统和网络访问可配置

### OpenCode
- **环境隔离**: 依赖宿主环境
- **特点**: 更开放，需手动管理隔离

### Kimi Code CLI
- **Shell Mode**: 支持 Ctrl-K 切换
- **集成**: 深度 Zsh 集成
- **隔离**: 文档未详细说明

**迁移建议**:
- 从 Claude Code 迁移需注意 `$PLUGIN_ROOT` 变量
- Codex 的沙箱模式最严格，需明确配置访问权限
- OpenCode 最灵活但需要更多手动配置

---

## 5. 命令行参数 (CLI Arguments)

### 通用模式对比

| 功能 | Claude Code | Codex CLI | OpenCode | Kimi Code |
|------|-------------|-----------|----------|-----------|
| **Headless 模式** | `--headless` | `-` | `opencode serve`, `opencode run` | `-` |
| **危险跳过权限** | `--dangerous-skip` | 配置文件 | `--dangerously-skip-permissions` (提案中) | `default_yolo` |
| **输出格式** | `-p` | `-` | `-o` | `-` |
| **恢复 Session** | `/resume` | `codex resume [--all]` | `opencode --resume` | `-` |
| **指定目录** | `--cwd` | `--cd`, `--add-dir` | `-` | `-` |
| **配置覆盖** | `-` | `-c key=value` | `-` | `-` |

### Claude Code CLI 常用参数
```bash
claude --headless -p <prompt>        # 无交互模式
claude --dangerous-skip              # 跳过权限检查
claude /resume                       # 恢复会话
```

### Codex CLI 常用参数
```bash
codex -c model=gpt-5.3-codex        # 临时覆盖配置
codex resume --last                 # 恢复最后会话
codex --cd /path/to/project        # 指定工作目录
codex --add-dir /extra/path        # 添加访问路径
```

### OpenCode 常用参数
```bash
opencode serve                      # HTTP 服务器模式
opencode run "prompt"               # 编程式执行
opencode --resume <session-id>     # 恢复会话
```

### Kimi Code CLI 常用参数
```bash
kimi /login                         # 登录配置向导
kimi /model                         # 模型选择
```

**迁移建议**:
- 脚本化工作流需要重写命令行调用
- Claude Code 和 OpenCode 的危险模式参数名称几乎一致
- Codex 的配置覆盖 (`-c`) 是独特的，很方便

---

## 6. 设置文件位置 (Settings File Location)

### Claude Code CLI
- **主配置**: `~/.claude/settings.json`
- **结构**:
  ```json
  {
    "permissions": { ... },
    "mcpServers": { ... },
    "plugins": [ ... ],
    "cleanupIntervals": { ... }
  }
  ```
- **特点**: JSON 格式，结构化配置

### Codex CLI
- **主配置**: `~/.codex/config.toml`
- **结构**:
  ```toml
  [model]
  default = "gpt-5.3-codex"

  [approval]
  policy = "ask"

  [sandbox]
  network = "restricted"
  ```
- **特点**: TOML 格式，分段配置

### OpenCode
- **主配置**: `~/.config/opencode/` 或项目根目录的 `.opencode/`
- **配置文件**: `opencode.json`
- **结构**: 分散在多个子目录
- **特点**: 灵活的目录结构

### Kimi Code CLI
- **主配置**: `~/.kimi/config.toml`
- **结构**:
  ```toml
  default_model = "kimi-for-coding"
  default_thinking = false
  default_yolo = false
  ```
- **特点**: TOML 格式，自动保存

**迁移建议**:
- JSON ↔ TOML 需要格式转换工具
- OpenCode 的分布式配置需要逐个文件迁移
- 建议先导出当前配置，然后逐项映射到新工具

---

## 7. 模型配置与提供商

### Claude Code CLI
- **模型**: Opus 4.6, Sonnet 4.5, Haiku 4.5
- **切换**: 通过 UI 或设置文件
- **特点**: 专注 Anthropic 模型

### Codex CLI
- **模型**: GPT-5.3-Codex 系列
- **切换**: `config.toml` 中的 `model.default`
- **特点**: 专注 OpenAI 模型

### OpenCode
- **模型**: **多提供商支持**
  - Anthropic (通过 API)
  - OpenAI (通过 API)
  - Google Gemini
  - 本地 Llama (通过 Ollama)
  - OpenCode Zen Gateway (30+ 模型)
- **配置**: `opencode.json` 中的 `providers`
- **特点**: 最灵活的多模型方案

### Kimi Code CLI
- **模型**:
  - Kimi K2 (1T 参数 MoE，32B 激活)
  - Kimi K2.5
  - Kimi K2 Thinking
- **配置**: `config.toml` 中的 providers
- **特点**: 专注 Kimi 模型系列

**迁移建议**:
- 如果需要多模型支持，OpenCode 是最佳选择
- Claude Code 订阅用户注意：2026年1月9日后无法通过第三方工具使用订阅
- Kimi 模型推荐设置：temperature=1.0, min_p=0.01

---

## 8. 工作流模式差异

### Claude Code CLI
- **交互模式**: 在终端中显示推理，在决策点请求输入
- **优势**:
  - 深度上下文理解
  - 多代理编排
  - GUI 相关任务
- **适用**: 初始功能生成、架构决策

### Codex CLI
- **自主模式**: 在沙箱中自主运行任务，呈现结果供审核
- **优势**:
  - 逻辑精确性
  - Token 效率
  - 终端密集型 CI/CD
- **适用**: 代码审查、调试、安全检查

### OpenCode
- **灵活模式**: 支持交互和编程式执行
- **优势**:
  - 多模型切换
  - 可编程 API
  - 开源可定制
- **适用**: 需要模型选择自由的场景

### Kimi Code CLI
- **Shell 模式**: Ctrl-K 切换，直接执行 shell 命令
- **优势**:
  - 深度终端集成
  - 256K 上下文窗口
- **适用**: 命令行密集型任务

**混合策略建议**:
- 使用 Claude Code 进行快速实现和多代理任务
- 使用 Codex 进行代码审查和 CI/CD
- 使用 OpenCode 进行多模型实验
- 使用 Kimi 进行命令行自动化

---

## 9. 成本与订阅模式

### Claude Code CLI
- **订阅**: Claude Pro 或 Claude Max
- **注意**: 2026年1月9日起，第三方工具无法使用订阅 OAuth tokens
- **API**: 需单独付费使用 API

### Codex CLI
- **订阅**: ChatGPT Plus, Pro, Team, 或 Enterprise
- **特点**: 通过现有 ChatGPT 订阅认证

### OpenCode
- **免费**: 开源工具本身免费
- **模型成本**:
  - API 按使用付费
  - 本地模型免费（如 Ollama）
  - OpenCode Zen Gateway 按使用付费
- **灵活性**: 可选择最经济的模型

### Kimi Code CLI
- **订阅**: Kimi 平台订阅
- **特点**: 可能有免费配额

**成本优化建议**:
- 日常查询使用免费或低成本模型（如 Gemini）
- GitHub 工作流使用 Copilot CLI ($10/月)
- 复杂任务保留 Claude Code 或 Codex
- 探索 Ollama + OpenCode 的本地免费方案

---

## 10. 安全与权限管理

### Claude Code CLI
- **权限模式**:
  - `ask` (默认): 每次询问
  - `delegate`: 委托代理决策
  - `bypassPermissions`: 跳过检查
- **配置**: `settings.json` 中的 `permissions` 字段
- **危险模式**: `--dangerous-skip` 参数

### Codex CLI
- **沙箱策略**: 严格的沙箱环境
- **审批策略**: 在 `config.toml` 配置
- **文件系统**: 默认限制，需显式授予目录访问
- **网络**: 可配置为 restricted 或 full

### OpenCode
- **权限**: 依赖宿主环境权限
- **YOLO 模式**: `--dangerously-skip-permissions` (提案中)
- **Headless 问题**: 无人响应权限提示会导致挂起

### Kimi Code CLI
- **YOLO 模式**: `default_yolo` 配置
- **Shell 集成**: 直接执行 shell 命令权限

**安全建议**:
- 生产环境避免使用 dangerous/yolo 模式
- Codex 的沙箱最严格，适合不受信任的代码
- Headless 模式需要预配置权限策略
- 审查所有自动执行的命令

---

## 11. 社区与生态系统

### Claude Code CLI
- **文档**: [code.claude.com/docs](https://code.claude.com/docs/en/cli-reference)
- **GitHub**: anthropics/claude-code
- **社区资源**:
  - [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
  - [claude-code-config (Trail of Bits)](https://github.com/trailofbits/claude-code-config)
- **成熟度**: 高，官方支持

### Codex CLI
- **文档**: [developers.openai.com/codex](https://developers.openai.com/codex/cli)
- **GitHub**: openai/codex
- **成熟度**: 高，OpenAI 官方支持

### OpenCode
- **文档**: [opencode.ai/docs](https://opencode.ai/docs/config/)
- **GitHub**: anomalyco/opencode (或 sst/opencode)
- **社区**: 开源社区驱动
- **成熟度**: 中等，快速发展

### Kimi Code CLI
- **文档**: [moonshotai.github.io/kimi-cli](https://moonshotai.github.io/kimi-cli/en/)
- **GitHub**: MoonshotAI/kimi-cli
- **成熟度**: 新兴，Moonshot AI 支持

---

## 12. 迁移路径建议

### 从 Claude Code 迁移

#### 到 Codex CLI
1. **配置文件**:
   - 重命名 `CLAUDE.md` → `AGENTS.md`
   - 转换 `settings.json` → `config.toml`
2. **Session**:
   - 无法直接迁移，需重新开始
   - 使用 `/resume` 命令逐个恢复
3. **插件**:
   - 检查 Codex 是否有等效功能
   - MCP 服务器可能兼容
4. **工作流**:
   - 适应自主执行模式
   - 学习沙箱和审批配置

#### 到 OpenCode
1. **配置文件**:
   - 拆分 `CLAUDE.md` 到 `.opencode/` 子目录
   - 创建 `opencode.json`
2. **Skills**:
   - 迁移到 `.opencode/skills/`
   - 检查格式兼容性
3. **MCP**:
   - 直接复用 MCP 服务器配置
4. **模型**:
   - 配置 Anthropic API credentials
   - 或切换到其他模型提供商

#### 到 Kimi Code CLI
1. **配置文件**:
   - 转换为 TOML 格式
   - 运行 `/login` 配置向导
2. **学习曲线**:
   - 熟悉 Shell Mode (Ctrl-K)
   - 了解 K2 模型特性
3. **局限**:
   - 生态系统较小
   - 插件支持可能有限

### 从 Codex CLI 迁移

#### 到 Claude Code
1. **配置文件**:
   - 重命名 `AGENTS.md` → `CLAUDE.md`
   - 转换 `config.toml` → `settings.json`
2. **工作流**:
   - 适应交互式推理模式
   - 利用深度上下文能力
3. **订阅**:
   - 需要 Claude 订阅（独立于 OpenAI）

### 从 OpenCode 迁移

#### 到专有工具 (Claude Code / Codex)
1. **简化配置**:
   - 合并分散的配置文件
   - 选择主要使用的模型
2. **功能对比**:
   - 列出 OpenCode 使用的功能
   - 检查目标工具是否支持
3. **成本**:
   - 评估订阅费用 vs API 费用

---

## 13. 扩展配置项补充

基于研究，补充原始 SPEC 中未列出的配置项:

### 13.1 日志和调试
- **Claude Code**: `~/.claude/logs/`，配置 `logLevel`
- **Codex**: `~/.codex/log/codex-tui.log`
- **OpenCode**: 依赖宿主环境日志
- **Kimi**: 未详细说明

### 13.2 自动清理
- **Claude Code**: `settings.json` 中 `cleanupIntervals` 配置
- **Codex**: 按日期组织便于手动清理
- **OpenCode**: 手动管理
- **Kimi**: 未详细说明

### 13.3 键盘快捷键
- **Claude Code**: `~/.claude/keybindings.json`，支持 Chord 绑定
- **Codex**: 内置快捷键，配置选项有限
- **OpenCode**: 依赖终端模拟器配置
- **Kimi**: Ctrl-K 切换 Shell 模式

### 13.4 主题和 UI
- **Claude Code**: TUI 主题配置
- **Codex**: TUI 主题配置
- **OpenCode**: `.opencode/themes/`
- **Kimi**: 未详细说明

### 13.5 自动记忆 (Auto Memory)
- **Claude Code**: `~/.claude/projects/<project>/memory/`
  - `MEMORY.md` 自动加载
  - 持久化跨会话上下文
- **Codex**: 内置记忆系统，自动管理
- **OpenCode**: 取决于模型提供商
- **Kimi**: 256K 上下文窗口

### 13.6 Git 集成
- **Claude Code**: 深度集成，自动 co-author 标记
- **Codex**: Git 工作流支持
- **OpenCode**: 基础 Git 命令支持
- **Kimi**: 未详细说明

### 13.7 测试和 CI/CD
- **Claude Code**: 通过 skills 扩展（如 `add_test`）
- **Codex**: 优势在 CI/CD 场景
- **OpenCode**: 可编程 API 支持
- **Kimi**: 未详细说明

---

## 14. 最佳实践总结

### 配置管理
1. **版本控制**:
   - 将 `CLAUDE.md`/`AGENTS.md` 纳入项目版本控制
   - 用户级配置保持私密（不提交）
2. **模块化**:
   - 使用 skills/plugins 分离功能
   - 避免臃肿的单一配置文件
3. **文档化**:
   - 在配置文件中添加注释
   - 维护配置变更日志

### 迁移策略
1. **渐进式迁移**:
   - 先并行运行两个工具
   - 逐步迁移工作流
2. **测试驱动**:
   - 在非关键项目上先测试新工具
   - 验证所有关键功能
3. **备份**:
   - 迁移前备份所有配置和 session
   - 保留旧工具一段时间

### 安全实践
1. **最小权限**:
   - 默认使用 `ask` 模式
   - 仅在可信环境使用 dangerous 模式
2. **审查**:
   - 审查所有自动执行的命令
   - 特别注意文件删除和网络请求
3. **隔离**:
   - 使用沙箱环境处理不受信任代码
   - 限制文件系统访问范围

### 成本优化
1. **分层使用**:
   - 简单查询用低成本工具
   - 复杂任务用高级模型
2. **本地优先**:
   - 考虑 Ollama + OpenCode 本地方案
   - 减少 API 调用
3. **监控**:
   - 追踪 token 使用
   - 定期评估成本效益

---

## 15. 总结与推荐

### 工具选择矩阵

| 场景 | 推荐工具 | 理由 |
|------|---------|------|
| **Claude 深度用户** | Claude Code CLI | 原生集成，最佳体验 |
| **OpenAI 生态** | Codex CLI | 与 ChatGPT 订阅集成 |
| **多模型实验** | OpenCode | 最大灵活性 |
| **命令行自动化** | Kimi Code CLI | Shell 深度集成 |
| **企业安全** | Codex CLI | 严格沙箱 |
| **开源需求** | OpenCode | 可审计可定制 |
| **成本敏感** | OpenCode + 本地模型 | 控制成本 |
| **快速原型** | Claude Code CLI | 交互式推理 |
| **代码审查** | Codex CLI | 逻辑精确 |
| **初学者** | Claude Code CLI | 文档完善，社区活跃 |

### 未来趋势
1. **标准化**: 期待更多 MCP 标准化
2. **互操作性**: 工具间配置迁移将更容易
3. **混合工作流**: 多工具组合成为常态
4. **本地化**: 更多本地模型支持
5. **集成深化**: 与 IDE、Git、CI/CD 更深度集成

---

## 参考资源

### 官方文档
- [Claude Code Docs](https://code.claude.com/docs/en/cli-reference)
- [Codex CLI Documentation](https://developers.openai.com/codex/cli)
- [OpenCode Documentation](https://opencode.ai/docs/config/)
- [Kimi Code CLI Docs](https://moonshotai.github.io/kimi-cli/en/)

### 社区资源
- [The 2026 Guide to Coding CLI Tools: 15 AI Agents Compared](https://www.tembo.io/blog/coding-cli-tools-comparison)
- [Claude Code CLI Migration Guide](https://jangwook.net/en/blog/en/claude-code-cli-migration-guide/)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
- [Top 5 CLI Coding Agents in 2026](https://pinggy.io/blog/top_cli_based_ai_coding_agents/)

### 对比文章
- [Codex vs Claude Code: 2026 Comparison for Developers](https://www.leanware.co/insights/codex-vs-claude-code)
- [OpenCode vs Claude Code vs OpenAI Codex: A Comprehensive Comparison](https://bytebridge.medium.com/opencode-vs-claude-code-vs-openai-codex-a-comprehensive-comparison-of-ai-coding-assistants-bd5078437c01)
- [Claude Code vs OpenAI Codex: which is better in 2026?](https://northflank.com/blog/claude-code-vs-openai-codex)

### 技术深潜
- [How Claude Code Manages Local Storage for AI Agents](https://milvus.io/es/blog/why-claude-code-feels-so-stable-a-developers-deep-dive-into-its-local-storage-design.md)
- [OpenAI Codex CLI Memory - Deep Dive](https://mer.vin/2025/12/openai-codex-cli-memory-deep-dive/)
- [Creating the Perfect CLAUDE.md for Claude Code](https://dometrain.com/blog/creating-the-perfect-claudemd-for-claude-code/)

---

**报告生成时间**: 2026-02-25
**数据来源**: Web 搜索、官方文档、社区实践
**状态**: ✅ 完成

如需更新或补充，请参考上述资源链接获取最新信息。
