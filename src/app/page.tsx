import Link from "next/link";
import styles from "./page.module.css";

const metrics = [
  { value: "2", label: "学科主线", detail: "园林设计 × 心理学 / 计算神经科学" },
  { value: "2023", label: "AI 原生起点", detail: "自 ChatGPT 时代开始持续构建 AI 工作流" },
  { value: "3/3", label: "辅导成果", detail: "复试深度辅导学生全部成功上岸" },
];

const journey = [
  {
    year: "2016 — 2020",
    title: "北京林业大学 · 园林学士",
    body:
      "在空间、审美与秩序的训练中建立了对结构、叙事和视觉表达的长期敏感度，也为之后的设计判断与内容呈现打下底层能力。",
  },
  {
    year: "2020 — 2021",
    title: "景观设计师 · 深圳媚道风景园林与城市规划设计院",
    body:
      "进入真实项目环境，理解专业交付、团队协作与高标准表达。在这段经历里，设计训练进一步沉淀为对细节和成品质量的要求。",
  },
  {
    year: "2023 — 至今",
    title: "AI 工具深度使用者",
    body:
      "从 ChatGPT 开始，将大语言模型逐步整合进学习、科研、分析和日常工作流中，持续关注 Agent、自动化与 AI 落地的真实价值。",
  },
  {
    year: "2024 — 2027",
    title: "深圳大学 · 心理学硕士（计算神经科学方向）",
    body:
      "把对“人”与“决策”的兴趣转化为科学研究路径，系统进入行为数据、脑电数据、统计建模与认知神经机制分析的训练。",
  },
  {
    year: "2024 — 2026",
    title: "研究生考试辅导与知识传递",
    body:
      "先后参与初试与复试辅导，不依赖模板化路径，而是围绕候选人的兴趣、经历和优势做个性化表达策略设计，帮助学生放大不可替代性。",
  },
  {
    year: "2025 — 2026",
    title: "研究与应用并进",
    body:
      "围绕 OCD 动机行为偏差、EEG 任务预测与认知控制机制、个人 Agent 部署等主题推进项目，把科研分析、技术试验与落地实践连成一条线。",
  },
];

const projects = [
  {
    tag: "认知计算建模",
    title: "强迫症患者动机行为偏差研究",
    summary:
      "面向复杂行为数据与脑电数据，使用 MCMC 方法构建贝叶斯认知计算模型，量化患者在动机行为中的决策偏差。",
  },
  {
    tag: "脑电数据分析",
    title: "EEG 与认知控制时空动态机制",
    summary:
      "基于 MNE-Python 独立完成被试脑电与行为数据采集、清洗与分析，结合 ICA、时频分析与 ERP 研究协同脑区机制。",
  },
  {
    tag: "知识传递",
    title: "心理学复试深度辅导",
    summary:
      "服务 3 位考生，围绕个人优势、兴趣轨迹与面试表达做定制化策略设计，最终实现 3 位考生全部上岸。",
  },
  {
    tag: "Agent 落地",
    title: "OpenClaw 本地部署与应用探索",
    summary:
      "在 WSL 环境中从零完成开源 Agent 框架的本地部署与环境配置，探索 LLM 在科研分析场景中的真实落地方式。",
  },
];

const capabilityGroups = [
  {
    title: "Data & Statistics",
    items: [
      "相关分析、卡方检验、t 检验、方差分析",
      "描述统计与科研向可视化表达",
      "Pandas / NumPy / SciPy 数据流程",
    ],
  },
  {
    title: "Neuroscience & EEG",
    items: [
      "MNE-Python / Matlab 脑电预处理与分析",
      "傅里叶变换、小波变换、ICA 伪迹去除",
      "ERP 与时频分析的研究应用",
    ],
  },
  {
    title: "AI & Engineering Curiosity",
    items: [
      "ChatGPT、Gemini、OpenClaw 等工具深度实践",
      "理解深度学习基础原理与 PyTorch 实操",
      "对 LLM 与 Agent 开发保持持续学习热情",
    ],
  },
  {
    title: "Visual & Narrative Taste",
    items: [
      "摄影、图片后期与视频剪辑",
      "来自设计行业训练的审美与信息编排能力",
      "能把复杂内容组织成更清晰、更有说服力的表达",
    ],
  },
];

const principles = [
  "把复杂问题拆成结构化、可验证、可表达的分析对象。",
  "既尊重学术严谨，也相信技术最终要服务真实场景。",
  "在专业感之上保留锋芒，持续寻找跨学科的连接点。",
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
          <Link href="/portfolio">作品集</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.sectionEyebrow}>Data Analysis / AI Application / Cognitive Science</p>
            <h1 className={styles.heroTitle}>
              一个正在把
              <span>研究能力、技术热情与表达审美</span>
              融成同一种专业能力的人。
            </h1>
            <p className={styles.heroDescription}>
              我目前聚焦数据分析、AI 应用与计算神经科学。我的路径并不单线：从园林设计出发，走进心理学研究，再向
              AI 与 Agent 的真实落地靠近。我希望做的不只是“会工具”，而是把复杂问题看清、拆解、建模，并最终交付成可信的成果。
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
            <h2>数据分析与 AI 应用</h2>
            <p>
              以心理学与计算神经科学为研究主轴，同时持续把统计建模、脑电数据分析、LLM
              工具链与个人工作流整合到同一套专业体系中。
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
                  <a href="tel:+8618472290626">+86 184 8729 0626</a>
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
            <p>准备承接科研案例、数据项目、AI 实验、视觉作品与更完整的个人叙事。</p>
            <Link className={styles.primaryAction} href="/portfolio">
              打开作品集预留页
            </Link>
          </div>
        </section>

        <section className={styles.contactSection}>
          <div>
            <p className={styles.sectionEyebrow}>Contact</p>
            <h2>如果你正在寻找一个兼具分析、审美与学习能力的人。</h2>
            <p>
              欢迎联系我。无论是研究、数据分析、AI 应用探索，还是需要高质量表达与结构化思考的工作，我都很期待参与其中。
            </p>
          </div>
          <div className={styles.contactLinks}>
            <a href="mailto:283646073@qq.com">283646073@qq.com</a>
            <a href="tel:+8618472290626">+86 184 8729 0626</a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">
              下载简历
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
