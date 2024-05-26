<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <p class="block sm:hidden text-xl text-gray-500 font-semibold text-center">
      <i class="mdi mdi-badge-account-alert"></i>
      Onboarding Form
    </p>
    <form
      class="h-[82dvh] overflow-y-auto sm:h-auto sm:bg-white sm:rounded-2xl sm:shadow-md p-6 w-full sm:w-[600px] flex flex-col gap-4 sm:border sm:border-gray-300"
    >
      <p
        class="hidden sm:block text-xl text-gray-500 font-semibold text-center"
      >
        <i class="mdi mdi-badge-account-alert"></i>
        Onboarding Form
      </p>
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
          v-model="AdminFormData.pincode"
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
          type="number"
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
      <div class="hidden gap-4 w-full sm:flex">
        <Button size="md" variant="outlined">Skip</Button>
        <Button size="md" @click.prevent.stop="handleForm">Submit</Button>
      </div>
    </form>
    <div class="flex gap-4 w-full p-6 sm:hidden">
      <Button size="md" variant="outlined">Skip</Button>
      <Button size="md" @click.prevent.stop="handleForm">Submit</Button>
    </div>
    <Footer class="-mt-1" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { helpers } from "@vuelidate/validators";
import useValidate from "@vuelidate/core";

import TextField from "@/components/TextField";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";
import Footer from "@/components/Footer";

import { AdminFormType } from "@/types/onboarding";
import { ADMIN_FORM_INITIAL_STATE } from "@/constants/onboarding";
import { useAuthStore } from "@/store/authStore";

const AdminFormData = ref<AdminFormType>({ ...ADMIN_FORM_INITIAL_STATE });

const authStore = useAuthStore();

onMounted(async () => {
  const res = await authStore.getUser();
  console.log(res, "USER");
  console.log(authStore.userAuth, authStore.tokenAuth);
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
  pincode: {
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
        if (Boolean(value)) {
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

const handleForm = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  console.log(AdminFormData.value);

  AdminFormData.value = { ...ADMIN_FORM_INITIAL_STATE };
  v$.value.$reset();
};
</script>

<style scoped></style>
