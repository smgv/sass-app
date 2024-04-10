<template>
  <div class="flex flex-col flex-start gap-2">
    <label v-if="label" :for="label" class="text-base capitalize text-gray-500">
      {{ label }}
      <span v-if="required" class="text-red-500 text-medium">*</span>
    </label>
    <div :class="[inputContainerClassList]">
      <input
        :id="label"
        v-model="value"
        :type="
          type === 'password' ? (showPassword ? 'text' : 'password') : type
        "
        v-bind="$attrs"
        :class="[defaultInputClass]"
        @focus="isInputFocus = true"
        @blur="isInputFocus = false"
      />
      <button
        v-if="type === 'password'"
        type="button"
        :class="[
          'appearance-none p-0 text-gray-500 text-2xl',
          { 'pr-3': !icon },
        ]"
        @click="showPassword = !showPassword"
        @focus="isInputFocus = true"
        @blur="isInputFocus = false"
      >
        <i :class="[`mdi ${showPassword ? 'mdi-eye-off' : 'mdi-eye'}`]"> </i>
      </button>
      <button
        v-if="icon"
        type="button"
        class="appearance-none p-0 text-gray-500 text-2xl pr-3"
        @click="emits('onIconClick')"
        @focus="isInputFocus = true"
        @blur="isInputFocus = false"
      >
        <i :class="[`mdi mdi-${icon}`]"></i>
      </button>
    </div>
    <p v-if="helperText" :class="[defaultHelperClass, helperStatusClass]">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { InputHTMLAttributes, computed, ref } from "vue";

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

const emits = defineEmits(["onIconClick", "update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (value2) => emits("update:modelValue", value2),
});

const isInputFocus = ref(false);
const showPassword = ref(false);

const inputContainerClass =
  "w-full flex gap-2 items-center border-2 border-gray-300 rounded-md bg-white";
const inputContainerDisabledClass = "border-gray-400";
const defaultInputClass =
  "placeholder-gray-400 border-0 focus:outline-none focus:ring-0 text-gray-500 w-full rounded-md";
const defaultHelperClass = "text-sm text-gray-500";

const inputContainerClassList = computed(() => {
  let classList = [inputContainerClass];
  if (props.disabled || props.readonly) {
    classList.push(inputContainerDisabledClass);
  }
  if (isInputFocus.value && !props.error && !props.success) {
    classList.push("border-primary-900");
  } else if (props.error) {
    classList.push("border-red-500");
  } else if (props.success) {
    classList.push("border-green-500");
  } else {
    classList.push("border-gray-300");
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
