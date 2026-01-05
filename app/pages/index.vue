<template>
  <main class="ly-main main">
    <div class="ly-main__left">
      <SearchImage v-show="!isShowEditorCanvas"
       :aria-hidden="isShowEditorCanvas" @choice-img="resultImg"/>
      <EditorCanvas v-show="isShowEditorCanvas"  :aria-hidden="!isShowEditorCanvas" :imgSrc="imgSrc" :quoteData="quoteData" />
      <button v-show="isShowEditorCanvas"  :aria-hidden="!isShowEditorCanvas"  @click="changeImg" type="button" class="btn btn--g btn-change">이미지 변경하기</button>
      <section class="main__txt">
        <h2 class="hidden">
          글 작성하기
        </h2>
        <label for="main-txt" class="hidden">문구</label>
        <textarea name="main-txt" id="main-txt" class="textarea" placeholder="이미지에 추가할 텍스트를 입력해주세요" :value="quoteData" @input="updateQuote" ></textarea>
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
import { ref, unref } from 'vue'
const normalizeToString = (v) => {
  if (typeof v === 'string') return v
  if (v?.value && typeof v.value === 'string') return v.value
  if (v?.text && typeof v.text === 'string') return v.text
  return ''
}


const isModalOpen = ref(false);
const isShowEditorCanvas = ref(false);
const quoteData = ref('');
const imgSrc = ref('');
const BibleTxt = (value) => {
  quoteData.value = normalizeToString(value)
  
}
const resultImg = (value) => {
  imgSrc.value = value;
  isShowEditorCanvas.value = true;
}
const updateQuote = (e) => {
  quoteData.value =  e.target.value;
}
const changeImg = () => {
  isShowEditorCanvas.value = false;
}
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
    position: relative;
    margin-bottom: 23px;
    width: 1000px;
    max-width: 65vw;
    aspect-ratio: 16/9;
    background-color: $white;
  }  
  .main {
    &__txt {
      display: flex;
      #mainTxt {
        width: 100%;
      }
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