<template>
 <section class="main__setting">
    <h2 class="hidden">꾸미기 항목</h2>
    <div class="setting">
      <div class="setting__box setting__cont setting__item ">
        <button type="button" class="btn2 btn--w" @click="editorStore.undo">실행취소</button>
        <button type="button" class="btn2 btn--w" @click="editorStore.redo">다시실행</button>
        <button type="button" class="btn2 btn--w">임시저장</button>
        <button type="button" class="btn2 btn--w">임시저장불러오기</button>
      </div>
      <div class="setting__box setting__item" role="group" aria-labelledby="ratio">
        <div id="ratio" class="setting__heading">해상도</div>
        <label for="img-ratio" class="hidden">해상도</label>
        <select name="resolution" id="img-ratio" class="selectbox2"     v-model="inputSelectedRatio" @change="commitSelectedRatio">
          <option v-for="(option, idx) in ratioData" :value="option" :key="idx">{{ option }}</option>
        </select>
      </div>
      <!-- ratio -->
      <div class="setting__box setting__item " role="group" aria-labelledby="setting-bg-color">
        <p id="setting-bg-color" class="setting__heading">배경색</p>
        <div class="setting__cont form__color">
          <label for="bg-color" class="hidden">배경색</label>
          <input title="색 선택" type="color" id="bg-color" class="input--color" v-model="inputBgColor" @change="commitBgColor" :disabled="!isShowBgColor">
          <label for="bg-color-txt" class="hidden">색상명</label>
          <input type="text" id="bg-color-txt" class="input input--small" v-model="inputBgColor" @blur="commitBgColor" @keyup.enter="commitBgColor" :disabled="!isShowBgColor">
          <button class="noColor" :class="{'noColor--active': !isShowBgColor}" @click="toggleBgColor" >
            <span class="hidden">색 선택안함</span>
          </button>
        </div>
      </div>  
      <!-- background color -->
      <div class="setting__box" role="group" aria-labelledby="setting-img">
        <button  id="setting-img" class="setting__heading setting__toggle"   aria-expanded="true" aria-controls="img-items" @click="toggleImg = !toggleImg">이미지
          <img src="/images/icon_arrow.png" alt="열기">
        </button>
        <Transition name="slide">
          <div id="img-items" class="setting__items" v-show="toggleImg">
            <div class="setting__item" role="group" aria-labelledby="img-size">
              <p class="setting__sub-heading" id="img-size">사이즈</p>
              <div class="setting__cont">
                <div>
                  <input type="radio" name="setting__img-size" id="size-to-row" value="row" v-model="inputImgSize" @change="commitImgSize">
                  <label for="size-to-row" class="input" :class="{'input--checked': imgSize === 'row'}">가로로 꽉차게</label>
                </div>
                <div>
                  <input type="radio" name="setting__img-size" id="size-to-col" value="col" v-model="inputImgSize" @change="commitImgSize">
                  <label for="size-to-col" class="input" :class="{'input--checked': imgSize === 'col'}">세로로 꽉차게</label>
                </div>
                <div>
                  <input type="radio" name="setting__img-size" id="size-all" value="all" v-model="inputImgSize" @change="commitImgSize">
                  <label for="size-all" class="input" :class="{'input--checked': imgSize === 'all'}">전체</label>
                </div>
              </div>
            </div>
            <div class="setting__item" role="group" aria-labelledby="img-position">
              <p class="setting__sub-heading" id="img-position">위치</p>
              <div class="setting__cont">
                <div>
                  <input type="radio" name="setting__img-position" id="position-t" value="top" v-model="inputImgPosition" @change="commitImgPosition">
                  <label for="position-t" class="input" :class="{'input--checked': imgPosition === 'top'}">상단</label>
                </div>
                <div>
                  <input type="radio" name="setting__img-position" id="position-c" value="center" v-model="inputImgPosition" @change="commitImgPosition">
                  <label for="position-c" class="input" :class="{'input--checked': imgPosition === 'center'}">중앙</label>
                </div>
                <div>
                  <input type="radio" name="setting__img-position" id="position-b" value="bottom" v-model="inputImgPosition" @change="commitImgPosition">
                  <label for="position-b" class="input" :class="{'input--checked': imgPosition === 'bottom'}">하단</label>
                </div>
              </div>
            </div>
            <div class="setting__item" role="group" aria-labelledby="img-repeat">
              <p class="setting__sub-heading" id="img-repeat">반복</p>
              <div  class="setting__cont">
                <input type="checkbox" id="img-repeat-toggle" v-model="inputImgRepeat" @change="commitImgRepeat">
                <label for="img-repeat-toggle" class="toggle">
                  <span class="toggle__btn" :class="{'toggle__btn--f': !inputImgRepeat}">
                   <i></i>
                  </span>
                  <span>{{ inputImgRepeat ? 'true' : 'false' }}</span>
                </label>
              </div>
            </div>    
            <div class="setting__item" role="group" aria-labelledby="img-design">
              <p class="setting__sub-heading" id="img-design">디자인</p>
              <div class="setting__cont">
                <div class="w-100">
                  <input type="checkbox" id="img-blur" v-model="inputImgDesignBlur" @change="commitImgDesignBlur">
                  <label for="img-blur" class="input" :class="{'input--checked': imgDesignBlur}">흐림처리</label>
                </div>
                <div>
                  <input type="radio" name="setting__img-deco" id="img-center-w" value="white" v-model="inputImgDesignCenter" @change="commitImgDesignCenter">
                  <label for="img-center-w" class="input" :class="{'input--checked':imgDesignCenter === 'white'}">중앙 희게</label>
                </div>
                <div>
                  <input type="radio" name="setting__img-deco" id="img-center-b" value="black" v-model="imgDesignCenter">
                  <label for="img-center-b" class="input" :class="{'input--checked':imgDesignCenter === 'black'}">중앙 검게</label>
                </div>
                <div>
                  <input type="radio" name="setting__img-deco" id="img-center-none" value="none" v-model="imgDesignCenter">
                  <label for="img-center-none" class="input" :class="{'input--checked':imgDesignCenter === 'none'}">없음</label>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div> 
      <!-- image -->
      <div class="setting__box" role="group" aria-labelledby="setting-font">
        <button id="setting-font" class="setting__heading setting__toggle" aria-expanded="true" aria-controls="font-items" @click="toggleFont = !toggleFont">
          폰트
          <img src="/images/icon_arrow.png" alt="열림">
        </button>
        <Transition name="slide">
          <div id="font-items" class="setting__items" v-show="toggleFont">
            <div class="setting__item" role="group" aria-labelledby="typeface">
              <p id="typeface" class="setting__sub-heading">서체</p>
              <div class="setting__cont">
                <label for="typeface-design" class="hidden">서체</label>
                <select id="typeface-design" class="setting__cont selectbox2" v-model="inputSelectedFont" @change="commitSelectedFont">
                  <option
                    v-for="font in font"
                    :value="font.value"
                    :style="{ fontFamily: font.value }"
                  >
                    {{ font.label }}
                  </option>
                </select>
              </div>
            </div>
            <div>
              <div class="setting__item" role="group" aria-labelledby="font-size">
                <p id="font-size" class="setting__sub-heading">크기</p>
                <div class="setting__cont">
                  <div>
                    <label for="font-weight" class="hidden">폰트 굵기</label>
                    <select id="font-weight" class="setting__cont selectbox2" v-model="inputSelectedFontWeight" @change="commitSelectedFontWeight">
                      <option :value=weight v-for="weight in fontWeightList" >{{ weight.label }}</option>
                    </select>
                  </div>
                  <div>
                    <label for="font-s" class="hidden">폰트 크기</label>
                    <input type="number" id="font-s" class="input input--small" v-model="inputFontSize" @blur="commitFontSize" @keyup.enter="commitFontSize" />
                    px
                  </div>
                </div>
              </div>
            </div>
            <div class="setting__item" role="group" aria-labelledby="font-color">
              <p id="font-color" class="setting__sub-heading">색상</p>
              <div class="setting__cont form__color">
                <label for="font-color-select" class="hidden">색 선택</label>
                <input title="색 선택" type="color" id="font-color-select" class="input--color" v-model="inputFontColor" @change="commitFontColor">
                <label for="font-color-txt" class="hidden">색상명</label>
                <input type="text" id="font-color-txt" class="input input--small" v-model="inputFontColor" @blur="commitFontColor" @keyup.enter="commitFontColor">
              </div>
            </div>
            <div class="setting__item" role="group" aria-labelledby="font-bg">
              <p id="font-bg" class="setting__sub-heading">배경</p>
              <div class="setting__cont form__color">
                <label for="font-bg-color" class="hidden">배경</label>
                <input title="배경색" type="color" id="font-bg-color" class="input--color" v-model="inputFontBgColor" @change="commitFontBgColor" :disabled="!isShowFontBgColor">
                <label for="font-bg-color-txt" class="hidden">배경색상명</label>
                <input type="text" id="font-bg-color-txt" class="input input--small" v-model="inputFontBgColor" @blur="commitFontBgColor" @keyup.enter="commitFontBgColor" :disabled="!isShowFontBgColor">
                <div class="inline-flex">
                  <label for="font-opacity" class="label">투명도(%):</label>
                  <input type="number" id="font-opacity" class="input input--small" v-model="inputFontBgColorOpacity" @blur="commitFontBgColorOpacity" @keyup.enter="commitFontBgColorOpacity" :disabled="!isShowFontBgColor">
                </div>
                <button class="noColor" :class="{'noColor--active': !isShowFontBgColor}" @click="isShowFontBgColor = !isShowFontBgColor">
                  <span class="hidden">색 선택안함</span>
                </button>
              </div>
            </div>
              <div class="setting__item" role="group" aria-labelledby="setting-design">
                <p id="setting-design" class="setting__sub-heading">디자인</p>
                <div class="setting__cont">
                  <div>
                    <input type="checkbox" id="font-italic" v-model="inputFontItalic" @change="commitFontItalic" >
                    <label for="font-italic" class="input" :class="{'input--checked':fontItalic}">기울이기</label>
                  </div>
                  <div>
                    <input type="checkbox" id="font-under-line" v-model="inputFontUnderLine" @change="commitFontUnderLine">
                    <label for="font-under-line" class="input" :class="{'input--checked':fontUnderLine}">아래선</label>
                  </div>
                </div>
              </div>
            
          </div>
        </Transition>
      </div>
      <!-- font -->
      <div class="setting__box" role="group" aria-labelledby="setting-box">
        <button id="setting-box" class="setting__heading setting__toggle" aria-expanded="true" aria-controls="box-items" @click="toggleBox = !toggleBox">
          네모박스
          <img src="/images/icon_arrow.png" alt="열림">
        </button>
        <Transition name="slide">
          <div id="box-items" class="setting__items" v-show="toggleBox">
            <div class="setting__item">
              <p class="setting__sub-heading">박스 추가</p>
              <div class="setting__cont">
                <input type="checkbox" id="box-toggle" v-model="inputAddBox" @change="commitAddBox">
                <label for="box-toggle" class="toggle">
                  <span class="toggle__btn" :class="{'toggle__btn--f': !addBox}">
                    <i></i>
                  </span>
                  <span>{{ addBox ? 'true' : 'false' }}</span>
                </label>
              </div>
            </div>
            <div class="setting__item" role="group" aria-labelledby="box-bg">
              <p id="box-bg" class="setting__sub-heading">색상</p>
              <div class="setting__cont form__color">
                  <label for="box-bg-color" class="hidden">배경</label>
                  <input title="배경색" type="color" id="box-bg-color" class="input--color" :disabled="!addBox" v-model="inputBoxColor" @change="commitBoxColor" >
                  <label for="box-bg-color-txt" class="hidden">배경색상명</label>
                  <input type="text" id="box-bg-color-txt" class="input input--small" v-model="inputBoxColor" @blur="commitBoxColor" @keyup.enter="commitBoxColor" :disabled="!addBox" >
                  <div class="inline-flex">
                    <label for="box-opacity" class="label">투명도(%):</label>
                    <input type="number" id="box-opacity" class="input input--small" v-model="inputBoxColorOpacity" @blur="commitBoxColorOpacity" @keyup.enter="commitBoxColorOpacity" :disabled="!addBox">
                  </div>
                </div>
            </div>
            <div class="setting__item" role="group" aria-labelledby="box-size">
              <p id="box-size" class="setting__sub-heading">크기</p>
              <div class="setting__cont">
                <div class="inline-flex">
                  <label for="box-row">가로(px) :</label>
                  <input id="box-row" type="number" class="input input--small" v-model="inputBoxWidth" @blur="commitBoxWidth" @keyup.enter="commitBoxWidth"  :disabled="!addBox"> 
                </div>
                <div class="inline-flex">
                  <label for="box-col">세로(px) :</label>
                  <input id="box-col" type="number" class="input input--small" v-model="inputBoxHeight" @blur="commitBoxHeight" @keyup.enter="commitBoxHeight"  :disabled="!addBox"> 
                </div>
              </div>
            </div>
            <div class="setting__item" role="group" aria-labelledby="box-rounding">
              <p id="box-rounding" class="setting__sub-heading">라운드처리</p>
              <div class="setting__cont">
                <label for="rounding-px" class="hidden">라운드 픽셀값</label>
                <input id="rounding-px" type="number" class="input input--small" v-model="inputBoxRounding" @blur="commitBoxRounding" @keyup.enter="commitBoxRounding"  :disabled="!addBox">
                <span>px</span>
              </div>
            </div>
          </div>
        </Transition>
      </div>
      <!-- square box -->
    </div>
  </section>
