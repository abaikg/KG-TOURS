"use client";

import { useMemo, useState } from "react";
import { WHATSAPP_PHONE /*, SITE_URL */ } from "@/config/site";

type Props = {
  tourTitle: string;
  tourUrl: string; // может быть относительным путём — нормализуем ниже
  onSent?: () => void;
};

function onlyDigits(s: string) {
  return s.replace(/\D/g, "");
}

function formatPhoneForDisplay(input: string) {
  const raw = input.trim();
  if (!raw) return "";

  if (raw.startsWith("+")) {
    const digits = onlyDigits(raw);
    return "+" + digits;
  }

  let digits = onlyDigits(raw);

  if (digits.startsWith("996")) digits = digits.slice(3);
  if (digits.startsWith("0")) digits = digits.slice(1);

  const full = "996" + digits;
  return "+" + full;
}

function isPhoneValid(input: string) {
  const v = formatPhoneForDisplay(input);
  const digits = onlyDigits(v);
  // допустим «+996» + минимум 8 локальных цифр
  return digits.length >= 11;
}

/** Делает URL абсолютным (нужно для кликабельности в WhatsApp). */
function toAbsoluteUrl(u: string) {
  if (!u) return "";
  try {
    // если есть SITE_URL в конфиге — раскомментируй следующую строку и закомментируй window.location.origin
    // return new URL(u, SITE_URL).toString();
    return new URL(u, typeof window !== "undefined" ? window.location.origin : "https://example.com").toString();
  } catch {
    return u;
  }
}

