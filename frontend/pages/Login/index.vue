<template>
  <div class="wrapper">
    <div class="form_div_outer">
      <div class="header">
        <NuxtLink to="/"
          ><img src="~/assets/imgs/logo.png" alt="the dev's press" width="350"
        /></NuxtLink>
        <p class="opacity-50">
          <em>a code snippet repository.</em>
        </p>
        <h1 class="mt-10 mb-5 font-semibold">Member Login</h1>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="input__form">
          <div class="input_form_inner">
            <div class="input__fields">
              <span class="input__icon">
                <Icon name="material-symbols:alternate-email" class="mt-2" />
              </span>
              <input
                type="email"
                class="input__name"
                placeholder="Email."
                required
                v-model="emailLogin"
              />
            </div>
            <div class="input__fields">
              <span class="input__icon">
                <Icon name="material-symbols:lock" class="mt-2" />
              </span>
              <input
                type="password"
                class="input__name"
                placeholder="Password."
                required
                v-model="passwordLogin"
              />
            </div>
          </div>
          <button class="btn">Login.</button>
        </div>
      </form>
      <p class="flex justify-center mt-14 font-light">
        Don't have an account? Register&nbsp;
        <NuxtLink
          to="/Register"
          class="text-blue-300 hover:text-[#115e67] duration-300"
          >here.</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../../stores/AuthStore.js";
import { toast } from "vue3-toastify";
const router = useRouter();
const authStore = useAuthStore();
const emailLogin = ref("");
const passwordLogin = ref("");
const handleSubmit = async () => {
  try {
    const user = await authStore.login({
      email: emailLogin.value,
      password: passwordLogin.value,
    });

    if (user) {
      toast.success("Login Successful!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      router.push("../");
    }
  } catch (error: any) {
    toast.error(authStore.message, { position: toast.POSITION.BOTTOM_RIGHT });
  }
};

onBeforeMount(() => {
  authStore.setUserOnLoad();
  if (authStore.user) {
    router.push("../");
  }
});
</script>

<style scoped lang="scss">
@import "./Login.module.scss";
</style>
