<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useExamStore } from 'stores/exam'
import { useQuestionStore } from 'stores/question'

const route = useRoute()
const router = useRouter()
const examStore = useExamStore()
const questionStore = useQuestionStore()
const exam = storeToRefs(examStore).exam
const examSubjects = storeToRefs(examStore).examSubjects
const drawer = ref(false)
const examId = route.params.examId || ''
const loading = ref(false)
const pickSubject = (id) => {
  router.push({ name: 'StudentExamStart', params: { subject: id } })
}
onMounted(async () => {
  loading.value = true
  await Promise.all([examStore.getExam(examId), examStore.getExamSubjects({ examId })])
  loading.value = false
})
</script>

<template lang="pug">
q-layout.shadow-2.rounded-borders.h-screen(view='lHh Lpr lff' container)
  q-header.bg-cyan-8(elevated)
    q-toolbar.p-4
      q-toolbar-title.flex.items-center
        q-avatar(size="40px")
          img(src='~assets/logo.png')
        span.ml-2 Trường hạ sĩ quan xe tăng 1
      q-btn(flat @click='drawer = !drawer' round dense icon='menu')
  q-drawer(v-model='drawer' show-if-above :width='300' :breakpoint='400')
    q-scroll-area(style='height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd')
      q-spinner-hourglass.mt-5(size='lg' color='secondary' v-if="loading")
      q-list(padding separator v-else)
        q-item(
          clickable
          v-ripple
          v-for="exSub in examSubjects" :key="exSub.id"
          @click="pickSubject(exSub.id)"
          :class="{'bg-secondary text-white': +$route.params.subject === exSub.id}"
        )
          q-item-section.text-h6  {{ exSub.name }}
    q-img.absolute-top(src='~assets/bg.jpg' style='height: 150px')
      .absolute-bottom.bg-transparent
        div
          q-chip(color="secondary" text-color="white") SBD: 3507
        div
          q-chip(color="secondary" text-color="white") Lớp: BTR 152
        div
          q-chip(color="secondary" text-color="white") Tên: Đặng Thái Vũ Minh Châu
  q-page-container
    q-page(padding)
      .flex.items-center.justify-end(v-if="exam")
        .text-h6.mr-4 {{ exam.answerTime }} : 00
        q-icon(name="o_timer" size="xl" color="primary")
      router-view

</template>

<style scoped lang="sass">
.active
  background: red
</style>
