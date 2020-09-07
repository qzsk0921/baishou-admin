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
      :subPermission="currentTab==='SubPermission'?subPermission:null"
    ></component>
  </div>
</template>

<script>
import { Information, SubPermission } from './components'
// import { getOneRole, getRoleCode } from '@/api/role'

export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {
          roleName: '',
          isActive: '',
          orderNum: ''
        }
      }
    },
    selectOne: {
      type: Boolean
    }
  },
  components: { Information, SubPermission },
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
        SubPermission: {
          type: 2,
          text: '权限',
          component: 'SubPermission',
          link: ''
        }
      },
      subPermission: [] //角色包含的一部分权限
    }
  },
  // watch: {
  //   'row.id': {
  //     handler(n) {
  //       this.getOneRole(n)
  //       this.getRoleCode(n)
  //     },
  //     immediate: true
  //   }
  // },
  methods: {
    tabHandle(tab) {
      this.currentTab = tab.component
    }
    // getOneRole(rid) {
    //   getOneRole(rid).then(res => {})
    // },
    // getRoleCode(rid) {
    //   getRoleCode(rid).then(res => {})
    // },
  }
}
</script>