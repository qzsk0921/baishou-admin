<template>
  <div class="naventry-edit-container container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/naventry' }">导航条目</el-breadcrumb-item>
      <el-breadcrumb-item>{{params.status==="create"?"创建":"修改"}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tit">{{params.status==="create"?"创建导航条目":"修改导航条目"}}</div>
    <el-form
      class="ruleForm"
      ref="dataForm"
      :rules="rules"
      :model="myRow"
      label-position="left"
      label-width="130px"
    >
      <el-form-item label="导航栏" prop="navbarId">
        <el-select v-model="myRow.navbarId" placeholder="请选择" :collapse-tags="true">
          <el-option v-for="item in navbar" :key="item.id" :label="item.navbarName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="itemName">
        <el-input v-model="myRow.itemName" />
      </el-form-item>
      <el-form-item label="编码" prop="itemCode">
        <el-input v-model="myRow.itemCode" />
      </el-form-item>
      <el-form-item label="排序号" prop="orderNum">
        <el-input v-model="myRow.orderNum" />
      </el-form-item>
      <el-form-item label="是否显示导航条目" prop="isShow">
        <el-select v-model="myRow.isShow" class="filter-item" placeholder="请选择" :collapse-tags="true">
          <el-option v-for="item in isShowOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <hr />
      <!-- <el-form-item label="界面模板" prop="interfaceId">
        <el-select v-model="myRow.interfaceId" placeholder="请选择" :collapse-tags="true">
          <el-option v-for="item in tableData" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>-->
      <el-form-item label="显示界面" prop="interfaceId" class="form-item-interface">
        <div class="search-container">
          <search @selectTag="handleSelectTag" :search="search" />
          <ul class="tag-list" @click="handleTagClose" v-if="tags.length">
            <li class="btn-tag" v-for="(item, index) in tags" :key="index">
              {{item.value}}
              <div class="btn-close" :data-tag="item.value">×</div>
            </li>
          </ul>
        </div>
        <el-table :data="tableData" style="width: 450px">
          <el-table-column width="50">
            <template slot-scope="props">
              <el-checkbox v-model="props.row.checked" @click.native.prevent="checkClick(props.row)" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="界面名称"></el-table-column>
          <el-table-column prop="code" label="界面编码"></el-table-column>
        </el-table>
        <img class="preview" :src="currentRow.url" alt />
        <!-- <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="count"
          background
        ></el-pagination>-->
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
  addExploreNaventry,
  updateExploreNaventry,
  getExploreNavbarAll
} from '@/api/explore'
import { getInterfaceList } from '@/api/interface'
import Search from '@/components/Search'
import { validOrderNum } from '@/util/business'

