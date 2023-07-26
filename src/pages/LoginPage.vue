<script setup>
import { ref } from 'vue'

const userName = ref('')
const password = ref('')
</script>

<template lang="pug">
q-layout
  q-page-container
    q-page
      .title-holder
        p.text-center.title Đăng nhập
      .form.max-w-md.w-full
        q-form(autocomplete="off")
          q-input(label="Tên đăng nhập" v-model="userName")
          q-input(label="Mật khẩu" type="password" v-model="password")
          .text-center.btn
            q-btn(color="secondary" label="Đăng nhập" size="xl")
</template>

<style lang="sass" scoped>
.title
  padding: 2rem
  font-size: 4rem
  &-holder
    box-shadow: 5px 0 10px #1D1D1D

.btn
  margin-top: 2rem

.form
  margin: 0 auto
  max-width: 25rem
  width: 100%
</style>
