import type React from "react";

export function Logo(props: React.ComponentPropsWithoutRef<"div">) {
  const { className, ...rest } = props;
  return (
    <div className={`font-bold tracking-tight ${className || ""}`} {...rest}>
      <span className="text-current">AI</span>
      <span className="text-current opacity-80"> Dev</span>
      <span className="text-current opacity-60"> Lab</span>
    </div>
  );
}
