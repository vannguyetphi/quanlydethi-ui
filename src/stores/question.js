import { defineStore } from 'pinia';
import {api} from "boot/axios";

export const useQuestionStore = defineStore('question', {
  state: () => ({
    questions: [],
  }),
  getters: {
  },
  actions: {
    async getQuestion() {
      const res = await api.get('/questions');
      this.questions = res.data
    },
    async newQuestion(payload) {
      const res = await api.post('/questions', payload)
      console.log(res)
    }
  },
});
