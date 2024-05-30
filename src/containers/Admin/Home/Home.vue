<template>
  <div class="w-full">
    <!-- Heading -->
    <h4 class="text-xl sm:text-3xl font-bold sm:font-medium w-max">
      Welcome, {{ adminName }}
    </h4>

    <!-- Data Cards -->
    <div
      class="flex flex-col sm:flex-row items-stretch justify-between gap-8 my-6 border-b border-gray-300 pb-6"
    >
      <div
        class="p-6 bg-gray-300 rounded-3xl text-black flex flex-col items-center justify-center gap-3 w-full shadow-lg"
      >
        <p class="text-2xl font-bold">No. of employees</p>
        <div
          class="text-2xl font-semibold gap-3 text-center flex items-center justify-center"
        >
          <i class="mdi mdi-account-multiple text-3xl" />
          <p>{{ noOfEmployees }}</p>
        </div>
      </div>
      <div
        class="p-6 bg-gray-300 rounded-3xl text-black flex flex-col items-center justify-center gap-4 w-full shadow-lg"
      >
        <p class="text-2xl font-bold">No. of members</p>
        <div
          class="text-2xl font-semibold gap-3 text-center flex items-center justify-center"
        >
          <i class="mdi mdi-account-group text-3xl" />
          <p>{{ noOfMembers }}</p>
        </div>
      </div>
    </div>

    <!-- Table Heading and CTA -->
    <div class="flex items-center justify-between pb-6">
      <h4 class="text-xl font-bold text-black">Time Table</h4>
      <div class="flex items-center gap-2">
        <Button class="!w-fit">Edit <i class="mdi mdi-pencil" /></Button>
        <Button variant="outlined" class="!w-fit"
          >Print <i class="mdi mdi-printer"
        /></Button>
      </div>
    </div>

    <!-- Table -->
    <div class="relative w-full max-lg:overflow-x-auto table-container">
      <table class="!w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-base font-medium capitalize bg-gray-50 border-y border-gray-200"
        >
          <tr>
            <th scope="col" class="p-4 text-gray-500">Time Slot</th>
            <th scope="col" class="p-4 text-gray-500">Monday</th>
            <th scope="col" class="p-4 text-gray-500">Tuesday</th>
            <th scope="col" class="p-4 text-gray-500">Wednesday</th>
            <th scope="col" class="p-4 text-gray-500">Thursday</th>
            <th scope="col" class="p-4 text-gray-500">Friday</th>
            <th scope="col" class="p-4 text-gray-500">Saturday</th>
            <th scope="col" class="p-4 text-gray-500">Sunday</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b">
            <td class="p-3">
              <div
                class="text-sm font-medium text-gray-500 flex items-center gap-2 w-max"
              >
                <i
                  class="mdi mdi-white-balance-sunny text-orange-300 text-xl"
                />
                <p>6:00 AM to 7:00 AM</p>
              </div>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
          </tr>
          <tr class="bg-white border-b">
            <td class="p-3">
              <div
                class="text-sm font-medium text-gray-500 flex items-center gap-2"
              >
                <i
                  class="mdi mdi-white-balance-sunny text-orange-300 text-xl"
                />
                <p>7:00 AM to 8:00 AM</p>
              </div>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
          </tr>
          <tr class="bg-white border-b">
            <td class="p-3">
              <div
                class="text-sm font-medium text-gray-500 flex items-center gap-2"
              >
                <i
                  class="mdi mdi-white-balance-sunny text-orange-300 text-xl"
                />
                <p>8:00 AM to 9:00 AM</p>
              </div>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
          </tr>
          <tr class="bg-white border-b">
            <td class="p-5">
              <p class="text-sm font-medium text-gray-500"></p>
            </td>
            <td class="p-5">
              <p class="text-sm font-medium text-gray-500"></p>
            </td>
            <td class="p-5">
              <p class="text-sm font-medium text-gray-500"></p>
            </td>
            <td class="p-5">
              <p class="text-sm font-medium text-gray-500"></p>
            </td>
            <td class="p-5">
              <p class="text-sm font-medium text-gray-500"></p>
            </td>
            <td class="p-5">
              <p class="text-sm font-medium text-gray-500"></p>
            </td>
            <td class="p-5">
              <p class="text-sm font-medium text-gray-500"></p>
            </td>
            <td class="p-6">
              <p class="text-sm font-medium text-gray-500"></p>
            </td>
          </tr>
          <tr class="bg-white border-b">
            <td class="p-3">
              <div
                class="text-sm font-medium text-gray-500 flex items-center gap-2"
              >
                <i class="mdi mdi-moon-full text-gray-600 text-xl" />
                <p>6:00 PM to 7:00 PM</p>
              </div>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
          </tr>
          <tr class="bg-white border-b">
            <td class="p-3">
              <div
                class="text-sm font-medium text-gray-500 flex items-center gap-2"
              >
                <i class="mdi mdi-moon-full text-gray-600 text-xl" />
                <p>7:00 PM to 8:00 PM</p>
              </div>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
          </tr>
          <tr class="bg-white border-b">
            <td class="p-3">
              <div
                class="text-sm font-medium text-gray-500 flex items-center gap-2"
              >
                <i class="mdi mdi-moon-full text-gray-600 text-xl" />
                <p>8:00 PM to 9:00 PM</p>
              </div>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">1</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button";
import { useAdminStore } from "@/store/adminStore";
import { useAuthStore } from "@/store/authStore";
import { onMounted, ref } from "vue";

const authStore = useAuthStore();
const { userAuth } = authStore;
const adminStore = useAdminStore();

const adminName = ref("");
const noOfEmployees = ref(0);
const noOfMembers = ref(0);

onMounted(async () => {
  try {
    console.log(adminStore.adminOnboardingDetails);
    adminName.value =
      adminStore.adminOnboardingDetails?.name || userAuth?.email || "";
  } catch (error) {}
});
</script>

<style scoped>
.table-container {
  @media (width < 1024px) {
    width: calc(100dvw - 48px);
  }
}
</style>
