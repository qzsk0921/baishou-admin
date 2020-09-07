<template>
  <div class="container employee-container">
    <el-button class="btn-create" type="primary" @click="handleCreate">创建</el-button>
    <el-select class="option-select" v-model="optionValue" placeholder="操作">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      ></el-option>
    </el-select>
    <div class="search-container">
      <search :categories="categories" @selectTag="handleSelectTag" />
      <ul class="tag-list" @click="handleTagClose" v-if="tags.length">
        <li class="btn-tag" v-for="(item, index) in tags" :key="index">
          {{item}}
          <div class="btn-close" :data-tag="item">×</div>
        </li>
        <!-- <el-button class="btn-tag" v-for="(item, index) in tags" :key="index">{{item}}</el-button> -->
      </ul>
    </div>
    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column width="50" type="selection"></el-table-column>
        <el-table-column prop="loginId" label="员工登录账号"></el-table-column>
        <el-table-column prop="accountName" label="真实姓名"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm
              confirmButtonText="确定"
              cancelButtonText="取消"
              icon="el-icon-info"
              iconColor="red"
              title="确定删除吗？"
              placement="top"
              width="200"
              @onConfirm="handleDelete(scope.row)"
            >
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>-->
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="count"
        background
      ></el-pagination>
    </div>
    <console v-if="consoleVisible" @console="handleConsole">
      <tab :row="currentRow[0]" :selectOne="selectOne" />
    </console>
  </div>
</template>

<script>
import Tab from '@/components/Tab/employee'
import Console from '@/components/console/console'
import Search from '@/components/Search'
import { getEmployeeList, removeEmployee } from '@/api/employee'

