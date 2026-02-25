# AI 编程 CLI 工具配置对比

> Claude Code CLI vs Codex CLI vs OpenCode vs Kimi Code CLI - 全面配置对比与迁移指南

## 📚 项目概述

本项目对比了四个主流 AI 编程 CLI 工具的配置差异，帮助开发者：
- 理解不同工具的配置系统和架构
- 选择最适合自己需求的 CLI 工具
- 平滑迁移配置和工作流
- 掌握最佳实践和使用策略

## 🎯 对比工具

| 工具 | 开发商 | 核心特点 | 配置文件 |
|------|--------|---------|---------|
| **Claude Code CLI** | Anthropic | Skills + MCP, 交互式推理 | CLAUDE.md + settings.json |
| **Codex CLI** | OpenAI | 沙箱执行，TOML 配置 | AGENTS.md + config.toml |
| **OpenCode** | 开源社区 | 75+ LLM 提供商，本地模型 | 分布式配置 (.opencode/) |
| **Kimi Code CLI** | Moonshot AI | 256K 上下文，Shell 深度集成 | config.toml |

## 📖 项目结构

```
code-agent-migration/
├── README.md                           # 📍 项目总览
├── CLI_TOOLS_CONFIG_COMPARISON.md      # 📊 完整对比报告 (703 行)
├── MIGRATION_QUICK_REFERENCE.md        # 🚀 快速参考指南 (371 行)
├── EXAMPLES.md                         # 💡 迁移示例
├── PROJECT_COMPLETION.md               # ✅ 项目完成总结
├── docs/                               # 🎨 可视化网站
│   ├── index.html                      # 主页面
│   ├── styles.css                      # 现代样式
│   └── script.js                       # 交互功能
├── tools/                              # 🔧 迁移工具
│   ├── convert_config.py               # Python 配置转换工具
│   └── migrate_cli_tool.sh             # Bash 迁移脚本
├── research/                           # 📚 额外研究（Oh My OpenCode）
└── .original_spec/                     # 📋 项目规格说明
```

## 🌐 在线演示

