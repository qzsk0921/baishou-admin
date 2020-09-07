<template>
  <div class="detail-interface-container loading-container">
    <el-button class="btn" type="primary" @click="handleDetailInterface" :disabled="!selectOne || !row">编辑详情界面</el-button>
    <div class="content">
      <div class="nav" v-if="collectionDetailList.linkType==='1'">
        <span>导航条目：{{naventryObj.itemName}}</span>
      </div>
      <div class="interface" v-else-if="collectionDetailList.linkType==='2'">
        <span>界面名称：{{interfaceObj.name}}</span>
        <span>
          界面预览：
          <img :src="interfaceObj.url" alt />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getOneInterface } from '@/api/interface'
import { getOneNaventry } from '@/api/explore'

export default {
  props: {
    row: {
      type: Object
    },
    selectOne: {
      type: Boolean
    },
    collectionDetailList: {
      type: Object
    }
  },
  data() {
    return {
      interfaceObj: { name: '' },
      naventryObj: { itemName: '' }
    }
  },
  methods: {
    handleDetailInterface() {
      this.$router.push({
        name: 'ExploreEditDetailInterface',
        params: { row: this.row },
        query: {
          id: this.row.id
        }
      })
    }
  },
  mounted() {
    if (this.collectionDetailList.linkType === '2') {
      getOneInterface(
        this.collectionDetailList.interfaceId,
        '.loading-container'
      ).then(res => {
        this.interfaceObj = res.object
      })
    } else if (this.collectionDetailList.linkType === '1') {
      getOneNaventry(
        this.collectionDetailList.itemId,
        '.loading-container'
      ).then(res => {
        this.naventryObj = res.object
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-interface-container {
  .content {
    margin-top: 10px;
    .interface {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      span {
        margin-top: 10px;
        &:last-child {
          img {
            display: inline-block;
            vertical-align: top;
            max-width: 400px;
          }
        }
      }
    }
  }
  .btn {
    margin-bottom: 10px;
  }
}
</style>