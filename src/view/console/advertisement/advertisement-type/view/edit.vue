<template>
  <div class="advertisement-type-edit-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/advertisement-type' }">广告管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{params.status==="create"?"创建广告类型":"修改广告类型"}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tit">{{params.status==="create"?"创建广告类型":"修改广告类型"}}</div>
    <el-form
      class="ruleForm"
      ref="dataForm"
      :rules="rules"
      :model="params.row"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="名称" prop="typeName">
        <el-input v-model="params.row.typeName" />
      </el-form-item>
      <el-form-item label="编码" prop="typeCode">
        <el-input v-model="params.row.typeCode" />
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
import {
  addAdvertisementType,
  updateAdvertisementType
} from '@/api/advertisement'
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
      rules: {
        typeName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        typeCode: [{ required: true, message: '请输入编码', trigger: 'blur' }],
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
      } else {
        this.handleEdit()
      }
    },
    handleCancel() {
      this.toConsoleAdvertisementType()
    },
    // 创建员工用户
    handleCreate() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.addAdvertisementType()
      })
    },
    // 修改密码之外其它信息
    handleEdit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.updateAdvertisementType()
      })
    },
    addAdvertisementType() {
      addAdvertisementType(this.params.row).then(res => {
        this.toConsoleAdvertisementType()
      })
    },
    updateAdvertisementType({
      id = this.params.row.id,
      orderNum = this.params.row.orderNum,
      typeCode = this.params.row.typeCode,
      typeName = this.params.row.typeName
    } = {}) {
      updateAdvertisementType({ id, orderNum, typeCode, typeName }).then(
        res => {
          this.toConsoleAdvertisementType()
        }
      )
    },
    // 路由跳转
    toConsoleAdvertisementType() {
      this.$router.push({
        name: 'ConsoleAdvertisementType'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.advertisement-type-edit-container {
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