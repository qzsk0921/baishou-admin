<template>
  <div class="information-container loading-container">
    <span>名称：{{row.regionName}}</span>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object
    },
    selectOne: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.information-container {
  display: flex;
  flex-direction: column;
  img {
    max-width: 400px;
  }
  span {
    margin-top: 10px;
  }
}
</style>