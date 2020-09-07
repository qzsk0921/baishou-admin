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
      :subCategory="subCategory"
    ></component>
  </div>
</template>

<script>
import { Information, SubCategory } from './components'
import { getCategoryList2 } from '@/api/video'

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
    Information,
    SubCategory
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
        },
        SubCategory: {
          type: 2,
          text: '子分类',
          component: 'SubCategory',
          link: ''
        }
      },
      subCategory: null //子分类
    }
  },
  watch: {
    'row.id': {
      handler(n) {
        this.getCategoryList2(n)
      },
      immediate: true
    }
  },
  methods: {
    tabHandle(tab) {
      this.currentTab = tab.component
    },
    getCategoryList2() {
      getCategoryList2({ parentId: this.row.id }, '.tab-container').then(
        res => {
          this.subCategory = res.object
        }
      )
    }
  },
  mounted() {
    this.getCategoryList2()
  }
}
</script>