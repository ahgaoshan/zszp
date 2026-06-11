# 🚀 Netlify 一键部署指南

## 快速部署（5 分钟完成）

### 步骤 1：打开 Netlify 导入页面

点击以下链接直接导入 GitHub 仓库：

👉 **[https://app.netlify.com/start](https://app.netlify.com/start)**

### 步骤 2：选择仓库

1. 点击 **"GitHub"** 按钮
2. 授权 Netlify 访问你的 GitHub 账户（如果尚未授权）
3. 找到并选择 **`ahgaoshan/zszp`** 仓库
4. 点击 **"Import repository"**

### 步骤 3：配置环境变量（重要！）

在导入页面，点击 **"Add environment variables"**，添加以下两个变量：

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ictvcmwvsjzecxarapww.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljdHZjbXd2c2p6ZWN4YXJhcHd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MDU4MzcsImV4cCI6MjA5NjM4MTgzN30._1G5-yfMnVzSc8LPITpKFXAv02T13XD9k6GiFGrfKqc` |

**复制粘贴方法：**

1. 点击 **"Add environment variable"**
2. 第一行输入 `NEXT_PUBLIC_SUPABASE_URL`，第二行粘贴 `https://ictvcmwvsjzecxarapww.supabase.co`
3. 点击 **"Add"**
4. 再次点击 **"Add environment variable"**
5. 第一行输入 `NEXT_PUBLIC_SUPABASE_ANON_KEY`，第二行粘贴整个 `eyJhbGci...` 开头的长字符串
6. 点击 **"Add"**

### 步骤 4：开始部署

1. 确认配置：
   - **Branch**: `main`
   - **Build command**: `npm run build` ✅（已自动识别）
   - **Publish directory**: `.next` ✅（已自动识别）

2. 点击 **"Deploy site"** 按钮

3. 等待部署完成（约 2-5 分钟）

### 步骤 5：查看部署结果

部署完成后，你会看到：
- ✅ 绿色的 "Published" 状态
- 随机生成的域名（如 `https://fascinating-xyz-123456.netlify.app`）

点击域名即可访问你的族谱应用！

---

## 自定义域名（可选）

如果需要绑定自己的域名：

1. 进入 **Site settings** → **Domain management**
2. 点击 **"Add custom domain"**
3. 输入你的域名（如 `zszp.yourdomain.com`）
4. 按提示配置 DNS CNAME 记录

---

## 验证部署

部署成功后，请测试以下功能：

- [ ] 首页加载正常
- [ ] 族谱图谱显示正常
- [ ] 家族渊源页面可以访问
- [ ] 成员信息可以正常查看
- [ ] 登录/注册功能（如果已配置 Supabase Auth）

---

## 故障排查

### 问题：构建失败，提示 "Supabase URL/Key required"

**解决方案**：确保环境变量已正确配置
1. 进入 **Site settings** → **Environment variables**
2. 检查两个变量是否存在且值正确
3. 如果有误，编辑后重新部署

### 问题：运行时提示 "Failed to fetch"

**解决方案**：检查 Supabase 配置
1. 确认 Supabase 项目正常运行
2. 确认 RLS (Row Level Security) 策略已正确配置
3. 执行数据库迁移脚本（参考 `docs/族谱功能增强/migration.sql`）

### 问题：页面显示空白

**解决方案**：
1. 打开浏览器开发者工具（F12）
2. 查看 Console 中的错误信息
3. 检查 Network 标签中的 API 请求状态

---

## 后续维护

### 自动部署

配置完成后，每次推送到 `main` 分支都会自动部署：

```bash
git push origin main
```

### 查看部署日志

1. 进入 Netlify 控制台
2. 点击 **Deploys**
3. 点击任意一次部署查看详情

### 手动触发部署

1. 进入 **Deploys**
2. 点击 **"Trigger deploy"**
3. 选择 **"Deploy site"**

---

## 资源链接

-  [Netlify 控制台](https://app.netlify.com/)
- 📊 [你的 GitHub 仓库](https://github.com/ahgaoshan/zszp)
-  [Supabase Dashboard](https://supabase.com/dashboard)
- 📖 [部署详细文档](./DEPLOYMENT_NETLIFY.md)

---

**祝你部署成功！🎉**

如有问题，请查看部署日志或联系支持。
