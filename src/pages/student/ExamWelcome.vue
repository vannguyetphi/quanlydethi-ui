<script setup>
import { storeToRefs } from "pinia";
import { useExamStore } from "stores/exam";

const examStore = useExamStore();
const exam = storeToRefs(examStore).exam;
</script>

<template lang="pug">
div(v-if="exam")
  .text-center.text-5xl Đề thi {{ exam.lessonName }}
  .mt-4
    .text-h6 - Thời gian làm bài {{ exam.answerTime }} phút
    .text-h6.mt-4 - Chọn môn học để bắt đầu làm
</template>

<style scoped lang="sass"></style>
