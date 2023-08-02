<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useClassroomStore } from "stores/classroom";
import moment from 'moment'
import AddClassroomDialog from "components/dialog/AddClassroomDialog.vue";

const dialog = ref(null)
const classroomStore = useClassroomStore()
const classrooms = storeToRefs(classroomStore).classrooms
const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: row => row.id,
    sortable: true
  },
  { name: 'name',
    label: 'Lớp',
    field: 'name',
    sortable: true
  },
  { name: 'code',
    label: 'Mã lớp',
    field: 'code',
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

onMounted(async() => {
  await classroomStore.fetchClassrooms()
})
</script>

<template lang="pug">
.p-5
  .text-right.mb-5
    q-btn(label="Thêm" color="primary" @click="dialog?.dialog.open()")
  q-table(
    title="Lớp học"
    :rows="classrooms"
    :columns="columns"
    row-key="name"
  )

  add-classroom-dialog(ref="dialog")
</template>

<style scoped lang="sass">

</style>
