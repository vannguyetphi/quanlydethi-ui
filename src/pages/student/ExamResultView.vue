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
const markCorrectAnswer  = (q, a, h) => {
  const _q = q.toLowerCase()
  const _a = a.toLowerCase()

  if (_q.length === 1) return _q.indexOf(h) !== -1
  return _q.split(',').includes(h)
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
  q-card.card.mt-12
    q-tabs.text-white(v-model='tab' dense active-color='secondary' indicator-color='secondary' align='justify' narrow-indicator)
      q-tab.text-2xl.font-bold(:name='ex[0].subjectName' v-for="ex in results" :key="ex")
        p.py-4 {{ ex[0].subjectName }}

    q-separator

    q-tab-panels(v-model='tab' animated)
      q-tab-panel(v-for="ex in results" :key="ex" :name='ex[0].subjectName')
        div(v-for="q in ex" :key="q.id")
          .text-h6 {{ q.questionTitle }}: {{ q.questionContent }}
          p(:class="{'text-secondary': markCorrectAnswer(q.questionAnswer, q.studentAnswer, 'a')}") A: {{ q.answerA }}
          p(:class="{'text-secondary': markCorrectAnswer(q.questionAnswer, q.studentAnswer, 'b')}") B: {{ q.answerB }}
          p(:class="{'text-secondary': markCorrectAnswer(q.questionAnswer, q.studentAnswer, 'c')}") C: {{ q.answerC }}
          p(:class="{'text-secondary': markCorrectAnswer(q.questionAnswer, q.studentAnswer, 'd')}") D: {{ q.answerD }}
</template>

<style scoped lang="sass">
.card
  background: rgba( 255, 255, 255, 0.1 )
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )
  backdrop-filter: blur( 4px )
  -webkit-backdrop-filter: blur( 4px )
  border-radius: 10px
  border: 1px solid rgba( 255, 255, 255, 0.18 )
</style>
