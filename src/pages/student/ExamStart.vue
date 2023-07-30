<script setup>
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuestionStore } from 'stores/question'
import { useRoute } from 'vue-router'

const route = useRoute()
const questionStore = useQuestionStore()
const questions = storeToRefs(questionStore).examSubjectQuestions
const loading = ref(false)
watch(()=> route.params, async (v) => {
  loading.value = true
  await questionStore.getExamSubjectQuestions({ examId: +v.examId, subjectId: +v.subject })
  loading.value = false
})
onMounted(async () => {
  loading.value = true
  const v = route.params
  await questionStore.getExamSubjectQuestions({ examId: +v.examId, subjectId: +v.subject })
  loading.value = false
})
</script>

<template lang="pug">
div
  .text-center(v-if="loading")
    q-spinner-hourglass(size="xl" color="primary")
  q-list(v-else)
    div(v-for="q in questions" :key="q")
      q-item-section
        .text-h6 {{ q.title }}: {{ q.content }}
      q-item(clickable v-ripple)
        q-item-section
          .text-lg A: {{ q.A }}
          .text-right
            q-checkbox
      q-item(clickable v-ripple)
        q-item-section
          .text-lg B: {{ q.B }}
          .text-right
            q-checkbox
      q-item(clickable v-ripple)
        q-item-section
          .text-lg C: {{ q.C }}
          .text-right
            q-checkbox
      q-item(clickable v-ripple)
        q-item-section
          .text-lg D: {{ q.D }}
          .text-right
            q-checkbox
</template>

<style scoped lang="sass">

</style>
