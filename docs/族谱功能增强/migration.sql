-- ============================================
-- 族谱功能增强 - 数据库迁移脚本
-- 功能: 添加名/字/号字段 + 农历/传统纪年日期字段
-- 创建家族渊源表
-- ============================================

-- 1. 为 family_members 表添加名/字/号字段
ALTER TABLE family_members ADD COLUMN IF NOT EXISTS given_name TEXT;
ALTER TABLE family_members ADD COLUMN IF NOT EXISTS courtesy_name TEXT;
ALTER TABLE family_members ADD COLUMN IF NOT EXISTS pseudonym TEXT;

-- 2. 为 family_members 表添加农历/传统纪年日期字段
ALTER TABLE family_members ADD COLUMN IF NOT EXISTS birthday_calendar TEXT;
ALTER TABLE family_members ADD COLUMN IF NOT EXISTS death_date_calendar TEXT;

-- 3. 创建家族渊源表
CREATE TABLE IF NOT EXISTS family_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT '家族渊源',
  content TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- 4. 为 family_history 表创建 RLS 策略
ALTER TABLE family_history ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取
CREATE POLICY "所有人可查看家族渊源" ON family_history
  FOR SELECT USING (true);

-- 允许已认证用户更新
CREATE POLICY "已认证用户可编辑家族渊源" ON family_history
  FOR ALL USING (auth.role() = 'authenticated');
