<template>
  <section class="main__img search-img__wrapper">
    <h2 class="hidden">이미지 검색 화면</h2>
    <div v-if="currentImgSection == 0" class="search-img">
      <h3 class="hidden">이미지 가져오기 화면</h3>
      <button @click="currentImgSection = 1" type="button" class="btn btn--g btn-search-img">+ 이미지 가져오기</button>
    </div>
    <!-- search img -->
    <div v-else-if="currentImgSection == 1" class="search-img btn-search-img2__wrapper search-img--dark">
      <h3 class="hidden">이미지 가져오는 방법 선택하기</h3>
      <!-- <button @click="goToNext('local')" type="button" class="btn btn-search-img2">내 컴퓨터에서 가져오기</button> -->
       <div class="my-local">
         <label for="my-local" class="btn btn-search-img2">내 컴퓨터에서 가져오기</label>
         <input type="file" accept="image/*" @change="onFileChange" id="my-local"/>
       </div>
      <button @click="goToNext('imgSite')" type="button" class="btn btn-search-img2">무료 이미지 사이트에서<br/>검색하기 (pixabay)</button>
      <button @click="goToNext('ai')" type="button" class="btn-search-img2"  disabled>ai로 만들기(개발예정)</button>
      <button @click="goToFirst()" type="button" class="btn btn--g goBack">뒤로가기</button>
    </div>
    <!-- search img methods -->
    <div v-else-if="currentImgSection == 2" class="search-img search-img--dark">
      <h3 class="hidden">이미지 검색하기</h3>
      <div class="search-img__form">
        <h4 class="hidden">이미지 검색창</h4>
        <label v-if="isMethod=='local'" for="search-img-txt">내 컴퓨터에서<br/>가져오기</label>
        <label v-else-if="isMethod=='imgSite'" for="search-img-txt">무료 이미지 사이트에서<br/>검색하기 (pixabay)</label>
        <label v-else-if="isMethod=='ai'" for="search-img-txt">ai로 만들기<br/>(chatGpt)</label>
        <div class="search-img__input">
          <input id="search-img-txt" type="text" placeholder="이미지에 추가할 텍스트를 입력해주세요" v-model="searchTxt">
          <button @click="searchImg" type="button" class="search-btn">
            <img src="" alt="">검색하기
            <span class="hidden">검색하기</span>
          </button>
        </div>
      </div>
      <!-- search for img -->
      <div v-if="isShowResultLists" class="search-img__result">
        <h4 class="hidden">검색결과</h4>
        <template v-if="resultLists.length > 0">
          <div class="search-img__lists">
            <div v-for="(item, idx) in resultLists" class="search-img__list">
              <img :src="item.preview" alt="">
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
        <img :src="resultImg" alt="" class="view-img">
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
  const editorStore = useEditorStore();
  const config = useRuntimeConfig();
  const {
    landscape, //가로형
    selectedRatio,
    ratioData,
  } = storeToRefs(editorStore);

  const emit = defineEmits(['choice-img'])

  const currentImgSection = ref(0);
  const isShowImg = ref(false);
  const isShowResultLists = ref(false);
  const isShowResultImg = ref(false);
  const isMethod = ref('');
  const resultLists = ref([]);
  const resultImg = ref('');
  const searchTxt = ref('');

  const goToNext = (method) => {
    isMethod.value = method;
    currentImgSection.value = 2;
  }
  const goToFirst = () => {
    if(resultImg.value == '') {
      currentImgSection.value = 0;
    } else {
      isShowImg.value = true;
      emit('choice-img')
    }
  }
  const goToBack = () => {
    currentImgSection.value = 1; 
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
    if (loading.value) return
    loading.value = true
    error.value = ''
    
    var URL = `https://pixabay.com/api/?key=${config.public.apiKey}&q=${encodeURIComponent(searchTxt.value)}&page=${page.value}`;
    try {
      const res = await fetch(URL)
      if (!res.ok) {
        throw new Error('API 요청 실패')
      }
      const data = await res.json()
      let maxTotal = 500;
 
      safeTotalCont.value = Math.min(data.totalHits, maxTotal);


      resultLists.value = data.hits.map(e => {return { id: e.id, preview : e.previewURL, imgSrc: e.largeImageURL, width:e.imageWidth, height: e.imageHeight }})
    } catch (e) {
      console.error(e)
      error.value = '이미지 검색 실패'
    } finally {
      loading.value = false
    }
  }

  watch(page, ()=> {
    searchForImgSite();
    
  })
  
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


  const searchForAi = () => {}
  // 크게보기
  const showDetail = (idx) => {
    resultImg.value = resultLists.value[idx].imgSrc;
    // 비율보다 가로로 더 길다면
    if( resultLists.value[idx].width * ratioCol.value / ratioRow.value > resultLists.value[idx].height){
      landscape.value = true
    } else {
      // 비율보다 세로로 더 길다면
      landscape.value = false
    }
    isShowResultImg.value = true;
  }
  // 크게보기 닫기
  const hiddenDetail = () => {
    resultImg.value = '';
    isShowResultImg.value = false;
  }
  // 이미지 선택
  const selectImg = () => {
    isShowImg.value = true;
    // reset
    currentImgSection.value = 1;
    isMethod.value = '';
    resultLists.value = [];
    isShowResultLists.value = false;
    isShowResultImg.value = false;
    editorStore.commitField('imgUrl', resultImg.value)
    emit('choice-img')
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
  }
  .btn-search-img2 {
    width: 200px;
    height: 230px;
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