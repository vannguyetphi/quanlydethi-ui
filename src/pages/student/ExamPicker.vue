<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useExamStore } from "stores/exam";

const examStore = useExamStore()
const router = useRouter()
const exams = storeToRefs(examStore).exams
const examExpiredList = storeToRefs(examStore).examExpired

const spinner = ref(false)
const fetchExams = async () => {
  spinner.value = true
  await examStore.getExams()
  spinner.value = false
}
const cardClick = (examId) => {
  if (examExpiredList.value.includes(examId)) return
  router.push({ name: 'StudentExamWelcome', params: { examId } })
}

onMounted(async () => {
  await fetchExams()
})
</script>

<template lang="pug">
q-layout
  q-header
    .m-header.row.items-center.justify-center.py-6
      q-avatar(size="100px")
        img(src="~assets/logo.png")
      h1.ml-12.py-5.text-6xl.text-center TRƯỜNG HẠ SỸ QUAN XE TĂNG 1
  q-page-container
    q-page.p-5
      //.text-h6.mb-5 Chọn đề thi
      .flex.items-center.mb-5(v-if="spinner")
        .text-h6.mr-4 Đang lấy dữ liệu
        q-spinner-hourglass(size="xl" color="secondary")
      .text-h6.mb-5(v-else) Chọn đề thi
      .row.q-col-gutter-md
        .col-3(v-for="exam in exams")
          q-card.h-full.text-center.cursor-pointer.duration-200(
            clickable
            v-ripple
            class="hover:bg-[#00D167] hover:text-white"
            @click="cardClick(exam.id)"
            :class="{'opacity-50 disabled': examExpiredList.includes(exam.id)}"
          )
            q-card-section.items-center.justify-center.flex.flex-col.h-full
              .text-h6 {{ exam.lessonName }}
              .text-h6.flex.items-center
                q-icon(name="o_timer" color="primary")
                span.ml-2 {{ exam.answerTime }} phút

      .mt-12
        q-btn(label="Xem kết quả thi" color="secondary" size="lg" :to="{name: 'StudentExamResult'}")
</template>

<style scoped lang="sass">
.m-header
  background: #B11818
</style>
