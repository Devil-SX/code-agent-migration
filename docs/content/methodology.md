# 验证方法说明

## 目标

确保网站中的事实型内容可追溯、可复核、可持续维护。

## 数据结构

- `docs/citations/sources.json`: 来源注册表（全站唯一编号）
- `docs/citations/claims.json`: claim 注册表（位置、来源、状态）
- `docs/citations/verification-report.md`: 人类可读核验说明

## 证据等级

- `L1_OFFICIAL`: 官方文档或官方站点
- `L2_PRIMARY_REPO`: 官方仓库/项目仓库一手资料
- `L3_SECONDARY`: 二手资料（仅补充，不作为优先证据）

## 验证状态

- `verified`: 证据支持当前表述
- `partially_verified`: 只验证了部分结论
- `conflicted`: 证据与当前表述冲突
- `unverified`: 暂无可接受证据

## 更新流程

1. 修改页面事实内容并标注 `data-claim-id`
2. 更新 `claims.json` 与 `sources.json`
3. 补充 `verification-report.md`
4. 运行一致性检查：
   - `node tools/check_citations.js`
   - `node tools/check_docs_structure.js`

## 发布原则

- 冲突与未验证信息可以保留，但必须显式提示状态
- 不允许通过删除状态提示掩盖不确定性
