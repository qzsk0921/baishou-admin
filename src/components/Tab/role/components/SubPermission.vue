<template>
  <div class="subPermission-container loading-container">
    <!-- I'm role management subPermission
    <hr />-->
    <el-button class="btn" type="primary" @click="handleAssignPermission" :disabled="!selectOne">分配权限</el-button>
    <div class="auth-type" v-for="item in myAuth" :key="item.id">
      <span class="auth" v-if="item.child.length">{{item.name}}：</span>
      <span class="subAuth" v-for="it in item.child" :key="it.id">{{it.name}}</span>
    </div>
  </div>
</template>

<script>
import { getGlobalAuth } from '@/api/role'

export default {
  props: {
    row: {
      type: Object
    },
    selectOne: {
      type: Boolean
    }
  },
  data() {
    return {
      globalAuth: this.$store.state.role.globalAuth,
      myAuth: [] //角色拥有的权限列表
    }
  },
  watch: {
    'row.id': {
      handler(n) {
        this.mounted()
      },
    }
  },
  methods: {
    handleAssignPermission() {
      // 跳转到分配权限页
      this.$router.push({
        name: 'Rap',
        params: {
          row: this.row,
          globalAuth: this.globalAuth
        }
      })
    },
    // 获取所有权限列表
    getGlobalAuth() {
      this.$store.dispatch('role/getGlobalAuth').then(res => {
        this.globalAuth = res
        // authCode是String("1,2,3")格式
        this.globalAuthParse()
      })
    },
    // 解析权限码
    globalAuthParse() {
      // 没有权限时，重置myAuth
      if(!this.row.authCode) return this.myAuth = []

      const authCode = this.row.authCode.split(',')
      this.myAuth = JSON.parse(JSON.stringify(this.globalAuth))
      this.myAuth.forEach(item => {
        item.child = item.child.filter(it => authCode.includes(String(it.id)))
      })
    },
    mounted() {
      if (!this.globalAuth) {
        //  获取所有权限列表的状态，如果store中没有就请求后台
        this.getGlobalAuth()
      } else {
        //  获取所有权限列表的状态，如果store中有就直接执行解析权限码
        this.globalAuthParse()
      }
    }
  },
  mounted() {
    this.mounted()
  }
}
</script>

<style lang="scss" scoped>
.subPermission-container {
  .btn {
    margin-bottom: 10px;
  }
  .auth-type {
    margin-top: 10px;
    .auth {
      margin-right: 5px;
    }
    .subAuth {
      margin-right: 20px;
    }
  }
}
</style>