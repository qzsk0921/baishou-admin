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
      :subAuth="currentTab==='SubAuth'?subAuth:null"
    ></component>
  </div>
</template>

<script>
import { Information, SubAuth } from './components'
import { getSubAuth } from '@/api/auth'

export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {
          id: '',
          name: '',
          visible: '',
          index: '',
          createTime: '',
          subAuth: ''
        }
      }
    }
  },
  components: { Information, SubAuth },
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
        SubAuth: {
          type: 2,
          text: '子权限',
          component: 'SubAuth',
          link: ''
        }
      },
      subAuth: [] //子权限数据
    }
  },
  watch: {
    'row.id': {
      handler(n) {
        this.getSubAuth(n)
      },
      immediate: true
    }
  },
  methods: {
    tabHandle(tab) {
      this.currentTab = tab.component
    },
    getSubAuth(pid) {
      getSubAuth(pid).then(res => {
        this.subAuth = res.object
      })
    }
  }
}
</script>