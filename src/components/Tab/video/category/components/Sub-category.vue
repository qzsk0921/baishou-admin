<template>
  <div class="sub-category-container loading-container">
    <el-button class="btn" type="primary" @click="handleSubCategoryEdit" :disabled="!selectOne">编辑子分类</el-button>
    <div class="content">
      <div class="item-box">
        <span v-for="item in subCategory" :key="item.id">{{item.regionName}}</span>
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
    subCategory: {
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
    handleSubCategoryEdit() {
      // 跳转到导航条目排序设置页
      this.$router.push({
        name: 'SubCategory',
        params: {
          row: this.row,
          subCategory: this.subCategory
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
.sub-category-container {
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