<template>
  <div class="container section-container">
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
        <el-table-column prop="sectionName" label="内容版块名称"></el-table-column>
        <el-table-column prop="isStatic" label="内容版块类型"></el-table-column>
        <el-table-column prop="collectionNum" label="合辑数量"></el-table-column>
        <el-table-column prop="isActive" label="是否可见"></el-table-column>
        <el-table-column prop="navbarName" label="导航栏"></el-table-column>
        <el-table-column prop="taskBarName" label="任务栏"></el-table-column>
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
import Tab from '@/components/Tab/homePage/section'
import Console from '@/components/console/console'
import Search from '@/components/Search'
import { getSectionList, getOneSection, removeSection } from '@/api/home-page'

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
      this.getSectionList({
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

        this.getOneSection(val[0].id)

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
          ? '确认删除（' + row[0].sectionName + '）吗？'
          : '确认批量删除吗？'
      this.$confirm(tip)
        .then(_ => {
          const id = row.map(item => item.id)
          this.removeSection(id)
          this.handleConsole('close')
        })
        .catch(_ => {
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
        isActive: 1, // 是否有效(可见) require
        isCollectionTitle: 1, // 是否显示合辑标题 require
        isSectionTitle: 1, // 是否显示板块标题 require
        isStatic: 1, // 是否静态 require
        itemId: '', // 所属导航条目ID require
        navbarId: '', // 所属导航栏ID require
        orderNum: '', // 排序 require
        sectionName: '', // 板块名称 require
        sectionTitle: '', // 板块标题 require
        advertPosition: 1, // 广告位置：1-居中插播，2-头部插播，3-尾部插播（动态情况使用）
        loadCount: 8, // 加载数量（动态情况使用）
        loadUrl: '' // 加载地址（动态情况使用）
      })
    },
    // 跳转
    navigatorTo(status, row) {
      this.$router.push({
        name: 'Section',
        params: {
          status,
          row
        }
      })
    },
    getSectionList({
      isActive = '',
      isSearchCount = 1,
      isStatic = '',
      pageNum = this.currentPage,
      pageSize = this.pageSize,
      sectionName = '',
      sectionTitle = ''
    } = {}) {
      getSectionList(
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
    removeSection() {
      removeSection({ id }, '.main-container').then(res => {
        this.getSectionList()
      })
    },
    getOneSection(id) {
      getOneSection(id).then(res => {
        this.currentRow = [res.object]
      })
    },
    mounted() {
      this.getSectionList({
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
