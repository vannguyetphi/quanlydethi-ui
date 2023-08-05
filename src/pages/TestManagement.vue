<script setup>
import { ref, provide, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useExamStore } from "stores/exam";
import { useSubjectStore } from "stores/subject";
import { useQuestionStore } from "stores/question";
import moment from "moment";
import AddTestDialog from "components/AddTestDialog.vue";
import AddQuestionDialog from "components/AddQuestionDialog.vue";
import ExamViewDialog from "components/ExamViewDialog.vue";

const examStore = useExamStore();
const subjectStore = useSubjectStore();
const questionStore = useQuestionStore();
const lessons = storeToRefs(examStore).exams;
const examInfo = ref({});
const openTestDialog = ref(false);
const openQuestionDialog = ref(false);
const detailView = ref(false);
const columns = [
  {
    name: "name",
    required: true,
    label: "ID",
    align: "left",
    field: (row) => row.id,
    sortable: true,
  },
  { name: "lessonName", label: "Tên", field: "lessonName", sortable: true },
  { name: "name", label: "Người tạo", field: "name", sortable: true },
  {
    name: "created_at",
    label: "Ngày tạo",
    field: "created_at",
    sortable: true,
    format: (val) => moment(val).format("MM-DD-YYYY"),
  },
  {
    name: "updated_at",
    label: "Ngày sửa",
    field: "updated_at",
    sortable: true,
    format: (val) => moment(val).format("MM-DD-YYYY"),
  },
];

const rowClick = async (_, row) => {
  examInfo.value = row;
  detailView.value = !detailView.value;
  await questionStore.getExamQuestions({ examId: row.id });
};

provide("isTestActive", openTestDialog);
provide("isQuestionActive", openQuestionDialog);
provide("detailView", detailView);
provide("examInfo", examInfo);

onMounted(async () => {
  await Promise.all([
    examStore.getExams(),
    subjectStore.getSubjects(),
    questionStore.getQuestions(),
  ]);
});
</script>

<template lang="pug">
.mt-12
  h2.text-center.text-5xl Quản lý đề thi
  .text-right.px-5
    q-btn(label="Quay về" to="/" color="primary" icon="arrow_back" )
  .row.items-center.bg-purple.p-5(class="mt-[50px]")
    .col-4
        q-input(label="Tìm kiếm" filled bg-color="white")
          template(#prepend)
              q-icon(name="search")
    .col-8
      .flex.justify-between.px-8
        q-btn(label="Thêm đề thi" no-caps color="primary" @click="openTestDialog = !openTestDialog" size="lg")
  q-table(
    title="Đề thi"
    :rows="lessons"
    :columns="columns"
    row-key="name"
    @row-click="rowClick"
  )

  add-test-dialog
  add-question-dialog
  exam-view-dialog
</template>

<style scoped lang="sass"></style>
