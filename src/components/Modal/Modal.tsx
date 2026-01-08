"use client";

import { useEffect, useId, useRef } from "react";

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

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // focus on open
    const t = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      // simple focus trap
      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;

        const focusables = Array.from(
          root.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));

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
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* overlay */}
      <button
        className="absolute inset-0 bg-black/55 backdrop-blur-[3px] transition-opacity animate-[fadeIn_.18s_ease-out]"
        onClick={onClose}
        aria-label="Закрыть"
      />

      {/* wrapper */}
      <div className="absolute inset-0 flex items-end sm:items-center justify-center p-3 sm:p-6">
        {/* dialog */}
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={[
            "w-full max-w-xl overflow-hidden bg-white",
            "ring-1 ring-black/10 shadow-[0_30px_80px_rgba(17,24,39,0.22)]",
            "rounded-[26px] sm:rounded-[28px]",
            // mobile = bottom sheet
            "sm:translate-y-0",
            "animate-[modalUp_.22s_cubic-bezier(.2,.8,.2,1)]",
          ].join(" ")}
        >
          {/* top handle for mobile */}
          <div className="sm:hidden flex justify-center pt-3">
            <div className="h-1 w-12 rounded-full bg-black/10" />
          </div>

          {/* header */}
          <div className="px-6 pt-5 pb-4 border-b border-black/5 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.04),transparent)]">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xs text-[color:var(--text-muted)]">
                  Заявка
                </div>
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
                  "h-10 w-10 rounded-2xl",
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

          {/* content */}
          <div className="p-6">{children}</div>
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
