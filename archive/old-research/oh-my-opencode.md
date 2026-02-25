# Oh My OpenCode 研究报告

## 项目概览

**Oh My OpenCode** 是一个为 OpenCode 设计的多模型 AI 智能体编排工具（Agent Harness），将单一 AI 智能体转变为一个协调的开发团队。

- **GitHub**: https://github.com/code-yeongyu/oh-my-opencode
- **Stars**: 34,000+
- **Contributors**: 130+
- **主要语言**: TypeScript (99.4%)
- **协议**: SUL-1.0
- **最新版本**: v3.8.5

## 核心理念

> "If Claude Code does in 7 days what a human does in 3 months, Sisyphus does it in 1 hour."

Oh My OpenCode 的设计哲学是：
- 不锁定任何单一 AI 提供商
- 提供开箱即用的专业智能体编排
- 完全兼容 Claude Code 配置
- 多模型协同工作

## 核心特性

### 1. 多智能体系统 (Discipline Agents)

Oh My OpenCode 内置了多个专业智能体：

#### Sisyphus (主编排者)
- **模型**: Claude Opus 4-6 / Kimi K2.5 / GLM-5
- **角色**: 主要编排者，负责规划、委派任务给专家智能体，并驱动任务完成
- **特点**: 积极的并行执行，不会半途而废

#### Hephaestus (深度工作者)
- **模型**: GPT-5.3-codex
- **角色**: 自主深度工作者，探索代码库、研究模式并端到端执行
- **特点**: "The Legitimate Craftsman"（合法工匠）

#### Prometheus (战略规划者)
- **模型**: Claude Opus 4-6 / Kimi K2.5 / GLM-5
- **角色**: 战略规划者，采用面试模式进行规划
- **特点**: 在编写任何代码之前识别范围并构建详细计划

#### Oracle (架构顾问)
- **角色**: 只读、高质量推理模型，用于调试和架构决策
- **用途**: 复杂架构设计、调试困难问题

#### Librarian (文档检索)
- **角色**: 专业代码库理解智能体
- **能力**: 多仓库分析、搜索远程代码库、检索官方文档、使用 GitHub CLI、Context7 和 Web Search

#### Explore (代码探索)
- **角色**: 代码库的上下文 grep
- **用途**: 快速查找文件结构、模式发现

### 2. Ultrawork 模式

**一键启动** 所有智能体，持续工作直到任务完成：
```bash
ultrawork  # 或 ulw
```

**特点**：
- 自动激活所有智能体
- 并行执行任务
- 不停止直到100%完成

### 3. 智能体编排系统

通过 **类别 (Category)** 自动选择合适的模型：

| Category | 用途 |
|----------|------|
| `visual-engineering` | 前端、UI/UX、设计 |
| `deep` | 自主研究 + 执行 |
| `quick` | 单文件更改、修正错误 |
| `ultrabrain` | 硬逻辑、架构决策 |
| `artistry` | 高度创意/艺术任务 |
| `writing` | 文档、散文、技术写作 |

### 4. 哈希锚定编辑工具 (Hash-Anchored Edits)

