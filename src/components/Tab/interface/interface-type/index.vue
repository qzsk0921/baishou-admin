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
    <component v-if="row" :is="currentTab" class="module" :row="row" :selectOne="selectOne"></component>
  </div>
</template>

<script>
import { Information, InterfaceList } from './components'

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
    },
    selectOne: {
      type: Boolean
    }
  },
  components: { Information, InterfaceList },
  data() {
    return {
      currentTab: 'Information',
      tabs: {
        Information: {
          type: 1,
          text: '基本信息',
          component: 'Information',
          link: ''
        },
        InterfaceList: {
          type: 2,
          text: '界面列表',
          component: 'InterfaceList',
          link: ''
        }
      }
    }
  },
  watch: {
    'row.id': {
      handler(n) {
        // this.myRow = {}
        // this.myRow = this.row
      }
      // immediate: true
    }
  },
  methods: {
    tabHandle(tab) {
      this.currentTab = tab.component
    }
  },
  mounted() {
    // this.myRow = {}
    // this.myRow = this.row
  }
}
</script>