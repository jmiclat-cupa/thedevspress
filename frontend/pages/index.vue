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
              <div
                class="category"
                v-for="category in categories"
                :key="category.id"
              >
                <input
                  type="checkbox"
                  :id="category.id"
                  v-model="selectedCategories"
                  :value="category.id"
                  @change="updateUrl(selectedCategories)"
                />
                <label :for="category.id">{{ category.name }}</label
                ><br />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="relative flex justify-between mr-10 md:-mt-5 mb-5 mt-7">
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
                    <input type="checkbox" id="general" />
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
                    <input type="checkbox" id="git" />
                    <label for="git">Git</label><br />
                  </div>
                </a>
              </div>
            </div>
            <div class="md:w-8/12 lg:w-9/12 hidden md:block">
              <Searchbar v-model="search" :searchPosts="searchPosts" />
            </div>
            <div class="md:w-3/12 lg:w-2/12">
              <p class="mr-5">Sort by:</p>
              <button class="font-bold" @click="isSortOpen = !isSortOpen">
                {{ sortByValue }}
              </button>
              <div
                class="absolute -right-4 mt-2 w-48 bg-neutral-800 rounded-lg"
                v-show="isSortOpen"
              >
                <a
                  @click.prevent="sortByValue.value === 1"
                  class="block px-4 py-2 hover:bg-[#115E67] hover:rounded-t-lg cursor-pointer duration-300"
                  >Likes</a
                >
                <a
                  @click.prevent="sortByValue.value = 1"
                  class="block px-4 py-2 hover:bg-[#115E67] hover:rounded-b-lg cursor-pointer duration-300"
                  >Date Created</a
                >
              </div>
            </div>
          </div>
          <Table :filteredPosts="filteredPosts"></Table>
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
import Header from "~~/components/Header/index.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/AuthStore.js";
const AuthStore = useAuthStore();
const router = useRouter();
const categoryDropdown = ref(true);
const categoryDropdownToggle = () => {
  categoryDropdown.value = !categoryDropdown.value;
};
const isFilterOpen = ref(false);
const filterByValue = ref("None");
const isSortOpen = ref(false);
const sortByValue = ref("Created At");
const search = ref("");

onBeforeMount(() => {
  AuthStore.setUserOnLoad();
});

const categories = [
  { id: 1, name: "General" },
  { id: 2, name: "HTML" },
  { id: 3, name: "CSS" },
  { id: 4, name: "JavaScript" },
  { id: 5, name: "Vue JS" },
  { id: 6, name: "Nuxt JS" },
  { id: 7, name: "Adonis JS" },
  { id: 8, name: "Git" },
];

const selectedCategories = ref([]);
const posts = ref([]);

const searchPosts = async () => {
  try {
    const response = await axios.get("http://localhost:3333/api/posts", {
      params: {
        search: search.value,
      },
    });
    posts.value = response.data.data.data;
  } catch (error) {
    console.error(error);
  }
};

const filteredPosts = computed(() => {
  if (!selectedCategories.value.length) {
    return posts.value;
  }

  return posts.value.filter((post) =>
    selectedCategories.value.includes(post.category.id)
  );
});

const updateUrl = (selectedCategories) => {
  // Construct the URL path based on the selected categories
  let path = "/";
  if (selectedCategories.length > 0) {
    path += "?category_id=" + selectedCategories.join(",");
  }

  // Update the URL with the constructed path
  router.push(path);
};

onMounted(async () => {
  try {
    const posts_response = await axios.get("http://localhost:3333/api/posts");
    posts.value = posts_response.data.data.data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped lang="scss">
@import "./Home.module.scss";
</style>