**可视化网站**: [https://devil-sx.github.io/code-agent-migration/](https://devil-sx.github.io/code-agent-migration/)

现代化、响应式设计的配置对比展示页面，包含：
- 🔍 4 个工具详细对比
- 📊 15 个配置维度分析
- 🚀 迁移路径指南
- 💡 使用场景推荐
- 🛠️ 自动化迁移工具

## 🚀 快速开始

### 1. 查看在线可视化

访问 **[可视化网站](https://devil-sx.github.io/code-agent-migration/)** 获取：
- 交互式配置对比表格
- 迁移路径可视化
- 使用场景推荐
- 美观的现代化界面

### 2. 阅读详细报告

#### 完整对比报告 ([CLI_TOOLS_CONFIG_COMPARISON.md](CLI_TOOLS_CONFIG_COMPARISON.md))
15 个配置维度的详细对比：
1. 系统提示文件 (System Prompt Files)
2. Session 存储位置
3. 配置文件格式
4. 插件/扩展系统
5. 命令行参数
6. LLM 提供商支持
7. 环境变量
8. 上下文窗口大小
9. Shell 集成
10. 项目权限管理
11. 多项目工作区
12. 内置工具集成
13. API 兼容性
14. 性能与资源消耗
15. 社区与生态系统

#### 快速参考指南 ([MIGRATION_QUICK_REFERENCE.md](MIGRATION_QUICK_REFERENCE.md))
- 配置迁移路径表
- 命令对照表
- 常见问题解答
- 最佳实践建议

#### 迁移示例 ([EXAMPLES.md](EXAMPLES.md))
- Claude Code → Codex 迁移示例
- Claude Code → OpenCode 迁移示例
- Codex → Claude Code 迁移示例
- 实际配置文件示例

### 3. 使用自动化工具

#### Python 配置转换工具
```bash
# 安装依赖
pip install -r requirements.txt  # (如果有)

# 转换配置
python tools/convert_config.py \
  --source claude \
  --target codex \
  --input ~/.claude/CLAUDE.md \
  --output ~/.codex/AGENTS.md
```

#### Bash 迁移脚本
```bash
# 完整迁移工作流
bash tools/migrate_cli_tool.sh \
  --from claude-code \
  --to codex \
  --backup
```

### 4. 本地运行可视化网站

```bash
# 克隆仓库
git clone https://github.com/Devil-SX/code-agent-migration.git
cd code-agent-migration

# 启动本地服务器（任选其一）
python3 -m http.server 8000 --directory docs
# 或
npx serve docs

# 访问 http://localhost:8000
```

## 🎯 核心发现

### Claude Code CLI - 企业级官方工具

**关键特性**:
- ✅ **Skills 系统** - 可复用的功能模块
- ✅ **MCP 集成** - Model Context Protocol 支持
- ✅ **交互式推理** - 高级推理能力
- ✅ **~/.claude/** - 标准配置位置
- ✅ **CLAUDE.md** - 系统提示文件

**最佳用途**:
- 企业级项目开发
- 需要强大插件生态
- Anthropic Claude 模型用户
- 需要交互式推理能力

### Codex CLI - 安全沙箱执行

**关键特性**:
- ✅ **沙箱执行** - 严格的安全隔离
- ✅ **TOML 配置** - 简洁的配置格式
- ✅ **AGENTS.md** - 系统提示文件
- ✅ **按日期分层** - Session 组织方式
- ✅ **Zsh 集成** - Shell 深度集成

**最佳用途**:
- 安全性要求高的场景
- 研究与实验项目
- OpenAI GPT 模型用户
- 需要严格权限控制

### OpenCode - 开源多模型平台

**关键特性**:
- ✅ **75+ LLM 提供商** - 供应商中立
- ✅ **本地模型支持** - Ollama 集成
- ✅ **分布式配置** - .opencode/ 目录
- ✅ **LSP 集成** - 语言服务器协议
- ✅ **100% 开源** - MIT 许可证

**最佳用途**:
- 多模型切换需求
- 成本优化（本地模型）
- 开源优先的团队
- 需要高度定制化

### Kimi Code CLI - 超长上下文

**关键特性**:
- ✅ **256K 上下文** - 业界领先
- ✅ **Shell 深度集成** - Ctrl-K 快捷键
- ✅ **TOML 配置** - 集中配置管理
- ✅ **自动保存** - 配置自动持久化
- ✅ **Moonshot AI** - 中文友好

**最佳用途**:
- 超大项目分析
- 需要长上下文理解
- Shell 工作流用户
- 中文开发者

## 📊 配置对比速查表

| 维度 | Claude Code | Codex | OpenCode | Kimi |
|------|-------------|-------|----------|------|
| **系统提示** | CLAUDE.md | AGENTS.md | 分布式 | config.toml |
| **配置格式** | JSON | TOML | 多格式 | TOML |
| **Session 存储** | 按项目 | 按日期 | 实时 | ~/.kimi/ |
| **插件系统** | Skills+MCP | 无 | 扩展系统 | 无 |
| **LLM 支持** | Claude | GPT | 75+ | Kimi |
| **上下文窗口** | 200K | 128K | 取决于模型 | 256K |
| **Shell 集成** | 基础 | 中等 | 高级 | 深度 |
| **本地模型** | ❌ | ❌ | ✅ Ollama | ❌ |

## 🔄 迁移路径推荐

### Claude Code → Codex
1. CLAUDE.md → AGENTS.md
2. settings.json → config.toml (格式转换)
3. 重组 Session 目录（按日期）
4. Skills → 自定义脚本

### Claude Code → OpenCode
1. 拆分 CLAUDE.md → .opencode/agents/
2. Skills → .opencode/skills/
3. MCPs → .opencode/tools/
4. 配置多 LLM 提供商

### Codex → Claude Code
1. AGENTS.md → CLAUDE.md
2. config.toml → settings.json (格式转换)
3. 重组 Session 目录（按项目）
4. 添加 Skills 和 MCP 支持

### Claude Code → Oh My OpenCode
1. 保留所有 CLAUDE.md 配置（100% 兼容）
2. Skills 和 MCPs 直接复用
3. 添加智能体编排层
4. 启用 Ultrawork 模式

详见 [MIGRATION_QUICK_REFERENCE.md](MIGRATION_QUICK_REFERENCE.md)

## 💡 使用场景推荐

### 企业级项目
**推荐**: Claude Code CLI
- 强大的 Skills 系统和 MCP 集成
- 适合大型团队协作
- 企业支持和稳定性

### 研究与实验
**推荐**: Codex CLI
- 沙箱执行环境
- 严格隔离，安全性高
- OpenAI GPT 系列支持

### 多模型切换
**推荐**: OpenCode
- 75+ LLM 提供商支持
- 本地模型 Ollama
- 成本可控，开源免费

### 快速开发
**推荐**: Kimi Code CLI
- 256K 超长上下文
- Shell 深度集成
- Ctrl-K 快速调用

### 成本优化
**推荐**: OpenCode + Ollama
- 本地模型运行
- 零 API 成本
- 完全开源控制

### 从 Claude Code 迁移
**推荐**: Oh My OpenCode
- 100% 兼容 Claude Code 配置
- 无缝迁移
- 10x+ 性能提升

## 🛠️ 自动化工具

### convert_config.py
Python 配置转换工具，支持：
- CLAUDE.md ↔ AGENTS.md 转换
- JSON ↔ TOML 配置转换
- Session 目录重组
- 批量处理

### migrate_cli_tool.sh
Bash 迁移脚本，提供：
- 完整迁移工作流
- 自动备份
- 配置验证
- 回滚支持

## 📚 参考资源

### 官方文档
- [Claude Code CLI](https://code.claude.com) - Anthropic 官方文档
- [Codex CLI (OpenAI)](https://openai.com/codex) - OpenAI 文档
- [OpenCode GitHub](https://github.com/anomalyco/opencode) - 开源仓库
- [Kimi Code CLI](https://kimi.moonshot.ai) - Moonshot AI 文档

### 本项目资源
- [完整对比报告 (703 行)](CLI_TOOLS_CONFIG_COMPARISON.md) - 15 维度详细分析
- [快速参考指南 (371 行)](MIGRATION_QUICK_REFERENCE.md) - 迁移速查表
- [迁移示例](EXAMPLES.md) - 实际配置文件示例
- [可视化网站](https://devil-sx.github.io/code-agent-migration/) - 交互式展示

### 额外研究
- [Oh My OpenCode](research/oh-my-opencode.md) - 作为 Claude Code 迁移的增强选项
- [OpenCode 深度分析](research/opencode.md) - 架构与特性详解

## 🌟 项目特色

### 研究深度
- ✅ 基于 2026 年 2 月最新文档
- ✅ 覆盖 15 个配置维度
- ✅ 4 个工具全面对比
- ✅ 实际迁移案例验证

### 可视化设计
- ✅ 现代响应式设计（移动端适配）
- ✅ 交互式对比表格
- ✅ 迁移路径可视化
- ✅ 使用场景推荐

### 自动化部署
- ✅ GitHub Actions 自动部署
- ✅ GitHub Pages 托管
- ✅ 持续集成/持续部署（CI/CD）

## 🤝 贡献

欢迎贡献改进：
- 📝 补充或更新配置信息
- 🐛 报告错误或不准确信息
- 💡 提出新的对比维度
- 🛠️ 改进迁移工具
- 🌐 翻译文档到其他语言

## 📝 更新日志

- **2026-02-25**: 初始版本发布
  - ✅ 完成 4 个 CLI 工具全面对比 (15 维度)
  - ✅ 创建详细对比报告 (CLI_TOOLS_CONFIG_COMPARISON.md - 703 行)
  - ✅ 快速参考指南 (MIGRATION_QUICK_REFERENCE.md - 371 行)
  - ✅ 迁移示例文档 (EXAMPLES.md)
  - ✅ 自动化迁移工具 (Python + Bash)
  - ✅ 现代化可视化网站
  - ✅ GitHub Pages 自动化部署

## 📄 许可证

本项目对比分析文档和迁移工具以 MIT License 发布，供社区自由使用和改进。

各 CLI 工具遵循各自的许可证：
- Claude Code CLI: Anthropic 服务条款
- Codex CLI: OpenAI 使用协议
- OpenCode: MIT License
- Kimi Code CLI: Moonshot AI 服务条款

---

**项目仓库**: https://github.com/Devil-SX/code-agent-migration  
**可视化网站**: https://devil-sx.github.io/code-agent-migration/  
**完整报告**: [CLI_TOOLS_CONFIG_COMPARISON.md](CLI_TOOLS_CONFIG_COMPARISON.md)  
**快速参考**: [MIGRATION_QUICK_REFERENCE.md](MIGRATION_QUICK_REFERENCE.md)  
**生成时间**: 2026-02-25  
**状态**: ✅ 完成并持续更新

如有问题或建议，请创建 Issue 或提交 Pull Request。
