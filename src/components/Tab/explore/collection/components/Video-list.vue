<template>
  <div class="video-list-container loading-container">
    <el-button class="btn" type="primary" @click="handleBanner" :disabled="!selectOne || !row">编辑视频列表</el-button>
  </div>
</template>

<script>
import { getVideoListCollection } from '@/api/explore'

export default {
  props: {
    row: {
      type: Object
    },
    selectOne: {
      type: Boolean
    }
  },
  data() {
    return {
      videoListCollection: null
    }
  },
  methods: {
    handleBanner() {
      this.$router.push({
        name: 'ExploreEditVideoList',
        params: {
          row: this.row,
          videoListCollection: this.videoListCollection
        },
        query: {
          id: this.row.id
        }
      })
    },
    getVideoListCollection() {
      getVideoListCollection(this.row.id, '.loading-container').then(res => {
        this.videoListCollection = res.object
      })
    }
  },
  mounted() {
    this.getVideoListCollection()
  }
}
</script>

<style lang="scss" scoped>
.video-list-container {
  .btn {
    margin-bottom: 10px;
  }
}
</style>