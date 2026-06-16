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
npm run dev          
npm run start:local  
```

## 部署到 Render（公网访问）

项目已包含 `render.yaml`，Render 会同时部署前端和 API，**无需单独暴露密钥**。





## 安全说明

- 无 API Key / 无 `.env` 密钥
- 接口错误仅返回通用提示，不泄露内部 URL
- 生产环境不开放跨域 CORS

---

**Cleveland Cavaliers · Wine & Gold · 2016 Champions**
