import { defineStore } from "pinia";
import { ref } from "vue";

export const useSnackbarStore = defineStore("snackbar", () => {
  const isMessageSet = ref(false);

  return { isMessageSet };
});
