import { createRouter, createWebHistory } from "vue-router";
import { Auth } from "../services";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Properties from "../views/Properties.vue";
import Property from "../views/Property.vue";
import Login from "../views/Login.vue";
import Admin from "../views/Admin.vue";

// Simple layout component
import LangLayout from "../layouts/LangLayout.vue";

const defaultLang = localStorage.getItem("language") || "hr";

const routes = [
  { path: "/", redirect: `/${defaultLang}` },
  {
    path: "/:lang",
    component: LangLayout,
    children: [
      { path: "", component: Home },
      { path: "about", component: About },
      { path: "properties", component: Properties },
      {
        path: "property/:id",
        component: Property,
        props: true,
        name: "Property",
      },
    ],
  },

  { path: "/login", component: Login },
  {
    path: "/admin",
    component: Admin,
    meta: { requiresAuth: true },
  },

  { path: "/:pathMatch(.*)*", redirect: `/${defaultLang}` },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const user = Auth.getUser();
    if (!user) {
      return next("/login");
    }
  }
  if (to.params.lang) {
    localStorage.setItem("language", to.params.lang);
  }
  next();
});

export default router;
