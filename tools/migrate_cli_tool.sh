#!/bin/bash
# CLI 工具配置迁移助手脚本
# 支持: Claude Code ↔ Codex ↔ OpenCode ↔ Kimi

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印函数
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# 检查工具是否安装
check_tool() {
    if command -v "$1" &> /dev/null; then
        print_success "$1 已安装"
        return 0
    else
        print_warning "$1 未安装"
        return 1
    fi
}

# 备份目录
backup_directory() {
    local src="$1"
    local backup="${src}.backup.$(date +%Y%m%d_%H%M%S)"

    if [ -d "$src" ]; then
        print_info "备份 $src → $backup"
        cp -r "$src" "$backup"
        print_success "备份完成"
        echo "$backup"
        return 0
    else
        print_warning "目录不存在: $src"
        return 1
    fi
}

# 迁移: Claude Code → Codex
migrate_claude_to_codex() {
    print_header "迁移: Claude Code → Codex CLI"

    # 检查源目录
    if [ ! -d "$HOME/.claude" ]; then
        print_error "Claude Code 配置目录不存在: $HOME/.claude"
        return 1
    fi

    # 备份
    print_info "步骤 1/5: 备份现有配置"
    backup_directory "$HOME/.claude"
    if [ -d "$HOME/.codex" ]; then
        backup_directory "$HOME/.codex"
    fi

    # 创建 Codex 目录
    print_info "步骤 2/5: 创建 Codex 配置目录"
    mkdir -p "$HOME/.codex"
    print_success "创建目录: $HOME/.codex"

    # 转换系统提示文件
    print_info "步骤 3/5: 转换系统提示文件"
    if [ -f "$HOME/.claude/CLAUDE.md" ]; then
        cp "$HOME/.claude/CLAUDE.md" "$HOME/.codex/AGENTS.md"
        print_success "CLAUDE.md → AGENTS.md"
    else
        print_warning "未找到 CLAUDE.md"
    fi

    # 配置文件转换
    print_info "步骤 4/5: 转换配置文件"
    if [ -f "$HOME/.claude/settings.json" ]; then
        if command -v python3 &> /dev/null; then
            print_info "使用 convert_config.py 转换..."
            # 这里假设 convert_config.py 在同目录
            SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
            python3 "$SCRIPT_DIR/convert_config.py" \
                "$HOME/.claude/settings.json" \
                --to-codex "$HOME/.codex/config.toml"
        else
            print_warning "Python3 未安装，跳过智能转换"
            print_info "请手动创建 $HOME/.codex/config.toml"
        fi
    else
        print_warning "未找到 settings.json"
    fi

    # 提示手动步骤
    print_info "步骤 5/5: 手动步骤"
    echo ""
    print_warning "请手动完成以下步骤:"
    echo "  1. 运行 'codex' 完成认证"
    echo "  2. 检查 ~/.codex/config.toml 配置"
    echo "  3. 根据需要调整沙箱和审批策略"
    echo "  4. 测试基本功能"
    echo ""

    print_success "迁移准备完成!"
}

# 迁移: Codex → Claude Code
migrate_codex_to_claude() {
    print_header "迁移: Codex CLI → Claude Code"

    # 检查源目录
    if [ ! -d "$HOME/.codex" ]; then
        print_error "Codex 配置目录不存在: $HOME/.codex"
        return 1
    fi

    # 备份
    print_info "步骤 1/5: 备份现有配置"
    backup_directory "$HOME/.codex"
    if [ -d "$HOME/.claude" ]; then
        backup_directory "$HOME/.claude"
    fi

    # 创建 Claude 目录
    print_info "步骤 2/5: 创建 Claude Code 配置目录"
    mkdir -p "$HOME/.claude"
    mkdir -p "$HOME/.claude/projects"
    mkdir -p "$HOME/.claude/skills"
    mkdir -p "$HOME/.claude/plugins"
    print_success "创建目录结构"

    # 转换系统提示文件
    print_info "步骤 3/5: 转换系统提示文件"
    if [ -f "$HOME/.codex/AGENTS.md" ]; then
        cp "$HOME/.codex/AGENTS.md" "$HOME/.claude/CLAUDE.md"
        print_success "AGENTS.md → CLAUDE.md"
    else
        print_warning "未找到 AGENTS.md"
    fi

    # 配置文件转换
    print_info "步骤 4/5: 转换配置文件"
    if [ -f "$HOME/.codex/config.toml" ]; then
        if command -v python3 &> /dev/null; then
            print_info "使用 convert_config.py 转换..."
            SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
            python3 "$SCRIPT_DIR/convert_config.py" \
                "$HOME/.codex/config.toml" \
                --to-claude "$HOME/.claude/settings.json"
        else
            print_warning "Python3 未安装，跳过智能转换"
            print_info "请手动创建 $HOME/.claude/settings.json"
        fi
    else
        print_warning "未找到 config.toml"
    fi

    # 提示手动步骤
    print_info "步骤 5/5: 手动步骤"
    echo ""
    print_warning "请手动完成以下步骤:"
    echo "  1. 运行 'claude' 完成登录"
    echo "  2. 检查 ~/.claude/settings.json 配置"
    echo "  3. 根据需要添加 plugins 和 skills"
    echo "  4. 配置 MCP 服务器"
    echo "  5. 测试基本功能"
    echo ""

    print_success "迁移准备完成!"
}

