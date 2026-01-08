"use client";

import React, { useEffect, useId, useRef } from "react";

type Props = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ isOpen, title, onClose, children }: Props) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // lock scroll + компенсация scrollbars (чтобы не прыгал контент)
    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPaddingRight = body.style.paddingRight;

    const scrollBarWidth = window.innerWidth - html.clientWidth;
    if (scrollBarWidth > 0) body.style.paddingRight = `${scrollBarWidth}px`;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const t = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      // focus trap
      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;

        const focusables = Array.from(
          root.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");

        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(t);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevBodyPaddingRight;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[100]",
        // iOS/клавиатура: dvh важнее чем vh
        "min-h-[100vh] min-h-[100dvh]",
      ].join(" ")}
    >
      {/* overlay */}
      <button
        className="absolute inset-0 bg-black/55 backdrop-blur-[3px] animate-[fadeIn_.18s_ease-out]"
        onClick={onClose}
        aria-label="Закрыть"
      />

      {/* wrapper */}
      <div
        className={[
          "absolute inset-0 flex justify-center",
          // mobile bottom-sheet
          "items-end sm:items-center",
          // на мобиле без боковых отступов, на desktop — с отступами
          "p-0 sm:p-6",
          // safe-area (iPhone)
          "pb-[env(safe-area-inset-bottom)]",
          "overscroll-contain",
        ].join(" ")}
      >
        {/* dialog */}
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={[
            // на мобиле: во всю ширину, как bottom sheet
            "w-full sm:max-w-xl",
            "bg-white overflow-hidden",
            "ring-1 ring-black/10 shadow-[0_30px_80px_rgba(17,24,39,0.22)]",

            // bottom-sheet радиусы
            "rounded-t-[26px] sm:rounded-[28px]",

            // высота: чтобы влезало при клавиатуре
            "flex flex-col min-h-0",
            "max-h-[calc(100dvh-0rem)] sm:max-h-[calc(100dvh-3rem)]",

            // анимация
            "animate-[modalUp_.22s_cubic-bezier(.2,.8,.2,1)]",
          ].join(" ")}
        >
          {/* handle */}
          <div className="sm:hidden flex justify-center pt-3 shrink-0">
            <div className="h-1 w-12 rounded-full bg-black/10" />
          </div>

          {/* header */}
          <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-black/5 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.04),transparent)] shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xs text-[color:var(--text-muted)]">Заявка</div>
                <h2
                  id={titleId}
                  className="mt-1 text-lg sm:text-xl font-semibold text-gray-900 truncate"
                >
                  {title ?? "Оставьте заявку"}
                </h2>
              </div>

              <button
                ref={closeBtnRef}
                onClick={onClose}
                className={[
                  "h-10 w-10 rounded-2xl shrink-0",
                  "border border-black/10 bg-white",
                  "hover:bg-black/[0.04] transition active:scale-[0.98]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/25",
                ].join(" ")}
                aria-label="Закрыть"
                title="Закрыть"
              >
                ✕
              </button>
            </div>
          </div>

          {/* content (скролл внутри, чтобы кнопка не уходила за экран) */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 sm:py-6">
            {children}
          </div>

          {/* небольшой нижний отступ под safe-area, чтобы не прилипало */}
          <div className="h-[env(safe-area-inset-bottom)] shrink-0" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes modalUp {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
