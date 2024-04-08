<template>
  <div class="text-primary-600">Auth Page</div>
  <Loader :loading="true" size="xs" />

  <Button>Hello World</Button>

  <TextField label="Email" placeholder="Email Id" />
</template>

<script setup lang="ts">
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
</script>

<style scoped></style>
