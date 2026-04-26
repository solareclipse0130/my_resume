"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./DigitalTwinChat.module.css";

type Message = {
  role: "assistant" | "user";
  content: string;
};

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "你好，我是黄若杰的 Digital Twin。你可以直接问我他的职业路径、研究方向、项目经历、技能结构，或者为什么他会从设计走向心理学与 AI 应用。",
};

const SUGGESTIONS = [
  "他的职业路径为什么会从设计转向心理学与 AI？",
  "他现在最适合申请什么类型的岗位或合作机会？",
  "请总结一下他的研究能力和技术能力是怎么结合的。",
  "他在 EEG、数据分析和 AI 工具方面分别有哪些积累？",
];

export function DigitalTwinChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesRef = useRef<Message[]>([INITIAL_MESSAGE]);

  const canSend = input.trim().length > 0 && !isLoading;

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  function scrollToBottom(behavior: ScrollBehavior = "smooth") {
    requestAnimationFrame(() => {
      viewportRef.current?.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior,
      });
    });
  }

  useEffect(() => {
    scrollToBottom(messages.length > 1 ? "smooth" : "auto");
  }, [isLoading, messages]);

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
      requestAnimationFrame(() => {
        textareaRef.current?.focus();
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitMessage(input);
  }

  async function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      await submitMessage(input);
    }
  }

  return (
    <div className={styles.shell}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Interactive AI Layer</p>
          <h3>与 Digital Twin 对话</h3>
        </div>
        <div className={styles.meta}>
          <span>职业经历问答</span>
        </div>
      </div>

      <p className={styles.intro}>
        这个数字分身会基于网站与简历中的资料，回答关于黄若杰职业经历、研究路径、项目方向与能力结构的问题。
      </p>

      <div className={styles.suggestionRow}>
        {SUGGESTIONS.map((question) => (
          <button
            key={question}
            type="button"
            className={styles.suggestion}
            onClick={() => void submitMessage(question)}
            disabled={isLoading}
          >
            {question}
          </button>
        ))}
      </div>

      <div ref={viewportRef} className={styles.viewport}>
        {messages.map((message, index) => (
          <article
            key={`${message.role}-${index}`}
            className={message.role === "assistant" ? styles.assistantBubble : styles.userBubble}
          >
            <span className={styles.role}>
              {message.role === "assistant" ? "Digital Twin" : "Visitor"}
            </span>
            <div className={styles.markdown}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
            </div>
          </article>
        ))}

        {isLoading ? (
          <article className={styles.assistantBubble}>
            <span className={styles.role}>Digital Twin</span>
            <p className={styles.loading}>正在思考中...</p>
          </article>
        ) : null}
      </div>

      <form className={styles.composer} onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => void handleKeyDown(event)}
          placeholder="例如：请用招聘者能快速理解的方式介绍一下他的职业路径。"
          rows={4}
        />
        <div className={styles.footer}>
          <p className={styles.hint}>
            如果问题超出资料范围，Digital Twin 会明确说明，而不会编造信息。按 Enter 发送，Shift + Enter 换行。
          </p>
          <button type="submit" disabled={!canSend}>
            {isLoading ? "生成中..." : "发送问题"}
          </button>
        </div>
      </form>

      {error ? <p className={styles.error}>请求失败：{error}</p> : null}
    </div>
  );
}
