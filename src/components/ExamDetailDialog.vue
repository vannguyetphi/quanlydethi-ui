<script setup>
import { inject, ref, provide } from "vue";
import { storeToRefs } from "pinia";
import { useExamStore } from "stores/exam";
import { useQuestionStore } from "stores/question";
import QuestionsTable from "components/QuestionsTable.vue";

const examStore = useExamStore();
const questionStore = useQuestionStore();
const exams = storeToRefs(examStore).examOpts;
const examSubjects = storeToRefs(examStore).examSubjects;
const examSelector = ref(null);
const targetSubjectId = ref(null);
const targetExamId = ref(null);
const isQuestionActive = ref(false);

const onExamChange = async (v) => {
  targetExamId.value = v.value;
  await examStore.getExamSubjects({ examId: v.value });
};
const openQuestionTable = (subjectId) => {
  targetSubjectId.value = subjectId;
  isQuestionActive.value = !isQuestionActive.value;
};
const handleSelectedLoading = ref(false);
const handleSelected = async (data) => {
  handleSelectedLoading.value = true;
  const questionIds = data.value.map((d) => d.id);
  await questionStore.addQuestionToExam({
    examId: targetExamId.value,
    subjectId: targetSubjectId.value,
    questionIds,
  });
  handleSelectedLoading.value = false;
  isQuestionActive.value = false;
};
const isActive = inject("isExamDetailActive");
provide("isQuestionActive", isQuestionActive);
provide("handleSelectedLoading", handleSelectedLoading);
</script>

<template lang="pug">
q-dialog(v-model="isActive" full-width)
  q-card
    q-card-section
      .text-h6 Thêm chi tiết đề thi

    q-separator

    q-card-section.scroll(class="max-h-[50vh]")
      .row.q-col-gutter-md
        .col-3
          q-select(label="Chọn đề thi" outlined :options="exams" v-model="examSelector" @update:model-value="onExamChange")
        .col-12
          q-list(bordered v-if="examSubjects.length > 0")
            q-item.q-my-sm(v-for="subject in examSubjects" :key="subject.subjectId")
              q-item-section
                q-item-label {{ subject.name }}
              q-item-section(side)
                q-btn(color="primary" label="Thêm câu hỏi" no-caps unelevated @click="openQuestionTable(subject.subjectId)")
          h3.text-lg(v-else) Không có môn học cho đề thi này
          questions-table(@setSelected="handleSelected")

    q-card-actions.justify-end
      q-btn(flat label="Đóng" color="red" v-close-popup)
      q-btn(flat label="Xác nhận" color="primary" v-close-popup)
</template>

<style scoped lang="sass"></style>
