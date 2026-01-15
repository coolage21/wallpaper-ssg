<template>
  <section class="main__img canvas ">
    <h2 class="hidden">이미지 및 결과 미리보기</h2>
    <div class="canvas__bg" :style="bgStyle">
    </div>
    <div class="canvas__center" :style="centerStyle"></div>
    <div class="canvas__box" :style="boxStyle"></div>
    <div class="canvas__txt" :style="fontStyle">
    <template v-for="line in newTxt" :key="line">
      <span>{{ line }}</span>
      <br />
    </template>
    <!-- <span style="color:red">{{ newTxt}}</span> -->
    </div>
  </section>
</template>
<script setup>
  import { ref, defineProps } from 'vue';
  import { useEditorStore } from './../../stores/editor';
  const editorStore = useEditorStore();
  
  const {
    selectedRatio, // 해상도
    ratioData,
    // 배경색
    bgColor,
    isShowBgColor,
    // 이미지
    imgSize,//row, col, all
    imgPosition,// top, bottom, center
    imgRepeat,
    imgDesignBlur,
    imgDesignCenter, // white, black, none
    landscape,
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

  const props = defineProps({
    text: {
    type: String,
    default: ''
  }
  })

  // 비율 지정하기
  const imgW = ref('');
  const imgH = ref('')
    const ratioRow = ref('');
  const ratioCol = ref('');

  if (selectedRatio.value == ratioData.value[0]){
    ratioRow.value='16'
    ratioCol.value='9'
  } else if (selectedRatio.value == ratioData.value[1]) {
    ratioRow.value='5'
    ratioCol.value='4'
  } else if (selectedRatio.value == ratioData.value[2]) {
    ratioRow.value='4'
    ratioCol.value='3'
  } else if (selectedRatio.value == ratioData.value[3]) {
    ratioRow.value='16'
    ratioCol.value='10'
  } else if (selectedRatio.value == ratioData.value[4]) {
    ratioRow.value='16'
    ratioCol.value='9'
  }
  watch(
    () => editorStore.imgUrl,
    (url) => {
      if (!url) return 
      const img = new Image()
      img.src = url
      img.onload = () => {
        imgW.value = img.width
        imgH.value = img.height
        if( imgW.value * ratioCol.value / ratioRow.value > imgH.value){
          landscape.value = true
        } else {
          // 비율보다 세로로 더 길다면
          landscape.value = false
        }
      }
    },
    { immediate: true }
  )
  // 글자 바로 보여주기
  const newTxt = computed(() => {
    if (Array.isArray(props.text)) return props.text
    return props.text.split('\n')
  })
  

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
  if(landscape.value) {
    switch (imgSize.value) {
      case 'row': return 'contain'
      case 'col': return 'cover'
      case 'all': return '100% 100%'
      default: return 'cover'
    }
  } else {
    switch (imgSize.value) {
      case 'row': return 'cover'
      case 'col': return 'contain'
      case 'all': return '100% 100%'
      default: return 'cover'
    }

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
    }
    img {
      width: 100%;
      height: 100%;
    }
    &__box, &__txt, &__center {
      @include position-center;
      text-align: center;
    }
    &__txt {
      width: 100%;
      span {
      position: relative;
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
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
    }
    &__center {
      width: 90%;
      height: 90%;
      border-radius: 40%;
    }
  }
</style>