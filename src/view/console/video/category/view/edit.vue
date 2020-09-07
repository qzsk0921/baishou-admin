<template>
  <div class="edit-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/navbar' }">视频分类</el-breadcrumb-item>
      <el-breadcrumb-item>{{params.status==="create"?"创建视频分类":"修改视频分类"}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tit">{{params.status==="edit"?"修改视频分类":"创建视频分类"}}</div>
    <el-form
      class="ruleForm"
      ref="dataForm"
      :rules="rules"
      :model="params.row"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="名称" prop="regionName">
        <el-input v-model="params.row.regionName" />
      </el-form-item>
      <el-form-item label="编码" prop="regionCode">
        <el-input v-model="params.row.regionCode" />
      </el-form-item>
      <el-form-item label="排序号" prop="orderNum">
        <el-input v-model="params.row.orderNum" />
      </el-form-item>
    </el-form>
    <hr />
    <el-button class="btn-cancel btn" @click="handleCancel">取消</el-button>
    <el-button class="btn-status btn" type="primary" @click="clickHandle">{{params.status==="edit"?"保存":"创建"}}</el-button>
  </div>
</template>

<script>
import { addCategory, updateCategory } from '@/api/video'
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
        regionName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        regionCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, validator: validateOrderNum, trigger: 'blur' }
        ]
      },
      params: this.$route.params //status: create||edit, row: {id: '',roleName: '',roleCode: '',orderNum: ''}每条记录
    }
  },
  methods: {
    clickHandle() {
      if (this.params.status === 'edit') {
        this.handleEdit()
      } else {
        this.handleCreate()
      }
    },
    handleCancel() {
      this.toConsoleCategory()
    },
    // 创建
    handleCreate() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.addCategory()
      })
    },
    // 修改密码之外其它信息
    handleEdit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.updateCategory()
      })
    },
    addCategory() {
      addCategory(this.params.row, 'body').then(res => {
        this.toConsoleCategory()
      })
    },
    updateCategory() {
      this.defineDeleteProperty(['createTime'])

      updateCategory(this.params.row, 'body').then(res => {
        this.toConsoleCategory()
      })
    },
    // 路由跳转
    toConsoleCategory() {
      this.$router.push({
        name: 'ConsoleVideoCategory'
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
    },
    mounted() {}
  },
  mounted() {
    this.mounted()
  }
}
</script>

<style lang="scss" scoped>
.edit-container {
  .tit {
    margin-top: 30px;
  }
  .ruleForm {
    margin-top: 20px;
    width: 460px;
    overflow: hidden;
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