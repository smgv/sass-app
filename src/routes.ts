import { createRouter, createWebHistory } from "vue-router";
import { ROUTES, ROUTES_NAME } from "@/constants/routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.DEFAULT,
      name: ROUTES_NAME.LOGIN,
      meta: { title: "Auth", requiresAuth: false },
      component: () => import("@/views/Auth.vue"),
    },
    {
      path: ROUTES.DASHBOARD,
      name: ROUTES_NAME.DASHBOARD,
      component: () => import("@/views/Dashboard.vue"),
    },
    {
      path: ROUTES.VERIFY,
      name: ROUTES_NAME.VERIFY,
      component: () => import("@/views/Verify.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/Auth.vue"),
    },
  ],
});

export default router;
