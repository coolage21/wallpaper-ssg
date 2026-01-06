<template>
  <header class="header">
    <h1 class="header__ttl main-ttl">
      휴대폰, 컴퓨터 배경화면 🖥️
    </h1>
    <p class="header__desc">
      배경화면 만들기 사이트입니다. ppt 배경이미지를 제작하기 쉽게 하기 위해 만든 사이트로<br class="m-none"> 
      이미지를 검색해서 불러올 경우 해당 이미지 사이트의 라이센스에 맞게 사용 하시길 권장 드립니다.
    </p>
  </header>
</template>
<script setup>

</script>
<style lang="scss" scoped>
.header {
  display: flex;
  margin-bottom: 30px;
  &__ttl {
    margin-right: 24px;
  }
}

@media screen and (max-width: 1480px) {
  .header {
    flex-direction: column;
    &__ttl {
      margin-bottom: 10px;
    }
  }
}
@media screen and (max-width: 1024px) {
  .header {
    margin-bottom: 70px;
  }
}
@media screen and (max-width: 768px) {
  .header {
    max-width: 95vw;
    margin: 0 auto 20px auto;
  }
}
</style>