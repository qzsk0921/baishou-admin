<template>
  <div class="container navbar-container">
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
        <el-table-column prop="navbarName" label="导航栏名称"></el-table-column>
        <el-table-column prop="navbarCode" label="编码"></el-table-column>
        <el-table-column prop="itemCount" label="导航条目数量"></el-table-column>
        <el-table-column prop="isShow" label="是否当前使用"></el-table-column>
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
      <tab :row="currentRow" :selectOne="selectOne" />
    </console>
  </div>
</template>

<script>
import Tab from '@/components/Tab/explore/navbar'
import Console from '@/components/console/console'
import Search from '@/components/Search'
import {
  getExploreNavbarList,
  removeExploreNavbar,
  getOneExploreNavbar,
  setNavbarShow
} from '@/api/explore'
import navbarStyleList from '@/config/navbarStyle'

export default {
  components: { Tab, Console, Search },
  data() {
    return {
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
        },
        {
          value: 'show',
          label: '设为当前使用导航栏',
          disabled: true
        }
      ],
      tag: null, //选择标签
      tags: [], //标签列表
      categories: [
        { value: '导航栏名称' },
        { value: '编码' },
        { value: '导航条目数量' },
        { value: '导航栏名称' },
        { value: '导航栏名称' },
        { value: '导航栏名称' },
        { value: '导航栏名称' },
        { value: '导航栏名称' },
        { value: '导航栏名称' },
        { value: '导航栏名称' },
        { value: '导航栏名称' }
      ],
      tableData: [],
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
          this.handleEdit(this.currentRow)
        } else if (nv === 'delete') {
          this.handleDelete(this.currentRow)
        } else if (nv === 'show') {
          this.handleShow(this.currentRow)
        }
      }
    },
    currentPage(nv) {
      this.getExploreNavbarList({
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

        this.getOneExploreNavbar(val[0].id)

        this.consoleVisible = true
      } else {
        // 0个或多个时
        this.options.forEach(item => {
          item.disabled = true
        })

        this.selectOne = false

        if (!val.length) {
          this.consoleVisible = false
        }
      }

      this.currentRow = val[0]
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
      this.$confirm('确认删除（' + row.navbarName + '）吗')
        .then(_ => {
          this.removeExploreNavbar()
          this.handleConsole('close')
        })
        .catch(_ => {
          console.log('cancel delete')
        })

      this.optionValue = ''
    },
    // 当select选择设为当前使用导航栏
    handleShow(row) {
      this.setNavbarShow()
    },
    // 当select选择修改员工时触发
    handleEdit(row) {
      this.navigatorTo('edit', row)
    },
    // 当点击创建按钮时触发
    handleCreate() {
      this.navigatorTo('create', {
        isShow: 1, //选项
        navbarCode: '',
        navbarName: '',
        orderNum: '',
        styleCode: navbarStyleList[0].value //选项
      })
    },
    // 跳转到Role
    navigatorTo(status, row) {
      this.$router.push({
        name: 'ExploreNavbar',
        params: {
          status,
          row
        }
      })
    },
    getExploreNavbarList({
      isSearchCount = 1,
      pageNum = this.currentPage,
      pageSize = this.pageSize,
      navbarCode = '',
      navbarName = '',
      styleCode = ''
    } = {}) {
      getExploreNavbarList({
        isSearchCount,
        pageNum,
        pageSize,
        navbarCode,
        navbarName,
        styleCode
      }).then(res => {
        const data = res.object
        this.tableData = data.records
        this.count = data.total
      })
    },
    removeExploreNavbar() {
      removeExploreNavbar({ id: this.currentRow.id }, 'main-container').then(res => {
        this.getExploreNavbarList()
      })
    },
    setNavbarShow() {
      setNavbarShow({ id: this.currentRow.id, isShow: 1 }).then(res => {
        this.getExploreNavbarList()
      })
    },
    getOneExploreNavbar(id) {
      getOneExploreNavbar(id).then(res => {
        this.currentRow = res.object
      })
    },
    mounted() {
      this.getExploreNavbarList({
        isSearchCount: 1,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        navbarCode: '',
        navbarName: '',
        styleCode: ''
      })
    }
    // // 如果导航栏样式为空,提示用户先创建导航栏样式
    // hasNavbarStyleList() {
    //   if (!this.navbarStyleList.length) {
    //     this.$confirm('请先创建导航栏样式？')
    //       .then(_ => {
    //         // 引导用户去导航栏样式
    //         // done()
    //       })
    //       .catch(_ => {})
    //     return false
    //   } else {
    //     return true
    //   }
    // }
  },
  mounted() {
    // 请求省略------------------------------------
    console.log('request loading....')
    this.mounted()
  }
}
</script>
