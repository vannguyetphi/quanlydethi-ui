<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useExamStore } from 'stores/exam'
import { useStudentStore } from 'stores/student'

const examStore = useExamStore()
const examResults = storeToRefs(examStore).examResults
</script>

<template lang="pug">
.text-white
  .text-h4 Kết quả thi
  .row.q-col-gutter-md.mt-5
    .col-4
      q-card.card(v-for="exam in examResults" :key="exam.id")
        q-card-section
          .flex.items-center.justify-between
            .text-h5 {{ exam[0].lessonName }}
            q-avatar(size="40px")
              img(src="~assets/logo.png")
          .mt-5.text-center
            q-btn(label="Xem chi tiết" color="primary" size="md" rounded unelevated)
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
