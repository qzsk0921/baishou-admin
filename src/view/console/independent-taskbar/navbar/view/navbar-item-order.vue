<template>
  <div class="edit-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/navbar' }">导航栏</el-breadcrumb-item>
      <el-breadcrumb-item>导航条目顺序</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tit">导航条目顺序</div>
    <div class="table-container">
      <el-table class="tableData" :data="tableData">
        <el-table-column width="240" prop="itemName" label="名称"></el-table-column>
        <el-table-column width="240" prop="orderNum" label="排序号">
          <template slot-scope="scope">
            <el-input v-model="tableData[scope.$index].orderNum" @change="orderNumChangeHandle"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <hr />
    <el-button class="btn-cancel btn" @click="handleCancel">取消</el-button>
    <el-button class="btn-status btn" type="primary" :disabled="btnDisabled" @click="clickHandle">保存</el-button>
  </div>
</template>

<script>
import { setNavbarItemNum, getNavbarItems } from '@/api/explore'
import { validOrderNum } from '@/util/business'

export default {
  data() {
    return {
      btnDisabled: false,
      tableData: null,
      params: this.$route.params,
      query: this.$route.query
    }
  },
  methods: {
    orderNumChangeHandle(val) {
      if (this.validate(val.trim())) this.btnDisabled = true
      else this.btnDisabled = false
    },
    // 校验排序号(不能为空并且含有非零开头数字之外的字符)
    validate(data) {
      return this.tableData.some(_ => !_.orderNum || !validOrderNum(data))
    },
    clickHandle() {
      this.handleEdit()
    },
    handleCancel() {
      this.toConsoleExploreNavbar()
    },
    // 编辑
    handleEdit() {
      const myData = this.splicingData(this.tableData)

      const data = {
        fo: myData
      }

      setNavbarItemNum(data, '.class-container').then(res => {
        this.toConsoleExploreNavbar()
      })
    },
    // 路由跳转
    toConsoleExploreNavbar() {
      this.$router.push({
        name: 'ConsoleExploreNavbar'
      })
    },
    getNavbarItems(id) {
      getNavbarItems(id, '.class-container').then(res => {
        this.tableData = res.object
      })
    },
    // 数据组装
    splicingData(data) {
      let myData = []
      data.forEach(_ => {
        const keys = Object.keys(_)
        let obj = {}
        for (let i = 0; i < keys.length; i++) {
          if (keys[i] === 'id') {
            obj.navbarItemId = _.id
          } else if (keys[i] === 'orderNum') {
            obj.orderNum = _.orderNum
          }
        }
        myData.push(obj)
      })
      return myData
    },
    mounted() {
      if (!this.params.navbarItems) {
        // 直接地址栏输入网址
        this.getNavbarItems(this.query.id)
      } else {
        // 点击编辑按钮进入
        this.tableData = JSON.parse(JSON.stringify(this.params.navbarItems))
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