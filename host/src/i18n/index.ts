const i18next = require("i18next");
import type { i18n } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

const i18n = i18next
  .createInstance()
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en-US",
    supportedLngs: ["en", "en-US", "zh", "zh-CN"],
    load: "languageOnly",
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator"],
      caches: ["localStorage", "cookie"],
      convertDetectedLanguage: (lng: string) =>
        lng === "en" ? "en-US" : lng === "zh" ? "zh-CN" : lng,
    },
  });

export default i18n;
