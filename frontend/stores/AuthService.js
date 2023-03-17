import axios from "axios"; //making the HTTP request and waiting for response

const API_URL = "http://localhost:3333/api/auth/";

//Register
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL + "register", userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.errors[0].message);
  }
};

//LogOut
const logout = () => {
  localStorage.removeItem("user");
};

const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + "login", userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
