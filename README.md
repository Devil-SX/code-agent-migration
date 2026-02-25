# AI 编程 CLI 工具配置迁移指南

> 全面对比 Claude Code CLI、Codex CLI、OpenCode 和 Kimi Code CLI，提供详细的配置迁移方案

## 📚 项目概述

本项目提供了主流 AI 编程命令行工具之间的配置对比和迁移指南，帮助开发者：
- 理解不同工具的配置差异
- 平滑迁移配置和工作流
- 选择最适合的工具组合
- 优化成本和效率

## 🎯 支持的工具

| 工具 | 开发商 | 模型 | 成熟度 |
|------|--------|------|--------|
| **[Claude Code CLI](https://code.claude.com)** | Anthropic | Claude Opus/Sonnet/Haiku | ⭐⭐⭐⭐⭐ |
| **[Codex CLI](https://developers.openai.com/codex)** | OpenAI | GPT-5.3-Codex | ⭐⭐⭐⭐⭐ |
| **[OpenCode](https://opencode.ai)** | 开源社区 | 多模型支持 | ⭐⭐⭐⭐ |
| **[Kimi Code CLI](https://moonshotai.github.io/kimi-cli)** | Moonshot AI | Kimi K2/K2.5 | ⭐⭐⭐ |

## 📖 文档结构

```
code-agent-migration/
├── README.md                           # 📍 本文件 - 项目入口
├── CLI_TOOLS_CONFIG_COMPARISON.md      # 📊 详细对比报告 (15章节)
├── MIGRATION_QUICK_REFERENCE.md        # ⚡ 快速参考指南
├── .original_spec/
│   └── SPEC.md                         # 📝 原始需求说明
└── tools/
    ├── convert_config.py               # 🔧 配置格式转换工具
    └── migrate_cli_tool.sh             # 🚀 自动化迁移脚本
```

## 🚀 快速开始

### 1. 查看详细对比报告

阅读 **[CLI_TOOLS_CONFIG_COMPARISON.md](CLI_TOOLS_CONFIG_COMPARISON.md)** 了解：
- 15 个章节的全面对比分析
- 配置文件、Session 存储、插件系统差异
- 命令行参数、安全权限、成本对比
- 迁移路径建议和最佳实践

### 2. 使用快速参考指南

查看 **[MIGRATION_QUICK_REFERENCE.md](MIGRATION_QUICK_REFERENCE.md)** 获取：
- 配置文件和命令对照表
- 迁移检查清单
- 常见问题解答（FAQ）
- 混合使用策略

### 3. 运行迁移工具

#### 诊断当前环境

```bash
chmod +x tools/migrate_cli_tool.sh
./tools/migrate_cli_tool.sh diagnose
```

#### 执行迁移

```bash
# Claude Code → Codex CLI
./tools/migrate_cli_tool.sh claude-to-codex

# Codex CLI → Claude Code
./tools/migrate_cli_tool.sh codex-to-claude

# Claude Code → OpenCode
./tools/migrate_cli_tool.sh claude-to-opencode
```

#### 转换配置文件

```bash
# 安装依赖
pip install toml

# JSON → TOML (通用)
python3 tools/convert_config.py settings.json -o config.toml

# 智能转换 (Claude → Codex)
python3 tools/convert_config.py settings.json --to-codex config.toml

# 智能转换 (Codex → Claude)
python3 tools/convert_config.py config.toml --to-claude settings.json
```

## 🎯 使用场景推荐

### 场景 1: 深度推理和架构设计
**推荐**: Claude Code CLI
- ✅ 交互式推理显示思考过程
- ✅ 深度上下文理解
- ✅ 多代理编排能力

### 场景 2: 代码审查和 CI/CD
**推荐**: Codex CLI
- ✅ 逻辑精确性强
- ✅ 严格沙箱环境
- ✅ Token 效率高

### 场景 3: 多模型实验和成本优化
**推荐**: OpenCode
- ✅ 支持 30+ 模型
- ✅ 可选本地模型（免费）
- ✅ 开源可定制

### 场景 4: 命令行密集型自动化
**推荐**: Kimi Code CLI
- ✅ Shell 深度集成 (Ctrl-K)
- ✅ 256K 超长上下文
- ✅ 直接命令执行

### 场景 5: 混合工作流 (推荐)
**策略**: 组合使用多个工具
```
初始开发 → Claude Code (快速实现)
      ↓
代码审查 → Codex (逻辑验证)
      ↓
CI/CD → OpenCode headless (灵活性)
```

## 📊 关键配置项对比

| 配置项 | Claude Code | Codex | OpenCode | Kimi |
|--------|-------------|-------|----------|------|
| **系统提示** | `CLAUDE.md` | `AGENTS.md` | 分散配置 | `config.toml` |
| **配置格式** | JSON | TOML | JSON | TOML |
| **配置位置** | `~/.claude/` | `~/.codex/` | `~/.config/opencode/` | `~/.kimi/` |
| **Session 存储** | 按路径编码 | 按日期分层 | 不明确 | `~/.kimi/` |
| **插件系统** | ✅ Skills + Marketplace | ❌ | ✅ 统一扩展 | ❌ |
| **MCP 支持** | ✅ | ✅ | ✅ | ⚠️ |
| **多模型** | ❌ (仅 Claude) | ❌ (仅 GPT) | ✅ (30+ 模型) | ❌ (仅 Kimi) |
| **本地模型** | ❌ | ❌ | ✅ (Ollama) | ❌ |

## 🔧 工具说明

### convert_config.py

Python 配置转换工具，支持：
- JSON ↔ TOML 通用转换
- Claude Code ↔ Codex 智能转换
- 自动映射配置字段

**用法示例**:
```bash
# 查看帮助
python3 tools/convert_config.py --help

# 通用转换
python3 tools/convert_config.py input.json -o output.toml

# Claude → Codex
python3 tools/convert_config.py ~/.claude/settings.json \
  --to-codex ~/.codex/config.toml

# Codex → Claude
python3 tools/convert_config.py ~/.codex/config.toml \
  --to-claude ~/.claude/settings.json
```

### migrate_cli_tool.sh

Bash 自动化迁移脚本，功能：
- ✅ 自动备份现有配置（带时间戳）
- ✅ 创建目标目录结构
- ✅ 转换配置文件
- ✅ 迁移 skills 和插件
- ✅ 环境诊断

**用法示例**:
```bash
# 查看帮助
./tools/migrate_cli_tool.sh help

# 诊断环境
./tools/migrate_cli_tool.sh diagnose

# 执行迁移
./tools/migrate_cli_tool.sh claude-to-codex
./tools/migrate_cli_tool.sh codex-to-claude
./tools/migrate_cli_tool.sh claude-to-opencode
```

## ⚠️ 重要注意事项

### 1. 订阅限制
- **2026年1月9日起**: Anthropic 禁止第三方工具使用 Claude 订阅 OAuth tokens
- OpenCode 用户无法再通过 Claude Max 订阅使用 Claude 模型
- 需要单独购买 Anthropic API credits

### 2. Session 迁移
- ❌ **不建议**直接复制 session 文件
- ✅ **推荐**在新工具中使用 `/resume` 概念重建上下文
- 不同工具的 session 格式不兼容

### 3. 安全模式
- 生产环境避免使用 `--dangerous-skip` 或 `yolo` 模式
- Codex 的沙箱最严格，适合不受信任的代码
- Headless 模式需要预配置权限策略

### 4. 备份重要性
- ⚠️ 迁移前**必须**备份所有配置
- 脚本会自动备份，但手动再备份一次更安全
- 保留旧工具一段时间以防需要回退

## 🌟 最佳实践

### 配置管理
1. ✅ 将系统提示文件（`CLAUDE.md`/`AGENTS.md`）纳入版本控制
2. ✅ 用户级配置保持私密（不提交 API keys）
3. ✅ 使用 skills/plugins 分离功能
4. ✅ 在配置文件中添加注释

### 迁移策略
1. ✅ 渐进式迁移：先并行运行两个工具
2. ✅ 在非关键项目上先测试
3. ✅ 验证所有关键功能
4. ✅ 保留完整备份

### 成本优化
1. ✅ 日常查询用低成本工具（Gemini 免费）
2. ✅ 中等任务用 Copilot CLI ($10/月)
3. ✅ 复杂任务用高级模型（Claude/GPT）
4. ✅ 考虑 Ollama + OpenCode 本地方案

## 📚 参考资源

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
- [Codex vs Claude Code: 2026 Comparison](https://www.leanware.co/insights/codex-vs-claude-code)
- [OpenCode vs Claude Code vs OpenAI Codex](https://bytebridge.medium.com/opencode-vs-claude-code-vs-openai-codex-a-comprehensive-comparison-of-ai-coding-assistants-bd5078437c01)
- [Claude Code vs OpenAI Codex: which is better in 2026?](https://northflank.com/blog/claude-code-vs-openai-codex)

## 🤝 贡献

欢迎贡献改进：
- 报告配置问题或错误
- 添加新的 CLI 工具对比
- 改进迁移脚本
- 分享迁移经验

## 📝 更新日志

- **2026-02-25**: 初始版本发布
  - 完整对比 4 个主流 CLI 工具
  - 提供自动化迁移脚本
  - 包含 15 章详细分析

## 📄 许可证

本项目文档和工具脚本以 MIT License 发布，供社区自由使用和改进。

---

**生成时间**: 2026-02-25
**维护**: 根据社区反馈持续更新
**状态**: ✅ 完成并可用

如有问题或建议，请创建 Issue 或提交 Pull Request。
