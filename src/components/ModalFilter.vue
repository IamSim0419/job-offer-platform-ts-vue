<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { useJobStore } from "../stores/jobStore";
import { watch } from "vue";
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [boolean];
}>();

const jobStore = useJobStore();

function closeModal() {
  emit("update:modelValue", false);
}

// Prevent body scroll when modal is open
watch(
  () => props.modelValue,
  (isOpen) => {
    const body = document.body;
    if (isOpen) {
      body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    } else {
      body.style.overflow = ""; // Restore scrolling when modal is closed
    }
  }
);

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
      <span class="close-modal">
        <Icon
          @click.self="closeModal"
          icon="mdi:close"
          width="32"
          height="32"
        />
      </span>
      <div class="filter-content">
        <h3 class="text-2xl font-semibold text-center mb-6">Filter</h3>
        <div class="grid">
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
              <label :for="'location-' + option.value">{{
                option.label
              }}</label>
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
              <label :for="'employment-' + option.value">{{
                option.label
              }}</label>
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
              <label :for="'experience-' + option.value">{{
                option.label
              }}</label>
            </div>
          </div>

          <!-- Salary filter -->
          <div class="filter-section salary-filter">
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
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@reference 'tailwindcss';

.filter-container {
  @apply fixed inset-0 bg-white/90 z-70 lg:hidden; /* Using bg-white/90 instead of opacity */
}

.filter-content {
  @apply bg-white border border-gray-300 rounded-md p-2 md:p-10 max-w-[90%] mx-auto mt-16 md:mt-24;
}

.grid {
  @apply grid grid-cols-2 gap-4;
}

.close-modal {
  @apply absolute top-4 right-4 text-black cursor-pointer;
}

.filter-content .salary-filter {
  @apply col-span-2;
}

.filter-section h4 {
  @apply text-[16px] font-semibold mb-2;
}

.filter-section .filter-option {
  @apply flex items-center gap-1 mt-1;
}

.salary-type-button button {
  @apply text-[13px] grow p-2 border border-[#393F47] cursor-pointer;
}

.salary-type-button button.active {
  @apply text-[13px] text-[#3575E2] bg-[rgba(53,116,226,0.2)] border border-[#3575E2];
}

.salary-type-button button:first-child {
  @apply border border-r-0;
}

.salary-type-button button:last-child {
  @apply border border-l-0;
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
