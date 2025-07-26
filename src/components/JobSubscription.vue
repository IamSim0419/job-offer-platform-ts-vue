<script lang="ts" setup></script>

<template>
  <div class="job-container">
    <div class="card">
      <div class="title">
        <span>📨</span>
        <h2>Email me for jobs</h2>
      </div>
      <p>
        Ut esse eiusmod aute. Sit enim labore dolore. Aute ea fugiat commodo ea
        foes.
      </p>

      <form>
        <input type="email" placeholder="name@email.com" />
        <button type="submit">Subscribe</button>
      </form>
    </div>

    <div class="card">
      <div class="title">
        <span>🚀</span>
        <h2>Get notified faster</h2>
      </div>
      <p>
        Quis eiusmod deserunt cillum laboris magna cupidatat esse labore irure
        quis cupidatat in.
      </p>
      <button>Upload your resume</button>
    </div>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

.job-container {
  @apply flex flex-col md:flex-row lg:flex-col gap-5 mt-5 lg:mt-0;
}

.job-container .card {
  @apply rounded-[8px] p-6 bg-white shadow-sm grow;
}

.card {
  @apply flex flex-col;
}

.card .title {
  @apply flex items-center gap-1 text-xl font-bold;
}
.card p {
  @apply text-[rgba(20,20,20,0.8)] text-sm my-4;
}

.card input {
  @apply w-full border border-[rgba(20,20,20,0.2)]  rounded-sm py-2 pl-2 outline-none;
}

.card input::placeholder {
  @apply text-[#141414] opacity-50;
}

.card button {
  @apply bg-[#3575E2] text-white w-full rounded-sm p-2 mt-auto cursor-pointer;
}

button[type="submit"] {
  @apply mt-3;
}
</style>
