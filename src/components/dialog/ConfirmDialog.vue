<script setup>
import { ref } from 'vue'

const confirm = ref(false)
const close = () => {
  confirm.value = false
}
const open = () => {
  confirm.value = true
}
const emit = defineEmits(['confirm'])
const loading = ref(false)
defineExpose({
  close,
  open,
  loading
})
const props = defineProps({
  title: String
})
</script>

<template lang="pug">
q-dialog(v-model='confirm' persistent)
  q-card
    q-card-section
      .text-h6 {{ title }}
    q-card-actions(align='right')
      q-btn(label='Hủy' color='negative' v-close-popup no-caps)
      q-btn(
        label='Xác nhận'
        color='primary'
        no-caps
        @click="emit('confirm')"
        :disable="loading"
        :loading="loading"
      )
</template>

<style scoped lang="sass">

</style>
