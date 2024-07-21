<template>
  <div class="flex flex-col w-full flex-start gap-2">
    <label v-if="label" :for="label" class="text-base capitalize text-gray-500">
      {{ label }}
      <span v-if="required" class="text-red-500 text-medium">*</span>
    </label>
    <textarea
      :id="label"
      v-model="value"
      :type="type"
      :disabled="disabled"
      v-bind="$attrs"
      :class="[textAreaStatusClass]"
    />
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
  type?: InputHTMLAttributes["type"];
  disabled?: InputHTMLAttributes["disabled"];
  icon?: string;
  modelValue?: string;
}
const props = withDefaults(defineProps<TextFieldProps>(), {
  label: "",
  error: false,
  success: false,
  required: true,
  helperText: "",
  type: "text",
  disabled: false,
  modelValue: "",
});

const emits = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (value2) => emits("update:modelValue", value2),
});

const defaultHelperClass = "text-xs text-gray-500";
const defaultTextAreaClass =
  "border-2 focus:outline-none focus:ring-0 rounded-md placeholder-gray-400 text-gray-500";

const textAreaStatusClass = computed(() => {
  let classList = [defaultTextAreaClass];
  if (props.disabled || props.readonly) {
    classList.push(
      "disabled:border-gray-400 disabled:cursor-not-allowed disabled:hover:border-gray-400"
    );
    return classList;
  }
  if (props.error) {
    classList.push("border-red-500 focus:border-red-500");
  } else if (props.success) {
    classList.push("border-green-500 focus:border-green-500");
  } else {
    classList.push("border-gray-300 focus:border-primary-900");
  }
  return classList;
});

const helperStatusClass = computed(() => {
  let helperClass = "text-gray-500";
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
