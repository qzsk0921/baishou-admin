<template>
  <div class="container section-container">
    <el-button class="btn-create" type="primary" @click="handleCreate">创建分类</el-button>
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
        <el-table-column prop="regionName" label="分类名称"></el-table-column>
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
import Tab from '@/components/Tab/video/category'
import Console from '@/components/console/console'
import Search from '@/components/Search'
import { getCategoryList1, getOneCategory, removeCategory } from '@/api/video'

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
        }
      ],
      tag: null, //选择标签
      tags: [], //标签列表
      categories: [{ value: '登录账号' }, { value: '真是姓名' }],
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
          this.handleEdit(this.currentRow[0])
        } else if (nv === 'delete') {
          this.handleDelete(this.currentRow)
        }
      }
    },
    currentPage(nv) {
      this.getCategoryList1({
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

        this.getOneCategory(val[0].id)

        this.consoleVisible = true
      } else {
        // 0个或多个时
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
          ? '确认删除（' + row[0].regionName + '）吗？'
          : '确认批量删除吗？'
      this.$confirm(tip)
        .then(_ => {
          const id = row.map(item => item.id)
          this.removeCategory(id)
          this.handleConsole('close')
        })
        .catch(_ => {
          console.log(_)
          console.log('cancel delete')
        })

      this.optionValue = ''
    },
    // 当select选择修改时触发
    handleEdit(row) {
      this.navigatorTo('edit', row)
    },
    // 当点击创建按钮时触发
    handleCreate() {
      this.navigatorTo('create', {
        orderNum: '', //地区排序
        regionCode: '', //地区编码
        regionName: '' //地区名称
      })
    },
    // 跳转
    navigatorTo(status, row) {
      this.$router.push({
        name: 'Category',
        params: {
          status,
          row
        }
      })
    },
    getCategoryList1({
      isActive = '',
      isSearchCount = 1,
      isStatic = '',
      pageNum = this.currentPage,
      pageSize = this.pageSize,
      sectionName = '',
      sectionTitle = ''
    } = {}) {
      getCategoryList1(
        {
          isSearchCount,
          pageNum,
          pageSize
        },
        'tbody'
      ).then(res => {
        const data = res.object
        this.tableData = data.records
        this.count = data.total
      })
    },
    removeCategory(id) {
      removeCategory({ id }, '.main-container').then(res => {
        this.getCategoryList1()
      })
    },
    getOneCategory(id) {
      getOneCategory(id).then(res => {
        this.currentRow = [res.object]
      })
    },
    mounted() {
      this.getCategoryList1({
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
