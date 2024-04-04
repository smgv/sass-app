const { VITE_BACKEND_API_URL, VITE_BUILD_ENV } = import.meta.env as Record<string, string>;

const baseUrl = window.location.origin;
const baseRoute = baseUrl + import.meta.env.BASE_URL;

const appVersion = import.meta.env.VITE_TORUS_BUILD_VERSION;

export default {
  baseRoute,
  appVersion,
  api: VITE_BACKEND_API_URL,
  buildEnv: VITE_BUILD_ENV || "production",
};
