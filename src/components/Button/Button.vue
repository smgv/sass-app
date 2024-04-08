<template>
  <button
    v-bind="$attrs"
    :class="[
      'appearance-none outline-none ring-0 flex items-center justify-center cursor-pointer gap-2',
      variantClass,
      sizeClass,
      {
        uppercase: uppercase,
        'w-full': block,
        'rounded-md': pill,
        'opacity-35': disabled,
      },
    ]"
    :disabled="disabled"
  >
    <Loader :size="loaderSize" :loading="isLoading" />
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ButtonHTMLAttributes, computed } from "vue";
import Loader from "../Loader";

export interface ButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  variant?: "default" | "outlined" | "text";
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  uppercase?: boolean;
  block?: boolean;
  pill?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "default",
  loading: true,
  size: "sm",
  uppercase: false,
  block: true,
  pill: true,
  disabled: true,
});

const variantClass = computed(() => {
  let btnClass = `bg-primary-900 text-white hover:bg-primary-800 
    hover:shadow-lg hover:translate-y-0.5 
    disabled:bg-gray-500 hover:disabled:shadow-none hover:disabled:translate-y-0 disabled:cursor-not-allowed`;

  if (props.variant === "outlined") {
    btnClass =
      "border border-primary-900 text-primary-900 hover:border-primary-800 hover:text-primary-800 hover:shadow-lg hover:translate-y-0.5";
  }

  if (props.variant === "text") {
    btnClass = "text-primary-900 hover:text-primary-800";
  }

  return btnClass;
});

const sizeClass = computed(() => {
  let btnClass = "h-8 px-4 text-sm";

  if (props.size === "md") {
    btnClass = "h-10 px-6 text-base";
  }

  if (props.size === "lg") {
    btnClass = "h-12 px-8 text-lg";
  }

  if (props.variant === "text") {
    btnClass = "px-0";
  }

  return btnClass;
});

const loaderSize = computed(() => {
  return props.size === "sm" ? "xs" : props.size === "md" ? "sm" : "md";
});

const isLoading = computed(() => {
  return props.loading && !props.disabled;
});
</script>

<style scoped></style>
