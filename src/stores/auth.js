import { defineStore } from "pinia";
import { api } from "boot/axios";
import { Notify } from "quasar";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),
  getters: {
    getUser: (state) => state.user,
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async authenticate(payload) {
      try {
        const res = await api.post("/admins/authenticate", payload);
        this.user = res.data.data;
        Notify.create({
          type: "positive",
          message: "Đăng nhập thành công",
        });
        localStorage.setItem("user", JSON.stringify(this.user));
        location.reload();
      } catch (err) {
        Notify.create({
          type: "negative",
          message: "Mật khẩu hoặc tên đăng nhập không đúng !",
        });
      }
    },
    async logout() {
      this.user = null;
      localStorage.removeItem("user");
      location.reload();
    },
  },
});
