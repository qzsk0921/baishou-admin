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
      :subAuth="currentTab==='SubAuth'?subAuth:null"
    ></component>
  </div>
</template>

<script>
import { Information, Role } from './components'
import { getOneEmployee } from '@/api/employee'

export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {
          accountName: '',
          isActive: '',
          isAppUser: '',
          loginId: '',
          loginPwd: '',
          orderNum: ''
        }
      }
    },
    selectOne: {
      type: Boolean
    }
  },
  components: { Information, Role },
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
        Role: {
          type: 2,
          text: '角色',
          component: 'Role',
          link: ''
        }
      }
    }
  },
  watch: {
    'row.id': {
      handler(n) {
        this.getOneEmployee(n)
      },
      immediate: true
    }
  },
  methods: {
    tabHandle(tab) {
      this.currentTab = tab.component
    },
    getOneEmployee(rid) {
      getOneEmployee(rid).then(res => {})
    }
  }
}
</script>