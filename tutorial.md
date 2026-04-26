# 从零理解这个网站：一个给前端完全初学者的完整教程

这份教程会一步步解释我在这个项目里做了什么，尤其是：

- 如何用 `Next.js` 搭一个个人网站
- 如何把一个“数字分身（Digital Twin）”聊天功能接进网站
- 前端页面、服务端接口、AI 模型调用之间是怎么协作的
- 这份代码有哪些优点，以及还能怎么继续改进

如果你是前端编程的完全初学者，不用担心。我会尽量用“先讲人话，再讲代码”的方式来说明。

---

## 1. 这项技术的概述

这个项目本质上是一个 **基于 Next.js 的个人网站**，它包含两层能力：

1. **普通网站能力**
   - 展示个人介绍
   - 展示职业发展历程
   - 展示项目亮点和技能结构
   - 预留作品集入口

2. **AI 网站能力**
   - 用户可以在页面里提问
   - 网站会把问题发送到服务端接口
   - 服务端接口会调用 AIHubMix
   - AIHubMix 再用 `deepseek-v3.2` 生成回答
   - 最终把答案返回给网页上的聊天框

所以，这不是一个“纯静态网页”，而是一个 **前端 + 后端 + AI 接口** 结合的小型全栈项目。

---

## 2. 这套技术栈分别负责什么

### 2.1 Next.js

`Next.js` 是一个基于 React 的框架。你可以把它理解成：

- `React` 负责“组件化写页面”
- `Next.js` 负责“把页面、路由、接口、构建流程都组织起来”

它比单纯的 React 更方便做完整网站，因为它内置了：

- 页面路由
- 服务端接口
- 构建与部署能力
- 字体加载
- 样式组织方式

### 2.2 React

`React` 是用来写页面组件的。

比如：

- 首页是一个组件
- 聊天框是一个组件
- 输入框和发送按钮的交互，也是 React 控制的

### 2.3 TypeScript

项目里大多数代码是 `TypeScript`。

你可以把它理解成：

- `JavaScript` 是能运行的脚本语言
- `TypeScript` 是“带类型提示和检查的 JavaScript”

它的好处是：

- 更容易发现错误
- 更适合大型项目
- 更方便团队协作

### 2.4 CSS Modules

样式文件里用了 `*.module.css`。

这表示：

- 每个组件可以有自己的 CSS
- 样式名不会轻易污染别的组件
- 更适合大型页面的样式管理

### 2.5 AIHubMix + deepseek-v3.2

这个项目的 AI 聊天不是直接在浏览器里调用模型，而是：

- 浏览器发请求给你自己的服务端
- 服务端再去调用 AIHubMix
- AIHubMix 帮你转发到 `deepseek-v3.2`

这样做的好处是：

- API Key 不会暴露在前端
- 你可以在服务端控制提示词
- 你可以过滤消息格式
- 你可以统一处理错误

---

## 3. 先从高层次理解整个流程

我们先不要急着看代码，先理解“这个网站是怎么工作的”。

### 3.1 页面展示流程

当用户访问首页时：

1. Next.js 找到 `src/app/page.tsx`
2. 它把首页内容渲染出来
3. 页面上的样式来自：
   - `src/app/globals.css`
   - `src/app/page.module.css`
4. 页面中的聊天模块来自：
   - `src/components/DigitalTwinChat.tsx`

### 3.2 聊天功能流程

当用户在聊天框输入一句话并点击“发送问题”时：

1. 前端组件 `DigitalTwinChat.tsx` 读取输入框内容
2. 它调用：

```ts
fetch("/api/digital-twin", { ... })
```

3. Next.js 把这个请求交给：

```ts
src/app/api/digital-twin/route.ts
```

4. 这个服务端文件会：
   - 读取 `.env` 中的 API Key
   - 准备系统提示词（告诉 AI 它是谁）
   - 整理对话消息
   - 调用 AIHubMix

5. AIHubMix 再调用 `deepseek-v3.2`
6. 模型生成回答
7. 回答被返回给前端
8. 前端把回答显示在聊天框里

### 3.3 一张简单的脑图

```text
用户输入问题
   ↓
DigitalTwinChat.tsx
   ↓ fetch("/api/digital-twin")
route.ts
   ↓
AIHubMix API
   ↓
deepseek-v3.2
   ↓
返回回答
   ↓
React 更新页面
```

