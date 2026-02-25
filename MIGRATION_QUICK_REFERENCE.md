# CLI 工具迁移快速参考

## 配置文件对照表

| 配置项 | Claude Code CLI | Codex CLI | OpenCode | Kimi Code CLI |
|--------|-----------------|-----------|----------|---------------|
| **系统提示** | `CLAUDE.md` | `AGENTS.md` | 分散在 `.opencode/` | `config.toml` |
| **全局配置位置** | `~/.claude/` | `~/.codex/` | `~/.config/opencode/` | `~/.kimi/` |
| **主配置文件** | `settings.json` | `config.toml` | `opencode.json` | `config.toml` |
| **Session 存储** | `~/.claude/projects/` | `~/.codex/sessions/YYYY/MM/DD/` | 不明确 | `~/.kimi/` |
| **插件目录** | `~/.claude/plugins/` | N/A | `.opencode/plugins/` | N/A |
| **Skills 目录** | `~/.claude/skills/` | N/A | `.opencode/skills/` | N/A |
| **MCP 配置** | `settings.json` → `mcpServers` | `config.toml` | `opencode.json` → `mcp` | `config.toml` → `providers` |

---

## 命令对照表

### 基础操作

| 功能 | Claude Code | Codex | OpenCode | Kimi |
|------|-------------|-------|----------|------|
| **启动** | `claude` | `codex` | `opencode` | `kimi` |
| **Headless 模式** | `claude --headless` | - | `opencode run "prompt"` | - |
| **恢复会话** | `claude /resume` | `codex resume --last` | `opencode --resume` | - |
| **危险模式** | `claude --dangerous-skip` | 配置 `approval.policy` | `opencode --dangerously-skip-permissions` | `default_yolo = true` |
| **指定目录** | `claude --cwd <path>` | `codex --cd <path>` | - | - |
| **配置覆盖** | - | `codex -c key=value` | - | - |

### 会话管理

| 功能 | Claude Code | Codex | OpenCode |
|------|-------------|-------|----------|
| **列出会话** | TUI 内操作 | `codex resume --all` | - |
| **恢复最后会话** | `/resume` | `codex resume --last` | - |
| **恢复特定会话** | `/resume <id>` | `codex resume <id>` | `opencode --resume <id>` |
| **查看状态** | `/status` | `/status` | - |

### 插件/MCP 管理

| 功能 | Claude Code | OpenCode |
|------|-------------|----------|
| **安装插件** | `claude plugin install <name>` | 手动或 npm |
| **列出 MCP** | TUI 或查看 `settings.json` | `opencode mcp list` |
| **添加 MCP** | 编辑 `settings.json` | `opencode mcp add` |

---

## 迁移检查清单

### 从 Claude Code 迁移到 Codex

- [ ] **配置文件**
  - [ ] 重命名 `~/.claude/CLAUDE.md` → `~/.codex/AGENTS.md`
  - [ ] 复制项目根目录 `CLAUDE.md` → `AGENTS.md`
  - [ ] 转换 `settings.json` 内容到 `config.toml`
    - [ ] 模型设置
    - [ ] 权限策略
    - [ ] MCP 服务器（检查兼容性）

- [ ] **环境变量**
  - [ ] 检查 `$PLUGIN_ROOT` 使用
  - [ ] 更新为 Codex 工作区路径

- [ ] **工作流调整**
  - [ ] 理解 Codex 的沙箱模型
  - [ ] 配置 `--add-dir` 用于额外目录访问
  - [ ] 适应自主执行模式（非交互式）

- [ ] **订阅/认证**
  - [ ] 确认有 ChatGPT Plus/Pro/Team/Enterprise 订阅
  - [ ] 运行 `codex` 完成认证

- [ ] **测试**
  - [ ] 在测试项目上验证基本功能
  - [ ] 检查文件访问权限
  - [ ] 验证 MCP 工具可用性

### 从 Claude Code 迁移到 OpenCode

- [ ] **配置文件**
  - [ ] 创建 `.opencode/` 目录结构
    - [ ] `agents/`
    - [ ] `skills/`
    - [ ] `plugins/`
    - [ ] `tools/`
  - [ ] 拆分 `CLAUDE.md` 内容到对应子目录
  - [ ] 创建 `opencode.json` 主配置

- [ ] **模型配置**
  - [ ] 选择模型提供商（Anthropic/OpenAI/Google/本地）
  - [ ] 配置 API credentials
  - [ ] 或安装 Ollama 用于本地模型

- [ ] **Skills 迁移**
  - [ ] 逐个迁移 Claude Code skills
  - [ ] 检查格式兼容性
  - [ ] 测试每个 skill

- [ ] **MCP 服务器**
  - [ ] 运行 `opencode mcp add` 添加服务器
  - [ ] 验证工具可用性

- [ ] **测试**
  - [ ] 测试多模型切换
  - [ ] 验证 headless 模式 (`opencode run`)
  - [ ] 检查权限处理

### 从 Codex 迁移到 Claude Code

- [ ] **配置文件**
  - [ ] 重命名 `~/.codex/AGENTS.md` → `~/.claude/CLAUDE.md`
  - [ ] 转换 `config.toml` 内容到 `settings.json`
  - [ ] 复制 MCP 服务器配置（JSON 格式）

- [ ] **订阅**
  - [ ] 确认有 Claude Pro 或 Claude Max 订阅
  - [ ] 运行 `claude` 完成登录

- [ ] **工作流调整**
  - [ ] 适应交互式推理模式
  - [ ] 学习使用斜杠命令（`/help`）
  - [ ] 熟悉 skills 系统

