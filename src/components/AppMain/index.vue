<template>
  <div :class="classObj">
    <div class="main-container app-main">
      <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->
      <transition name="fade-transform" mode="out-in">
        <!-- <keep-alive> -->
        <router-view :key="key" />
        <!-- </keep-alive> -->
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Breadcrumb
  },
  computed: {
    key() {
      return this.$route.path
    },
    ...mapState({ device: state => state.device }),
    ...mapGetters(['sidebar']),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  height: calc(100vh - 50px);
  // background-color: #ebebeccc;
  .breadcrumb-container {
    float: left;
  }
}

// .fixed-header + .app-main {
//   padding-top: 50px;
// }

// .app-main {
//   padding-top: 50px;
// }

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    // min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    // padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
