<template>
  <aside class="flex flex-col w-[250px] bg-primary-900 text-white p-6">
    <p class="text-xl font-normal">SASS APP</p>
    <div class="h-0.5 w-full bg-gold my-6" />
    <ul class="flex flex-grow flex-col gap-5 text-lg">
      <li v-for="(item, index) in adminNavItems" :key="index">
        <router-link
          v-slot="{ navigate }"
          :to="getRoute(item.to)"
          :aria-label="`link to ${item.title}`"
        >
          <a
            aria-hidden
            @click="handleNavigation(navigate)"
            :class="[
              'flex gap-2 items-center cursor-pointer hover:text-gold flex-1',
              { 'text-gold': route.name && route.name === item.routeName },
            ]"
          >
            <i :class="[`mdi mdi-${item.icon} text-2xl`]" />
            <p>{{ item.title }}</p></a
          >
        </router-link>
      </li>
    </ul>
    <ul class="text-lg">
      <li class="flex gap-2 items-center cursor-pointer hover:text-gold">
        <i class="mdi mdi-logout text-2xl" />
        <p>Logout</p>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const adminNavItems = [
  { title: "Home", icon: "home", routeName: "home", to: "home" },
  { title: "Invite", icon: "at", routeName: "invite", to: "invite" },
  {
    title: "Notifications",
    icon: "bell-badge",
    routeName: "notifications",
    to: "notifications",
  },
  {
    title: "Members",
    icon: "account-multiple",
    routeName: "members",
    to: "members",
  },
  {
    title: "Employees",
    icon: "account-tie",
    routeName: "employees",
    to: "employees",
  },
  { title: "Account", icon: "account", routeName: "account", to: "account" },
];

const getRoute = (name: string) => {
  return `/admin/${name}`;
};
const handleNavigation = (navigate: () => void) => {
  navigate();
};
</script>

<style scoped></style>
