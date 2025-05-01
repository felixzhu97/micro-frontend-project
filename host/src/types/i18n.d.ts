declare module "i18next" {
  import { i18n } from "i18next";
  export default i18n;
}

declare module "react-i18next" {
  import { useTranslation, initReactI18next } from "react-i18next";
  export { useTranslation, initReactI18next };
}

declare module "i18next-browser-languagedetector" {
  const LanguageDetector: any;
  export default LanguageDetector;
}

declare module "i18next-http-backend" {
  const Backend: any;
  export default Backend;
}
