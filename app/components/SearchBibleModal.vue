<template>
  <div class="win__wrapper">
    <div class="win bible">
      <h2 class="main-ttl win__ttl">✝️성경구절 찾기</h2>
      <form class="bible__search" @submit.prevent="onSearch">
        <div>
          <label for="bible-version" class="hidden">성경 버전</label>
          <select name="bible-version" id="bible-version" class="selectbox">
            <option value="개역한글">개역한글</option>
            <option value="신약">신약</option>
          </select>
        </div>
        <div>
          <label for="bible-version" class="hidden">신약,구약</label>
          <select name="bible-version" id="" class="selectbox">
            <option value="구약">구약</option>
            <option value="신약">신약</option>
          </select>
        </div>
        <div>
          <label for="bible-division" class="hidden">성경</label>
          <select name="bible-division" id="bible-division" class="selectbox">
            <option value="마태복음">마태복음</option>
            <option value="신약">신약</option>
          </select>
        </div>
        <div role="group" aria-labelledby="range-label" class="bible__range">
          <span id="range-label" class="hidden">구절 범위</span>
          <div class="verse">
            <div>
              <label for="bible-chapter-start" class="hidden">시작 장</label>
              <select name="bible-chapter-start" id="bible-verse-start" class="selectbox">
                <option value="1">1</option>
              </select>
            </div>
            <div>
              <label for="bible-verse-start" class="hidden">시작 절</label>
              <select name="bible-verse-start" id="bible-verse-start" class="selectbox">
                <option value="1">1</option>
              </select>
            </div>
          </div>~
          <div class="verse">
            <div>
              <label for="bible-chapter-end" class="hidden">마지막 장</label>
              <select name="bible-chapter-end" id="bible-chapter-end" class="selectbox">
                <option value="1">1</option>
              </select>
            </div>
            <div>
              <label for="bible-verse-end" class="hidden">마지막 절</label>
              <select name="bible-verse-end" id="bible-verse-end" class="selectbox">
                <option value="1">11</option>
              </select>
            </div>
          </div>
        </div>
        <button type="button" class="btn btn--g">검색하기</button>
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
  import { ref } from 'vue';
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
    .verse .selectbox {
      min-width: 40px;
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