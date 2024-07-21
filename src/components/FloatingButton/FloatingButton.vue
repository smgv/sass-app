<template>
  <button
    :title="title"
    class="appearance-none w-14 h-14 bg-primary-900 text-gold font-semibold text-3xl rounded-full flex items-center justify-center absolute bottom-5 right-5 drop-shadow-2xl shadow-2xl hover:bg-primary-800 hover:translate-y-0.5 hover:animate-bounce"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
  }>(),
  {}
);
</script>

<style lang="scss" scoped></style>