# 迁移: Claude Code → OpenCode
migrate_claude_to_opencode() {
    print_header "迁移: Claude Code → OpenCode"

    # 检查源目录
    if [ ! -d "$HOME/.claude" ]; then
        print_error "Claude Code 配置目录不存在: $HOME/.claude"
        return 1
    fi

    # 备份
    print_info "步骤 1/4: 备份现有配置"
    backup_directory "$HOME/.claude"

    # 创建 OpenCode 目录
    print_info "步骤 2/4: 创建 OpenCode 配置目录"
    mkdir -p "$HOME/.config/opencode"
    mkdir -p "$HOME/.config/opencode/agents"
    mkdir -p "$HOME/.config/opencode/skills"
    mkdir -p "$HOME/.config/opencode/plugins"
    mkdir -p "$HOME/.config/opencode/tools"
    mkdir -p "$HOME/.config/opencode/commands"
    print_success "创建目录结构"

    # 复制 skills
    print_info "步骤 3/4: 迁移 skills"
    if [ -d "$HOME/.claude/skills" ]; then
        for skill in "$HOME/.claude/skills"/*; do
            if [ -d "$skill" ]; then
                skill_name=$(basename "$skill")
                cp -r "$skill" "$HOME/.config/opencode/skills/"
                print_success "迁移 skill: $skill_name"
            fi
        done
    else
        print_warning "未找到 skills 目录"
    fi

    # 提示手动步骤
    print_info "步骤 4/4: 手动步骤"
    echo ""
    print_warning "请手动完成以下步骤:"
    echo "  1. 创建 ~/.config/opencode/opencode.json 配置文件"
    echo "  2. 拆分 CLAUDE.md 内容到对应子目录"
    echo "  3. 配置模型提供商 (Anthropic/OpenAI/Google/本地)"
    echo "  4. 使用 'opencode mcp add' 添加 MCP 服务器"
    echo "  5. 检查每个 skill 的格式兼容性"
    echo "  6. 测试基本功能"
    echo ""

    print_success "迁移准备完成!"
}

# 诊断当前环境
diagnose_environment() {
    print_header "环境诊断"

    echo ""
    print_info "检查已安装的 CLI 工具..."
    echo ""

    check_tool "claude" && CLAUDE_INSTALLED=1 || CLAUDE_INSTALLED=0
    check_tool "codex" && CODEX_INSTALLED=1 || CODEX_INSTALLED=0
    check_tool "opencode" && OPENCODE_INSTALLED=1 || OPENCODE_INSTALLED=0
    check_tool "kimi" && KIMI_INSTALLED=1 || KIMI_INSTALLED=0

    echo ""
    print_info "检查配置目录..."
    echo ""

    [ -d "$HOME/.claude" ] && print_success "Claude Code: $HOME/.claude" || print_warning "Claude Code: 未找到配置"
    [ -d "$HOME/.codex" ] && print_success "Codex: $HOME/.codex" || print_warning "Codex: 未找到配置"
    [ -d "$HOME/.config/opencode" ] && print_success "OpenCode: $HOME/.config/opencode" || print_warning "OpenCode: 未找到配置"
    [ -d "$HOME/.kimi" ] && print_success "Kimi: $HOME/.kimi" || print_warning "Kimi: 未找到配置"

    echo ""
    print_info "检查依赖工具..."
    echo ""

    check_tool "python3"
    check_tool "git"
    check_tool "jq"

    echo ""
}

# 显示帮助
show_help() {
    cat << EOF
CLI 工具配置迁移助手

用法:
  $0 <command>

命令:
  claude-to-codex      从 Claude Code 迁移到 Codex CLI
  codex-to-claude      从 Codex CLI 迁移到 Claude Code
  claude-to-opencode   从 Claude Code 迁移到 OpenCode
  diagnose             诊断当前环境
  help                 显示此帮助信息

示例:
  $0 diagnose
  $0 claude-to-codex
  $0 codex-to-claude

注意:
  - 迁移前会自动备份现有配置
  - 某些步骤需要手动完成
  - 建议在测试环境先验证
EOF
}

# 主函数
main() {
    if [ $# -eq 0 ]; then
        show_help
        exit 0
    fi

    case "$1" in
        claude-to-codex)
            migrate_claude_to_codex
            ;;
        codex-to-claude)
            migrate_codex_to_claude
            ;;
        claude-to-opencode)
            migrate_claude_to_opencode
            ;;
        diagnose)
            diagnose_environment
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "未知命令: $1"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

main "$@"
