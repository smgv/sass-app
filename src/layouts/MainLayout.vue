<template>
  <div class="h-screen w-full flex relative">
    <!-- Mobile View -->
    <Sidebar :open="openSidebar" @on-close="openSidebar = false">
      <SideNavbar
        @on-logout="logout()"
        @on-click="openSidebar = false"
      ></SideNavbar>
    </Sidebar>
    <!-- Desktop View -->
    <section class="hidden sm:flex sm:fixed sm:top-0 sm:left-0 sm:h-full">
      <SideNavbar @on-logout="logout()"></SideNavbar>
    </section>
    <main class="flex flex-col flex-1 sm:ml-[250px]">
      <nav
        class="h-16 bg-primary-900 px-6 py-3 flex sm:hidden items-center justify-between text-white fixed w-full z-10"
      >
        <p>GymSync</p>
        <i
          :class="[
            `mdi ${
              openSidebar ? 'mdi-close' : 'mdi-menu'
            } text-3xl cursor-pointer`,
          ]"
          @click="openSidebar = !openSidebar"
        />
      </nav>
      <section class="flex-grow p-6 w-full mt-16 sm:mt-0">
        <slot></slot>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import SideNavbar from "@/components/SideNavbar";
import Sidebar from "@/components/Sidebar";
import { useAuthStore } from "@/store/authStore";
import { ref } from "vue";

const openSidebar = ref(false);

const { logout } = useAuthStore();
</script>

<style scoped></style>
