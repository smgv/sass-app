<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <p class="italic text-3xl text-gray-300 mb-6">logo</p>
    <form
      class="sm:bg-white sm:rounded-2xl sm:shadow-md p-6 w-full sm:w-[450px] flex flex-col gap-4 sm:border sm:border-gray-300"
    >
      <p
        v-if="currentAuthForm === AUTH_FORM.REGISTER"
        class="text-base text-gray-500 font-semibold text-center"
      >
        Sign Up to access the SASS app
      </p>

      <i
        v-if="currentAuthForm === AUTH_FORM.FORGOT_PASSWORD_EMAIL"
        class="mdi mdi-lock-reset text-8xl text-gray-400 font-medium text-center"
      >
      </i>
      <p
        v-if="
          [
            AUTH_FORM.FORGOT_PASSWORD_SUBMIT,
            AUTH_FORM.FORGOT_PASSWORD_EMAIL,
          ].includes(currentAuthForm)
        "
        class="text-base text-gray-500 font-bold text-center"
      >
        {{ forgotPasswordText.title }}
      </p>
      <p
        v-if="
          [
            AUTH_FORM.FORGOT_PASSWORD_SUBMIT,
            AUTH_FORM.FORGOT_PASSWORD_EMAIL,
          ].includes(currentAuthForm) && forgotPasswordText.description
        "
        class="text-sm text-gray-400 text-center -mt-2"
      >
        {{ forgotPasswordText.description }}
      </p>

      <!-- Email -->
      <TextField
        v-if="
          [
            AUTH_FORM.LOGIN,
            AUTH_FORM.REGISTER,
            AUTH_FORM.FORGOT_PASSWORD_EMAIL,
          ].includes(currentAuthForm)
        "
        v-model="AuthFormData.email"
        :error="v$.email?.$error"
        :helper-text="v$.email?.$error ? (v$.email?.$errors[0]?.$message as string) : ''"
        label="Email"
        placeholder="example@gmail.com"
        type="email"
        name="email"
      />
      <!-- Password -->
      <TextField
        v-if="
          [
            AUTH_FORM.LOGIN,
            AUTH_FORM.FORGOT_PASSWORD_SUBMIT,
            AUTH_FORM.REGISTER,
          ].includes(currentAuthForm)
        "
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
        v-if="
          [AUTH_FORM.REGISTER, AUTH_FORM.FORGOT_PASSWORD_SUBMIT].includes(
            currentAuthForm
          )
        "
        v-model="AuthFormData.confirmPassword"
        :error="v$.confirmPassword?.$error"
        :helper-text="v$.confirmPassword?.$error ? (v$.confirmPassword?.$errors[0]?.$message as string) : ''"
        label="Confirm Password"
        placeholder="Please enter confirm password"
        type="password"
        name="confirm-password"
      />
      <p
        v-if="currentAuthForm === AUTH_FORM.REGISTER"
        class="text-xs text-gray-400 text-center"
      >
        By signing up, you agree to our
        <a
          href="#"
          class="text-primary-800 font-medium cursor-pointer hover:underline"
        >
          Terms
        </a>
        and
        <a
          href="#"
          class="text-primary-800 font-medium cursor-pointer hover:underline"
        >
          Privacy Policy
        </a>
      </p>
      <Button size="md" @click.prevent="handleForm">
        {{ buttonName }}
      </Button>
      <div
        v-if="
          [
            AUTH_FORM.LOGIN,
            AUTH_FORM.REGISTER,
            AUTH_FORM.FORGOT_PASSWORD_EMAIL,
          ].includes(currentAuthForm)
        "
        class="flex gap-4 items-center"
      >
        <div class="flex flex-1 h-[1px] bg-gray-300" />
        <p class="text-base font-medium text-gray-500">OR</p>
        <div class="flex flex-1 h-[1px] bg-gray-300" />
      </div>
      <Button
        v-if="[AUTH_FORM.LOGIN, AUTH_FORM.REGISTER].includes(currentAuthForm)"
        size="md"
        variant="outlined"
      >
        Continue with Google
      </Button>
      <Button
        v-if="currentAuthForm === AUTH_FORM.LOGIN"
        variant="text"
        class="text-sm !text-gray-500"
        @click="handleForgotPassword"
      >
        Forgot password?
      </Button>
      <div
        v-if="[AUTH_FORM.LOGIN, AUTH_FORM.REGISTER].includes(currentAuthForm)"
        class="flex gap-4 items-center"
      >
        <div class="flex flex-1 h-[1px] bg-gray-300" />
      </div>
      <p
        v-if="[AUTH_FORM.REGISTER, AUTH_FORM.LOGIN].includes(currentAuthForm)"
        class="flex gap-2 items-center justify-center text-sm"
      >
        {{ switchAccountText.description }}
        <Button
          variant="text"
          :class="['text-sm']"
          @click.prevent="handleAuthForm"
        >
          {{ switchAccountText.btnText }}
        </Button>
      </p>
      <div
        v-if="currentAuthForm === AUTH_FORM.FORGOT_PASSWORD_EMAIL"
        class="flex justify-between items-center"
      >
        <Button
          variant="text"
          class="text-sm font-bold"
          @click="handleCreateNewAccount"
        >
          Create new Account
        </Button>
        <Button
          variant="text"
          class="text-sm font-bold"
          @click="handleBackToLogin"
        >
          Back to login
        </Button>
      </div>
    </form>

    <p class="text-sm mt-6 text-gray-600 font-medium">© 2024 SASS App</p>
  </div>
