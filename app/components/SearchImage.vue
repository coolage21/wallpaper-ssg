<template>
  <section class="main__img search-img__wrapper">
    <h2 class="hidden">이미지 검색 화면</h2>
    <div v-if="currentSearchImgSection == 0" class="search-img">
      <h3 class="hidden">이미지 가져오기 화면</h3>
      <button @click="currentSearchImgSection = 1" type="button" class="btn btn--g btn-search-img">+ 이미지 가져오기</button>
    </div>
    <!-- search img -->
    <div v-else-if="currentSearchImgSection == 1" class="search-img btn-search-img2__wrapper search-img--dark">
      <h3 class="hidden">이미지 가져오는 방법 선택하기</h3>
      <!-- <button @click="goToNext('local')" type="button" class="btn btn-search-img2">내 컴퓨터에서 가져오기</button> -->
       <div class="my-local btn btn-search-img2">
         <label for="my-local" class="">내 컴퓨터에서 가져오기</label>
         <input type="file" accept="image/*" @change="onFileChange" id="my-local"/>
       </div>
      <button @click="goToNext('imgSite')" type="button" class="btn btn-search-img2">무료 이미지 사이트에서<br/>검색하기 (pixabay)</button>
      <button @click="goToNext('ai')" type="button" class="btn-search-img2"  disabled>ai로 만들기(개발예정)</button>
      <button @click="goToFirst()" type="button" class="btn btn--g goBack">뒤로가기</button>
    </div>
    <!-- search img methods -->
    <div v-else-if="currentSearchImgSection == 2" class="search-img search-img--dark">
      <h3 class="hidden">이미지 검색하기</h3>
      <div class="search-img__form">
        <h4 class="hidden">이미지 검색창</h4>
        <label v-if="isMethod=='local'" for="search-img-txt">내 컴퓨터에서<br/>가져오기</label>
        <label v-else-if="isMethod=='imgSite'" for="search-img-txt">무료 이미지 사이트에서<br/>검색하기 (pixabay)</label>
        <label v-else-if="isMethod=='ai'" for="search-img-txt">ai로 만들기<br/>(chatGpt)</label>
        <div class="search-img__input">
          <input id="search-img-txt" type="text" placeholder="이미지에 추가할 텍스트를 입력해주세요" v-model="searchTxt" @keyup.enter="searchImg">
          <button @click="searchImg" type="button" class="search-btn">
            <NuxtImg src="/images/btn_search.png" alt="열기" />
            <span class="hidden">검색하기</span>
          </button>
        </div>
      </div>
      <!-- search for img -->
      <div v-if="loading" class="search-img__result">
        <h4 class="hidden">검색로딩중</h4>
          <div class="search-img__lists">
            <div  class="search-img__list skeleton__list">
            </div>
            <div  class="search-img__list skeleton__list">
            </div>
            <div  class="search-img__list skeleton__list">
            </div>
            <div  class="search-img__list skeleton__list">
            </div>
            <div  class="search-img__list skeleton__list">
            </div>
            <div  class="search-img__list skeleton__list">
            </div>
            <div  class="search-img__list skeleton__list">
            </div>
            <div  class="search-img__list skeleton__list">
            </div>
            <div  class="search-img__list skeleton__list">
            </div>
          </div>
      </div>
      <div v-if="isShowResultLists && !loading" class="search-img__result">
        <h4 class="hidden">검색결과</h4>
        <template v-if="resultLists.length > 0 ">
          <div class="search-img__lists">
            <div v-for="(item, idx) in resultLists" class="search-img__list">
              <NuxtImg :src="item.preview" :alt="item.alt" />
              <span class="list-hover">
                <button @click="showDetail(idx)" type="button" class="btn btn--g">크게보기</button>
              </span>
            </div>
          </div>
          <UPagination v-model:page="page" :items-per-page="perPage" :total="safeTotalCont"  />
        </template>
        <div v-else class="noData">해당 내용과 관련된 이미지가 없습니다.</div>
      </div>
      <button @click="goToBack()"  type="button" class="btn btn--g goBack">뒤로가기</button>
      <!-- result list -->
      <div v-show="isShowResultImg" class="search-img search-img__view">
        <h4 class="hidden">선택 이미지 크게보기</h4>
        <NuxtImg :src="resultImg" :alt=resultImgAlt class="view-img" />
        <div class="search-img__btn-wrapper">
          <button @click="hiddenDetail" type="button" class="btn btn--g">닫기</button>
          <button @click="selectImg" type="button" class="btn">선택하기</button>
        </div>
      </div>
    </div>
  </section>
  <!-- result list view larger -->
