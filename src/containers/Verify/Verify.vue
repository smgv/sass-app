<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <Loader loading size="lg" />
    <p
      class="w-[80%] sm:w-[60%] mx-auto text-center mt-6 text-lg text-gray-600"
    >
      Please wait verifying the user and redirecting to the login page.
    </p>
  </div>
</template>

<script setup lang="ts">
import Loader from "@/components/Loader";
</script>

<style scoped></style>