</template>

<script setup lang="ts">
import { ComputedRef, computed, ref } from "vue";
import useValidate from "@vuelidate/core";
import { email, helpers } from "@vuelidate/validators";

import TextField from "@/components/TextField";
import Button from "@/components/Button";

import {
  AUTH_FORM,
  AUTH_FORM_INITIAL_STATE,
  PASSWORD_HELPER_TEXT,
} from "@/constants/auth";
import {
  AuthFormType,
  ForgotPasswordTextType,
  SwitchAccountTextType,
} from "@/types/auth";
import { isConfirmPasswordValid, isPasswordValid } from "@/utils/auth";

const AuthFormData = ref<AuthFormType>({ ...AUTH_FORM_INITIAL_STATE });
const currentAuthForm = ref<AUTH_FORM>(AUTH_FORM.LOGIN);

const rules = {
  email: {
    valid: helpers.withMessage(
      "Please enter your email id",
      (value: string) => {
        if ([AUTH_FORM.FORGOT_PASSWORD_SUBMIT].includes(currentAuthForm.value))
          return true;
        return value !== "";
      }
    ),
    email,
  },
  password: {
    valid: helpers.withMessage(
      "Please enter valid password",
      (value: string) => {
        if ([AUTH_FORM.FORGOT_PASSWORD_EMAIL].includes(currentAuthForm.value))
          return true;
        return isPasswordValid(value);
      }
    ),
  },
  confirmPassword: {
    valid: helpers.withMessage("Password mismatch", (value: string) => {
      if (
        [AUTH_FORM.LOGIN, AUTH_FORM.FORGOT_PASSWORD_EMAIL].includes(
          currentAuthForm.value
        )
      )
        return true;
      return isConfirmPasswordValid(value, AuthFormData.value.password);
    }),
  },
};

const v$ = useValidate(rules, AuthFormData, { $stopPropagation: true });

const buttonName = computed(() => {
  let name = "Reset Password";
  if (currentAuthForm.value === AUTH_FORM.REGISTER) {
    name = "Sign Up";
  }
  if (currentAuthForm.value === AUTH_FORM.LOGIN) {
    name = "Sign In";
  }
  if (currentAuthForm.value === AUTH_FORM.LOGIN) {
    name = "Sign In";
  }
  if (currentAuthForm.value === AUTH_FORM.FORGOT_PASSWORD_EMAIL) {
    name = "Send Login Link";
  }
  return name;
});

const switchAccountText: ComputedRef<SwitchAccountTextType> = computed(() => {
  let description = "Don't have an account?";
  let btnText = "Sign up";
  if (currentAuthForm.value === AUTH_FORM.REGISTER) {
    description = "Have an account?";
    btnText = "Sign In";
  }
  return { description, btnText };
});

const forgotPasswordText: ComputedRef<ForgotPasswordTextType> = computed(() => {
  let title = "Trouble logging in?";
  let description =
    "Enter your email and we'll send you a link to get back into your account.";
  if (currentAuthForm.value === AUTH_FORM.FORGOT_PASSWORD_SUBMIT) {
    title = "Create a strong password";
    description = "";
  }
  return { description, title };
});

const handleAuthForm = () => {
  AuthFormData.value = { ...AUTH_FORM_INITIAL_STATE };
  currentAuthForm.value =
    currentAuthForm.value === AUTH_FORM.LOGIN
      ? AUTH_FORM.REGISTER
      : currentAuthForm.value === AUTH_FORM.FORGOT_PASSWORD_SUBMIT
      ? AUTH_FORM.FORGOT_PASSWORD_EMAIL
      : AUTH_FORM.LOGIN;
  v$.value.$reset();
};

const handleForm = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  if (currentAuthForm.value === AUTH_FORM.LOGIN) {
    console.log("Login", AuthFormData.value);
  }
  if (currentAuthForm.value === AUTH_FORM.REGISTER) {
    console.log("Register", AuthFormData.value);
  }
  if (currentAuthForm.value === AUTH_FORM.FORGOT_PASSWORD_EMAIL) {
    console.log("Email", AuthFormData.value);
  }
  if (currentAuthForm.value === AUTH_FORM.FORGOT_PASSWORD_SUBMIT) {
    console.log("Submit", AuthFormData.value);
  }
  AuthFormData.value = { ...AUTH_FORM_INITIAL_STATE };
  v$.value.$reset();
};

const handleBackToLogin = () => {
  currentAuthForm.value = AUTH_FORM.LOGIN;
  AuthFormData.value = { ...AUTH_FORM_INITIAL_STATE };
  v$.value.$reset();
};

const handleCreateNewAccount = () => {
  currentAuthForm.value = AUTH_FORM.REGISTER;
  AuthFormData.value = { ...AUTH_FORM_INITIAL_STATE };
  v$.value.$reset();
};

const handleForgotPassword = () => {
  currentAuthForm.value = AUTH_FORM.FORGOT_PASSWORD_EMAIL;
  AuthFormData.value = { ...AUTH_FORM_INITIAL_STATE };
  v$.value.$reset();
};
</script>

<style scoped></style>
