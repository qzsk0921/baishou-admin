<template>
  <div class="information-container loading-container">
    <span>名称：{{row.sectionName}}</span>
    <span>是否可见：{{row.isActive==1?'是':'否'}}</span>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {
          advertPosition: '',
          collectionNum: '',
          createTime: '',
          id: '',
          isActive: '',
          isCollectionTitle: '',
          isSectionTitle: '',
          isStatic: '',
          itemId: '',
          loadCount: '',
          loadUrl: '',
          navbarId: '',
          orderNum: '',
          sectionName: '',
          sectionTitle: '',
          taskBarId: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.information-container {
  display: flex;
  flex-wrap: wrap;
  span {
    width: 50%;
    &:nth-child(n + 3) {
      margin-top: 20px;
    }
  }
}
</style>