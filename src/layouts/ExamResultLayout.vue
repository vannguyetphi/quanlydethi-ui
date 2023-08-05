<script setup>
import { ref, onMounted, watch } from "vue";
import { useExamStore } from "stores/exam";
import { useStudentStore } from "stores/student";

const examStore = useExamStore();
const studentStore = useStudentStore();
const student = studentStore.student;

onMounted(async () => {
  await examStore.getExamResults({ studentId: student.id });
});
</script>

<template lang="pug">
q-layout.shadow-2.rounded-borders.h-screen(view='lHh Lpr lff' container)
  q-drawer(v-model='drawer' show-if-above :width='300' :breakpoint='400' class="bg-[#242529]")
    q-scroll-area(style='height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd')
      .p-4.text-right
        q-btn(label="Quay lại" color="negative" unelevated @click="$router.back()" rounded)

    q-img.absolute-top(src='~assets/bg.jpg' style='height: 150px')
  q-page-container
    q-page(class="bg-[#242529]" padding)
      router-view
</template>
