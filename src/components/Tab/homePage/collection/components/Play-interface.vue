<template>
  <div class="play-interface-container loading-container">
    <el-button class="btn" type="primary" @click="handleBanner" :disabled="!selectOne || !row">编辑播放界面</el-button>
  </div>
</template>

<script>
import { getPlayfaceCollection } from '@/api/home-page'

export default {
  props: {
    row: {
      type: Object
    },
    selectOne: {
      type: Boolean
    }
  },
  methods: {
    handleBanner() {
      this.$router.push({
        name: 'EditPlayInterface',
        params: {
          row: this.row,
          playinterface: this.playinterface
        },
        query: {
          id: this.row.id
        }
      })
    },
    getPlayfaceCollection() {
      getPlayfaceCollection(this.row.id, '.loading-container').then(res => {
        this.playinterface = res.object
      })
    }
  },
  mounted() {
    this.getPlayfaceCollection()
  }
}
</script>

<style lang="scss" scoped>
.play-interface-container {
  .btn {
    margin-bottom: 10px;
  }
}
</style>