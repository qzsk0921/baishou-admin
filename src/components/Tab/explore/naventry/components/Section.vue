<template>
  <div class="section-container loading-container">
    <el-button
      class="btn"
      type="primary"
      @click="handleSectionOrder"
      :disabled="!selectOne || !sectionList"
    >内容版块排序</el-button>
    <div class="section-list" v-for="item in sectionList" :key="item.id">
      <!-- <span class="auth" v-if="item.child.length">{{item.name}}：</span> -->
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
    sectionList: {
      type: Array
    }
  },
  methods: {
    handleSectionOrder() {
      // 跳转到内容版块排序页
      this.$router.push({
        name: 'ExploreSectionOrder',
        params: {
          row: this.row,
          sectionList: this.sectionList
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
.section-container {
  .btn {
    margin-bottom: 10px;
  }
  .section-list {
    margin-top: 10px;
    // .auth {
    //   margin-right: 5px;
    // }
  }
}
</style>