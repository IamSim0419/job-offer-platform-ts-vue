<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    addClass?: string;
    outlined?: boolean;
  }>(),
  {
    type: "button",
    variant: "primary",
    size: "md",
    disabled: false,
    outlined: false,
  }
);

const baseClasses =
  "inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

const variantClasses = {
  primary: {
    solid: "bg-[#3575E2] text-white  hover:bg-blue-500 focus:ring-blue-500",
    outlined:
      "bg-transparent border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 focus:ring-blue-500",
  },
  secondary: {
    solid:
      "bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 focus:ring-gray-400",
    outlined:
      "bg-transparent border border-gray-300 text-black font-semibold hover:bg-gray-50 focus:ring-gray-400",
  },
  danger: {
    solid: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outlined:
      "bg-transparent border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500",
  },
};

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-5 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};
</script>

<template>
  <button
    :type="props.type"
    :class="[
      props.addClass,
      baseClasses,
      variantClasses[props.variant][props.outlined ? 'outlined' : 'solid'],
      sizeClasses[props.size],
      props.disabled ? 'opacity-50 cursor-not-allowed' : '',
    ]"
    :disabled="props.disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
@reference 'tailwindcss';
</style>

// Usage Example
<!-- <template>
  <Button variant="primary" size="md" @click="onSubmit">Submit</Button>
  <Button variant="secondary" size="lg" @click="onCancel">Cancel</Button>
  <Button variant="danger" size="sm" disabled @click="onDelete">Delete</Button>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'

function onSubmit() {
  console.log('Submit clicked')
}
function onCancel() {
  console.log('Cancel clicked')
}
function onDelete() {
  console.log('Delete clicked')
}
</script> -->
