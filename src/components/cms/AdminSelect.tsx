import { cn } from "@/lib/utils";

type Props = React.SelectHTMLAttributes<HTMLSelectElement>;

/** Native select styled for the dark admin panel (visible options on all OS themes). */
export function AdminSelect({ className, children, ...props }: Props) {
  return (
    <select
      {...props}
      className={cn(
        "h-9 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground shadow-sm",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className,
      )}
    >
      {children}
    </select>
  );
}
