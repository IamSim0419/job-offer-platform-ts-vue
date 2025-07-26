<script lang="ts" setup></script>

<template>
  <section>
    <div class="form-container">
      <form action="">
        <div class="logo">
          <img src="../assets/images/logo.svg" alt="" />
          <h2>JobSpots</h2>
        </div>

        <p class="text-[#141414]">Login</p>
        <div class="username">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Your name or Username"
          />
        </div>
        <div class="email">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Email@email.com" />
        </div>

        <button>Log in</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
@reference 'tailwindcss';

.form-container {
  @apply h-screen flex items-center justify-center;
}

form {
  @apply flex flex-col gap-3 shadow-sm bg-white p-6 w-full max-w-[360px] rounded-md;
}

form label {
  @apply text-sm;
}

form .logo {
  @apply flex items-center justify-center gap-2 mb-4;
}

form input {
  @apply border border-gray-200 outline-none py-1 px-2;
}

input::placeholder {
  @apply text-sm;
}
.username,
.email {
  @apply flex flex-col text-[#141414];
}

button {
  @apply bg-blue-600 text-sm text-white rounded-sm py-1.5 mb-4 cursor-pointer;
}
</style>
