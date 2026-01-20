<template>
  <main class="ly-main main">
    <div class="ly-main__left">
      <div class="main__img-wrapper" :style="{'aspect-ratio': ratio}" :class="{mobile : mobileSize}">
        <SearchImage v-show="!isShowEditorCanvas"
         :aria-hidden="isShowEditorCanvas" />
        <EditorCanvas v-show="isShowEditorCanvas"  :aria-hidden="!isShowEditorCanvas" :text="inputQuoteData" />
      </div>
      <button v-show="isShowEditorCanvas"  :aria-hidden="!isShowEditorCanvas"  @click="changeImg" type="button" class="btn btn--g btn-change">이미지 변경하기</button>
      <section class="main__txt">
        <h2 class="hidden">
          글 작성하기
        </h2>
        <label for="main-txt" class="hidden">문구</label>
        <textarea name="main-txt" id="main-txt" class="textarea" placeholder="이미지에 추가할 텍스트를 입력해주세요" 
        :value="inputQuoteData"
        @input="inputQuoteData = $event.target.value"
        @blur="commitQuoteData" @keyup.enter="commitQuoteData" ></textarea>
        <button @click="isModalOpen = true" type="button" class="btn btn--w btn-search-bible">성경구절 찾기</button>
      </section>
     
    </div>
    <!--main left-->
    <div class="ly-main__right">
      <EditorSettings/>
      <div class="btn-wrapper">
        <button type="button" class="btn btn-download" @click="saveAsImage(2, 1)">기본 다운로드</button>
        <button @click="saveAsImage(1, 0.1)" type="button" class="btn btn-download--row">저화질 다운로드<br class="m-block"/>(ppt배경용)</button>
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
import {sweetAlert}  from'./../../composables/sweetAlerts'

const { showAlert } = sweetAlert();

// pinia store (이미지 여기서 고려해야할까 고민해보기...)
const editorStore = useEditorStore()
const {
  selectedRatio,
  ratioData,
  quoteData,
  imgUrl,
  isShowEditorCanvas,
  currentSearchImgSection,
} = storeToRefs(editorStore);

// 해상도에 맞은 비율 사이즈
const ratio = ref('');
const mobileSize = ref(false);
const changeRatio = () => {
  if (selectedRatio.value == ratioData.value[0]){
    ratio.value='16/9'
    mobileSize.value = false;
  } else if (selectedRatio.value == ratioData.value[1]) {
    ratio.value='4/3'
    mobileSize.value = false;
  } else if (selectedRatio.value == ratioData.value[2]) {
    ratio.value='4/3'
    mobileSize.value = false;
  } else if (selectedRatio.value == ratioData.value[3]) {
    ratio.value='16/10'
    mobileSize.value = false;
  } else if (selectedRatio.value == ratioData.value[4]) {
    ratio.value='16/9' // 일단 캔버스 사이즈 자체는 가로로 크게하기 위해
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
const inputQuoteData = ref('');


// 텍스트
const BibleTxt = (value) => {
  inputQuoteData.value = normalizeToString(value)  
  quoteData.value = inputQuoteData.value.split('\n')
}
const commitQuoteData = () => {
  editorStore.commitField('quoteData', inputQuoteData.value.split('\n'))
}
watch(quoteData, v => (inputQuoteData.value =  v.join('\n')  ))
// 해상도 사이즈에 따라 캔버스 사이즈 변경 처리 필요

// 다운로드
import html2canvas from 'html2canvas'

const saveAsImage = async (scale, quality) => {
  if(!imgUrl.value){
    showAlert('다운로드 오류', '저장 할 이미지가 없습니다', 'error')
    return
  }
  const target = document.querySelector('.canvas');
  target.classList.remove('showBg');
  if (!target) return
  
  const canvas = await html2canvas(target, {
    backgroundColor: 'transparent', // 투명 방지
    scale: scale, // 해상도 ↑
    useCORS: true,
  })
  
  const url = canvas.toDataURL('image/png', quality) // 압축률
  const isMobile =
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  
  if(isMobile){
    showAlert('', '이미지를 길게 눌러 사진에 저장하세요', )
    window.location.href = url
  } else {

    const link = document.createElement('a')
    link.href = url
    link.download = 'result.png'
    link.click()
    target.classList.add('showBg');
  }
}

const changeImg = () => {
  isShowEditorCanvas.value = false
  currentSearchImgSection.value = 1;
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
      margin-top: 15px;
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
      margin-bottom: 5px;
      border: 1px solid $light-gray;
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
        overflow: hidden;
      }
    }
    .main {
      height: calc(100vh - 135px - 10px - 60px);
      flex-direction: column;
      &__img-wrapper {
        max-width: none;
        width: 100%;
      }
    }
    :deep(.main__img) {
      max-width: 100%;
    }
    .btn-wrapper {
      bottom:0;
      position: fixed;
      width: 100%;
      .btn {
        margin:0;
        width: 50%;
        &:nth-child(1){
          border-right: 1px solid $white;
        }
      }
    }
    .btn-search-bible {
      align-self:auto;
    }
  }   
</style>