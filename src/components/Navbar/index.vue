<template>
  <div class="navbar-container">
    <span></span>
    <div class="right-menu">
      <el-dropdown>
        <span>
          {{nickname}}
          <i class="el-icon-caret-bottom" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>个人信息</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['sidebar','nickname'])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar-container {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: $color-primary;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right-menu {
    .el-dropdown {
      span {
        color: #fff;
      }
    }
  }
}
</style>