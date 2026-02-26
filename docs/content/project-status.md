# 项目状态

## 当前阶段

本项目已完成第一轮“站内自包含 + 可追溯引用”重构：

- 网站事实内容接入 `data-claim-id`
- 引用注册表和验证报告可用
- 引用一致性检查进入 CI
- 根目录文档开始收敛到入口级结构

## 关键产物

- 可视化主页：`docs/index.html`
- 结构化引用：
  - `docs/citations/sources.json`
  - `docs/citations/claims.json`
  - `docs/citations/verification-report.md`
- 深度文档：
  - `docs/content/config-comparison.md`
  - `docs/content/migration-quick-reference.md`
  - `docs/content/migration-examples.md`
  - `docs/content/methodology.md`

## 风险与待办

1. 部分 claim 仍为 `conflicted` 或 `unverified`，需要持续复核。
2. 高时效信息（模型上下文窗口、快捷键、产品策略）应定期更新。
3. 后续可继续把文本内容分块渲染为更强可视化页面，而不只是 Markdown 补充文档。

## 下一里程碑

- 对比视图按维度分组与筛选进一步细化
- 冲突/未验证项在 UI 里显式高亮
- 构建更自动化的引用更新流程（减少手工维护）
