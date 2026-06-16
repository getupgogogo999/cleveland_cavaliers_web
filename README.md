# Cavs Nation | 克利夫兰骑士队主题网站

Wine & Gold 风格多页面球迷站 — 战绩、球员、视频、队史。

## 页面

| 路径 | 内容 |
|------|------|
| `/` | 首页 — 大图轮播 + 战绩概览 |
| `/record` | 赛季战绩 |
| `/games` | 赛程赛果 |
| `/players` | 球员数据 |
| `/videos` | YouTube 视频 |
| `/history` | 荣耀历程 |
| `/news` | 最新资讯 |

## 本地运行

```bash
cd E:\clipperweb
npm install
npm run dev          # 开发：http://localhost:5173
npm run start:local  # 本地生产预览：http://localhost:3001
```

## 部署到 Render（公网访问）

项目已包含 `render.yaml`，Render 会同时部署前端和 API，**无需单独暴露密钥**。

### 步骤

1. 注册 [render.com](https://render.com)（支持 GitHub 登录，通常比 Vercel 更容易注册）
2. 把代码推到 GitHub 公开仓库（见下方「上传 GitHub」）
3. 打开 [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint**
4. 连接你的 GitHub 仓库，Render 会自动读取 `render.yaml`
5. 点击 **Apply**，等待约 3–5 分钟构建完成
6. 访问地址：`https://cavs-nation.onrender.com`（或 Render 分配的实际域名）

### 部署后修改域名（若 Render 给了别的名字）

在 Render 项目 → **Environment** 中设置：

```
VITE_SITE_URL = https://你的实际域名.onrender.com
```

然后点击 **Manual Deploy** 重新构建一次（让 SEO 链接生效）。

### 上传 GitHub（一次性）

在 `E:\clipperweb` 目录：

```bash
git init
git add .
git commit -m "Cavs Nation site"
```

在 GitHub 新建空仓库，然后：

```bash
git remote add origin https://github.com/你的用户名/cavs-nation.git
git branch -M main
git push -u origin main
```

### 免费版说明

- 15 分钟无访问会休眠，首次打开需等待约 30 秒唤醒
- HTTPS 自动启用
- API 与网站同域，不对外暴露内部接口细节

## 安全说明

- 无 API Key / 无 `.env` 密钥
- 接口错误仅返回通用提示，不泄露内部 URL
- 生产环境不开放跨域 CORS

---

**Cleveland Cavaliers · Wine & Gold · 2016 Champions**
