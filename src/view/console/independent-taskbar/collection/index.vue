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
      </ul>
    </div>
    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column width="50" type="selection"></el-table-column>
        <el-table-column prop="collectionName" label="合辑名称"></el-table-column>
        <el-table-column prop="sourceCount" label="文件数量"></el-table-column>
        <el-table-column prop="sectionName" label="导航条目"></el-table-column>
        <el-table-column prop="sectionName" label="内容版块"></el-table-column>
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
      <tab :row="currentRow" :selectOne="selectOne" />
    </console>
  </div>
</template>

<script>
import Tab from '@/components/Tab/explore/collection'
import Console from '@/components/console/console'
import Search from '@/components/Search'
import {
  getExploreCollectionList,
  getOneExploreCollection,
  removeExploreCollection
} from '@/api/explore'

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
          this.handleEdit(this.currentRow)
        } else if (nv === 'delete') {
          this.handleDelete(this.currentRow)
        }
      }
    },
    currentPage(nv) {
      this.getExploreCollectionList({
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

        this.getOneExploreCollection(val[0].id)

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
      this.$confirm('确认删除（' + row.collectionName + '）吗')
        .then(_ => {
          this.removeExploreCollection()
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
        collectionCode: '', // 合辑编码 require
        collectionDesc: '', // 合辑简介 require
        collectionName: '', // 合辑名称 require
        collectionTitle: '', // 合辑标题 require
        interfaceId: '', // 界面id(合辑外层) require
        isShowNum: '', // 预览数量(合辑外层预览界面是否显示排序) require
        itemId: '', // 所属导航条目ID require
        loadCount: '', // 加载数量（进入详情页的每页获取的记录数）require
        navbarId: '', // 所属导航栏ID require
        previewCount: '', // 预览数量(合辑外层显示的记录数，换一换重新从加载数量获取n条数据) require
        sectionId: '', // 所属静态版块ID require
        sortId: '', // 界面分类id(合辑外层) require
        iconFile: '', // iconFile
        iconName: '', // 金刚区名称
        image: '' // image
      })
    },
    // 跳转
    navigatorTo(status, row) {
      this.$router.push({
        name: 'ExploreCollection',
        params: {
          status,
          row
        }
      })
    },
    getExploreCollectionList({
      isActive = '',
      isSearchCount = 1,
      isStatic = '',
      pageNum = this.currentPage,
      pageSize = this.pageSize,
      sectionName = '',
      sectionTitle = ''
    } = {}) {
      getExploreCollectionList(
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
    removeExploreCollection() {
      removeExploreCollection({ id: this.currentRow.id }, '.main-container').then(
        res => {
          this.getExploreCollectionList()
        }
      )
    },
    getOneExploreCollection(id) {
      getOneExploreCollection(id, '.tab-container').then(res => {
        this.currentRow = res.object
      })
    },
    mounted() {
      this.getExploreCollectionList({
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
