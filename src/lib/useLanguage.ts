import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'ru' | 'en';

interface LanguageState {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (ru: string, en: string) => string;
}

export const useLanguage = create<LanguageState>()(
    persist(
        (set, get) => ({
            language: 'ru',
            setLanguage: (lang) => set({ language: lang }),
            t: (ru, en) => (get().language === 'ru' ? ru : en),
        }),
        {
            name: 'language-storage',
        }
    )
);
