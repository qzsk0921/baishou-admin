<template>
  <div class="sidebar-tree-container">
    <el-tree :data="permission_routes | sidebarFilter" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

function sidebarFilter(routes) {
  let myRoutes = JSON.parse(JSON.stringify(routes));
  return myRoutes.filter(route => {
    if (route.children && route.children.length > 0) {
      route.children = sidebarFilter(route.children);
    }
    return !route.hidden;
  });
}
export default {
  computed: {
    ...mapGetters(["permission_routes"])
  },
  filters: {
    sidebarFilter
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label(data, node) {
          return data.meta.title;
        }
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      if (!data.children) {
        this.$router.push({ path: data.path }, onComplete => { }, onAbort => { });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar-tree-container {
  // transition: width 0.28s;
  // width: $sideBarWidth !important;
  // background-color: $menuBg;
  // height: 100%;
  // position: fixed;
  // font-size: 0px;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // z-index: 1001;
  // overflow: hidden;
  width: $sideBarWidth;
  display: inline-block;
}
</style>