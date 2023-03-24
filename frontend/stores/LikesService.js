import axios from "axios"; //making the HTTP request and waiting for response

const API_URL = "http://localhost:3333/api/posts/";

const fetchLike = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL + id + "/likes", config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const storeLike = async (id, token) => {
  console.log(token);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_URL + id + "/likes", null, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const destroyLike = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(API_URL + id + "/likes", config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const LikesService = {
  fetchLike,
  storeLike,
  destroyLike,
};

export default LikesService;
