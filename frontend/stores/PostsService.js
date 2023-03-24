import axios from "axios"; //making the HTTP request and waiting for response

const API_URL = "http://localhost:3333/api/posts/";

const fetchPost = async (id) => {
  try {
    const response = await axios.get(API_URL + id);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const fetchPosts = async (
  search,
  route,
  filters,
  sortBy,
  orderBy,
  currentPage,
  userId
) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        search: search.value || route.query.search,
        category_id: filters.value.join(","),
        user_id: userId,
        sort_by: sortBy.value,
        order: orderBy.value,
        page: currentPage.value,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const storePosts = async (postData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_URL, postData, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const updateGoal = async (post_id, postData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.patch(API_URL + post_id, postData, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const destroyPost = async (post_id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(API_URL + post_id, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const PostsService = {
  fetchPost,
  fetchPosts,
  storePosts,
  destroyPost,
  updateGoal,
};

export default PostsService;
