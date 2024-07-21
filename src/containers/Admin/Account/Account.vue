<template>
  <div>
    <!-- Heading -->
    <h4 class="text-xl sm:text-3xl font-bold sm:font-medium w-max">
      Your Account Details
    </h4>

    <form
      class="sm:bg-white sm:rounded-2xl sm:shadow-md p-6 w-full flex flex-col gap-4 sm:border sm:border-gray-300 my-6"
    >
      <div class="flex flex-col sm:flex-row gap-4 w-full">
        <TextField
          label="(Studio / Gym) Name"
          placeholder="Gym Name"
          required
          v-model="AdminFormData.name"
          :error="v$.name?.$error"
          :helper-text="v$.name?.$error ? (v$.name?.$errors[0]?.$message as string) : ''"
          name="name"
        />
        <TextField
          label="Owner Name"
          placeholder="Full Name"
          required
          v-model="AdminFormData.ownerName"
          :error="v$.ownerName?.$error"
          :helper-text="v$.ownerName?.$error ? (v$.ownerName?.$errors[0]?.$message as string) : ''"
          name="ownerName"
        />
      </div>
      <div class="flex flex-col sm:flex-row gap-4 w-full">
        <TextField
          label="Pincode"
          placeholder="eg. 400104"
          required
          type="number"
          v-model="AdminFormData.pinCode"
          :error="v$.pincode?.$error"
          :helper-text="v$.pincode?.$error ? (v$.pincode?.$errors[0]?.$message as string) : ''"
          name="pincode"
        />
        <TextField
          label="Locality"
          placeholder="eg. Goregaon"
          required
          v-model="AdminFormData.locality"
          :error="v$.locality?.$error"
          :helper-text="v$.locality?.$error ? (v$.locality?.$errors[0]?.$message as string) : ''"
          name="locality"
        />
      </div>
      <TextArea
        label="Address"
        placeholder="Area and Street"
        required
        v-model="AdminFormData.address"
        :error="v$.address?.$error"
        :helper-text="v$.address?.$error ? (v$.address?.$errors[0]?.$message as string) : ''"
        name="address"
      />
      <div class="flex flex-col sm:flex-row gap-4 w-full">
        <TextField
          label="City/District/Town"
          placeholder="eg. Mumbai"
          required
          v-model="AdminFormData.city"
          :error="v$.city?.$error"
          :helper-text="v$.city?.$error ? (v$.city?.$errors[0]?.$message as string) : ''"
          name="city"
        />
        <TextField
          label="State"
          placeholder="eg. Maharashtra"
          required
          v-model="AdminFormData.state"
          :error="v$.state?.$error"
          :helper-text="v$.state?.$error ? (v$.state?.$errors[0]?.$message as string) : ''"
          name="state"
        />
      </div>
      <div class="flex flex-col sm:flex-row gap-4 w-full">
        <TextField
          label="Contact Number"
          placeholder="10 digit-mobile number"
          type="number"
          required
          v-model="AdminFormData.contactNumber"
          :error="v$.contactNumber?.$error"
          :helper-text="v$.contactNumber?.$error ? (v$.contactNumber?.$errors[0]?.$message as string) : ''"
          name="contactNumber"
        />
        <TextField
          label="GST Number"
          placeholder="eg. 22AAAAA0000A1Z5"
          :required="false"
          v-model="AdminFormData.gstNumber"
          :error="v$.gstNumber?.$error"
          :helper-text="v$.gstNumber?.$error ? (v$.gstNumber?.$errors[0]?.$message as string) : ''"
          name="gstNumber"
        />
      </div>
      <div class="flex flex-col sm:flex-row gap-4 w-full">
        <TextField
          label="Website URL"
          placeholder="www.yourgym.com"
          type="url"
          :required="false"
          v-model="AdminFormData.websiteURL"
          :error="v$.websiteURL?.$error"
          :helper-text="v$.websiteURL?.$error ? (v$.websiteURL?.$errors[0]?.$message as string) : ''"
          name="websiteURL"
        />
        <TextField
          label="Logo URL"
          placeholder="eg. https://example.com"
          type="url"
          :required="false"
          v-model="AdminFormData.logoURL"
          :error="v$.logoURL?.$error"
          :helper-text="v$.logoURL?.$error ? (v$.logoURL?.$errors[0]?.$message as string) : ''"
          name="logoURL"
        />
      </div>
      <div class="gap-4 flex w-max ml-auto">
        <Button size="md" :loading="loading" @click.prevent.stop="handleForm"
          >Update</Button
        >
      </div>
    </form>

    <!-- Heading -->
    <h4 class="text-xl sm:text-3xl font-bold sm:font-medium w-max">
      Change Password
    </h4>

    <form
      class="sm:bg-white sm:rounded-2xl sm:shadow-md p-6 w-full flex flex-col gap-4 sm:border sm:border-gray-300 my-6"
    >
      <div class="flex flex-col sm:flex-row gap-4 w-full">
        <TextField
          label="Current Password"
          placeholder="********"
          type="password"
          required
          name="oldPassword"
          v-model="AdminPasswordData.oldPassword"
          :error="vpwd$.oldPassword?.$error"
          :helper-text="vpwd$.oldPassword?.$error ? (vpwd$.oldPassword?.$errors[0]?.$message as string) : ''"
        />
        <TextField
          label="New Password"
          placeholder="********"
          type="password"
          required
          name="newPassword"
          v-model="AdminPasswordData.newPassword"
          :error="vpwd$.newPassword?.$error"
          :helper-text="vpwd$.newPassword?.$error ? (vpwd$.newPassword?.$errors[0]?.$message as string) : ''"
        />
        <TextField
          label="Confirm Password"
          placeholder="********"
          type="password"
          required
          name="confirmPassword"
          v-model="AdminPasswordData.confirmPassword"
          :error="vpwd$.confirmPassword?.$error"
          :helper-text="vpwd$.confirmPassword?.$error ? (vpwd$.confirmPassword?.$errors[0]?.$message as string) : ''"
        />
      </div>
      <div class="gap-4 flex w-max ml-auto">
        <Button
          size="md"
          :loading="pwdLoading"
          @click.prevent.stop="handleUpdatePassword"
          >Update Password</Button
        >
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { helpers } from "@vuelidate/validators";
import useValidate from "@vuelidate/core";

