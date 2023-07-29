<script setup>
import { useAuthStore } from 'stores/auth'
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
}
</script>

<template lang="pug">
.row.text-center.mt-12
  .col-4
    q-btn(label="Quản lí đề thi" size="xl" no-caps color="purple" :to='{ name: "TestPage" }' )
  .col-4
    q-btn(label="Quản lí kết quả thi" size="xl" no-caps color="purple")
  .col-4
    q-btn(label="Quản lí lớp" size="xl" no-caps color="purple")
  .col-12
    div(class='mt-[200px]')
      q-btn(label="Đăng xuất" size="xl" no-caps color="red"  @click="logout")
</template>
