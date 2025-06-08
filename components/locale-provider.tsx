"use client";

import { NextIntlClientProvider } from "next-intl";
import { useState, useEffect, ReactNode } from "react";
import { getUserLocale } from "@/services/locale";
import { Locale } from "@/i18n/config";

interface LocaleProviderProps {
  children: ReactNode;
  messages: Record<string, any>;
}

export function LocaleProvider({ children, messages }: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    // Set initial locale based on user preference/browser
    const userLocale = getUserLocale();
    setLocale(userLocale);
  }, []);

  return (
    <NextIntlClientProvider 
      locale={locale} 
      messages={messages[locale]}
    >
      {children}
    </NextIntlClientProvider>
  );
}