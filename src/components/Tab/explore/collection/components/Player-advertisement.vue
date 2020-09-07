<template>
  <div class="player-advertisement-container loading-container">
    <el-button class="btn" type="primary" @click="handleBanner" :disabled="!selectOne || !row">编辑播放器广告</el-button>
    <div class="content" v-if="playerAdvertisementList">
      <div class="section" v-for="(item, index) in section" :key="item.tit">
        <span>{{item.tit}}</span>
        <div class="cont">
          <div class="item" v-for="it in split(index+1, playerAdvertisementList)" :key="it.id">
            <span class="advertisement-name">{{it.sourceName}}</span>
            <span v-if="it.playLength!=='0'">播放时长：{{it.playLength}}s</span>
          </div>
        </div>
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
    playerAdvertisementList: {
      type: Array
    }
  },
  data() {
    return {
      section: [
        { tit: '播放头广告：' },
        { tit: '插播广告：' },
        { tit: '悬浮广告：' }
      ]
    }
  },
  methods: {
    handleBanner() {
      this.$router.push({
        name: 'ExploreEditPlayerAdvertisement',
        params: {
          row: this.row,
          playerAdvertisementList: this.playerAdvertisementList
        },
        query: {
          id: this.row.id
        }
      })
    },
    split(type, data) {
      if (!data) return
      return data.filter(_ => _.playType == type)
    }
  }
}
</script>

<style lang="scss" scoped>
.player-advertisement-container {
  .content {
    .section {
      margin-top: 20px;
      .cont {
        display: inline-block;
        vertical-align: top;
        .advertisement-name {
          display: inline-block;
          width: 200px;
        }
        .item {
          margin-bottom: 10px;
        }
      }
    }
  }
  .btn {
    margin-bottom: 10px;
  }
}
</style>