import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JobListView from "@/views/JobListView.vue";
import SalaryView from "@/views/SalaryView.vue";
import PricingView from "@/views/PricingView.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
// import MainView from "@/views/MainView.vue";

const routes = [
  // { path: "/", component: MainView },
  { path: "/", component: HomeView },
  { path: "/job-list", component: JobListView },
  { path: "/salary", component: SalaryView },
  { path: "/pricing", component: PricingView },
  { path: "/login", component: LoginView },
  { path: "/sign-up", component: SignupView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
