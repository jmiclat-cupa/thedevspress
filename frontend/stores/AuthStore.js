import { defineStore } from "pinia";
import AuthService from "./AuthService";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null,
    message: "",
  }),

  actions: {
    async register(userData) {
      try {
        const response = await AuthService.register(userData);
        this.user = response;
        this.message = "";
        return response;
      } catch (error) {
        this.user = null;
        this.message = error.message;
        throw new Error(error);
      }
    },
    async login(userData) {
      try {
        const response = await AuthService.login(userData);
        this.user = response;
        this.message = "";
        return response;
      } catch (error) {
        this.user = null;
        this.message = error.message;
        throw new Error(error);
      }
    },
    logout() {
      this.user = null;
      AuthService.logout();
    },
    setUserOnLoad() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        this.user = user;
      }
    },
  },
});
