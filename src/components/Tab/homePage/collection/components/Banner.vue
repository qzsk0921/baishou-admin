<template>
  <div class="banner-container loading-container">
    <el-button class="btn" type="primary" @click="handleBanner" :disabled="!selectOne || !row">编辑Banner</el-button>
    <div class="content">
      <img v-for="item in bannerList" :key="item.targetUrl" :src="item.targetUrl" alt="">
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
    bannerList: {
      type: Array
    }
  },
  methods: {
    handleBanner() {
      this.$router.push({
        name: 'EditBanner',
        params: { row: this.row, bannerList: this.bannerList },
        query: {
          id: this.row.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-container {
  .content {
    margin-top: 10px;
    img {
      max-width: 300px;
      display: inline-block;
      margin: 0 20px 20px 0;
    }
  }
  .btn {
    margin-bottom: 10px;
  }
}
</style>