<template>
  <div class="relative">
    <div
      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
    >
      <svg
        class="w-5 h-5 text-neutral-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>
    <input
      type="search"
      class="block w-full p-4 pl-10 text-sm text-neutral-50 rounded-lg bg-[#115E67] border-gray-50 bg-opacity-60 outline-none"
      placeholder="Search for code snippets..."
      :value="modelValue || urlValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
const { modelValue, urlValue } = defineProps(["modelValue", "urlValue"]);
</script>

<style lang="scss" scoped></style>
