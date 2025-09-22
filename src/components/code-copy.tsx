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

      // ラッパー作成
      const wrapper = document.createElement("div");
      wrapper.className = "code-copy-wrapper";

      // preの親要素を取得
      const parent = preEl.parentElement;
      if (!parent) return;

      // wrapperを挿入してpreを移動
      parent.insertBefore(wrapper, preEl);
      wrapper.appendChild(preEl);

      // コピーボタン作成
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "コピー";
      btn.className = "code-copy-btn";
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
