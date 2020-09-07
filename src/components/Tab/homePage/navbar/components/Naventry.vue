<template>
  <div class="naventry-container loading-container">
    <el-button
      class="btn"
      type="primary"
      @click="handleNavbarItemOrder"
      :disabled="!selectOne || !navbarItems"
    >导航条目排序</el-button>
    <div class="content">
      <div class="tit">导航条目：</div>
      <div class="item-box">
        <span v-for="item in navbarItems" :key="item.id">{{item.itemName}}</span>
      </div>
    </div>
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
    navbarItems: {
      type: Array
    }
  },
  // watch: {
  //   'row.id': {
  //     handler(n) {
  //       this.mounted()
  //     }
  //   }
  // },
  methods: {
    handleNavbarItemOrder() {
      // 跳转到导航条目排序设置页
      this.$router.push({
        name: 'NavbarItemOrder',
        params: {
          row: this.row,
          navbarItems: this.navbarItems
        },
        query: {
          id: this.row.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.naventry-container {
  .btn {
    margin-bottom: 10px;
  }
  .content {
    margin-top: 10px;
    .item-box {
      display: flex;
      flex-wrap: wrap;
      span {
        width: 25%;
        margin-top: 10px;
      }
    }
  }
}
</style>