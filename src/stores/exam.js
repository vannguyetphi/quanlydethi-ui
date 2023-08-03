import { defineStore } from 'pinia';
import {api} from "boot/axios";

export const useExamStore = defineStore('exam', {
  state: () => ({
    exam: null,
    exams: [],
    examSubjects: [],
    examSubjectDone: [],
    examExpired: []
  }),
  getters: {
    examOpts: (state) => state.exams.map(exa => ({ label: exa.lessonName, value: exa.id })),
    examState: (state) => {
      const obj = {}
      state.examSubjects.forEach(xs => {
        if (!obj[xs.code]) obj[xs.code] = {}
        obj[xs.code].active = true
      })
      return obj
    }
  },
  actions: {
    setExamState(subjectId) {
      Object.keys(this.examState).forEach(exs => {
        this.examState[exs].active = exs === subjectId;
      })
    },
    markExamState() {
      Object.keys(this.examState).forEach(exs => {
        this.examState[exs].active = !this.examSubjectDone.includes(exs);
      })
    },
    addExpiredExam(id) {
      this.examExpired.push(id)
    },
    setExamSubjectDone(payload) {
      this.examSubjectDone.push(payload)
    },
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
