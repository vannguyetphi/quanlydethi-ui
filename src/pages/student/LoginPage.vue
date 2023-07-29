<script setup>
import { ref, reactive } from 'vue'

const student = reactive({
  fullName: '',
  idNumber: '',
  class: ''
})
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
                q-input.mt-5(label="Số báo danh" outlined v-model="student.idNumber")
                q-select.mt-5(label="Lớp" outlined v-model="student.class")
                q-btn.w-full.mt-5(
                  label="Đăng nhập"
                  color="primary"
                  size="lg"
                  :loading="loading"
                  :disable="loading"
                  @click="auth"
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
