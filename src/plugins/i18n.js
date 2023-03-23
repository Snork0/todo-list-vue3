import { createI18n } from "vue-i18n";

function loadLocaleMessages() {
  const messages = {};
  const locales = ["en", "sk"];
  let modules = import.meta.globEager("../locales/*.json");

  locales.forEach((locale) => {
    messages[locale] = modules[`../locales/${locale}.json`].default;
  });
  return messages;
}

export default createI18n({
  legacy: false,
  locale: "sk",
  fallbackLocale: "en",
  messages: loadLocaleMessages(),
});