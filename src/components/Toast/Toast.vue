<template>
  <transition name="fade">
    <div
      v-if="toastMessage.message"
      :class="[ToastClasses]"
      class="flex items-center justify-center gap-x-2"
    >
      <i :class="icons" class="text-xl font-bold" />
      <span class="text-base font-normal">{{ toastMessage.message }}</span>
      <button
        @click="deleteToastMessage"
        class="text-white focus:outline-none hover:bg-gray-800 p-1 rounded-full"
      >
        <svg
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useToastStore } from "@/store/toastStore";

const toastStore = useToastStore();

const timeoutTimer = ref(0);

const toastMessage = computed(() => {
  return toastStore.toastMessage;
});

const deleteToastMessage = () => {
  toastStore.setToastMessage({ message: "" });
  clearTimeout(timeoutTimer.value);
};

watch(toastMessage.value, (val) => {
  if (val.message) {
    timeoutTimer.value = window.setTimeout(() => {
      deleteToastMessage();
    }, 7000);
  }
});
const ToastClasses = computed(() => {
  return {
    "bg-green-600": toastMessage.value.type === "success",
    "bg-yellow-600": toastMessage.value.type === "warning",
    "bg-red-600": toastMessage.value.type === "failed",
    "text-white": true,
    "p-4": true,
    "rounded-xl": true,
    "shadow-md": true,
    absolute: true,
    "top-4": true,
    "right-4": true,
    "z-20": true,
  };
});

const icons = computed(() => {
  if (toastMessage.value.type === "success") {
    return "mdi mdi-check-circle-outline";
  } else if (toastMessage.value.type === "warning") {
    return "mdi mdi-alert-circle-outline";
  } else if (toastMessage.value.type === "failed") {
    return "mdi mdi-close-circle-outline";
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
