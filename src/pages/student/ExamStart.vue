<script setup>
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useExamStore } from 'stores/exam'
import { useQuestionStore } from 'stores/question'
import { useStudentStore } from 'stores/student'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import ConfirmDialog from "components/dialog/ConfirmDialog.vue";
import {Notify} from "quasar";

const route = useRoute()
const router = useRouter()
const examStore = useExamStore()
const questionStore = useQuestionStore()
const studentStore = useStudentStore()
const questions = storeToRefs(questionStore).examSubjectQuestions
const studentAnswers = ref([])
const loading = ref(false)
const confirmDialog = ref(null)
const generateStudentAnswerHolder = () => {
  studentAnswers.value = questions.value.map(q => {
    return {
      examId: q.examId,
      subjectId: q.subjectId,
      subjectCode: q.code,
      questionId: q.questionId,
      answer: { a: false, b: false, c: false, d: false }
    }
  })
}
const canSubmit = () => studentAnswers.value.every(sa => sa.answer.a || sa.answer.b || sa.answer.c || sa.answer.d)

watch(()=> route.params, async (v) => {
  loading.value = true
  await questionStore.getExamSubjectQuestions({ examId: +v.examId, subjectId: +v.subject })
  loading.value = false
  generateStudentAnswerHolder()
})
onMounted(async () => {
  loading.value = true
  const v = route.params
  await questionStore.getExamSubjectQuestions({ examId: +v.examId, subjectId: +v.subject })
  loading.value = false
  generateStudentAnswerHolder()
})
const submitting = ref(false)
const confirm = async () => {
  confirmDialog.value.loading = true

  const promises = studentAnswers.value.map(sa => {
    const obj = {
      examId: sa.examId,
      subjectId: sa.subjectId,
      questionId: sa.questionId,
      studentId: studentStore.student.id,
      answer: Object.keys(sa.answer).map(k => {
        if (sa.answer[k]) return k
        return 'NA'
      }).filter(a => a !== 'NA').join(',')
    }

    return studentStore.submitAnswers(obj)
  })
  await Promise.all(promises)

  confirmDialog.value.loading = false
  confirmDialog.value.close()

  Notify.create({
    type: 'positive',
    position: 'top',
    message: 'Nộp bài thành công'
  })
  examStore.setExamSubjectDone(studentAnswers.value[0].subjectCode)
  examStore.markExamState()

  const v = route.params
  router.push({ name: 'StudentExamWelcome', params: { subject: v.subject } })
}
</script>

<template lang="pug">
div
  .text-center(v-if="loading")
    q-spinner-hourglass(size="xl" color="primary")
  q-list(v-else)
    .mt-4(v-for="(q, i) in questions" :key="q")
      q-item-section
        .text-h6 {{ q.title }}: {{ q.content }}
      q-item(tag='label' v-ripple)
        q-item-section
          q-item-label
            .text-lg A: {{ q.A }}
        q-item-section(avatar top v-if="studentAnswers[i]")
          q-checkbox(v-model='studentAnswers[i].answer.a')

      q-item(tag='label' v-ripple)
        q-item-section
          q-item-label
            .text-lg B: {{ q.B }}
        q-item-section(avatar top v-if="studentAnswers[i]")
          q-checkbox(v-model='studentAnswers[i].answer.b')

      q-item(tag='label' v-ripple)
        q-item-section
          q-item-label
            .text-lg C: {{ q.C }}
        q-item-section(avatar top v-if="studentAnswers[i]")
          q-checkbox(v-model='studentAnswers[i].answer.c')

      q-item(tag='label' v-ripple)
        q-item-section
          q-item-label
            .text-lg D: {{ q.D }}
        q-item-section(avatar top v-if="studentAnswers[i]")
          q-checkbox(v-model='studentAnswers[i].answer.d')


  .text-right.mt-5(v-if="(questions && questions.length > 0 ) && !loading")
    q-btn(
      label="Nộp bài"
      color="primary"
      :disable="!canSubmit()"
      @click="confirmDialog.open()"
    )

  confirm-dialog(
    :title="'Xác nhận nộp bài?'"
    @confirm='confirm'
    ref="confirmDialog"
  )
</template>

<style scoped lang="sass">

</style>
