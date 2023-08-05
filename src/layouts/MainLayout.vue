<template lang="pug">
q-layout
  q-header
    .m-header.row.items-center.justify-center.py-6
      q-avatar(size="100px")
        img(src="~assets/logo.png")
      h1.ml-12.py-5.text-6xl.text-center TRƯỜNG HẠ SỸ QUAN XE TĂNG 1
  q-page-container
    q-page
      router-view
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",

  setup() {
    return {};
  },
});
</script>

<style scoped lang="sass">
.m-header
  background: #B11818
</style>
