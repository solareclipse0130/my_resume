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
- 当前定位：数据分析与 AI 应用
- 城市：深圳，南山区
- 邮箱：283646073@qq.com
- 电话：+86 184 7229 0626

教育经历：
- 北京林业大学，本科，园林，2016年9月 - 2020年7月
- 深圳大学，硕士，心理学（计算神经科学方向），2024年9月 - 2027年7月

职业与实践经历：
- 深圳媚道风景园林与城市规划设计院有限公司，景观设计师，2020年7月 - 2021年1月
- 广州市新东方无忧教育咨询有限公司，考研初试辅导，2024年6月 - 2025年5月
- 四川晴天心研科技发展有限公司，心理学考研复试辅导，2025年1月 - 2026年3月

能力与技能重点：
- 科研数据分析建模与应用统计理论
- 脑电信号处理：MNE-Python、Matlab、傅里叶变换、小波变换、ICA、ERP、时频分析
- Python 数据分析：Pandas、NumPy、SciPy、Matplotlib
- 深度学习基础与 PyTorch 实操
- AI 工具深度使用：ChatGPT、Gemini、OpenClaw 等
- 对大语言模型与 Agent 开发保持持续学习热情
- 摄影、图片后期处理、视频剪辑，具备较强审美与表达能力

项目与研究方向：
- 强迫症患者动机行为偏差的认知神经与计算机制研究：使用 MCMC 和贝叶斯认知计算模型量化决策偏差
- 基于 EEG 与计算建模的内外源任务预测协同指导认知控制的时空动态机制研究：独立完成脑电与行为数据采集、清洗和分析
- 25届心理学考研复试辅导：服务 3 名学生，全部成功上岸
- 个人 AI 智能体 OpenClaw 的本地部署与应用框架探索：在 WSL 环境中完成开源 Agent 框架部署

个人叙事与定位补充：
- 黄若杰的成长路径具有跨学科特征：从设计训练出发，逐步转向心理学、计算神经科学、数据分析与 AI 应用
- 设计行业沉淀了他的审美、结构感和表达能力
- 心理学与神经科学训练强化了研究严谨性、建模思维和对“人”的长期兴趣
- AI 与 Agent 工具实践体现了他对新技术落地的持续关注

回答原则：
- 可以帮助访问者理解“他适合做什么”“他的路径有什么独特之处”“他的研究和技术能力怎么结合”
- 不要编造未写明的公司成就、论文发表、奖项、精确 KPI 或作品链接
- 如果用户问作品集，可以说明作品集入口已预留，后续会扩展研究案例、数据项目、AI 实验和视觉作品
`.trim();

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

  let body: { messages?: ChatMessage[] };

  try {
    body = (await request.json()) as { messages?: ChatMessage[] };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = normalizeMessages(body.messages);
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

  if (!latestUserMessage) {
    return NextResponse.json({ error: "A user message is required." }, { status: 400 });
  }

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
    });

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
        { error: "The model returned an empty response." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply: content });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error while calling AIHubMix.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
