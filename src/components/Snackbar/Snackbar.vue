<template>
  <transition name="fade">
    <div v-if="showSnackBar" :class="[snackbarClasses]">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center">
          <span :class="[iconClasses]"></span>
          <span class="ml-2">{{ message }}</span>
        </div>
        <button
          @click="hideSnackbar"
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
import { ref, computed, onMounted, watch } from "vue";

const props = withDefaults(
  defineProps<{
    show?: boolean;
    type: "success" | "warning" | "failed";
    message?: string;
  }>(),
  {
    show: false,
    type: "success",
    message: "",
  }
);

const showSnackBar = ref(props.show);

watch(
  () => props.show,
  () => {
    showSnackBar.value = props.show;
  }
);

const snackbarClasses = computed(() => {
  return {
    "bg-green-500": props.type === "success",
    "bg-yellow-500": props.type === "warning",
    "bg-red-500": props.type === "failed",
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
    "bg-white": props.type === "success",
    "bg-yellow-100": props.type === "warning",
    "bg-red-100": props.type === "failed",
  };
});

const hideSnackbar = () => {
  showSnackBar.value = false;
};

onMounted(() => {
  setTimeout(() => {
    showSnackBar.value = false;
  }, 3000); // Hide after 3 seconds
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
