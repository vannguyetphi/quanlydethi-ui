<script setup>
import { inject, ref, watch } from 'vue'
import { storeToRefs } from "pinia";
import { useQuestionStore } from 'stores/question'

const examInfo = inject('examInfo')

const questionStore = useQuestionStore()
const examDetails = storeToRefs(questionStore).questionTransform
const tab = ref('')
const isActive = inject('detailView')
</script>

<template lang="pug">
q-dialog(v-model="isActive" full-width)
  q-card
    q-card-section
      .text-h6 Xem chi tiết đề thi

    q-separator

    q-card-section.scroll(class="max-h-[50vh]")
      .row
        .col-6
          .text-h6 {{ examInfo.lessonName }}
        .col-6
          .flex.w-full.justify-end
            .text-h6
              span
                q-icon(name='o_timer' color="primary")
              span.ml-2 Thoi gian:
            .text-h6.ml-2 {{ examInfo.answerTime }} phút
        .col-12
          .text-h6(v-if="Object.keys(examDetails).length === 0") Chưa thêm môn thi
          div(v-else)
            q-tabs.mt-5(
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
            )
              q-tab(:name="subject[0].name" :label="subject[0].name" v-for="subject in examDetails" :key="subject")

            q-separator

            q-tab-panels(v-model="tab" animated)
              q-tab-panel(:name="subject[0].name" v-for="subject in examDetails" :key="subject")
                div(v-for="sub in subject")
                  .text-h6 {{ sub.title }}: {{ sub.content }}
                  p.mt-4
                    strong Đáp án A:
                    span.ml-1 {{ sub.A }}
                  p.mt-4
                    strong Đáp án B:
                    span.ml-1 {{ sub.B }}
                  p.mt-4
                    strong Đáp án C:
                    span.ml-1 {{ sub.C }}
                  p.mt-4
                    strong Đáp án D:
                    span.ml-1 {{ sub.D }}
                  p.mt-4.text-bold Câu trả lời đúng: {{ sub.answer }}

                  q-separator.mt-4


    q-card-actions.justify-end
      q-btn(flat label="Đóng" color="red" v-close-popup)
      q-btn(flat label="Xác nhận" color="primary" v-close-popup)
</template>

<style scoped lang="sass">

</style>
