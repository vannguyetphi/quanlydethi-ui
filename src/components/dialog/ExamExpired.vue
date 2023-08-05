<script setup>
import { ref } from "vue";
import BaseDialog from "components/dialog/BaseDialog.vue";

const dialog = ref(null);
const confirm = async () => {
  dialog.value.close();
};

defineExpose({
  dialog,
});
</script>

<template lang="pug">
base-dialog(
  :fullWidth="true"
  :btnState="{}"
  @confirm="confirm"
  ref="dialog"
)
  q-card-section
    .text-h6.mb-5 Hết thời gian làm bài
</template>
