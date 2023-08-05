<script setup>
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useExamStore } from 'stores/exam'
import { useStudentStore } from 'stores/student'

const examStore = useExamStore()
const examResults = storeToRefs(examStore).examResults
const { loader } = storeToRefs(examStore)
</script>

<template lang="pug">
.text-white
  .text-h4 Kết quả thi
  .flex.items-center.mt-12(v-if="loader?.results")
    .text.white.text-h6 Đang lấy kết quả...
    .ml-5
      q-spinner-hourglass(color="primary" size="30px")
  .row.q-col-gutter-md.mt-5
    .col-4(v-for="exam in examResults" :key="exam")
      q-card.card
        q-card-section
          .flex.items-center.justify-between
            .text-h5 {{ exam[0].lessonName }}
            q-avatar(size="40px")
              img(src="~assets/logo.png")
          .mt-5.text-center
            q-btn(
              label="Xem chi tiết"
              color="primary"
              size="md"
              rounded
              unelevated
              :to="{ name: 'ExamResultView', params: { examId: exam[0].examId } }"
            )
</template>

<style scoped lang="sass">
.card
  background: rgba( 255, 255, 255, 0.25 )
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )
  backdrop-filter: blur( 4px )
  -webkit-backdrop-filter: blur( 4px )
  border-radius: 10px
  border: 1px solid rgba( 255, 255, 255, 0.18 )
</style>
