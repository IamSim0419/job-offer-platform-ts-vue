<script lang="ts" setup>
import JobList from "@/components/JobList.vue";
import { useJobStore } from "../stores/jobStore";
import FilterLists from "./FilterLists.vue";
import JobSubscription from "./JobSubscription.vue";
import { ref } from "vue";

const jobStore = useJobStore();
const isOpenFilter = ref(false);

const sortOptions = [
  { value: null, label: "" },
  { value: "high-to-low", label: "High Salary" },
  { value: "low-to-high", label: "Low Salary" },
];
</script>

<template>
  <section>
    <div class="job-container">
      <!-- Desktop Filter -->
      <div class="max-w-[250px]">
        <FilterLists />
      </div>

      <!-- Filter -->
      <div class="filter-section">
        <!-- Mobile filter -->
        <div class="mobile-filter">
          <div class="filter-job">
            <img
              @click="isOpenFilter = true"
              class="filter-icon"
              src="@/assets/icons/Tune.svg"
              alt=""
            />
            <span class="jobs">{{ jobStore.jobs.length }} Jobs</span>
          </div>

          <!-- Sort Salary -->
          <div class="sort-filter">
            <img
              class="sort-icon"
              src="@/assets/icons/FunnelSimple.svg"
              alt=""
            />
            <span>Filter by</span>
            <select
              v-model="jobStore.sortBySalary"
              @change="jobStore.setSortBySalary(jobStore.sortBySalary)"
            >
              <option
                v-for="option in sortOptions"
                :value="option.value"
                :key="option.value as string"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Job lists -->
        <div class="job-lists relative" id="job-lists ">
          <JobList />

          <div
            v-if="isOpenFilter"
            class="bg-blue-500 -inset-2 absolute opacity-50 z-50 lg:hidden"
          >
            <button
              class="text-5xl float-end cursor-pointer"
              @click="isOpenFilter = false"
            >
              X
            </button>
          </div>
        </div>
      </div>

      <!-- Subscription -->
      <div class="lg:max-w-[250px]">
        <JobSubscription />
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference 'tailwindcss';

section {
  @apply py-12 px-4 md:px-8 overflow-x-hidden;
}

.job-container {
  @apply lg:flex md:gap-6 max-w-[1312px] mx-auto;
}

.filter-section {
  @apply w-full;
}

.mobile-filter {
  @apply flex items-center justify-between;
}

.sort-filter {
  @apply p-3;
}

.sort-filter .sort-icon {
  @apply w-4 md:w-6;
}

.sort-filter span {
  @apply text-sm md:text-base;
}

.sort-filter select {
  @apply text-sm md:text-base;
}

.filter-job {
  @apply flex items-center;
}

.filter-job img {
  @apply w-8 md:w-10 lg:hidden cursor-pointer;
}

.filter-job .jobs {
  @apply text-2xl md:text-3xl font-bold ml-2 md:ml-4 lg:ml-0;
}

.sort-filter {
  @apply flex items-center text-[1rem] p-1 md:px-2  gap-x-3 rounded-sm bg-white border border-[rgba(20,20,20,0.1)] cursor-pointer;
}

.job-lists {
  @apply mt-4;
}
</style>
