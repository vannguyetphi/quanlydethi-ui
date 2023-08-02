<script setup>
import { ref, reactive } from 'vue'
import { useClassroomStore } from 'stores/classroom'
import BaseDialog from "components/dialog/BaseDialog.vue";
import {Notify} from "quasar";

const dialog = ref(null)
const classroomStore = useClassroomStore()
const loading = ref(false)
const classObj = reactive({
  name: '',
  code: ''
})
const confirm = async () => {
  loading.value = true
  await classroomStore.newClassroom(classObj)
  await classroomStore.fetchClassrooms()
  loading.value = false

  Notify.create({
    type: 'positive',
    message: 'Thêm lớp mới thành công',
    position: 'top',
  })
  dialog.value.close()
}

defineExpose({
  dialog
})
</script>

<template lang="pug">
base-dialog(:fullWidth="true" :btnState="{ disable: !classObj.name || !classObj.code, loading }" @confirm="confirm" ref="dialog")
  q-card-section
    .text-h6.mb-5 Thêm lớp mới
    .row.q-col-gutter-md
      .col-6
        q-input(outlined label="Tên lớp" v-model="classObj.name")
      .col-6
        q-input(outlined label="Mã lớp" v-model="classObj.code")
</template>

<style scoped lang="sass">

</style>
