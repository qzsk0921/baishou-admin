<template>
  <div class="edit-section-advertisement-container edit-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/collection' }">内容版块</el-breadcrumb-item>
      <el-breadcrumb-item>编辑内容版块广告</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tit">编辑内容版块广告</div>
    <div class="content">
      <span>广告数量建议不超过5个</span>
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
        <el-table :data="tableData" ref="multipleTable" style="width: 100%" @select="handleSelect">
          <el-table-column width="50" type="selection"></el-table-column>
          <el-table-column width="240" prop="sourceName" label="名称"></el-table-column>
          <el-table-column width="240" prop="createTime" label="创建时间"></el-table-column>
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
    </div>
    <hr />
    <el-button class="btn-cancel btn" @click="handleCancel">取消</el-button>
    <el-button class="btn-status btn" type="primary" @click="handleSave">保存</el-button>
  </div>
</template>

<script>
import Search from '@/components/Search'
import { getAdvertisementList } from '@/api/advertisement'
import {
  addAdvertisementToSection,
  getSectionAdvertList
} from '@/api/home-page'

export default {
  components: { Search },
  data() {
    return {
      search: {
        categories: [{ value: '视频分类', field: 'roleName' }],
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
      tags: [], //标签列表
      tableData: [],
      currentRow: null,
      count: 0,
      currentPage: 1,
      pageSize: 4,
      params: this.$route.params,
      query: this.$route.query,
      currentSectionAdvertisementList: null
    }
  },
  watch: {
    currentPage(nv) {
      this.getAdvertisementList({ pageNum: nv })
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
    // 当手动勾选数据行的 Checkbox 时触发的事件
    handleSelect(val, row) {
      const result = this.currentSectionAdvertisementList.some(
        (item, index) => {
          if (item.targetId === row.id) {
            // 已经有的，勾选则取消
            this.currentSectionAdvertisementList.splice(index, 1)
          }
          return item.targetId === row.id
        }
      )
      // 没有的话，勾选则新增
      if (!result)
        this.currentSectionAdvertisementList.push({ targetId: row.id })
    },
    // // 当checkbox选择项发生变化时会触发
    // handleSelectionChange(val) {
    //   this.currentRow = val
    // },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleCancel() {
      this.toConsoleSection()
    },
    handleSave() {
      const advertId = this.currentSectionAdvertisementList.map(_ => _.targetId)

      this.addAdvertisementToSection({
        sectionId: this.query.id,
        advertId
      })
    },
    //  新增/修改 内容版块广告
    addAdvertisementToSection(data) {
      addAdvertisementToSection(data, '.class-container').then(res => {
        this.toConsoleSection()
      })
    },
    // 路由跳转
    toConsoleSection() {
      this.$router.push({
        name: 'ConsoleSection'
      })
    },
    getAdvertisementList({
      isSearchCount = 1,
      pageNum = this.currentPage,
      pageSize = this.pageSize,
      sourceCode = '',
      sourceName = '',
      m_sourceCode = '',
      m_sourceName = '',
      queryContent = ''
    } = {}) {
      getAdvertisementList(
        {
          isSearchCount,
          pageNum,
          pageSize,
          sourceCode,
          sourceName,
          m_sourceCode,
          m_sourceName,
          queryContent
        },
        'tbody'
      ).then(res => {
        const data = res.object

        this.tableData = data.records

        this.$nextTick(() => {
          this.toggleRowSelection(data.records)
        })

        this.count = data.total
      })
    },
    // 回显选中
    toggleRowSelection(data) {
      if (this.currentSectionAdvertisementList.length > 0) {
        this.currentSectionAdvertisementList.forEach(item => {
          data.some((it, ind) => {
            if (item.advertId === it.id)
              return this.$refs.multipleTable.toggleRowSelection(data[ind])
          })
        })
      }
    },
    getSectionAdvertList(id) {
      getSectionAdvertList(id).then(res => {
        this.currentSectionAdvertisementList = JSON.parse(
          JSON.stringify(res.object)
        )
      })
    },
    mounted() {
      if (!this.params.advertisementListOfSection) {
        // 直接地址栏输入网址
        this.getSectionAdvertList(this.query.id, 'tbody')
      } else {
        // 点击编辑按钮进入
        this.currentSectionAdvertisementList = JSON.parse(
          JSON.stringify(this.params.advertisementListOfSection)
        )
      }

      this.getAdvertisementList()
    }
  },
  mounted() {
    this.mounted()
  }
}
</script>

<style lang="scss" scoped>
.edit-section-advertisement-container {
  .tit {
    margin-top: 30px;
  }
  .content {
    margin-top: 25px;
  }
  .btn {
    width: 150px;
  }
  .btn-cancel {
    margin-left: calc(100% - 350px);
  }
  .btn-status {
    margin-left: 50px;
  }
}
</style>