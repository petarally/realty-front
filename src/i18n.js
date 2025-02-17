import { createI18n } from "vue-i18n";
import de from "./locales/de.json";
import en from "./locales/en.json";
import hr from "./locales/hr.json";
import it from "./locales/it.json";

function getLocale() {
  return {
    en,
    de,
    hr,
    it,
  };
}

const locale = localStorage.getItem("language") || "hr";

export default createI18n({
  locale,
  fallbackLocale: "hr",
  messages: getLocale(),
});
