import axiosInstance from "@/api/axiosInstance";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToastStore } from "./toastStore";
import { InboxFormType, InboxListType } from "@/types/inbox";

const NOTIFICATION_BASE_URL = "/notification";

export const useInboxStore = defineStore("inbox", () => {
  const inboxList = ref<InboxListType[]>([]);

  const toastStore = useToastStore();

  const postInbox = async (inboxData: InboxFormType) => {
    try {
      const response = await axiosInstance.post(
        `${NOTIFICATION_BASE_URL}`,
        inboxData
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
      console.error("Notification Post Error:", error);
      return false;
    }
  };

  const getInboxList = async () => {
    try {
      const response = await axiosInstance.get(`${NOTIFICATION_BASE_URL}/all`);
      const { notificationList, status, message } = response.data;
      if (status === "success") {
        toastStore.setToastMessage({ type: "success", message });
        inboxList.value = notificationList;
        return notificationList;
      } else {
        toastStore.setToastMessage({ type: "failed", message });
        return [];
      }
    } catch (error: any) {
      toastStore.setToastMessage({
        type: "failed",
        message: error.response.data.message as string,
      });
      console.error("Notification Get Error:", error);
      return [];
    }
  };

  return {
    inboxList,
    postInbox,
    getInboxList,
  };
});
