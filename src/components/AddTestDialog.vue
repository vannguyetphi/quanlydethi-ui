<script setup>
import { provide, inject, ref } from 'vue'
import { api } from "boot/axios";
import moment from 'moment'
import { useExamStore } from "stores/exam";
import { useSubjectStore } from "stores/subject";
import { useQuestionStore } from "stores/question";
import { storeToRefs } from "pinia";
import ExamDetailDialog from "components/ExamDetailDialog.vue";
import AddSubjectDialog from "components/AddSubjectDialog.vue";

const examStore = useExamStore()
const subjectStore = useSubjectStore()
const questionStore = useQuestionStore()
const exams = storeToRefs(examStore).examOpts
const subjects = storeToRefs(subjectStore).subjectOpts
const questions = storeToRefs(questionStore).questions

const examName = ref('')
const examDuration = ref(0)
const examSelector = ref(null)
const subjectSelector = ref(null)
const isExamDetailActive = ref(false)
const subjectDialog = ref(true)

const isTestActive = inject('isTestActive')
const isQuestionActive = inject('isQuestionActive')

const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: row => row.id,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'title', align: 'left', label: 'Tiêu đề', field: 'title', sortable: true },
  { name: 'content',
    align: 'left',
    label: 'Nội dung',
    field: 'content',
    sortable: true,
    style: 'width: 300px',
    format: val => val.split(' ').slice(0, 10).join(' ') + '...'
  },
  { name: 'type',
    align: 'left',
    label: 'Loại câu hỏi',
    field: 'type',
    sortable: true,
    format: val => val === 1 ? 'Lý thuyết' : 'Thực hành'
  },
  { name: 'answer',
    align: 'left',
    label: 'Đáp án',
    field: 'answer',
  },
  { name: 'created_at', label: 'Ngày tạo', field: 'created_at', format: val => moment(val).format('MM-DD-YYYY') },
  { name: 'updated_at', label: 'Ngày sửa', field: 'updated_at', format: val => moment(val).format('MM-DD-YYYY') },
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
const addSubjectToExam = async () => {
  const data = {
    examId: examSelector.value.value,
    subjectId: subjectSelector.value.value,
  }
  await subjectStore.addSubjectToExam(data)
}

provide('isExamDetailActive', isExamDetailActive)
provide('subjectDialog', subjectDialog)
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
            q-btn(label="Thêm" color="primary" @click="addSubjectToExam")
          .col-12
            q-btn(label="Thêm môn học" color="primary" @click="subjectDialog = !subjectDialog")
            q-btn.ml-4(label="Thêm câu hỏi" color="primary" @click="isQuestionActive = !isQuestionActive")
            q-btn.ml-4(label="Thêm chi tiết đề thi" color="primary" @click="isExamDetailActive = !isExamDetailActive")

    q-card-section
      q-table(
        title="Câu hỏi"
        :rows="questions"
        :columns="columns"
        row-key="name"
        wrap-cells
      )

    q-card-actions.justify-end
      q-btn(flat label="Đóng" color="red" v-close-popup)
      q-btn(flat label="Xác nhận" color="primary" v-close-popup)

  exam-detail-dialog
  add-subject-dialog
</template>

<style scoped lang="sass">

</style>
