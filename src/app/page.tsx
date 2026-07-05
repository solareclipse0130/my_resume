import Link from "next/link";
import { DigitalTwinChat } from "@/components/DigitalTwinChat";
import styles from "./page.module.css";

const metrics = [
  { value: "4", label: "AI 项目", detail: "1 段职场落地 + 1 个上线 + 2 个获奖" },
  { value: "67", label: "候选人评分", detail: "生产级 AI 初筛流水线无人值守处理" },
  { value: "第 5", label: "黑客松名次", detail: "阶跃星辰 Agent 黑客松 30+ 队并列第五" },
];

const journey = [
  {
    year: "2016 — 2020",
    title: "北京林业大学 · 园林学士",
    body:
      "在空间、审美与秩序的训练中建立了对结构、叙事与视觉表达的长期敏感度，为之后的产品设计判断与信息编排打下底层能力。",
  },
  {
    year: "2020 — 2021",
    title: "景观设计师 · 深圳媚道风景园林与城市规划设计院",
    body:
      "进入真实项目环境，理解专业交付、团队协作与成品质量标准——设计训练进一步沉淀为对细节和交付质量的要求。",
  },
  {
    year: "2024 — 2027",
    title: "深圳大学 · 心理学硕士（计算神经科学方向）",
    body:
      "系统进入行为数据、脑电数据、统计建模与认知神经机制分析的训练，把对“人”与“决策”的兴趣转化为可建模、可验证的研究方法。",
  },
  {
    year: "2025 — 2026",
    title: "独立交付 4 个 AI Agent 产品（含上线 / 获奖）",
    body:
      "用 OpenAI Agents SDK / Claude Code 等 AI 编程工具，独立把想法做成产品：inner_crew 黑客松并列第五、your_sequence 已上线、marketing_workshop 获百炼潜力作品奖。",
  },
  {
    year: "2026.05 — 06",
    title: "其域创新 · AI 招聘提效实习",
    body:
      "独立搭建一条生产级 AI 简历初筛自动化流水线，无人值守处理并评分 67 位真实候选人，并据业务 bad case 迭代评分规则。",
  },
];

const projects: {
  tag: string;
  title: string;
  summary: string;
  link?: string;
  linkLabel?: string;
}[] = [
  {
    tag: "职场落地",
    title: "其域创新 · AI 招聘提效",
    summary:
      "独立设计并搭建生产级 AI 简历初筛流水线，无人值守评分 67 位候选人：Claude Code 子代理并行评分 + cron 定时取件 + Opus 限额自愈，并据业务 bad case 迭代 7 维评分规则。",
  },
  {
    tag: "获奖作品 · 黑客松并列第五",
    title: "inner_crew · 多智能体决策会议",
    summary:
      "用 OpenAI Agents SDK 把 6 种对立人格做成 6 个 Agent，编排「对峙—选边—裁决」三幕决策会议。产品与结构设计由本人主导，服务端无状态、状态由前端持有。",
    link: "https://github.com/solareclipse0130/inner_crew",
    linkLabel: "GitHub",
  },
  {
    tag: "已上线",
    title: "your_sequence · 情绪时间序列产品",
    summary:
      "独立设计并上线的全栈 AI 产品：把情绪记录做成降级输入阶梯，全部落到统一状态空间；有完整 PRD，关键产品决策体现对用户心理与真实使用门槛的把控。",
    link: "https://yoursequence.xyz",
    linkLabel: "访问",
  },
  {
    tag: "获奖作品",
    title: "marketing_workshop · 电商内容生产线",
    summary:
      "一句自然语言指令跑完整条电商内容生产线：文案 → 主图 → 海报 → 配音 → 图生视频 → 合成，90 分钟内交付竖屏成片。阿里云百炼「一行指令挑战赛」潜力作品奖。",
    link: "https://github.com/solareclipse0130/marketing_workshop",
    linkLabel: "GitHub",
  },
];

