import { defineStore } from "pinia";
import realtyLogo from "../assets/realty_logo.png";
import realtyLogoDark from "../assets/realty_logo_dark.png";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: "light",
    logoSrc: realtyLogo,
  }),
  actions: {
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
      localStorage.setItem("color-theme", this.theme);
      this.updateTheme();
    },
    setInitialTheme() {
      const savedTheme = localStorage.getItem("color-theme");
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      this.theme = savedTheme || (systemPrefersDark ? "dark" : "light");
      this.updateTheme();
    },
    updateTheme() {
      this.logoSrc = this.theme === "dark" ? realtyLogoDark : realtyLogo;
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(this.theme);
    },
  },
});
