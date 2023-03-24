<template>
  <Header></Header>
  <div class="mainWrapper">
    <div class="lg:w-7/12 mx-auto p-5">
      <div class="md:flex justify-between items-center px-5 my-5">
        <div>
          <h1 class="text-4xl font-bold">{{ post.title }}</h1>
          <div class="flex mt-3" v-if="post.user_id === AuthStore?.user?.id">
            <button
              class="border w-16 h-6 mr-2 text-sm rounded-lg hover:bg-[#3F2A56] duration-300"
              @click="router.push(`/Post/${id}/UpdatePost`)"
            >
              Edit
            </button>
            <button
              class="border w-20 h-6 mx-2 text-sm rounded-lg hover:bg-[#3F2A56] duration-300"
              @click="showModal = true"
            >
              Delete
            </button>
          </div>
        </div>

        <div class="md:flex flex-col items-end mt-5 md:mt-0">
          <button
            class="like__button"
            :class="{ 'bg-red-400 text-red-700': isLiked }"
            @click.prevent="!isLiked ? storeLike() : destroyLike()"
          >
            <Icon
              name="material-symbols:favorite"
              class="like_button_fillIcon"
            />
            {{ post.likes ? post.likes.length : 0 }}
          </button>
          <p class="text-xs">Created at: {{ formatDate(post.created_at) }}</p>
          <p class="text-xs">
            Last updated at: {{ formatDate(post.updated_at) }}
          </p>
        </div>
      </div>
      <hr class="border-neutral-50 my-7" />
      <div>
        <TiptapReadOnly
          v-if="post.content"
          :content="post.content"
          class="select-none"
        />
      </div>
    </div>
  </div>
  <Modal :show="showModal" @close="showModal = false" @delete="destroyPost" />
</template>

<script setup>
import PostsService from "~~/stores/PostsService";
import LikesService from "~~/stores/LikesService";
import { useAuthStore } from "~~/stores/AuthStore";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
const router = useRouter();
const AuthStore = useAuthStore();
const { id } = useRoute().params;
const post = ref([]);
const showModal = ref(false);
const isLiked = ref(false);

const fetchPost = async () => {
  try {
    const response = await PostsService.fetchPost(id);
    post.value = response;
  } catch (error) {
    console.error(error);
  }
};

const destroyPost = async () => {
  try {
    const response = await PostsService.destroyPost(id, AuthStore.user.token);
    if (response) {
      router.push("/");
      toast.success("Deleted the post successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchLike = async () => {
  try {
    const response = await LikesService.fetchLike(id, AuthStore.user.token);
    if (response) {
      isLiked.value = true;
    }
  } catch (error) {
    console.log(error);
  }
};

const storeLike = async () => {
  try {
    const response = await LikesService.storeLike(id, AuthStore.user.token);
    if (response) {
      isLiked.value = true;
      fetchPost();
    }
  } catch (error) {
    console.log(error);
  }
};

const destroyLike = async () => {
  try {
    const response = await LikesService.destroyLike(id, AuthStore.user.token);
    if (response) {
      isLiked.value = false;
      fetchPost();
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchPost);
onMounted(fetchLike);

onBeforeMount(() => {
  AuthStore.setUserOnLoad();
});

const formatDate = (time) => {
  const date = new Date(time);
  const ttime = date.toLocaleString("default", { timeStyle: "short" });
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.toLocaleString("default", { day: "numeric" });
  return ttime + " " + month + " " + day + ", " + year;
};
</script>

<style scoped>
@import "./Post.module.scss";
</style>
