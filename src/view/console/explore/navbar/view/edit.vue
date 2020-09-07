<template>
  <div class="edit-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/navbar' }">导航栏</el-breadcrumb-item>
      <el-breadcrumb-item>{{params.status==="create"?"创建":"修改"}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tit">{{params.status==="edit"?"修改导航栏":"创建导航栏"}}</div>
    <el-form
      class="ruleForm"
      ref="dataForm"
      :rules="rules"
      :model="params.row"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="名称" prop="navbarName">
        <el-input v-model="params.row.navbarName" />
      </el-form-item>
      <el-form-item label="编码" prop="navbarCode">
        <el-input v-model="params.row.navbarCode" />
      </el-form-item>
      <el-form-item label="排序" prop="orderNum">
        <el-input v-model="params.row.orderNum" />
      </el-form-item>
      <el-form-item label="样式" prop="styleCode">
        <el-select v-model="params.row.styleCode" class="filter-item" placeholder="请选择" :collapse-tags="true">
          <el-option
            v-for="item in navbarStyleOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="显示导航栏" prop="isShow">
        <el-select v-model="params.row.isShow" class="filter-item" placeholder="请选择" :collapse-tags="true">
          <el-option v-for="item in isShowOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>
    <hr />
    <el-button class="btn-cancel btn" @click="handleCancel">取消</el-button>
    <el-button class="btn-status btn" type="primary" @click="clickHandle">{{params.status==="edit"?"保存":"创建"}}</el-button>
  </div>
</template>

<script>
import { addExploreNavbar, updateExploreNavbar } from '@/api/explore'
import navbarStyleList from '@/config/navbarStyle'

export default {
  data() {
    return {
      navbarStyleOptions: navbarStyleList,
      isShowOptions: [
        { value: 1, label: '是' },
        { value: 0, label: '否' }
      ],
      rules: {
        navbarName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        navbarCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        orderNum: [{ required: true, message: '请输入排序号', trigger: 'blur' }]
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
      this.toConsoleNavbar()
    },
    // 创建员工用户
    handleCreate() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.addExploreNavbar()
      })
    },
    // 修改密码之外其它信息
    handleEdit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.updateExploreNavbar()
      })
    },
    addExploreNavbar() {
      addExploreNavbar(this.params.row).then(res => {
        this.toConsoleNavbar()
      })
    },
    updateExploreNavbar() {
      //   this.definePickProperty(['id', 'accountName', 'isActive', 'orderNum'])

      updateExploreNavbar(this.params.row).then(res => {
        this.toConsoleNavbar()
      })
    },
    // 路由跳转
    toConsoleNavbar() {
      this.$router.push({
        name: 'ConsoleExploreNavbar'
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