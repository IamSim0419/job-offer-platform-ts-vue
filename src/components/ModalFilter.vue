<script lang="ts" setup>
import { useJobStore } from "../stores/jobStore";
defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const jobStore = useJobStore();

function closeModal() {
  emit("update:modelValue", false);
}

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
  <Teleport to="body">
    <div class="filter-container animate-fadeIn" v-if="modelValue">
      <span class="close-modal" @click.self="closeModal">X</span>
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
  </Teleport>
</template>

<style scoped>
@reference 'tailwindcss';

.filter-container {
  @apply fixed inset-0 bg-emerald-500 flex flex-col items-center justify-center opacity-50 z-70;
}

.close-modal {
  @apply absolute top-4 right-4 text-white cursor-pointer;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
