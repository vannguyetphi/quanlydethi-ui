<script setup>
import { ref, inject } from 'vue'

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
            q-input(label="Tên câu hỏi" outlined)
          .col-4
            q-select(label="Loại câu hỏi" outlined :options='["Lý thuyết", "Thực hành"]')
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
            q-input(label="Nội dung" type="textarea" outlined)
          .col-6
            q-input(label="A" type="textarea" outlined)
          .col-6
            q-input(label="B" type="textarea" outlined)
          .col-6
            q-input(label="C" type="textarea" outlined)
          .col-6
            q-input(label="D" type="textarea" outlined)
    q-card-actions.justify-end
      q-btn(flat label="Đóng" color="red" v-close-popup)
      q-btn(flat label="Xác nhận" color="primary" v-close-popup)
</template>

<style scoped lang="sass">

</style>
