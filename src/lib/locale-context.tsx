"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale } from "@/types";
import { getLocaleFromCookie, setLocaleCookie, t as translate } from "./i18n";

interface LocaleContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    setLocaleState(getLocaleFromCookie());
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    setLocaleCookie(l);
    document.documentElement.lang = l;
  };

  const t = (key: string) => translate(key, locale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
