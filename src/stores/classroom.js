import { defineStore } from 'pinia';
import {api} from "boot/axios";

export const useClassroomStore = defineStore('classroom', {
  state: () => ({
    classrooms: []
  }),
  getters: {
    classroomOpt: (state) => state.classrooms.map(c => ({ label: c.name, value: c.code }))
  },
  actions: {
    async fetchClassrooms() {
      const res = await api.get('/classrooms')
      this.classrooms = res.data.data
    },
    async newClassroom(payload) {
      await api.post('/classrooms', payload)
    }
  },
});
