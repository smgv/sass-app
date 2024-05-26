import { defineStore } from "pinia";
import { ref } from "vue";

import { TOAST_TYPES, ToastMessage } from "@/types/toast";

export const useToastStore = defineStore("toast", () => {
  const toastMessage = ref<ToastMessage>({
    message: "",
    type: TOAST_TYPES.INFO,
  });

  const isMessageSet = ref(false);

  const setToastMessage = (details: ToastMessage) => {
    toastMessage.value.message = details.message;
    toastMessage.value.type = details.type || TOAST_TYPES.INFO;
    isMessageSet.value = true;
  };

  const removeToastMessage = () => {
    toastMessage.value.message = "";
    toastMessage.value.type = TOAST_TYPES.INFO;
    isMessageSet.value = false;
  };

  return { setToastMessage, toastMessage, removeToastMessage, isMessageSet };
});
