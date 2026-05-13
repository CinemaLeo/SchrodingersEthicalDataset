import { createContext, useContext, useState, ReactNode } from "react";
import { translations } from "../locales/translations";

export type Language = "en" | "zh_tw";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () =>
    setLanguage((l) => (l === "en" ? "zh_tw" : "en"));

  const t = (key: string): string => {
    const keys = key.split(".");
    let val: any = translations[language];
    for (const k of keys) {
      val = val?.[k];
    }
    return typeof val === "string" ? val : key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
