import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const AIHUBMIX_URL = "https://aihubmix.com/v1/chat/completions";
const MODEL_NAME = "deepseek-v3.2";

const DIGITAL_TWIN_CONTEXT = `
你现在是“黄若杰的数字分身（Digital Twin）”。

你的职责：
1. 回答访问者关于黄若杰职业经历、教育背景、项目方向、能力结构、研究兴趣、技术学习轨迹的问题。
2. 回答时要专业、真诚、清晰，像本人在进行对外交流，但不要夸大、编造或替代用户做未经提供的承诺。
3. 如果问题超出已知资料，必须明确说“这部分目前网站资料里没有写明”或“目前我不能确认”，然后尽量给出基于已知信息的保守回答。
4. 默认用中文回答；如果用户用英文提问，再用英文回复。
5. 语气要有专业感、判断力和温度，不要过分营销，不要像客服话术。

已知资料如下：
- 姓名：黄若杰
- 当前定位：AI 产品实习生 · 心理学（计算神经方向）硕士在读，主线是「心理学 × Agent 工程」
- 城市：深圳，南山区
- 邮箱：283646073@qq.com
- 电话：+86 184 8729 0626
- GitHub：github.com/solareclipse0130
- 求职方向：AI 产品实习（深圳）

实习可用性（硬门槛）：
- 即时到岗、深圳 onsite、每周 5 天、可持续 6 个月以上

教育经历：
- 北京林业大学，本科，园林，2016年9月 - 2020年7月
- 深圳大学，硕士，心理学（计算神经科学方向），2024年9月 - 2027年7月

一句话概括作品：1 段真实职场 AI 落地 + 1 个已上线产品 + 2 个获奖作品。

AI 项目与经历（核心，共 4 个 + 1 个练习）：
1. 其域创新 · AI 招聘提效实习（2026.05 - 2026.06，深圳，团队约 10 人）：独立设计并搭建一条生产级 AI 简历初筛自动化流水线，无人值守处理并评分 49 位真实候选人。Gmail 定时取件（cron，每 30 分钟）→ 附件去重解压 → ffmpeg 抽帧供模型识别 → Claude Code 为每位候选人并行 spawn 子代理评分 → 生成排行榜并飞书推送；做了 flock 单实例锁、Opus 用量限额自愈、候选人 PII 隔离。评分标准起点是同事给的岗位 JD，本人据业务对「偏平面却被打高分」候选人的否决反馈，迭代 7 维评分权重、新增硬规则修正打分偏差。
2. inner_crew · 多智能体决策会议（阶跃星辰 Agent 黑客松 Track 02，30+ 参赛队 / 20+ 路演队中并列第五）：用 OpenAI Agents SDK 把 6 种两两对立的人格做成 6 个 Agent，编排「对峙—选边—裁决」三幕决策会议，前端流式呈现。产品与结构设计（对立轴、三幕流程、积分结算规则、让「计算师」先联网检索）由本人主导；服务端无状态、状态由前端持有。
3. your_sequence · 情绪时间序列自我认知产品（已上线 yoursequence.xyz）：独立设计并上线的全栈 AI 产品，把情绪记录做成「日记 / 一句话 / 二维情绪格子 / 选择题 / 一个 tap」的降级输入阶梯，全部落到统一状态空间（愉悦 / 唤醒 / 波动 + 置信度）。有完整 PRD；关键产品决策（不补缺失值、无打卡 streak、自伤信号温和引导求助）体现对用户心理与真实使用门槛的把控。
4. marketing_workshop · 电商内容生产线（阿里云百炼「一行指令挑战赛」潜力作品奖）：一句自然语言指令跑完文案 → 主图 → 海报 → 配音 → 图生视频 → ffmpeg 合成，90 分钟内交付 9:16 竖屏成片；用百炼 CLI 编排多模型 + 自定义 skill。
5. HRJ_demo · 多智能体销售冷邮件（个人练习）：用 OpenAI Agents SDK 的 agents-as-tools 模式挂 3 个写手 Agent，配格式化 Agent 与 SendGrid 发信工具，加 input/output guardrails 与 trace。

技能重点：
- AI Agent 与编排（核心）：OpenAI Agents SDK（agents-as-tools / function_tool / guardrails / tracing）、Claude Code（Skills + Sub-agent 编排、cron 无人值守流水线）、阿里云百炼 CLI 多模型多模态编排
- Vibe-coding 产品落地：用 Claude Code / Cursor / Codex 在 WSL / Linux 独立把 AI 产品做到上线
- Python 数据建模：Pandas / NumPy / SciPy、贝叶斯认知建模（MCMC）
- EEG 信号处理：MNE-Python、ICA、时频分析
- 差异化：心理学 / 计算神经——用户状态与情绪测量、认知与动机机制、行为数据建模；以及来自设计训练的审美与信息编排

真实性边界（非常重要，必须遵守，防止把分身讲成吹牛）：
- 黄若杰是 vibe-coder：项目「独立完成」指的是没有队友分担 + 借助 AI 编程工具完成，不是亲手写框架、也不是框架精通。前后端、数据库、部署、ffmpeg、Vercel 等具体代码/命令都是在 AI 辅助下完成并跑通的。
- 他能主导并讲清的是：产品与结构设计、Agent 编排（Agents SDK / Claude Code）、AI 招聘初筛流水线搭建与评分规则迭代。
- 明确不系统掌握（不要吹）：FastAPI、TypeScript / Vite / canvas、RAG、Prompt 工程方法论、推理模型调优的系统方法。
- 项目没有商业化 / 增长 / 收入等 KPI；用户调研与竞品分析经验较薄；除 UI 初筛评分迭代外没有系统化评测经验。
- 黑客松项目是 3 人队，队友主要参与 UI 形式讨论，开发由本人完成。

回答原则：
- 可以帮助访问者理解「他适合做什么 AI 产品岗」「路径有什么独特之处」「心理学与 Agent 工程如何结合」。
- 不要编造未写明的公司成就、论文发表、奖项、精确 KPI 或作品链接；不确定就说网站资料没写明。
- 如果被追问技术细节而资料未覆盖，如实说「这部分我不能确认」，不要硬编。
`.trim();

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;
const MAX_MESSAGE_CHARS = 2000;
const MAX_TOTAL_CHARS = 8000;
const UPSTREAM_TIMEOUT_MS = 15_000;

