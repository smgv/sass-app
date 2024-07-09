import axiosInstance from "@/api/axiosInstance";
import { defineStore } from "pinia";
// import { ref } from "vue";
import { useToastStore } from "./toastStore";
import { MemberEmployeeFormDataType } from "@/types/onboarding";
import { useRouter } from "vue-router";

const MEMBER_BASE_URL = "/member";

export const useMemberStore = defineStore("member", () => {
  const toastStore = useToastStore();
  const router = useRouter();

  const getMember = async (token: string) => {
    try {
      const response = await axiosInstance.get(
        `${MEMBER_BASE_URL}/get-details/${token}`
      );
      const { member, status, message } = response.data;

      if (status === "success" && member) {
        return member;
      } else {
        toastStore.setToastMessage({ type: "failed", message });
        return null;
      }
    } catch (error: any) {
      toastStore.setToastMessage({
        type: "failed",
        message: error.response.data.message as string,
      });
      console.error("Member Get Error:", error);
      return null;
    }
  };

  const postMember = async (
    employeeDetails: MemberEmployeeFormDataType,
    adminEmail: string
  ) => {
    try {
      const response = await axiosInstance.post(
        `${MEMBER_BASE_URL}/post-details`,
        {
          ...employeeDetails,
          adminEmail,
        }
      );
      const { status, message } = response.data;

      if (status === "success") {
        toastStore.setToastMessage({ type: "success", message });
        router.push("/onboarding-status");
      } else {
        toastStore.setToastMessage({ type: "failed", message });
      }
    } catch (error: any) {
      toastStore.setToastMessage({
        type: "failed",
        message: error.response.data.message as string,
      });
      console.error("Member Post Error:", error);
    }
  };

  const getMemberOnboardingStatus = async (email: string) => {
    try {
      const response = await axiosInstance.post(`${MEMBER_BASE_URL}/status`, {
        email,
      });
      const { status } = response.data;

      if (status === "success") {
        router.push("/onboarding-status");
      } else {
        return null;
      }
    } catch (error: any) {
      console.error("Member Onboarding Status Error:", error);
      return null;
    }
  };

  return {
    getMember,
    postMember,
    getMemberOnboardingStatus,
  };
});
