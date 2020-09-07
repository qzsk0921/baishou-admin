<template>
  <div class="role-edit-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/role' }">角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{params.status==="create"?"创建角色":"修改角色"}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tit">{{params.status==="create"?"创建角色":"修改角色"}}</div>
    <el-form
      class="ruleForm"
      ref="dataForm"
      :rules="rules"
      :model="params.row"
      label-position="left"
      label-width="70px"
    >
      <el-form-item label="名称" prop="roleName">
        <el-input v-model="params.row.roleName" />
      </el-form-item>
      <el-form-item label="编码" prop="roleCode">
        <el-input v-model="params.row.roleCode" />
      </el-form-item>
      <el-form-item label="排序号" prop="orderNum">
        <el-input v-model="params.row.orderNum" />
      </el-form-item>
    </el-form>
    <hr />
    <el-button class="btn-cancel btn" @click="handleCancel">取消</el-button>
    <el-button
      class="btn-status btn"
      type="primary"
      @click="clickHandle"
    >{{params.status==="create"?"创建":"保存"}}</el-button>
  </div>
</template>

<script>
// import Breadcrumb from '@/components/Breadcrumb'
import { addRole, updateRole } from '@/api/role'
import { validOrderNum } from '@/util/business'

export default {
  // components: {
  //     Breadcrumb
  // },
  data() {
    const validateOrderNum = (rule, value, callback) => {
      if (value && !value.trim()) callback(new Error('请输入排序号'))
      else if (!validOrderNum(value))
        callback(new Error('排序号必须为非零开头的数字'))
      else callback()
    }

    return {
      //   temp: {
      //     roleName: '', //角色名称
      //     roleCode: '', //角色编码
      //     orderNum: '' //排序
      //   },
      rules: {
        roleName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        roleCode: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        orderNum: [
          { required: true, validator: validateOrderNum, trigger: 'blur' }
        ]
      },
      params: this.$route.params //status: create||edit, row: {id: '',roleName: '',roleCode: '',orderNum: ''}每条记录
    }
  },
  methods: {
    clickHandle() {
      if (this.params.status === 'create') {
        this.handleCreate()
      } else {
        this.handleEdit()
      }
    },
    handleCancel() {
      this.toConsoleRole()
    },
    handleCreate() {
      this.addRole()
    },
    handleEdit() {
      this.updateRole()
    },
    // 路由跳转
    toConsoleRole() {
      this.$router.push({
        name: 'ConsoleRole'
      })
    },
    addRole() {
      addRole(this.params.row).then(res => {
        this.toConsoleRole()
      })
    },
    updateRole() {
      updateRole(this.params.row).then(res => {
        this.toConsoleRole()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.role-edit-container {
  .tit {
    margin-top: 30px;
  }
  .ruleForm {
    margin-top: 20px;
    width: 460px;
    overflow: hidden;
  }
  hr {
    background-color: red;
  }
  .btn {
    width: 150px;
  }
  .btn-cancel {
    margin-left: calc(100% - 350px);
  }
  .btn-status {
    // margin-left: calc(100% - 120px);
    margin-left: 50px;
  }
}
</style>