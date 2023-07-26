<script setup>
import { ref, provide, onMounted } from 'vue'
import moment from 'moment'
import { api } from 'boot/axios'
import AddTestDialog from "components/AddTestDialog.vue";
import AddQuestionDialog from "components/AddQuestionDialog.vue";

const lessons = ref([])
const openTestDialog = ref(false)
const openQuestionDialog = ref(false)
const columns = [
  {
    name: 'name',
    required: true,
    label: 'ID',
    align: 'left',
    field: row => row.id,
    sortable: true
  },
  { name: 'lessonName',
    label: 'Tên',
    field: 'lessonName',
    sortable: true
  },
  { name: 'userCreatedId',
    label: 'Người tạo',
    field: 'userCreatedId',
    sortable: true
  },
  { name: 'created_at',
    label: 'Ngày tạo',
    field: 'created_at',
    sortable: true,
    format: val => moment(val).format('MM-DD-YYYY')
  },
  { name: 'updated_at',
    label: 'Ngày sửa',
    field: 'updated_at',
    sortable: true,
    format: val => moment(val).format('MM-DD-YYYY')
  },
]
const getLessons = async () => {
  const res = await api.get('/lessons');
  lessons.value = res.data
}
console.log(moment('2023-07-25T12:39:06.000000Z'))
provide('isTestActive', openTestDialog)
provide('isQuestionActive', openQuestionDialog)

onMounted(async () => {
  await getLessons()
})
</script>

<template  lang="pug">
.mt-12
  h2.text-center.text-5xl Quản lý đề thi
  .row.items-center.bg-purple.p-5(class="mt-[50px]")
    .col-4
        q-input(label="Tìm kiếm" filled bg-color="white")
          template(#prepend)
              q-icon(name="search")
    .col-8
      .flex.justify-between.px-8
        q-btn(label="Thêm" no-caps color="primary" @click="openTestDialog = !openTestDialog")
        q-btn(label="Sửa" no-caps color="secondary")
        q-btn(label="Xóa" no-caps color="red")
        q-btn(label="Đảo đề" no-caps color="warning")
  q-table(
    title="Đề thi"
    :rows="lessons"
    :columns="columns"
    row-key="name"
  )

  add-test-dialog
  add-question-dialog
</template>

<style scoped lang="sass">

</style>
