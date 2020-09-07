<template>
  <div class="container role-container">
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
      <search @selectTag="handleSelectTag" :search="search" />
      <ul class="tag-list" @click="handleTagClose" v-if="tags.length">
        <li class="btn-tag" v-for="(item, index) in tags" :key="index">
          {{item.value}}
          <div class="btn-close" :data-tag="item.value">×</div>
        </li>
      </ul>
    </div>
    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column width="50" type="selection"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleCode" label="编码"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
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
    <!-- <el-button type="primary" icon="el-icon-plus" @click="handleCreate">创建角色</el-button> -->
  </div>
</template>

<script>
import Tab from '@/components/Tab/role'
import Console from '@/components/console/console'
import Search from '@/components/Search'
import { getRoleList, removeRole } from '@/api/role'
// import { myDefineProperty } from '@/util/business'

export default {
  components: { Tab, Console, Search },
  data() {
    return {
      search: {
        categories: [
          { value: '角色名称', field: 'roleName' },
          { value: '编码', field: 'roleCode' }
        ],
        api: 'getRoleListAll'
      },
      searchType: null, //记录查询类型
      searchData: {
        roleCode: [],
        roleName: [],
        m_roleCode: [],
        m_roleName: [],
        queryContent: []
      },
      optionValue: '',
      options: [
        {
          value: 'edit',
          label: '修改',
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
        if (nv === 'edit') {
          this.handleEdit(this.currentRow[0])
        } else if (nv === 'delete') {
          this.handleDelete(this.currentRow)
        }
      }
    },
    currentPage(nv) {
      if (this.tags.length > 0) {
        // 当有tags有值,过滤查询分页列表
        this.getRoleList({
          isSearchCount: 1,
          pageNum: nv,
          pageSize: this.pageSize,
          roleCode: this.searchData.roleCode,
          roleName: this.searchData.roleName,
          m_roleCode: this.searchData.m_roleCode,
          m_roleName: this.searchData.m_roleName,
          queryContent: this.searchData.queryContent
        })
      } else {
        // 当tags没值,分页列表
        this.getRoleList({
          isSearchCount: 1,
          pageNum: nv,
          pageSize: this.pageSize,
          roleCode: '',
          roleName: '',
          m_roleCode: '',
          m_roleName: '',
          queryContent: ''
        })
      }
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
          this.options[1].disabled = false
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
          ? '确认删除（' + row[0].roleName + '）吗？'
          : '确认批量删除吗？'
      this.$confirm(tip)
        .then(_ => {
          const id = row.map(item => item.id)
          this.removeRole(id)
          this.handleConsole('close')
        })
        .catch(_ => {
          console.log('cancel delete')
        })

      this.optionValue = ''
    },
    // 当select选择编辑时触发
    handleEdit(row) {
      console.log(row)
      // this.$router.push({
      //   name: 'Role',
      //   params: { status: 'edit', id: 11, row }
      // })
      this.navigatorTo('edit', row)
    },
    // 当点击创建按钮时触发
    handleCreate() {
      // this.$router.push({
      //   name: 'Role',
      //   params: {
      //     status: 'create',
      //     row: {
      //       roleName: '',
      //       roleCode: '',
      //       orderNum: ''
      //     }
      //   }
      // })
      this.navigatorTo('create', {
        roleName: '',
        roleCode: '',
        orderNum: ''
      })
    },
    // 跳转到Role
    navigatorTo(status, row) {
      this.$router.push({
        name: 'Role',
        params: {
          status,
          row
        }
      })
    },
    getRoleList({
      isSearchCount = 1,
      pageNum = this.currentPage,
      pageSize = this.pageSize,
      roleCode = '',
      roleName = '',
      m_roleCode = '',
      m_roleName = '',
      queryContent = ''
    } = {}) {
      getRoleList({
        isSearchCount,
        pageNum,
        pageSize,
        roleCode,
        roleName,
        m_roleCode,
        m_roleName,
        queryContent
      }).then(res => {
        const data = res.object
        this.tableData = data.records
        this.count = data.total
      })
    },
    removeRole(id) {
      removeRole({ id }, '.main-container').then(res => {
        this.getRoleList()
      })
    },
    mounted() {
      this.getRoleList()
    }
  },
  mounted() {
    // 请求省略------------------------------------
    console.log('request loading....')
    this.mounted()
  }
}
</script>
