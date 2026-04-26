# 黄若杰个人网站

一个基于 Next.js App Router 构建的本地可运行个人专业网站，围绕简历信息整理为更完整的品牌叙事体验。

## 本地运行

```bash
npm install
npm run dev
```

然后打开 `http://localhost:3000`。

## 主要页面

- `/` 首页：个人介绍、职业发展历程、项目亮点、能力矩阵、联系入口
- `/api/digital-twin` Digital Twin 聊天接口：服务端代理 AIHubMix `deepseek-v3.2`
- `/portfolio` 作品集预留页：作为未来案例与项目库的一级入口

## 内容来源

- `resume.pdf`
- `public/resume.pdf`

## 环境变量

在根目录 `.env` 中提供：

```bash
AIHUBMIX_API_KEY=your_key_here
```

## 技术栈

- Next.js 16
- React 19
- TypeScript
- CSS Modules
