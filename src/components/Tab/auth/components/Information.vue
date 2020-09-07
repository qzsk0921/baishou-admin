<template>
  <div class="information-container loading-container">
    <!-- I'm autho management information<hr/> -->
    <span>权限名称：{{row.name}}</span>
    <span>是否可见：{{row.isShow}}</span>
    <span>序号：{{row.orderNum}}</span>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {
          name: '',
          isShow: '',
          orderNum: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.information-container {
  span {
    &:not(:first-child) {
      margin-left: 50px;
    }
  }
}
</style>