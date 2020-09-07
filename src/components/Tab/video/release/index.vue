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
import { Release } from './components'

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
    Release
  },
  data() {
    return {
      currentTab: 'Release',
      tabs: {
        Release: {
          type: 1,
          text: '发布视频',
          component: 'Release',
          link: ''
        }
      }
    }
  },
  methods: {
    tabHandle(tab) {
      this.currentTab = tab.component
    }
  }
}
</script>