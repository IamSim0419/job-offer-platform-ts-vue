<script lang="ts" setup>
import { onMounted } from "vue";
import { useJobStore } from "../stores/jobStore";
import PaginationButton from "./PaginationButton.vue";
import { Icon } from "@iconify/vue";

const jobStore = useJobStore();

onMounted(() => {
  jobStore.fetchJobs();
});
</script>

<template>
  <div v-if="jobStore.loading" class="job-list">
    <div class="loading">
      <Icon icon="material-symbols:clock-loader-60-sharp" />
    </div>
  </div>

  <div v-else-if="jobStore.paginatedJobs.length === 0" class="no-result">
    No jobs found matching your search criteria.
  </div>

  <div else class="job-cards">
    <div
      v-for="(job, index) in jobStore.paginatedJobs"
      :key="index"
      class="job-card"
    >
      <h4 class="hidden">{{ job.company }} {{ job.id }}</h4>
      <img :src="job.image" alt="Job image" class="company-icon" />

      <div class="content">
        <div class="job-title">
          <h4>{{ job.company }} {{ job.id }}</h4>
          <div class="tag">
            <h3>{{ job.title }}</h3>
            <!-- ! Temporary new post if statement -->
            <span v-if="parseFloat(job.date) === 29" class="new-job-tag"
              >New post</span
            >
          </div>
        </div>

        <div class="job-details">
          <span class="location">
            <img
              class="detail-icon"
              src="../assets/icons/MapPinLine.svg"
              alt=""
            />
            <small>{{ job.location }}</small>
          </span>
          <span class="bullet-icon">&bullet;</span>
          <span class="type"
            ><img class="detail-icon" src="../assets/icons/Clock.svg" alt="" />
            <small>{{ job.type }}</small>
          </span>
          <span class="bullet-icon">&bullet;</span>
          <span class="job-salary"
            ><img
              class="detail-icon"
              src="../assets/icons/CurrencyDollar.svg"
              alt=""
            />
            <small>{{ job.salary.annually }}</small>
          </span>
          <span class="bullet-icon">&bullet;</span>
          <span class="date"
            ><img
              class="detail-icon"
              src="../assets/icons/CalendarBlank.svg"
              alt=""
            /><small>{{ job.date }}</small></span
          >
        </div>
        <p class="description">{{ job.description }}</p>
      </div>
    </div>

    <!-- <div
      v-show="(isOpenFilter = true)"
      class="bg-blue-500 inset-2 absolute opacity-50 z-50 lg:hidden"
    >
      <button
        class="text-5xl float-end cursor-pointer"
        @click="isOpenFilter = false"
      >
        X
      </button>
    </div> -->
  </div>

  <PaginationButton />
</template>

<style scoped>
@reference 'tailwindcss';

.job-cards {
  @apply flex flex-col gap-4;
}

.job-card {
  @apply md:flex bg-white p-4 md:p-6 border border-black/10 rounded-md shadow-sm cursor-pointer hover:scale-[0.99] hover:shadow-md transition-all;
}

.job-card .company-icon {
  @apply md:mr-6 h-[72px] md:w-[72px];
}

.content {
  @apply mt-2 md:mt-0;
}

.content h4 {
  @apply text-[18px] text-[#141414];
}

.content h3 {
  @apply text-xl md:text-2xl font-semibold text-[#141414] mt-1;
}

.content p {
  @apply text-black/70 mt-3;
}

.tag {
  @apply flex items-center gap-4;
}

.tag > span {
  @apply text-[#7D5AE2] font-medium text-[12px] bg-[rgba(124,90,226,0.1)] px-1.5 py-0.5 rounded-[3px];
}
.job-details {
  @apply text-sm md:text-base inline-flex items-center gap-1 mt-1.5 md:gap-2 lg:gap-5 text-[rgba(20,20,20,0.7)];
}

.job-details span {
  @apply flex items-center gap-1 md:gap-2;
}

.job-details .bullet-icon {
  @apply text-[10px]  text-[rgba(20,20,20,0.7)];
}

.job-details .detail-icon {
  @apply w-4;
}

.loading {
  @apply flex items-center justify-center h-64 animate-spin;
}

.no-result {
  @apply text-center my-40;
}
</style>
