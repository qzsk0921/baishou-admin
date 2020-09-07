<template>
  <div class="edit-player-advertisement-container edit-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/collection' }">合辑</el-breadcrumb-item>
      <el-breadcrumb-item>编辑播放器广告</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tit">编辑播放器广告</div>
    <div class="content">
      <section :class="item.className" v-for="(item,index) in section" :key="item.tit">
        <span class="section-tit">{{item.tit}}{{item.tip}}</span>
        <div class="search-container">
          <search @selectTag="handleSelectTag" :search="search" />
          <ul :class="'tag'+(index+1)+'-list'" @click="handleTagClose" v-if="item.tags.length">
            <li class="btn-tag" v-for="(it, ind) in item.tags" :key="ind">
              {{it.value}}
              <div class="btn-close" :data-tag="it.value">×</div>
            </li>
          </ul>
        </div>
        <div class="table-container">
          <el-table
            :class="'tableData'+(index+1)"
            :data="item.tableData"
            :ref="'multipleTable'+(index+1)"
            @select="(val,row)=>{handleSelect(val,row,item.type)}"
          >
            <el-table-column width="70" type="selection"></el-table-column>
            <el-table-column width="240" prop="sourceName" label="名称"></el-table-column>
            <el-table-column width="240" prop="createTime" label="播放时长" v-if="item.time">
              <template slot-scope="scope">
                <el-select
                  v-model="item.tableData[scope.$index].time"
                  placeholder="请选择"
                  @change="timeChangeHandle($event, scope, item.type)"
                >
                  <el-option v-for="i in timeOptions" :key="i.value" :label="i.label" :value="i.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange($event, item.type)"
            :current-page="item.currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="item.count"
            background
          ></el-pagination>
        </div>
      </section>
      <!-- <section class="header-advertisement">
        <span>播放头广告</span>
        <div class="search-container">
          <search @selectTag="handleSelectTag" :search="search" />
          <ul class="tag-list" @click="handleTagClose" v-if="tags1.length">
            <li class="btn-tag" v-for="(item, index) in tags1" :key="index">
              {{item.value}}
              <div class="btn-close" :data-tag="item.value">×</div>
            </li>
          </ul>
        </div>
        <div class="table-container">
          <el-table class="tableData1" :data="tableData1" @selection-change="handleSelectionChange($event,1)">
            <el-table-column width="70" type="selection"></el-table-column>
            <el-table-column width="240" prop="sourceName" label="名称"></el-table-column>
            <el-table-column width="240" prop="createTime" label="播放时长">
              <template>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in timeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange($event, 1)"
            :current-page="currentPage1"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="count1"
            background
          ></el-pagination>
        </div>
      </section>
      <section class="insert-advertisement">
        <span>插播广告</span>
        <div class="search-container">
          <search @selectTag="handleSelectTag" :search="search" />
          <ul class="tag-list" @click="handleTagClose" v-if="tags2.length">
            <li class="btn-tag" v-for="(item, index) in tags2" :key="index">
              {{item.value}}
              <div class="btn-close" :data-tag="item.value">×</div>
            </li>
          </ul>
        </div>
        <div class="table-container">
          <el-table class="tableData2" :data="tableData2" @selection-change="handleSelectionChange($event,2)">
            <el-table-column width="70" type="selection"></el-table-column>
            <el-table-column width="240" prop="sourceName" label="名称"></el-table-column>
            <el-table-column width="240" prop="createTime" label="播放时长"></el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange($event, 2)"
            :current-page="currentPage2"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="count2"
            background
          ></el-pagination>
        </div>
      </section>
      <section class="float-advertisement">
        <span>悬浮广告</span>
        <div class="search-container">
          <search @selectTag="handleSelectTag" :search="search" />
          <ul class="tag-list" @click="handleTagClose" v-if="tags3.length">
            <li class="btn-tag" v-for="(item, index) in tags3" :key="index">
              {{item.value}}
              <div class="btn-close" :data-tag="item.value">×</div>
            </li>
          </ul>
        </div>
        <div class="table-container">
          <el-table class="tableData3" :data="tableData3" @selection-change="handleSelectionChange($event,3)">
            <el-table-column width="70" type="selection"></el-table-column>
            <el-table-column width="240" prop="sourceName" label="名称"></el-table-column>
            <el-table-column width="240" prop="createTime" label="播放时长"></el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange($event,3)"
            :current-page="currentPage3"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="count3"
            background
          ></el-pagination>
        </div>
      </section>-->
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
  getPlayerAdvertisementList,
  addPlayerAdvertisementToCollection
} from '@/api/home-page'

