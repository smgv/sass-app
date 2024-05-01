<template>
  <div>
    <!-- Heading -->
    <h4 class="text-xl sm:text-3xl font-bold sm:font-medium w-max">
      Your Invite's
    </h4>

    <!-- Form -->
    <form class="flex flex-col sm:flex-row gap-4 my-6">
      <Select
        label="Filter by type"
        :options="[
          { name: 'Employee', value: 'employee' },
          { name: 'Member', value: 'member' },
        ]"
        class="w-full"
        :required="false"
      />
      <Select
        label="Filter by class type"
        :options="[
          { name: 'Regular Class', value: 'class' },
          { name: 'Personal Training', value: 'pt' },
        ]"
        class="w-full"
        :required="false"
      />
      <Select
        label="Filter by onboarding status"
        :options="[
          { name: 'All', value: 'all' },
          { name: 'Completed', value: 'completed' },
          { name: 'Pending', value: 'pending' },
        ]"
        class="w-full"
        :required="false"
      />
    </form>

    <!-- Table -->
    <div class="relative w-full max-lg:overflow-x-auto table-container">
      <table class="!w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-base font-medium capitalize bg-gray-50 border-y border-gray-200"
        >
          <tr>
            <th scope="col" class="p-4 text-gray-500">Email</th>
            <th scope="col" class="p-4 text-gray-500">Type</th>
            <th scope="col" class="p-4 text-gray-500">Class Type</th>
            <th scope="col" class="p-4 text-gray-500">Assigned Coach</th>
            <th scope="col" class="p-4 text-gray-500">Onboarding Status</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b">
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">
                example@domain.com
              </p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">Member</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">Personal Training</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">Coach 1</p>
            </td>
            <td class="p-3">
              <div
                class="text-sm font-semibold bg-green-100 text-green-800 w-fit px-3 py-1 rounded-xl capitalize"
              >
                Completed
              </div>
            </td>
          </tr>
          <tr class="bg-white border-b">
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">place@domain.com</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">Member</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">Class</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">-</p>
            </td>
            <td class="p-3">
              <div
                class="text-sm font-semibold bg-red-100 text-red-800 w-fit px-3 py-1 rounded-xl capitalize"
              >
                Pending
              </div>
            </td>
          </tr>
          <tr class="bg-white border-b">
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">emp@domain.com</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">Employee</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">-</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">-</p>
            </td>
            <td class="p-3">
              <div
                class="text-sm font-semibold bg-red-100 text-red-800 w-fit px-3 py-1 rounded-xl capitalize"
              >
                Pending
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal :open="showModal" @close-modal="showModal = false">
      <div class="flex flex-col gap-6">
        <h4 class="text-xl font-bold sm:font-medium w-max">
          Invite Employee and Members
        </h4>

        <!-- Form -->
        <form class="flex flex-col gap-4">
          <div
            class="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <TextField
              label="Email"
              placeholder="Enter Employee/Member Email Id"
              class="w-full"
            />
            <Select
              label="Type"
              :options="[
                { name: 'Employee', value: 'employee' },
                { name: 'Member', value: 'member' },
              ]"
              class="w-full"
            />
          </div>
          <div
            class="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <Select
              label="Class Type"
              :options="[
                { name: 'Regular Class', value: 'class' },
                { name: 'Personal Training', value: 'pt' },
              ]"
              class="w-full"
            />
            <Select
              label="Assign Coach"
              :options="[
                { name: 'Coach 1', value: 'coach1' },
                { name: 'Coach 2', value: 'coach2' },
              ]"
              class="w-full"
            />
          </div>
          <Button size="md" class="w-full sm:w-fit ml-auto">Send Invite</Button>
        </form>
      </div>
    </Modal>

    <FloatingButton title="Invite Member/Employee" @click="showModal = true">
      <i class="mdi mdi-account-plus" />
    </FloatingButton>
  </div>
</template>

<script setup lang="ts">
import Select from "@/components/Select";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import FloatingButton from "@/components/FloatingButton";
import Modal from "@/components/Modal";
import { ref } from "vue";

const showModal = ref(false);
</script>

<style scoped>
.table-container {
  @media (width < 1024px) {
    width: calc(100dvw - 48px);
  }
}
</style>
