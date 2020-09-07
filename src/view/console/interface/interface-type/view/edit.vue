<template>
  <div class="interface-type-edit-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/advertisement-type' }">界面分类</el-breadcrumb-item>
      <el-breadcrumb-item>{{params.status==="create"?"创建":"修改"}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tit">{{params.status==="create"?"创建":"修改"}}</div>
    <el-form
      class="ruleForm"
      ref="dataForm"
      :rules="rules"
      :model="params.row"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="params.row.name" />
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input v-model="params.row.code" />
      </el-form-item>
      <el-form-item label="排序号" prop="orderNum">
        <el-input v-model="params.row.orderNum" />
      </el-form-item>
      <el-form-item label="简介" prop="introduction">
        <el-input
          type="textarea"
          v-model="params.row.introduction"
          :rows="4"
          placeholder="任务栏：首页，导航条目：推荐，对应的显示界面"
        />
      </el-form-item>
      <el-form-item label="是否有效" prop="isActive">
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
    >{{params.status==="create"?"创建":"保存"}}</el-button>
  </div>
</template>

<script>
import { addInterfaceType, updateInterfaceType } from '@/api/interface'
import { validOrderNum } from '@/util/business'

export default {
  data() {
    const validateOrderNum = (rule, value, callback) => {
      if (value && !value.trim()) callback(new Error('请输入排序号'))
      else if (!validOrderNum(value))
        callback(new Error('排序号必须为非零开头的数字'))
      else callback()
    }

    return {
      isActiveOptions: [
        { value: 1, label: '是' },
        { value: 0, label: '否' }
      ],
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        isActive: [{ required: true, trigger: 'blur' }],
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
      this.toConsoleInterfaceType()
    },
    // 创建员工用户
    handleCreate() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.addInterfaceType()
      })
    },
    // 修改密码之外其它信息
    handleEdit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.updateInterfaceType()
      })
    },
    addInterfaceType() {
      addInterfaceType(this.params.row, 'body').then(res => {
        this.toConsoleInterfaceType()
      })
    },
    updateInterfaceType({
      id = this.params.row.id,
      name = this.params.row.name,
      code = this.params.row.code,
      orderNum = this.params.row.orderNum,
      isActive = this.params.row.isActive,
      introduction = this.params.row.introduction
    } = {}) {
      updateInterfaceType({
        id,
        name,
        code,
        orderNum,
        isActive,
        introduction
      }).then(res => {
        this.toConsoleInterfaceType()
      })
    },
    // 路由跳转
    toConsoleInterfaceType() {
      this.$router.push({
        name: 'ConsoleInterfaceType'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.interface-type-edit-container {
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