<template>
  <div class="information-container loading-container">
    <span>名称：{{row.navbarName}}</span>
    <span>样式：{{navbarObj | getNavbarStyleName}}</span>
    <span>显示导航条目：{{row.isShow==1?'是':'否'}}</span>
  </div>
</template>

<script>
import navbarStyleList from '@/config/navbarStyle'

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
    navbarObj: {
      type: Object
    }
  },
  filters: {
    getNavbarStyleName(data) {
      if (!data) return

      let navbarStyleName = ''
      navbarStyleList.some(_ => {
        if (_.value === data.styleCode) {
          return (navbarStyleName = _.name)
        }
      })
      return navbarStyleName
    }
  }
}
</script>

<style lang="scss" scoped>
.information-container {
  display: flex;
  flex-wrap: wrap;
  span {
    flex: 1;
    // &:nth-child(n + 3) {
    //   margin-top: 20px;
    // }
  }
}
</style>