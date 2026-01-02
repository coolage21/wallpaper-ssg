<template>
  <section class="main__img canvas">
    <h2 class="hidden">이미지 및 결과 미리보기</h2>
    <div class="canvas__bg">
      <img :src="props.imgSrc" alt="">
    </div>
    <div class="canvas__txt" v-if="props.quoteData">{{props.quoteData }}</div>
    <div class="canvas__box"></div>
  </section>
</template>
<script setup>
  import { ref, defineProps } from 'vue';


  const props = defineProps({
    imgSrc: {
      type: String,
      required: false
    },
    quoteData: {
      type: String,
      required: false
    }
  })
</script>
<style lang="scss" scoped>
  .canvas {
    @include flex-center;
    &__bg, img {
      width: 100%; 
    }
    &__box, &__txt {
      @include position-center
    }
  }
</style>