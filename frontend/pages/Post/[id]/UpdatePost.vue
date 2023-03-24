<template>
  <Header></Header>
  <div class="mainWrapper">
    <div class="subWrapper">
      <div class="formWrapper">
        <div class="flex items-center my-10">
          <label class="text-xl font-bold">Title:</label>
          <input
            required
            type="text"
            class="w-full mx-5 rounded-lg bg-transparent border border-neutral-600 px-3 py-2 hover:border-[#3F2A56] focus:border-[#3F2A56] duration-300 outline-none text-lg font-bold"
            v-model="titleRef"
          />
        </div>
        <div class="flex items-center">
          <label for="categories" class="text-xl font-bold mr-5"
            >Category:</label
          >
          <select
            required
            v-model="categorySelected"
            id="categories"
            name="categories"
            class="border rounded-lg p-2 bg-neutral-800 border-neutral-600"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :id="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="my-10">
          <label class="text-xl font-bold">Content:</label>
          <Tiptap
            v-if="post.content"
            :modelValue="post.content"
            v-model="contentRef"
            class="mt-5"
          />
        </div>
        <div class="flex justify-center my-3">
          <button
            class="p-3 border-4 border-[#3F2A56] hover:bg-[#573a75] bg-transparent rounded-2xl duration-300"
            type="submit"
            @click="handleSubmit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { useAuthStore } from "~~/stores/AuthStore";
import PostsService from "~~/stores/PostsService";
const { id } = useRoute().params;
const AuthStore = useAuthStore();
const router = useRouter();
const contentRef = ref("");
const titleRef = ref("");
const categorySelected = ref();
const post = ref([]);

const fetchPost = async () => {
  try {
    const response = await PostsService.fetchPost(id);
    post.value = response;
    titleRef.value = post.value.title;
    contentRef.value = post.value.content;
    categorySelected.value = post.value.category_id;
    if (AuthStore.user.id != post.value.user_id) {
      toast.error(
        "You must be the author of this post to update this code snippet!",
        {
          position: "bottom-right",
        }
      );
      router.push("/");
    }
  } catch (error) {
    console.error(error);
  }
};

const handleSubmit = async () => {
  try {
    const response = await PostsService.updateGoal(
      id,
      {
        title: titleRef.value,
        content: contentRef.value,
        category_id: categorySelected.value,
      },
      AuthStore.user.token
    );
    if (response) {
      toast.success("Post updated successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      router.push("/");
    }
  } catch (error) {
    if (!titleRef.value || !contentRef.value || !categorySelected.value)
      toast.error("You must fill all fields to post a code snippet!");
  }
};

const categories = [
  { id: 1, name: "General" },
  { id: 2, name: "HTML" },
  { id: 3, name: "CSS" },
  { id: 4, name: "JavaScript" },
  { id: 5, name: "Vue JS" },
  { id: 6, name: "Nuxt JS" },
  { id: 7, name: "Adonis JS" },
];

onBeforeMount(() => {
  AuthStore.setUserOnLoad();
});

onMounted(fetchPost);
</script>

<style lang="scss" scoped>
@import "../CreatePost.module.scss";
</style>
