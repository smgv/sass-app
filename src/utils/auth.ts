import { getItemInLocalStorage } from "./storage";

export const isPasswordValid = (password: string) => {
  if (!password) return false;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!$@%])[0-9a-zA-Z!$@%]{6,}$/;
  return passwordRegex.test(password);
};

export const isConfirmPasswordValid = (
  confirmPassword: string,
  password: string
) => {
  if (!confirmPassword) return false;
  return confirmPassword === password;
};

export const getUserFromLocal = () => {
  const user = getItemInLocalStorage("__persisted__sass_app_auth");
  return user || null;
};

export const getTokenFromLocal = () => {
  const token = getItemInLocalStorage("__persisted__sass_app_auth");
  return token.tokenAuth || null;
};

export const userOnboardingStatus = () => {
  const data = getItemInLocalStorage("__persisted__sass_app_auth");
  return data?.userAuth?.onboardingId;
};