export default {
  components: { Search },
  data() {
    const timeOptions = [
      { value: 5, label: '5s' },
      { value: 10, label: '10s' },
      { value: 15, label: '15s' },
      { value: 20, label: '20s' },
      { value: 30, label: '30s' },
      { value: 45, label: '45s' }
    ]
    return {
      section: [
        {
          type: 1,
          tit: '播放头广告',
          tip: null,
          className: 'header-adv',
          tableData: [],
          tags: [],
          currentRow: null,
          count: 0,
          currentPage: 1,
          time: 15
        },
        {
          type: 2,
          tit: '插播广告',
          tip: null,
          className: 'inset-adv',
          tableData: [],
          tags: [],
          currentRow: null,
          count: 0,
          currentPage: 1,
          time: 15
        },
        {
          type: 3,
          tit: '悬浮广告',
          tip: '（建议使用图片广告）',
          className: 'float-adv',
          tableData: [],
          tags: [],
          currentRow: null,
          count: 0,
          currentPage: 1,
          time: null
        }
      ],
      timeOptions,
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
      pageSize: 4,
      params: this.$route.params,
      query: this.$route.query,
      currentPlayerAdverList: null //当前播放器广告集合
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
    handleSelect(val, row, type) {
      const result = this.currentPlayerAdverList.some((item, index) => {
        const res = item.advertId === row.id && item.playType == type
        if (res) {
          // 已经有的，勾选则取消
          this.currentPlayerAdverList.splice(index, 1)
        }
        return res
      })
      // 没有的话，勾选则新增  支持后端 orderNum 默认传0
      if (!result)
        this.currentPlayerAdverList.push({
          advertId: row.id,
          collectionId: this.query.id,
          orderNum: 0,
          playLength: row.time ? row.time : 0,
          playType: type
        })
    },
    // 当页码发生变化触发
    handleCurrentChange(val, type) {
      this.section[type - 1].currentPage = val

      this.currentPageChangeHandle(val, type)
    },
    currentPageChangeHandle(pageNum, type) {
      if (this.section[type - 1].length > 0) {
        // 当有tags有值,过滤查询分页列表
        this.getAdvertisementList(
          {
            isSearchCount: 1,
            pageNum: pageNum,
            pageSize: this.pageSize,
            sourceCode: this.searchData.sourceCode,
            sourceName: this.searchData.sourceName,
            m_sourceCode: this.searchData.m_sourceCode,
            m_sourceName: this.searchData.m_sourceName,
            queryContent: this.searchData.queryContent
          },
          type
        )
      } else {
        // 当tags没值,分页列表
        this.getAdvertisementList(
          {
            isSearchCount: 1,
            pageNum: pageNum,
            pageSize: this.pageSize
          },
          type
        )
      }
    },
    // 取消
    handleCancel() {
      this.toConsoleCollectioin()
    },
    // 保存
    handleSave() {
      // 数据格式 fo表示入参
      const data = {
        fo: this.currentPlayerAdverList,
        collectionId: this.query.id
      }
      this.addPlayerAdvertisementToCollection(data)
    },
    //  合辑播放器广告-新增/修改
    addPlayerAdvertisementToCollection(data) {
      addPlayerAdvertisementToCollection(data, '.class-container').then(res => {
        this.toConsoleCollectioin()
      })
    },
    // 路由跳转
    toConsoleCollectioin() {
      this.$router.push({
        name: 'ConsoleCollection'
      })
    },
    getAdvertisementList(
      {
        isSearchCount = 1,
        pageNum = 1,
        pageSize = this.pageSize,
        sourceCode = '',
        sourceName = '',
        m_sourceCode = '',
        m_sourceName = '',
        queryContent = ''
      } = {},
      type = null
    ) {
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
        type === 1
          ? '.tableData1'
          : type === 2
          ? '.tableData2'
          : type === 3
          ? '.tableData3'
          : 'body'
      ).then(res => {
        const data = res.object

        if (!type) {
          this.section.forEach((_, ind) => {
            if (ind === 2) {
              // 悬浮广告没有时间
              _.tableData = JSON.parse(JSON.stringify(data.records))
            } else {
              // 播放头广告,插播广告
              _.tableData = this.addProperty(
                JSON.parse(JSON.stringify(data.records)),
                {
                  key: 'time',
                  val: 15
                }
              )
            }

            _.count = data.total
          })

          this.$nextTick(() => {
            for (let i = 1; i < 4; i++)
              this.toggleRowSelection(this.section[i - 1].tableData, i)
          })
        } else {
          if (type === 3) {
            // 悬浮广告没有时间
            this.section[type - 1].tableData = data.records
          } else {
            this.section[type - 1].tableData = this.addProperty(data.records, {
              key: 'time',
              val: 15
            })
          }

          this.section[type - 1].count = data.total

          this.$nextTick(() => {
            this.toggleRowSelection(data.records, type)
          })
        }
      })
    },
    // 回显选中
    toggleRowSelection(data, type) {
      if (this.currentPlayerAdverList.length > 0) {
        this.currentPlayerAdverList.forEach(item => {
          data.some((it, ind) => {
            if (item.advertId === it.id && item.playType == type) {
              // 选择的选项中，时间回显
              this.$refs['multipleTable' + type][0].data[ind].time =
                item.playLength

              this.$refs['multipleTable' + type][0].toggleRowSelection(
                data[ind]
              )
              return true
            }
          })
        })
      }
    },
    addProperty(data, propObj) {
      data.forEach(item => {
        item[propObj.key] = propObj.val
      })
      return data
    },
    // 当时间发生变化触发
    timeChangeHandle(time, scope, type) {
      this.currentPlayerAdverList.some(item => {
        if (scope.row.id === item.advertId && type === item.playType)
          return (item.playLength = time)
      })
    },
    // 获取合辑播放器广告-列表
    getPlayerAdvertisementList(id) {
      getPlayerAdvertisementList(id).then(res => {
        // this.currentPlayerAdverList = JSON.parse(JSON.stringify(res.object))
        this.currentPlayerAdverList = []
      })
    },
    mounted() {
      if (!this.params.playerAdvertisementList) {
        // 直接地址栏输入网址
        this.getPlayerAdvertisementList(this.query.id)
      } else {
        // 点击编辑按钮进入
        this.currentPlayerAdverList = JSON.parse(
          JSON.stringify(this.params.playerAdvertisementList)
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
.edit-player-advertisement-container {
  .tit {
    margin-top: 30px;
  }
  .content {
    margin-top: 25px;
    section {
      border-top: 1px solid #9a9a9a;
      padding-top: 20px;
      .search-container {
        margin-top: 20px;
      }
    }
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