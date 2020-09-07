<template>
  <div class="collection-container loading-container">
    <el-button class="btn" type="primary" @click="handleCollectionOrder" :disabled="!selectOne">合辑排序</el-button>
    <div class="content">
      <div class="tit">包含的合辑列表：</div>
      <div class="item-box">
        <span v-for="item in collectionListOfSection" :key="item.id">{{item.collectionName}}</span>
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
    collectionListOfSection: {
      type: Array
    }
  },
  methods: {
    handleCollectionOrder() {
      // 跳转到合辑排序页
      this.$router.push({
        name: 'EditCollectionOrder',
        params: {
          row: this.row,
          collectionListOfSection: this.collectionListOfSection
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
.collection-container {
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