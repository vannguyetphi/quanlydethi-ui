import { defineStore } from 'pinia';
import {api} from "boot/axios";

export const useQuestionStore = defineStore('question', {
  state: () => ({
    questions: [],
    questionDetails: []
  }),
  getters: {
    questionTransform: (state) => {
      const data = {}
      state.questionDetails.forEach(qD => {
        if (!data[qD.subjectId]) {
          data[qD.subjectId] = []
          data[qD.subjectId].push(qD)
        }
        else data[qD.subjectId].push(qD)
      })
      return data
    }
  },
  actions: {
    async getQuestions() {
      const res = await api.get('/questions');
      this.questions = res.data
    },
    async newQuestion(payload) {
      const res = await api.post('/questions', payload)
      console.log(res)
    },
    async addQuestionToExam({ examId, subjectId, questionIds }) {
      await Promise.all(questionIds.map(qId => api.post('/questionDetails', { examId, subjectId, questionId: qId })));
    },
    async getExamQuestions({ examId }) {
      const res = await api.get('/questionDetails/getQuestionDetails', { params: { examId } })
      this.questionDetails = res.data.data
    }
  },
});
