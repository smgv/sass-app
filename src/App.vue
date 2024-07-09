<script setup lang="ts">
import Toast from "@/components/Toast";
import { onMounted, ref } from "vue";
import Loader from "@/components/Loader";
import { useAuthStore } from "./store/authStore";
import { useRouter, useRoute } from "vue-router";
import { ROUTES } from "./constants/routes";
import { useAdminStore } from "./store/adminStore";

const loading = ref(false);

const authStore = useAuthStore();
const adminStore = useAdminStore();
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  try {
    if (!route.meta.requiresAuth) {
      return;
    }

    console.log("fetching user data");
    const res = await authStore.getUser();
    if (!res) {
      return;
    }

    loading.value = true;
    if (authStore.isAuthenticated() && authStore.isUserOnBoarded()) {
      await adminStore.getAdminDetails(authStore?.userAuth?.onboardingId || "");
      router.push(ROUTES.ADMIN);
      return;
    }
    if (authStore.isAuthenticated()) {
      router.push(ROUTES.ADMIN_ONBOARDING);
      return;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div
    v-if="loading"
    class="h-screen flex flex-col items-center justify-center"
  >
    <Loader loading size="lg" />
    <p
      class="w-[80%] sm:w-[60%] mx-auto text-center mt-6 text-lg text-gray-600"
    >
      Please wait fetching user data.
    </p>
  </div>
  <router-view v-else />
  <Toast />
</template>
