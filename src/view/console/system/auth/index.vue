<template>
  <div class="container home-container">
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
        <el-table-column width="50" type="selection">
          <!-- <template slot-scope="props"> -->
          <!-- <el-checkbox v-model="props.row.checked" @click.native.prevent="checkClick(props.row)" /> -->
          <!-- </template> -->
        </el-table-column>
        <el-table-column prop="name" label="权限名称"></el-table-column>
        <!-- <el-table-column label="详情">
          <template slot-scope="props">
            <el-button type="text" @click="checkClick(props.row)">查看</el-button>
          </template>
        </el-table-column>-->
        <el-table-column prop="isShow" label="是否可见"></el-table-column>
        <el-table-column prop="orderNum" label="序号" show-overflow-tooltip></el-table-column>
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
      <tab :row="currentRow" />
    </console>
  </div>
</template>

<script>
import Tab from '@/components/Tab/auth'
import Console from '@/components/console/console'
import Search from '@/components/Search'
import { getAuthList } from '@/api/auth'
import { myDefineProperty } from '@/util/business'

export default {
  components: { Tab, Console, Search },
  data() {

    return {
      key: null,
      tag: null, //选择标签
      tags: [], //标签列表
      categories: [{ value: '权限名称' }, { value: '序号' }],
      tableData: [],
      // multipleSelection: [],
      currentRow: null,
      count: 0,
      currentPage: 1,
      pageSize: 10,
      consoleVisible: false
    }
  },
  watch: {
    currentPage(nv) {
      this.getAuthList({
        isSearchCount: 1,
        name: '',
        pageNum: nv,
        pageSize: this.pageSize
      })
    },
    'tags.length'(length) {
      this.getAuthList({
        isSearchCount: 1,
        name: this.tags,
        pageNum: 1,
        pageSize: this.pageSize
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
              this.key = this.tag.split(':')[0]
              this.tag = this.tag.split(':')[1]
              if (this.tag.trim() === '') {
                return false
              }
            }
            this.tags.push.call(this.tags, this.tag)
            this.getAuthList({
              isSearchCount: 1,
              // name: this.tag,
              name: this.tags,
              pageNum: 1,
              pageSize: this.pageSize
            })
            console.log(this.tags)
            break
          case 'searchByType':
            this.tags.push.call(this.tags, this.tag)
            this.getAuthList({
              isSearchCount: 1,
              name: this.tags,
              pageNum: 1,
              pageSize: this.pageSize
            })
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
    // 无全选的单选checkbox
    // checkClick(val) {
    //   // if (!this.consoleInstance) {
    //   //   this.consoleInstance = this.$console()
    //   //   console.log(this.consoleInstance)
    //   // } else {
    //   //   console.log(this.consoleInstance)
    //   // }

    //   for (let item of this.tableData) {
    //     if (val.name !== item.name && item.checked) {
    //       item.checked = false
    //       break
    //     }
    //   }

    //   val.checked = !val.checked

    //   if (!val.checked) return (this.currentRow = null)

    //   this.currentRow = val
    // },

    // 当checkbox选择项发生变化时会触发
    handleSelectionChange(val) {
      if (val.length === 1) {
        this.consoleVisible = true
      } else {
        // 0个或多个时

        // 0个
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
    // 权限管理-获取全局权限表（分页列表）
    getAuthList({
      isSearchCount = 1,
      name = '',
      pageNum = this.currentPage,
      pageSize = this.pageSize
    } = {}) {
      getAuthList({
        isSearchCount: 1,
        name,
        pageNum,
        pageSize
      }).then(res => {
        const data = res.object
        this.tableData = myDefineProperty(data.records)
        this.count = data.total
      })
    }
  },
  mounted() {
    this.getAuthList({
      isSearchCount: 1,
      name: '',
      pageNum: this.currentPage,
      pageSize: this.pageSize
    })
  }
}
</script>