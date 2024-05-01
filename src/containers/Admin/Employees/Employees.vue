<template>
  <!-- Heading -->
  <h4 class="text-xl sm:text-3xl font-bold sm:font-medium w-max">
    Employees List
  </h4>

  <!-- Form -->
  <form class="flex flex-col sm:flex-row gap-4 my-6">
    <TextField
      label="Search"
      placeholder="Search by name"
      class="w-full"
      icon="magnify"
    />
  </form>

  <!-- Table -->
  <div class="relative w-full max-lg:overflow-x-auto table-container my-6">
    <table class="!w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-base font-medium capitalize bg-gray-50 border-y border-gray-200"
      >
        <tr>
          <th scope="col" class="p-4 text-gray-500">Email</th>
          <th scope="col" class="p-4 text-gray-500">Name</th>
          <th scope="col" class="p-4 text-gray-500">Contact No.</th>
          <th scope="col" class="p-4 text-gray-500">Emergency Contact No.</th>
          <th scope="col" class="p-4 text-gray-500">Onboarding Status</th>
          <th scope="col" class="p-4 text-gray-500">View Details</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b">
          <td class="p-3">
            <p class="text-sm font-medium text-gray-500">example@domain.com</p>
          </td>
          <td class="p-3">
            <p class="text-sm font-medium text-gray-500">Employee</p>
          </td>
          <td class="p-3">
            <p class="text-sm font-medium text-gray-500">+91-912345678</p>
          </td>
          <td class="p-3">
            <p class="text-sm font-medium text-gray-500">+91-912345678</p>
          </td>
          <td class="p-3">
            <div
              class="text-sm font-semibold bg-green-100 text-green-800 w-fit px-3 py-1 rounded-xl capitalize"
            >
              Completed
            </div>
          </td>
          <td class="p-3">
            <button
              class="text-sm appearance-none font-semibold bg-gray-100 text-gray-800 w-fit px-3 py-1 rounded-xl capitalize"
            >
              <i class="mdi mdi-eye" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import TextField from "@/components/TextField";
</script>

<style scoped>
.table-container {
  @media (width < 1024px) {
    width: calc(100dvw - 48px);
  }
}
</style>
