<template>
  <section class="main__img canvas ">
    <h2 class="hidden">이미지 및 결과 미리보기</h2>
    <div class="canvas__bg" :style="bgStyle">
      <!-- <img :src="props.imgSrc" alt="" :style="imageStyle"> -->
    </div>
    <div class="canvas__center" :style="centerStyle"></div>
    <div class="canvas__box" :style="boxStyle"></div>
    <div class="canvas__txt" :style="fontStyle">
      <template v-for="(line, index) in quoteData" :key="index" >
      <span>{{ line }}</span>
      <br />
    </template>
    </div>
  </section>
</template>
<script setup>
  import { ref, defineProps } from 'vue';
  import { useEditorStore } from './../../stores/editor';
  const editorStore = useEditorStore();
  const {
    // 배경색
    bgColor,
    isShowBgColor,
    // 이미지
    imgSize,//row, col, all
    imgPosition,// top, bottom, center
    imgRepeat,
    imgDesignBlur,
    imgDesignCenter, // white, black, none
    //폰트
    font,
    selectedFont,
    fontSize,
    selectedFontWeight,
    fontColor,
    fontBgColor,
    fontBgColorOpacity, // 0 ~ 100
    isShowFontBgColor,
    fontItalic,
    fontUnderLine,
    // 네모박스
    addBox,
    boxColor,
    boxColorOpacity, // 0 ~ 100
    boxWidth,
    boxHeight,
    boxRounding,
    // 데이터
    imgUrl,
    quoteData,
  } = storeToRefs(editorStore)

  const fontStyle = computed(()=> ({
    fontFamily: selectedFont.value,
    fontSize: `${fontSize.value}px`,
    fontWeight: selectedFontWeight.value.value,
    color: fontColor.value,
    textDecoration: fontUnderLine.value ? 'underline' : 'none',
    fontStyle: fontItalic.value ? 'italic' : 'normal', 
    '--color': fontBgColor.value,
    '--opacity': fontBgColorOpacity.value / 100,
    '--display' : isShowFontBgColor.value ? 'block' : 'none',
  }))
  
  const boxStyle = computed(() => ({
    display: addBox.value ? 'block' : 'none',
    background : boxColor.value,
    opacity : boxColorOpacity.value / 100, // 0 ~ 100
    width : `${boxWidth.value}px`,
    height : `${boxHeight.value}px`,
    borderRadius : `${boxRounding.value}px`,
  }))

  const imgimg = ref('https://picsum.photos/700/700'); 
  // 에디터 수정내용은 pinia
  const bgStyle = computed(()=> ({
    backgroundColor: isShowBgColor.value ? bgColor.value : 'transparent',
    backgroundImage: `url(${imgUrl.value})`,// imgimg.value
    backgroundSize: objectFit.value,
    backgroundRepeat: imgRepeat.value ? 'repeat' : 'no-repeat', // repeat / no-repeat
    backgroundPosition: imgPosition.value,
    filter: imgDesignBlur.value ? `blur(2px)` : undefined,
  }))
  
const objectFit = computed(() => {
  switch (imgSize.value) {
    case 'row': return 'contain'
    case 'col': return 'cover'
    case 'all': return '100% 100%'
    default: return 'cover'
  }
})

const centerStyle = computed(() => ({
  background: centerColor.value
}))

const centerColor = computed(() => {
  switch (imgDesignCenter.value) {
    case 'white':
      return ` radial-gradient(
        circle,
        rgba(255,255,255,1) 0%,
        rgba(255,255,255,0.9) 30%,
        rgba(255,255,255,0.25) 55%,
        rgba(255,255,255,0.08) 70%,
        rgba(255,255,255,0) 85%
      )`
    case 'black':
      return `radial-gradient(
        circle,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,0.9) 30%,
        rgba(0,0,0,0.25) 55%,
        rgba(0,0,0,0.08) 70%,
        rgba(0,0,0,0) 85%
      )`
    case 'none': 
      return 'transparent'
  }
})

</script>
<style lang="scss" scoped>
  .canvas {
    overflow: hidden;
    position: relative;
    @include flex-center;
    &__bg {
      width: 100%;
      height: 100%;
      overflow: hidden; 
      border: 1px solid rgb(91, 91, 91);
    }
    img {
      width: 100%;
      height: 100%;
    }
    &__box, &__txt, &__center {
      @include position-center;
      text-align: center;
    }
    &__txt span{
      position: relative;
      &::before {
        content: "";
        display:var(--display);
        position: absolute;
        left: 0;
        bottom: 0.2em;
        width: 100%;
        height: 0.9em;
        background-color: var(--color);
        opacity: var(--opacity);   /* ✅ 배경만 투명 */
        z-index: -1;
      }
    }
    &__center {
      width: 90%;
      height: 90%;
      border-radius: 40%;
    }
  }
</style>