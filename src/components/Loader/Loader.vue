<template>
  <div
    v-if="loading"
    class="flex-col items-center justify-center bg-opacity-50"
  >
    <div
      :class="[
        'loader ease-linear rounded-full border-4 border-t-4 border-primary-200',
        loaderSizeClass,
      ]"
    ></div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    loading?: boolean;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  }>(),
  { loading: false, size: "xs" }
);

const loaderSizeClass = computed(() => {
  let sizeClass = "w-5 h-5 border-2 border-t-2";

  if (props.size === "sm") {
    sizeClass = "w-10 h-10";
  }

  if (props.size === "md") {
    sizeClass = "w-14 h-14";
  }

  if (props.size === "lg") {
    sizeClass = "w-20 h-20";
  }

  if (props.size === "xl") {
    sizeClass = "w-24 h-24";
  }

  if (props.size === "2xl") {
    sizeClass = "w-28 h-28";
  }

  if (props.size === "3xl") {
    sizeClass = "w-32 h-32";
  }

  return sizeClass;
});
</script>

<style scoped>
.loader {
  @apply border-t-primary-600 border-l-primary-600;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
