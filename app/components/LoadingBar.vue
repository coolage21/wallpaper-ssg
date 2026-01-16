<template>
  <div class="spinner__wrapper" v-if="isLoading">
    <div class="spinner">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <p class="hidden">로딩중... </p>
  </div>
</template>
<script setup>
  import { useLoading } from '@/composables/loading'

  const { isLoading } = useLoading();
 
</script>
<style lang="scss" scoped>

  .spinner {
    width: 100px;
    height:100px;
    @include flex-center;
    &__wrapper {
      background-color: transparent;
      z-index: 9999;
      position: fixed;
      width: 100%;
      height: 100%;
      @include flex-center;
    }
    span {
      width: 15px; 
      height: 15px;
      display: inline-block;
      border-radius: 50%;
      margin: 3px;
      background-color: $purple;
      position: relative;
      animation: ani 0.9s infinite linear;
    }
    span:nth-child(2) {
      animation-delay: .3s;
    }
    
    span:nth-child(3) {
      animation-delay: .6s;
    }
  }  
  
  @keyframes ani {
    0% {
      transform: translateY(0px);
      background-color: $purple;
    }
    25% {
      transform: translateY(8px);
      background-color: $dark-purple;
    }
    50% {
      transform: translateY(0px);
      background-color: $purple;
    }
    75% {
      transform: translateY(-8px);
      background-color: $gray;
    }
    100% {
      transform: translateY(0px);
    }
  }
</style>