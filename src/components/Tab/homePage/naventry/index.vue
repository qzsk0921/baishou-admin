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
      :sectionList="sectionList"
      :interfaceObj="interfaceObj"
    ></component>
  </div>
</template>

<script>
import { Information, Section } from './components'
import { getOneInterface } from '@/api/interface'
import { getSectionByNaventry } from '@/api/home-page'

export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {
          createTime: '',
          id: '',
          isShow: '',
          itemCount: '',
          navbarCode: '',
          navbarName: '',
          orderNum: '',
          styleId: '',
          taskBarId: ''
        }
      }
    },
    selectOne: {
      type: Boolean
    }
  },
  components: { Information, Section },
  data() {
    return {
      interfaceObj: null,
      currentTab: null,
      tabs: {
        Information: {
          type: 1,
          text: '基本信息',
          component: 'Information',
          link: ''
        },
        Naventry: {
          type: 2,
          text: '内容版块',
          component: 'Section',
          link: ''
        }
      },
      sectionList: []
    }
  },
  watch: {
    'row.id': {
      handler(n) {
        this.getOneInterface(this.row.interfaceId)

        this.getSectionByNaventry(n)
      },
      immediate: true
    }
  },
  methods: {
    tabHandle(tab) {
      this.currentTab = tab.component
    },
    getOneInterface(id) {
      getOneInterface(id, '.tab-container').then(res => {
        this.interfaceObj = res.object
        this.tabHandle({ component: 'Information' })
      })
    },
    getSectionByNaventry(id) {
      getSectionByNaventry(id).then(res => {
        this.sectionList = res.object
      })
    }
  },
  mounted() {}
}
</script>