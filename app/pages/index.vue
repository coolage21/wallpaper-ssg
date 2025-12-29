<template>
  <main class="ly-main main">
    <div class="ly-main__left">
      <section class="main__img">
        <h2 class="hidden">이미지 검색 화면</h2>
        <div class="search-img">
          <h3 class="hidden">이미지 가져오기 화면</h3>
          <button type="button" class="btn btn--g btn-search-img">+ 이미지 가져오기</button>
        </div>
        <!-- search img -->
        <div class="search-img btn-search-img2__wrapper">
          <h3 class="hidden">이미지 가져오는 방법 선택하기</h3>
          <button type="button" class="btn btn-search-img2">내 컴퓨터에서 가져오기</button>
          <button type="button" class="btn btn-search-img2">무료 이미지 사이트에서<br/>검색하기</button>
          <button type="button" class="btn btn-search-img2">ai로 만들기(chatGpt)</button>
          <button type="button" class="btn btn--g goBack">뒤로가기</button>
        </div>
        <!-- search img methods -->
        <div class="search-img">
          <h3 class="hidden">이미지 검색하기</h3>
          <div class="search-img__form">
            <h4 class="hidden">이미지 검색창</h4>
            <label for="search-img-txt">무료 이미지 사이트에서<br/>검색하기</label>
            <div class="search-img__input">
              <input id="search-img-txt" type="text" placeholder="이미지에 추가할 텍스트를 입력해주세요">
              <button type="button" class="search-btn">
                <img src="" alt="">
                <span class="hidden">검색하기</span>
              </button>
            </div>
          </div>
          <!-- search for img -->
          <div class="search-img__result">
            <h4 class="hidden">검색결과</h4>
            <div class="search-img__lists">
              <div class="search-img__list">
                <img src="/images/image_no.png" alt="">
                <span class="list-hover">
                  <button type="button" class="btn btn--g">크게보기</button>
                </span>
              </div>
              <div class="search-img__list">
                <img src="/images/image_no.png" alt="">
                <span class="list-hover">
                  <button type="button" class="btn btn--g">크게보기</button>
                </span>
              </div>
              <div class="search-img__list">
                <img src="/images/image_no.png" alt="">
                <span class="list-hover">
                  <button type="button" class="btn btn--g">크게보기</button>
                </span>
              </div>
              <div class="search-img__list">
                <img src="/images/image_no.png" alt="">
                <span class="list-hover">
                  <button type="button" class="btn btn--g">크게보기</button>
                </span>
              </div>
              <div class="search-img__list">
                <img src="/images/image_no.png" alt="">
                <span class="list-hover">
                  <button type="button" class="btn btn--g">크게보기</button>
                </span>
              </div>
              <div class="search-img__list">
                <img src="/images/image_no.png" alt="">
                <span class="list-hover">
                  <button type="button" class="btn btn--g">크게보기</button>
                </span>
              </div>
              <div class="search-img__list">
                <img src="/images/image_no.png" alt="">
                <span class="list-hover">
                  <button type="button" class="btn btn--g">크게보기</button>
                </span>
              </div>
              <div class="search-img__list">
                <img src="/images/image_no.png" alt="">
                <span class="list-hover">
                  <button type="button" class="btn btn--g">크게보기</button>
                </span>
              </div>
              <div class="search-img__list">
                  <img src="/images/image_no.png" alt="">
                <span class="list-hover">
                  <button type="button" class="btn btn--g">크게보기</button>
                </span>
              </div>
              <div class="search-img__list">
                <img src="/images/image_no.png" alt="">
                <span class="list-hover">
                  <button type="button" class="btn btn--g">크게보기</button>
                </span>
              </div>
            </div>
            <Pagination/>
          </div>
          <button type="button" class="btn btn--g goBack">뒤로가기</button>
          <!-- result list -->
          <!-- <div class="search-img search-img__view">
            <h4 class="hidden">선택 이미지 크게보기</h4>
            <img src="/images/image_no.png" alt="" class="view-img">
            <div class="search-img__btn-wrapper">
              <button type="button" class="btn btn--g">닫기</button>
              <button type="button" class="btn">선택하기</button>
            </div>
          </div>
          -->
        </div>
        </section>
          <!-- result list view larger -->
      <!-- <section class="main__img preview">
        <h2 class="hidden">이미지 및 결과 미리보기</h2>
        <div class="preview__bg">
          <img src="/images/image_no.png" alt="">
        </div>
        <div class="preview__txt"></div>
        <div class="preview__box"></div>
      </section> -->
      <section class="main__txt">
        <h2 class="hidden">
          글 작성하기
        </h2>
        <label for="main-txt" class="hidden">문구</label>
        <textarea name="main-txt" id="main-txt" class="textarea" placeholder="이미지에 추가할 텍스트를 입력해주세요 "></textarea>
        <button type="button" class="btn btn--w btn-search-bible">성경구절 찾기</button>
      </section>
    </div>
    <!--main right-->
    <section class="ly-main__right main__setting">
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
                  <input type="text" id="font-opacity" value="100%" class="input input--small">
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
                    <input type="text" id="box-opacity" value="100%" class="input input--small">
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
      <div class="btn-wrapper">
        <button type="button" class="btn btn-download">기본 다운로드</button>
        <button type="button" class="btn btn-download--row">저화질 다운로드(ppt배경용)</button>
      </div>
      <!--button wrapper-->
    </section>
    <!--main left-->
    <!-- <SearchBible/> -->
  </main>