export default {
  components: { Tab, Console, Search },
  data() {
    return {
      optionValue: '',
      options: [
        {
          value: 'editEmployee',
          label: '修改员工',
          disabled: true
        },
        {
          value: 'editPassword',
          label: '修改密码',
          disabled: true
        },
        {
          value: 'delete',
          label: '删除',
          disabled: true
        }
      ],
      tag: null, //选择标签
      tags: [], //标签列表
      categories: [
        { value: '员工登录账号' },
        { value: '真是姓名' },
        { value: '员工登录账号' },
        { value: '员工登录账号' },
        { value: '员工登录账号' },
        { value: '员工登录账号' },
        { value: '员工登录账号' },
        { value: '员工登录账号' },
        { value: '员工登录账号' },
        { value: '员工登录账号' },
        { value: '员工登录账号' }
      ],
      tableData: [
        // {
        //   checked: false,
        //   select: 1,
        //   roleName: '临时管理员',
        //   createTime: '2026-05-02',
        //   orderNum: '1',
        //   subAuth: '权限管理 角色管理 员工管理',
        //   roleCode: '0x1111111111111111111111111'
        // },
        // {
        //   checked: false,
        //   select: 2,
        //   roleName: '助理管理员',
        //   createTime: '2026-05-03',
        //   orderNum: '2',
        //   subAuth: '公告管理 公告修改',
        //   roleCode: '0x2222222222222222222222222'
        // },
        // {
        //   checked: false,
        //   select: 3,
        //   roleName: '初级管理员',
        //   createTime: '2026-05-04',
        //   orderNum: '3',
        //   roleCode: '0x33333333333333333333333333'
        // },
        // {
        //   checked: false,
        //   select: 4,
        //   roleName: '高级管理员',
        //   createTime: '2026-05-05',
        //   orderNum: '4',
        //   roleCode: '0x4444444444444444444444444444'
        // },
        // {
        //   checked: false,
        //   select: 5,
        //   roleName: '资深管理员',
        //   createTime: '2026-05-06',
        //   orderNum: '5',
        //   roleCode: '0x55555555555555555555555555555'
        // },
        // {
        //   checked: false,
        //   select: 6,
        //   roleName: '专家级管理员',
        //   createTime: '2026-05-07',
        //   orderNum: '6',
        //   roleCode: '0x666666666666666666666666666666'
        // },
        // {
        //   checked: false,
        //   select: 7,
        //   roleName: '超级管理员',
        //   createTime: '2026-05-08',
        //   orderNum: '7',
        //   roleCode: '0x7777777777777777777777777777777'
        // }
      ],
      // multipleSelection: [],
      currentRow: null,
      selectOne: false, // 给子组件传值，是否显示tab下的按钮
      count: 0,
      currentPage: 1,
      pageSize: 10,
      consoleVisible: false
    }
  },
  watch: {
    optionValue(nv, ov) {
      if (nv !== ov) {
        if (nv === 'editEmployee') {
          this.handleEditEmployee(this.currentRow[0])
        } else if (nv === 'editPassword') {
          this.handleEditPassword(this.currentRow[0])
        } else if (nv === 'delete') {
          this.handleDelete(this.currentRow)
        }
      }
    },
    currentPage(nv) {
      this.getEmployeeList({
        isSearchCount: 1,
        pageNum: nv,
        pageSize: this.pageSize,
        roleCode: '',
        roleName: ''
      })
    }
  },
  methods: {
    handleSelectTag(item, searchType) {
      console.log(item)
      console.log(searchType)

      if (this.checkTag(item.value)) {
        return false
      }

      this.tag = item.value

      if (searchType) {
        // search: searchAll searchByType
        switch (searchType) {
          case 'searchAll':
            if (this.tag.indexOf(':') !== -1) {
              this.tag = this.tag.split(':')[1]
            }
            this.tags.push.call(this.tags, this.tag)
            console.log(this.tags)
            break
          case 'searchByType':
            this.tags.push.call(this.tags, this.tag)
            break
        }
      }
    },
    // 校验重复和空tag
    checkTag(tag) {
      return this.tags.includes(tag) || tag.trim() === ''
    },
    // 关闭tag标签
    handleTagClose(e) {
      if (e.target.className === 'btn-close') {
        const currentTag = e.target.dataset.tag
        this.tags = this.tags.filter(tag => {
          return tag !== currentTag
        })
      }
    },
    // 当checkbox选择项发生变化时会触发
    handleSelectionChange(val) {
      if (val.length === 1) {
        // 只选择一个checkbox时
        this.options.forEach(item => {
          item.disabled = false
        })

        this.selectOne = true

        this.consoleVisible = true
      } else {
        // 0个或多个时
         if (val.length === 0) {
          this.options.forEach(item => {
            item.disabled = true
          })
        } else {
          this.options[0].disabled = true
          this.options[1].disabled = true
          this.options[2].disabled = false
        }

        this.selectOne = false

        if (!val.length) {
          this.consoleVisible = false
        }
      }

      this.currentRow = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleConsole(direct) {
      // direct: close fullScreen...
      switch (direct) {
        case 'close':
          this.consoleVisible = false
          break
        default:
          console.log(`sorry,we are not ${direct}`)
      }
    },
    // 当select选择删除时触发
    handleDelete(row) {
      const tip =
        row.length === 1
          ? '确认删除（' + row[0].loginId + '）吗？'
          : '确认批量删除吗？'
      this.$confirm(tip)
        .then(_ => {
          const id = row.map(item => item.id)
          this.removeEmployee(id)
          this.handleConsole('close')
        })
        .catch(_ => {
          console.log('cancel delete')
        })

      this.optionValue = ''
      // deleteFood(row.id).then(res => {
      //   this.$message({
      //     message: res.msg,
      //     type: "success"
      //   });
      //   this.getfoodList(this.currentPage, this.pageSize);
      // });
    },
    // 当select选择修改员工时触发
    handleEditEmployee(row) {
      this.navigatorTo('editEmployee', row)
    },
    handleEditPassword(row) {
      this.navigatorTo('editPassword', row)
    },
    // 当点击创建按钮时触发
    handleCreate() {
      this.navigatorTo('create', {
        accountName: '',
        isActive: 1,
        isAppUser: 0,
        loginId: '',
        loginPwd: '',
        loginPwdConfirm: '',
        orderNum: ''
      })
    },
    // 跳转到Role
    navigatorTo(status, row) {
      this.$router.push({
        name: 'Employee',
        params: {
          status,
          row
        }
      })
    },
    getEmployeeList({
      isSearchCount = 1,
      pageNum = this.currentPage,
      pageSize = this.pageSize,
      loginId = ''
    } = {}) {
      getEmployeeList({
        isSearchCount,
        pageNum,
        pageSize,
        loginId
      }).then(res => {
        const data = res.object
        this.tableData = data.records
        this.count = data.total
      })
    },
    removeEmployee(id) {
      removeEmployee({ id }, '.main-container').then(
        res => {
          this.getEmployeeList()
        }
      )
    }
  },
  mounted() {
    // 请求省略------------------------------------
    console.log('request loading....')
    this.getEmployeeList({
      isSearchCount: 1,
      pageNum: this.currentPage,
      pageSize: this.pageSize,
      loginId: ''
    })
  }
}
</script>
