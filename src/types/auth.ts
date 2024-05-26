export type AuthFormType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type SwitchAccountTextType = { description: string; btnText: string };

export type ForgotPasswordTextType = {
  description: string;
  title: string;
};

export type AuthApiType = {
  email: string;
  password?: string;
  oldPassword?: string;
};