export default {
  components: { Search },
  data() {
    const validateOrderNum = (rule, value, callback) => {
      if (value && !value.trim()) callback(new Error('请输入排序号'))
      else if (!validOrderNum(value))
        callback(new Error('排序号必须为非零开头的数字'))
      else callback()
    }

    return {
      search: {
        categories: [{ value: '界面分类', field: 'name' }],
        api: 'getInterfaceTypeAll'
      },
      searchType: null, //记录查询类型
      searchData: {
        roleCode: [],
        roleName: [],
        m_roleCode: [],
        m_roleName: [],
        queryContent: []
      },
      tag: null, //选择标签
      tags: [], //标签列表
      formData: null,
      isShowOptions: [
        { value: 1, label: '是' },
        { value: 0, label: '否' }
      ],
      tableData: [], //界面-分页列表
      rules: {
        itemName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        itemCode: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        navbarId: [
          {
            required: true,
            message: '请选择导航栏',
            trigger: 'change'
          }
        ],
        orderNum: [{ required: true, validator: validateOrderNum }],
        interfaceId: [{ required: true, message: '请选择界面' }]
      },
      params: this.$route.params,
      navbar: null, //导航栏
      // count: 0,
      currentPage: 1,
      pageSize: 1000,
      myRow: null,
      currentRow: { url: '' }
    }
  },
  methods: {
    handleSelectTag(item, searchType) {
      console.log(item)
      console.log(searchType)

      this.tag = item.value

      if (searchType) {
        // 第二段选择（键值）
        // search: searchAll searchByType

        if (this.checkTag(searchType, this.tag)) {
          return false
        }

        switch (searchType) {
          case 'searchAll':
            this.parseTags(searchType, this.tag)

            break
          case 'searchByType':
            this.parseTags(searchType, this.searchType + ':' + this.tag)

            break
        }

        this.getRoleList({
          isSearchCount: 1,
          pageNum: 1,
          pageSize: this.pageSize,
          roleCode: this.searchData.roleCode,
          roleName: this.searchData.roleName,
          m_roleCode: this.searchData.m_roleCode,
          m_roleName: this.searchData.m_roleName,
          queryContent: this.searchData.queryContent
        })
      } else {
        // 第一段选择（记录所选类型即键名）
        this.searchType = item.value
      }
    },
    // 校验重复和空tag
    checkTag(searchType, tagValue) {
      if (searchType === 'searchByType') {
        return (
          this.tags.some(_ => _.value === this.searchType + ' : ' + tagValue) ||
          tagValue.trim() === ''
        )
      } else {
        return (
          this.tags.some(_ => _.value === tagValue) || tagValue.trim() === ''
        )
      }
    },
    // 解析tags
    parseTags(searchType, tagValue) {
      if (searchType === 'searchByType') {
        // 精确查询
        const temp = tagValue.split(':')
        if (temp[0] === '角色名称') {
          this.tags.push.call(this.tags, {
            field: 'roleName',
            value: this.searchType + ' : ' + this.tag
          })
          this.searchData.roleName.push(temp[1])
        } else if (temp[0] === '编码') {
          this.tags.push.call(this.tags, {
            field: 'roleCode',
            value: this.searchType + ' : ' + this.tag
          })
          this.searchData.roleCode.push(temp[1])
        }
      } else {
        // 模糊查询
        if (tagValue.indexOf(':') != -1) {
          const temp = tagValue.split(' : ')
          if (temp[0] === '角色名称') {
            this.tags.push.call(this.tags, {
              field: 'm_roleName',
              value: tagValue
            })
            this.searchData.m_roleName.push(temp[1])
          } else if (temp[0] === '编码') {
            this.tags.push.call(this.tags, {
              field: 'm_roleCode',
              value: tagValue
            })
            this.searchData.m_roleCode.push(temp[1])
          }
        } else {
          this.tags.push.call(this.tags, {
            field: 'queryContent',
            value: tagValue
          })
          this.searchData.queryContent.push(tagValue)
        }
      }
    },
    // 关闭tag标签
    handleTagClose(e) {
      if (e.target.className === 'btn-close') {
        const currentTag = e.target.dataset.tag

        this.tags = this.tags.filter(tag => {
          // 数据删除
          if (tag.value === currentTag) {
            if (tag.value.indexOf(' : ') > -1) {
              const value = tag.value.split(' : ')[1]

              const index = this.searchData[tag.field].indexOf(value)

              this.searchData[tag.field].splice(index, 1)
            } else {
              const index = this.searchData[tag.field].indexOf(tag.value)

              this.searchData[tag.field].splice(index, 1)
            }
          }
          // 显示删除
          return tag.value !== currentTag
        })

        this.getRoleList({
          isSearchCount: 1,
          pageNum: 1,
          pageSize: this.pageSize,
          roleCode: this.searchData.roleCode,
          roleName: this.searchData.roleName,
          m_roleCode: this.searchData.m_roleCode,
          m_roleName: this.searchData.m_roleName,
          queryContent: this.searchData.queryContent
        })
      }
    },
    clickHandle() {
      // this.defineDeleteProperty(['createTime', 'url'])

      if (this.params.status === 'create') {
        this.handleCreate()
      } else {
        this.handleEdit()
      }
    },
    handleCancel() {
      this.toConsoleExploreNaventry()
    },
    // 创建
    handleCreate() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.addExploreNaventry()
      })
    },
    // 修改密码之外其它信息
    handleEdit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.updateExploreNaventry()
      })
    },
    addExploreNaventry() {
      addExploreNaventry(this.myRow).then(res => {
        this.toConsoleExploreNaventry()
      })
    },
    updateExploreNaventry() {
      updateExploreNaventry(this.myRow).then(res => {
        this.toConsoleExploreNaventry()
      })
    },
    // 路由跳转
    toConsoleExploreNaventry() {
      this.$router.push({
        name: 'ConsoleExploreNaventry'
      })
    },
    // 获取所有的导航栏
    getExploreNavbarAll() {
      getExploreNavbarAll().then(res => {
        this.navbar = res.object
      })
    },
    // defineDeleteProperty(prop = []) {
    //   const keys = Object.keys(this.params.row)
    //   for (let i = 0; i < keys.length; i++) {
    //     for (let j = 0; j < prop.length; j++) {
    //       if (keys[i] === prop[j]) {
    //         delete this.params.row[keys[i]]
    //       }
    //     }
    //   }
    // },

    // 无全选的单选checkbox
    checkClick(val) {
      // if (!this.consoleInstance) {
      //   this.consoleInstance = this.$console()
      //   console.log(this.consoleInstance)
      // } else {
      //   console.log(this.consoleInstance)
      // }
      for (let item of this.tableData) {
        if (val.id !== item.id && item.checked) {
          item.checked = false
          break
        }
      }

      val.checked = !val.checked

      if (!val.checked) {
        this.currentRow = null

        this.myRow.interfaceId = null

        return false
      }

      this.currentRow = val

      this.myRow.interfaceId = val.id
    },
    addCheckedProperty(data) {
      const myData = data.map(_ => {
        if (_.id === this.myRow.interfaceId) _.checked = true
        else _.checked = false
        return _
      })

      return data
    },
    getInterfaceList({
      isSearchCount = 0,
      pageNum = this.currentPage,
      pageSize = this.pageSize,
      name = '',
      code = '',
      isActive = '',
      interfaceId = ''
    } = {}) {
      getInterfaceList(
        {
          isSearchCount,
          pageNum,
          pageSize,
          name,
          code,
          isActive,
          interfaceId
        },
        '.tbody'
      ).then(res => {
        this.tableData = this.addCheckedProperty(res.object.records)
      })
    },
    created() {
      this.myRow = JSON.parse(JSON.stringify(this.params.row))
    },
    mounted() {
      this.getExploreNavbarAll()
      this.getInterfaceList({
        isSearchCount: 0,
        pageNum: 1,
        pageSize: 1000
      })
    }
  },
  created() {
    this.created()
  },
  mounted() {
    this.mounted()
  }
}
</script>

<style lang="scss" scoped>
.naventry-edit-container {
  .tit {
    margin-top: 30px;
  }
  .ruleForm {
    margin-top: 20px;
    overflow: hidden;
    .el-form-item {
      /deep/ .el-form-item__content {
        .el-select {
          width: 400px;
        }
        .el-input {
          width: 400px;
        }
      }
      .el-table {
        display: inline-block;
      }
      .preview {
        display: inline-block;
        width: 400px;
        margin-left: 20px;
      }
    }
    .form-item-interface {
      /deep/ .el-form-item__content {
        margin: 20px 0 0 0 !important;
        .search-container {
          margin-left: 0 !important;
        }
        // .el-pagination {
        //   padding-top: 25px;
        //   // text-align: right;
        //   .el-pager li {
        //     &:hover {
        //       color: $menuBg;
        //     }
        //   }
        //   .el-pager li.active {
        //     &:hover {
        //       color: #fff;
        //     }
        //     background-color: $menuBg;
        //   }
        // }
      }
    }
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