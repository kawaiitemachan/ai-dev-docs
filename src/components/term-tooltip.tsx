import { clsx } from "clsx";
import type { ReactNode } from "react";

type TermProps = {
  children: ReactNode;
  definition: string;
  level?: "intro" | "basic" | "advanced";
};

function getLabel(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return `${children}`;
  }
  return "用語";
}

export function Term({ children, definition, level = "intro" }: TermProps) {
  return (
    <span className={clsx("term-tooltip", `term-tooltip--${level}`)}>
      <span
        className={clsx("term-tooltip__trigger", `term-tooltip__trigger--${level}`)}
        tabIndex={0}
        role="button"
        aria-label={`${getLabel(children)} の説明を表示`}
      >
        {children}
      </span>
      <span className="term-tooltip__panel" role="tooltip">
        {definition}
      </span>
    </span>
  );
}
