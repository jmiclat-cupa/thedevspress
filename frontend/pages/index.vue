<template>
  <Header></Header>
  <div class="mainWrapper">
    <div class="wrapper">
      <div class="flex sm:justify-between flex-wrap">
        <div class="homeWrapper my-7 sm:my-10">
          <h1 class="text-4xl font-bold hover:text-[#115E67] duration-300">
            Code Snippet Repository
          </h1>
          <p
            class="font-thin italic mt-3 ml-1 text-neutral-400 hover:text-[#115E67] duration-300"
          >
            For CUP & A devs, by CUP & A devs.
          </p>
        </div>
        <button
          class="my-2 sm:my-10 bg-[#115E67] h-10 w-36 rounded-3xl hover:bg-[#0a383d] duration-300"
        >
          New Snippet +
        </button>
      </div>
      <div class="gridWrapper">
        <div class="hidden md:block mt-5">
          <h1 class="font-bold">Filter by:</h1>
          <div class="filter__category">
            <button
              @click.prevent="categoryDropdownToggle"
              class="flex justify-between my-5 w-8/12"
            >
              <p class="font-bold">Category</p>
              <Icon v-if="!categoryDropdown" name="ph:caret-up"></Icon>
              <Icon v-else name="ph:caret-down"></Icon>
            </button>
            <div v-if="categoryDropdown">
              <div class="category">
                <input
                  type="checkbox"
                  id="general"
                  class="focus:ring-violet-800 focus:ring-2"
                />
                <label for="general">General</label><br />
              </div>
              <div class="category">
                <input type="checkbox" id="html" />
                <label for="html">HTML</label><br />
              </div>
              <div class="category">
                <input type="checkbox" id="css" />
                <label for="css">CSS</label><br />
              </div>
              <div class="category">
                <input type="checkbox" id="javascript" />
                <label for="javascript">JavaScript</label><br />
              </div>
              <div class="category">
                <input type="checkbox" id="vuejs" />
                <label for="vuejs">Vue JS</label><br />
              </div>
              <div class="category">
                <input type="checkbox" id="nuxtjs" />
                <label for="nuxt">Nuxt JS</label><br />
              </div>
              <div class="category">
                <input type="checkbox" id="adonisjs" />
                <label for="adonisjs">Adonis JS</label><br />
              </div>
              <div class="category">
                <input type="checkbox" id="git" />
                <label for="git">Git</label><br />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            class="relative flex md:justify-end justify-between mr-10 md:-mt-5 mb-5 mt-7"
          >
            <div class="md:hidden">
              <p class="mr-3">Filter by:</p>
              <button class="font-bold" @click="isFilterOpen = !isFilterOpen">
                {{ filterByValue }}
              </button>
              <div
                class="absolute -left-2 mt-2 w-48 bg-neutral-800 rounded-xl"
                v-show="isFilterOpen"
              >
                <a
                  class="block px-4 py-2 hover:bg-[#115E67] hover:rounded-t-lg"
                >
                  <div class="category">
                    <input
                      type="checkbox"
                      id="general"
                      class="focus:ring-violet-800 focus:ring-2"
                    />
                    <label for="general">General</label><br />
                  </div>
                </a>
                <a class="block px-4 py-2 hover:bg-[#115E67]">
                  <div class="category">
                    <input type="checkbox" id="html" />
                    <label for="html">HTML</label><br />
                  </div>
                </a>
                <a class="block px-4 py-2 hover:bg-[#115E67]">
                  <div class="category">
                    <input type="checkbox" id="css" />
                    <label for="css">CSS</label><br />
                  </div>
                </a>
                <a class="block px-4 py-2 hover:bg-[#115E67]">
                  <div class="category">
                    <input type="checkbox" id="javascript" />
                    <label for="javascript">JavaScript</label><br />
                  </div>
                </a>
                <a class="block px-4 py-2 hover:bg-[#115E67]">
                  <div class="category">
                    <input type="checkbox" id="vuejs" />
                    <label for="vuejs">Vue JS</label><br />
                  </div>
                </a>
                <a class="block px-4 py-2 hover:bg-[#115E67]">
                  <div class="category">
                    <input type="checkbox" id="nuxtjs" />
                    <label for="nuxt">Nuxt JS</label><br />
                  </div>
                </a>
                <a class="block px-4 py-2 hover:bg-[#115E67]">
                  <div class="category">
                    <input type="checkbox" id="adonisjs" />
                    <label for="adonisjs">Adonis JS</label><br />
                  </div>
                </a>
                <a
                  class="block px-4 py-2 hover:bg-[#115E67] hover:rounded-b-lg"
                >
                  <div class="category">
                    <input type="checkbox" id="Git" />
                    <label for="git">Git</label><br />
                  </div>
                </a>
              </div>
            </div>
            <div>
              <p class="mr-3">Sort by:</p>
              <button class="font-bold" @click="isSortOpen = !isSortOpen">
                {{ sortByValue }}
              </button>
              <div
                class="absolute -right-4 mt-2 w-48 bg-neutral-800 rounded-lg"
                v-show="isSortOpen"
              >
                <a
                  @click.prevent="sortByValue.value === 1"
                  class="block px-4 py-2 hover:bg-[#115E67] hover:rounded-t-lg cursor-pointer"
                  >Likes</a
                >
                <a
                  @click.prevent="sortByValue.value = 1"
                  class="block px-4 py-2 hover:bg-[#115E67] hover:rounded-b-lg cursor-pointer"
                  >Created At</a
                >
              </div>
            </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th class="table__head">Title</th>
                <th class="table__head">Posted by:</th>
                <th class="table__head">Likes</th>
                <th class="table__head">Activity</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table__row">
                <td class="table__title">
                  <NuxtLink to="/"> How to center a div? </NuxtLink>
                </td>
                <td class="table__data">Malcolm Lockyer</td>
                <td class="table__data">1961</td>
                <td class="table__data">1961</td>
              </tr>
              <tr class="table__row">
                <td class="table__title">Witchy Woman</td>
                <td class="table__data">The Eagles</td>
                <td class="table__data">1972</td>
                <td class="table__data">1961</td>
              </tr>
              <tr class="table__row">
                <td class="table__title">Shining Star</td>
                <td class="table__data">Earth, Wind, and Fire</td>
                <td class="table__data">1975</td>
                <td class="table__data">1961</td>
              </tr>
              <tr class="table__row">
                <td class="table__title">Shining Star</td>
                <td class="table__data">Earth, Wind, and Fire</td>
                <td class="table__data">1975</td>
                <td class="table__data">1961</td>
              </tr>
              <tr class="table__row">
                <td class="table__title">Shining Star</td>
                <td class="table__data">Earth, Wind, and Fire</td>
                <td class="table__data">1975</td>
                <td class="table__data">1961</td>
              </tr>
              <tr class="table__row">
                <td class="table__title">Shining Star</td>
                <td class="table__data">Earth, Wind, and Fire</td>
                <td class="table__data">1975</td>
                <td class="table__data">1961</td>
              </tr>
              <tr class="table__row">
                <td class="table__title">Shining Star</td>
                <td class="table__data">Earth, Wind, and Fire</td>
                <td class="table__data">1975</td>
                <td class="table__data">1961</td>
              </tr>
              <tr class="table__row">
                <td class="table__title">Shining Star</td>
                <td class="table__data">Earth, Wind, and Fire</td>
                <td class="table__data">1975</td>
                <td class="table__data">1961</td>
              </tr>
              <tr class="table__row">
                <td class="table__title">Shining Star</td>
                <td class="table__data">Earth, Wind, and Fire</td>
                <td class="table__data">1975</td>
                <td class="table__data">1961</td>
              </tr>
              <tr class="table__row">
                <td class="table__title">Shining Star</td>
                <td class="table__data">Earth, Wind, and Fire</td>
                <td class="table__data">1975</td>
                <td class="table__data">1961</td>
              </tr>
            </tbody>
          </table>
          <nav class="pagination__div">
            <ul class="pagination__wrapper">
              <li>
                <a href="#" class="pagination__item rounded-l-lg">Previous</a>
              </li>
              <li>
                <a href="#" class="pagination__item">1</a>
              </li>
              <li>
                <a href="#" class="pagination__item">2</a>
              </li>
              <li>
                <a href="#" class="pagination__item">3</a>
              </li>
              <li>
                <a href="#" class="pagination__item">4</a>
              </li>
              <li>
                <a href="#" class="pagination__item">5</a>
              </li>
              <li>
                <a href="#" class="pagination__item rounded-r-lg">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "~~/components/Header.vue";
import { useAuthStore } from "../stores/AuthStore.js";
const authStore = useAuthStore();

const categoryDropdown = ref(true);
const categoryDropdownToggle = () => {
  categoryDropdown.value = !categoryDropdown.value;
};
const isFilterOpen = ref(false);
const filterByValue = ref("None");
const isSortOpen = ref(false);
const sortByValue = ref("Created At");

onBeforeMount(() => {
  authStore.setUserOnLoad();
});
</script>

<style scoped lang="scss">
@import "./Home.module.scss";
</style>
