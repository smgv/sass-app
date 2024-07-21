<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <Loader loading size="lg" />
    <p
      class="w-[80%] sm:w-[60%] mx-auto text-center mt-6 text-lg text-gray-600"
    >
      Please wait verifying the user.
    </p>
  </div>
</template>

<script setup lang="ts">
import Loader from "@/components/Loader";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";
import { setItemInLocalStorage } from "@/utils/storage";
import { LOCAL_TOKEN } from "@/constants/auth";
import { ROUTES } from "../constants/routes";
import { useAdminStore } from "@/store/adminStore";

const authStore = useAuthStore();
const adminStore = useAdminStore();
const router = useRouter();

onMounted(async () => {
  const { query } = useRoute();
  const response: any = await authStore.redirectHandler(query.code);
  const { token, user } = response.data;
  setItemInLocalStorage(LOCAL_TOKEN, token);
  authStore.setUser(user);
  if (user.onboardingId) {
    await adminStore.getAdminDetails(user.onboardingId);
    router.push(ROUTES.ADMIN);
    return;
  } else {
    router.push(ROUTES.ADMIN_ONBOARDING);
    return;
  }
});
</script>

<style scoped></style>