const capabilityGroups = [
  {
    title: "AI Agent 与编排（核心）",
    items: [
      "OpenAI Agents SDK：agents-as-tools / function_tool / guardrails / tracing",
      "Claude Code：Skills + Sub-agent 编排、cron 无人值守流水线",
      "阿里云百炼 CLI：多模型 / 多模态工作流编排",
    ],
  },
  {
    title: "Vibe-coding 产品落地",
    items: [
      "用 Claude Code / Cursor / Codex 在 WSL / Linux 独立把 AI 产品做到上线",
      "前后端、数据库、部署等具体实现借助 AI 完成并跑通",
      "习惯在 bad case 里一轮轮迭代，先定位根因再修",
    ],
  },
  {
    title: "Data & Neuroscience",
    items: [
      "Python 数据建模：Pandas / NumPy / SciPy",
      "贝叶斯认知建模（MCMC）与统计分析",
      "EEG 信号处理：MNE-Python、ICA、时频分析",
    ],
  },
  {
    title: "差异化 · 心理学 / 计算神经",
    items: [
      "用户状态与情绪测量、认知与动机机制",
      "行为数据建模与实验设计",
      "来自设计训练的审美与信息编排能力",
    ],
  },
];

const principles = [
  "先定位根因、用 bad case 驱动迭代，而不是靠猜。",
  "既懂模型的能力边界，也懂人的状态与动机——两头都要落进产品。",
  "用 AI 编程工具把想法快速 ship 成能跑、能用的东西。",
];

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.ambient} aria-hidden="true">
        <div className={styles.orbPrimary} />
        <div className={styles.orbSecondary} />
        <div className={styles.grid} />
      </div>

      <header className={styles.header}>
        <div>
          <p className={styles.brandKicker}>HUANG RUOJIE</p>
          <p className={styles.brandTitle}>黄若杰</p>
        </div>
        <nav className={styles.nav}>
          <a href="#journey">发展历程</a>
          <a href="#projects">项目亮点</a>
          <a href="#capabilities">能力矩阵</a>
          <a href="#digital-twin">数字分身</a>
          <Link href="/portfolio">作品集</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.sectionEyebrow}>AI Product · Psychology × Agent Engineering</p>
            <h1 className={styles.heroTitle}>
              用
              <span>心理学 × Agent 工程</span>
              ，把 AI 产品从想法独立做到上线。
            </h1>
            <p className={styles.heroDescription}>
              心理学（计算神经方向）硕士在读。近一年，我把这份对人的理解落进了 AI 产品：1 段真实职场 AI 落地、1
              个已上线产品、2 个获奖作品——能用 AI 编程工具独立把想法做成产品，既懂模型的能力边界，也懂人的状态与动机。
            </p>

            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#journey">
                查看职业路径
              </a>
              <Link className={styles.secondaryAction} href="/portfolio">
                前往作品集入口
              </Link>
              <a className={styles.ghostAction} href="/resume.pdf" target="_blank" rel="noreferrer">
                打开简历 PDF
              </a>
            </div>

            <ul className={styles.metricStrip}>
              {metrics.map((item) => (
                <li key={item.label} className={styles.metricCard}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                  <small>{item.detail}</small>
                </li>
              ))}
            </ul>
          </div>

          <aside className={styles.heroPanel}>
            <div className={styles.panelBadge}>Current Positioning</div>
            <h2>AI 产品实习生 · 心理学 × Agent 工程</h2>
            <p>
              以心理学 / 计算神经为交叉视角、工程落地为支撑：能编排多智能体、能用 AI 编程工具独立把产品做到上线，也能从
              bad case 里迭代出更靠谱的评分与体验。
            </p>

            <dl className={styles.identityList}>
              <div>
                <dt>邮箱</dt>
                <dd>
                  <a href="mailto:283646073@qq.com">283646073@qq.com</a>
                </dd>
              </div>
              <div>
                <dt>电话</dt>
                <dd>
                  <a href="tel:+8618487290626">+86 184 8729 0626</a>
                </dd>
              </div>
              <div>
                <dt>城市</dt>
                <dd>深圳 · 南山区</dd>
              </div>
              <div>
                <dt>教育</dt>
                <dd>深圳大学心理学硕士在读</dd>
              </div>
            </dl>

            <div className={styles.panelFootnote}>
              我关心的不只是把一件事做完，而是把它做成一个有逻辑、有审美、有说服力的作品。
            </div>
          </aside>
        </section>

        <section className={styles.storySection}>
          <div className={styles.storyLead}>
            <p className={styles.sectionEyebrow}>Profile</p>
            <h2>从设计训练到科学研究，再向 AI 落地推进。</h2>
          </div>
          <div className={styles.storyBody}>
            <p>
              从本科毕业到现在，我经历了一次真正意义上的方向迁移。驱动这次迁移的，不是“换赛道”的冲动，而是对人、决策与认知机制长期而真实的好奇。
            </p>
            <p>
              设计行业给了我审美、秩序感和对表达质量的要求；心理学训练给了我更严谨的研究框架；而 AI
              工具与工程实践，则让我看见把知识、分析与生产力连接起来的可能性。
            </p>
            <ul className={styles.principles}>
              {principles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="journey" className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>Career Journey</p>
            <h2>职业发展历程</h2>
            <p>
              这不是一条标准化履历，而是一条逐渐把兴趣、训练与方法论汇聚起来的路径。
            </p>
          </div>

          <div className={styles.timeline}>
            {journey.map((item) => (
              <article key={item.year + item.title} className={styles.timelineItem}>
                <span className={styles.timelineYear}>{item.year}</span>
                <div className={styles.timelineContent}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>Selected Work</p>
            <h2>项目亮点</h2>
            <p>研究、辅导与新技术尝试并行推进，重点在于方法、判断与落地能力的结合。</p>
          </div>

          <div className={styles.projectGrid}>
            {projects.map((project) => (
              <article key={project.title} className={styles.projectCard}>
                <span>{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                {project.link ? (
                  <a
                    className={styles.projectLink}
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.linkLabel} ↗
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section id="capabilities" className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>Capability Matrix</p>
            <h2>能力矩阵</h2>
            <p>我喜欢建立交叉能力，而不是把自己限制在单一标签里。</p>
          </div>

          <div className={styles.capabilityGrid}>
            {capabilityGroups.map((group) => (
              <article key={group.title} className={styles.capabilityCard}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="digital-twin" className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>Digital Twin</p>
            <h2>现在，你可以直接和这个站点里的 AI 分身对话。</h2>
            <p>
              它会基于黄若杰的教育背景、职业经历、研究路径、项目实践与能力结构，回答访问者关于“他是谁、做过什么、适合什么方向”的问题。
            </p>
          </div>

          <DigitalTwinChat />
        </section>

        <section className={styles.portfolioSection}>
          <div className={styles.portfolioCopy}>
            <p className={styles.sectionEyebrow}>Portfolio Gateway</p>
            <h2>作品集入口已经预留。</h2>
            <p>
              我已经把一级入口独立出来，后续可以继续扩展成案例页、研究页、实验页或项目数据库。这个站点不是终点，而是一个可持续升级的个人品牌基座。
            </p>
          </div>

          <div className={styles.portfolioPanel}>
            <p className={styles.portfolioLabel}>Next Step</p>
            <h3>Portfolio / Coming Soon</h3>
            <p>准备承接 AI 产品案例、Agent 项目拆解、上线复盘与更完整的个人叙事。</p>
            <Link className={styles.primaryAction} href="/portfolio">
              打开作品集预留页
            </Link>
          </div>
        </section>

        <section className={styles.contactSection}>
          <div>
            <p className={styles.sectionEyebrow}>Contact</p>
            <h2>如果你在找一个能把想法独立做成 AI 产品的人。</h2>
            <p>
              欢迎联系我。无论是 AI 产品、Agent 编排、AI 提效自动化，还是需要心理学视角的陪伴 / 情绪类产品，我都很期待参与其中。
            </p>
          </div>
          <div className={styles.contactLinks}>
            <a href="mailto:283646073@qq.com">283646073@qq.com</a>
            <a href="tel:+8618487290626">+86 184 8729 0626</a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">
              下载简历
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
