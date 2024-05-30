import axiosInstance from "@/api/axiosInstance";
import { AdminFormType } from "@/types/onboarding";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToastStore } from "./toastStore";
import { useRouter } from "vue-router";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "./authStore";

const ADMIN_BASE_URL = "/admin";

export const useAdminStore = defineStore("adminStore", () => {
  const adminOnboardingDetails = ref<AdminFormType | null>(null);
  const toastStore = useToastStore();
  const authStore = useAuthStore();
  const router = useRouter();

  const submitOnboardingDetails = async (onboardingDetails: AdminFormType) => {
    try {
      const response = await axiosInstance.post(
        `${ADMIN_BASE_URL}/onboarding`,
        onboardingDetails
      );
      const { status, message } = response.data;
      if (status === "success") {
        toastStore.setToastMessage({ type: "success", message });
        router.push(ROUTES.ADMIN);
        return true;
      } else {
        toastStore.setToastMessage({ type: "failed", message });
        return true;
      }
    } catch (error: any) {
      toastStore.setToastMessage({
        type: "failed",
        message: error.response.data.message as string,
      });
      console.error("Admin Onboarding Error:", error);
      return false;
    }
  };

  const getAdminDetails = async (id: string): Promise<boolean> => {
    try {
      const response = await axiosInstance.get(
        `${ADMIN_BASE_URL}/admin-details/${id}`
      );
      const { status, message, onboardingData } = response.data;
      if (status === "success") {
        adminOnboardingDetails.value = onboardingData;
        return true;
      } else {
        toastStore.setToastMessage({ type: "failed", message });
        return false;
      }
    } catch (error: any) {
      authStore.logout();
      toastStore.setToastMessage({
        type: "failed",
        message: error.response.data.message as string,
      });
      console.error("Admin Get Onboarding Error:", error);
      return false;
    }
  };

  const updateOnboardingDetails = async (onboardingDetails: AdminFormType) => {
    try {
      const response = await axiosInstance.patch(
        `${ADMIN_BASE_URL}/update-admin-details`,
        onboardingDetails
      );

      const { status, message, updatedOnboardingData } = response.data;

      if (status === "success") {
        adminOnboardingDetails.value = updatedOnboardingData;
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
      console.error("Admin Get Onboarding Error:", error);
      return false;
    }
  };

  return {
    adminOnboardingDetails,
    submitOnboardingDetails,
    getAdminDetails,
    updateOnboardingDetails,
  };
});