---

## 4. 项目结构讲解

这个项目里，最关键的目录结构大概是这样：

```text
src/
  app/
    api/
      digital-twin/
        route.ts
    portfolio/
      page.tsx
      portfolio.module.css
    fonts/
      SpaceGrotesk-Variable.ttf
    globals.css
    layout.tsx
    page.tsx
    page.module.css
  components/
    DigitalTwinChat.tsx
    DigitalTwinChat.module.css
```

你可以这样理解：

- `src/app/page.tsx`
  首页
- `src/app/api/digital-twin/route.ts`
  聊天接口
- `src/components/DigitalTwinChat.tsx`
  聊天框组件
- `src/app/layout.tsx`
  全局布局和元信息
- `src/app/globals.css`
  全局样式
- `src/app/page.module.css`
  首页样式

---

## 5. 详细代码审查：我是怎么一步步实现它的

下面进入最重要的部分：逐文件讲解。

---

## 6. 全局入口：`src/app/layout.tsx`

这个文件负责网站的“外壳”。

### 6.1 它的作用

- 设置页面标题和描述
- 加载本地字体
- 决定整个网站最外层的 HTML 结构

### 6.2 核心代码示例

```ts
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk-Variable.ttf",
  variable: "--font-display",
  display: "swap",
  weight: "300 700",
});
```

### 6.3 初学者解释

- `import`：把别的模块引进来用
- `localFont(...)`：告诉 Next.js 去加载一个本地字体文件
- `variable: "--font-display"`：把这套字体绑定到一个 CSS 变量上

后面 CSS 里就可以这样使用：

```css
font-family: var(--font-display), var(--font-body);
```

### 6.4 metadata 是干什么的

```ts
export const metadata: Metadata = {
  title: "黄若杰 | 数据分析与 AI 应用",
  description:
    "黄若杰的个人专业网站，聚焦数据分析、AI 应用、计算神经科学、脑电数据研究与跨学科项目实践。",
};
```

它会影响：

- 浏览器标签页标题
- 搜索引擎摘要
- 分享链接时的基础信息

---

## 7. 全局样式：`src/app/globals.css`

这是整个网站的底层样式文件。

### 7.1 它主要做什么

- 定义全站颜色变量
- 设置基础字体
- 统一页面背景
- 做浏览器默认样式重置

### 7.2 代码示例

```css
:root {
  --paper: #f4eee6;
  --paper-strong: #efe7dc;
  --ink: #091420;
  --muted: #52606d;
  --brand: #74e3ff;
  --brand-strong: #42bcff;
}
```

### 7.3 为什么要用 CSS 变量

如果你直接在每个地方都写颜色：

```css
color: #091420;
```

以后想改主题就会很麻烦。

但如果先定义变量：

```css
--ink: #091420;
```

后面统一使用：

```css
color: var(--ink);
```

那以后全站改色会容易很多。

---

## 8. 首页主体：`src/app/page.tsx`

这个文件就是首页本身。

### 8.1 这个文件的职责

它不是在做复杂算法，而是在“组织内容”。

它做了三件事：

1. 把你的信息整理成数组和文案
2. 用 JSX 渲染成多个页面区块
3. 把 Digital Twin 组件插入主页

### 8.2 先看数据写法

```ts
const metrics = [
  { value: "2", label: "学科主线", detail: "园林设计 × 心理学 / 计算神经科学" },
  { value: "2023", label: "AI 原生起点", detail: "自 ChatGPT 时代开始持续构建 AI 工作流" },
  { value: "3/3", label: "辅导成果", detail: "复试深度辅导学生全部成功上岸" },
];
```

这种写法的好处是：

- 数据和页面结构分离
- 后面可以用 `map` 批量渲染
- 修改内容时不需要改很多重复标签

### 8.3 JSX 渲染是什么意思

例如：

```tsx
<ul className={styles.metricStrip}>
  {metrics.map((item) => (
    <li key={item.label} className={styles.metricCard}>
      <strong>{item.value}</strong>
      <span>{item.label}</span>
      <small>{item.detail}</small>
    </li>
  ))}
</ul>
```

初学者可以这样理解：

- `metrics.map(...)`：把数组里的每一项都“变成一个页面元素”
- `key={item.label}`：React 需要一个唯一标识，方便更新列表
- `{item.value}`：把 JavaScript 变量插进 HTML 结构中

