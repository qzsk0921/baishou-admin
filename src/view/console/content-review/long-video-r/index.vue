<style lang="scss" scoped>
.option-select {
  margin: 25px 0 0 20px !important;
}
</style>
<template>
  <div class="container section-container">
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
        <el-table-column prop="sourceName" label="名称"></el-table-column>
        <el-table-column prop="sourceMd5" label="MD5"></el-table-column>
        <el-table-column prop="isRepeat" label="是否有重复">
          <template slot-scope="scope">{{scope.row.isRepeat===1?'是':'否'}}</template>
        </el-table-column>
        <el-table-column prop="createTime" label="播放测试"></el-table-column>
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
import Tab from '@/components/Tab/video/release'
import Console from '@/components/console/console'
import Search from '@/components/Search'
import {
  getLongVideoReviewList,
  getOneGegion,
  removeGegion
} from '@/api/content-review'

export default {
  components: { Tab, Console, Search },
  data() {
    return {
      optionValue: '',
      options: [
        {
          value: 'pass',
          label: '通过',
          disabled: true
        },
        {
          value: 'nopass',
          label: '不通过',
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
        if (nv === 'pass') {
          this.handlePass(this.currentRow)
        } else if (nv === 'nopass') {
          this.handleNopass(this.currentRow)
        }
      }
    },
    currentPage(nv) {
      this.getLongVideoReviewList({
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

        // this.getOneGegion(val[0].id)
        this.currentRow = val[0]

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

      console.log(this.currentRow)
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
    handleNopass(row) {
      this.$confirm('确认删除（' + row.sourceName + '）吗')
        .then(_ => {
          this.removeGegion()
          this.handleConsole('close')
        })
        .catch(_ => {
          console.log('cancel delete')
        })

      this.optionValue = ''
    },
    // 当select选择修改时触发
    handlePass(row) {
      this.navigatorTo('pass', row)
    },
    // 跳转
    navigatorTo(status, row) {
      this.$router.push({
        name: 'Region',
        params: {
          status,
          row
        }
      })
    },
    getLongVideoReviewList({
      isActive = '',
      isSearchCount = 1,
      isStatic = '',
      pageNum = this.currentPage,
      pageSize = this.pageSize,
      sectionName = '',
      sectionTitle = ''
    } = {}) {
      getLongVideoReviewList(
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
    removeGegion() {
      removeGegion({ id: this.currentRow.id }, '.main-container').then(res => {
        this.getLongVideoReviewList()
      })
    },
    // getOneGegion(id) {
    //   getOneGegion(id).then(res => {
    //     this.currentRow = res.object
    //   })
    // },
    mounted() {
      this.getLongVideoReviewList({
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
