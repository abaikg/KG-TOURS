"use client";

import { useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import { TourRequestForm } from "@/components/TourRequestForm/TourRequestForm";

type Props = {
    tourTitle: string;
    tourUrl: string;
};

export function TourRequestModal({ tourTitle, tourUrl }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className={[
                    "w-full h-12 px-5 rounded-2xl",
                    "inline-flex items-center justify-center gap-2",
                    "text-sm font-semibold text-white whitespace-nowrap",
                    "bg-[color:var(--brand)]",
                    "shadow-[0_12px_26px_rgba(22,163,74,0.22)]",
                    "transition",
                    "hover:-translate-y-[1px] hover:shadow-[0_16px_34px_rgba(22,163,74,0.26)] hover:opacity-[0.98]",
                    "active:translate-y-0",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/30",
                ].join(" ")}
            >
                Оставить заявку
            </button>

            <Modal isOpen={open} onClose={() => setOpen(false)} title="Оставьте заявку на тур">
                <TourRequestForm
                    tourTitle={tourTitle}
                    tourUrl={tourUrl}
                    onSent={() => setOpen(false)}
                />
            </Modal>
        </>
    );
}
