<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <p class="italic text-3xl text-gray-300 mb-6">logo</p>
    <form
      class="sm:bg-white sm:rounded-2xl sm:shadow-md p-6 w-full sm:w-[450px] flex flex-col gap-4 sm:border sm:border-gray-300"
    >
      <p class="text-base text-gray-500 font-bold text-center">
        Create a strong password
      </p>
      <!-- Password -->
      <TextField
        v-model="AuthFormData.password"
        :error="v$.password?.$error"
        :helper-text="v$.password?.$error ? (v$.password?.$errors[0]?.$message as string) : PASSWORD_HELPER_TEXT"
        label="Password"
        placeholder="Please enter password"
        type="password"
        name="password"
      />
      <!-- Confirm Password -->
      <TextField
        v-model="AuthFormData.confirmPassword"
        :error="v$.confirmPassword?.$error"
        :helper-text="v$.confirmPassword?.$error ? (v$.confirmPassword?.$errors[0]?.$message as string) : ''"
        label="Confirm Password"
        placeholder="Please enter confirm password"
        type="password"
        name="confirm-password"
      />
      <Button size="md" @click.prevent="handleForm" :loading="loading">
        Reset Password
      </Button>
    </form>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useValidate from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";

import TextField from "@/components/TextField";
import Button from "@/components/Button";
import Footer from "@/components/Footer";

import { AUTH_FORM_INITIAL_STATE } from "@/constants/auth";
import { AuthFormType } from "@/types/auth";
import { isConfirmPasswordValid, isPasswordValid } from "@/utils/auth";
import { useAuthStore } from "@/store/authStore";
import { PASSWORD_HELPER_TEXT } from "@/constants/auth";
import { useRoute } from "vue-router";

const AuthFormData = ref<AuthFormType>({ ...AUTH_FORM_INITIAL_STATE });

const authStore = useAuthStore();
const loading = ref(false);

const rules = {
  password: {
    valid: helpers.withMessage(
      "Please enter valid password",
      (value: string) => {
        return isPasswordValid(value);
      }
    ),
  },
  confirmPassword: {
    valid: helpers.withMessage("Password mismatch", (value: string) => {
      return isConfirmPasswordValid(value, AuthFormData.value.password);
    }),
  },
};

const v$ = useValidate(rules, AuthFormData, { $stopPropagation: true });

const routes = useRoute();

const handleForm = async () => {
  try {
    loading.value = true;
    const isValid = await v$.value.$validate();
    if (!isValid) return;

    const { params } = routes;

    const { password } = AuthFormData.value;
    let isSuccess = false;

    isSuccess = await authStore.updatePassword(
      params.token as string,
      password
    );

    if (isSuccess) {
      AuthFormData.value = { ...AUTH_FORM_INITIAL_STATE };
      v$.value.$reset();
    }
  } catch (error) {
    console.error("Handle Form", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
