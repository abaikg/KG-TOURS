"use client";

import { useMemo, useState } from "react";
import { WHATSAPP_PHONE } from "@/config/site";

type Props = {
  tourTitle: string;
  tourUrl: string;
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
  return digits.length >= 9;
}

function isoToHuman(iso: string) {
  // expects YYYY-MM-DD
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}.${m}.${y}`;
}

const budgetOptions = [
  { key: "low", label: "До 10 000 сом" },
  { key: "mid", label: "10 000 – 25 000 сом" },
  { key: "high", label: "25 000+ сом" },
  { key: "custom", label: "Свой бюджет" },
] as const;

type BudgetKey = (typeof budgetOptions)[number]["key"];

export function TourRequestForm({ tourTitle, tourUrl, onSent }: Props) {
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState(1);

  // NEW
  const [startDate, setStartDate] = useState(""); // YYYY-MM-DD
  const [budgetKey, setBudgetKey] = useState<BudgetKey>("mid");
  const [customBudget, setCustomBudget] = useState("");

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};

    if (firstName.trim().length < 2) e.firstName = "Введите имя";
    if (!isPhoneValid(phone)) e.phone = "Введите корректный номер";

    if (!Number.isFinite(people) || people < 1) e.people = "Минимум 1 человек";

    // date is optional BUT recommended; we'll not hard-block
    // if you want required => uncomment:
    // if (!startDate) e.startDate = "Выберите дату";

    if (budgetKey === "custom" && customBudget.trim().length < 3) {
      e.customBudget = "Введите бюджет (например: 18000 сом)";
    }

    return e;
  }, [firstName, phone, people, startDate, budgetKey, customBudget]);

  const isValid = Object.keys(errors).length === 0;
  const showError = (k: string) => submitAttempted || touched[k];

  function budgetLabel() {
    const found = budgetOptions.find((b) => b.key === budgetKey);
    if (budgetKey === "custom") return customBudget.trim() || "Свой бюджет";
    return found?.label ?? "—";
  }

  function buildMessage() {
    return [
      `Заявка на тур AYAN: ${tourTitle}`,
      `Имя: ${firstName.trim()}`,
      `Телефон: ${formatPhoneForDisplay(phone)}`,
      `Количество человек: ${people}`,
      `Дата (желательно): ${startDate ? isoToHuman(startDate) : "не указано"}`,
      `Бюджет: ${budgetLabel()}`,
      `Ссылка на тур: ${tourUrl}`,
    ].join("\n");
  }

  async function handleSubmit() {
    setSubmitAttempted(true);
    if (!isValid) return;

    setIsSending(true);
    await new Promise((r) => setTimeout(r, 250));

    const text = encodeURIComponent(buildMessage());
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${text}`;
    window.open(url, "_blank", "noreferrer");

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
    "w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm";

  return (
    <div className="space-y-5">
      {/* Tour card */}
      <div className="rounded-2xl border border-black/10 bg-black/[0.03] p-4">
        <div className="text-xs text-[color:var(--text-muted)]">Тур</div>
        <div className="mt-1 font-semibold text-gray-900 leading-snug line-clamp-2">
          {tourTitle}
        </div>
        <div className="mt-2 text-xs text-[color:var(--text-muted)]">
          Заполните форму — откроем WhatsApp с готовым сообщением.
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-900">Имя</label>
          <div className={shell(showError("firstName") && !!errors.firstName)}>
            <span className="select-none text-[color:var(--text-muted)]">👤</span>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
              placeholder="Например: Алина"
              className={input}
              autoComplete="given-name"
            />
          </div>
          {showError("firstName") && errors.firstName && (
            <div className="mt-1 text-xs text-red-600">{errors.firstName}</div>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium text-gray-900">Телефон</label>
          <div className={shell(showError("phone") && !!errors.phone)}>
            <span className="select-none text-[color:var(--text-muted)]">📞</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              placeholder="+996 555 123 456"
              inputMode="tel"
              className={input}
              autoComplete="tel"
            />
          </div>

          <div className="mt-1 flex items-center justify-between gap-3">
            {showError("phone") && errors.phone ? (
              <div className="text-xs text-red-600">{errors.phone}</div>
            ) : (
              <div className="text-xs text-[color:var(--text-muted)]">
                Можно любой страны. Если без + — подставим +996.
              </div>
            )}
            <div className="text-xs text-gray-900/70 whitespace-nowrap">
              {phone.trim() ? formatPhoneForDisplay(phone) : ""}
            </div>
          </div>
        </div>

        {/* People */}
        <div>
          <label className="text-sm font-medium text-gray-900">
            Количество человек
          </label>

          <div
            className={[
              "mt-1 rounded-2xl border bg-white px-3 py-3",
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
              className="h-10 w-10 rounded-xl border border-black/10 hover:bg-black/[0.04] transition active:scale-[0.98]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/20"
              aria-label="Уменьшить"
            >
              −
            </button>

            <div className="flex-1 text-center">
              <div className="text-xs text-[color:var(--text-muted)]">Человек</div>
              <div className="text-xl font-semibold text-gray-900 leading-none">
                {people}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPeople((p) => Math.min(99, p + 1))}
              className="h-10 w-10 rounded-xl border border-black/10 hover:bg-black/[0.04] transition active:scale-[0.98]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/20"
              aria-label="Увеличить"
            >
              +
            </button>
          </div>

          {showError("people") && errors.people && (
            <div className="mt-1 text-xs text-red-600">{errors.people}</div>
          )}
        </div>

        {/* NEW: Date */}
        <div>
          <label className="text-sm font-medium text-gray-900">
            Дата поездки <span className="text-xs text-[color:var(--text-muted)]">(желательно)</span>
          </label>

          <div className={shell(showError("startDate") && !!errors.startDate)}>
            <span className="select-none text-[color:var(--text-muted)]">📅</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, startDate: true }))}
              className={input}
            />
          </div>

          {showError("startDate") && errors.startDate && (
            <div className="mt-1 text-xs text-red-600">{errors.startDate}</div>
          )}

          <div className="mt-1 text-xs text-[color:var(--text-muted)]">
            Если даты нет — напишите примерно (например: «в конце мая»).
          </div>
        </div>

        {/* NEW: Budget */}
        <div>
          <label className="text-sm font-medium text-gray-900">
            Бюджет <span className="text-xs text-[color:var(--text-muted)]">(на человека)</span>
          </label>

          <div className="mt-2 flex flex-wrap gap-2">
            {budgetOptions.map((b) => {
              const active = budgetKey === b.key;
              return (
                <button
                  key={b.key}
                  type="button"
                  onClick={() => setBudgetKey(b.key)}
                  className={[
                    "px-3 py-2 rounded-2xl border text-sm font-medium transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/20",
                    active
                      ? "border-[color:var(--brand)]/30 bg-[color:var(--brand)]/10 text-gray-900"
                      : "border-black/10 bg-white hover:bg-black/[0.04] text-gray-900",
                  ].join(" ")}
                >
                  {b.label}
                </button>
              );
            })}
          </div>

          {budgetKey === "custom" && (
            <div className={shell(showError("customBudget") && !!errors.customBudget)}>
              <span className="select-none text-[color:var(--text-muted)]">💰</span>
              <input
                value={customBudget}
                onChange={(e) => setCustomBudget(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, customBudget: true }))}
                placeholder="Например: 18000 сом"
                className={input}
              />
            </div>
          )}

          {showError("customBudget") && errors.customBudget && (
            <div className="mt-1 text-xs text-red-600">{errors.customBudget}</div>
          )}
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid || isSending}
          className={[
            "w-full h-12 rounded-2xl px-5",
            "inline-flex items-center justify-center gap-3",
            "text-sm font-semibold",
            "transition",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/25",
            isValid && !isSending
              ? "bg-[color:var(--brand)] text-white shadow-[0_12px_26px_rgba(22,163,74,0.22)] hover:-translate-y-[1px] hover:shadow-[0_16px_34px_rgba(22,163,74,0.26)] active:translate-y-0"
              : "bg-black/10 text-gray-400 cursor-not-allowed",
          ].join(" ")}
        >
          {isSending ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
              Открываем 
            </>
          ) : (
            <>
              Отправить 
            </>
          )}
        </button>

        <div className="text-xs text-[color:var(--text-muted)]">
          Нажимая кнопку, вы откроете WhatsApp с готовым текстом заявки.
        </div>

        {/* Message preview */}
        <details className="rounded-2xl border border-black/10 bg-black/[0.03] p-4">
          <summary className="cursor-pointer text-sm font-medium text-gray-900">
            Посмотреть текст заявки
          </summary>
          <pre className="mt-3 whitespace-pre-wrap text-xs text-gray-700">
            {buildMessage()}
          </pre>
        </details>
      </div>
    </div>
  );
}
