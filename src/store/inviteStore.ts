import axiosInstance from "@/api/axiosInstance";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToastStore } from "./toastStore";
import { InviteFormType, InviteListType } from "@/types/invite";

const INVITE_BASE_URL = "/invite";

export const useInviteStore = defineStore("invite", () => {
  const inviteList = ref<InviteListType[]>([]);

  const toastStore = useToastStore();

  const postInvite = async (inviteData: InviteFormType) => {
    try {
      const response = await axiosInstance.post(
        `${INVITE_BASE_URL}`,
        inviteData
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
      console.error("Invite Post Error:", error);
      return false;
    }
  };

  const getInviteList = async () => {
    try {
      const response = await axiosInstance.get(`${INVITE_BASE_URL}/all`);
      const { inviteList, status, message } = response.data;

      if (status === "success" && inviteList.length > 0) {
        toastStore.setToastMessage({ type: "success", message });
        inviteList.value = inviteList;
        return inviteList;
      } else {
        return [];
      }
    } catch (error: any) {
      toastStore.setToastMessage({
        type: "failed",
        message: error.response.data.message as string,
      });
      console.error("Invite Get Error:", error);
      return [];
    }
  };

  return {
    inviteList,
    postInvite,
    getInviteList,
  };
});
