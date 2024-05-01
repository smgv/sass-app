<template>
  <div class="flex flex-col flex-start gap-2">
    <label v-if="label" :for="label" class="text-base text-gray-500">
      {{ label }}
      <span v-if="required" class="text-red-500 text-medium">*</span>
    </label>
    <select
      :id="label || name"
      v-bind="$attrs"
      v-model="value"
      :class="[defaultSelectClass, selectInputClass]"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
    <p v-if="helperText" :class="[defaultHelperClass, helperStatusClass]">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { SelectHTMLAttributes, computed } from "vue";

export type OptionsType = { name: string; value: string };

export interface TextFieldProps extends /* @vue-ignore */ SelectHTMLAttributes {
  label?: string;
  options: OptionsType[];
  error?: boolean;
  success?: boolean;
  required?: boolean;
  helperText?: string;
  modelValue?: string;
}
const props = withDefaults(defineProps<TextFieldProps>(), {
  label: "",
  error: false,
  success: false,
  required: true,
  helperText: "",
  modelValue: "",
});
const emits = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (value2) => emits("update:modelValue", value2),
});

const defaultSelectClass =
  "form-select !bg-[url('../../assets/arrow-down.png')] px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-0 text-gray-500 w-full";
const defaultHelperClass = "text-xs text-gray-500";

const selectInputClass = computed(() => {
  let selectClass = "border-gray-300 focus:border-primary-900";

  if (props.error) {
    selectClass = "border-red-500 focus:border-red-500";
  } else if (props.success) {
    selectClass = "border-green-500 focus:border-green-500";
  }
  return selectClass;
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
