import flowbitePlugin from "flowbite/plugin";

export const darkMode = "class";
export const content = [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
  "./node_modules/flowbite/**/*.js",
];
export const theme = {
  extend: {},
};
export const plugins = [flowbitePlugin];