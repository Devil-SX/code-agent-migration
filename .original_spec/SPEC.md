✅ **任务已完成** - 不同 cli 工具配置对齐 Config

## 原始需求

对比和总结以下主流 AI 编程 CLI 工具的配置差异：

- system prompt 文件：比如 Claude Code 是 CLAUDE.md
- 存储 session 位置: 比如 Claude Code 是 .claude/projects
- 通用插件 skill / comands / mcp 安装方法
- 特殊插件格式：比如 Claude Code 的 marketplace 和 claude plugin
- 分离环境方法：比如 Claude Code 的 $PLUGIN_ROOT 变量
- 命令行方法参数 : 常见的 dangerous-skip 模式，headless -p 输出格式
- 设置位置 :比如 Claude 的 settings.json

常见 CLI 工具：**Claude Code CLI** / **Codex CLI** / **OpenCode** / **Kimi Code CLI**

## 执行步骤

1. ✅ 使用 WebSearch 搜索现有的 CLI 工具对比和迁移资料
2. ✅ 扩充配置对比项目清单
3. ✅ 逐个搜索各家官方文档和社区资源
4. ✅ 生成详细的总结报告

## 交付成果

### 1. 详细对比报告
📄 **[CLI_TOOLS_CONFIG_COMPARISON.md](../CLI_TOOLS_CONFIG_COMPARISON.md)**

包含 15 个章节的全面对比分析：
- 系统提示文件、Session 存储、插件系统
- 环境隔离、命令行参数、设置文件位置
- 模型配置、工作流模式、成本对比
- 安全权限管理、社区生态系统
- 迁移路径建议、扩展配置项
- 最佳实践和工具选择矩阵

### 2. 快速参考指南
📄 **[MIGRATION_QUICK_REFERENCE.md](../MIGRATION_QUICK_REFERENCE.md)**

实用的速查手册，包含：
- 配置文件对照表、命令对照表
- 迁移检查清单（Claude ↔ Codex ↔ OpenCode）
- 常见问题速查（FAQ）
- 混合使用策略和紧急回退计划

### 3. 实用工具脚本
🛠️ **[tools/convert_config.py](../tools/convert_config.py)**
- Python 脚本，支持 JSON ↔ TOML 格式转换
- 智能转换：Claude settings.json ↔ Codex config.toml
- 命令行工具，易于集成到工作流

🛠️ **[tools/migrate_cli_tool.sh](../tools/migrate_cli_tool.sh)**
- Bash 脚本，自动化迁移助手
- 支持：Claude ↔ Codex ↔ OpenCode 迁移
- 包含备份、转换、验证等完整流程
- 环境诊断功能

## 关键发现

1. **配置文件格式差异**:
   - Claude Code: JSON (`settings.json`)
   - Codex/Kimi: TOML (`config.toml`)
   - OpenCode: 分布式目录结构

2. **系统提示文件**:
   - Claude Code: `CLAUDE.md`
   - Codex: `AGENTS.md`
   - OpenCode: 分散在多个子目录
   - Kimi: 集成在 `config.toml`

3. **Session 存储**:
   - Claude Code: 按项目路径编码 (`~/.claude/projects/`)
   - Codex: 按日期分层 (`~/.codex/sessions/YYYY/MM/DD/`)
   - OpenCode: 不明确
   - Kimi: `~/.kimi/`

4. **工作流模式**:
   - Claude Code: 交互式推理
   - Codex: 自主沙箱执行
   - OpenCode: 灵活多模型
   - Kimi: Shell 深度集成

5. **生态系统成熟度**:
   - Claude Code & Codex: 高（官方支持）
   - OpenCode: 中等（快速发展）
   - Kimi: 新兴（有潜力）

## 推荐使用场景

- **深度推理、架构设计** → Claude Code CLI
- **代码审查、CI/CD** → Codex CLI
- **多模型实验、成本优化** → OpenCode
- **命令行自动化** → Kimi Code CLI
- **混合策略**: 组合使用以发挥各工具优势

## 参考资源

报告中引用了 30+ 官方文档和社区文章，包括：
- [The 2026 Guide to Coding CLI Tools: 15 AI Agents Compared](https://www.tembo.io/blog/coding-cli-tools-comparison)
- [Claude Code CLI Migration Guide](https://jangwook.net/en/blog/en/claude-code-cli-migration-guide/)
- [Codex vs Claude Code: 2026 Comparison](https://www.leanware.co/insights/codex-vs-claude-code)
- 以及各工具的官方文档

---

**完成时间**: 2026-02-25
**状态**: ✅ 已完成并交付