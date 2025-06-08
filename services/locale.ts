"use client";

import { Locale, defaultLocale } from "@/i18n/config";

const STORAGE_KEY = "NEXT_LOCALE";

export function getUserLocale(): Locale {
  if (typeof window === "undefined") {
    return defaultLocale;
  }
  
  // Try to get from localStorage first
  const stored = localStorage.getItem(STORAGE_KEY) as Locale;
  if (stored && ["en", "de"].includes(stored)) {
    return stored;
  }
  
  // Fallback to browser language detection
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("de")) {
    return "de";
  }
  
  return defaultLocale;
}

export function setUserLocale(locale: Locale) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, locale);
  }
}
