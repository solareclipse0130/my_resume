import Link from "next/link";
import styles from "./portfolio.module.css";

export default function PortfolioPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <p className={styles.eyebrow}>Portfolio Gateway</p>
        <h1>作品集正在构建中。</h1>
        <p className={styles.description}>
          这里已经作为一级入口预留完成。后续可以继续扩展为研究案例、数据分析项目、AI
          实验、视觉作品与更完整的个人项目档案。
        </p>

        <div className={styles.statusGrid}>
          <article>
            <span>01</span>
            <h2>Research Cases</h2>
            <p>认知建模、EEG 分析、心理学研究方法与论文型项目整理。</p>
          </article>
          <article>
            <span>02</span>
            <h2>AI Experiments</h2>
            <p>Agent 部署、工具流设计、AI 辅助分析与个人工作流实验。</p>
          </article>
          <article>
            <span>03</span>
            <h2>Visual Works</h2>
            <p>摄影、图像后期、视频剪辑与视觉表达相关内容的补充空间。</p>
          </article>
        </div>

        <div className={styles.actions}>
          <Link href="/">返回首页</Link>
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            查看简历
          </a>
        </div>
      </div>
    </main>
  );
}
