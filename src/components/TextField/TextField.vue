<template>
  <div class="flex flex-col flex-start gap-2">
    <label v-if="label" :for="label" class="text-base capitalize text-gray-500"
      >{{ label }}
      <span v-if="required" class="text-red-500 text-medium">*</span></label
    >
    <div class="w-full">
      <input
        class="rounded-md"
        :id="label"
        v-bind="$attrs"
        :class="[defaultInputClass, inputStatusClass]"
      />
    </div>
    <p v-if="helperText" :class="[defaultHelperClass, helperStatusClass]">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { InputHTMLAttributes, computed } from "vue";

export interface TextFieldProps extends /* @vue-ignore */ InputHTMLAttributes {
  label?: string;
  error?: boolean;
  success?: boolean;
  required?: boolean;
  helperText?: string;
}
const props = withDefaults(defineProps<TextFieldProps>(), {
  label: "",
  error: false,
  success: false,
  required: true,
  helperText: "Hello",
});

const defaultInputClass =
  "placeholder-gray-400 border-gray-300 disabled:border-gray-400 focus:disabled:border-gray-400 focus:outline-none focus:ring-0 text-gray-500 w-full";

const defaultHelperClass = "text-sm text-gray-500";

const inputStatusClass = computed(() => {
  let inputClass = " focus:border-primary-900";

  if (props.error) {
    inputClass = "border-red-500 focus:border-red-500";
  }

  if (props.success) {
    inputClass = "border-green-500 focus:border-green-500";
  }

  return inputClass;
});

const helperStatusClass = computed(() => {
  let helperClass = "";

  if (props.error) {
    helperClass = "text-red-500";
  }

  if (props.success) {
    helperClass = "text-green-500";
  }

  return helperClass;
});
</script>

<style scoped></style>
