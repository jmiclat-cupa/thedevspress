<template>
  <div class="flex justify-between items-center h-24">
    <div class="w-full md:w-1/3 hidden sm:block"></div>
    <NuxtLink to="/" class="w-full md:w-1/3 flex justify-center"
      ><img
        class="my-3 ml-5 sm:ml-0"
        src="../..//assets/imgs/logo.png"
        alt="The Devs Press Logo"
        width="400"
    /></NuxtLink>

    <ul
      v-if="!AuthStore.user"
      class="flex justify-end items-center w-full md:w-1/3"
    >
      <li class="mr-5 md:mr-10">
        <NuxtLink
          to="./Login"
          class="hover:text-[#115E67] duration-300 flex flex-wrap items-center"
        >
          <Icon
            name="material-symbols:login"
            class="text-xl lg:text-2xl mr-1"
          />
          <p class="text-sm lg:text-lg">Login</p>
        </NuxtLink>
      </li>
      <li class="mr-3 md:mr-10">
        <NuxtLink
          to="./Register"
          class="hover:text-[#115E67] duration-300 flex flex-wrap items-center"
        >
          <Icon
            name="material-symbols:person-add"
            class="text-xl lg:text-2xl mr-1"
          />
          <p class="text-sm lg:text-lg">Register</p>
        </NuxtLink>
      </li>
    </ul>
    <ul v-else class="flex justify-end items-center w-full md:w-1/3">
      <li class="mr-2 md:mr-10">
        <p
          class="text-sm hidden sm:block lg:text-lg hover:text-[#115E67] duration-300 cursor-default"
        >
          {{ AuthStore.user.first_name + " " + AuthStore.user.last_name }}
        </p>
      </li>
      <li class="mr-2 md:mr-10">
        <button
          @click="logout"
          class="hover:text-[#115E67] duration-300 flex flex-wrap items-center"
        >
          <Icon
            name="material-symbols:login"
            class="text-xl lg:text-2xl mr-1"
          />
          <p class="text-sm lg:text-lg">Logout</p>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useAuthStore } from "../../stores/AuthStore.js";
const AuthStore = useAuthStore();
const router = useRouter();

const logout = async () => {
  AuthStore.logout();
  router.push("/");
};
</script>

<style lang="scss" scoped></style>
