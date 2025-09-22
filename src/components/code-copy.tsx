"use client";

import { useEffect } from "react";

export function CodeCopy() {
  useEffect(() => {
    const container = document.getElementById("content");
    if (!container) return;

    const pres = Array.from(container.querySelectorAll("pre"));
    pres.forEach((pre) => {
      const preEl = pre as HTMLElement;
      if (preEl.dataset.hasCopy === "true") return;
      preEl.dataset.hasCopy = "true";

      const styles = window.getComputedStyle(preEl);
      const wrapper = document.createElement("div");
      wrapper.className = "code-copy-wrapper";
      wrapper.style.position = "relative";
      wrapper.style.display = "block";
      wrapper.style.marginTop = styles.marginTop;
      wrapper.style.marginBottom = styles.marginBottom;
      wrapper.style.marginLeft = styles.marginLeft;
      wrapper.style.marginRight = styles.marginRight;

      preEl.style.margin = "0";
      
      const parent = preEl.parentElement;
      if (!parent) return;
      parent.insertBefore(wrapper, preEl);
      wrapper.appendChild(preEl);

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

      wrapper.appendChild(btn);
    });
  }, []);

  return null;
}