- [ ] **测试**
  - [ ] 验证上下文理解深度
  - [ ] 测试多文件编辑
  - [ ] 检查 Git 集成

### 从 OpenCode 迁移到专有工具

- [ ] **配置整合**
  - [ ] 合并分散的配置文件
  - [ ] 选择主要模型（Claude 或 GPT）

- [ ] **功能对比**
  - [ ] 列出 OpenCode 中使用的所有功能
  - [ ] 检查目标工具是否都支持
  - [ ] 找到替代方案或放弃某些功能

- [ ] **订阅/成本**
  - [ ] 计算订阅费用
  - [ ] 对比之前的 API 费用
  - [ ] 决定是否值得迁移

---

## 常见问题速查

### Q: 如何批量转换配置文件格式？

**JSON → TOML (Claude Code → Codex/Kimi)**:
```bash
# 使用 Python
python -c "import json, toml; print(toml.dumps(json.load(open('settings.json'))))" > config.toml
```

**TOML → JSON (Codex/Kimi → Claude Code)**:
```bash
# 使用 Python
python -c "import json, toml; print(json.dumps(toml.load(open('config.toml')), indent=2))" > settings.json
```

### Q: MCP 服务器配置可以通用吗？

**大部分可以**，但格式略有不同：

**Claude Code** (`settings.json`):
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

**OpenCode** (`opencode.json`):
```json
{
  "mcp": {
    "servers": {
      "filesystem": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
      }
    }
  }
}
```

### Q: Session 数据可以迁移吗？

**不建议直接迁移**，原因：
- 不同工具的 session 格式不同
- 路径编码和组织方式各异
- 可能导致数据损坏

**推荐做法**:
- 在旧工具中保留重要 session 引用
- 在新工具中重新开始
- 使用 `/resume` 概念重建上下文

### Q: 如何保留 skills/plugins？

1. **Claude Code → OpenCode**:
   - 复制 `~/.claude/skills/` → `.opencode/skills/`
   - 检查每个 skill 的格式
   - 可能需要调整 metadata

2. **跨工具共享**:
   - 创建 Git 仓库存储 skills
   - 使用符号链接（symlink）
   - 注意格式差异

### Q: 如何处理项目特定配置？

**最佳实践**:
1. 使用项目根目录配置文件（如 `CLAUDE.md`, `AGENTS.md`）
2. 纳入版本控制
3. 在 README 中说明工具要求
4. 提供多工具配置（如果团队使用不同工具）

**示例项目结构**:
```
my-project/
├── .claude/
│   └── skills/
├── .opencode/
│   └── skills/
├── CLAUDE.md
├── AGENTS.md
└── README.md  # 说明工具配置
```

### Q: 如何测试迁移是否成功？

**功能检查清单**:
- [ ] 基本代码生成
- [ ] 多文件编辑
- [ ] 文件读取和搜索
- [ ] 命令执行（Bash）
- [ ] Git 操作
- [ ] MCP 工具调用
- [ ] Skills/plugins 功能
- [ ] Session 恢复
- [ ] 权限策略生效

**性能对比**:
- Token 使用量
- 响应速度
- 代码质量
- 上下文理解准确性

---

## 混合使用策略

### 方案 A: 任务分工

```
┌─────────────────────────────────────┐
│   初始开发 & 架构设计                │
│   → Claude Code CLI                │
│   (深度推理, 交互式)                │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   代码审查 & 调试                    │
│   → Codex CLI                       │
│   (逻辑精确, 沙箱安全)              │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   CI/CD & 自动化                     │
│   → OpenCode (headless)             │
│   (可编程, 多模型)                   │
└─────────────────────────────────────┘
```

### 方案 B: 按成本优化

```
日常查询 → Gemini (免费) 通过 OpenCode
    ↓
中等任务 → Copilot CLI ($10/月)
    ↓
复杂任务 → Claude Code / Codex (订阅)
    ↓
本地开发 → Ollama + OpenCode (免费)
```

### 方案 C: 团队协作

```
个人开发者:
  - Claude Code (交互)
  - Kimi (终端自动化)

团队协作:
  - OpenCode (统一 MCP)
  - Git hooks (自动格式化)

CI/CD:
  - Codex (安全沙箱)
  - OpenCode headless (灵活)
```

---

## 紧急回退计划

如果迁移后遇到问题，快速回退：

1. **保留旧配置**:
   ```bash
   # 迁移前备份
   cp -r ~/.claude ~/.claude.backup
   cp -r ~/.codex ~/.codex.backup
   ```

2. **快速恢复**:
   ```bash
   # 回退配置
   rm -rf ~/.claude
   mv ~/.claude.backup ~/.claude
   ```

3. **并行运行**:
   - 两个工具不冲突，可以同时安装
   - 逐步迁移项目而非一次性全部迁移

4. **寻求帮助**:
   - Claude Code: [GitHub Issues](https://github.com/anthropics/claude-code/issues)
   - Codex: [OpenAI Community](https://community.openai.com)
   - OpenCode: [GitHub Discussions](https://github.com/anomalyco/opencode/discussions)

---

## 下一步

完成迁移后：

1. **优化配置**:
   - 根据使用习惯调整权限策略
   - 配置常用 skills/plugins
   - 设置键盘快捷键

2. **学习进阶功能**:
   - 阅读官方文档
   - 加入社区讨论
   - 尝试高级 skills

3. **分享经验**:
   - 记录迁移过程
   - 贡献配置模板
   - 帮助其他用户

4. **持续改进**:
   - 监控性能和成本
   - 定期更新工具
   - 关注新功能发布

---

**最后更新**: 2026-02-25
**维护者**: 根据社区反馈持续更新
