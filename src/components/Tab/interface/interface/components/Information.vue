<template>
  <div class="information-container loading-container">
    <span>名称：{{row.name}}</span>
    <span>编码：{{row.code}}</span>
    <span>
      效果预览：
      <img :src="row.url" alt />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {
          code: '',
          createTime: '',
          id: '',
          interfaceId: '',
          isActive: '',
          name: '',
          orderNum: '',
          url: ''
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
    img {
        margin-top: 10px;
    }
  }
}
</style>