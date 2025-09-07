<script lang="ts" setup></script>

<template>
  <!-- Job card skeletons -->
  <div
    v-for="(_, i) in 6"
    :key="i"
    class="skeleton-card md:flex bg-white p-4 md:p-6 border border-black/10 rounded-md shadow-sm"
  >
    <div class="skeleton-icon md:mr-6"></div>
    <div class="flex-1 space-y-3 mt-2 md:mt-0">
      <div class="skeleton-line w-1/3"></div>
      <div class="skeleton-line w-2/3"></div>
      <div class="flex gap-2">
        <div class="skeleton-badge w-16"></div>
        <div class="skeleton-badge w-20"></div>
        <div class="skeleton-badge w-24"></div>
      </div>
      <div class="skeleton-line w-full h-3"></div>
      <div class="skeleton-line w-3/4 h-3"></div>
    </div>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

/* 🔹 Fade out when jobs load */
@keyframes fadeOut {
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
.animate-fadeOut {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* 🔹 Shimmer effect */
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
}

.skeleton-card {
  @apply flex gap-4;
}

.skeleton-icon,
.skeleton-line,
.skeleton-badge,
.skeleton-page-btn {
  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
  background-size: 400% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-icon {
  @apply h-[72px] w-[72px] rounded-md;
}

.skeleton-line {
  @apply h-4 rounded;
}

.skeleton-badge {
  @apply h-5 rounded;
}
</style>
