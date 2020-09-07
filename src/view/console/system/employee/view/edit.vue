<template>
  <div class="employee-edit-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/employee' }">员工管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{params.status==="create"?"创建员工":params.status==="editEmployee"?"修改员工":"修改密码"}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div
      class="tit"
    >{{params.status==="create"?"创建员工":params.status==="editEmployee"?"修改员工":"登录名："+ params.row.loginId}}</div>
    <el-form
      class="ruleForm"
      ref="dataForm"
      :rules="rules"
      :model="params.row"
      label-position="left"
      label-width="100px"
    >
      <el-form-item
        label="登录账户"
        prop="loginId"
        v-if="params.status !== 'editPassword' && params.status !=='editEmployee'"
      >
        <el-input v-model="params.row.loginId" />
      </el-form-item>
      <el-form-item label="密码" prop="loginPwd" v-if="params.status !=='editEmployee'">
        <el-input v-model="params.row.loginPwd" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="loginPwdConfirm" v-if="params.status !=='editEmployee'">
        <el-input v-model="params.row.loginPwdConfirm" type="password" />
      </el-form-item>
      <el-form-item label="真实姓名" prop="accountName" v-if="params.status !== 'editPassword'">
        <el-input v-model="params.row.accountName" />
      </el-form-item>
      <el-form-item label="排序号" prop="orderNum" v-if="params.status !== 'editPassword'">
        <el-input v-model="params.row.orderNum" />
      </el-form-item>
      <el-form-item
        label="是否App用户"
        prop="isAppUser"
        v-if="params.status !== 'editPassword' && params.status !=='editEmployee'"
      >
        <el-select v-model="params.row.isAppUser" class="filter-item" placeholder="请选择" :collapse-tags="true">
          <el-option
            v-for="item in isAppUserOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否有效" prop="isActive" v-if="params.status !== 'editPassword'">
        <el-select v-model="params.row.isActive" class="filter-item" placeholder="请选择" :collapse-tags="true">
          <el-option
            v-for="item in isActiveOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <hr />
    <el-button class="btn-cancel btn" @click="handleCancel">取消</el-button>
    <el-button
      class="btn-status btn"
      type="primary"
      @click="clickHandle"
    >{{params.status==="create"?"创建": params.status==="editPassword"?"修改密码":"保存"}}</el-button>
  </div>
</template>

<script>
import { addEmployee, changeEmployeePwd, updateEmployee } from '@/api/employee'
import { validOrderNum } from '@/util/business'

export default {
  data() {
    const validateOrderNum = (rule, value, callback) => {
      if (value && !value.trim()) callback(new Error('请输入排序号'))
      else if (!validOrderNum(value))
        callback(new Error('排序号必须为非零开头的数字'))
      else callback()
    }

    const validatePwd = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位数'))
      } else {
        callback()
      }
    }

    const validatePwdConfirm = (rule, value, callback) => {
      if (value !== this.params.row.loginPwd) {
        callback(new Error('密码不相符'))
      } else {
        callback()
      }
    }
    return {
      isAppUserOptions: [
        { value: 1, label: '是' },
        { value: 0, label: '否' }
      ],
      isActiveOptions: [
        { value: 1, label: '是' },
        { value: 0, label: '否' }
      ],
      rules: {
        loginId: [{ required: true, message: '请输入账户', trigger: 'blur' }],
        loginPwd: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePwd
          }
        ],
        loginPwdConfirm: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePwdConfirm
          }
        ],
        accountName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        // isActive: [{ required: true, trigger: 'blur' }],
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
      } else if (this.params.status === 'editEmployee') {
        this.handleEdit()
      } else {
        this.handleEditPwd()
      }
    },
    handleCancel() {
      this.toConsoleEmployee()
    },
    // 创建员工用户
    handleCreate() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.addEmployee()
      })
    },
    // 修改密码之外其它信息
    handleEdit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.updateEmployee()
      })
    },
    // 修改密码
    handleEditPwd() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.changeEmployeePwd()
      })
    },
    addEmployee() {
      this.defineDeleteProperty(['loginPwdConfirm'])

      addEmployee(this.params.row).then(res => {
        this.toConsoleEmployee()
      })
    },
    updateEmployee() {
      this.definePickProperty(['id', 'accountName', 'isActive', 'orderNum'])

      updateEmployee(this.params.row).then(res => {
        this.toConsoleEmployee()
      })
    },
    changeEmployeePwd() {
      this.definePickProperty(['id', 'loginPwd'])

      changeEmployeePwd(this.params.row).then(res => {
        this.toConsoleEmployee()
      })
    },
    // 路由跳转
    toConsoleEmployee() {
      this.$router.push({
        name: 'ConsoleEmployee'
      })
    },
    // 删除对象的多余属性
    defineDeleteProperty(prop = []) {
      const keys = Object.keys(this.params.row)
      for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < prop.length; j++) {
          if (keys[i] === prop[j]) {
            delete this.params.row[keys[i]]
          }
        }
      }
    },
    // 从对象挑选需要的属性
    definePickProperty(prop = []) {
      const keys = Object.keys(this.params.row)
      for (let i = 0; i < keys.length; i++) {
        if (!prop.includes(keys[i])) {
          delete this.params.row[keys[i]]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.employee-edit-container {
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