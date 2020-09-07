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
        <el-table-column prop="sourceName" label="广告名称"></el-table-column>
        <el-table-column prop="typeId" label="广告类型"></el-table-column>
        <el-table-column prop="clientName" label="广告商"></el-table-column>
        <el-table-column prop="advertStatus" label="状态"></el-table-column>
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
      <tab :row="currentRow[0]" :selectOne="selectOne" :advertisementType="advertisementType" />
    </console>
  </div>
</template>

<script>
import Tab from '@/components/Tab/advertisement/advertisement'
import Console from '@/components/console/console'
import Search from '@/components/Search'
import {
  getAdvertisementList,
  removeAdvertisement,
  getAdvertisementTypeAllList,
  getOneAdvertisement
} from '@/api/advertisement'

// 1-未生效(未开始)，2-经生效（投放进行中），3-已结束，4-人工终止
const advertStatus = { 1: '未生效', 2: '经生效', 3: '已结束', 4: '人工终止' }

export default {
  components: { Tab, Console, Search },
  data() {
    return {
      consoleVisible: false, //控制台显示
      advertisementType: null,
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
        { value: '广告' },
        { value: '真是姓名' },
        { value: '广告' },
        { value: '广告' },
        { value: '广告' },
        { value: '广告' },
        { value: '广告' },
        { value: '广告' },
        { value: '广告' },
        { value: '广告' },
        { value: '广告' }
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
      this.getAdvertisementList({
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
        // 清空操作
        this.currentRow = { id: null }
        // 选一个时显示console
        this.consoleVisible = true
        // 只选择一个checkbox时
        this.options.forEach(item => {
          item.disabled = false
        })

        this.selectOne = true

        // 分页列表数据和getOne数据不完全一样(getOne较为保险)
        this.getOneAdvertisement(val[0].id)
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

        this.currentRow = val
      }
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
          ? '确认删除（' + row[0].sourceName + '）吗？'
          : '确认批量删除吗？'
      this.$confirm(tip)
        .then(_ => {
          const id = row.map(item => item.id)
          this.removeAdvertisement(id)
          this.handleConsole('close')
        })
        .catch(_ => {
          console.log('cancel delete')
        })

      this.optionValue = ''
    },
    // 当select选择修改广告时触发
    handleEdit(row) {
      row.typeId = this.advertisementType[0].value
      this.navigatorTo('edit', row)
    },
    // 当点击创建按钮时触发
    handleCreate() {
      this.navigatorTo('create', {
        begTime: new Date(),
        clientName: '',
        endTime: new Date(new Date().getTime() + 1000 * 3600 * 24 * 7),
        file: '',
        sourceCode: '',
        sourceName: '',
        typeId: this.advertisementType[0].value,
        advertDesc: '',
        advertLink: '',
        fileFormat: ''
      })
    },
    // 跳转到Role
    navigatorTo(status, row) {
      this.$router.push({
        name: 'Advertisement',
        params: {
          status,
          row,
          advertisementType: this.advertisementType //广告类型选项(动态)
        }
      })
    },
    getAdvertisementList({
      isSearchCount = 1,
      pageNum = this.currentPage,
      pageSize = this.pageSize,
      typeName = ''
    } = {}) {
      getAdvertisementList(
        {
          isSearchCount,
          pageNum,
          pageSize,
          typeName
        },
        'tbody'
      ).then(res => {
        const data = res.object
        this.tableData = data.records
        this.count = data.total
      })
    },
    removeAdvertisement(id) {
      removeAdvertisement({ id }, '.main-container').then(res => {
        this.getAdvertisementList()
      })
    },
    // 获取广告类型列表
    getAdvertisementTypeAllList() {
      getAdvertisementTypeAllList().then(res => {
        const data = res.object
        this.parseAdvertisementType(data)
      })
    },
    // 解析成广告类型选项
    parseAdvertisementType(data) {
      this.advertisementType = data.map(item => {
        let temp = {}
        temp.value = item.id
        temp.label = item.typeName
        return temp
      })
    },
    getOneAdvertisement(id) {
      getOneAdvertisement(id).then(res => {
        const data = res.object
        this.currentRow = [data]
      })
    },
    mounted() {
      this.getAdvertisementList({
        isSearchCount: 1,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        typeName: ''
      })
      this.getAdvertisementTypeAllList()
    }
  },
  mounted() {
    // 请求省略------------------------------------
    console.log('request loading....')
    this.mounted()
  }
}
</script>