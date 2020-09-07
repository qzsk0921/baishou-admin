<template>
  <div class="information-container loading-container">
    <span>名称：{{row.noticeName}}</span>
    <span>是否可见：{{row.isShow==1?'是':'否'}}</span>
    <p>公告内容：{{row.noticeTxt}}</p>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {
          createTime: '',
          id: '',
          isShow: '',
          noticeName: '',
          orderNum: '',
          noticeTxt: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.information-container {
  span {
    &:nth-child(n + 2) {
      margin-left: 200px;
    }
  }
  p {
    margin-top: 20px;
  }
}
</style>