<template>
  <div
    v-if="loading"
    class="h-screen flex flex-col justify-center items-center w-full"
  >
    <Loader loading size="lg" />
    <p
      class="w-[80%] sm:w-[60%] mx-auto text-center mt-6 text-lg text-gray-600"
    >
      Please wait verifying the user...
    </p>
  </div>
  <div v-else class="w-full h-screen flex flex-col justify-center items-center">
    <p
      class="block sm:hidden text-xl text-gray-500 font-semibold text-center mt-6"
    >
      <i class="mdi mdi-badge-account-alert"></i>
      {{ formName }} Onboarding Form
    </p>
    <div
      class="h-[82dvh] overflow-y-auto sm:h-auto sm:bg-white sm:rounded-2xl sm:shadow-md p-6 w-full sm:w-[600px] flex flex-col justify-between gap-4 sm:border sm:border-gray-300"
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
          v-model="emailData"
          :error="emailForm.emailData?.$error"
          :helper-text="emailForm.emailData?.$error ? (emailForm.emailData?.$errors[0]?.$message as string) : ''"
          name="email"
          :disabled="true"
        />
        <Button
          class="sm:!w-auto"
          size="md"
          @click.prevent.stop="handleEmailForm"
          >Next</Button
        >
      </form>
      <form
        v-if="currentOnboardingState === MEMBER_EMPLOYEE_FORM.ONBOARDING"
        class="flex flex-col gap-4"
      >
        <div class="flex flex-col sm:flex-row gap-4 w-full">
          <TextField
            label="Full Name"
            placeholder="Enter Full Name"
            required
            v-model="onboardingFormData.fullName"
            :error="onboardingForm.fullName?.$error"
            :helper-text="onboardingForm.fullName?.$error ? (onboardingForm.fullName?.$errors[0]?.$message as string) : ''"
            name="fullName"
          />
          <TextField
            label="Role"
            :model-value="isEmployee ? ROLES.EMPLOYEE : ROLES.MEMBER"
            required
            readonly
            name="role"
          />
        </div>
        <div class="flex flex-col sm:flex-row gap-4 w-full">
          <TextField
            label="Pincode"
            placeholder="eg. 400104"
            required
            v-model="onboardingFormData.pinCode"
            :error="onboardingForm.pinCode?.$error"
            :helper-text="onboardingForm.pinCode?.$error ? (onboardingForm.pinCode?.$errors[0]?.$message as string) : ''"
            name="pinCode"
          />
          <TextField
            label="Locality"
            placeholder="eg. Goregaon"
            required
            v-model="onboardingFormData.locality"
            :error="onboardingForm.locality?.$error"
            :helper-text="onboardingForm.locality?.$error ? (onboardingForm.locality?.$errors[0]?.$message as string) : ''"
            name="locality"
          />
        </div>
        <TextArea
          label="Address"
          placeholder="Area and Street"
          required
          v-model="onboardingFormData.address"
          :error="onboardingForm.address?.$error"
          :helper-text="onboardingForm.address?.$error ? (onboardingForm.address?.$errors[0]?.$message as string) : ''"
          name="address"
        />
        <div class="flex flex-col sm:flex-row gap-4 w-full">
          <TextField
            label="City/District/Town"
            placeholder="eg. Mumbai"
            required
            v-model="onboardingFormData.city"
            :error="onboardingForm.city?.$error"
            :helper-text="onboardingForm.city?.$error ? (onboardingForm.city?.$errors[0]?.$message as string) : ''"
            name="city"
          />
          <TextField
            label="State"
            placeholder="eg. Maharashtra"
            required
            v-model="onboardingFormData.state"
            :error="onboardingForm.state?.$error"
            :helper-text="onboardingForm.state?.$error ? (onboardingForm.state?.$errors[0]?.$message as string) : ''"
            name="state"
          />
        </div>
        <div class="flex flex-col sm:flex-row gap-4 w-full">
          <TextField
            label="Contact Number"
            placeholder="10 digit-mobile number"
            type="number"
            required
            v-model="onboardingFormData.contactNumber"
            :error="onboardingForm.contactNumber?.$error"
            :helper-text="onboardingForm.contactNumber?.$error ? (onboardingForm.contactNumber?.$errors[0]?.$message as string) : ''"
            name="contactNumber"
          />
          <TextField
            label="Emergency Contact Number"
            placeholder="10 digit-mobile number"
            type="number"
            v-model="onboardingFormData.emergencyContactNumber"
            :error="onboardingForm.emergencyContactNumber?.$error"
            :helper-text="onboardingForm.emergencyContactNumber?.$error ? (onboardingForm.emergencyContactNumber?.$errors[0]?.$message as string) : ''"
            name="emergencyContactNumber"
          />
        </div>
        <div class="flex flex-col sm:flex-row gap-4 w-full">
          <TextField
            v-if="isEmployee"
            label="Website URL"
            placeholder="www.yourgym.com"
            type="url"
            v-model="onboardingFormData.websiteURL"
            :error="onboardingForm.websiteURL?.$error"
            :helper-text="onboardingForm.websiteURL?.$error ? (onboardingForm.websiteURL?.$errors[0]?.$message as string) : ''"
            name="websiteURL"
            :required="false"
          />
          <TextField
            label="Photo URL"
            placeholder="eg. https://example.com"
            type="url"
            v-model="onboardingFormData.photoURL"
            :error="onboardingForm.photoURL?.$error"
            :helper-text="onboardingForm.photoURL?.$error ? (onboardingForm.photoURL?.$errors[0]?.$message as string) : ''"
            name="photoURL"
            :required="false"
          />
        </div>
        <Button
          class="hidden gap-4 w-full p-6 sm:flex"
          size="md"
          @click.prevent.stop="handleOnboardingForm"
          >Next</Button
        >
      </form>
      <form
        v-if="currentOnboardingState === MEMBER_EMPLOYEE_FORM.PASSWORD"
        class="flex flex-grow-1 flex-col gap-4"
      >
        <div class="flex flex-col sm:flex-row gap-4 w-full">
          <TextField
            label="Password"
            placeholder="*******"
            required
            type="password"
            v-model="passwordData.password"
            :error="passwordForm.password?.$error"
            :helper-text="passwordForm.password?.$error ? (passwordForm.password?.$errors[0]?.$message as string) : PASSWORD_HELPER_TEXT"
            name="password"
          />
          <TextField
            label="Confirm Password"
            placeholder="*******"
            required
            type="password"
            v-model="passwordData.confirmPassword"
            :error="passwordForm.confirmPassword?.$error"
            :helper-text="passwordForm.confirmPassword?.$error ? (passwordForm.confirmPassword?.$errors[0]?.$message as string) : ''"
            name="confirmPassword"
          />
        </div>
        <Button
          size="md"
          @click.prevent.stop="handlePasswordForm"
          :loading="formLoading"
          >Submit</Button
        >
      </form>
    </div>
    <div
      v-if="currentOnboardingState === MEMBER_EMPLOYEE_FORM.ONBOARDING"
      class="flex gap-4 w-full p-6 sm:hidden"
    >
      <Button size="md" @click.prevent.stop="handleOnboardingForm">Next</Button>
    </div>
    <Footer
      :class="[
        {
          '!-mt-3 sm:!mt-6':
            currentOnboardingState === MEMBER_EMPLOYEE_FORM.ONBOARDING,
        },
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import useValidate from "@vuelidate/core";
import { email, helpers } from "@vuelidate/validators";

