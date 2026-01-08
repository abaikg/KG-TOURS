"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { WHATSAPP_PHONE } from "@/config/site";

type NavItem = { label: string; href: string; key: string; icon?: string };

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("tours");
  const [mounted, setMounted] = useState(false);
  const [elevated, setElevated] = useState(false);

  const nav: NavItem[] = useMemo(
    () => [
      { label: "Туры", href: "/#tours", key: "tours", icon: "🧭" },
      { label: "О нас", href: "/#about", key: "about", icon: "🌿" },
      { label: "Отзывы", href: "/#reviews", key: "reviews", icon: "⭐" },
      { label: "Контакты", href: "/#contacts", key: "contacts", icon: "📞" },
    ],
    []
  );

  const waText = useMemo(
    () => encodeURIComponent("Здравствуйте! Хочу подобрать тур по Кыргызстану."),
    []
  );

  const waLink = useMemo(
    () => `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${waText}`,
    [waText]
  );

  // Shadow on scroll (premium feel)
  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll + mount animation
  useEffect(() => {
    if (open) {
      setMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const t = window.setTimeout(() => setMounted(false), 180);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  // Esc closes
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Active section highlight on home
  useEffect(() => {
    if (pathname !== "/") return;

    const ids = ["tours", "about", "reviews", "contacts"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.4, 0.6], rootMargin: "-12% 0px -72% 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* glass bar: LOGO + BURGER ONLY */}
      <div
        className={[
          "bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70",
          "border-b border-black/5",
          elevated ? "shadow-[0_10px_30px_rgba(17,24,39,0.08)]" : "",
        ].join(" ")}
      >
        <div className="container-x">
          <div className="h-16 flex items-center justify-between">
            <Link
              href="/"
              className="rounded-2xl ring-brand"
              aria-label="На главную"
              title="На главную"
            >
              <Image
                src="/logo-ayan.webp"
                alt="KG Tours"
                width={300}
                height={60}
                priority
                className="h-14 w-auto max-w-[300px] object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-white
                         hover:bg-black/[0.04] transition active:scale-[0.98] ring-brand"
              aria-label="Открыть меню"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              title="Меню"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Drawer */}
      {mounted && (
        <div className="fixed inset-0 z-[60]">
          {/* overlay */}
          <button
            className={[
              "absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-200",
              open ? "opacity-100" : "opacity-0",
            ].join(" ")}
            onClick={() => setOpen(false)}
            aria-label="Закрыть меню"
          />

          <div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            className={[
              "absolute right-0 top-0 h-full w-[92%] max-w-[420px] bg-white",
              "border-l border-black/10 shadow-2xl",
              "transition-transform duration-200 will-change-transform",
              open ? "translate-x-0" : "translate-x-full",
            ].join(" ")}
          >
            {/* top */}
            <div className="h-16 px-4 border-b border-black/5 flex items-center justify-between">
              <div className="min-w-0">
                <div className="font-semibold text-gray-900 truncate">Меню</div>
                <div className="text-xs text-[color:var(--text-muted)] truncate">
                  Быстрый переход по разделам
                </div>
              </div>

              <button
                className="h-11 w-11 rounded-2xl border border-black/10 hover:bg-black/[0.04] transition active:scale-[0.98] ring-brand"
                onClick={() => setOpen(false)}
                aria-label="Закрыть"
                title="Закрыть"
              >
                ✕
              </button>
            </div>

            <div className="px-4 py-5">
              {/* nav links */}
              <div className="rounded-3xl border border-black/10 bg-white p-2">
                <div className="grid gap-1">
                  {nav.map((item) => {
                    const isActive = pathname === "/" && active === item.key;
                    return (
                      <Link
                        key={item.key}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={[
                          "flex items-center gap-3 rounded-2xl px-4 py-3 transition",
                          "hover:bg-black/[0.04] active:scale-[0.99] ring-brand",
                          isActive
                            ? "bg-[var(--brand)]/10 text-gray-900"
                            : "text-gray-900",
                        ].join(" ")}
                      >
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-black/[0.04]">
                          {item.icon ?? "•"}
                        </span>
                        <div className="flex-1">
                          <div className="font-semibold">{item.label}</div>
                          <div className="text-xs text-[color:var(--text-muted)]">
                            Перейти к разделу
                          </div>
                        </div>
                        <span className="text-gray-400">›</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-4 grid gap-2">
                <Link
                  href="/#tours"
                  onClick={() => setOpen(false)}
                  className="w-full btn btn-primary ring-brand"
                >
                  Подобрать тур
                </Link>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="w-full btn btn-secondary ring-brand"
                >
                  Написать в WhatsApp
                </a>
              </div>

              <div className="mt-3 text-xs text-[color:var(--text-muted)]">
                Телефон:{" "}
                <span className="text-gray-900 font-medium">
                  +{WHATSAPP_PHONE}
                </span>
              </div>

              <div className="mt-5 rounded-2xl border border-black/10 bg-black/[0.03] p-4">
                <div className="text-xs text-[color:var(--text-muted)]">
                  Быстро
                </div>
                <div className="mt-1 text-sm font-medium text-gray-900">
                  Напишите — подберём тур под ваш бюджет и даты.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
