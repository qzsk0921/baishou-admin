<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <div class="sidebar-logo-link">
        <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
        <h1 v-show="!collapse" class="sidebar-title">{{ title }}</h1>
        <!-- <img v-if="logo" :src="logo" class="sidebar-logo" /> -->
      </div>
    </transition>
  </div>
</template>

<script>
import Hamburger from '@/components/Hamburger'

export default {
  name: 'SidebarLogo',
  components: { Hamburger },
  props: {
    collapse: {
      type: Boolean,
      required: true
    },
    sidebar: {
      type: Object
    }
  },
  data() {
    return {
      // title: 'Vue Element Admin',
      title: '白手起家'
      //   logo:
      //     'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585736432345&di=fb218783ae2a9380d8fd6740764e9454&imgtype=0&src=http%3A%2F%2Fimage.yy.com%2Fyywebalbumbs2bucket%2F5b1e12b2154a418598c17aa0b8551f71_1494550467521.jpg'
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  // background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 14px;
    background-color: $color-primary;
    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
      display: inline-block;
      border-radius: 5px;
    }

    & .sidebar-title {
      display: inline-block;
      margin-left: 20px;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo-link {
      padding-left: 0;
      display: flex;
      justify-content: center;
    }
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
