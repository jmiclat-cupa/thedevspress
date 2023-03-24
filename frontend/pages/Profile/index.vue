<template>
  <Header></Header>
  <div class="mainWrapper">
    <div class="wrapper">
      <div class="flex sm:justify-between flex-wrap">
        <div class="my-7 sm:my-10">
          <h1 class="text-4xl font-bold hover:text-[#115E67] duration-300">
            Your Posts
          </h1>
        </div>
        <button
          class="my-2 sm:my-10 bg-[#115E67] h-10 w-36 rounded-3xl hover:bg-[#0a383d] duration-300"
          @click.prevent="newSnippet"
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
                  v-model="filters"
                  :value="category.id"
                  @change="selectedFilters(category.id, $event.checked)"
                />
                <label :for="category.id">{{ category.name }}</label
                ><br />
              </div>
            </div>
          </div>
        </div>
        <Searchbar
          class="mt-10 md:hidden"
          v-model="search"
          :urlValue="route.query.search"
        />

        <div>
          <div class="relative flex justify-between mr-10 md:-mt-5 mb-5 mt-7">
            <div class="w-1/2 md:hidden">
              <p class="mr-3">Filter by:</p>
              <button
                class="font-bold text-start"
                @click="isFilterOpen = !isFilterOpen"
              >
                {{ filterByValue }}
              </button>
              <div
                class="absolute -left-2 mt-2 w-48 bg-neutral-800 rounded-xl"
                v-show="isFilterOpen"
              >
                <a
                  class="category__small"
                  v-for="category in categories"
                  :key="category.id"
                >
                  <div class="category">
                    <input
                      type="checkbox"
                      :id="category.id"
                      v-model="filters"
                      :value="category.id"
                      @change="selectedFilters(category.id, $event.checked)"
                    />
                    <label :for="category.id">{{ category.name }}</label
                    ><br />
                  </div>
                </a>
              </div>
            </div>
            <div class="md:w-8/12 lg:w-9/12 hidden md:block">
              <Searchbar v-model="search" :urlValue="route.query.search" />
            </div>
            <div class="w-1/2 md:w-3/12 lg:w-2/12">
              <p class="mr-5">Sort by:</p>
              <button class="font-bold" @click="isSortOpen = !isSortOpen">
                {{ sortByValue }}
              </button>
              <div class="sort__wrapper" v-show="isSortOpen">
                <div class="sort__buttons">
                  <input
                    name="sortByRadio"
                    id="sortByLikes"
                    type="radio"
                    @change="sortPosts('likes_count', 'desc')"
                  /><label for="sortByLikes">Likes</label>
                </div>
                <div class="sort__buttons">
                  <input
                    checked
                    name="sortByRadio"
                    id="sortByThreadUpdated"
                    type="radio"
                    @change="sortPosts('updated_at', 'desc')"
                  /><label for="sortByThreadUpdated">Thread Updated</label>
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-x-scroll">
            <Table :posts="posts" v-if="posts != 0"></Table>
            <h1 class="mt-5 text-2xl" v-else>There are no posts found.</h1>
          </div>

          <nav class="pagination__div" v-if="posts != 0">
            <ul class="pagination__wrapper">
              <li>
                <button
                  :disabled="currentPage - 1 == 0"
                  @click="newPage(currentPage - 1)"
                  class="pagination__item rounded-l-lg"
                >
                  Previous
                </button>
              </li>
              <li
                v-for="pageNumber in meta.last_page"
                :key="pageNumber"
                :class="{
                  ' text-blue-700': currentPage == pageNumber,
                }"
                @click="newPage(pageNumber)"
              >
                <button class="pagination__item">
                  {{ pageNumber }}
                </button>
              </li>
              <li>
                <button
                  :disabled="currentPage >= meta.last_page"
                  @click="newPage(currentPage + 1)"
                  class="pagination__item rounded-r-lg"
                >
                  Next
                </button>
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
import { toast } from "vue3-toastify";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "~~/stores/AuthStore.js";
import PostsService from "~~/stores/PostsService";
const AuthStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const categoryDropdown = ref(true);
const isFilterOpen = ref(false);
const filterByValue = ref("None");
const isSortOpen = ref(false);
const sortByValue = ref("Thread Updated");
const search = ref("");
const filters = ref([]);
const posts = ref();
const meta = ref([]);
const sortBy = ref("");
const orderBy = ref("");
const currentPage = ref(1);

onBeforeMount(() => {
  AuthStore.setUserOnLoad();
  if (!AuthStore.user) {
    router.push("/");
    toast.error("You must be logged in to view profile!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
});

const categoryDropdownToggle = () => {
  categoryDropdown.value = !categoryDropdown.value;
};

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

const selectedFilters = (category_id, checked) => {
  if (checked) {
    filters.value.push(category_id);
  }
};

const sortPosts = (newSortBy, newOrderBy) => {
  sortBy.value = newSortBy;
  orderBy.value = newOrderBy;
};

const newPage = (pageNumber) => {
  currentPage.value = pageNumber;
};

const fetchPosts = async () => {
  try {
    const response = await PostsService.fetchPosts(
      search,
      route,
      filters,
      sortBy,
      orderBy,
      currentPage,
      AuthStore?.user?.id
    );

    posts.value = response.data;
    meta.value = response.meta;
    if (
      search.value != "" ||
      filters.value != 0 ||
      sortBy.value != "" ||
      orderBy.value != "" ||
      currentPage.value > 1
    ) {
      const newUrl = `${window.location.pathname}?page=${currentPage.value}search=${search.value}&category=${filters.value}&sort_by=${sortBy.value}&order=${orderBy.value}`;
      history.replaceState(history.state, "", newUrl);
    } else {
      history.replaceState(history.state, "", window.location.pathname);
    }
  } catch (error) {
    console.error(error);
  }
};

const getFilterByValue = () => {
  const filterNames = filters.value.map(
    (filterId) => categories.find((category) => category.id === filterId)?.name
  );
  filterByValue.value = filterNames.join(", ");
  if (filterByValue.value == 0) {
    filterByValue.value = "None";
  }
};

const getSortByValue = () => {
  if (sortBy.value == "updated_at") {
    sortByValue.value = "Thread Updated";
  } else if (sortBy.value == "likes_count") {
    sortByValue.value = "Likes";
  }
};

const newSnippet = () => {
  if (AuthStore.user) {
    router.push("./Post/CreatePost");
  } else {
    toast.error("You must be logged in to post a code snippet!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

watch([search, filters, sortBy, currentPage], fetchPosts);
watch(filters, getFilterByValue);
watch(sortBy, getSortByValue);

onMounted(fetchPosts);
</script>

<style scoped lang="scss">
@import "./Profile.module.scss";
</style>
