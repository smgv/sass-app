<template>
  <nav v-if="open" class="flex sm:hidden">
    <section
      class="fixed left-0 top-0 h-screen z-40 flex bg-primary-900 transition-transform"
    >
      <slot></slot>
    </section>
    <div
      aria-hidden
      :data-drawer-backdrop="true"
      :class="['backdrop-container']"
      @click="emits('onClose')"
    ></div>
  </nav>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    open?: boolean;
  }>(),
  {
    open: false,
  }
);

const emits = defineEmits<{
  (e: "onClose"): void;
}>();
</script>

<style scoped>
.backdrop-container {
  @apply bg-gray-500 opacity-50 fixed inset-0 z-30;
}
</style>
