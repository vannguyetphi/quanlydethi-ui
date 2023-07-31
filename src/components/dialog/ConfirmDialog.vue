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
defineExpose({
  close,
  open
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
      q-btn(label='Xác nhận' color='primary' no-caps @click="emit('confirm')")
</template>

<style scoped lang="sass">

</style>
