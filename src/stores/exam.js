import { defineStore } from 'pinia';
import {api} from "boot/axios";

export const useExamStore = defineStore('exam', {
  state: () => ({
    exams: [],
  }),
  getters: {
    examOpts: (state) => state.exams.map(exa => ({ label: exa.lessonName, value: exa.id })),
  },
  actions: {
    async getExams() {
      const res = await api.get('/lessons');
      this.exams = res.data
    },
  },
});