灵感来自 [oh-my-pi](https://github.com/can1357/oh-my-pi)，解决了 "harness problem"：

```
11#VK| function hello() {
22#XJ|   return "world";
33#MB| }
```

**优势**：
- 每行内容带有哈希标签
- 智能体通过标签引用编辑
- 文件变更后哈希不匹配会拒绝编辑
- 避免空格重现和过时行错误

**性能提升**: Grok Code Fast 1 从 6.7% → 68.3% 成功率

### 5. LSP + AST-Grep 集成

- **LSP 支持**: `lsp_rename`, `lsp_goto_definition`, `lsp_find_references`, `lsp_diagnostics`
- **AST-Grep**: 支持 25 种语言的模式感知代码搜索和重写
- **Tmux 集成**: 完整的交互式终端支持

### 6. 技能系统 (Skills)

技能不仅是提示词，还包括：
- 领域调优的系统指令
- 按需嵌入的 MCP 服务器
- 作用域权限控制

**内置技能**：
- `playwright`: 浏览器自动化
- `git-master`: 原子提交、rebase 操作
- `frontend-ui-ux`: 设计优先的 UI

### 7. 后台智能体 (Background Agents)

并行运行多个专家智能体：
```typescript
delegate_task(subagent_type="explore", run_in_background=true, ...)
delegate_task(subagent_type="librarian", run_in_background=true, ...)
// 继续立即工作，需要时收集结果
```

### 8. 内置 MCP 服务器

- **Exa**: 网页搜索
- **Context7**: 官方文档
- **Grep.app**: GitHub 搜索

### 9. Ralph Loop (自引用循环)

```bash
/ulw-loop  # 或 /ralph-loop
```

**特点**：
- 自引用开发循环
- 持续运行直到任务完成
- 最大迭代次数：可配置（默认100）

### 10. 深度初始化 (`/init-deep`)

自动生成分层的 `AGENTS.md` 文件：
```
project/
├── AGENTS.md              ← 项目级上下文
├── src/
│   ├── AGENTS.md          ← src 特定上下文
│   └── components/
│       └── AGENTS.md      ← 组件特定上下文
```

## Claude Code 兼容性

Oh My OpenCode **完全兼容** Claude Code 的配置：

- ✅ **Hooks**: 所有钩子系统
- ✅ **Commands**: 所有命令
- ✅ **Skills**: 所有技能
- ✅ **MCPs**: 所有 MCP 服务器
- ✅ **Plugins**: 所有插件

**迁移成本**: 零。所有现有配置无需修改即可使用。

## 工作流程特性

### Todo 管理
- **Todo Enforcer**: 智能体闲置时自动拉回
- 实时进度跟踪
- 强制任务完成

### Comment Checker
- 消除 AI 生成的低质量注释
- 代码可读性如同资深工程师编写

### Think Mode
- 深度思考模式
- 复杂问题分析

### IntentGate
- 在分类或行动之前分析真实用户意图
- 避免字面误解

## 配置系统

### 配置文件位置
- 项目级: `.opencode/oh-my-opencode.jsonc` 或 `.json`
- 用户级: `~/.config/opencode/oh-my-opencode.jsonc` 或 `.json`

### 支持 JSONC
- 支持注释
- 支持尾随逗号

### 配置选项
- **智能体**: 覆盖模型、温度、提示和权限
- **后台任务**: 配置每个提供商/模型的并发限制
- **类别**: 领域特定任务委派
- **Hooks**: 25+ 内置钩子，全部可通过 `disabled_hooks` 配置
- **MCPs**: 内置 websearch、context7、grep_app
- **实验性功能**: 积极截断、自动恢复等

## 安装方式

### 为人类用户
将以下提示粘贴到 LLM 智能体中：
```
Install and configure oh-my-opencode by following the instructions here:
https://raw.githubusercontent.com/code-yeongyu/oh-my-opencode/refs/heads/master/docs/guide/installation.md
```

### CLI 安装
```bash
bunx oh-my-opencode install # 推荐
npx oh-my-opencode install  # 备选
```

### 支持平台
- macOS (ARM64, x64)
- Linux (x64, ARM64, Alpine/musl)
- Windows (x64)

## 架构设计

### 分布式架构
- 客户端/服务器架构
- 支持远程驱动
- TUI 前端只是众多可能的客户端之一

### 会话系统
- **会话工具**: 列表、读取、搜索和分析会话历史
- 多会话并行
- 会话共享链接

## 实际使用案例

### 用户评价

> "It made me cancel my Cursor subscription. Unbelievable things are happening in the open source community." - Arthur Guiot

> "Knocked out 8000 eslint warnings with Oh My Opencode, just in a day" - Jacob Ferrari

> "I converted a 45k line tauri app into a SaaS web app overnight using Ohmyopencode and ralph loop." - James Hargis

> "Oh My OpenCode Is Actually Insane" - Darren Builds AI (YouTube)

### 使用场景
1. **大规模重构**: 处理数千行代码的 lint 警告
2. **架构迁移**: 将大型应用从 Tauri 迁移到 Web SaaS
3. **探索陌生代码库**: 快速理解和导航
4. **复杂功能开发**: 多模块并行开发

## 性能指标

### 开发效率
- **Claude Code**: 7天完成人工3个月的工作
- **Sisyphus**: 1小时完成相同工作

### 成功率提升
- **编辑工具改进**: Grok Code Fast 1 从 6.7% → 68.3%

## 企业采用

被以下专业人士/企业使用：
- [Indent](https://indentcorp.com) - 影响力营销解决方案
- [Google](https://google.com)
- [Microsoft](https://microsoft.com)
- [ELESTYLE](https://elestyle.jp) - 移动支付网关

## 技术栈

- **运行时**: Bun / Node.js (CLI 发布后不需要运行时)
- **语言**: TypeScript (99.4%)
- **包管理**: 多包架构
- **测试**: 内置测试框架

## 与竞品对比

### vs Claude Code
- ✅ 不锁定提供商
- ✅ 开源
- ✅ 多模型支持
- ✅ LSP 开箱即用
- ✅ TUI 优先

### vs OpenCode
- ✅ 专业智能体团队
- ✅ 开箱即用的编排
- ✅ 多模型优化
- ✅ 更丰富的工具集成

## 许可证

**SUL-1.0** (Sisyphus Universal License)

## 作者说明

> "I burned through $24K in LLM tokens on personal projects. Tried every tool. Configured everything to death. OpenCode won. Every problem I hit, the fix is baked into this plugin. Install and go."
> 
> - code-yeongyu

## 未来发展

### Sisyphus Labs
正在构建 Sisyphus 的完整产品化版本，定义前沿智能体的未来。

加入候补名单: https://sisyphuslabs.ai

## 社区

- **Discord**: https://discord.gg/PUwSMR9XNk
- **Twitter**: @justsisyphus
- **GitHub**: @code-yeongyu

## 参考资源

1. [官方文档](https://github.com/code-yeongyu/oh-my-opencode/blob/dev/docs/guide/overview.md)
2. [安装指南](https://github.com/code-yeongyu/oh-my-opencode/blob/dev/docs/guide/installation.md)
3. [特性文档](https://github.com/code-yeongyu/oh-my-opencode/blob/dev/docs/reference/features.md)
4. [配置文档](https://github.com/code-yeongyu/oh-my-opencode/blob/dev/docs/reference/configuration.md)
5. [Ultrawork 宣言](https://github.com/code-yeongyu/oh-my-opencode/blob/dev/docs/manifesto.md)

---

**最后更新**: 2026年2月25日
