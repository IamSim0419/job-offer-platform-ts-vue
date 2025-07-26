interface JobSalary {
  hourly: string;
  monthly: string;
  annually: string;
}

export interface Job {
  id: number;
  image: string;
  type: string;
  title: string;
  company: string;
  date: string;
  salary: JobSalary;
  location: string;
  description: string;
}

export type Salary = "hourly" | "monthly" | "annually";

export type SortType = "high-to-low" | "low-to-high" | null;