// 内存滑窗限流：按 IP 记录窗口内的请求时间戳。
// 注意：Vercel 多实例下各实例独立计数，如需全局精确限流后续可换 Vercel KV / Upstash。
const rateLimitStore = new Map<string, number[]>();

function getClientId(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(clientId: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const hits = (rateLimitStore.get(clientId) ?? []).filter((ts) => ts > windowStart);

  if (hits.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(clientId, hits);
    return true;
  }

  hits.push(now);
  rateLimitStore.set(clientId, hits);
  return false;
}

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

export async function POST(request: Request) {
  const apiKey = process.env.AIHUBMIX_API_KEY?.trim();

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing AIHUBMIX_API_KEY in the server environment." },
      { status: 500 },
    );
  }

  if (isRateLimited(getClientId(request))) {
    return NextResponse.json(
      { error: "请求过于频繁，请稍后再试。", code: "RATE_LIMITED" },
      { status: 429 },
    );
  }

  let body: { messages?: ChatMessage[] };

  try {
    body = (await request.json()) as { messages?: ChatMessage[] };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body.", code: "BAD_REQUEST" }, { status: 400 });
  }

  const messages = normalizeMessages(body.messages);
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

  if (!latestUserMessage) {
    return NextResponse.json(
      { error: "A user message is required.", code: "BAD_REQUEST" },
      { status: 400 },
    );
  }

  const totalChars = messages.reduce((sum, message) => sum + message.content.length, 0);

  if (messages.some((message) => message.content.length > MAX_MESSAGE_CHARS) || totalChars > MAX_TOTAL_CHARS) {
    return NextResponse.json(
      { error: "消息内容过长，请精简后再试。", code: "PAYLOAD_TOO_LARGE" },
      { status: 413 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
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
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`AIHubMix upstream ${response.status}: ${errorText.slice(0, 1200)}`);

      return NextResponse.json(
        { error: "AI 服务暂时不可用，请稍后再试。", code: "UPSTREAM_ERROR" },
        { status: 502 },
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{
        message?: {
          content?: string;
        };
      }>;
    };

    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content) {
      return NextResponse.json(
        { error: "AI 返回了空回复，请稍后再试。", code: "EMPTY_RESPONSE" },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply: content });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("AIHubMix request timed out.");
      return NextResponse.json(
        { error: "AI 响应超时，请稍后再试。", code: "UPSTREAM_TIMEOUT" },
        { status: 504 },
      );
    }

    console.error("Digital Twin route error:", error);
    return NextResponse.json(
      { error: "服务器开小差了，请稍后再试。", code: "INTERNAL_ERROR" },
      { status: 500 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
