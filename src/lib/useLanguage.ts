import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'ru' | 'en';

interface LanguageState {
    language: Language;
    hasHydrated: boolean;
    setLanguage: (lang: Language) => void;
    setHasHydrated: (val: boolean) => void;
    t: (ru: string, en: string) => string;
}

export const useLanguage = create<LanguageState>()(
    persist(
        (set, get) => ({
            language: 'ru',
            hasHydrated: false,
            setLanguage: (lang) => set({ language: lang }),
            setHasHydrated: (val) => set({ hasHydrated: val }),
            t: (ru, en) => {
                // Always return RU on server or before hydration to match server render
                // This prevents hydration mismatch when localStorage has a different language
                if (typeof window === 'undefined' || !get().hasHydrated) return ru;
                return get().language === 'ru' ? ru : en;
            },
        }),
        {
            name: 'language-storage',
            partialize: (state) => ({ language: state.language }),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