</template>
<script setup>
  import { ref, watch } from 'vue';
  import {storeToRefs} from 'pinia';
  import {useEditorStore} from './../../stores/editor';

  // toggle
  const toggleImg = ref(true);
  const toggleFont = ref(true);
  const toggleBox = ref(true);
 
  // 실행취소, 되돌리기
  
  // pinia store
  const editorStore = useEditorStore()
  const {
    saveData, // 임시저장
    selectedRatio, // 해상도
    ratioData, // 해상도
    // 배경색
    bgColor,
    isShowBgColor,
    // 이미지
    imgSize, //row, col, all
    imgPosition, // top, bottom, center
    imgRepeat,
    imgDesignBlur,
    imgDesignCenter, // white, black, none
    // 폰트
    font,
    selectedFont,
    fontSize,
    selectedFontWeight, // 폰트에 따라 상이
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
  } = storeToRefs(editorStore);

  const fontWeightList = ref([]);
  fontWeightList.value = font.value[0].weight;
  watch(selectedFont, () => {
    let searchFont = font.value.find(f => f.value === selectedFont.value);
    if(searchFont) {
      let w = searchFont.weight;
      fontWeightList.value = w;
    }
  })

  // input 관련 함수
  // 해상도
  const inputSelectedRatio = ref(selectedRatio.value);
  const commitSelectedRatio = () => {
    editorStore.commitField('selectedRatio', inputSelectedRatio.value)
  }
  watch(selectedRatio, v => (inputSelectedRatio.value = v))

  // 배경색
  const inputBgColor = ref(bgColor.value);
  const commitBgColor = () => {
    editorStore.commitField('bgColor', inputBgColor.value)
  }
  watch(bgColor, v => (inputBgColor.value = v))
  // 배경색 유무(추후 수정)
  const toggleBgColor = () => {
    editorStore.commit({
      type: 'toggleBgColor',
      before: {
        isShowBgColor: editorStore.isShowBgColor,
        bgColor: editorStore.bgColor
      },
      after: {
        isShowBgColor: !editorStore.isShowBgColor,
        bgColor: !editorStore.isShowBgColor
          ? editorStore.bgColor   // ON → 유지
          : ''                    // OFF → 제거
      }
    })
  }

  // 이미지 - 사이즈
  const inputImgSize = ref(imgSize.value);
  const commitImgSize = () => {
    editorStore.commitField('imgSize', inputImgSize.value)
  }
  watch(imgSize, v => (inputImgSize.value = v))

  // 이미지 - 위치
  const inputImgPosition = ref(imgPosition.value);
  const commitImgPosition = () => {
    editorStore.commitField('imgPosition', inputImgPosition.value)
  }
  watch(imgPosition, v => (inputImgPosition.value = v))
  // 이미지 - 반복
  const inputImgRepeat = ref(imgRepeat.value);
  const commitImgRepeat = () => {
    editorStore.commitField('imgRepeat', inputImgRepeat.value)
  }
  watch(imgRepeat, v => (inputImgRepeat.value = v))
  
  // 이미지 - 디자인1
  const inputImgDesignBlur = ref(imgDesignBlur.value);
  const commitImgDesignBlur = () => {
    editorStore.commitField('imgDesignBlur', inputImgDesignBlur.value)
  }
  watch(imgDesignBlur, v => (inputImgDesignBlur.value = v))
  // 이미지 - 디자인2
  const inputImgDesignCenter = ref(imgDesignCenter.value);
  const commitImgDesignCenter = () => {
    editorStore.commitField('imgDesignCenter', inputImgDesignCenter.value)
  }
  watch(imgDesignCenter, v => (inputImgDesignCenter.value = v))
  // 서체
  const inputSelectedFont = ref(selectedFont.value);
  const commitSelectedFont = () => {
    editorStore.commitField('selectedFont', inputSelectedFont.value)
  }
  watch(selectedFont, v => (inputSelectedFont.value = v))

  // 폰트 - 굵기
  const inputSelectedFontWeight = ref(selectedFontWeight.value);
  const commitSelectedFontWeight = () => {
    editorStore.commitField('selectedFontWeight', inputSelectedFontWeight.value)
  }
  watch(selectedFontWeight, v => (inputSelectedFontWeight.value = v))
  // 폰트 - 배경유무(추후 수정)
  // 폰트 - 디자인(기울이기)
  const inputFontItalic = ref(fontItalic.value);
  const commitFontItalic = () => {
    editorStore.commitField('fontItalic', inputFontItalic.value)
  }
  watch(fontItalic, v => (inputFontItalic.value = v))

  // 폰트 - 디자인(아래선)
  const inputFontUnderLine = ref(fontUnderLine.value);
  const commitFontUnderLine = () => {
    editorStore.commitField('fontUnderLine', inputFontUnderLine.value)
  }
  watch(fontUnderLine, v => (inputFontUnderLine.value = v))

  // 폰트 - 크기
  const inputFontSize = ref(fontSize.value);
  const commitFontSize = () => {
    editorStore.commitField('fontSize', inputFontSize.value)
  }
  watch(fontSize, v => (inputFontSize.value = v))

  // 폰트 - 색
  const inputFontColor = ref(fontColor.value);
  const commitFontColor = () => {
    editorStore.commitField('fontColor', inputFontColor.value)
  }
  watch(fontColor, v => (inputFontColor.value = v))
 
  // 폰트 - 배경색
  const inputFontBgColor = ref(fontBgColor.value);
  const commitFontBgColor = () => {
    editorStore.commitField('fontBgColor', inputFontBgColor.value)
  }
  watch(fontBgColor, v => (inputFontBgColor.value = v))
  
  // 폰트 - 배경색 투명도
  const inputFontBgColorOpacity = ref(fontBgColorOpacity.value);
  const commitFontBgColorOpacity = () => {
    editorStore.commitField('fontBgColorOpacity', inputFontBgColorOpacity.value)
  }
  watch(fontBgColorOpacity, v => (inputFontBgColorOpacity.value = v))
  

  // 네모박스 - 추가 유무
  const inputAddBox = ref(addBox.value);
  const commitAddBox = () => {
    editorStore.commitField('addBox', inputAddBox.value)
  }
  watch(addBox, v => (inputAddBox.value = v))

  // 네모박스 - 배경색
  const inputBoxColor = ref(boxColor.value);
  const commitBoxColor = () => {
    editorStore.commitField('boxColor', inputBoxColor.value)

  }
  watch(boxColor, v => (inputBoxColor.value = v))
  
  // 네모박스 - 배경색 투명도
  const inputBoxColorOpacity = ref(boxColorOpacity.value);
  const commitBoxColorOpacity = () => {
    editorStore.commitField('boxColorOpacity', inputBoxColorOpacity.value)
  }
  watch(boxColorOpacity, v => (inputBoxColorOpacity.value = v))
  
  // 네모박스 - 크기(가로)
  const inputBoxWidth = ref(boxWidth.value);
  const commitBoxWidth = () => {
    editorStore.commitField('boxWidth', inputBoxWidth.value)
  }
  watch(boxWidth, v => (inputBoxWidth.value = v))
  
  // 네모박스 - 크기(세로)
  const inputBoxHeight = ref(boxHeight.value);
  const commitBoxHeight = () => {
    editorStore.commitField('boxHeight', inputBoxHeight.value)
  }
  watch(boxHeight, v => (inputBoxHeight.value = v))
  
  // 네모박스 - 크기(라운드)
  const inputBoxRounding = ref(boxRounding.value);
  const commitBoxRounding = () => {
    editorStore.commitField('boxRounding', inputBoxRounding.value)
  }
  watch(boxRounding, v => (inputBoxRounding.value = v))


