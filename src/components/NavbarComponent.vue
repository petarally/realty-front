<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <a
        href="https://flowbite.com/"
        class="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          class="h-8"
          alt="Flowbite Logo"
        />
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Flowbite</span
        >
      </a>
      <div
        class="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse"
      >
        <button
          type="button"
          data-dropdown-toggle="language-dropdown-menu"
          class="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            class="w-5 h-5 rounded-full me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 3900 3900"
          >
            <path fill="#b22234" d="M0 0h7410v3900H0z" />
            <path
              d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
              stroke="#fff"
              stroke-width="300"
            />
            <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
            <g fill="#fff">
              <g id="d">
                <g id="c">
                  <g id="e">
                    <g id="b">
                      <path
                        id="a"
                        d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
                      />
                      <use xlink:href="#a" y="420" />
                      <use xlink:href="#a" y="840" />
                      <use xlink:href="#a" y="1260" />
                    </g>
                    <use xlink:href="#a" y="1680" />
                  </g>
                  <use xlink:href="#b" x="247" y="210" />
                </g>
                <use xlink:href="#c" x="494" />
              </g>
              <use xlink:href="#d" x="988" />
              <use xlink:href="#c" x="1976" />
              <use xlink:href="#e" x="2470" />
            </g>
          </svg>
          English
        </button>
        <!-- Dropdown -->
        <div
          class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
          id="language-dropdown-menu"
        >
          <ul class="py-2 font-medium" role="none">
            <li v-for="(language, code) in languages" :key="code">
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
                @click.prevent="changeLanguage(code)"
              >
                <div class="inline-flex items-center">
                  <svg
                    class="h-3.5 w-3.5 rounded-full me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    :viewBox="language.viewBox"
                  >
                    <path
                      v-for="(path, index) in language.paths"
                      :key="index"
                      :d="path.d"
                      :fill="path.fill"
                    />
                  </svg>
                  {{ language.name }}
                </div>
              </a>
            </li>
          </ul>
        </div>
        <!-- Begin of dark mode toggle -->
        <button
          id="theme-toggle"
          type="button"
          class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
        >
          <svg
            id="theme-toggle-dark-icon"
            class="hidden w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            ></path>
          </svg>
          <svg
            id="theme-toggle-light-icon"
            class="hidden w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <!-- End of dark mode toggle -->
        <button
          data-collapse-toggle="navbar-language"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-language"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>

          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-language"
      >
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <router-link
              to="/"
              class="block py-2 px-3 rounded md:p-0"
              active-class="text-blue-700 dark:text-blue-500"
              aria-current="page"
              >{{ $t("home") }}</router-link
            >
          </li>
          <li>
            <router-link
              to="/about"
              class="block py-2 px-3 rounded md:p-0"
              active-class="text-blue-700 dark:text-blue-500"
              >{{ $t("about") }}</router-link
            >
          </li>
          <li>
            <router-link
              to="/properties"
              class="block py-2 px-3 rounded md:p-0"
              active-class="text-blue-700 dark:text-blue-500"
              >{{ $t("properties") }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, nextTick, ref } from "vue";
import { initFlowbite } from "flowbite";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

// initialize components based on data attribute selectors
onMounted(async () => {
  await nextTick();
  initFlowbite();

  var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

  // Change the icons inside the button based on previous settings
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    themeToggleLightIcon.classList.remove("hidden");
  } else {
    themeToggleDarkIcon.classList.remove("hidden");
  }

  var themeToggleBtn = document.getElementById("theme-toggle");

  themeToggleBtn.addEventListener("click", function () {
    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle("hidden");
    themeToggleLightIcon.classList.toggle("hidden");

    // if set via local storage previously
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    }
  });
});

const languages = ref({
  en: {
    name: "English",
    viewBox: "0 0 512 512",
    paths: [
      { d: "M0 0h512v512H0z", fill: "#012169" },
      { d: "M0 0l512 512m0-512L0 512", stroke: "#fff", "stroke-width": 60 },
      { d: "M0 0l512 512m0-512L0 512", stroke: "#c8102e", "stroke-width": 40 },
      { d: "M211 0h90v512h-90z", fill: "#fff" },
      { d: "M0 211h512v90H0z", fill: "#fff" },
      { d: "M226 0h60v512h-60z", fill: "#c8102e" },
      { d: "M0 226h512v60H0z", fill: "#c8102e" },
    ],
  },
  de: {
    name: "Deutsch",
    viewBox: "0 0 512 512",
    paths: [
      { d: "M0 341.3h512V512H0z", fill: "#ffce00" },
      { d: "M0 0h512v170.7H0z", fill: "#000" },
      { d: "M0 170.7h512v170.6H0z", fill: "#d00" },
    ],
  },
  it: {
    name: "Italiano",
    viewBox: "0 0 512 512",
    paths: [
      { d: "M0 0h512v512H0z", fill: "#fff" },
      { d: "M0 0h170.7v512H0z", fill: "#009246" },
      { d: "M341.3 0H512v512H341.3z", fill: "#ce2b37" },
    ],
  },
  hr: {
    name: "Hrvatski",
    viewBox: "0 0 512 512",
    paths: [
      { d: "M0 0h512v512H0z", fill: "#fff" },
      { d: "M0 0h512v170.7H0z", fill: "#ff0000" },
      { d: "M0 341.3h512V512H0z", fill: "#0000ff" },
      { d: "M170.7 170.7h170.6v170.6H170.7z", fill: "#fff" },
      { d: "M192 192h128v128H192z", fill: "#ff0000" },
    ],
  },
});

const changeLanguage = (code) => {
  locale.value = code;
};
</script>
