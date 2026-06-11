# Netlify 部署指南

## 部署步骤

### 1. 连接 GitHub 仓库

1. 访问 [Netlify](https://app.netlify.com/)
2. 点击 **"Add new site"** → **"Import an existing project"**
3. 选择 **"GitHub"**
4. 授权 Netlify 访问你的 GitHub 账户
5. 选择仓库 `ahgaoshan/zszp`

### 2. 配置环境变量

在 Netlify 控制台中，进入 **Site settings** → **Environment variables**，添加以下变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | 你的 Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` | 你的 Supabase Anon/Public Key |

> ⚠️ **重要**: 不要将 `.env` 文件提交到 Git！这些敏感信息应该只在 Netlify 和 `.env` 本地文件中配置。

### 3. 部署设置

- **Build command**: `npm run build` (已自动从 `netlify.toml` 读取)
- **Publish directory**: `.next` (已自动配置)
- **Function directory**: `netlify/functions` (可选)

### 4. 点击部署

点击 **"Deploy site"**，Netlify 会自动：
- 安装依赖
- 执行构建
- 部署到全球 CDN

首次部署大约需要 2-5 分钟。

## 自动部署

配置完成后，每次推送到 `main` 分支都会自动触发部署：

```bash
git push origin main
```

Netlify 会自动检测变更并重新部署。

## 预览部署

如果创建 Pull Request，Netlify 会创建预览部署，方便测试。

## 自定义域名（可选）

1. 进入 **Domain settings**
2. 点击 **"Add custom domain"**
3. 输入你的域名
4. 按提示配置 DNS 记录

## 故障排查

### 构建失败

查看 **Deploy logs** 了解详细错误信息。常见问题：

- **环境变量缺失**: 确保已在 Netlify 配置所有必需的环境变量
- **Node.js 版本不匹配**: Netlify 默认使用 Node.js 18，可在 `netlify.toml` 中指定：
  ```toml
  [build.environment]
    NODE_VERSION = "18"
  ```

### Supabase 连接错误

确保：
1. 环境变量已正确配置
2. Supabase 项目的 RLS (Row Level Security) 策略正确
3. 已执行所有数据库迁移脚本

## 回滚部署

如果需要回滚到之前的版本：

1. 进入 **Deploys**
2. 找到要回滚的版本
3. 点击 **"Publish deploy"**

## 资源

- [Netlify Next.js 插件文档](https://docs.netlify.com/integrations/frameworks/next-js/)
- [Netlify 环境变量文档](https://docs.netlify.com/environment-variables/overview/)
- [Supabase + Netlify 集成指南](https://supabase.com/docs/guides/getting-started/quick-starts/netlify)
