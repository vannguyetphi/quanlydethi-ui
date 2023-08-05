<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useExamStore } from 'stores/exam'
import { useStudentStore } from 'stores/student'

const route = useRoute()
const examStore = useExamStore()
const studentStore = useStudentStore()
const student =  studentStore.student
const exam = storeToRefs(examStore).examSingleResult
const results = storeToRefs(examStore).groupResult
const tab = ref('')
const markCorrectAnswer  = (q, h) => {
  const _q = q.toLowerCase()

  if (_q.length === 1) return _q.indexOf(h) !== -1
  return _q.split(',').includes(h)
}
const calcGrade = (exam, qSize) => {
  let sum = 0
  exam.forEach(ex => {
    if (ex.questionAnswer.toLowerCase() === ex.studentAnswer.toLowerCase()) sum += 1
  })
  const pointPerQ = 10 / qSize

  return sum * pointPerQ
}
onMounted(async () => {
  const examId = route.params.examId
  if (examStore.examResults.length === 0) await examStore.getExamResults({ studentId: student.id })
  examStore.setSingleResult(examId)
  tab.value = results.value[Object.keys(results.value)[0]][0].subjectName
})
</script>

<template lang="pug">
div(v-if="exam.length > 0")
  .text-4xl.text-white Kết quả thi {{ exam[0].lessonName }}
  .mt-12.row.q-col-gutter-md
    .col-12(v-for="ex in results" :key="ex")
      q-card.text-black
        q-card-section.text-4xl {{ ex[0].subjectName }}
        q-card-section.text-3xl.text-negative.font-bold Điểm: {{ calcGrade(ex, ex.length) }}
        q-card-section(v-for="q in ex" :key="q.id")
          .text-h6 {{ q.questionTitle }}: {{ q.questionContent }}
          p.text-lg(
            :class="{'text-positive font-bold': markCorrectAnswer(q.questionAnswer, 'a')}"
          ) A: {{ q.answerA }}
          p.text-lg(
            :class="{'text-positive font-bold': markCorrectAnswer(q.questionAnswer, 'b')}"
          ) B: {{ q.answerB }}
          p.text-lg(
            :class="{'text-positive font-bold': markCorrectAnswer(q.questionAnswer, 'c')}"
          ) C: {{ q.answerC }}
          p.text-lg(
            :class="{'text-positive font-bold': markCorrectAnswer(q.questionAnswer, 'd')}"
          ) D: {{ q.answerD }}
          p.text-lg.mt-4.font-bold Đáp án của bạn: {{ q.studentAnswer }}
            span.ml-2(
              :class="q.questionAnswer.toLowerCase() === q.studentAnswer.toLowerCase() ? 'text-positive' : 'text-negative'"
              ) {{ q.questionAnswer.toLowerCase() === q.studentAnswer.toLowerCase() ? 'Đúng' : 'Sai' }}
</template>
