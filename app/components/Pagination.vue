<template>
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
</template>
<script setup>

</script>
<style lang="scss" scoped>
    .pagination {
    font-weight: 500;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 2px;
    &__item {
      width: 40px;
      height: 40px;
      @include flex-center;
      background-color: $white;
      transition: .2s;
      &:hover {
        background-color: $light-gray;
      }
    }
    &--active {
      background-color: $light-gray;
    }
  }

</style>