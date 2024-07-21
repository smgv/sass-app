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
  return data?.userAuth?.onboardingId || null;
};

export const googleAuthRedirect = (): string => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  console.log(
    import.meta.env.VITE_APP_GOOGLE_REDIRECT_URL,
    "import.meta.env.VITE_APP_GOOGLE_REDIRECT_URL"
  );

  const options = {
    redirect_uri: import.meta.env.VITE_APP_REDIRECT_URL as string,
    client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: "https://www.googleapis.com/auth/userinfo.email" as string,
  };

  console.log(options);

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};
