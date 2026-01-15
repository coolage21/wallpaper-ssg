<template>
  <div class="error-page">
    <h1>{{ error.statusCode }} ERROR</h1>
    <p>죄송합니다, 요청하신 페이지를 찾을 수 없습니다.</p>
    <NuxtLink to="/" class="btn">메인 페이지로 돌아가기</NuxtLink>
    <!-- error.message -->
  </div>
</template>
<script setup>
  import {defineProps} from 'vue';
  defineProps({
    error : Object
  })
  definePageMeta({
  title: '404 - 페이지를 찾을 수 없습니다'
})
</script>
<style lang="scss" scoped>
  .error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap:10px;
    width: 100%;
    height: 100vh;
    text-align: center;
    h1 {
      font-size: 40px;
      font-weight: 700;
    }
    p {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }
</style>