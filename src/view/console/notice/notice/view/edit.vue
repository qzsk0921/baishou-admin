<template>
  <div class="edit-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/navbar' }">公告管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{params.status==="create"?"创建":"修改"}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tit">{{params.status==="edit"?"修改公告":"创建公告"}}</div>
    <el-form
      class="ruleForm"
      ref="dataForm"
      :rules="rules"
      :model="params.row"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="名称" prop="noticeName">
        <el-input v-model="params.row.noticeName" />
      </el-form-item>
      <el-form-item label="排序号" prop="orderNum">
        <el-input v-model="params.row.orderNum" />
      </el-form-item>
      <el-form-item label="是否可见" prop="isShow">
        <el-select v-model="params.row.isShow" placeholder="请选择" :collapse-tags="true">
          <el-option v-for="item in isShow" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="公告内容" prop="noticeTxt">
        <el-input type="textarea" v-model="params.row.noticeTxt" placeholder="请输入内容" :rows="4" />
      </el-form-item>
    </el-form>
    <hr />
    <el-button class="btn-cancel btn" @click="handleCancel">取消</el-button>
    <el-button class="btn-status btn" type="primary" @click="clickHandle">{{params.status==="edit"?"保存":"创建"}}</el-button>
  </div>
</template>

<script>
import { addNotice, updataNotice } from '@/api/notice'
import { validOrderNum } from '@/util/business'

const isShow = [
  { value: 1, label: '是' },
  { value: 0, label: '否' }
]

export default {
  data() {
    const validateOrderNum = (rule, value, callback) => {
      if (value && !value.trim()) callback(new Error('请输入排序号'))
      else if (!validOrderNum(value))
        callback(new Error('排序号必须为非零开头的数字'))
      else callback()
    }

    const validateNoticeTxt = (rule, value, callback) => {
      let realLen = 0
      let charCode = -1

      for (let i = 0; i < value.length; i++) {
        charCode = value.charCodeAt(i)
        if (0 <= charCode && charCode <= 128) realLen += 1
        else realLen += 2
      }

      if (realLen > 200) callback(new Error('请在100字以内'))
      else callback()
    }

    return {
      rules: {
        noticeName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, validator: validateOrderNum, trigger: 'blur' }
        ],
        noticeTxt: [
          { required: true, validator: validateNoticeTxt, trigger: 'blur' }
        ]
      },
      params: this.$route.params,
      isShow
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
      this.toConsoleNotice()
    },
    // 创建
    handleCreate() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.addNotice()
      })
    },
    // 修改密码之外其它信息
    handleEdit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.updataNotice()
      })
    },
    addNotice() {
      addNotice(this.params.row, 'body').then(res => {
        this.toConsoleNotice()
      })
    },
    updataNotice() {
      this.defineDeleteProperty(['createTime'])

      updataNotice(this.params.row, 'body').then(res => {
        this.toConsoleNotice()
      })
    },
    // 路由跳转
    toConsoleNotice() {
      this.$router.push({
        name: 'ConsoleNotice'
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