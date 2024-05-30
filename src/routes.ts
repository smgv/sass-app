import { createRouter, createWebHistory } from "vue-router";
import { ROUTES, ROUTES_NAME } from "@/constants/routes";
import { useAuthStore } from "./store/authStore";

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
      meta: { requiresAuth: false },
    },
    {
      path: ROUTES.RESET_PASSWORD,
      name: ROUTES_NAME.RESET_PASSWORD,
      component: () => import("@/views/ResetPassword.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: ROUTES.ADMIN_ONBOARDING,
      name: ROUTES_NAME.ADMIN_ONBOARDING,
      component: () => import("@/views/AdminOnboarding.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: ROUTES.EMPLOYEE_ONBOARDING,
      name: ROUTES_NAME.EMPLOYEE_ONBOARDING,
      component: () => import("@/views/EmployeeMemberOnboarding.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: ROUTES.MEMBER_ONBOARDING,
      name: ROUTES_NAME.MEMBER_ONBOARDING,
      component: () => import("@/views/EmployeeMemberOnboarding.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: ROUTES.ADMIN,
      name: ROUTES_NAME.ADMIN,
      component: () => import("@/views/Admin.vue"),
      children: [
        {
          path: "",
          redirect: "/admin/home",
        },
        {
          path: "home",
          name: "home",
          component: () => import("@/containers/Admin/Home"),
          meta: { requiresAuth: true },
        },
        {
          path: "invite",
          name: "invite",
          component: () => import("@/containers/Admin/Invite"),
          meta: { requiresAuth: true },
        },
        {
          path: "inbox",
          name: "inbox",
          component: () => import("@/containers/Admin/Inbox"),
          meta: { requiresAuth: true },
        },
        {
          path: "members",
          name: "members",
          component: () => import("@/containers/Admin/Members"),
          meta: { requiresAuth: true },
        },
        {
          path: "employees",
          name: "employees",
          component: () => import("@/containers/Admin/Employees"),
          meta: { requiresAuth: true },
        },
        {
          path: "account",
          name: "account",
          component: () => import("@/containers/Admin/Account"),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/Auth.vue"),
    },
  ],
});

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();
  console.log("ROUTES", authStore.isUserOnBoarded());
  if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
    next({ path: ROUTES.DEFAULT });
  } else {
    next();
  }
});

export default router;
