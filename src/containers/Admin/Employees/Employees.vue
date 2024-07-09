<template>
  <!-- Heading -->
  <h4 class="text-xl sm:text-3xl font-bold sm:font-medium w-max">
    Employees List
  </h4>

  <!-- Form -->
  <form class="flex flex-col sm:flex-row gap-4 my-6">
    <TextField
      v-model="searchValue"
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
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(employee, idx) in filteredEmployee"
          :key="idx"
          class="bg-white border-b"
        >
          <td class="p-3">
            <p class="text-sm font-medium text-gray-500">
              {{ employee.email }}
            </p>
          </td>
          <td class="p-3">
            <p class="text-sm font-medium text-gray-500">
              {{ employee.fullName }}
            </p>
          </td>
          <td class="p-3">
            <p class="text-sm font-medium text-gray-500">
              {{ employee.contactNumber }}
            </p>
          </td>
          <td class="p-3">
            <p class="text-sm font-medium text-gray-500">
              {{ employee.emergencyContactNumber }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import TextField from "@/components/TextField";
import { computed, onBeforeMount, ref } from "vue";
import { useEmployeeStore } from "@/store/employeeStore";
import { AdminMemberEmployeeFormDataType } from "@/types/onboarding";

const employeeData = ref<AdminMemberEmployeeFormDataType[]>([]);
const employeeStore = useEmployeeStore();
const searchValue = ref("");

onBeforeMount(async () => {
  const resp = await employeeStore.getAdminEmployees();
  employeeData.value = resp;
});

const filteredEmployee = computed(() => {
  return employeeData.value.filter((employee) =>
    employee.fullName.toLowerCase().includes(searchValue.value.toLowerCase())
  );
});
</script>

<style scoped>
.table-container {
  @media (width < 1024px) {
    width: calc(100dvw - 48px);
  }
}
</style>
