<template>
  <div>
    <!-- Heading -->
    <h4 class="text-xl sm:text-3xl font-bold sm:font-medium w-max">
      Your Invite's
    </h4>

    <!-- Form -->
    <form class="flex flex-col sm:flex-row gap-4 my-6">
      <Select
        v-model="typeSearch"
        label="Filter by type"
        :options="[
          { name: 'All', value: 'all' },
          { name: 'Employee', value: 'Employee' },
          { name: 'Member', value: 'Member' },
        ]"
        class="w-full"
        :required="false"
      />
      <Select
        v-model="classTypeSearch"
        label="Filter by class type"
        :options="[
          { name: 'All', value: 'all' },
          { name: 'Regular Class', value: 'Regular Class' },
          { name: 'Personal Training', value: 'Personal Training' },
        ]"
        class="w-full"
        :required="false"
      />
      <Select
        v-model="statusSearch"
        label="Filter by onboarding status"
        :options="[
          { name: 'All', value: 'all' },
          { name: 'OnBoarded', value: 'OnBoarded' },
          { name: 'Pending', value: 'Pending' },
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
            <!-- <th scope="col" class="p-4 text-gray-500">Assigned Coach</th> -->
            <th scope="col" class="p-4 text-gray-500">Onboarding Status</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(invite, idx) in inviteListFiltered"
            :key="idx"
            class="bg-white border-b"
          >
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">
                {{ invite.email }}
              </p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">{{ invite.type }}</p>
            </td>
            <td class="p-3">
              <p class="text-sm font-medium text-gray-500">
                {{ invite.type === "Member" ? invite.classType : "-" }}
              </p>
            </td>
            <!-- <td class="p-3">
              <p class="text-sm font-medium text-gray-500">Coach 1</p>
            </td> -->
            <td class="p-3">
              <div
                :class="[
                  'text-sm font-semibold w-fit px-3 py-1 rounded-xl capitalize',
                  invite.status === 'Pending'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800',
                ]"
              >
                {{ invite.status }}
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
              v-model="InviteFormData.email"
              :error="v$.email?.$error"
              :helper-text="v$.email?.$error ? (v$.email?.$errors[0]?.$message as string) : ''"
            />
            <Select
              label="Type"
              placeholder="Select Type"
              :options="[
                { name: 'Employee', value: 'Employee' },
                { name: 'Member', value: 'Member' },
              ]"
              class="w-full"
              v-model="InviteFormData.type"
              :error="v$.type?.$error"
              :helper-text="v$.type?.$error ? (v$.type?.$errors[0]?.$message as string) : ''"
            />
          </div>
          <div
            v-if="InviteFormData.type === 'Member'"
            class="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <Select
              label="Class Type"
              placeholder="Select Class Type"
              :options="[
                { name: 'Regular Class', value: 'Regular Class' },
                { name: 'Personal Training', value: 'Personal Training' },
              ]"
              class="w-full"
              v-model="InviteFormData.classType"
              :error="v$.classType?.$error"
              :helper-text="v$.classType?.$error ? (v$.classType?.$errors[0]?.$message as string) : ''"
            />
          </div>
          <Button
            size="md"
            class="w-full sm:w-fit ml-auto"
            @click.prevent="handleInvite"
            :loading="loading"
            >Send Invite</Button
          >
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
import { computed, onBeforeMount, ref } from "vue";
import { INVITE_FORM_INITIAL_STATE } from "@/constants/invite";
import { InviteFormType, InviteListType } from "@/types/invite";
import useValidate from "@vuelidate/core";
import { email, helpers } from "@vuelidate/validators";
import { useInviteStore } from "@/store/inviteStore";

const showModal = ref(false);
const loading = ref(false);

const InviteFormData = ref<InviteFormType>({ ...INVITE_FORM_INITIAL_STATE });
const inviteStore = useInviteStore();
const inviteList = ref<InviteListType[]>(inviteStore.inviteList);
const statusSearch = ref("all");
const typeSearch = ref("all");
const classTypeSearch = ref("all");

onBeforeMount(async () => {
  const res = await inviteStore.getInviteList();
  if (res) {
    inviteList.value = res;
  }
});

const rules = {
  email: {
    valid: helpers.withMessage(
      "Please enter your email id",
      (value: string) => {
        return value !== "";
      }
    ),
    email,
  },
  type: {
    valid: helpers.withMessage(
      "Please select type of employee/member",
      (value: string) => {
        return value !== "";
      }
    ),
  },
  classType: {
    valid: helpers.withMessage("Please select class type", (value: string) => {
      if (InviteFormData.value.type === "Employee") {
        return true;
      }
      return value !== "";
    }),
  },
};

const v$ = useValidate(rules, InviteFormData, { $stopPropagation: true });

const handleInvite = async () => {
  try {
    const isValid = await v$.value.$validate();
    if (!isValid) return;

    loading.value = true;

    console.log("Invite Form Data", InviteFormData.value);
    const response = await inviteStore.postInvite({
      ...InviteFormData.value,
      classType:
        InviteFormData.value.type === "Employee"
          ? "N/A"
          : InviteFormData.value.classType,
    });

    if (response) {
      showModal.value = false;
      InviteFormData.value = { ...INVITE_FORM_INITIAL_STATE };
      v$.value.$reset();
      const res = await inviteStore.getInviteList();
      if (res) {
        inviteList.value = inviteStore.inviteList;
      }
    }
  } catch (error) {
    console.error("Invite Form Error", error);
  } finally {
    loading.value = false;
  }
};

const inviteListFiltered = computed(() => {
  return inviteList.value.filter((invite) => {
    if (
      statusSearch.value === "all" &&
      typeSearch.value === "all" &&
      classTypeSearch.value === "all"
    ) {
      return inviteList.value;
    }
    console.log(
      invite,
      statusSearch.value,
      typeSearch.value,
      classTypeSearch.value
    );
    return (
      invite.status === statusSearch.value ||
      invite.type === typeSearch.value ||
      invite.classType === classTypeSearch.value
    );
  });
});
</script>

<style scoped>
.table-container {
  @media (width < 1024px) {
    width: calc(100dvw - 48px);
  }
}
</style>
