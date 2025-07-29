import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Job, Salary, SortType } from "../types/job";

export const useJobStore = defineStore("job", () => {
  const jobs = ref<Job[]>([]);
  const currentPage = ref(1);
  const itemsPerPage = 6;
  const searchPosition = ref("");
  const searchLocation = ref("");
  const loading = ref(false);
  const locationFilter = ref<string>("any");
  const salaryFilterType = ref<Salary>("hourly");
  const salaryFilterValue = ref<string | number>("any");
  const dateFilter = ref<string>("all");
  const experienceFilter = ref<string>("any");
  const employmentTypes = ref<string[]>([]);
  const sortBySalary = ref<SortType>(null);

  const filteredJobs = computed(() => {
    let filtered = jobs.value;

    // Search filters the title and location
    if (searchPosition.value || searchLocation.value) {
      filtered = filtered.filter(
        (job) =>
          job.title
            .toLowerCase()
            .includes(searchPosition.value.toLowerCase()) &&
          job.location
            .toLowerCase()
            .includes(searchLocation.value.toLowerCase())
      );
    }

    // Location filter
    if (locationFilter.value !== "any") {
      if (locationFilter.value === "remote") {
        filtered = filtered.filter((job) =>
          job.location.toLowerCase().includes("remote")
        );
      } else if (locationFilter.value === "exact" && searchLocation.value) {
        filtered = filtered.filter(
          (job) =>
            job.location.toLowerCase() === searchLocation.value.toLowerCase()
        );
      } else if (locationFilter.value === "near" && searchLocation.value) {
        // Simplified: match locations containing the search term (no geolocation)
        filtered = filtered.filter(
          (job) =>
            job.location
              .toLowerCase()
              .includes(searchLocation.value.toLowerCase()) &&
            !job.location.toLowerCase().includes("remote")
        );
      }
    }

    // Salary filter
    if (salaryFilterValue.value !== "any") {
      const value = Number(salaryFilterValue.value); //ex. 60
      filtered = filtered.filter((job) => {
        const salary = Number(job.salary[salaryFilterType.value]);
        return salary > value;
      });
    }

    // Date filter
    if (dateFilter.value !== "all") {
      filtered = filtered.filter((job) => {
        // Simplified date filtering due to mock data
        if (dateFilter.value === "24h") {
          return job.date.includes("min") || job.date.includes("hour");
        } else if (dateFilter.value === "3d") {
          return job.date.includes("3 days") || job.date.includes("days");
        } else if (dateFilter.value === "7d") {
          return job.date.includes("7 days") || job.date.includes("week");
        }
        return true;
      });
    }

    // Experience filter
    if (experienceFilter.value !== "any") {
      filtered = filtered.filter((job) =>
        experienceFilter.value === "internship"
          ? job.type.toLowerCase().includes("internship")
          : job.type.toLowerCase().includes("remote")
      );
    }

    // Employment type filter
    if (employmentTypes.value.length > 0) {
      filtered = filtered.filter((job) =>
        employmentTypes.value.includes(job.type.toLowerCase())
      );
    }

    // Sorting
    if (sortBySalary.value !== null) {
      filtered = [...filtered].sort((a, b) => {
        const salaryA = Number(a.salary[salaryFilterType.value]);
        const salaryB = Number(b.salary[salaryFilterType.value]);

        return sortBySalary.value === "high-to-low"
          ? salaryB - salaryA
          : salaryA - salaryB;
      });
    }

    return filtered;
  });

  const totalPages = computed(() =>
    Math.ceil(filteredJobs.value.length / itemsPerPage)
  );

  const paginatedJobs = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredJobs.value.slice(0, start + itemsPerPage);
  });

  async function fetchJobs() {
    loading.value = true;

    try {
      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch("/jobs.json");
      jobs.value = await response.json();
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      loading.value = false;
    }
  }

  function setPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }

  function goToFirstPage() {
    currentPage.value = 1;
  }

  function goToLastPage() {
    currentPage.value = totalPages.value;
  }

  function setSearchPosition(value: string) {
    searchPosition.value = value;
    currentPage.value = 1;
  }

  function setSearchLocation(value: string) {
    searchLocation.value = value;
    currentPage.value = 1;
  }

  function setLocationFilter(value: string) {
    locationFilter.value = value;
    currentPage.value = 1;
  }

  function setSalaryFilterType(type: Salary) {
    salaryFilterType.value = type;
    salaryFilterValue.value = "any";

    currentPage.value = 1;
  }

  function setSalaryFilterValue(value: string | number) {
    salaryFilterValue.value = value;
    currentPage.value = 1;
  }

  function setDateFilter(value: string) {
    dateFilter.value = value;
    currentPage.value = 1;
  }

  function setExperienceFilter(value: string) {
    experienceFilter.value = value;
    currentPage.value = 1;
  }

  function toggleEmploymentType(type: string) {
    const index = employmentTypes.value.indexOf(type);
    if (index === -1) {
      employmentTypes.value.push(type);
    } else {
      employmentTypes.value.splice(index, 1);
    }
    currentPage.value = 1;
  }

  function setSortBySalary(value: SortType) {
    sortBySalary.value = value;
    currentPage.value = 1;
  }

  return {
    jobs,
    currentPage,
    paginatedJobs,
    totalPages,
    searchPosition,
    searchLocation,
    loading,
    locationFilter,
    salaryFilterValue,
    dateFilter,
    experienceFilter,
    employmentTypes,
    sortBySalary,
    fetchJobs,
    setPage,
    goToFirstPage,
    goToLastPage,
    setSearchPosition,
    salaryFilterType,
    setSearchLocation,
    setLocationFilter,
    setSalaryFilterType,
    setSalaryFilterValue,
    setDateFilter,
    setExperienceFilter,
    toggleEmploymentType,
    setSortBySalary,
  };
});
