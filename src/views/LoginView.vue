<script lang="ts" setup></script>

<template>
  <section>
    <div class="form-container">
      <form action="">
        <div class="logo">
          <img src="../assets/images/logo.svg" alt="" />
          <h2>JobSpots</h2>
        </div>

        <h3 class="text-[#141414]">Login</h3>
        <div class="username">
          <label for="username">Username</label>
          <input type="text" id="username" placeholder="Username or Email" />
        </div>
        <div class="email">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Password" />
          <p class="forgot-password">Forgot password?</p>
          <button class="login-btn">Log in</button>
          <p class="">Don't have an account? <span>Sign-up</span></p>
        </div>

        <div class="flex items-center">
          <hr class="flex-grow border-gray-300" />
          <span class="mx-4 text-sm text-gray-500">Or</span>
          <hr class="flex-grow border-gray-300" />
        </div>

        <div class="btn-container">
          <button class="fb">Login with Facebook</button>
          <button class="google">Login with Google</button>
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
.email {
  @apply flex flex-col text-[#141414];
}

.email p {
  @apply text-sm mt-2 text-center cursor-pointer;
}

.email span {
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
  @apply block w-full;
}

.btn-container .fb {
  @apply bg-[#3B5998] text-white py-2 rounded-sm;
}

.btn-container .google {
  @apply bg-[#DB4437] text-white py-2 rounded-sm;
}
</style>
