<template>
  <div class="section-advertisement-container loading-container">
    <el-button
      class="btn"
      type="primary"
      @click="handleSectionAdvertisement"
      :disabled="!selectOne || !row"
    >编辑内容版块广告</el-button>
    <el-button
      class="btn"
      type="primary"
      @click="handleSectionAdvertisementOrder"
      :disabled="!selectOne || !row"
    >内容版块广告排序</el-button>
    <div class="content">
      <img v-for="item in advertisementListOfSection" :key="item.advertUrl" :src="item.advertUrl" alt />
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
    advertisementListOfSection: {
      type: Array
    }
  },
  methods: {
    handleSectionAdvertisement() {
      this.$router.push({
        name: 'ExploreEditSectionAdvertisement',
        params: {
          row: this.row,
          advertisementListOfSection: this.advertisementListOfSection
        },
        query: {
          id: this.row.id
        }
      })
    },
    handleSectionAdvertisementOrder() {
      this.$router.push({
        name: 'ExploreEditSectionAdvertisementOrder',
        params: {
          row: this.row,
          advertisementListOfSection: this.advertisementListOfSection
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
.section-advertisement-container {
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