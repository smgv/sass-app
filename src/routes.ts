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
      path: ROUTES.VERIFY,
      name: ROUTES_NAME.VERIFY,
      component: () => import("@/views/Verify.vue"),
    },
    {
      path: ROUTES.ADMIN_ONBOARDING,
      name: ROUTES_NAME.ADMIN_ONBOARDING,
      component: () => import("@/views/AdminOnboarding.vue"),
    },
    {
      path: ROUTES.EMPLOYEE_ONBOARDING,
      name: ROUTES_NAME.EMPLOYEE_ONBOARDING,
      component: () => import("@/views/EmployeeMemberOnboarding.vue"),
    },
    {
      path: ROUTES.MEMBER_ONBOARDING,
      name: ROUTES_NAME.MEMBER_ONBOARDING,
      component: () => import("@/views/EmployeeMemberOnboarding.vue"),
    },
    {
      path: ROUTES.ADMIN,
      name: ROUTES_NAME.ADMIN,
      component: () => import("@/views/Admin.vue"),
      children: [
        {
          path: "",
          redirect: "admin/home",
        },
        {
          path: "home",
          name: "home",
          component: () => import("@/containers/Admin/Home"),
        },
        {
          path: "invite",
          name: "invite",
          component: () => import("@/containers/Admin/Invite"),
        },
        {
          path: "notifications",
          name: "notifications",
          component: () => import("@/containers/Admin/Notifications"),
        },
        {
          path: "members",
          name: "members",
          component: () => import("@/containers/Admin/Members"),
        },
        {
          path: "employees",
          name: "employees",
          component: () => import("@/containers/Admin/Employees"),
        },
        {
          path: "account",
          name: "account",
          component: () => import("@/containers/Admin/Account"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/Auth.vue"),
    },
  ],
});

export default router;
