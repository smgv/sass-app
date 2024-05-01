<template>
  <div>
    <!-- Heading -->
    <h4 class="text-xl sm:text-3xl font-bold sm:font-medium w-max">
      Your Inbox
    </h4>

    <!-- Form -->
    <form
      class="flex flex-col sm:flex-row gap-4 my-6 border-b border-gray-300 pb-6"
    >
      <TextField
        label="Search"
        placeholder="Search by email"
        class="w-full"
        icon="magnify"
      />
    </form>

    <div class="flex flex-col gap-4 h-[calc(100dvh_-_236px)] overflow-y-auto">
      <div
        class="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-200 px-6 py-3 rounded-xl"
      >
        <div class="w-full">
          <p><span class="font-semibold">To:</span> example@gmail.com</p>
          <p class="truncate">
            <span class="font-semibold">Subject:</span> Happy Diwali
          </p>
        </div>
        <div class="flex items-center justify-between gap-4">
          <Button variant="outlined" class="!w-max">Edit</Button>
          <Button class="!w-max">Send Email</Button>
        </div>
      </div>
      <div
        class="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-200 px-6 py-3 rounded-xl"
      >
        <div class="w-full">
          <p><span class="font-semibold">To:</span> example@gmail.com</p>
          <p><span class="font-semibold">Subject:</span> Happy Diwali</p>
        </div>
        <div class="flex items-center justify-between gap-4">
          <Button variant="outlined" class="!w-max">Edit</Button>
          <Button class="!w-max">Send Email</Button>
        </div>
      </div>
      <div
        class="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-200 px-6 py-3 rounded-xl"
      >
        <div class="w-full">
          <p><span class="font-semibold">To:</span> example@gmail.com</p>
          <p><span class="font-semibold">Subject:</span> Happy Diwali</p>
        </div>
        <div class="flex items-center justify-between gap-4">
          <Button variant="outlined" class="!w-max">Edit</Button>
          <Button class="!w-max">Send Email</Button>
        </div>
      </div>
    </div>

    <Modal :open="showModal" @close-modal="showModal = false">
      <div class="flex flex-col gap-6">
        <h4 class="text-xl font-bold sm:font-medium w-max">Email</h4>

        <!-- Form -->
        <form class="flex flex-col gap-4">
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-3 text-left">
              <label class="text-base capitalize text-gray-500">
                To All Members
              </label>
              <input type="checkbox" class="form-checkbox rounded-md" />
            </div>
            <div class="flex items-center gap-3 text-left">
              <label class="text-base capitalize text-gray-500">
                To All Employees
              </label>
              <input type="checkbox" class="form-checkbox rounded-md" />
            </div>
          </div>

          <TextField label="From" placeholder="Email from" class="w-full" />
          <TextField label="To" placeholder="Email to" class="w-full" />
          <TextField label="Subject" class="w-full" />
          <TextArea label="Message" />

          <Button size="md" class="w-full sm:w-fit ml-auto">Send Email</Button>
        </form>
      </div>
    </Modal>

    <FloatingButton title="Send Email" @click="showModal = true">
      <i class="mdi mdi-email-edit" />
    </FloatingButton>
  </div>
</template>

<script setup lang="ts">
import TextField from "@/components/TextField";
import TextArea from "@/components/TextArea";
import FloatingButton from "@/components/FloatingButton";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { ref } from "vue";

const showModal = ref(false);
</script>

<style scoped></style>
