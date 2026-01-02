<template>
 <section class="main__setting">
    <h2 class="hidden">꾸미기 항목</h2>
    <div class="setting">
      <div class="setting__box setting__cont setting__item ">
        <button type="button" class="btn2 btn--w">실행취소</button>
        <button type="button" class="btn2 btn--w">다시실행</button>
        <button type="button" class="btn2 btn--w">임시저장</button>
        <button type="button" class="btn2 btn--w">임시저장불러오기</button>
      </div>
      <div class="setting__box setting__item" role="group" aria-labelledby="ratio">
        <div id="ratio" class="setting__heading">해상도</div>
        <label for="img-ratio" class="hidden">해상도</label>
        <select name="resolution" id="img-ratio" class="selectbox2">
          <option value="일반pc(1920px x 1080px)">일반pc(1920px x 1080px)</option>
          <option value="일반pc(1920px x 1080px)">일반pc(1920px x 1080px)</option>
          <option value="일반pc(1920px x 1080px)">일반pc(1920px x 1080px)</option>
          <option value="일반pc(1920px x 1080px)">일반pc(1920px x 1080px)</option>
          <option value="일반pc(1920px x 1080px)">일반pc(1920px x 1080px)</option>
        </select>
      </div>
      <!-- ratio -->
            <div class="setting__box setting__item " role="group" aria-labelledby="setting-bg-color">
        <p id="setting-bg-color" class="setting__heading">배경색</p>
        <div class="setting__cont form__color">
          <label for="bg-color" class="hidden">배경색</label>
          <input title="색 선택" type="color" id="bg-color" class="input--color">
          <label for="bg-color-txt" class="hidden">색상명</label>
          <input type="text" id="bg-color-txt" class="input input--small" value="000000">
          <button class="noColor">
            <span class="hidden">색 선택안함</span>
          </button>
        </div>
      </div>  
      <!-- background color -->
      <div class="setting__box" role="group" aria-labelledby="setting-img">
        <button  id="setting-img" class="setting__heading setting__toggle"   aria-expanded="true" aria-controls="img-items">이미지
          <img src="/images/icon_arrow.png" alt="열기">
        </button>
        <div id="img-items" class="setting__items">
          <div class="setting__item" role="group" aria-labelledby="img-size">
            <p class="setting__sub-heading" id="img-size">사이즈</p>
            <div class="setting__cont">
              <div>
                <input type="radio" name="setting__img-size" id="size-to-row" checked>
                <label for="size-to-row" class="input input--checked">가로로 꽉차게</label>
              </div>
              <div>
                <input type="radio" name="setting__img-size" id="size-to-col">
                <label for="size-to-col" class="input">세로로 꽉차게</label>
              </div>
              <div>
                <input type="radio" name="setting__img-size" id="size-all">
                <label for="size-all" class="input">전체</label>
              </div>
            </div>
          </div>
          <div class="setting__item" role="group" aria-labelledby="img-position">
            <p class="setting__sub-heading" id="img-position">위치</p>
            <div class="setting__cont">
              <div>
                <input type="radio" name="setting__img-position" id="position-t" checked>
                <label for="position-t" class="input input--checked">상단</label>
              </div>
              <div>
                <input type="radio" name="setting__img-position" id="position-c">
                <label for="position-c" class="input">중앙</label>
              </div>
              <div>
                <input type="radio" name="setting__img-position" id="position-b">
                <label for="position-b" class="input">하단</label>
              </div>
            </div>
          </div>
          <div class="setting__item" role="group" aria-labelledby="img-repeat">
            <p class="setting__sub-heading" id="img-repeat">반복</p>
            <div  class="setting__cont">
              <input type="checkbox" id="img-repeat-toggle">
              <label for="img-repeat-toggle" class="toggle">
                <span class="toggle__btn">
                <i></i>
              </span>
                <span>true</span>
              </label>
            </div>
          </div>    
          <div class="setting__item" role="group" aria-labelledby="img-design">
            <p class="setting__sub-heading" id="img-design">디자인</p>
            <div class="setting__cont">
              <div class="">
                <input type="checkbox" id="img-blur">
                <label for="img-blur" class="input">흐림처리</label>
              </div>
              <div>
                <input type="radio" name="setting__img-deco" id="img-center-w">
                <label for="img-center-w" class="input">중앙 희게</label>
              </div>
              <div>
                <input type="radio" name="setting__img-deco" id="img-center-b">
                <label for="img-center-b" class="input">중앙 검게</label>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <!-- image -->
      <div class="setting__box" role="group" aria-labelledby="setting-font">
        <button id="setting-font" class="setting__heading setting__toggle" aria-expanded="true" aria-controls="font-items">
          폰트
          <img src="/images/icon_arrow.png" alt="열림">
        </button>
        <div id="font-items" class="setting__items">
          <div class="setting__item" role="group" aria-labelledby="typeface">
            <p id="typeface" class="setting__sub-heading">서체</p>
            <div class="setting__cont">
              <label for="typeface-design" class="hidden">서체</label>
              <select id="typeface-design" class="setting__cont selectbox2">
                <option value="">폰트</option>
              </select>
            </div>
          </div>
          <div>
            <div class="setting__item" role="group" aria-labelledby="font-size">
              <p id="font-size" class="setting__sub-heading">크기</p>
              <div class="setting__cont">
                <div>
                  <label for="font-weight" class="hidden">폰트 굵기</label>
                  <select id="font-weight" class="setting__cont selectbox2">
                    <option value="">reguler</option>
                  </select>
                </div>
                <div>
                  <label for="font-s" class="hidden">폰트 크기</label>
                  <input type="text" id="font-s" class="input input--small" value="15px">
                </div>
              </div>
            </div>
          </div>
          <div class="setting__item" role="group" aria-labelledby="font-color">
            <p id="font-color" class="setting__sub-heading">색상</p>
            <div class="setting__cont form__color">
              <label for="font-color-select" class="hidden">색 선택</label>
              <input title="색 선택" type="color" id="font-color-select" class="input--color">
              <label for="font-color-txt" class="hidden">색상명</label>
              <input type="text" id="font-color-txt" class="input input--small" value="000000">
            </div>
          </div>
          <div class="setting__item" role="group" aria-labelledby="font-bg">
            <p id="font-bg" class="setting__sub-heading">배경</p>
            <div class="setting__cont form__color">
              <label for="font-bg-color" class="hidden">배경</label>
              <input title="배경색" type="color" id="font-bg-color" class="input--color">
              <label for="font-bg-color-txt" class="hidden">배경색상명</label>
              <input type="text" id="font-bg-color-txt" class="input input--small" value="000000">
              <div class="inline-flex">
                <label for="font-opacity" class="label">투명도:</label>
                <input type="text" id="font-opacity" value="0%" class="input input--small">
              </div>
              <button class="noColor">
                <span class="hidden">색 선택안함</span>
              </button>
            </div>
          </div>
            <div class="setting__item" role="group" aria-labelledby="setting-design">
              <p id="setting-design" class="setting__sub-heading">디자인</p>
              <div class="setting__cont">
                <div>
                  <input type="checkbox" id="font-italic">
                  <label for="font-italic" class="input">기울이기</label>
                </div>
                <div>
                  <input type="checkbox" id="font-under-line">
                  <label for="font-under-line" class="input">아래선</label>
                </div>
              </div>
            </div>
          
        </div>
      </div>
      <!-- font -->
      <div class="setting__box" role="group" aria-labelledby="setting-box">
        <button id="setting-box" class="setting__heading setting__toggle" aria-expanded="true" aria-controls="box-items">
          네모박스
          <img src="/images/icon_arrow.png" alt="열림">
        </button>
        <div id="box-items" class="setting__items">
          <div class="setting__item">
            <p class="setting__sub-heading">박스 추가</p>
            <div class="setting__cont">
              <input type="checkbox" id="box-toggle">
              <label for="box-toggle" class="toggle">
                <span class="toggle__btn">
                  <i></i>
                </span>
                <span>true</span>
              </label>
            </div>
          </div>
          <div class="setting__item" role="group" aria-labelledby="box-bg">
            <p id="box-bg" class="setting__sub-heading">색상</p>
            <div class="setting__cont form__color">
                <label for="box-bg-color" class="hidden">배경</label>
                <input title="배경색" type="color" id="box-bg-color" class="input--color">
                <label for="box-bg-color-txt" class="hidden">배경색상명</label>
                <input type="text" id="box-bg-color-txt" class="input input--small" value="000000">
                <div class="inline-flex">
                  <label for="box-opacity" class="label">투명도:</label>
                  <input type="text" id="box-opacity" value="0%" class="input input--small">
                </div>
                <button class="noColor">
                  <span class="hidden">색 선택안함</span>
                </button>
              </div>
          </div>
          <div class="setting__item" role="group" aria-labelledby="box-size">
            <p id="box-size" class="setting__sub-heading">크기</p>
            <div class="setting__cont">
              <div class="inline-flex">
                <label for="box-row">가로(px) :</label>
                <input id="box-row" type="text" class="input input--small"> 
              </div>
              <div class="inline-flex">
                <label for="box-col">세로(px) :</label>
                <input id="box-col" type="text" class="input input--small"> 
              </div>
            </div>
          </div>
          <div class="setting__item" role="group" aria-labelledby="box-rounding">
            <p id="box-rounding" class="setting__sub-heading">라운드처리</p>
            <div class="setting__cont">
              <label for="rounding-px" class="hidden">라운드 픽셀값</label>
              <input id="rounding-px" type="text" class="input input--small">
              <span>px</span>
            </div>
          </div>
        </div>
      </div>
      <!-- square box -->
    </div>
  </section>
</template>
<script setup>

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
      // border: 1px solid purple;
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