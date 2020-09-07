<template>
  <div class="information-container loading-container">
    <span>名称：{{row.sourceName}}</span>
    <span>大小：{{row.sourceSize}}</span>
    <span>创建时间：{{row.createTime}}</span>
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
  span {
    margin-top: 10px;
    &:not(:last-child) {
      margin-right: 100px;
    }
  }
}
</style>