</template>
<script setup>
  
</script>
<style lang="scss" scoped>
  .main {
    &__img {
      position: relative;
      margin-bottom: 23px;
      width: 1000px;
      max-width: 65vw;
      height: 562px;
      background-color: $white;
    }
    &__txt {
      display: flex;
      #mainTxt {
        width: 100%;
      }
    }
  }

  // image
  .search-img {
    background-color: $dark-gray;
    width: 100%;
    height: 100%;
    @include position-center;
    &__form {
      margin: 35px 0;
      text-align: center;
      color: $white;
      .search-btn {
        width: 40px;
        height: 40px;
        @include flex-center;
        background-color: $middle-gray;
      }
    }
    &__input {
      margin-top: 10px;
      @include flex-center;
      box-sizing: border-box;
      #search-img-txt {
        padding: 0 10px;
        height: 40px;
        width: 280px;
        border-radius: 0;
        border: none;
        margin-right: 10px;
      }
    }
    &__result {
      text-align: center;
      height: calc(100% - 152px);
      overflow-y: auto;
      padding: 0 30px 30px 30px;
    }
    &__lists {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
    }
    &__list {
      box-sizing: border-box;
      margin: 10px;
      width: calc((100% - 60px) / 3);
      position: relative;
      img {
        display: block;
        width: 100%;;
      }
      .list-hover {
        width: 100%;
        height: 100%;
        @include flex-center;
        position: absolute;
        top:0;
        left:0;
        opacity: 0;
        visibility: hidden;
        transition: .2s;
        background-color: rgba(0, 0, 0, 0.8);
      }
      &:hover {
        .list-hover {
          opacity: 1;
          visibility: visible;
        }
      }
    }
    &__view {
      background-color: #363636da;
      img {
        margin-top: 15px;
        @include position-center;
        max-width:80%;
        width:80%;
      }
    }
    &__btn-wrapper {
      margin: 20px;
      .btn--g {
        margin-right: 10px;
      }
    }
    .btn-search-img {
      @include position-center;
    }
    .goBack {
      position: absolute;
      top: 20px;
      left: 20px;
    }
  }
  .btn-search-img2 {
    width: 200px;
    height: 230px;
    &__wrapper {
      @include flex-center;
      gap: 20px;
    }
  }

  // preview
  .preview {
    @include flex-center;
    &__bg, img {
      width: 100%; 
    }
    &__box, &__txt {
      @include position-center
    }
  }
  
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
      width: 95px;
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

  //button
  .btn-search-bible {
    flex-shrink: 0;
    align-self: baseline;
    margin-left: 13px;
  }
  .btn-change-img {
    position: relative;
    top: -12px;
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
@media screen and (max-width: 1024px) {
  .search-img {
    &__result {
      padding: 0 10px 10px 10px;
    }
    &__list {
      width: calc((100% - 40px) / 2);
    }
  }
  .btn-wrapper {
    bottom: 102%;
  }
}

@media screen and (max-width: 768px) {
  .ly-main {
    max-width: 95vw;
  }
  .main {
    flex-direction: column;
    &__img {
      max-width: 100%;
      margin-bottom: 15px;
    }
    &__setting {
      margin-top: 65px;
      padding-left: 0;
    }
  }
  .setting {
    max-height: 50vh;
    &__sub-heading {
      width: 75px;
    }
  }
}
  .preview {
    height: fit-content;
  }
  .btn-search-img2 {
    height: 130px;
    padding: 10px;
    &__wrapper {
      gap: 10px;
    }
  }
@media screen and (max-width: 480px) {
  .search-img {
    &__result {
      padding: 0 10px 10px 10px;
    }
    &__list {
      width: calc((100% - 20px));
    }
    .goBack {
      top: 10px;
      left: 10px;
    }
  }
}
  
</style>