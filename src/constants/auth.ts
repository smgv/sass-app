import { OptionsType } from "@/components/Select/Select.vue";
import { AuthFormType } from "@/types/auth";

export enum AUTH_FORM {
  LOGIN = "Login",
  REGISTER = "Register",
  FORGOT_PASSWORD_EMAIL = "Forgot_Password_Email",
}

export const AUTH_FORM_INITIAL_STATE: AuthFormType = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const PASSWORD_HELPER_TEXT =
  "Your password must be at least six characters and should include a combination of numbers, letters and special characters (!$@％).";

export const ROLES: OptionsType[] = [
  { name: "Admin", value: "admin" },
  { name: "Employee", value: "employee" },
  { name: "Member", value: "member" },
];

export const LOCAL_TOKEN = "SASS_TOKEN";
