<script setup>
import { ref } from 'vue'

const confirm = ref(true)
</script>

<template lang="pug">
q-dialog(v-model='confirm' persistent)
  q-card
    q-card-section
      .text-h6 Bạn có muốn nộp bài ?
    q-card-actions(align='right')
      q-btn(label='Quay lại' color='negative' v-close-popup no-caps)
      q-btn(label='Nộp bài' color='primary' no-caps)
</template>

<style scoped lang="sass">

</style>
