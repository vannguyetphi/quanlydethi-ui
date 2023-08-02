import { defineStore } from 'pinia';
import { api } from "boot/axios";

export const useStudentStore = defineStore('student', {
  state: () => ({
    student: JSON.parse(localStorage.getItem('student')) || null,
  }),
  getters: {
  },
  actions: {
    async register(payload) {
      const res = await api.post(`/students`, payload);
      this.student = res.data.data
      localStorage.setItem('student', JSON.stringify(this.student))
    },
    async logout() {
      localStorage.removeItem('student')
    }
  },
});
