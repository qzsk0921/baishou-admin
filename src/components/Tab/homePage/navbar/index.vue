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
      :navbarItems="navbarItems"
      :navbarObj="navbarObj"
    ></component>
  </div>
</template>

<script>
import { Information, Naventry } from './components'
import { getOneNavbar, getNavbarItems } from '@/api/home-page'

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
  components: { Information, Naventry },
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
        Naventry: {
          type: 2,
          text: '导航条目',
          component: 'Naventry',
          link: ''
        }
      },
      navbarObj: null, //导航栏
      navbarItems: null //导航条目
    }
  },
  watch: {
    'row.id': {
      handler(n) {
        this.getOneNavbar(n)
        this.getNavbarItems(n)
      },
      immediate: true
    }
  },
  methods: {
    tabHandle(tab) {
      this.currentTab = tab.component
    },
    getOneNavbar(id) {
      getOneNavbar(id, '.tab-container').then(res => {
        this.navbarObj = res.object
      })
    },
    getNavbarItems(id) {
      getNavbarItems(id, '.tab-container').then(res => {
        this.navbarItems = res.object
      })
    }
  }
}
</script>