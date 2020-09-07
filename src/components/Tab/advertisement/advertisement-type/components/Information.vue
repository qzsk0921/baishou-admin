<template>
  <div class="information-container loading-container">
    <span>名称：{{row.typeName}}</span>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {
          typeName: '',
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