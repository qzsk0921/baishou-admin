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
      </ul>
    </div>
    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column width="50" type="selection"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="code" label="编码"></el-table-column>
        <el-table-column prop="orderNum" label="序号"></el-table-column>
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
  </div>
</template>

<script>
import Tab from '@/components/Tab/interface/interface-type'
import Console from '@/components/console/console'
import Search from '@/components/Search'
import {
  getInterfaceTypeList,
  removeInterfaceType,
  getOneInterfaceType
} from '@/api/interface'

export default {
  components: { Tab, Console, Search },
  data() {
    return {
      consoleVisible: false, //控制台显示
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
      categories: [
        { value: '界面分类' },
        { value: '真是姓名' },
        { value: '界面分类' },
        { value: '界面分类' },
        { value: '界面分类' },
        { value: '界面分类' },
        { value: '界面分类' },
        { value: '界面分类' },
        { value: '界面分类' },
        { value: '界面分类' },
        { value: '界面分类' }
      ],
      tableData: [],
      // multipleSelection: [],
      currentRow: null,
      selectOne: false, // 给子组件传值，是否显示tab下的按钮
      count: 0,
      currentPage: 1,
      pageSize: 10
      // consoleInstance: null
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
      this.getInterfaceTypeList({
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
        this.consoleVisible = true

        // 只选择一个checkbox时
        this.options.forEach(item => {
          item.disabled = false
        })

        this.selectOne = true

        this.getOneInterfaceType(val[0].id)
      } else {
        // 0个时
        if (val.length === 0) {
          this.options.forEach(item => {
            item.disabled = true
          })
          this.consoleVisible = false
        } else {
          this.options[0].disabled = true
          this.options[1].disabled = false
        }

        this.selectOne = false
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
          ? '确认删除（' + row[0].name + '）吗？'
          : '确认批量删除吗？'
      this.$confirm(tip)
        .then(_ => {
          const id = row.map(item => item.id)
          this.removeInterfaceType(id)
          this.handleConsole('close')
        })
        .catch(_ => {
          console.log('cancel delete')
        })

      this.optionValue = ''
    },
    // 当select选择修改界面分类时触发
    handleEdit(row) {
      this.navigatorTo('edit', row)
    },
    // 当点击创建按钮时触发
    handleCreate() {
      this.navigatorTo('create', {
        code: '',
        isActive: 1,
        name: '',
        orderNum: '',
        introduction: ''
      })
    },
    // 跳转到Interface
    navigatorTo(status, row) {
      this.$router.push({
        name: 'InterfaceType',
        params: {
          status,
          row
        }
      })
    },
    getInterfaceTypeList({
      isSearchCount = 1,
      pageNum = this.currentPage,
      pageSize = this.pageSize
    } = {}) {
      getInterfaceTypeList({
        isSearchCount,
        pageNum,
        pageSize
      }).then(res => {
        const data = res.object
        this.tableData = data.records
        this.count = data.total
      })
    },
    removeInterfaceType(id) {
      removeInterfaceType({ id }, '.main-container').then(res => {
        this.getInterfaceTypeList()
      })
    },
    getOneInterfaceType(id) {
      getOneInterfaceType(id).then(res => {
        this.currentRow = [res.object]
      })
    },
    mounted() {
      this.getInterfaceTypeList({
        isSearchCount: 1,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      })
    }
  },
  mounted() {
    // 请求省略------------------------------------
    console.log('request loading....')
    this.mounted()
  }
}
</script>
