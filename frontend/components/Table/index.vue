<template>
  <table class="table">
    <thead>
      <tr>
        <th class="table__head">Title</th>
        <th class="table__head">Posted by:</th>
        <th class="table__head">Likes</th>
        <th class="table__head">Last Updated</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="post in posts" class="table__row">
        <td class="table__title">
          <span
            class="bg-[#115e67] px-3 py-1 rounded-full text-xs mr-3 font-bold cursor-default select-none"
            >{{ post.category.name }}</span
          >
          <NuxtLink :to="`/Post/${post.id}`"> {{ post.title }} </NuxtLink>
        </td>
        <td class="table__data">
          {{ post.user.first_name + " " + post.user.last_name }}
        </td>
        <td class="table__data">{{ post.likes.length }}</td>
        <td class="table__data text-xs">
          {{ formatDate(post.updated_at) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const { posts } = defineProps(["posts"]);
const formatDate = (time) => {
  const date = new Date(time);
  const ttime = date.toLocaleString("default", { timeStyle: "short" });
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.toLocaleString("default", { day: "numeric" });
  return ttime + "\n" + month + " " + day + ", " + year;
};
</script>

<style lang="scss" scoped>
@import "./Table.module.scss";
</style>
