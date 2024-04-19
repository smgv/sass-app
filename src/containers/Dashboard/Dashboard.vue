<template>
  <div class="h-screen w-full flex relative">
    <section
      class="hidden sm:flex flex-col w-[250px] bg-primary-900 text-white p-6"
    >
      <p>SASS APP</p>
    </section>
    <main class="flex flex-col flex-1">
      <nav
        class="h-16 bg-primary-900 px-6 py-3 flex sm:hidden items-center justify-between text-white"
      >
        <p>SASS APP</p>
        <i class="mdi mdi-menu text-3xl cursor-pointer" />
      </nav>
      <section class="flex-grow p-6">Container</section>
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
