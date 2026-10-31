import { createContext, useContext, useState, ReactNode } from "react";
import { translations } from "../locales/translations";

export type Language = "en" | "de" | "zh_tw";

// Order the language button cycles through
const LANGUAGE_ORDER: Language[] = ["en", "de", "zh_tw"];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () =>
    setLanguage(
      (l) => LANGUAGE_ORDER[(LANGUAGE_ORDER.indexOf(l) + 1) % LANGUAGE_ORDER.length]
    );

  const t = (key: string): string => {
    const keys = key.split(".");
    let val: any = translations[language];
    for (const k of keys) {
      val = val?.[k];
    }
    return typeof val === "string" ? val : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
