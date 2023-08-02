<script setup>
import { ref, inject,  reactive } from 'vue'
import { Notify } from 'quasar'
import { useQuestionStore } from "stores/question";

const questionStore = useQuestionStore()
const isActive = inject('isQuestionActive')
const model = ref([])
const options = [
  {
    label: 'A',
    value: 'A'
  },
  {
    label: 'B',
    value: 'B'
  },
  {
    label: 'C',
    value: 'C'
  },
  {
    label: 'D',
    value: 'D'
  }
]
const questionObj = reactive({
  title: '',
  content: '',
  type: '',
  level: '',
  A: '',
  B: '',
  C: '',
  D: '',
  answer: '',
  img: ''
})
const loading = ref(false)
const validInputs= () => {
  return questionObj.title &&
    questionObj.content &&
    questionObj.type &&
    questionObj.A &&
    questionObj.B &&
    questionObj.C &&
    questionObj.D &&
    model.value.join(',')
}
const newQuestion = async () => {
  loading.value = true
  questionObj.answer = model.value.join(',')
  questionObj.type = questionObj.type.value
  await questionStore.newQuestion(questionObj)
  await questionStore.getQuestions()
  questionObj.title = ''
  questionObj.content = ''
  questionObj.type = ''
  questionObj.level = ''
  questionObj.A = ''
  questionObj.B = ''
  questionObj.C = ''
  questionObj.D = ''
  questionObj.answer = ''
  questionObj.img = ''
  loading.value = false

  Notify.create({
    type: 'positive',
    position: 'top',
    message: 'Thêm câu hỏi thành công'
  })
}
</script>

<template lang="pug">
q-dialog(v-model="isActive" full-width)
  q-card
    q-card-section
      .text-h6 Thêm câu hỏi

    q-separator

    q-card-section.scroll(class="max-h-[50vh]")
      q-form
        .row.items-center.q-col-gutter-md
          .col-4
            q-input(label="Tên câu hỏi" outlined v-model="questionObj.title")
          .col-4
            q-select(
              label="Loại câu hỏi"
              outlined
              :options='[{ label: "Lý thuyết", value: 1 }, { label: "Thực hành", value: 2}]'
              v-model="questionObj.type"
            )
          .col-4
            q-select(
              v-model="model"
              label="Đáp án"
              outlined
              :options='options'
              multiple
              emit-value
              map-options
            )
              template(#option="{ itemProps, opt, selected, toggleOption }")
                q-item(v-bind="itemProps")
                  q-item-section
                    q-item-label(v-html="opt.label")
                  q-item-section(side)
                    q-toggle(:model-value="selected" @update:model-value="toggleOption(opt)")
          .col-12
            q-input(label="Nội dung" type="textarea" outlined v-model="questionObj.content" )
          .col-6
            q-input(label="A" type="textarea" outlined v-model="questionObj.A" )
          .col-6
            q-input(label="B" type="textarea" outlined v-model="questionObj.B" )
          .col-6
            q-input(label="C" type="textarea" outlined v-model="questionObj.C" )
          .col-6
            q-input(label="D" type="textarea" outlined v-model="questionObj.D" )
          .col-12.text-right
            q-btn(label="Thêm" color="primary"  @click="newQuestion" :disable="!validInputs() || loading" :loading="loading")
    q-card-actions.justify-end
      q-btn(flat label="Đóng" color="red" v-close-popup)
      q-btn(flat label="Xác nhận" color="primary" v-close-popup)
</template>

<style scoped lang="sass">

</style>
