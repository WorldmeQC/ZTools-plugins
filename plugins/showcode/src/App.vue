<script setup lang="ts">
import { onMounted } from 'vue'
import IndexPage from './pages/index.vue'

onMounted(() => {
  window.ztools?.setExpendHeight?.(780)
})
</script>

<template>
  <IndexPage />
</template>
