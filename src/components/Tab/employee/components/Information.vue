<template>
  <div class="information-container loading-container">
    <!-- I'm role management information<hr/> -->
    <span>员工账号：{{row.loginId}}</span>
    <span>真实姓名：{{row.accountName}}</span>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {
          appUserId: '',
          accountName: ''
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