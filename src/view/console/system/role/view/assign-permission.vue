<template>
  <div class="role-assign-permission">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/role' }">角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>分配权限</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <div class="table-container" v-for="item in params.globalAuth" :key="item.id">
      {{item.name}}
      <el-table
        :data="item.child"
        :ref="'table'+item.id"
        :show-header="false"
        style="width: 100%"
        @select="handleSelect"
      >
        <el-table-column width="50" type="selection"></el-table-column>
        <el-table-column prop="name"></el-table-column>
        <!-- <el-table-column prop="createTime"></el-table-column> -->
      </el-table>
    </div>
    <!-- <div class="table-container">
      <el-table
        :data="tableData.advertisement"
        :show-header="false"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column width="50" type="selection"></el-table-column>
        <el-table-column prop="name"></el-table-column>
        <el-table-column prop="createTime"></el-table-column>
      </el-table>
    </div>-->
    <el-button class="btn-cancel btn" @click="handleCancel">取消</el-button>
    <el-button class="btn-save btn" type="primary" @click="handleSave">保存</el-button>
  </div>
</template>

<script>
import { getGlobalAuth, updateAuth } from '@/api/role'

export default {
  data() {
    return {
      params: this.$route.params, //@param row @param globalAuth
      authCode: [] //权限码
    }
  },
  methods: {
    handleSelect(val, row) {
      const index = this.authCode.indexOf(row.id)
      if (index !== -1) {
        // 已经有authCode则删除
        this.authCode.splice(index, 1)
      } else {
        // 没有authCode则追加
        this.authCode.push(row.id)
      }
    },
    handleCancel() {
      this.toConsoleRole()
    },
    // 保存权限按钮
    handleSave() {
      this.updateAuth({ authCode: this.authCode, id: this.params.row.id })
    },
    toConsoleRole(flush) {
      this.$router.push({ name: 'ConsoleRole', params: { flush } })
    },
    // 更新权限
    updateAuth({ authCode = [], id = this.params.row.id } = {}) {
      updateAuth({ authCode, id }).then(res => {
        this.toConsoleRole(true)
      })
    },
    // 回填checkbox
    checked() {
      this.params.globalAuth.forEach((item, index) => {
        item.child.forEach((it, ind) => {
          if (this.authCode.includes(String(it.id))) {
            this.$refs['table' + item.id][0].toggleRowSelection(
              this.params.globalAuth[index].child[ind],
              true
            )
          }
        })
      })
    },
    mounted() {
      if (this.params.row.authCode && this.params.row.authCode.length) {
        this.authCode = this.params.row.authCode.split(',')
        this.checked()
      }
    }
  },
  mounted() {
    this.mounted()
  }
}
</script>

<style lang="scss" scoped>
.role-assign-permission {
  .table-container {
    margin: 20px 0;
  }
  .btn {
    width: 150px;
  }
  .btn-cancel {
    margin-left: calc(100% - 350px);
  }
  .btn-save {
    margin-left: 50px;
  }
}
</style>