import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const prose = [
  "prose prose-invert max-w-none prose-lg",
  "prose-headings:font-mono prose-headings:tracking-tight prose-headings:text-ink",
  "prose-p:text-ink-2 prose-li:text-ink-2 prose-strong:text-ink",
  "prose-a:text-signal prose-a:underline-offset-4 prose-a:decoration-signal-dim hover:prose-a:decoration-signal",
  "prose-code:font-mono prose-code:text-signal prose-code:before:content-none prose-code:after:content-none",
  "prose-code:bg-panel-2 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal",
  "prose-pre:border prose-pre:border-line prose-pre:bg-panel prose-pre:rounded-none prose-pre:text-sm",
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-ink",
  "prose-img:border prose-img:border-line",
  "prose-blockquote:border-l-signal prose-blockquote:text-ink-2 prose-blockquote:not-italic",
  "prose-hr:border-line prose-th:font-mono prose-th:text-xs prose-th:uppercase prose-th:text-muted",
  "prose-td:border-line prose-tr:border-line prose-thead:border-line-2",
].join(" ");

export function MarkdownBody({ content }: { content: string }) {
  return (
    <div className={prose}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
