<template>
  <transition name="fade">
    <div v-if="toastMessage.message" :class="[ToastClasses]">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center">
          <span :class="[iconClasses]"></span>
          <span class="ml-2">{{ toastMessage.message }}</span>
        </div>
        <button
          @click="deleteToastMessage"
          class="text-gray-500 focus:outline-none hover:text-gray-700"
        >
          <svg
            class="h-5 w-5"
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
    "bg-green-500": toastMessage.value.type === "success",
    "bg-yellow-500": toastMessage.value.type === "warning",
    "bg-red-500": toastMessage.value.type === "failed",
    "text-white": true,
    "px-4": true,
    "py-2": true,
    rounded: true,
    "shadow-md": true,
    absolute: true,
    "bottom-4": true,
    "left-4": true,
  };
});

const iconClasses = computed(() => {
  return {
    "text-white": true,
    "mr-2": true,
    "h-5": true,
    "w-5": true,
    "fill-current": true,
    "rounded-full": true,
    "bg-white": toastMessage.value.type === "success",
    "bg-yellow-100": toastMessage.value.type === "warning",
    "bg-red-100": toastMessage.value.type === "failed",
  };
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
