<template>
  <div class="subAuth-container loading-container">
    <!-- I'm autho management SubAuth<hr /> -->
    <span v-for="item in subAuth" :key="item.id">{{item.name}}</span>
  </div>
</template>

<script>
export default {
  props: {
    // row: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       subAuth: ''
    //     }
    //   }
    // },
    subAuth: {
      type: Array,
      default: () => {
        return {
          subAuth: [] //[{id: 11, name: "公告管理", orderNum: 1, isShow: 1, url: "", pid: 10, child: null, apiList: null},…]
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.subAuth-container {
  span {
    &:not(:first-child) {
      margin-left: 50px;
    }
  }
}
</style>