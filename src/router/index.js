import { createRouter, createWebHistory } from "vue-router";
import i18n from "../i18n";
import { Auth } from "../services";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Properties from "../views/Properties.vue";
import Property from "../views/Property.vue";
import Login from "../views/Login.vue";
import Admin from "../views/Admin.vue";
import NotFound from "../views/NotFound.vue";
import LangLayout from "../layouts/LangLayout.vue";

const defaultLang = localStorage.getItem("language") || "hr";

const routes = [
  // Redirect '/' to '/:lang' (i.e., homepage for default language)
  { path: "/", redirect: `/${defaultLang}` },

  // Language-specific routes
  {
    path: "/:lang",
    component: LangLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
        meta: { titleKey: "navbar_pages.home" },
      },
      {
        path: "about",
        name: "About",
        component: About,
        meta: { titleKey: "navbar_pages.about" },
      },
      {
        path: "properties",
        name: "Properties",
        component: Properties,
        meta: { titleKey: "navbar_pages.properties" },
      },
      {
        path: "property/:id",
        name: "Property",
        component: Property,
        props: true,
        meta: { titleKey: "navbar_pages.property" },
      },
    ],
  },

  // Login route (should not require a language prefix)
  {
    path: "/login",
    name: "Login",
    component: Login,
  },

  // Admin route (requires authentication)
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requiresAuth: true,
    },
  },

  // 404 route
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: { titleKey: "error.not_found" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const baseTitle = "Realty";
  const pageTitle = to.meta.titleKey ? i18n.global.t(to.meta.titleKey) : "";
  document.title = pageTitle ? `${baseTitle} | ${pageTitle}` : baseTitle;

  // Handle authentication for routes that require it
  if (to.meta.requiresAuth) {
    const user = Auth.getUser();
    if (!user) {
      return next({ name: "Login", query: { redirect: to.fullPath } });
    }

    // Check if the user is an admin and redirect to Admin if they are
    if (user.role === "admin" && to.name !== "Admin") {
      return next({ name: "Admin" });
    }
  }

  // Set language
  if (to.params.lang) {
    const supportedLanguages = ["en", "de", "it", "hr"];
    if (!supportedLanguages.includes(to.params.lang)) {
      return next(`/${defaultLang}`);
    }
    localStorage.setItem("language", to.params.lang);
    i18n.global.locale = to.params.lang;
  }

  next();
});

export default router;
