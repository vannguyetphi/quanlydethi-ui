<script setup>
import { inject, ref } from 'vue'
import { storeToRefs } from "pinia";
import { useExamStore } from "stores/exam";

const examStore = useExamStore()
const exams = storeToRefs(examStore).exams

console.log(exams)

const isActive = inject('isExamDetailActive')
</script>

<template lang="pug">
q-dialog(v-model="isActive" full-width)
  q-card
    q-card-section
      .text-h6 Thêm chi tiết đề thi

    q-separator

    q-card-section.scroll(class="max-h-[50vh]")
      .row
        q-select(label="2123" outlined)

    q-card-actions.justify-end
      q-btn(flat label="Đóng" color="red" v-close-popup)
      q-btn(flat label="Xác nhận" color="primary" v-close-popup)
</template>

<style scoped lang="sass">

</style>
