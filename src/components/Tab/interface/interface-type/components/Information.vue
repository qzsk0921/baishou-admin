<template>
  <div class="information-container loading-container">
    <span>名称：{{myRow.name}}</span>
    <span>简介：{{myRow.introduction}}</span>
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
          introduction: '',
          isActive: '',
          name: '',
          orderNum: ''
        }
      }
    }
  },
  data() {
    return {
      myRow: {},
    }
  },
  watch: {
    'row.id': {
      handler(n) {
        this.myRow = {}
        this.myRow = this.row
      }
      // immediate: true
    }
  },
  mounted() {
    this.myRow = {}
    this.myRow = this.row
  }
}
</script>

<style lang="scss" scoped>
.information-container {
  display: flex;
  flex-wrap: wrap;
  span {
    width: 50%;
  }
}
</style>