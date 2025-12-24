<template>
  <div>
    <div>
      <h2>button</h2>
      <button type="button" class="btn">
        text
      </button>
      <button type="button" class="btn btn--g">
        text
      </button>
      <button type="button" class="btn btn--w">
        text
      </button>
    </div>
    <div>
      <h2>button</h2>
      <button type="button" class="btn2">
        text
      </button>
      <button type="button" class="btn2 btn2--checked">
        text
      </button>
      <button type="button" class="btn2 btn2--unchecked">
        text
      </button>
      <button type="button" class="btn2 btn2--disabled">
        text
      </button>
    </div>
    <div>
      <h2>페이지네이션</h2>
      <ul class="pagination">
        <li>
          <button class="pagination__item"><</button>
        </li>
         <li>
          <button class="pagination__item">1</button>
        </li>
         <li>
          <button class="pagination__item">2</button>
        </li>
         <li>
          <button class="pagination__item">3</button>
        </li>
         <li>
          <button class="pagination__item">4</button>
        </li>
         <li>
          <button class="pagination__item pagination--active">5</button>
        </li>
         <li>
          <button class="pagination__item">></button>
        </li>
      </ul>
    </div>
    <div class="">
      <h2>폼 셀렉트박스1</h2>
      <label for="">셀렉트1</label>
      <select name="" id="selectbox" class="selectbox">
        <option value="">
          text
        </option>
        <option value="">
          text
        </option>
      </select>
    </div>
    <div>
      <h2>폼 셀렉트박스2</h2>
      <label for="selectbox2">셀렉트2</label>
      <select name="" id="selectbox2" class="selectbox2">
        <option value="">
          text
        </option>
        <option value="">
          text
        </option>
        <option value="">
          text
        </option>
        <option value="">
          text
        </option>
      </select>
    </div>
    <div>
      <h2>폼 토글</h2>
      <button class="toggle">
        <span class="toggle__btn">
          <i></i>
        </span>
        <span>true</span>
      </button>
      <button class="toggle">
        <span class="toggle__btn toggle__btn--f">
          <i></i>
        </span>
        <span>false</span>
      </button>
    </div>
    <div>
      <h2>폼 색상</h2>
      <div class="inline-flex form__color">
        <label for="" class="hidden">색 선택</label>
        <input title="색 선택" type="color" id="" class="input--color">
        <label for="" class="label">투명도:</label>
        <input type="text" id="" value="100%" class="input">
          <button class="noColor">
            <span class="hidden">색 선택안함</span>
          </button>
      </div>
    </div>
    <div>
      <h2>폼 텍스트</h2>
      <label for="textarea">텍스트에리아</label>
      <textarea name="" id="textarea" placeholder="이미지에 추가 할 텍스트를 입력해주세요." class="textarea">

      </textarea>
    </div>
    <div>
     
    </div>
  </div>
</template>
<script setup>

</script>
<style lang="scss">

</style>