<template>
  <div class="employee-assign-role">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/employee' }">员工管理</el-breadcrumb-item>
      <el-breadcrumb-item>分配角色</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column width="50" type="selection"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
      </el-table>
    </div>
    <el-button class="btn-cancel btn" @click="handleCancel">取消</el-button>
    <el-button class="btn-save btn" type="primary" @click="handleSave">保存</el-button>
  </div>
</template>

<script>
import { getRoleListAll, updataEmployeeRole } from '@/api/employee'

export default {
  data() {
    return {
      params: this.$route.params, //@param row @param globalAuth
      query: this.$route.query,
      tableData: [
        // {
        //   checked: false,
        //   select: 1,
        //   roleName: '临时管理员',
        //   createTime: '2026-05-02',
        //   orderNum: '1',
        //   subAuth: '权限管理 角色管理 员工管理',
        //   roleCode: '0x1111111111111111111111111'
        // },
        // {
        //   checked: false,
        //   select: 2,
        //   roleName: '助理管理员',
        //   createTime: '2026-05-03',
        //   orderNum: '2',
        //   subAuth: '公告管理 公告修改',
        //   roleCode: '0x2222222222222222222222222'
        // },
        // {
        //   checked: false,
        //   select: 3,
        //   roleName: '初级管理员',
        //   createTime: '2026-05-04',
        //   orderNum: '3',
        //   roleCode: '0x33333333333333333333333333'
        // },
        // {
        //   checked: false,
        //   select: 4,
        //   roleName: '高级管理员',
        //   createTime: '2026-05-05',
        //   orderNum: '4',
        //   roleCode: '0x4444444444444444444444444444'
        // },
        // {
        //   checked: false,
        //   select: 5,
        //   roleName: '资深管理员',
        //   createTime: '2026-05-06',
        //   orderNum: '5',
        //   roleCode: '0x55555555555555555555555555555'
        // },
        // {
        //   checked: false,
        //   select: 6,
        //   roleName: '专家级管理员',
        //   createTime: '2026-05-07',
        //   orderNum: '6',
        //   roleCode: '0x666666666666666666666666666666'
        // },
        // {
        //   checked: false,
        //   select: 7,
        //   roleName: '超级管理员',
        //   createTime: '2026-05-08',
        //   orderNum: '7',
        //   roleCode: '0x7777777777777777777777777777777'
        // }
      ]
    }
  },
  methods: {
    // 当checkbox选择项发生变化时会触发
    handleSelectionChange(val) {
      console.log(val)
      //   if (val.length === 1) {
      //     // 只选择一个checkbox时
      //     this.options.forEach(item => {
      //       item.disabled = false
      //     })

      //     this.selectOne = true
      //   } else {
      //     // 0个或多个时
      //     this.options.forEach(item => {
      //       item.disabled = true
      //     })

      //     this.selectOne = false
      //   }

      //   this.currentRow = val[0]
    },
    handleCancel() {
      this.toConsoleEmployee()
    },
    // 保存权限按钮
    handleSave() {
      this.updataEmployeeRole({
        id: this.params.row.loginId,
        roleId: this.query.id
      })
    },
    toConsoleEmployee(flush) {
      this.$router.push({ name: 'ConsoleEmployee', params: { flush } })
    },
    // 更新权限
    updataEmployeeRole({ id = [], roleId = this.query.id } = {}) {
      updataEmployeeRole({ id, roleId }, 'body').then(res => {
        this.toConsoleEmployee(true)
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
    getRoleListAll() {
      getRoleListAll('.el-table__body-wrapper').then(res => {
        this.tableData = res.object
      })
    },
    mounted() {
      this.getRoleListAll()

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
.employee-assign-role {
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