</script>
<style lang="scss" scoped>
  // setting
  .setting {
    padding: 25px 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    background-color: $white;
    overflow-y: auto;
    max-height: 86vh;
    &__box {
      border-bottom: 1px solid $silver-gray;
      padding: 10px 0;
      &:last-child {
        border:none;
        padding-bottom: 0;
      }
    }
    &__items {
      margin-bottom: -5px;
      .setting__item {
        margin-bottom: 15px;
      }
    }
    &__item {
      display: flex;
      align-items: center;
    }
    &__cont {
      position: relative;
      display: flex;
      align-items: center;
      font-size: 14px;
      gap: 7px;
      flex-wrap: wrap;
      input[type=radio], input[type=checkbox] {
        opacity: 0;
        position: absolute;
      }
    }
    &__heading {
      font-weight: 600;
      padding: 10px 0;
      &:not(.setting__toggle) {
        width: 95px;
      }
    }
    &__sub-heading {
      width: 80px;
      font-size: 14px;
    }
    &__toggle {
      width: 100%;
      display: inline-flex;
      justify-content: space-between;
      transition: .2s;
      img {
        transform: rotate(0deg);
        transition: .2s;
        align-self: center;
      }
      &:hover {
        img {
          transform: translateY(2px);
        }
        background-color: #fafafa;
      }
      &--expanded {
        &:hover {
          img {
            transform: rotate(-180deg) translateY(-2px);
          }
          background-color: $silver-gray;
        }
        img {
          transform: rotate(-180deg);
        }
      }
    }
  }
  @media screen and (max-width: 1480px) {
  .main {
    &__setting {
      padding-left: 15px;
    }
  }
  .setting {
    padding: 15px 10px;
    &__cont {
      flex-wrap: wrap;
    }
    &__sub-heading {
      width: 70px;
    }
  }
}
@media screen and (max-width: 768px) {
  .main {
    flex-direction: column;
    &__setting {
      margin-top: 65px;
      padding-left: 0;
    }
  }
  .setting {
    max-height: 50vh;
  }
}
</style>