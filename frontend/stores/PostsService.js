import axios from "axios"; //making the HTTP request and waiting for response

const API_URL = "http://localhost:3333/api/posts/";

const readPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const PostsService = {
  readPosts,
};

export default PostsService;
