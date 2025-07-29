<script lang="ts" setup>
import { RouterLink } from "vue-router";
import ButtonCom from "@/components/ButtonCom.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Icon } from "@iconify/vue";

const isOpen = ref(false);
const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1024; // lg breakpoint
  if (!isMobile.value) {
    isOpen.value = false; // Close menu when resizing to desktop
  }
};

// when component rendered on the screen, onMounted calls
onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

//
onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);
});

const navLinks = [
  { name: "Start a search", href: "/" },
  { name: "Jobs list", href: "/sign-up" },
  { name: "Salary estimate", href: "/sign-up" },
  { name: "Pricing", href: "/sign-up" },
];
</script>

<template>
  <header>
    <div class="container-header">
      <!-- Logo -->
      <RouterLink to="/">
        <div class="logo">
          <img src="/src/assets/logo.svg" alt="JobSpots Logo" />
          <span>JobSpots</span>
        </div>
      </RouterLink>

      <!-- Desktop navigation -->
      <nav class="desktop-nav">
        <ul>
          <li v-for="link in navLinks" :key="link.name">
            <RouterLink :to="link.href">
              {{ link.name }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- Desktop Buttons -->
      <div class="desktop-btn">
        <div class="login-signup-btn">
          <ButtonCom variant="secondary" size="md" outlined>
            <RouterLink to="/login">Login</RouterLink>
          </ButtonCom>
          <ButtonCom variant="primary" size="md">
            <RouterLink to="/sign-up">Sign up</RouterLink>
          </ButtonCom>
        </div>

        <button
          v-show="isMobile"
          type="button"
          @click="isOpen = !isOpen"
          class="hamburger"
          aria-label="Toggle menu"
          :aria-expanded="isOpen"
        >
          <Icon
            :icon="
              isOpen
                ? 'material-symbols:close-rounded'
                : 'material-symbols:menu'
            "
            class="hamburger-icon"
          />
        </button>
      </div>
    </div>

    <!-- Mobile navigation - Only visible on mobile when isOpen is true -->
    <div v-if="isMobile">
      <nav v-show="isOpen" class="mobile-nav">
        <ul class="menu-list">
          <li v-for="link in navLinks" :key="link.name">
            <RouterLink :to="link.href" @click="isOpen = false">
              {{ link.name }}
            </RouterLink>
          </li>
        </ul>
        <div class="mobile-menu-btn">
          <ButtonCom variant="secondary" outlined>
            <RouterLink to="/login" @click="isOpen = false"> Login </RouterLink>
          </ButtonCom>
          <ButtonCom>
            <RouterLink to="/sign-up" @click="isOpen = false">
              Sign up
            </RouterLink>
          </ButtonCom>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
@reference 'tailwindcss';

header {
  @apply w-full bg-white py-3 px-4 md:px-8;
}

.container-header {
  @apply max-w-[1312px] mx-auto flex items-center justify-between;
}

.logo {
  @apply flex items-center text-[1.5rem] gap-x-2.5;
}

/* Desktop Navigation */
.desktop-nav {
  @apply hidden lg:block;
}

.desktop-nav ul {
  @apply flex gap-12;
}

.desktop-nav a {
  @apply text-black hover:text-gray-800 transition-colors;
}

.desktop-btn {
  @apply flex items-center gap-4;
}

.login-signup-btn {
  @apply hidden md:flex gap-4;
}

/* Mobile Navigation */
.mobile-nav {
  @apply bg-white w-full mt-8 mb-5 text-center;
}

.menu-list {
  @apply flex flex-col font-medium;
}

.mobile-nav a {
  @apply block w-full py-3 text-xl text-gray-700 hover:bg-gray-200 transition-colors;
}

.menu-item.router-link-active {
  @apply text-gray-900 font-semibold bg-gray-300;
}

.mobile-menu-btn {
  @apply flex flex-col pt-10 md:flex-row md:hidden gap-2.5;
}

/* Hamburger button */
.hamburger {
  @apply text-gray-700 hover:text-gray-800 focus:outline-none cursor-pointer;
}

.hamburger-icon {
  @apply w-8 h-8 md:w-10 md:h-10;
}
</style>
