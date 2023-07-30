import { defineStore } from 'pinia';
import {api} from "boot/axios";
import { Notify } from 'quasar'

export const useQuestionStore = defineStore('question', {
  state: () => ({
    questions: [],
    questionDetails: [],
    examSubjectQuestions: []
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
    },
    studentAnswers: (state) => {
     return state.examSubjectQuestions.map(q => {
       return { examId: q.examId, subjectId: q.subjectId, questionId: q.questionId, answer: [] }
     })
    }
  },
  actions: {
    async getQuestions() {
      const res = await api.get('/questions');
      this.questions = res.data
    },
    async newQuestion(payload) {
      const res = await api.post('/questions', payload)
    },
    async addQuestionToExam({ examId, subjectId, questionIds }) {
      try {
        await Promise.all(questionIds.map(qId => api.post('/questionDetails', { examId, subjectId, questionId: qId })));
        Notify.create({
          type: 'positive',
          message: 'Thêm câu hỏi vào môn học thành công',
          position: 'top',
        })
      } catch (err) {
        Notify.create({
          type: 'negative',
          message: 'Thêm câu hỏi vào môn học thất bại',
          position: 'top',
        })
      }
    },
    async getExamQuestions({ examId }) {
      const res = await api.get('/questionDetails/getQuestionDetails', { params: { examId } })
      this.questionDetails = res.data.data
    },
    async getExamSubjectQuestions({ examId, subjectId }) {
      const res = await api.get('/questionDetails/getExamSubjectQuestions', { params: { examId, subjectId } })
      this.examSubjectQuestions = res.data.data
    }
  },
});
