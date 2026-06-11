import { type ElementType, type ReactNode, type CSSProperties } from "react";
import { useReveal } from "@/hooks/useReveal";

type Variant = "fade-up" | "fade" | "scale" | "slide-left" | "slide-right";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

export function Reveal({
  children,
  as: Tag = "div",
  variant = "fade-up",
  delay = 0,
  className = "",
  style,
  id,
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal-init reveal-${variant} ${visible ? "reveal-in" : ""} ${className}`}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function RevealStagger({
  children,
  step = 80,
  className = "",
}: {
  children: ReactNode[];
  step?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {children.map((c, i) => (
        <Reveal key={i} delay={i * step}>
          {c}
        </Reveal>
      ))}
    </div>
  );
}
