<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStudentStore } from 'stores/student'
import {Notify} from "quasar";

const router = useRouter()
const studentStore = useStudentStore()
const student = reactive({
  fullName: '',
  candidateNumber: '',
  classId: ''
})
const classList = [
  {
    label: 'BTR 60PB',
    value: 'btr60pb'
  },
  {
    label: 'BTR DM2',
    value: 'btrdm2'
  },
  {
    label: 'BTR 152',
    value: 'btr152'
  }
]
const loading = ref(false)
const register = async () => {
  loading.value = true
  student.classId = student.classId.value
  await studentStore.register(student)
  router.push({ name: 'StudentExamPicker' })
  Notify.create({
    type: 'positive',
    position: 'top',
    message: 'Đăng nhập thành công'
  })
  loading.value = false
}
</script>

<template lang="pug">
q-layout
  q-page-container
    q-page.h-screen.overflow-hidden
      .row.h-full
        .col-6.flex.items-center.gradient.p-4
          q-card.w-full(flat)
            q-card-section
              .flex.items-center
                q-avatar(size="40px")
                  img(src="~assets/logo.png")
                .text-h6.ml-4 Trường hạ sĩ quan xe tăng 1
              q-form.mt-5
                q-input.mt-5(label="Họ và tên" outlined v-model="student.fullName")
                q-input.mt-5(label="Số báo danh" outlined v-model="student.candidateNumber")
                q-select.mt-5(label="Lớp" outlined :options='classList' v-model="student.classId")
                q-btn.w-full.mt-5(
                  label="Đăng nhập"
                  color="primary"
                  size="lg"
                  :loading="loading"
                  :disable="loading"
                  @click="register"
                )
                q-btn.w-full.mt-5(
                  label="Giáo viên"
                  color="secondary"
                  size="lg"
                  :to="{ name: 'LoginPage' }"
                )
        .col-6
          q-card.h-full(flat)
            q-card-section.h-full
              q-img.h-full.rounded-xl(src="~assets/bg.jpg")
</template>

<style lang="sass" scoped>
.gradient
  background-image: linear-gradient(to right bottom, #48604f, #447151, #3f8151, #399250, #30a34d, #2fab4e, #2fb24e, #2eba4e, #36ba54, #3dba59, #43b95f, #49b964)
</style>
