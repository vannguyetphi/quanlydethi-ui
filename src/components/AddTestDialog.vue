<script setup>
import { inject, ref } from 'vue'
import { api } from "boot/axios";
import { useExamStore } from "stores/exam";
import { useSubjectStore } from "stores/subject";
import { storeToRefs } from "pinia";

const examStore = useExamStore()
const subjectStore = useSubjectStore()
const exams = storeToRefs(examStore).examOpts
const subjects = storeToRefs(subjectStore).subjectOpts

const examName = ref('')
const examDuration = ref(0)
const examSelector = ref(null)
const subjectSelector = ref(null)

const isTestActive = inject('isTestActive')
const isQuestionActive = inject('isQuestionActive')

const columns = [
  {
    name: 'name',
    required: true,
    label: 'ID',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Nội dung', field: 'calories', sortable: true },
  { name: 'fat', label: 'Người tạo', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Ngày tạo', field: 'carbs' },
  { name: 'protein', label: 'Ngày sửa', field: 'protein' },
]
const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
]
const newExam = async () => {
  const data = {
    'lessonName': examName.value,
    'answerTime': +examDuration.value,
    'userCreatedId': 1
  }
  const response = await api.post('/lessons', data)
  if (response.status === 200) {
    // alert success
    examName.value = ''
    examDuration.value = 0
    await examStore.getExams()
  }
}
</script>

<template lang="pug">
q-dialog(v-model="isTestActive" full-width)
  q-card
    q-card-section
      .text-h6 Thêm đề thi

    q-separator

    q-card-section.scroll(class="max-h-[50vh]")
      q-form
        .row.items-center.q-col-gutter-md
          .col-3
            q-input(label="Tên đề thi" outlined v-model="examName")
          .col-3
            q-input(label="Thời gian (phút)" outlined type="number" v-model="examDuration")
          .col-6
            q-btn(label="Thêm" color="primary" @click="newExam" :disable="!examDuration || !examName")
          .col-12
            .text-h6 Thêm môn học vào đề thi
          .col-3
            q-select(label="Đề thi" outlined :options='exams' v-model="examSelector")
          .col-3
            q-select(label="Môn học" outlined :options='subjects' v-model="subjectSelector")
          .col-3
            q-btn(label="Thêm câu hỏi" color="primary" @click="isQuestionActive = !isQuestionActive")

    //q-card-section
      q-table(
        title="Câu hỏi"
        :rows="rows"
        :columns="columns"
        row-key="name"
      )

    q-card-actions.justify-end
      q-btn(flat label="Đóng" color="red" v-close-popup)
      q-btn(flat label="Xác nhận" color="primary" v-close-popup)
</template>

<style scoped lang="sass">

</style>
