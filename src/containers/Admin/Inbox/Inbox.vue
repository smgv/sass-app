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
        v-model="searchValue"
        label="Search"
        placeholder="Search by email"
        class="w-full"
        icon="magnify"
      />
    </form>

    <div class="flex flex-col gap-4 h-[calc(100dvh_-_290px)] overflow-y-auto">
      <div
        v-for="(inbox, idx) in filteredInboxList"
        :key="idx"
        class="flex flex-row gap-4 items-center justify-between bg-gray-200 px-6 py-3 rounded-xl"
      >
        <div class="w-full">
          <p class="truncate max-sm:w-[150px]">
            <span class="font-semibold">To:</span>{{ inbox.to }}
          </p>
          <p class="truncate max-sm:w-[200px]">
            <span class="font-semibold">Subject:</span>
            {{ inbox.subject }}
          </p>
        </div>
        <div class="flex items-center justify-between gap-4">
          <Button
            variant="outlined"
            class="!w-max"
            @click="() => handleEdit(inbox)"
            >Edit</Button
          >
          <!-- <Button class="!w-max">Send Email</Button> -->
        </div>
      </div>
    </div>

    <Modal :open="showModal" @close-modal="showModal = false">
      <div class="flex flex-col gap-6">
        <h4 class="text-xl font-bold sm:font-medium w-max">Email</h4>

        <!-- Form -->
        <form class="flex flex-col gap-4">
          <!-- <div class="flex items-center gap-6">
            <div class="flex items-center gap-3 text-left">
              <label class="text-base capitalize text-gray-500">
                To All Members
              </label>
              <input
                type="checkbox"
                class="form-checkbox rounded-md"
                :checked="InboxFormData.allMembers"
              />
            </div>
            <div class="flex items-center gap-3 text-left">
              <label class="text-base capitalize text-gray-500">
                To All Employees
              </label>
              <input
                type="checkbox"
                class="form-checkbox rounded-md"
                :checked="InboxFormData.allEmployees"
              />
            </div>
          </div> -->

          <TextField
            v-model="InboxFormData.to"
            label="To"
            placeholder="Email to"
            class="w-full"
            :error="v$.to?.$error"
            :helper-text="v$.to?.$error ? (v$.to?.$errors[0]?.$message as string) : ''"
          />
          <TextField
            v-model="InboxFormData.subject"
            label="Subject"
            class="w-full"
            :error="v$.subject?.$error"
            :helper-text="v$.subject?.$error ? (v$.subject?.$errors[0]?.$message as string) : ''"
          />
          <TextArea
            v-model="InboxFormData.body"
            label="Message"
            :error="v$.body?.$error"
            :helper-text="v$.body?.$error ? (v$.body?.$errors[0]?.$message as string) : ''"
          />

          <Button
            size="md"
            class="w-full sm:w-fit ml-auto"
            @click.prevent="sendEmail"
            :loading="loading"
            >Send Email</Button
          >
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
import { computed, onBeforeMount, ref } from "vue";
import useValidate from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import { INBOX_FORM_INITIAL_STATE } from "@/constants/inbox";
import { InboxFormType, InboxListType } from "@/types/inbox";
import { useInboxStore } from "@/store/inboxStore";

const loading = ref(false);
const showModal = ref(false);
const InboxFormData = ref<InboxFormType>({ ...INBOX_FORM_INITIAL_STATE });

const inboxStore = useInboxStore();
const inboxList = ref<InboxListType[]>(inboxStore.inboxList);
const searchValue = ref("");

const rules = {
  to: {
    valid: helpers.withMessage("Please enter valid emails", (value: string) => {
      return value !== "";
    }),
  },
  subject: {
    valid: helpers.withMessage(
      "Please enter valid subject",
      (value: string) => {
        return value !== "";
      }
    ),
  },
  body: {
    valid: helpers.withMessage("Please enter valid body", (value: string) => {
      return value !== "";
    }),
  },
};

const v$ = useValidate(rules, InboxFormData, { $stopPropagation: true });

onBeforeMount(async () => {
  const res = await inboxStore.getInboxList();
  if (res) {
    inboxList.value = res;
  }
});

const sendEmail = async () => {
  try {
    loading.value = true;
    console.log("Send Email");
    const isValid = await v$.value.$validate();
    if (!isValid) return;

    console.log("Email Handle Form", InboxFormData.value);

    const response = await inboxStore.postInbox(InboxFormData.value);
    if (response) {
      showModal.value = false;
      InboxFormData.value = { ...INBOX_FORM_INITIAL_STATE };
      v$.value.$reset();
      const res = await inboxStore.getInboxList();
      if (res) {
        inboxList.value = inboxStore.inboxList;
      }
    }
  } catch (error) {
    console.error("Email Handle Form", InboxFormData.value, error);
  } finally {
    loading.value = false;
  }
};

const handleEdit = (data: InboxListType) => {
  InboxFormData.value = { ...data };
  showModal.value = true;
};

const filteredInboxList = computed(() => {
  if (!searchValue.value) return inboxList.value;
  return inboxList.value.filter((inbox) => {
    return inbox.to.toLowerCase().includes(searchValue.value.toLowerCase());
  });
});
</script>

<style scoped></style>