### 8.4 插入聊天组件

```tsx
<section id="digital-twin" className={styles.section}>
  <div className={styles.sectionHeading}>
    <p className={styles.sectionEyebrow}>Digital Twin</p>
    <h2>现在，你可以直接和这个站点里的 AI 分身对话。</h2>
  </div>

  <DigitalTwinChat />
</section>
```

这里最关键的一行是：

```tsx
<DigitalTwinChat />
```

这表示：

- 把另外一个 React 组件塞进当前页面
- 像拼积木一样组织 UI

---

## 9. 首页样式：`src/app/page.module.css`

这个文件让首页看起来更“品牌化”和“专业化”。

### 9.1 它主要解决什么问题

- 版式布局
- 英雄区（Hero Section）视觉效果
- 卡片、时间线、项目区块样式
- 移动端适配

### 9.2 代码示例

```css
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(320px, 0.9fr);
  gap: 2rem;
  align-items: stretch;
  min-height: calc(100vh - 8rem);
}
```

这段的意思是：

- `display: grid`：启用 CSS 网格布局
- `grid-template-columns`：把这一块分成两列
- `gap: 2rem`：列与列之间留空隙
- `min-height`：让第一屏尽量有足够高度

### 9.3 为什么这里不用“纯 HTML + 简单 CSS”

因为这个站不是普通的练习页，而是一个要体现“企业级专业感 + 个性锋芒”的品牌页面。  
所以样式不只是“能看”，而是承担了：

- 信息层级组织
- 品牌气质传达
- 首屏冲击力
- 移动端适配

---

## 10. 前端聊天组件：`src/components/DigitalTwinChat.tsx`

这是整个项目里最像“交互程序”的部分。

如果说首页主要是展示内容，那么这个文件主要是在处理：

- 用户输入
- 按钮状态
- 请求发送
- 请求返回
- 错误处理
- 页面滚动

### 10.1 为什么文件顶部有 `"use client"`

```ts
"use client";
```

这句话非常重要。

在 Next.js App Router 里：

- 默认组件更偏服务端
- 但如果一个组件要用 `useState`、`useEffect`、输入框、点击事件，就必须声明为客户端组件

聊天框显然需要：

- 输入文字
- 点按钮
- 更新消息列表

所以必须加：

```ts
"use client";
```

### 10.2 状态 state 是什么

```ts
const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
const [input, setInput] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

初学者可以这样理解：

- `messages`：当前聊天记录
- `input`：输入框里的文字
- `isLoading`：是不是正在等 AI 回复
- `error`：有没有错误信息

React 中的 `useState` 是“会触发页面更新的变量”。

例如：

```ts
setInput("你好");
```

页面上的输入框内容就会跟着变。

### 10.3 useRef 是什么

```ts
const viewportRef = useRef<HTMLDivElement | null>(null);
const textareaRef = useRef<HTMLTextAreaElement | null>(null);
const messagesRef = useRef<Message[]>([INITIAL_MESSAGE]);
```

`useRef` 有两种常见用途：

1. 直接拿到某个 DOM 元素
   - 比如滚动聊天框
   - 比如把焦点移回输入框

2. 保存一个不会每次渲染都重建的值
   - 这里的 `messagesRef` 就是在保存“最新消息列表”

### 10.4 为什么不用 `messages`，还要多一个 `messagesRef`

这个是一个非常好的学习点。

如果直接在异步函数里使用旧的 `messages`，有时会碰到“闭包拿到旧值”的问题。  
也就是说，你以为你拿的是最新聊天记录，实际可能还是旧的。

所以这里用了：

```ts
const nextMessages: Message[] = [...messagesRef.current, { role: "user", content: trimmed }];
```

而不是直接：

```ts
const nextMessages = [...messages, ...]
```

这是为了让发送多轮问题时更稳定。

### 10.5 核心发送逻辑

最重要的函数是这个：

```ts
async function submitMessage(text: string) {
  const trimmed = text.trim();

  if (!trimmed || isLoading) {
    return;
  }

  const nextMessages: Message[] = [...messagesRef.current, { role: "user", content: trimmed }];

  messagesRef.current = nextMessages;
  setMessages(nextMessages);
  setInput("");
  setError(null);
  setIsLoading(true);

  try {
    const response = await fetch("/api/digital-twin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: nextMessages }),
    });

    const data = (await response.json()) as { reply?: string; error?: string; detail?: string };

    if (!response.ok || !data.reply) {
      throw new Error(data.detail || data.error || "Digital Twin 暂时不可用。");
    }

    const updatedMessages = [
      ...messagesRef.current,
      { role: "assistant" as const, content: data.reply ?? "" },
    ];

    messagesRef.current = updatedMessages;
    setMessages(updatedMessages);
  } catch (submitError) {
    const message =
      submitError instanceof Error ? submitError.message : "发送失败，请稍后再试。";
    setError(message);
  } finally {
    setIsLoading(false);
  }
}
```

### 10.6 把这段拆成白话

这段逻辑大致是：

1. 先把用户输入清理一下
2. 如果输入为空，或者已经在发送中，就直接结束
3. 把这条用户消息先放到本地聊天记录里
4. 页面立刻更新，所以用户能看到自己的消息
5. 再调用 `/api/digital-twin`
6. 如果成功，就把 AI 回答加入消息列表
7. 如果失败，就显示错误
8. 最后无论成功失败，都结束 loading 状态

这就是一个典型的“前端请求后端接口”的模式。

### 10.7 Enter 发送是怎么做的

```ts
async function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
  if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
    event.preventDefault();
    await submitMessage(input);
  }
}
```

这里的意思是：

- 如果按下的是 `Enter`
- 而且没有按住 `Shift`
- 而且不是输入法组合状态

那么：

- 阻止默认换行
- 直接发送消息

这也是比较成熟的聊天输入框常见行为。

### 10.8 Markdown 渲染是怎么接进去的

```tsx
<div className={styles.markdown}>
  <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
