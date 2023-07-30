import { defineStore } from 'pinia';
import {api} from "boot/axios";

export const useExamStore = defineStore('exam', {
  state: () => ({
    exam: null,
    exams: [],
    examSubjects: []
  }),
  getters: {
    examOpts: (state) => state.exams.map(exa => ({ label: exa.lessonName, value: exa.id })),
  },
  actions: {
    async getExam(id) {
      const res = await api.get(`/lessons/${id}`);
      this.exam = res.data.data
    },
    async getExams() {
      const res = await api.get('/lessons');
      this.exams = res.data
    },
    async getExamSubjects(payload) {
      const res = await api.get('/exams/getSubjects', { params: payload })
      this.examSubjects = res.data.data
    }
  },
});
