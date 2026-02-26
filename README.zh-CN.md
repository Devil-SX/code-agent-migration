# AI 编程 CLI 工具对比与迁移

这个仓库维护一个站内自包含的 AI 编程 CLI 对比网站，聚焦四类工具：Claude Code、Codex、OpenCode、Kimi。

## 项目目标

- 在网站内完成配置差异、迁移路径、场景推荐的完整表达
- 为每条关键事实提供可追溯引用来源（`[n]` 上标）
- 明确区分已验证、冲突、未验证信息，降低误导风险

## 文档结构

- 网站主页：`docs/index.html`
- 核心内容：
  - `docs/content/overview.md`
  - `docs/content/config-comparison.md`
  - `docs/content/migration-quick-reference.md`
  - `docs/content/migration-examples.md`
  - `docs/content/project-status.md`
  - `docs/content/methodology.md`
  - `docs/content/glossary.md`
- 引用与核验：
  - `docs/citations/sources.json`
  - `docs/citations/claims.json`
  - `docs/citations/verification-report.md`

## 本地运行

```bash
python3 -m http.server 8000 --directory docs
# 访问 http://localhost:8000
```

## 质量检查

```bash
node tools/check_citations.js
node tools/check_docs_structure.js
```

## 维护约束

- 根目录仅保留入口级文档：`README.md`、`CHANGELOG.md`、`AGENTS.md`、`README.zh-CN.md`
- 站点信息必须站内自包含；外链仅用于来源引用
- 修改事实性内容时，必须同步更新 `data-claim-id` 和 citations registry