</div>
```

这里用到了两个库：

- `react-markdown`
- `remark-gfm`

它们的作用是：

- 把普通字符串中的 Markdown 格式解析出来
- 正确显示标题、列表、粗体、表格、代码块等

例如，如果 AI 返回：

```md
### 职业路径特点

- 跨学科
- 重研究
- 强表达
```

前端不会显示原始符号，而会显示成真正排版后的内容。

---

## 11. 聊天样式：`src/components/DigitalTwinChat.module.css`

这个文件控制聊天区的视觉表现。

### 11.1 它负责的内容

- 标题区
- 推荐问题按钮
- 聊天气泡
- 输入框和发送按钮
- Markdown 内容样式

### 11.2 为什么 Markdown 还要额外写样式

因为默认情况下，浏览器对 Markdown 解析出来的 HTML 没有你想要的品牌样式。  
所以我们需要自己定义：

- 标题间距
- 列表缩进
- 代码块背景
- 引用块样式
- 表格边框

例如：

```css
.markdown ul,
.markdown ol {
  padding-left: 1.2rem;
}

.markdown code {
  padding: 0.15rem 0.35rem;
  border-radius: 0.42rem;
  background: rgb(9 20 32 / 0.08);
}
```

这让 AI 回答不只是“能显示”，而是“好阅读”。

---

## 12. 服务端接口：`src/app/api/digital-twin/route.ts`

这是整个 AI 功能的后端核心。

如果你把前端组件看成“聊天框”，那这个文件就是“聊天引擎的总控台”。

---

## 13. 为什么这个文件叫 `route.ts`

在 Next.js App Router 里，如果你写：

```text
src/app/api/digital-twin/route.ts
```

它就会自动变成这个接口地址：

```text
/api/digital-twin
```

所以前端才可以这样调用：

```ts
fetch("/api/digital-twin")
```

---

## 14. 先看最基础的部分

```ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
```

### 14.1 它的含义

- `NextResponse`：Next.js 用来返回 HTTP 响应的工具
- `runtime = "nodejs"`：明确告诉 Next.js，这个接口跑在 Node.js 环境
- `dynamic = "force-dynamic"`：不要把这个接口当成静态内容缓存

因为聊天接口每次请求都不同，所以一定是动态的。

---

## 15. 类型定义：`type ChatMessage`

```ts
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};
```

这是 TypeScript 的类型定义。

它在表达：

- 每条消息必须有 `role`
- `role` 只能是 `"user"` 或 `"assistant"`
- 每条消息必须有 `content`
- `content` 必须是字符串

这能帮助我们减少很多低级错误。

---

## 16. 模型和接口地址配置

```ts
const AIHUBMIX_URL = "https://aihubmix.com/v1/chat/completions";
const MODEL_NAME = "deepseek-v3.2";
```

这是两个“固定配置”：

- AIHubMix 的聊天接口地址
- 要调用的模型名字

把它们写成常量，比在代码里到处写字符串更清晰。

---

## 17. 最关键的部分：系统提示词 `DIGITAL_TWIN_CONTEXT`

```ts
const DIGITAL_TWIN_CONTEXT = `
你现在是“黄若杰的数字分身（Digital Twin）”。
...
`.trim();
```

这是整个 AI 功能最核心的“人格设定”和“知识边界”。

### 17.1 它做了什么

它告诉模型：

- 你是谁
- 你该回答什么
- 你不能回答什么
- 你的语气应该怎样
- 你的知识基础是什么

### 17.2 为什么要在这里写简历信息

因为模型本身不知道黄若杰是谁。  
你必须把相关信息告诉它，它才能基于这些信息回答。

所以这里相当于把简历、个人定位、项目方向，整理成一份“模型内部说明书”。

### 17.3 为什么要强调“不允许编造”

这一句特别重要：

- 不要编造未写明的成就
- 如果不知道就明确说不知道

这是在给 AI 设定边界。  
否则模型很容易为了“回答得更完整”而瞎补内容。

---

## 18. 消息过滤函数：`normalizeMessages`

```ts
function normalizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .filter((item): item is ChatMessage => {
      if (!item || typeof item !== "object") {
        return false;
      }

      const role = (item as ChatMessage).role;
      const content = (item as ChatMessage).content;
      return (
        (role === "user" || role === "assistant") &&
        typeof content === "string" &&
        content.trim().length > 0
      );
    })
    .slice(-12);
}
```

### 18.1 这段在解决什么问题

前端传来的数据不一定永远完美。  
所以服务端要做一层“安全检查”。

这个函数会：

- 确保输入是数组
- 确保每一项像一条合法消息
- 去掉空字符串
- 只保留最近 12 条消息

### 18.2 为什么只留最近 12 条

因为：

- 聊天上下文太长会浪费 token
- 请求会变慢
- 成本会变高

保留最近几轮对话，通常已经够用了。

---

## 19. 真正的接口入口：`POST`

```ts
export async function POST(request: Request) {
```

这表示：

- 当浏览器用 `POST` 方法请求这个接口时
- 由这个函数来处理

---

## 20. 读取环境变量 API Key

```ts
const apiKey = process.env.AIHUBMIX_API_KEY?.trim();
```

这里的 `process.env` 表示读取服务器环境变量。

也就是说，这个 Key 来自你的 `.env` 文件，而不是写死在代码里。

这是很重要的安全实践。

### 20.1 为什么不能把 API Key 写在前端

如果把 Key 写在前端：

- 用户打开浏览器开发者工具就能看到
- 别人可以盗用你的 Key
- 会造成安全风险和费用风险

所以正确做法是：

- 前端只请求你自己的接口
- 你的服务端接口再带着 Key 去请求 AIHubMix

---

## 21. 解析请求体

```ts
let body: { messages?: ChatMessage[] };

try {
  body = (await request.json()) as { messages?: ChatMessage[] };
} catch {
  return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
}
```

### 21.1 它在做什么

浏览器发来的请求体通常是 JSON。  
这里是在把它解析成 JavaScript 对象。

如果解析失败，就直接返回：

- 错误信息
- HTTP 状态码 `400`

`400` 的意思是：客户端发来的请求格式有问题。

---

## 22. 检查是否真的有用户问题

```ts
const messages = normalizeMessages(body.messages);
const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

if (!latestUserMessage) {
  return NextResponse.json({ error: "A user message is required." }, { status: 400 });
}
```

这段在确认一件事：

“你不能空着来问 AI。”

如果没有用户消息，就没必要继续请求模型。

---

## 23. 调用 AIHubMix

```ts
const response = await fetch(AIHUBMIX_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: MODEL_NAME,
    temperature: 0.45,
    max_tokens: 700,
    messages: [
      {
        role: "system",
        content: DIGITAL_TWIN_CONTEXT,
      },
      ...messages,
    ],
  }),
});
```

### 23.1 这是整套系统最核心的一次网络请求

这一步是在：

- 给 AIHubMix 发一个 HTTP 请求
- 带上授权头 `Authorization`
- 告诉它要调用哪个模型
- 把系统提示词和聊天记录一起传过去

### 23.2 为什么 `messages` 里要先放一个 system 消息

```ts
messages: [
  {
    role: "system",
    content: DIGITAL_TWIN_CONTEXT,
  },
  ...messages,
],
```

因为大模型对话通常有多种角色：

- `system`：系统规则
- `user`：用户问题
- `assistant`：模型之前的回答

把 `system` 放在最前面，能让模型先读到“你是谁、你该怎么回答”。

### 23.3 temperature 是什么

```ts
temperature: 0.45
```

你可以粗略理解成“回答的随机程度”：

- 数值高：更发散、更自由
- 数值低：更稳定、更保守

这里设置成 `0.45`，意味着：

- 希望回答有点自然感
- 但不能太飘

这很适合“职业经历问答”这种场景。

---

## 24. 处理 AIHubMix 的报错

```ts
if (!response.ok) {
  const errorText = await response.text();

  return NextResponse.json(
    {
      error: "AIHubMix request failed.",
      detail: errorText.slice(0, 1200),
    },
    { status: 502 },
  );
}
```

### 24.1 为什么这里不是 500，而是 502

这是一个很好的后端设计细节。

你自己的接口并没有崩掉，真正出问题的是“上游服务”：

- 也就是 AIHubMix

所以这里返回 `502 Bad Gateway` 很合理，意思是：

- 我这个服务器作为“中间代理”去请求了别的服务
- 但那个上游服务没正常返回

---

## 25. 解析 AI 返回结果

```ts
const data = (await response.json()) as {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

const content = data.choices?.[0]?.message?.content?.trim();
```

### 25.1 这段是什么意思

AIHubMix 返回的数据结构里，模型回答通常在这里：

```ts
data.choices[0].message.content
```

这里用了可选链：

```ts
?. 
```

它的好处是：

- 如果某一层不存在，不会直接报错
- 而是返回 `undefined`

这是 TypeScript / JavaScript 里很常用的安全写法。

---

## 26. 返回给前端

```ts
return NextResponse.json({ reply: content });
```

这一行就是在告诉前端：

- 好了，我已经拿到 AI 回答了
- 现在把它包装成 JSON 发回去

前端收到后，就会把它显示在聊天记录里。

---

## 27. 这段代码体现了哪些前后端分工

### 前端负责

- 展示页面
- 接收用户输入
- 发请求
- 显示结果
- 显示 loading 和错误

### 后端负责

- 保管 API Key
- 过滤消息格式
- 组织系统提示词
- 调用第三方模型 API
- 统一处理错误

这就是典型的前后端分离思维。

---

## 28. 一个完整的“发送问题”例子

假设用户问：

```text
黄若杰为什么会从设计转向心理学与 AI 应用？
```

### 28.1 前端会发出这样的请求体

```json
{
  "messages": [
    {
      "role": "assistant",
      "content": "你好，我是黄若杰的 Digital Twin..."
    },
    {
      "role": "user",
      "content": "黄若杰为什么会从设计转向心理学与 AI 应用？"
    }
  ]
}
```

### 28.2 后端会追加 system 提示词

后端实际发给模型的是：

```ts
[
  { role: "system", content: DIGITAL_TWIN_CONTEXT },
  ...messages
]
```

### 28.3 AI 返回后，前端会把回答塞回消息列表

```ts
const updatedMessages = [
  ...messagesRef.current,
  { role: "assistant" as const, content: data.reply ?? "" },
];
```

然后页面就重新渲染。

---

## 29. 这套实现里值得学习的工程思路

即使你是初学者，这里也有几种很值得学的思路：

### 29.1 把敏感信息放在服务端

这是安全意识。

### 29.2 把“内容”和“展示”尽量分开

比如首页的数据用数组组织，而不是全部写死在标签里。

### 29.3 给模型清楚的边界

提示词不只是告诉 AI “你是谁”，还告诉它“不能胡说”。

### 29.4 把错误处理写完整

无论是：

- Key 缺失
- JSON 格式错误
- 上游失败
- 模型返回空内容

都给了相对明确的处理逻辑。

### 29.5 让交互更像产品，而不是 demo

比如：

- Enter 发送
- Shift + Enter 换行
- 自动滚动
- 发送中状态
- Markdown 渲染

这些细节会明显提升体验。

---

## 30. 如果你想自己动手改，最常改的地方在哪

### 改网站内容

去改：

- `src/app/page.tsx`

### 改首页样式

去改：

- `src/app/page.module.css`
- `src/app/globals.css`

### 改聊天框样式

去改：

- `src/components/DigitalTwinChat.module.css`

### 改聊天组件行为

去改：

- `src/components/DigitalTwinChat.tsx`

### 改 AI 人设或知识范围

去改：

- `src/app/api/digital-twin/route.ts`
- 尤其是 `DIGITAL_TWIN_CONTEXT`

### 改模型

去改：

```ts
const MODEL_NAME = "deepseek-v3.2";
```

---

## 31. 运行这个项目时，发生了什么

你平时运行：

```bash
npm run dev
```

这件事背后大概会发生：

1. Next.js 启动本地开发服务器
2. 它开始监听 `localhost:3000`
3. 浏览器访问时，它读取 `src/app` 里的页面
4. 页面中用到的组件会被组装起来
5. 当你发送聊天请求时，它调用 `route.ts`
6. `route.ts` 再去访问 AIHubMix

---

## 32. 自我审查：这段代码还能怎么继续改进

下面是我基于自我审查，认为这套实现还可以进一步加强的 5 个方向。

### 1. 给 Digital Twin 增加更严格的服务端输入限制

目前已经做了基础过滤，但还可以继续加强：

- 限制每条消息的最大长度
- 限制总消息数量和总字符数
- 防止极端长输入拖慢请求

例如可以增加：

```ts
if (content.length > 2000) {
  return false;
}
```

这会让接口更稳。

### 2. 为 AI 请求增加超时控制

现在如果上游模型很慢，用户就会等比较久。  
可以加 `AbortController` 来控制超时。

例如：

```ts
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 15000);