export function TourRequestForm({ tourTitle, tourUrl, onSent }: Props) {
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState(1);

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (firstName.trim().length < 2) e.firstName = "Введите имя";
    if (!isPhoneValid(phone)) e.phone = "Введите корректный номер";
    if (!Number.isFinite(people) || people < 1) e.people = "Минимум 1 человек";
    return e;
  }, [firstName, phone, people]);

  const isValid = Object.keys(errors).length === 0;
  const showError = (k: string) => submitAttempted || touched[k];

  function buildMessage() {
    const link = toAbsoluteUrl(tourUrl);
    return [
      `Заявка на тур AYAN: ${tourTitle}`,
      `Имя: ${firstName.trim()}`,
      `Телефон: ${formatPhoneForDisplay(phone)}`,
      `Количество человек: ${people}`,
      `Ссылка на тур: ${link}`,
    ].join("\n");
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setSubmitAttempted(true);
    if (!isValid || isSending) return;

    setIsSending(true);

    const text = encodeURIComponent(buildMessage());
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${text}`;

    // ✅ самый надежный способ открыть "новую страницу" (tab) — через <a target="_blank">
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    a.remove();

    // ⚠️ Внутри некоторых webview (Telegram/iOS) новые вкладки могут быть запрещены.
    // Тогда делаем fallback: откроем в этой же вкладке.
    window.setTimeout(() => {
      // если вкладка не открылась — браузер обычно просто игнорит click.
      // Фоллбек не гарантированно определит это, поэтому делаем мягко:
      // можно включить fallback только для iOS/webview, но пусть будет универсально:
      // (если вкладка открылась — этот редирект не всегда нужен, но в большинстве случаев не мешает)
      // Если не хочешь fallback — просто удали строку ниже.
      // window.location.href = url;
    }, 200);

    setIsSending(false);
    onSent?.();
  }

  const shell = (hasError: boolean) =>
    [
      "mt-1 flex items-center gap-3 rounded-2xl border bg-white px-4 py-3",
      "transition",
      "focus-within:ring-2 focus-within:ring-[color:var(--brand)]/20",
      hasError ? "border-red-400" : "border-black/10 hover:border-black/20",
    ].join(" ");

  const input =
    "w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-base sm:text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Карточка тура */}
      <div className="rounded-2xl border border-black/10 bg-black/[0.03] p-4">
        <div className="text-xs text-[color:var(--text-muted)]">Тур</div>
        <div className="mt-1 font-semibold text-gray-900 leading-snug line-clamp-2">
          {tourTitle}
        </div>
        <div className="mt-2 text-xs text-[color:var(--text-muted)]">
          Заполните форму — откроем WhatsApp с готовым сообщением.
        </div>
      </div>

      {/* Поля */}
      <div className="space-y-4">
        {/* Имя */}
        <div>
          <label className="text-sm font-medium text-gray-900" htmlFor="name">
            Имя
          </label>
          <div className={shell(showError("firstName") && !!errors.firstName)}>
            <span aria-hidden className="select-none text-[color:var(--text-muted)]">👤</span>
            <input
              id="name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
              placeholder="Например: Алина"
              className={input}
              autoComplete="given-name"
              inputMode="text"
              aria-invalid={!!(showError("firstName") && errors.firstName)}
              aria-describedby={
                showError("firstName") && errors.firstName ? "name-err" : undefined
              }
            />
          </div>
          {showError("firstName") && errors.firstName && (
            <div
              id="name-err"
              className="mt-1 text-xs text-red-600"
              role="alert"
              aria-live="polite"
            >
              {errors.firstName}
            </div>
          )}
        </div>

        {/* Телефон */}
        <div>
          <label className="text-sm font-medium text-gray-900" htmlFor="phone">
            Телефон
          </label>
          <div className={shell(showError("phone") && !!errors.phone)}>
            <span aria-hidden className="select-none text-[color:var(--text-muted)]">📞</span>
            <input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              placeholder="+996 555 123 456"
              inputMode="tel"
              autoComplete="tel"
              className={input}
              aria-invalid={!!(showError("phone") && errors.phone)}
              aria-describedby={showError("phone") && errors.phone ? "phone-err" : "phone-help"}
            />
          </div>

          <div className="mt-1 flex items-center justify-between gap-3">
            {showError("phone") && errors.phone ? (
              <div id="phone-err" className="text-xs text-red-600" role="alert" aria-live="polite">
                {errors.phone}
              </div>
            ) : (
              <div id="phone-help" className="text-xs text-[color:var(--text-muted)]">
                Можно любой страны. Если без + — подставим +996.
              </div>
            )}
            <div className="text-xs text-gray-900/70 whitespace-nowrap">
              {phone.trim() ? formatPhoneForDisplay(phone) : ""}
            </div>
          </div>
        </div>

        {/* Количество человек */}
        <div>
          <label className="text-sm font-medium text-gray-900" htmlFor="people">
            Количество человек
          </label>

          <div
            className={[
              "mt-1 rounded-2xl border bg-white px-2 py-2",
              "flex items-center justify-between gap-2",
              "transition",
              showError("people") && errors.people
                ? "border-red-400"
                : "border-black/10 hover:border-black/20",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={() => setPeople((p) => Math.max(1, p - 1))}
              className="h-12 w-12 sm:h-10 sm:w-10 rounded-xl border border-black/10 hover:bg-black/[0.04] transition active:scale-[0.98]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/20"
              aria-label="Уменьшить"
            >
              −
            </button>

            <div className="flex-1 text-center">
              <div className="text-xs text-[color:var(--text-muted)]">Человек</div>
              <div className="text-2xl sm:text-xl font-semibold text-gray-900 leading-none">
                {people}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPeople((p) => Math.min(99, p + 1))}
              className="h-12 w-12 sm:h-10 sm:w-10 rounded-xl border border-black/10 hover:bg-black/[0.04] transition active:scale-[0.98]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/20"
              aria-label="Увеличить"
            >
              +
            </button>
          </div>

          {showError("people") && errors.people && (
            <div className="mt-1 text-xs text-red-600" role="alert" aria-live="polite">
              {errors.people}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid || isSending}
          className={[
            "w-full h-14 sm:h-12 rounded-2xl px-5",
            "inline-flex items-center justify-center gap-3",
            "text-base sm:text-sm font-semibold",
            "transition",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/25",
            isValid && !isSending
              ? "bg-[color:var(--brand)] text-white shadow-[0_12px_26px_rgba(22,163,74,0.22)] hover:-translate-y-[1px] hover:shadow-[0_16px_34px_rgba(22,163,74,0.26)] active:translate-y-0"
              : "bg-black/10 text-gray-400 cursor-not-allowed",
          ].join(" ")}
          aria-busy={isSending}
        >
          {isSending ? (
            <>
              <span className="inline-block h-5 w-5 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
              Открываем
            </>
          ) : (
            <>Отправить</>
          )}
        </button>

        <div className="text-xs text-[color:var(--text-muted)]">
          Нажимая кнопку, вы откроете WhatsApp с готовым текстом заявки.
        </div>

        {/* Превью сообщения */}
        <details className="rounded-2xl border border-black/10 bg-black/[0.03] p-4">
          <summary className="cursor-pointer text-sm font-medium text-gray-900">
            Посмотреть текст заявки
          </summary>
          <pre className="mt-3 whitespace-pre-wrap text-xs text-gray-700">
            {buildMessage()}
          </pre>
        </details>
      </div>
    </form>
  );
}
