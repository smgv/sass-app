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

export type UserAuthType = {
  email: string;
  employee: any;
  isGoogleLogin: boolean;
  isVerified: boolean;
  members: any;
  notifications: any;
  onboardingId: string;
  password: string;
  __v: number;
  _id: string;
};
