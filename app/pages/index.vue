<template>
  <main class="ly-main main">
    <div class="ly-main__left">
      <div class="main__img-wrapper" :style="{'aspect-ratio': ratio}" :class="{mobile : mobileSize}">
        <SearchImage v-show="!isShowEditorCanvas"
         :aria-hidden="isShowEditorCanvas" @choice-img="resultImg"/>
        <EditorCanvas v-show="isShowEditorCanvas"  :aria-hidden="!isShowEditorCanvas" :imgSrc="imgSrc"  />
      </div>
      <button v-show="isShowEditorCanvas"  :aria-hidden="!isShowEditorCanvas"  @click="changeImg" type="button" class="btn btn--g btn-change">이미지 변경하기</button>
      <section class="main__txt">
        <h2 class="hidden">
          글 작성하기
        </h2>
        <label for="main-txt" class="hidden">문구</label>
        <textarea name="main-txt" id="main-txt" class="textarea" placeholder="이미지에 추가할 텍스트를 입력해주세요" :value="txtData" @input="updateQuote" ></textarea>
        <button @click="isModalOpen = true" type="button" class="btn btn--w btn-search-bible">성경구절 찾기</button>
      </section>
     
    </div>
    <!--main left-->
    <div class="ly-main__right">
      <EditorSettings/>
      <div class="btn-wrapper">
        <button type="button" class="btn btn-download">기본 다운로드</button>
        <button type="button" class="btn btn-download--row">저화질 다운로드(ppt배경용)</button>
      </div>
      <!--button wrapper-->
    </div>
    <!--main right-->
    <SearchBibleModal v-if="isModalOpen" @close-modal="isModalOpen = false" @bible-txt="BibleTxt"/>

  </main>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useEditorStore } from './../../stores/editor';

// pinia store (이미지 여기서 고려해야할까 고민해보기...)
const editorStore = useEditorStore()
const {
  selectedRatio,
  ratioData,
  quoteData,
} = storeToRefs(editorStore);

// 해상도에 맞은 비율 사이즈
const ratio = ref('');
const mobileSize = ref(false);
const changeRatio = () => {
  if (selectedRatio.value == ratioData.value[0]){
    ratio.value='16/9'
    mobileSize.value = false;
  } else if (selectedRatio.value == ratioData.value[1]) {
    ratio.value='5/4'
    mobileSize.value = false;
  } else if (selectedRatio.value == ratioData.value[2]) {
    ratio.value='4/3'
    mobileSize.value = false;
  } else if (selectedRatio.value == ratioData.value[3]) {
    ratio.value='16/10'
    mobileSize.value = false;
  } else if (selectedRatio.value == ratioData.value[4]) {
    ratio.value='16/9'
    mobileSize.value = true;
   
  }
}
if(selectedRatio.value && ratioData.value){
  changeRatio();
}
watch(selectedRatio, ()=> {
  changeRatio();
})

const normalizeToString = (v) => {
  if (typeof v === 'string') return v
  if (v?.value && typeof v.value === 'string') return v.value
  if (v?.text && typeof v.text === 'string') return v.text
  return ''
}

const isModalOpen = ref(false);
const isShowEditorCanvas = ref(false);
const txtData = ref('');
const imgSrc = ref('');

// 이미지 검색, 결과 분기
const resultImg = () => {
  isShowEditorCanvas.value = true;
}
const changeImg = () => {
  isShowEditorCanvas.value = false;
}

// 텍스트
const BibleTxt = (value) => {
  txtData.value = normalizeToString(value)  
  quoteData.value = txtData.value.split('\n')
}
const updateQuote = (e) => {
  txtData.value =  e.target.value;
  quoteData.value = txtData.value.split('\n')
}

// 해상도 사이즈에 따라 캔버스 사이즈 변경 처리 필요
ratio

</script>
<style lang="scss" scoped>
  .ly-main {
    width: 1470px;
    max-width: 98vw;
    display: flex;
    margin: 0 auto;
    &__right {
      padding-left: 30px;
      flex: 1;
      height: 86vh; // 버튼 위치를 고정시키기 위해
      position: relative;
    }
  }
  :deep(.main__img) {
    // background-color: $white;
    width: 100%;
    height: 100%;
  }  
  :deep(.mobile .main__img){
    width: fit-content;
    height: 72vh;
    aspect-ratio: 9/20;
    margin: 0 auto;
  }
  .main {
    &__txt {
      display: flex;
      #mainTxt {
        width: 100%;
      }
    }
    &__img-wrapper {
      position: relative;
      // background-color: $white;
      aspect-ratio: 16/9;
      max-width: 65vw;
      width: 900px;
      margin-bottom: 23px;
    }
  }
  //button
  .btn-search-bible {
    flex-shrink: 0;
    align-self: baseline;
    margin-left: 13px;
  }
  .btn-wrapper {
    position: absolute;
    bottom: 103%;
    display: flex;
    width: max-content;
    right: 0;
  }
  .btn-download {
    margin-right: 10px;
  }
  @media screen and (max-width: 1024px) {
    .btn-wrapper {
      bottom: 102%;
    }
  }
  @media screen and (max-width: 768px) {
    .ly-main {
      max-width: 95vw;
      &__right {
        padding-left: 0;
      }
    }
    .main {
      flex-direction: column;
    }
    :deep(.main__img) {
      max-width: 100%;
      margin-bottom: 15px;
    }
    .btn-wrapper {
        bottom: 90%;
    }
  }
  // .preview {
  //   height: fit-content;
  // }
  // .btn-search-img2 {
  //   height: 130px;
  //   padding: 10px;
  //   &__wrapper {
  //     gap: 10px;
  //   }
  // }

  
</style>