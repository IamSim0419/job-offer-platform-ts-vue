<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section>
    <div class="form-container">
      <form action="">
        <div class="logo">
          <img src="../assets/images/logo.svg" alt="" />
          <h2>JobSpots</h2>
        </div>

        <h3 class="text-[#141414]">Sign up</h3>
        <div class="username">
          <label for="username">Username</label>
          <input type="text" id="username" placeholder="Email" />
        </div>
        <div class="password">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Create Password" />
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm Password"
          />
          <button class="login-btn">Login</button>
          <p class="">
            Already have an account?
            <span>
              <RouterLink to="/login">Login</RouterLink>
            </span>
          </p>
        </div>

        <div class="flex items-center">
          <hr class="flex-grow border-gray-300" />
          <span class="mx-4 text-sm text-gray-500">Or</span>
          <hr class="flex-grow border-gray-300" />
        </div>

        <div class="btn-container">
          <button class="fb icon">
            <img src="/src/assets/icons/facebook_svgrepo.com.svg" alt="" /><span
              >Login with Facebook</span
            >
          </button>
          <button class="google icon">
            <img src="/src/assets/icons/google_svgrepo.com.svg" alt="" /><span
              >Login with Google</span
            >
          </button>
        </div>
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
  @apply flex flex-col gap-3 shadow-sm bg-white p-6 w-full max-w-[420px] rounded-md relative;
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
  @apply text-sm text-gray-400;
}
.username,
.password {
  @apply flex flex-col text-[#141414];
}

.password p {
  @apply text-xs mt-2 text-center cursor-pointer;
}

.password span {
  @apply text-[#3575E2] font-semibold cursor-pointer;
}

.login-btn {
  @apply bg-[#3575E2] hover:bg-blue-500 text-sm text-white rounded-sm py-1.5 my-2 cursor-pointer;
}

.forgot-password {
  @apply text-sm text-[#3575E2] cursor-pointer;
}

.btn-container {
  @apply flex flex-col gap-2;
}

form button {
  @apply text-sm text-white cursor-pointer;
}

.btn-container button {
  @apply block w-full p-4;
}

.btn-container .fb {
  @apply bg-[#3B5998] text-white py-2 rounded-sm;
}

.btn-container .google {
  @apply bg-white text-black py-2 border border-gray-300 rounded-sm;
}

.btn-container .icon > img {
  @apply w-5 mr-3 inline-block;
}

label[for="confirm-password"] {
  @apply mt-3;
}

input[id="confirm-password"] {
  @apply mb-2;
}
</style>
