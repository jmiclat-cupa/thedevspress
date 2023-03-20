<template>
  <table class="table">
    <thead>
      <tr>
        <th class="table__head">Title</th>
        <th class="table__head">Posted by:</th>
        <th class="table__head">Likes</th>
        <th class="table__head">Date Created</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="post in filteredPosts" class="table__row">
        <td class="table__title">
          <span
            class="bg-[#115e67] px-3 py-1 rounded-full text-xs mr-3 font-bold cursor-default select-none"
            >{{ post.category.name }}</span
          >
          <NuxtLink to="/"> {{ post.title }} </NuxtLink>
        </td>
        <td class="table__data">
          {{ post.user.first_name + " " + post.user.last_name }}
        </td>
        <td class="table__data">{{ post.likes.length }}</td>
        <td class="table__data">
          {{ formatDate(post.created_at) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const { filteredPosts } = defineProps(["filteredPosts"]);
const formatDate = (time) => {
  const date = new Date(time);
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });
  return `${month} / ${day} / ${year}`;
};
</script>

<style lang="scss" scoped>
@import "./Table.module.scss";
</style>
