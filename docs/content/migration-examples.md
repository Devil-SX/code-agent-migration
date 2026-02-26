# 使用示例

本文档提供常见迁移场景的实际操作示例。

## 场景 1: 从 Claude Code 迁移到 Codex

### 背景
团队使用 Claude Code 进行开发，现在希望尝试 Codex 的沙箱环境和 CI/CD 集成能力。

### 步骤

#### 1. 诊断当前环境

```bash
./tools/migrate_cli_tool.sh diagnose
```

**输出示例**:
```
========================================
环境诊断
========================================

检查已安装的 CLI 工具...

✓ claude 已安装
✗ codex 未安装
✗ opencode 未安装
✗ kimi 未安装

检查配置目录...

✓ Claude Code: /home/user/.claude
⚠ Codex: 未找到配置
⚠ OpenCode: 未找到配置
⚠ Kimi: 未找到配置
```

#### 2. 安装 Codex CLI

```bash
# 根据 OpenAI 官方文档安装
npm install -g @openai/codex-cli
# 或使用其他安装方法
```

#### 3. 备份现有配置

```bash
# 自动备份（迁移脚本会自动做）
cp -r ~/.claude ~/.claude.backup.manual

# 查看备份
ls -la ~/.claude.backup.manual/
```

#### 4. 执行迁移

```bash
./tools/migrate_cli_tool.sh claude-to-codex
```

**输出示例**:
```
========================================
迁移: Claude Code → Codex CLI
========================================

ℹ 步骤 1/5: 备份现有配置
ℹ 备份 /home/user/.claude → /home/user/.claude.backup.20260225_143022
✓ 备份完成

ℹ 步骤 2/5: 创建 Codex 配置目录
✓ 创建目录: /home/user/.codex

ℹ 步骤 3/5: 转换系统提示文件
✓ CLAUDE.md → AGENTS.md

ℹ 步骤 4/5: 转换配置文件
ℹ 使用 convert_config.py 转换...
✓ 成功转换 Claude Code 配置到 Codex 格式
  输入: /home/user/.claude/settings.json
  输出: /home/user/.codex/config.toml

⚠ 警告: 请手动检查并调整以下配置:
  - approval.policy (权限策略)
  - sandbox 设置
  - MCP 服务器格式

ℹ 步骤 5/5: 手动步骤

⚠ 请手动完成以下步骤:
  1. 运行 'codex' 完成认证
  2. 检查 ~/.codex/config.toml 配置
  3. 根据需要调整沙箱和审批策略
  4. 测试基本功能

✓ 迁移准备完成!
```

#### 5. 手动调整配置

编辑 `~/.codex/config.toml`:

```toml
[model]
default = "gpt-5.3-codex"

[approval]
policy = "ask"  # 或 "auto" 用于 CI/CD

[sandbox]
network = "restricted"
filesystem = "workspace-only"

# MCP 服务器 (如果有)
[mcp.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]
```

#### 6. 认证和测试

```bash
# 完成认证
codex

# 测试基本功能
cd /home/user/test-project
codex "List all Python files"

# 测试 MCP 工具
codex "Read the README.md file"

# 测试代码生成
codex "Add a hello world function to main.py"
```

#### 7. 迁移项目级配置

对于每个项目：

```bash
cd /path/to/project

# 如果有 CLAUDE.md
if [ -f CLAUDE.md ]; then
  cp CLAUDE.md AGENTS.md
  git add AGENTS.md
  git commit -m "Add Codex configuration"
fi
```

---

## 场景 2: 从 Codex 迁移到 Claude Code

### 背景
习惯了 Codex 的自主模式，但想尝试 Claude 的交互式推理和深度上下文理解。

### 步骤

#### 1. 执行迁移

```bash
./tools/migrate_cli_tool.sh codex-to-claude
```

#### 2. 手动创建 Claude 订阅

