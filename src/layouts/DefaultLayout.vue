<script lang="ts" setup>
import HeaderNav from "@/components/HeaderNav.vue";
</script>

<template>
  <main>
    <HeaderNav />
    <RouterView />
  </main>
</template>

<style scoped>
@reference 'tailwindcss';
</style>
