export type AuthFormType = {
  role: "admin" | "member" | "employee";
  email: string;
  password: string;
  confirmPassword: string;
};

export type SwitchAccountTextType = { description: string; btnText: string };

export type ForgotPasswordTextType = {
  description: string;
  title: string;
};