</template>
<script setup>
  import { ref, watch } from 'vue';
  import { useEditorStore } from './../../stores/editor';
  import { usePixabay } from './../../composables/usePixabay';
    const { fetchImgData } = usePixabay();
  const editorStore = useEditorStore();
  const config = useRuntimeConfig();
  const {
    imgUrl,
    landscape, //가로형
    selectedRatio,
    ratioData,
    isShowEditorCanvas,
    currentSearchImgSection,
  } = storeToRefs(editorStore);


  const isShowImg = ref(false);
  const isShowResultLists = ref(false);
  const isShowResultImg = ref(false);
  const isMethod = ref('');
  const resultLists = ref([]);
  const resultImg = ref('');
  const searchTxt = ref('');

  const goToNext = (method) => {
    isMethod.value = method;
    currentSearchImgSection.value = 2;
  }
  const goToFirst = () => {
    if(imgUrl.value == '') {
      currentSearchImgSection.value = 0;
    } else {
      isShowImg.value = true;
      isShowEditorCanvas.value = true;
    }
  }
  const goToBack = () => {
    currentSearchImgSection.value = 1; 
    // reset
    isMethod.value = '';
    resultLists.value = [];
    isShowResultLists.value = false;
  }
  // 검색하기 버튼
  const searchImg = () => {
    
    if (isMethod.value == 'imgSite') {
      searchForImgSite();
    } else if (isMethod.value == 'ai') {
      searchForAi();
    }
    isShowResultLists.value = true; // 결과 보이게
  }


  // 이미지 api로 검색하기
  const page = ref(1);
  const perPage = ref(20);
  const safeTotalCont = ref();
  const loading = ref(false) 
  const error = ref('')



  
  const searchForImgSite = async () => {
    isShowResultLists.value = false;
    if (loading.value) return
    loading.value = true
    error.value = ''
    const { safeTotalContData, resultListsData } = await fetchImgData(config.public.apiKey, encodeURIComponent(searchTxt.value), page.value);
    loading.value = false;
    resultLists.value =resultListsData;
    safeTotalCont.value =safeTotalContData;
  }

  watch(page, ()=> {
    searchForImgSite();
    
  })
  


  const searchForAi = () => {}
  // 크게보기
  const resultImgAlt = ref('');
  const showDetail = (idx) => {
    resultImg.value = resultLists.value[idx].imgSrc;
    resultImgAlt.value = resultLists.value[idx].alt
    isShowResultImg.value = true;
  }
  // 크게보기 닫기
  const hiddenDetail = () => {
    isShowResultImg.value = false;
  }
  // 이미지 선택
  const selectImg = () => {
    isShowImg.value = true;
    // reset
    currentSearchImgSection.value = 1;
    isMethod.value = '';
    resultLists.value = [];
    isShowResultLists.value = false;
    isShowResultImg.value = false;
    editorStore.commitField('imgUrl', resultImg.value)
    isShowEditorCanvas.value = true
  }

  // 내컴퓨터에서 가져오기
  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 브라우저에서 임시 URL 생성
    resultImg.value = URL.createObjectURL(file);
    selectImg();
  }
</script>
<style lang="scss" scoped>
  // image
  .search-img {
    width: 100%;
    height: 100%;
    @include position-center;
    &--dark{
      background-color: $dark-gray;
    } 
    &__wrapper {
      background-color: $dark-gray;
    }
    &__form {
      margin: 35px 0;
      text-align: center;
      color: $white;
      .search-btn {
        width: 40px;
        height: 40px;
        @include flex-center;
        background-color: $middle-gray;
        img {
          width: 20px;
        }
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
      background-color: $white;
      box-sizing: border-box;
      margin: 10px;
      width: calc((100% - 60px) / 3);
      position: relative;
      aspect-ratio: 16 / 9;
      &.skeleton__list {
        animation: skeleton-gradient 0.5s infinite ease-in-out;
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
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
      overflow: hidden;
      img {
        width:100%;
        height: 100%;
        object-fit: contain;
      }
    }
    &__btn-wrapper {
      position: absolute;
      top: 20px;
      left: 20px;
      // margin: 20px;
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
  .my-local {
    position: relative;
    #my-local {
      position: absolute;
      top:0;
      left:0;
      z-index: -1;
      width: 10px;
      height: 10px;
    }
    label {
      @include flex-center;
      width: 100%;
      height: 100%;
    }
  }
  .btn-search-img2 {
    width: 200px;
    height: 230px;
    max-height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    &__wrapper {
      @include flex-center;
      gap: 20px;
    }
  }
  // 페이지네이션 (공통처리 할지 말지 고민 필요)
  :deep(nav > div) {
    @include flex-center;
    gap: 3px;
  }
  :deep(nav button) {
    width: 40px;
    height: 40px;
    background-color: $white;
    justify-content: center;
    border-radius: 5px;
  }
  :deep(.bg-primary) {
    background-color: $light-gray;
  }
  // btn
  .btn-change {
    margin-bottom: 10px;
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
}

  @media screen and (max-width: 768px) {
   .search-img {
     &--dark{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: translate(0, 0);
        z-index: 99999;
      } 
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
  .btn-search-img2 {
    &__wrapper {
      flex-direction: column;
      padding:50px;
      gap: 10px;
    }
  }
}
</style>