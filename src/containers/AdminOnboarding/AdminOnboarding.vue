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
        />
        <TextField label="Owner Name" placeholder="Full Name" required />
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
          label="Mobile Number"
          placeholder="10 digit-mobile number"
          type="number"
          required
        />
        <TextField
          label="GST Number"
          placeholder="eg. 22AAAAA0000A1Z5"
          type="number"
        />
      </div>
      <div class="flex flex-col sm:flex-row gap-4 w-full">
        <TextField
          label="Website URL"
          placeholder="www.yourgym.com"
          type="url"
        />
        <TextField
          label="Logo URL"
          placeholder="eg. https://example.com"
          type="url"
        />
      </div>
      <div class="hidden gap-4 w-full sm:flex">
        <Button size="md" variant="outlined">Skip</Button>
        <Button size="md">Submit</Button>
      </div>
    </form>
    <div class="flex gap-4 w-full p-6 sm:hidden">
      <Button size="md" variant="outlined">Skip</Button>
      <Button size="md">Submit</Button>
    </div>
    <Footer class="-mt-1" />
  </div>
</template>

<script setup lang="ts">
import TextField from "@/components/TextField";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
</script>

<style scoped></style>
