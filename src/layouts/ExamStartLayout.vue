<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useExamStore } from "stores/exam";
import { useStudentStore } from "stores/student";
import { useQuestionStore } from "stores/question";
import useTimers from "src/composables/useTimer";
import ExamExpired from "components/dialog/ExamExpired.vue";

const route = useRoute();
const router = useRouter();
const timers = useTimers();
const examStore = useExamStore();
const studentStore = useStudentStore();
const student = storeToRefs(studentStore).student;
const questionStore = useQuestionStore();
const exam = storeToRefs(examStore).exam;
const examSubjects = storeToRefs(examStore).examSubjects;
const examState = storeToRefs(examStore).examState;
const drawer = ref(false);
const examId = route.params.examId || "";
const loading = ref(false);
const examExpired = ref(null);
const examExpiredTimeout = ref(null);
const pickSubject = (subject) => {
  examStore.setExamState(subject.code);
  router.push({ name: "StudentExamStart", params: { subject: subject.id } });
  if (examStore.examSubjectDone.length === 0)
    timers.addTimer({ minutes: +exam.value.answerTime * 60 });
};
onMounted(async () => {
  loading.value = true;
  await Promise.all([
    examStore.getExam(examId),
    examStore.getExamSubjects({ examId }),
  ]);
  timers.countdown.value = exam.value.answerTime + ": 00";
  loading.value = false;
});
onUnmounted(() => {
  timers.countdown.value = exam.value.answerTime + ": 00";
  timers.clearTimer();
});
watch(
  () => timers.isTimeout.value,
  () => {
    examExpired.value.dialog.open();
    examStore.addExpiredExam(exam.value.id);
    timers.isTimeout.value = false;
    examExpiredTimeout.value = setTimeout(() => {
      examExpired.value.dialog.close();
      router.push({ name: "StudentExamPicker" });
    }, 3000);
  }
);
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
          @click="pickSubject(exSub)"
          :class="{'bg-secondary text-white': +$route.params.subject === exSub.id}"
          :disable="!examState[exSub.code].active"
        )
          q-item-section.text-h6  {{ exSub.name }}
        q-item(
          clickable
          v-ripple
          @click="$router.push({ name: 'StudentExamPicker' })"
        )
          q-item-section.text-negative.text-h6  Quay lại
          q-icon(name="chevron_left" size="40px" color="negative")
    q-img.absolute-top(src='~assets/bg.jpg' style='height: 150px')
      .absolute-bottom.bg-transparent
        div
          q-chip(color="secondary" text-color="white") SBD: {{ student.candidateNumber }}
        div
          q-chip(color="secondary" text-color="white") Lớp: {{ student.className }}
        div
          q-chip(color="secondary" text-color="white") Tên: {{ student.fullName }}
  q-page-container
    q-page(padding)
      .flex.items-center.justify-end(v-if="exam")
        .text-h6.mr-4 {{ timers.countdown }}
        q-icon(name="o_timer" size="xl" color="primary")
      router-view

  exam-expired(ref="examExpired")
</template>

<style scoped lang="sass">
.active
  background: red
</style>
