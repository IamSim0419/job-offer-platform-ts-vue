<script lang="ts" setup>
import { useJobStore } from "../stores/jobStore";
import { ref } from "vue";

const jobStore = useJobStore();
const localSearchPosition = ref("");
const localSearchLocation = ref("");

function handleSearch() {
  jobStore.setSearchPosition(localSearchPosition.value.trim());
  jobStore.setSearchLocation(localSearchLocation.value.trim());
}
</script>

<template>
  <section>
    <div class="hero-blur-effect"></div>
    <div class="hero-grid"></div>
    <div class="hero-container">
      <div class="job-search">
        <h1>Find your <span>new job</span> today</h1>
        <p>
          Thousand of jobs in the computer, engineering and technology sectors
          are waiting for you.
        </p>

        <!-- Search -->
        <div class="search-container">
          <form class="search-form">
            <div class="job-group first-group">
              <img
                class="search-icon"
                src="@/assets/icons/MagnifyingGlass.svg"
                alt=""
              />
              <input
                v-model="localSearchPosition"
                type="text"
                placeholder="What position are you looking for?"
                required
              />
            </div>

            <div class="job-group second-group">
              <img
                class="search-icon"
                src="@/assets/icons/MapPinLine.svg"
                alt=""
              />
              <input
                v-model="localSearchLocation"
                type="text"
                placeholder="Location"
                required
              />
            </div>
          </form>
          <button @click="handleSearch" class="search-btn">Search job</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference 'tailwindcss';

section {
  @apply w-full bg-white py-20 px-4 z-0 md:px-8 relative overflow-hidden;
  perspective: 1000px;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.3),
    transparent
  );
}

.hero-blur-effect {
  @apply absolute h-200 w-200 top-0 -left-170 md:-left-110 lg:-left-20 bg-white rotate-90;
  filter: blur(50px);
}

/* Background grid */
.hero-grid {
  @apply absolute w-[1254.36px] h-[921.51px] -z-10;
  background-image: linear-gradient(
      to right,
      rgba(75, 74, 68, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgba(75, 74, 68, 0.1) 1px, transparent 1px);
  background-position: center;
  background-size: 100px 100px;
  transform: translate(348px, -181.84px) rotate(-30deg) skew(35deg);
}

.hero-container {
  @apply max-w-[1312px] mx-auto flex flex-col relative z-50;
}

.job-search h1 {
  @apply text-[3rem] md:text-[3.5rem] font-bold text-[#141414] leading-16 md:leading-none;
}

.job-search > h1 span {
  @apply text-[#3575E2];
}

.job-search p {
  @apply text-[1.1rem] opacity-70 mt-5;
}

/* Search Inputs */
.search-container {
  @apply mt-10 flex flex-col md:flex-row gap-4 md:gap-0;
}

.search-form {
  @apply flex flex-col md:flex-row border border-gray-300 overflow-hidden rounded-md md:rounded-r-none md:border-r-white flex-grow;
}

.search-form .search-icon {
  @apply w-5 lg:w-6 ml-3;
}

.job-group {
  @apply flex items-center bg-white border-b md:border-b-0 md:border-r border-gray-300;
}

.first-group {
  @apply md:flex-[53%];
}

.second-group {
  @apply md:flex-[30%];
}

.job-group input {
  @apply text-[#3575E2] w-full py-3 px-4 lg:px-5 lg:text-[20px] outline-none;
}

.job-group input::placeholder {
  @apply text-black/50;
}

.search-btn {
  @apply text-white bg-[#3575E2] px-[40px] py-[10px] cursor-pointer rounded-md md:rounded-none md:rounded-r-[6px];
  @apply w-full md:w-auto hover:bg-blue-500;
  @apply transition-colors duration-200;
}
</style>
