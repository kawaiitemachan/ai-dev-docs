"use client";

import { useEffect } from "react";

export function CodeCopy() {
  useEffect(() => {
    const container = document.getElementById("content");
    if (!container) return;

    const pres = Array.from(container.querySelectorAll("pre"));
    pres.forEach((pre) => {
      if ((pre as HTMLElement).dataset.hasCopy === "true") return;
      (pre as HTMLElement).dataset.hasCopy = "true";
      (pre as HTMLElement).classList.add("relative");

      const btn = document.createElement("button");
      btn.textContent = "コピー";
      btn.className = [
        "absolute right-2 top-2 z-10 rounded-md px-2 py-1 text-xs/5 font-medium",
        "bg-white/90 text-gray-900 ring-1 ring-gray-950/10 hover:bg-white",
        "dark:bg-gray-800/80 dark:text-white dark:ring-white/10 dark:hover:bg-gray-800",
      ].join(" ");
      btn.addEventListener("click", async () => {
        const code = pre.querySelector("code");
        const text = code ? (code as HTMLElement).innerText : pre.textContent || "";
        try {
          await navigator.clipboard.writeText(text);
          const old = btn.textContent;
          btn.textContent = "コピー済み";
          setTimeout(() => (btn.textContent = old || "コピー"), 1400);
        } catch {}
      });

      pre.appendChild(btn);
    });
  }, []);

  return null;
}