import TextField from "@/components/TextField";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";

import { AdminFormPasswordType, AdminFormType } from "@/types/onboarding";
import {
  ADMIN_FORM_INITIAL_STATE,
  ADMIN_FORM_PASSWORD_INITIAL_STATE,
} from "@/constants/onboarding";
import { useAdminStore } from "@/store/adminStore";
import { isConfirmPasswordValid, isPasswordValid } from "@/utils/auth";
import { useAuthStore } from "@/store/authStore";

const AdminFormData = ref<AdminFormType>({
  ...ADMIN_FORM_INITIAL_STATE,
});
const AdminPasswordData = ref<AdminFormPasswordType>({
  ...ADMIN_FORM_PASSWORD_INITIAL_STATE,
});
const adminStore = useAdminStore();
const authStore = useAuthStore();
const loading = ref(false);
const pwdLoading = ref(false);

onMounted(async () => {
  console.log(adminStore);
  const resp = await adminStore?.getAdminAccountInfo();
  console.log(resp);
  AdminFormData.value = { ...resp };
});

const rules = {
  name: {
    valid: helpers.withMessage(
      "Please enter valid studio or gym name",
      (value: string) => {
        return value !== "";
      }
    ),
  },
  ownerName: {
    valid: helpers.withMessage(
      "Please enter valid owner name",
      (value: string) => {
        return value !== "";
      }
    ),
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
  gstNumber: {
    valid: helpers.withMessage(
      "Please enter valid GST number",
      (value: number) => {
        if (value) {
          return value.toString().length === 10;
        } else {
          return true;
        }
      }
    ),
  },
  websiteURL: {
    valid: helpers.withMessage(
      "Please enter valid website URL",
      (value: string) => {
        if (value) {
          return value !== "";
        } else {
          return true;
        }
      }
    ),
  },
  logoURL: {
    valid: helpers.withMessage(
      "Please enter valid logo URL",
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

const v$ = useValidate(rules, AdminFormData, { $stopPropagation: true });

const passwordRules = {
  oldPassword: {
    valid: helpers.withMessage(
      "Please enter valid password",
      (value: string) => {
        return value !== "";
      }
    ),
  },
  newPassword: {
    valid: helpers.withMessage(
      "Please enter valid password",
      (value: string) => {
        if (value) return value !== "";
        return isPasswordValid(value);
      }
    ),
  },
  confirmPassword: {
    valid: helpers.withMessage("Password mismatch", (value: string) => {
      return isConfirmPasswordValid(value, AdminPasswordData.value.newPassword);
    }),
  },
};

const vpwd$ = useValidate(passwordRules, AdminPasswordData, {
  $stopPropagation: true,
});

const handleForm = async () => {
  try {
    loading.value = true;
    const isValid = await v$.value.$validate();
    if (!isValid) return;

    await adminStore.updateOnboardingDetails(AdminFormData.value);
  } catch (error) {
    console.error("Onboarding Handle Form", error);
  } finally {
    loading.value = false;
  }
};

const handleUpdatePassword = async () => {
  try {
    pwdLoading.value = true;
    const isValid = await vpwd$.value.$validate();
    if (!isValid) return;

    const isSuccess = await authStore.resetPassword(
      AdminPasswordData.value.oldPassword,
      AdminPasswordData.value.newPassword
    );

    if (isSuccess) {
      AdminPasswordData.value = { ...ADMIN_FORM_PASSWORD_INITIAL_STATE };
      vpwd$.value.$reset();
    }
  } catch (error) {
    console.error("Onboarding Handle Form", error);
  } finally {
    pwdLoading.value = false;
  }
};
</script>

<style scoped></style>
