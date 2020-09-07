<template>
  <div class="edit-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/navbar' }">视频分类</el-breadcrumb-item>
      <el-breadcrumb-item>编辑子分类</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tit">编辑子分类</div>
    <div class="table-container">
      <el-table class="tableData" :data="tableData">
        <el-table-column width="240" prop="regionName" label="子分类名称">
          <template slot-scope="scope">
            <el-input v-model="tableData[scope.$index].regionName"></el-input>
          </template>
        </el-table-column>
        <el-table-column width="240" prop="orderNum" label="排序号">
          <template slot-scope="scope">
            <el-input v-model="tableData[scope.$index].orderNum"></el-input>
          </template>
        </el-table-column>
        <el-table-column label>
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <p
      style="color:#F56C6C;fontSize:14px;height:30px;margin-top:-20px;padding-left:20px;box-sizing:border-box;"
    >{{validateMessage}}</p>
    <el-button class="btn" type="primary" @click="handleAdd">添加子分类</el-button>
    <hr />
    <el-button class="btn-cancel btn" @click="handleCancel">取消</el-button>
    <el-button class="btn-status btn" type="primary" :disabled="btnDisabled" @click="clickHandle">保存</el-button>
  </div>
</template>

<script>
import { getCategoryList2, editSubCategory } from '@/api/video'
import { validOrderNum } from '@/util/business'

export default {
  data() {
    return {
      validateMessage: ' ',
      btnDisabled: false,
      tableData: null,
      params: this.$route.params,
      query: this.$route.query
    }
  },
  methods: {
    // 校验名称，排序号(不能为空并且含有非零开头数字之外的字符)
    validate() {
      return this.tableData.some(
        _ =>
          !_.regionName ||
          !_.regionName.trim() ||
          !_.orderNum ||
          !validOrderNum(_.orderNum.trim())
      )
    },
    handleAdd() {
      const row = { regionName: '', orderNum: '', parentId: this.query.id }

      this.tableData.push(row)
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1)
    },
    clickHandle() {
      this.handleEdit()
    },
    handleCancel() {
      this.toConsoleVideoCategory()
    },
    // 编辑
    handleEdit() {
      const res = this.validate()

      if (res) this.validateMessage = '您输入内容格式不正确'
      else {
        this.validateMessage = ''
        this.editSubCategory(this.tableData)
      }
    },
    // 路由跳转
    toConsoleVideoCategory() {
      this.$router.push({
        name: 'ConsoleVideoCategory'
      })
    },
    getCategoryList2(id) {
      getCategoryList2(id, 'body').then(res => {
        // 删除属性createTime 不然后台会报错
        this.tableData = this.defineDeleteProperty(res.object, ['createTime'])
      })
    },
    // 删除对象的多余属性
    defineDeleteProperty(tableData, prop = []) {
      tableData.forEach(_ => {
        const keys = Object.keys(_)

        for (let i = 0; i < keys.length; i++) {
          for (let j = 0; j < prop.length; j++) {
            if (keys[i] === prop[j]) {
              delete _[keys[i]]
            }
          }
        }
      })
      return tableData
    },
    // // 数据组装
    // splicingData(data) {
    //   let myData = []
    //   data.forEach(_ => {
    //     const keys = Object.keys(_)
    //     let obj = {}
    //     for (let i = 0; i < keys.length; i++) {
    //       if (keys[i] === 'id') {
    //         obj.navbarItemId = _.id
    //       } else if (keys[i] === 'orderNum') {
    //         obj.orderNum = _.orderNum
    //       }
    //     }
    //     myData.push(obj)
    //   })
    //   return myData
    // },
    editSubCategory() {
      editSubCategory(this.tableData, 'body').then(res => {
        this.toConsoleVideoCategory()
      })
    },
    mounted() {
      if (!this.params.subCategory) {
        // 直接地址栏输入网址
        this.getCategoryList2(this.query.id)
      } else {
        // 点击编辑按钮进入,删除属性createTime 不然后台会报错
        this.tableData = this.defineDeleteProperty(this.params.subCategory, [
          'createTime'
        ])
      }
    }
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
  //   .ruleForm {
  //     margin-top: 20px;
  //     width: 620px;
  //     overflow: hidden;
  //   }
  .el-table {
    width: 620px;
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