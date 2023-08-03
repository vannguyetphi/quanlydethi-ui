import { defineStore } from 'pinia';
import { api } from "boot/axios";

export const useStudentStore = defineStore('student', {
  state: () => ({
    student: JSON.parse(localStorage.getItem('student')) || null,
  }),
  getters: {
  },
  actions: {
    async submitAnswers(payload) {
      await api.post('/answerDetails', payload)
    },
    async register(payload) {
      const res = await api.post(`/students`, payload);
      let student = res.data.data
      const resStudent = await api.get(`/students/${student.id}`);
      student = resStudent.data.data
      this.student = student
      localStorage.setItem('student', JSON.stringify(student))
    },
    async logout() {
      localStorage.removeItem('student')
    }
  },
});