访问 [claude.ai](https://claude.ai) 订阅 Claude Pro 或 Max。

#### 3. 调整 settings.json

编辑 `~/.claude/settings.json`:

```json
{
  "permissions": {
    "mode": "ask"
  },
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]
    }
  },
  "cleanupIntervals": {
    "sessions": 30,
    "logs": 7
  }
}
```

#### 4. 添加 Skills

```bash
# 克隆社区 skills
mkdir -p ~/.claude/skills
cd ~/.claude/skills

# 示例: 添加 commit skill
git clone https://github.com/example/commit-skill.git commit
```

#### 5. 测试交互模式

```bash
cd /path/to/project
claude

# 在 Claude Code 中
/help
/status
# 尝试一个简单任务
"Add a README.md file with project description"
```

---

## 场景 3: 多工具混合使用

### 背景
希望结合各工具优势：Claude 用于初始开发，Codex 用于审查，OpenCode 用于 CI/CD。

### 设置

#### 1. 安装所有工具

```bash
# Claude Code
npm install -g @anthropic/claude-code

# Codex
npm install -g @openai/codex-cli

# OpenCode
npm install -g opencode
```

#### 2. 为每个工具配置独立环境

**Claude Code** (`~/.claude/CLAUDE.md`):
```markdown
# Development Guidelines

Use Claude Code for:
- Initial feature implementation
- Architecture decisions
- Complex refactoring

Prefer interactive mode for design discussions.
```

**Codex** (`~/.codex/AGENTS.md`):
```markdown
# Code Review Guidelines

Use Codex for:
- Code review and debugging
- Security analysis
- Performance optimization

Run in sandbox mode for untrusted code.
```

**OpenCode** (`~/.config/opencode/opencode.json`):
```json
{
  "providers": {
    "anthropic": {
      "apiKey": "sk-ant-..."
    },
    "openai": {
      "apiKey": "sk-..."
    }
  },
  "defaultProvider": "anthropic",
  "mcp": {
    "servers": {
      "filesystem": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
      }
    }
  }
}
```

#### 3. 项目配置

在项目根目录创建所有配置文件：

```bash
cd /path/to/project

# Claude 配置
cat > CLAUDE.md << 'EOF'
# Project: MyApp

## Tech Stack
- Node.js + Express
- React frontend
- PostgreSQL database

## Coding Standards
- Use TypeScript
- Follow Airbnb style guide
- Write tests for all features
EOF

# Codex 配置
cat > AGENTS.md << 'EOF'
# Code Review Focus

## Security Checklist
- [ ] No hardcoded secrets
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS protection

## Performance
- [ ] Database query optimization
- [ ] Caching strategy
- [ ] Bundle size optimization
EOF

# README 说明工具使用
cat >> README.md << 'EOF'

## AI Tools

This project uses multiple AI coding tools:

- **Claude Code**: Initial development (`claude`)
- **Codex**: Code review (`codex`)
- **OpenCode**: CI/CD automation (`opencode`)

See `CLAUDE.md` and `AGENTS.md` for tool-specific guidelines.
EOF
```

#### 4. 工作流示例

```bash
# Step 1: 初始开发 (Claude Code)
claude "Implement user authentication with JWT"
# 交互式开发，Claude 显示推理过程

# Step 2: 代码审查 (Codex)
codex "Review the authentication code for security issues"
# Codex 在沙箱中分析代码

# Step 3: CI/CD (OpenCode)
opencode run --headless "Run tests and deploy to staging"
# OpenCode 自动化执行
```

---

## 场景 4: 配置文件格式转换

### JSON 转 TOML

#### Claude settings.json
```json
{
  "permissions": {
    "mode": "ask"
  },
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
    }
  }
}
```

#### 转换命令
```bash
python3 tools/convert_config.py ~/.claude/settings.json -o output.toml
```

#### 输出 TOML
```toml
[permissions]
mode = "ask"

[mcpServers.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
```

### TOML 转 JSON

#### Codex config.toml
```toml
[model]
default = "gpt-5.3-codex"

[approval]
policy = "ask"

[sandbox]
network = "restricted"
```

#### 转换命令
```bash
python3 tools/convert_config.py ~/.codex/config.toml -o output.json
```

#### 输出 JSON
```json
{
  "model": {
    "default": "gpt-5.3-codex"
  },
  "approval": {
    "policy": "ask"
  },
  "sandbox": {
    "network": "restricted"
  }
}
```

### 智能转换 (Claude ↔ Codex)

#### Claude → Codex
```bash
python3 tools/convert_config.py \
  ~/.claude/settings.json \
  --to-codex ~/.codex/config.toml
```

会智能映射：
- `permissions.mode` → `approval.policy`
- `mcpServers` → `mcp`
- 添加 Codex 特有的 `sandbox` 配置

#### Codex → Claude
```bash
python3 tools/convert_config.py \
  ~/.codex/config.toml \
  --to-claude ~/.claude/settings.json
```

会智能映射：
- `approval.policy` → `permissions.mode`
- `mcp` → `mcpServers`
- 添加 Claude 特有的 `cleanupIntervals`

---

## 场景 5: 紧急回退

### 问题
迁移到 Codex 后发现某些 MCP 工具不兼容，需要紧急回退到 Claude Code。

### 快速回退

#### 1. 停止使用新工具
```bash
# 确认当前没有运行中的 codex 会话
pkill -f codex || true
```

#### 2. 恢复配置
```bash
# 查找备份
ls -la ~/.claude.backup.*

# 恢复最新备份
LATEST_BACKUP=$(ls -t ~/.claude.backup.* | head -1)
rm -rf ~/.claude
cp -r "$LATEST_BACKUP" ~/.claude

echo "Restored from: $LATEST_BACKUP"
```

#### 3. 验证恢复
```bash
# 检查配置完整性
ls -la ~/.claude/
cat ~/.claude/settings.json

# 测试 Claude Code
claude --version
cd /path/to/project
claude "Hello, verify everything works"
```

#### 4. 清理失败的迁移
```bash
# 可选：删除 Codex 配置
rm -rf ~/.codex

# 或保留以便后续重试
mv ~/.codex ~/.codex.failed_migration
```

---

## 场景 6: 团队迁移策略

### 背景
10 人团队，统一从 Claude Code 迁移到混合使用 Claude + Codex。

### 渐进式迁移计划

#### 第 1 周: 试点

**参与者**: 2 名高级开发者

```bash
# 每人独立尝试迁移
./tools/migrate_cli_tool.sh diagnose
./tools/migrate_cli_tool.sh claude-to-codex

# 并行使用两周，记录问题
```

**收集反馈**:
- 哪些功能工作良好？
- 哪些配置需要调整？
- MCP 工具兼容性如何？

#### 第 2-3 周: 扩展试点

**参与者**: 再增加 3 名开发者

```bash
# 基于第一周反馈，更新迁移脚本
# 添加团队特定配置模板

# 创建团队配置模板
cat > templates/team-codex-config.toml << 'EOF'
[model]
default = "gpt-5.3-codex"

[approval]
policy = "ask"

[sandbox]
network = "full"  # 团队决定开放网络
filesystem = "workspace-plus"

[mcp.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "/company/projects"]

[mcp.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]
EOF

# 试点成员使用模板
cp templates/team-codex-config.toml ~/.codex/config.toml
```

#### 第 4 周: 全员迁移

**准备**:
1. 文档化最佳实践
2. 录制演示视频
3. 准备内部支持渠道（Slack #ai-tools-support）

**迁移日**:
```bash
# 全员执行
./tools/migrate_cli_tool.sh diagnose
./tools/migrate_cli_tool.sh claude-to-codex

# 使用团队模板
cp /shared/templates/team-codex-config.toml ~/.codex/config.toml

# 团队会议：解决问题
```

#### 持续支持

创建内部知识库：

```markdown
# 团队 AI 工具使用指南

## 何时使用 Claude Code
- 初始功能开发
- 架构设计讨论
- 复杂重构

## 何时使用 Codex
- 代码审查
- 安全分析
- CI/CD 集成

## 常见问题
1. MCP 工具不工作 → 检查 config.toml 中的路径
2. 权限提示太频繁 → 调整 approval.policy
3. ...
```

---

## 故障排查

### 问题 1: 迁移脚本失败

**症状**:
```
✗ 转换失败: [Errno 2] No such file or directory: '/home/user/.claude/settings.json'
```

**解决**:
```bash
# 检查文件是否存在
ls -la ~/.claude/settings.json

# 如果不存在，创建默认配置
cat > ~/.claude/settings.json << 'EOF'
{
  "permissions": {
    "mode": "ask"
  },
  "mcpServers": {}
}
EOF

# 重新运行迁移
./tools/migrate_cli_tool.sh claude-to-codex
```

### 问题 2: Python toml 模块缺失

**症状**:
```
错误: 需要安装 toml 库
运行: pip install toml
```

**解决**:
```bash
# 安装 toml
pip install toml

# 或使用 pip3
pip3 install toml

# 验证安装
python3 -c "import toml; print('OK')"
```

### 问题 3: MCP 工具迁移后不工作

**症状**:
Codex 报告 "MCP server not responding"

**解决**:
```bash
# 1. 检查配置格式
cat ~/.codex/config.toml | grep -A 5 "\[mcp"

# 2. 手动测试 MCP 命令
npx -y @modelcontextprotocol/server-filesystem /path

# 3. 查看日志
codex --verbose

# 4. 如果需要，重新配置 MCP
codex mcp add
```

---

## 进阶技巧

### 技巧 1: 使用符号链接共享配置

```bash
# 创建共享配置目录
mkdir -p ~/shared-ai-configs

# 移动配置并创建符号链接
mv ~/.claude/skills ~/shared-ai-configs/skills
ln -s ~/shared-ai-configs/skills ~/.claude/skills
ln -s ~/shared-ai-configs/skills ~/.config/opencode/skills

# 现在 skills 在工具间共享
```

### 技巧 2: 自动化备份

添加到 `~/.bashrc` 或 `~/.zshrc`:

```bash
# 每天自动备份 AI 工具配置
alias backup-ai-configs='tar -czf ~/backups/ai-configs-$(date +%Y%m%d).tar.gz ~/.claude ~/.codex ~/.config/opencode ~/.kimi'

# 使用: backup-ai-configs
```

### 技巧 3: 快速切换配置档案

```bash
# 创建多个配置档案
~/.claude/
  ├── settings.work.json
  ├── settings.personal.json
  └── settings.json -> settings.work.json  # 符号链接

# 切换档案
ln -sf ~/.claude/settings.personal.json ~/.claude/settings.json
```

---

**最后更新**: 2026-02-25
**维护**: 欢迎贡献更多实用示例
