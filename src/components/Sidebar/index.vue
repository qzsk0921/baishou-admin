<template>
  <div :class="classObj">
    <div class="sidebar-container">
      <logo :sidebar="sidebar" :collapse="isCollapse" />
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="false"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item
            v-for="route in permission_routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
            @click.native="handleClick(route)"
          />
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import variables from '@/style/_variables.scss'
import { mapState, mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import Logo from './Logo'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapState({ device: state => state.device }),
    ...mapGetters(['sidebar', 'permission_routes', 'menu_id']),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // 如果设置路径，侧边栏将突出显示设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    }
  },
  methods: {
    // 配合后端:调用接口时接口所在页面带上所归属的的菜单ID 在header: menuId
    handleClick(route) {
      if (this.menu_id !== route.meta.id)
        this.$store.dispatch('permission/setCurrentMenuId', route.meta.id)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// @import "~@/style/variables.scss";

.sidebar-container {
}
</style>