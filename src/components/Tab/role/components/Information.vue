<template>
  <div class="information-container loading-container">
    <!-- I'm role management information<hr/> -->
    <span>角色名称：{{row.roleName}}</span>
    <!-- <span>是否可见：{{row.isActive}}</span> -->
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
          roleName: '',
          isActive: '',
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