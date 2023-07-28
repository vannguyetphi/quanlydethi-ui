<script setup>
import { inject, ref } from 'vue';
import moment from "moment/moment";
import { useQuestionStore } from "stores/question";
import { storeToRefs } from "pinia";

const emit = defineEmits(['setSelected'])
const questionStore = useQuestionStore()
const questions = storeToRefs(questionStore).questions
const selected = ref([])
const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: row => row.id,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'title', align: 'left', label: 'Tiêu đề', field: 'title', sortable: true },
  { name: 'content',
    align: 'left',
    label: 'Nội dung',
    field: 'content',
    sortable: true,
    style: 'width: 300px',
    format: val => val.split(' ').slice(0, 10).join(' ') + '...'
  },
  { name: 'type',
    align: 'left',
    label: 'Loại câu hỏi',
    field: 'type',
    sortable: true,
    format: val => val === 1 ? 'Lý thuyết' : 'Thực hành'
  },
  { name: 'answer',
    align: 'left',
    label: 'Đáp án',
    field: 'answer',
  },
  { name: 'created_at', label: 'Ngày tạo', field: 'created_at', format: val => moment(val).format('MM-DD-YYYY') },
  { name: 'updated_at', label: 'Ngày sửa', field: 'updated_at', format: val => moment(val).format('MM-DD-YYYY') },
]
const confirm = async () => {
  emit('setSelected', selected)
  selected.value = []
}
const isActive = inject('isQuestionActive')
</script>

<template lang="pug">
q-dialog(v-model="isActive" full-width)
  q-card
    .text-lg.px-5.pt-5 Câu hỏi
    q-card-section.shadow-none
      q-table(
        :rows="questions"
        :columns="columns"
        row-key="id"
        selection="multiple"
        v-model:selected="selected"
        wrap-cells
      )
      .mt-5.text-right
        q-btn(label="Xác nhận" color="primary" @click="confirm" v-close-popup)
</template>

<style scoped lang="sass">

</style>
