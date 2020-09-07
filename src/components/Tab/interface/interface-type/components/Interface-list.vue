<style lang="scss" scoped>
.interface-list-container {
  display: flex;
  flex-flow: wrap;
  text-align: center;
  justify-content: space-between;
  .interface-item {
    // width: 30%;
    img {
      margin-top: 10px;
    }
  }
}
</style>
<template>
  <div class="interface-list-container loading-container">
    <div v-for="item in interfaceList" :key="item.id" class="interface-item">
      <span>{{item.name}}</span>
      <!-- {{item.url}} -->
      <img :src="item.url" alt />
    </div>
  </div>
</template>

<script>
import { getInterfaceList } from '@/api/interface'

export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {
          code: '',
          createTime: '',
          id: '',
          introduction: '',
          isActive: '',
          name: '',
          orderNum: ''
        }
      }
    }
  },
  data() {
    return {
      interfaceList: null
    }
  },
  watch: {
    'row.id': {
      handler(nv) {
        this.getInterfaceList({
          interfaceId: nv
        })
      }
    }
  },
  methods: {
    getInterfaceList({
      isSearchCount = 1,
      pageNum = 1,
      pageSize = 1000,
      name = '',
      code = '',
      isActive = '',
      interfaceId = ''
    } = {}) {
      getInterfaceList(
        {
          isSearchCount,
          pageNum,
          pageSize,
          name,
          code,
          isActive,
          interfaceId
        },
        '.loading-container'
      ).then(res => {
        const data = res.object
        this.interfaceList = data.records
      })
    }
  },
  mounted() {
    this.getInterfaceList({
      interfaceId: this.row.id
    })
  }
}
</script>