import TextField from "@/components/TextField";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";
import Footer from "@/components/Footer";

import {
  MEMBER_EMPLOYEE_FORM,
  MEMBER_EMPLOYEE_FORM_INITIAL_STATE,
  MEMBER_EMPLOYEE_PASSWORD_FORM_INITIAL_STATE,
  ROLES,
} from "@/constants/onboarding";
import { ROUTES_NAME } from "@/constants/routes";
import {
  MemberEmployeeFormType,
  MemberEmployeePasswordFormType,
} from "@/types/onboarding";
import { isConfirmPasswordValid, isPasswordValid } from "@/utils/auth";
import { PASSWORD_HELPER_TEXT } from "@/constants/auth";

import Loader from "@/components/Loader";
import { useMemberStore } from "@/store/memberStore";
import { useEmployeeStore } from "@/store/employeeStore";

const memberStore = useMemberStore();
const employeeStore = useEmployeeStore();

const loading = ref(false);
const route = useRoute();
const currentOnboardingState = ref(MEMBER_EMPLOYEE_FORM.EMAIL);
const emailData = ref("");
const adminEmail = ref("");
const formLoading = ref(false);

const isEmployee = computed(
  () => route.name === ROUTES_NAME.EMPLOYEE_ONBOARDING
);

onMounted(async () => {
  loading.value = true;
  const { params } = route;
  const resp = await memberStore.getMember(params.token as string);
  emailData.value = resp.email;
  adminEmail.value = resp.customData.adminEmail;
  loading.value = false;
  if (resp.email) {
    (await isEmployee)
      ? employeeStore.getEmployeeOnboardingStatus(resp.email)
      : memberStore.getMemberOnboardingStatus(resp.email);
  }
});

