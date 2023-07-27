import { defineStore } from 'pinia';
import {api} from "boot/axios";

export const useSubjectStore = defineStore('subject', {
  state: () => ({
    subjects: [],
  }),
  getters: {
    subjectOpts: (state) => state.subjects.map(sub => ({ label: sub.name, value: sub.id })),
  },
  actions: {
    async getSubjects() {
      const res = await api.get('/subjects');
      this.subjects = res.data
    },
    async addSubjectToExam(payload) {
      const res = await api.post('/subjects/addToExam', payload)
    }
  },
});
