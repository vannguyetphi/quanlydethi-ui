<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

</script>

<template lang="pug">
q-layout.shadow-2.rounded-borders.h-screen(view='lHh Lpr lff' container)
  q-drawer(v-model='drawer' show-if-above :width='300' :breakpoint='400')
    q-scroll-area(style='height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd')
      q-list(padding separator)

    q-img.absolute-top(src='~assets/bg.jpg' style='height: 150px')
  q-page-container
    q-page(padding)
      router-view
      p 132
</template>

<style scoped lang="sass">
.active
  background: red
</style>
