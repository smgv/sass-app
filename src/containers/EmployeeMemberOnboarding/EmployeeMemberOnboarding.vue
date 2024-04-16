<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <p
      class="block sm:hidden text-xl text-gray-500 font-semibold text-center mt-6"
    >
      <i class="mdi mdi-badge-account-alert"></i>
      {{ formName }} Onboarding Form
    </p>
    <div
      class="h-[82dvh] overflow-y-auto sm:h-auto sm:bg-white sm:rounded-2xl sm:shadow-md p-6 w-full sm:w-[600px] flex flex-col justify-between gap-4 sm:border sm:border-gray-300 h-full"
    >
      <p
        class="hidden sm:block text-xl text-gray-500 font-semibold text-center"
      >
        <i class="mdi mdi-badge-account-alert"></i>
        {{ formName }} Onboarding Form
      </p>
      <form
        v-if="currentOnboardingState === MEMBER_EMPLOYEE_FORM.EMAIL"
        class="flex flex-col sm:flex-row gap-4 items-end"
      >
        <TextField
          label="Email"
          placeholder="eg: example@domain.com"
          required
          class="flex-1"
        />
        <Button class="sm:!w-auto" size="md">Next</Button>
      </form>
      <form
        v-if="currentOnboardingState === MEMBER_EMPLOYEE_FORM.ONBOARDING"
        class="flex flex-col gap-4"
      >
        <div class="flex flex-col sm:flex-row gap-4 w-full">
          <TextField label="Full Name" placeholder="Enter Full Name" required />
          <TextField
            label="Role"
            :model-value="isEmployee ? ROLES.EMPLOYEE : ROLES.MEMBER"
            required
          />
        </div>
        <div class="flex flex-col sm:flex-row gap-4 w-full">
          <TextField label="Pincode" placeholder="eg. 400104" required />
          <TextField label="Locality" placeholder="eg. Goregaon" required />
        </div>
        <TextArea label="Address" placeholder="Area and Street" required />
        <div class="flex flex-col sm:flex-row gap-4 w-full">
          <TextField
            label="City/District/Town"
            placeholder="eg. Mumbai"
            required
          />
          <TextField label="State" placeholder="eg. Maharashtra" required />
        </div>
        <div class="flex flex-col sm:flex-row gap-4 w-full">
          <TextField
            label="Contact Number"
            placeholder="10 digit-mobile number"
            type="number"
            required
          />
          <TextField
            label="Emergency Contact Number"
            placeholder="10 digit-mobile number"
            type="number"
          />
        </div>
        <div class="flex flex-col sm:flex-row gap-4 w-full">
          <TextField
            v-if="isEmployee"
            label="Website URL"
            placeholder="www.yourgym.com"
            type="url"
          />
          <TextField
            label="Photo URL"
            placeholder="eg. https://example.com"
            type="url"
          />
        </div>
        <Button class="hidden gap-4 w-full p-6 sm:flex" size="md">Next</Button>
      </form>
      <form
        v-if="currentOnboardingState === MEMBER_EMPLOYEE_FORM.PASSWORD"
        class="flex flex-grow-1 flex-col gap-4"
      >
        <div class="flex flex-col sm:flex-row gap-4 w-full">
          <TextField label="Password" placeholder="*******" required />
          <TextField label="Confirm Password" placeholder="*******" required />
        </div>
        <Button size="md">Submit</Button>
      </form>
    </div>
    <div
      v-if="currentOnboardingState === MEMBER_EMPLOYEE_FORM.ONBOARDING"
      class="flex gap-4 w-full p-6 sm:hidden"
    >
      <Button size="md">Submit</Button>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ROUTES_NAME } from "@/constants/routes";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import TextField from "@/components/TextField";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import {
  MEMBER_EMPLOYEE_FORM,
  ROLES,
} from "@/constants/employeeMemberOnboarding";

const route = useRoute();

const currentOnboardingState = ref(MEMBER_EMPLOYEE_FORM.ONBOARDING);

const formName = computed(() => {
  return route.name === ROUTES_NAME.EMPLOYEE_ONBOARDING ? "Employee" : "Member";
});

const isEmployee = computed(
  () => route.name === ROUTES_NAME.EMPLOYEE_ONBOARDING
);
console.log(route);
</script>

<style scoped></style>
