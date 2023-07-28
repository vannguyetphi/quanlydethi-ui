import { defineStore } from 'pinia';
import {api} from "boot/axios";

export const useExamStore = defineStore('exam', {
  state: () => ({
    exams: [],
    examSubjects: []
  }),
  getters: {
    examOpts: (state) => state.exams.map(exa => ({ label: exa.lessonName, value: exa.id })),
  },
  actions: {
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