const onboardingFormData = ref<MemberEmployeeFormType>({
  ...MEMBER_EMPLOYEE_FORM_INITIAL_STATE,
});
const passwordData = ref<MemberEmployeePasswordFormType>({
  ...MEMBER_EMPLOYEE_PASSWORD_FORM_INITIAL_STATE,
});

const emailFormRules = {
  emailData: {
    valid: helpers.withMessage(
      "Please enter your email id",
      (value: string) => {
        return value !== "";
      }
    ),
    email,
  },
};

const emailForm = useValidate(
  emailFormRules,
  { emailData },
  {
    $stopPropagation: true,
  }
);

const onboardingFormRules = {
  fullName: {
    valid: helpers.withMessage(
      "Please enter valid full name",
      (value: string) => {
        return value !== "";
      }
    ),
  },
  role: {
    valid: helpers.withMessage("Please enter valid role", () => {
      return true;
    }),
  },
  pinCode: {
    valid: helpers.withMessage(
      "Please enter valid pincode",
      (value: number) => {
        return Boolean(value) && value.toString().length === 6;
      }
    ),
  },
  locality: {
    valid: helpers.withMessage(
      "Please enter valid locality",
      (value: string) => {
        return value !== "";
      }
    ),
  },
  address: {
    valid: helpers.withMessage(
      "Please enter valid address or street name",
      (value: string) => {
        return value !== "";
      }
    ),
  },
  city: {
    valid: helpers.withMessage("Please enter valid city", (value: string) => {
      return value !== "";
    }),
  },
  state: {
    valid: helpers.withMessage("Please enter valid state", (value: string) => {
      return value !== "";
    }),
  },
  contactNumber: {
    valid: helpers.withMessage(
      "Please enter valid contact number",
      (value: number) => {
        return Boolean(value) && value.toString().length === 10;
      }
    ),
  },
  emergencyContactNumber: {
    valid: helpers.withMessage(
      "Contact number and emergency contact number cannot be same",
      (value: number) => {
        return (
          onboardingFormData.value.contactNumber.toString() !== value.toString()
        );
      }
    ),
  },
  websiteURL: {
    valid: helpers.withMessage(
      "Please enter valid website URL",
      (value: string) => {
        if (value && isEmployee) {
          return value !== "";
        } else {
          return true;
        }
      }
    ),
  },
  photoURL: {
    valid: helpers.withMessage(
      "Please enter valid photo URL",
      (value: string) => {
        if (value) {
          return value !== "";
        } else {
          return true;
        }
      }
    ),
  },
};

const onboardingForm = useValidate(onboardingFormRules, onboardingFormData, {
  $stopPropagation: true,
});

const passwordFormRules = {
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
      return isConfirmPasswordValid(value, passwordData.value.password);
    }),
  },
};

const passwordForm = useValidate(passwordFormRules, passwordData, {
  $stopPropagation: true,
});

const formName = computed(() => {
  return route.name === ROUTES_NAME.EMPLOYEE_ONBOARDING ? "Employee" : "Member";
});

const handleEmailForm = async () => {
  const isValid = await emailForm.value.$validate();
  if (!isValid) return;
  console.log(emailData.value);
  currentOnboardingState.value = MEMBER_EMPLOYEE_FORM.ONBOARDING;
};

const handleOnboardingForm = async () => {
  const isValid = await onboardingForm.value.$validate();
  if (!isValid) return;
  console.log(onboardingFormData.value);
  currentOnboardingState.value = MEMBER_EMPLOYEE_FORM.PASSWORD;
};

const handlePasswordForm = async () => {
  try {
    formLoading.value = true;
    const isValid = await passwordForm.value.$validate();
    if (!isValid) return;
    console.log(passwordData.value, emailData.value, onboardingFormData.value);
    if (isEmployee.value) {
      await employeeStore.postEmployee(
        {
          email: emailData.value,
          ...onboardingFormData.value,
          password: passwordData.value.password,
        },
        adminEmail.value
      );
    } else {
      await memberStore.postMember(
        {
          email: emailData.value,
          ...onboardingFormData.value,
          password: passwordData.value.password,
        },
        adminEmail.value
      );
    }
  } catch (error) {
    console.error("Post Onboarding Employee Member", error);
  } finally {
    formLoading.value = false;
  }
};
</script>

<style scoped></style>
