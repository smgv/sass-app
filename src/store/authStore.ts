import { defineStore } from "pinia";
import { AuthApiType, UserAuthType } from "@/types/auth";
import axiosInstance from "@/api/axiosInstance";
import {
  removeItemInLocalStorage,
  setItemInLocalStorage,
} from "@/utils/storage";
import { ref } from "vue";
import { useToastStore } from "./toastStore";
import { useRouter } from "vue-router";
import { ROUTES } from "@/constants/routes";
import { getTokenFromLocal, userOnboardingStatus } from "@/utils/auth";
import { LOCAL_TOKEN } from "@/constants/auth";

const AUTH_BASE_URL = "/auth";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const userAuth = ref<UserAuthType | null>(null);
    const tokenAuth = ref(null);

    const toastStore = useToastStore();
    const router = useRouter();

    const signUp = async (signUpData: AuthApiType) => {
      try {
        const response = await axiosInstance.post(
          `${AUTH_BASE_URL}/signup`,
          signUpData
        );
        const { message, status } = response.data;
        if (status === "success") {
          toastStore.setToastMessage({ type: "success", message });
          return true;
        } else {
          toastStore.setToastMessage({ type: "failed", message });
          return false;
        }
      } catch (error: any) {
        toastStore.setToastMessage({
          type: "failed",
          message: error.response.data.message as string,
        });
        console.error("Auth SignUp Error:", error);
        return false;
      }
    };

    const signIn = async (signInData: AuthApiType): Promise<boolean> => {
      try {
        const response = await axiosInstance.post(
          `${AUTH_BASE_URL}/signin`,
          signInData
        );
        const { message, token, user, status } = response.data;
        if (status === "success") {
          setItemInLocalStorage(LOCAL_TOKEN, token);
          userAuth.value = user;
          tokenAuth.value = token;
          if (user.onboardingId) {
            router.push(ROUTES.ADMIN);
          } else {
            router.push(ROUTES.ADMIN_ONBOARDING);
          }
          toastStore.setToastMessage({ type: "success", message });
          return true;
        } else {
          toastStore.setToastMessage({ type: "failed", message });
          return false;
        }
      } catch (error: any) {
        toastStore.setToastMessage({
          type: "failed",
          message: error.response.data.message as string,
        });
        console.error("Auth SignIn Error:", error);
        return false;
      }
    };

    const verifyUser = async (tokenData: string) => {
      try {
        const response = await axiosInstance.post(
          `${AUTH_BASE_URL}/verify-user/${tokenData}`
        );
        userAuth.value = response.data.user;
        toastStore.setToastMessage({
          type: "success",
          message: response.data.message,
        });
      } catch (error: any) {
        console.error("Auth VerifyUser Error:", error);
        toastStore.setToastMessage({
          type: "failed",
          message: error.response.data.message as string,
        });
      } finally {
        router.push(ROUTES.DEFAULT);
      }
    };

    const resetPassword = async (
      oldPassword: string,
      newPassword: string
    ): Promise<boolean> => {
      try {
        const response = await axiosInstance.patch(
          `${AUTH_BASE_URL}/reset-password`,
          { oldPassword, newPassword }
        );
        const { message, status } = response.data;
        if (status === "success") {
          toastStore.setToastMessage({ type: "success", message });
          return true;
        } else {
          toastStore.setToastMessage({ type: "failed", message });
          return false;
        }
      } catch (error: any) {
        console.error("Auth ResetPassword Error:", error);
        toastStore.setToastMessage({
          type: "failed",
          message: error.response.data.message as string,
        });
        return false;
      }
    };

    const updatePassword = async (
      token: string,
      password: string
    ): Promise<boolean> => {
      try {
        const response = await axiosInstance.patch(
          `${AUTH_BASE_URL}/update-password`,
          { token, password }
        );
        const { message, status } = response.data;
        if (status === "success") {
          toastStore.setToastMessage({ type: "success", message });
          router.push(ROUTES.DEFAULT);
          return true;
        } else {
          toastStore.setToastMessage({ type: "failed", message });
          return false;
        }
      } catch (error: any) {
        console.error("Auth UpdatePassword Error:", error);
        toastStore.setToastMessage({
          type: "failed",
          message: error.response.data.message as string,
        });
        return false;
      }
    };

    const forgotPassword = async (email: string): Promise<boolean> => {
      try {
        const response = await axiosInstance.post(
          `${AUTH_BASE_URL}/forgot-password`,
          {
            email,
          }
        );
        const { message, status } = response.data;
        if (status === "success") {
          toastStore.setToastMessage({ type: "success", message });
          return true;
        } else {
          toastStore.setToastMessage({ type: "failed", message });
          return false;
        }
      } catch (error: any) {
        console.error("Auth ForgotPassword Error:", error);
        toastStore.setToastMessage({
          type: "failed",
          message: error.response.data.message as string,
        });
        return false;
      }
    };

    const getUser = async () => {
      try {
        const response = await axiosInstance.get(`${AUTH_BASE_URL}/get-user`);
        console.log(response, "GET USER");
        userAuth.value = response.data.user;
        return response.data.user;
      } catch (error) {
        console.error("Auth GetUser Error:", error);
      }
    };

    const isAuthenticated = () => tokenAuth.value || getTokenFromLocal();

    const isUserOnBoarded = () => {
      console.log(userAuth.value, userOnboardingStatus());
      return userAuth.value?.onboardingId || userOnboardingStatus();
    };

    const logout = () => {
      removeItemInLocalStorage(LOCAL_TOKEN);
      userAuth.value = null;
      tokenAuth.value = null;
      router.push(ROUTES.DEFAULT);
    };

    return {
      userAuth,
      tokenAuth,
      signUp,
      signIn,
      verifyUser,
      resetPassword,
      forgotPassword,
      updatePassword,
      getUser,
      isAuthenticated,
      logout,
      isUserOnBoarded,
    };
  },
  {
    persist: {
      key: (id) => `sass_app_${id}`,
      storage: localStorage,
    },
  }
);
