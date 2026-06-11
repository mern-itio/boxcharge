import { useMemo } from "react";

interface Props {
  count?: number;
}

export function Particles({ count = 28 }: Props) {
  const dots = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const seed = (i * 9301 + 49297) % 233280;
      const r = seed / 233280;
      return {
        left: `${(r * 100).toFixed(2)}%`,
        top: `${(((i * 53) % 100)).toFixed(2)}%`,
        size: 2 + ((i * 7) % 4),
        delay: ((i * 0.37) % 6).toFixed(2),
        duration: (8 + ((i * 1.3) % 8)).toFixed(2),
        opacity: 0.25 + ((i % 5) * 0.08),
      };
    });
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary"
          style={{
            left: d.left,
            top: d.top,
            width: `${d.size}px`,
            height: `${d.size}px`,
            opacity: d.opacity,
            filter: "blur(0.5px)",
            boxShadow: "0 0 8px oklch(0.78 0.16 240 / 0.7)",
            animation: `particle-float ${d.duration}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
