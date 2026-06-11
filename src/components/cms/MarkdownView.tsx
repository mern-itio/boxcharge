import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export function MarkdownView({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn("prose prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
