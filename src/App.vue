<script setup lang="ts">
import Layout from '@/layouts/layout.vue'
import { healthCheck } from './api/healthController';
healthCheck().then((res) => {
  console.log(res)
})

</script>

<template>
  <Layout>
    <RouterView />
  </Layout>
</template>

<style scoped></style>
