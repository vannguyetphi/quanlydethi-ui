<script setup>
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuestionStore } from 'stores/question'
import { useRoute } from 'vue-router'
import ConfirmDialog from "components/dialog/ConfirmDialog.vue";

const route = useRoute()
const questionStore = useQuestionStore()
const questions = storeToRefs(questionStore).examSubjectQuestions
const studentAnswers = ref([])
const loading = ref(false)
const confirmDialog = ref(null)
const generateStudentAnswerHolder = () => {
  studentAnswers.value = questions.value.map(q => {
    return {
      examId: q.examId,
      subjectId: q.subjectId,
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
const confirm = () => {
  console.log(studentAnswers.value)
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
    q-btn(label="Nộp bài" color="primary" :disable="!canSubmit()" @click="confirmDialog.open()")

  confirm-dialog(
    :title="'Xác nhận nộp bài?'"
    @confirm='confirm'
    ref="confirmDialog"
  )
</template>

<style scoped lang="sass">

</style>
