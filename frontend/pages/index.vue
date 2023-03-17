<template>
  <div>
    <h1 v-if="authStore.user !== null">
      {{ authStore.user.first_name + " " + authStore.user.last_name }}
    </h1>
    <NuxtLink v-else to="./Login">Login</NuxtLink>
    <button @click.prevent="logout">Logout</button>
  </div>
  <Tiptap />
</template>

<script setup>
import { useAuthStore } from "../stores/AuthStore.js";
import Tiptap from "../components/Tiptap.vue";

const authStore = useAuthStore();

onBeforeMount(() => {
  authStore.setUserOnLoad();
});

const logout = async () => {
  authStore.logout();
};
</script>

<style scoped lang="scss">
@import "./Home.module.scss";
</style>
