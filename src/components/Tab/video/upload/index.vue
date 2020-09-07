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
import { Information } from './components'

export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {
          createTime: '',
          id: '',
          orderNum: '',
          regionCode: '',
          regionName: ''
        }
      }
    },
    selectOne: {
      type: Boolean
    }
  },
  components: {
    Information
  },
  data() {
    return {
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
  //   watch: {
  //     'row.id': {
  //       handler(n) {
  //         this.getCategoryList2(n)
  //       },
  //       immediate: true
  //     }
  //   },
  methods: {
    tabHandle(tab) {
      this.currentTab = tab.component
    }
  }
}
</script>