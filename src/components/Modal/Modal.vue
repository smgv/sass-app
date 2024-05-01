<template>
  <div v-if="open" class="fixed z-50 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <div
        class="fixed inset-0 bg-black opacity-50"
        @click="emits('closeModal')"
      ></div>
      <div
        class="bg-white rounded-lg p-6 mx-auto z-10 relative w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%]"
      >
        <!-- Modal content here -->
        <button @click="emits('closeModal')" class="absolute top-0 right-0 m-4">
          <i class="mdi mdi-close text-3xl font-bold" />
        </button>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    open: boolean;
  }>(),
  {}
);

const emits = defineEmits(["closeModal"]);
</script>

<style scoped></style>
