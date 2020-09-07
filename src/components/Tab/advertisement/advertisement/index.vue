<template>
  <div class="tab-container">
    <ul class="tabs">
      <li
        v-for="tab in tabs"
        :key="tab.text"
        :to="tab.link"
        :class="['tab',{'active':currentTab===tab.component}]"
        @click="tabHandle(tab)"
      >{{tab.text}}</li>
    </ul>
    <component
      v-if="row"
      :is="currentTab"
      class="module"
      :row="row"
      :selectOne="selectOne"
      :advertisementType="advertisementType"
    ></component>
  </div>
</template>

<script>
import { Information } from './components'

export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {
          advertDesc: '',
          advertLink: '',
          advertStatus: '',
          begTime: '',
          clientName: '',
          createTime: '',
          createUserId: '',
          createUserName: '',
          endTime: '',
          fileFormat: '',
          filePath: '',
          id: '',
          sourceCode: '',
          sourceName: '',
          typeId: ''
        }
      }
    },
    selectOne: {
      type: Boolean
    },
    advertisementType: {
      type: Array
    }
  },
  components: { Information },
  data() {
    return {
      myRow: {}, //根据ID获取对象(getOne取)
      currentTab: 'Information',
      tabs: {
        Information: {
          type: 1,
          text: '基本信息',
          component: 'Information',
          link: ''
        }
      }
    }
  },
  watch: {
    'row.id': {
      handler(n) {
        if (n) {
          this.parseAdvertisementType()
        }
      }
      // immediate: true
    }
  },
  methods: {
    tabHandle(tab) {
      this.currentTab = tab.component
    },
    //广告类型id转换成广告类型名称
    parseAdvertisementType() {
      for (const iterator of this.advertisementType) {
        if (iterator.value === this.row.typeId) {
          this.row.typeId = iterator.label
          break
        }
      }
    }
  }
}
</script>