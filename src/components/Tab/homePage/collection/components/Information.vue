<template>
  <div class="information-container loading-container">
    <img :src="row.titlePicture" alt />
    <span>名称：{{row.collectionName}}</span>
    <span>预览数量：{{row.previewCount}}</span>
    <span>加载数量：{{row.loadCount}}</span>
    <span>简介：{{row.collectionDesc}}</span>
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
    },
    sectionList: {
      type: Array
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