const response = await fetch(AIHUBMIX_URL, {
  method: "POST",
  signal: controller.signal,
  ...
});

clearTimeout(timeout);
```

这会让接口更像正式产品。

### 3. 给聊天记录做持久化

现在刷新页面后，聊天记录会消失。  
如果想让它更像真实应用，可以把聊天记录存到：

- `localStorage`
- 数据库
- 用户会话

对于前端初学者来说，先用 `localStorage` 就够了。

### 4. 把 `DIGITAL_TWIN_CONTEXT` 拆成单独的数据文件或配置模块

现在这段提示词直接写在 `route.ts` 里，短期很方便，但以后会越来越长。

更好的做法是拆出来，比如：

```text
src/lib/digitalTwinContext.ts
```

这样会更清晰，也更好维护。

### 5. 给聊天回答增加更精细的 Markdown 样式和可访问性优化

当前 Markdown 已经能渲染，但还能继续提升：

- 更好的代码块高亮
- 更清晰的表格样式
- 更友好的移动端排版
- 更好的键盘导航和屏幕阅读器支持

这会让产品在“能用”之外，更进一步走向“成熟”。

---

## 33. 最后的总结

这个项目的核心并不只是“把一个个人网站做出来”，而是把三个层次打通了：

1. **内容层**
   - 把你的经历、项目、能力结构组织成一个专业站点

2. **产品层**
   - 让访问者不只是阅读网页，而是可以直接提问

3. **工程层**
   - 用前端组件、服务端接口、环境变量和 AI API 把功能真正跑通

如果你作为初学者想记住最关键的一句话，可以记这个：

> 这个项目的本质，是“用 Next.js 做页面展示，用 React 管理交互，用服务端接口安全地连接 AI 模型”。

---

## 34. 建议你下一步可以怎么学

如果你想继续沿着这个项目学习，推荐按这个顺序：

1. 先完全读懂 `src/components/DigitalTwinChat.tsx`
2. 再读懂 `src/app/api/digital-twin/route.ts`
3. 然后尝试自己修改 `DIGITAL_TWIN_CONTEXT`
4. 再尝试新增一个新的页面区块
5. 最后尝试加一个新的 API 功能

这会比一开始就啃所有前端理论更有效，因为你是在“真实项目里学”。
