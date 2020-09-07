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
    <component v-if="row" :is="currentTab" class="module" :row="myRow" :selectOne="selectOne"></component>
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
          code: '',
          createTime: '',
          id: '',
          interfaceId: '',
          isActive: '',
          name: '',
          orderNum: '',
          url: ''
        }
      }
    },
    selectOne: {
      type: Boolean
    }
  },
  components: { Information },
  data() {
    return {
      myRow: {},
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
        this.myRow = {}
        this.myRow = this.row
      },
      immediate: true
    }
  },
  methods: {
    tabHandle(tab) {
      this.currentTab = tab.component
    }
  }
}
</script>