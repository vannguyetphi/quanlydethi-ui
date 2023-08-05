<script setup>
import { ref } from "vue";

const confirm = ref(false);
const close = () => {
  confirm.value = false;
};
const open = () => {
  confirm.value = true;
};
const emit = defineEmits(["confirm"]);
defineExpose({
  close,
  open,
});
defineProps({
  fullWidth: Boolean,
  btnState: Object,
});
</script>

<template lang="pug">
q-dialog(v-model='confirm' persistent full-width="fullWidth")
  q-card
    slot
    q-card-actions(align='right')
      q-btn(label='Hủy' color='negative' v-close-popup no-caps)
      q-btn(
        label='Xác nhận'
        color='primary'
        no-caps @click="emit('confirm')"
        :disable="btnState.disable || btnState.loading"
        :loading="btnState.loading"
      )
</template>

<style scoped lang="sass"></style>
