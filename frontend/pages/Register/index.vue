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
        <h1 class="mt-10 mb-3 font-semibold">Member Registration</h1>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="input__form">
          <div class="input_form_inner">
            <div class="input_fields_name">
              <div class="input__fields">
                <span class="input__icon">
                  <Icon name="ph:user-circle" class="mt-2" />
                </span>
                <input
                  class="input_first_name"
                  placeholder="First Name."
                  required
                  v-model="firstNameRegister"
                />
              </div>
              <div class="input__fields">
                <input
                  class="input_last_name"
                  placeholder="Last Name."
                  required
                  v-model="lastNameRegister"
                />
              </div>
            </div>

            <div class="input__fields">
              <span class="input__icon">
                <Icon name="material-symbols:alternate-email" class="mt-2" />
              </span>
              <input
                type="email"
                class="input__name"
                placeholder="Email."
                required
                v-model="emailRegister"
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
                v-model="passwordRegister"
              />
            </div>
            <div class="input__fields">
              <span class="input__icon">
                <Icon name="material-symbols:lock" class="mt-2" />
              </span>
              <input
                type="password"
                class="input__name"
                placeholder="Confirm Password."
                required
                v-model="cpasswordRegister"
              />
            </div>
          </div>
          <button class="btn">Register.</button>
        </div>
      </form>
      <p class="flex justify-center mt-3 font-light text-sm">
        Already have an account? Login&nbsp;
        <NuxtLink
          to="/Login"
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
const AuthStore = useAuthStore();
const firstNameRegister = ref("");
const lastNameRegister = ref("");
const emailRegister = ref("");
const passwordRegister = ref("");
const cpasswordRegister = ref("");

const handleSubmit = async () => {
  if (passwordRegister.value !== cpasswordRegister.value) {
    toast.error("Passwords do not match!");
    return;
  }

  try {
    const user = await AuthStore.register({
      first_name: firstNameRegister.value,
      last_name: lastNameRegister.value,
      email: emailRegister.value,
      password: passwordRegister.value,
    });
    if (user) {
      toast.success("Registered Successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      router.push("../");
    }
  } catch (error: any) {
    toast.error(AuthStore.message, { position: toast.POSITION.BOTTOM_RIGHT });
  }
};

onBeforeMount(() => {
  AuthStore.setUserOnLoad();
  if (AuthStore.user) {
    router.push("../");
  }
});
</script>

<style scoped lang="scss">
@import "./Register.module.scss";
</style>
