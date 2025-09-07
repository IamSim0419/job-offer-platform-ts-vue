<script lang="ts" setup>
import { onMounted } from "vue";
import { useJobStore } from "../stores/jobStore";
import PaginationButton from "./PaginationButton.vue";
import SkeletonCard from "./SkeletonCard.vue";

const jobStore = useJobStore();

onMounted(() => {
  jobStore.fetchJobs();
});
</script>

<template>
  <!-- Loading state -->
  <div v-if="jobStore.loading" class="skeleton">
    <SkeletonCard v-for="i in 6" :key="i" />
  </div>

  <!-- No jobs -->
  <div v-else-if="jobStore.paginatedJobs.length === 0" class="no-result">
    No jobs found matching your search criteria.
  </div>

  <!-- Jobs list with animation -->
  <div v-else class="job-cards">
    <TransitionGroup
      name="scale-up"
      tag="div"
      class="flex flex-col gap-4"
      appear
    >
      <div
        v-for="(job, index) in jobStore.paginatedJobs"
        :key="job.id || index"
        class="job-card transition-transform duration-200 hover:scale-[0.99] hover:shadow-md"
        :style="{ transitionDelay: `${index * 0.12}s` }"
      >
        <h4 class="hidden">{{ job.company }}</h4>
        <img :src="job.image" alt="Job image" class="company-icon" />

        <div class="content">
          <RouterLink to="/sign-up">
            <div class="job-title">
              <h4>{{ job.company }}</h4>
              <div class="tag">
                <h3>{{ job.title }}</h3>
                <span v-if="parseFloat(job.date) === 29" class="new-job-tag">
                  New post
                </span>
              </div>
            </div>
          </RouterLink>

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
            <span class="type">
              <img class="detail-icon" src="../assets/icons/Clock.svg" alt="" />
              <small>{{ job.type }}</small>
            </span>
            <span class="bullet-icon">&bullet;</span>
            <span class="job-salary">
              <img
                class="detail-icon"
                src="../assets/icons/CurrencyDollar.svg"
                alt=""
              />
              <small>{{ job.salary.annually }}</small>
            </span>
            <span class="bullet-icon">&bullet;</span>
            <span class="date">
              <img
                class="detail-icon"
                src="../assets/icons/CalendarBlank.svg"
                alt=""
              />
              <small>{{ job.date }}</small>
            </span>
          </div>
          <p class="description">{{ job.description }}</p>
        </div>
      </div>
    </TransitionGroup>
  </div>

  <!-- Pagination -->
  <PaginationButton />
</template>

<style scoped>
@reference 'tailwindcss';

.job-card {
  @apply md:flex bg-white p-4 md:p-6 border border-black/10 rounded-md shadow-sm
         transition-transform  duration-200;
}

/* Hover = instant */
.job-card:hover {
  @apply scale-[0.99] shadow-md;
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

.job-title h3 {
  @apply cursor-pointer;
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
  @apply text-[10px] text-[rgba(20,20,20,0.7)];
}

.job-details .detail-icon {
  @apply w-4;
}

.skeleton {
  @apply flex flex-col gap-4 mb-8;
}

.no-result {
  @apply text-center my-40;
}

/* =========================
   Scale-up Animation
   ========================= */
.scale-up-enter-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.scale-up-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.scale-up-enter-to {
  opacity: 1;
  transform: scale(1);
}

.scale-up-leave-active {
  transition: all 0.3s ease-in;
  position: absolute;
}

.scale-up-leave-from {
  opacity: 1;
  transform: scale(1);
}

.scale-up-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
