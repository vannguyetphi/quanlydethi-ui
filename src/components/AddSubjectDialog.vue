<script setup>
import { inject, ref, reactive } from 'vue'
import { storeToRefs } from "pinia";
import { Notify } from 'quasar'
import { useSubjectStore } from 'stores/subject'

const subjectStore = useSubjectStore()
const subject = reactive({
  name: '',
  code: ''
})
const loading = ref(false)
const addNewSubject = async () => {
  loading.value = true
  await subjectStore.addSubject(subject)
  await subjectStore.getSubjects()
  loading.value = false
  subject.name = ''
  subject.code = ''
  Notify.create({
    type: 'positive',
    message: 'Thêm môn học thành công'
  })
}
const isActive = inject('subjectDialog')
</script>

<template lang="pug">
q-dialog(v-model="isActive" full-width)
  q-card
    q-card-section
      .text-h6 Thêm môn học

    q-separator

    q-card-section.scroll(class="max-h-[50vh]")
      .row.q-col-gutter-md
        .col-6
          q-input(label="Tên môn học" outlined v-model="subject.name")
        .col-6
          q-input(label="Mã môn học" outlined v-model="subject.code" )
        .col-12
          q-btn(label="Thêm" color="primary" @click="addNewSubject" :disable="loading || (!subject.code || !subject.name)" :loading="loading")

    q-card-actions.justify-end
      q-btn(flat label="Đóng" color="red" v-close-popup)
      q-btn(flat label="Xác nhận" color="primary" v-close-popup)
</template>

<style scoped lang="sass">

</style>
