#!/usr/bin/env python3
"""
CLI 工具配置文件格式转换器
支持 JSON ↔ TOML 转换，用于在不同 AI 编程工具间迁移配置
"""

import json
import sys
import argparse
from pathlib import Path

try:
    import toml
except ImportError:
    print("错误: 需要安装 toml 库")
    print("运行: pip install toml")
    sys.exit(1)


def json_to_toml(json_path: Path, toml_path: Path = None):
    """将 JSON 配置转换为 TOML (Claude Code → Codex/Kimi)"""
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        if toml_path is None:
            toml_path = json_path.with_suffix('.toml')

        with open(toml_path, 'w', encoding='utf-8') as f:
            toml.dump(data, f)

        print(f"✓ 成功转换: {json_path} → {toml_path}")
        return True

    except json.JSONDecodeError as e:
        print(f"✗ JSON 解析错误: {e}")
        return False
    except Exception as e:
        print(f"✗ 转换失败: {e}")
        return False


def toml_to_json(toml_path: Path, json_path: Path = None, pretty: bool = True):
    """将 TOML 配置转换为 JSON (Codex/Kimi → Claude Code)"""
    try:
        with open(toml_path, 'r', encoding='utf-8') as f:
            data = toml.load(f)

        if json_path is None:
            json_path = toml_path.with_suffix('.json')

        with open(json_path, 'w', encoding='utf-8') as f:
            if pretty:
                json.dump(data, f, indent=2, ensure_ascii=False)
            else:
                json.dump(data, f, ensure_ascii=False)

        print(f"✓ 成功转换: {toml_path} → {json_path}")
        return True

    except toml.TomlDecodeError as e:
        print(f"✗ TOML 解析错误: {e}")
        return False
    except Exception as e:
        print(f"✗ 转换失败: {e}")
        return False


def claude_settings_to_codex_config(settings_json: Path, config_toml: Path):
    """
    将 Claude Code 的 settings.json 转换为 Codex 的 config.toml

    映射关系:
    - permissions → approval
    - mcpServers → mcp (需要格式调整)
    - 其他设置需要手动映射
    """
    try:
        with open(settings_json, 'r', encoding='utf-8') as f:
            claude_settings = json.load(f)

        codex_config = {}

        # 权限映射
        if 'permissions' in claude_settings:
            perms = claude_settings['permissions']
            codex_config['approval'] = {
                'policy': 'ask'  # 默认值，可能需要根据具体权限调整
            }

        # MCP 服务器映射
        if 'mcpServers' in claude_settings:
            # Codex 的 MCP 配置格式可能不同，这里保留原格式
            codex_config['mcp'] = claude_settings['mcpServers']

        # 插件配置 (Codex 可能不直接支持，作为注释保留)
        if 'plugins' in claude_settings:
            codex_config['_plugins_note'] = "Plugins not directly supported in Codex"

        # 沙箱配置 (Codex 特有)
        codex_config['sandbox'] = {
            'network': 'restricted',
            'filesystem': 'workspace-only'
        }

        # 模型配置
        codex_config['model'] = {
            'default': 'gpt-5.3-codex'
        }

        with open(config_toml, 'w', encoding='utf-8') as f:
            toml.dump(codex_config, f)

        print(f"✓ 成功转换 Claude Code 配置到 Codex 格式")
        print(f"  输入: {settings_json}")
        print(f"  输出: {config_toml}")
        print("\n⚠ 警告: 请手动检查并调整以下配置:")
        print("  - approval.policy (权限策略)")
        print("  - sandbox 设置")
        print("  - MCP 服务器格式")

        return True

    except Exception as e:
        print(f"✗ 转换失败: {e}")
        return False


def codex_config_to_claude_settings(config_toml: Path, settings_json: Path):
    """将 Codex 的 config.toml 转换为 Claude Code 的 settings.json"""
    try:
        with open(config_toml, 'r', encoding='utf-8') as f:
            codex_config = toml.load(f)

        claude_settings = {}

        # 审批策略映射到权限
        if 'approval' in codex_config:
            policy = codex_config['approval'].get('policy', 'ask')
            claude_settings['permissions'] = {
                'mode': 'ask' if policy == 'ask' else 'delegate'
            }

        # MCP 服务器映射
        if 'mcp' in codex_config:
            claude_settings['mcpServers'] = codex_config['mcp']

        # 清理间隔 (Claude Code 特有)
        claude_settings['cleanupIntervals'] = {
            'sessions': 30,
            'logs': 7
        }

        with open(settings_json, 'w', encoding='utf-8') as f:
            json.dump(claude_settings, f, indent=2, ensure_ascii=False)

        print(f"✓ 成功转换 Codex 配置到 Claude Code 格式")
        print(f"  输入: {config_toml}")
        print(f"  输出: {settings_json}")
        print("\n⚠ 警告: 请手动检查并调整以下配置:")
        print("  - permissions 模式")
        print("  - mcpServers 格式")
        print("  - plugins 配置 (如需要)")

        return True

    except Exception as e:
        print(f"✗ 转换失败: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(
        description='CLI 工具配置文件格式转换器',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  # JSON → TOML (通用)
  %(prog)s settings.json -o config.toml

  # TOML → JSON (通用)
  %(prog)s config.toml -o settings.json

  # Claude Code → Codex (智能转换)
  %(prog)s settings.json --to-codex config.toml

  # Codex → Claude Code (智能转换)
  %(prog)s config.toml --to-claude settings.json
        """
    )

    parser.add_argument('input', type=Path, help='输入文件路径')
    parser.add_argument('-o', '--output', type=Path, help='输出文件路径 (可选)')
    parser.add_argument('--to-codex', type=Path, help='转换为 Codex 格式 (Claude → Codex)')
    parser.add_argument('--to-claude', type=Path, help='转换为 Claude 格式 (Codex → Claude)')
    parser.add_argument('--no-pretty', action='store_true', help='JSON 不使用缩进')

    args = parser.parse_args()

    input_path = args.input

    if not input_path.exists():
        print(f"✗ 错误: 文件不存在: {input_path}")
        sys.exit(1)

    # 智能转换模式
    if args.to_codex:
        success = claude_settings_to_codex_config(input_path, args.to_codex)
    elif args.to_claude:
        success = codex_config_to_claude_settings(input_path, args.to_claude)
    # 通用转换模式
    elif input_path.suffix.lower() == '.json':
        success = json_to_toml(input_path, args.output)
    elif input_path.suffix.lower() == '.toml':
        success = toml_to_json(input_path, args.output, pretty=not args.no_pretty)
    else:
        print(f"✗ 错误: 不支持的文件格式: {input_path.suffix}")
        print("支持的格式: .json, .toml")
        sys.exit(1)

    sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()
