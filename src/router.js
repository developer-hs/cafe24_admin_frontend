import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home"), // 동적 import
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () => import("@/views/Login"), // 동적 import
  },
  {
    path: "/oauth/redirect",
    name: "Oauth",
    component: () => import("@/views/Oauth"),
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHistory(),
  routes,
});

export default router;
