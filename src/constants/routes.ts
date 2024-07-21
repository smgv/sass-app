export const ROUTES_NAME = {
  LOGIN: "login",
  REGISTER: "register",
  FORGOT_PASSWORD: "forgot-password",
  RESET_PASSWORD: "reset-password",
  VERIFY: "verify",
  ADMIN_ONBOARDING: "admin-onboarding",
  MEMBER_ONBOARDING: "member-onboarding",
  EMPLOYEE_ONBOARDING: "employee-onboarding",
  ADMIN: "admin",
  ONBOARDING_STATUS: "onboarding-status",
  REDIRECT: "redirect",
};

export const ROUTES = {
  DEFAULT: "/",
  VERIFY: "/verify/:token",
  RESET_PASSWORD: "/reset-password/:token",
  ADMIN_ONBOARDING: "/admin-onboarding",
  MEMBER_ONBOARDING: "/member-onboarding/:token",
  EMPLOYEE_ONBOARDING: "/employee-onboarding/:token",
  ADMIN: "/admin",
  ONBOARDING_STATUS: "/onboarding-status",
  REDIRECT: "/auth/redirect",
};
