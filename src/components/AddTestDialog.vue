<script setup>
import { inject } from 'vue'
const isTestActive = inject('isTestActive')
const isQuestionActive = inject('isQuestionActive')
const columns = [
  {
    name: 'name',
    required: true,
    label: 'ID',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Nội dung', field: 'calories', sortable: true },
  { name: 'fat', label: 'Người tạo', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Ngày tạo', field: 'carbs' },
  { name: 'protein', label: 'Ngày sửa', field: 'protein' },
]
const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
]
</script>

<template lang="pug">
q-dialog(v-model="isTestActive" full-width)
  q-card
    q-card-section
      .text-h6 Thêm đề thi

    q-separator

    q-card-section.scroll(class="max-h-[50vh]")
      q-form
        .row.items-center
          .col-3
            q-input(label="Tên đề thi" outlined)
          .col-3
            q-input.ml-4(label="Thời gian (giây)" outlined type="number")
          .col-3
            q-btn.ml-4(label="Thêm câu hỏi" color="primary" @click="isQuestionActive = !isQuestionActive")

    q-card-section
      q-table(
        title="Câu hỏi"
        :rows="rows"
        :columns="columns"
        row-key="name"
      )

    q-card-actions.justify-end
      q-btn(flat label="Đóng" color="red" v-close-popup)
      q-btn(flat label="Xác nhận" color="primary" v-close-popup)
</template>

<style scoped lang="sass">

</style>
