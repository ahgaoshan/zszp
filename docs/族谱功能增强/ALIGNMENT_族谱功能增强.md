# ALIGNMENT_族谱功能增强

## 1. 原始需求描述

用户提供了族谱详细信息截图，要求实现以下三个功能：

### 需求1: 天干地支纪年 + 农历 + 传统纪年的出生日期和去世日期录入
- 当前系统仅支持公历日期 (YYYY-MM-DD)
- 需要支持传统纪年方式：年号纪年（如"光绪十七年"）、民国纪年（如"民国三十三年"）、干支纪年（如"甲午年"）
- 需要支持农历日期（如"四月初四日酉时"、含时辰）
- 显示效果示例：
  - 出生: 光绪十七年
  - 逝世: 民国三十三年四月初四日酉时

### 需求2: 姓名字号录入功能
- 古代人有"名、字、号"三个部分
- 显示效果示例：
  - 琴福（名宫福，字佐璜）
  - 需要支持录入和显示名、字、号

### 需求3: 家族历史渊源和简介页面
- 需要一个独立的页面记录家族历史渊源和简介
- 支持富文本编辑
- 在导航栏中添加入口

## 2. 需求边界确认

### 在范围内
- [x] 数据库表 `family_members` 添加新字段
- [x] 出生日期和去世日期支持多格式录入（公历、农历、传统纪年）
- [x] 成员信息添加"字"和"号"字段
- [x] 创建家族历史渊源页面
- [x] 更新所有相关表单、表格、详情页展示
- [x] 更新Excel导入模板

### 不在范围内
- [ ] 公历与农历的自动转换（数据量庞大，建议手动录入）
- [ ] 年号与公元年的自动换算
- [ ] AI辅助录入

## 3. 需求理解（基于现有项目）

### 现有数据模型 (`family_members` 表)
```
id, name, generation, sibling_order, father_id, gender, 
official_position, is_alive, spouse, remarks, birthday, 
death_date, residence_place, updated_at
```

### 需要新增的字段
| 字段名 | 类型 | 说明 |
|--------|------|------|
| `given_name` | string | 名（大名） |
| `courtesy_name` | string | 字 |
| `pseudonym` | string | 号 |
| `birthday_calendar` | string | 农历生日（如"光绪十七年三月初五"） |
| `death_date_calendar` | string | 农历卒年（如"民国三十三年四月初四日酉时"） |
| `birthday_display` | string | 出生日期显示文本（兼容展示） |
| `death_date_display` | string | 去世日期显示文本 |

### 现有组件需要修改的
1. `app/family-tree/actions.ts` - 数据模型和CRUD操作
2. `app/family-tree/graph/actions.ts` - 图谱节点数据
3. `app/family-tree/family-members-table.tsx` - 表格和表单
4. `app/family-tree/member-detail-dialog.tsx` - 详情弹窗
5. `app/family-tree/import-members-dialog.tsx` - 导入模板
6. `app/family-tree/graph/family-node.tsx` - 图谱节点显示
7. `app/family-tree/layout.tsx` - 添加导航入口

## 4. 疑问澄清（需用户确认）

### 问题1: 日期字段的存储策略
**方案A**: 保留原有 `birthday`/`death_date`（公历），新增 `birthday_calendar`/`death_date_calendar`（农历/传统纪年），新增 `birthday_display`/`death_date_display`（显示用）
**方案B**: 将原有字段改为存储显示文本，不再区分公历农历

> **推荐方案A**：保留结构化的公历日期用于时间轴和统计，同时增加传统纪年字段。

### 问题2: 姓名字号的显示优先级
当前系统使用 `name` 作为主要展示名。新增字段后：
**方案A**: `name` 保持不变（作为排序/检索用），详情页显示"名、字、号"
**方案B**: `name` 字段改为显示完整格式如"琴福（名宫福，字佐璜）"

> **推荐方案A**：`name` 作为检索和排序字段，新增字段单独存储。

### 问题3: 家族历史渊源页面的权限
- 是否所有人都可以编辑？
- 还是仅管理员可编辑？

> **推荐**：与现有成员管理一致，登录后即可编辑。

### 问题4: 时辰是否需要结构化？
- 仅作为自由文本录入（如"酉时"）
- 还是需要结构化存储（地支字段）？

> **推荐**：自由文本，灵活性更高。

---

请确认以上问题后，我将进入Architect阶段进行架构设计。
