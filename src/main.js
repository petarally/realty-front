import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createHead } from "@vueuse/head";
import i18n from "./i18n";
import "./index.css";

const app = createApp(App);
const head = createHead();

app.use(router);
app.use(head);
app.use(i18n);
app.mount("#app");
