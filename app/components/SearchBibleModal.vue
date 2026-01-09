<template>
  <div class="win__wrapper">
    <div class="win bible">
      <h2 class="main-ttl win__ttl">✝️성경구절 찾기</h2>
      <form class="bible__search" @submit.prevent="onSearch">
        <div>
          <label for="bible-version" class="hidden">성경 버전</label>
          <select name="bible-version" id="bible-version" class="selectbox" v-model="selectedBibleVersion">
            <option value="web">WEB</option>
            <option value="kjv">KJB</option>
          </select>
        </div>
        <div>
          <label for="bible-version2" class="hidden">신약,구약</label>
          <select name="bible-version" id="bible-version2" class="selectbox" v-model="selectedVersion">
            <option v-for="item in bibleList" :value="item.version">{{item.version}}</option>
          </select>
        </div>
        <div>
          <label for="bible-division" class="hidden">성경</label>
          <select name="bible-division" id="bible-division" class="selectbox" v-model="selectedBibleName">
            <option v-for="item in bibleNameList" :value="item.value">{{item.label}}</option>
          </select>
        </div>
        <div role="group" aria-labelledby="range-label" class="bible__range">
          <span id="range-label" class="hidden">구절 범위</span>
          <div class="verse">
            <div>
              <label for="bible-chapter-start" class="hidden">시작 장</label>
              <input type="number" id="bible-chapter-start" class="input2"  v-model="startChapter"/>
            </div>
            <div>
              <label for="bible-verse-start" class="hidden">시작 절</label>
              <input type="number" id="bible-verse-start" class="input2"  v-model="startVerse"/>
            </div>
          </div>~
          <div class="verse">
            <div>
              <label for="bible-chapter-end" class="hidden">마지막 장</label>
               <input type="number" id="bible-chapter-end" class="input2" v-model="endChapter"/>
            </div>
            <div>
              <label for="bible-verse-end" class="hidden">마지막 절</label>
              <input type="number" id="bible-verse-end" class="input2" v-model="endVerse"/>
            </div>
          </div>
        </div>
        <button type="button" class="btn btn--g"  @click="applyVerse" :disabled="loading">검색하기</button>
      </form>
      <!-- search bible -->
      <div class="bible__show">
        <label for="bible-show" class="hidden">성경구절 검색 결과</label>
        <textarea name="bible-show" id="bible-show" class="textarea bible__area" placeholder="성경구절이 보이는 구간입니다." v-model="bibleTxt">
        </textarea>
      </div>
      <!-- show bible -->
      <div class="btn-wrapper">
        <button @click="closeModal" type="button" class="btn btn--g btn-close">닫기</button>
        <button @click="insertBible" type="button" class="btn">성경구절 등록하기</button>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref, version } from 'vue';
  import { useBible } from './../../composables/useBible'
  import {useEditorStore} from './../../stores/editor';

  const { fetchVerse, bibleList } = useBible();
  const editorStore = useEditorStore();
  
  // 열고 닫기
  const emit = defineEmits([
    'close-modal', 
  ]
  )
  const bibleTxt = ref('');
  const closeModal = () => {
    emit('close-modal');
  }
  const insertBible = () => {
    emit('close-modal');
    emit('bible-txt', bibleTxt)
  }

  // 성경 검색 form
  const passage = ref('') // 전체 구절
  
  const selectedBibleVersion = ref('web'); // 선택된 버전
  const selectedVersion = ref(bibleList.value[0].version); // 선택된 버전
  const bibleNameList = ref(
    bibleList.value[0].list
  ); // 성경목록
  const selectedBibleName = ref(bibleNameList.value[0].value); // 선택된항목
  const startChapter = ref(1); // 시작 장
  const endChapter = ref(1); // 시작 절
  const startVerse = ref(1); // 마지막 장
  const endVerse = ref(1); // 마지막 절
  
    watch(selectedVersion, () => {
    let searchBibleList = bibleList.value.find(f => f.version === selectedVersion.value);
    if(searchBibleList) {
      let list = searchBibleList.list;
      bibleNameList.value = list;
      selectedBibleName.value = bibleNameList.value[0].value
    }
  })
  
  // 성경 검색하기
  const loading = ref(false) 
  const error = ref('')

  const applyVerse = async () => {
  loading.value = true
  error.value = ''
  passage.value = `${selectedBibleName.value} ${startChapter.value}:${startVerse.value}-${endChapter.value}:${endVerse.value}`
  console.log(passage.value)
  try {
    const data = await fetchVerse(passage.value, selectedBibleVersion.value)
    bibleTxt.value = data.text;
  } catch (e) {
    error.value = '불러오기 실패'
  } finally {
    loading.value = false
  } 
}
</script>
<style lang="scss" scoped>
  .bible{
    &__search, &__range, .verse {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    &__area {
      width: 100%;
      margin: 28px 0 20px;
      height: 360px;
    }
    .input2 {
    padding: 8px 10px;
    border-radius: 0;
    min-width: 40px;
     width: 120px;
    }
  }
  .btn-wrapper {
    width: 100%;
    text-align: right;
  }
  .btn-close {
    margin-right: 10px;
  }
  
</style>