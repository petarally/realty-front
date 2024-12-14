import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Properties from "../views/Properties.vue";
import Property from "../views/Property.vue";
import Login from "../views/Login.vue";
import Admin from "../views/Admin.vue";
import Agent from "../views/Agent.vue";

const isAuthenticated = () => {
  return localStorage.getItem("auth") === "true";
};

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/properties", component: Properties },
  { path: "/login", component: Login },
  {
    path: "/admin",
    component: Admin,
    meta: { requiresAuth: false } /* promijeniti u true */,
  },
  {
    path: "/agent",
    component: Admin,
    meta: { requiresAuth: false } /* promijeniti u true */,
  },

  // test ruta
  { path: "/property", component: Property },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("/login");
  } else {
    next();
  }
});

export default router;
