<script lang="ts" setup>
import { useJobStore } from "../stores/jobStore";

const jobStore = useJobStore();

const locationOptions = [
  { value: "any", label: "Any Location" },
  { value: "near", label: "Near Me" },
  { value: "remote", label: "Remote Job" },
  { value: "exact", label: "Exact Location" },
  { value: "15km", label: "Within 15 km" },
  { value: "30km", label: "Within 30 km" },
  { value: "50km", label: "Within 50 km" },
];

const salaryOptions = {
  hourly: ["any", 20, 25, 35, 50, 60],
  monthly: ["any", 2000, 2500, 3500, 5000, 6000],
  annually: ["any", 20000, 25000, 35000, 50000, 60000],
};

const dateOptions = [
  { value: "all", label: "All Time" },
  { value: "24h", label: "Last 24 Hours" },
  { value: "3d", label: "Last 3 days" },
  { value: "7d", label: "Last 7 Days" },
];

const experienceOptions = [
  { value: "any", label: "Any Experience" },
  { value: "internship", label: "Internship" },
  { value: "remote", label: "Work Remotely" },
];

const employmentOptions = [
  { value: "full-time", label: "Full-time" },
  { value: "temporary", label: "Temporary" },
  { value: "part-time", label: "Part-time" },
];
</script>

<template>
  <div class="filter-container">
    <h3>Filter</h3>

    <!-- Location filter -->
    <div class="filter-section">
      <h4>Location</h4>
      <div
        v-for="option in locationOptions"
        :key="option.value"
        class="filter-option"
      >
        <input
          type="radio"
          :id="'location-' + option.value"
          :value="option.value"
          v-model="jobStore.locationFilter"
          @change="jobStore.setLocationFilter(option.value)"
        />
        <label :for="'location-' + option.value">{{ option.label }}</label>
      </div>
    </div>

    <!-- Salary filter -->
    <div class="filter-section">
      <h4>Salary</h4>
      <div class="salary-type-button">
        <button
          :class="{ active: jobStore.salaryFilterType === 'hourly' }"
          @click="jobStore.setSalaryFilterType('hourly')"
        >
          Hourly
        </button>

        <button
          :class="{ active: jobStore.salaryFilterType === 'monthly' }"
          @click="jobStore.setSalaryFilterType('monthly')"
        >
          Monthly
        </button>

        <button
          :class="{ active: jobStore.salaryFilterType === 'annually' }"
          @click="jobStore.setSalaryFilterType('annually')"
        >
          Annually
        </button>
      </div>
      <div>
        <div
          v-for="option in salaryOptions[jobStore.salaryFilterType]"
          :key="option"
          class="filter-option"
        >
          <input
            type="radio"
            :id="'salary-' + option"
            :value="option"
            v-model="jobStore.salaryFilterValue"
            @change="jobStore.setSalaryFilterValue(option)"
          />
          <label :for="'salary-' + option">> {{ option }}</label>
        </div>
      </div>
    </div>

    <!-- Date filter -->
    <div class="filter-section">
      <h4>Date of posting</h4>

      <div
        v-for="option in dateOptions"
        :key="option.value"
        class="filter-option"
      >
        <input
          type="radio"
          :id="'date-' + option.value"
          :value="option.value"
          v-model="jobStore.dateFilter"
          @change="jobStore.setDateFilter(option.value)"
        />
        <label :for="'date-' + option.value">{{ option.label }}</label>
      </div>
    </div>

    <!-- Experience filter -->
    <div class="filter-section">
      <h4>Work experience</h4>

      <div
        v-for="option in experienceOptions"
        :key="option.value"
        class="filter-option"
      >
        <input
          type="radio"
          :id="'experience-' + option.value"
          :value="option.value"
          v-model="jobStore.experienceFilter"
          @change="jobStore.setExperienceFilter(option.value)"
        />
        <label :for="'experience-' + option.value">{{ option.label }}</label>
      </div>
    </div>

    <!-- Employment Type filter -->
    <div class="filter-section">
      <h4>Type of employment</h4>
      <div
        v-for="option in employmentOptions"
        :key="option.value"
        class="filter-option"
      >
        <input
          type="checkbox"
          :id="'employment-' + option.value"
          :value="option.value"
          :checked="jobStore.employmentTypes.includes(option.value)"
          @change="jobStore.toggleEmploymentType(option.value)"
        />
        <label :for="'employment-' + option.value">{{ option.label }}</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

.filter-container {
  @apply hidden lg:flex flex-col gap-4  bg-white p-6 rounded-[8px] shadow-sm;
}

.filter-container h3 {
  @apply text-xl;
}

.filter-section h4 {
  @apply text-[18px] mb-3;
}

.salary-type-button {
  @apply flex rounded-sm mb-3;
}

.salary-type-button button {
  @apply text-[13px] grow p-2 border border-[#393F47] cursor-pointer;
}

.salary-type-button button.active {
  @apply text-[13px] text-[#3575E2] bg-[rgba(53,116,226,0.2)] border border-[#3575E2];
}

.filter-option {
  @apply flex items-center gap-2 mt-1;
}

.salary-type-button button:first-child {
  @apply border border-r-0;
}

.salary-type-button button:last-child {
  @apply border border-l-0;
}
</style>
