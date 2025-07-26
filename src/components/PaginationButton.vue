<script lang="ts" setup>
import { computed } from "vue";
import { useJobStore } from "../stores/jobStore";

const jobStore = useJobStore();

const paginationButtons = computed(() => {
  const buttons = [];
  const total = jobStore.totalPages;
  let start = Math.max(1, jobStore.currentPage - 1);
  let end = Math.min(total, jobStore.currentPage + 2);

  if (end - start < 4) {
    if (start === 1) {
      end = Math.min(5, total);
    } else if (end === total) {
      start = Math.max(1, total - 4);
    }
  }

  for (let i = start; i <= end; i++) {
    buttons.push(i);
  }

  return buttons;
});
</script>

<template>
  <div v-if="jobStore.totalPages > 0 && !jobStore.loading" class="pagination">
    <button
      :disabled="jobStore.currentPage === 1"
      @click="jobStore.setPage(jobStore.currentPage - 1)"
    >
      <
    </button>
    <button
      v-for="page in paginationButtons"
      :class="{ active: jobStore.currentPage === page }"
      :key="page"
      @click="jobStore.setPage(page)"
    >
      {{ page }}
    </button>
    <button
      :disabled="jobStore.currentPage === jobStore.totalPages"
      @click="jobStore.setPage(jobStore.currentPage + 1)"
    >
      >
    </button>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

.pagination {
  @apply my-12 flex justify-center gap-2;
}

.pagination button {
  @apply bg-white text-[#111111] font-medium border border-[rgba(17,17,17,0.1)] rounded-sm py-1.5 px-3.5 md:py-2 md:px-4 cursor-pointer;
}

.pagination button.active {
  @apply bg-[#3575E2] text-white;
}

.pagination button:disabled {
  @apply cursor-not-allowed opacity-50;
}
</style>
