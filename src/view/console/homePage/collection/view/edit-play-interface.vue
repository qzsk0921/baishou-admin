<template>
  <div class="edit-play-interface-container edit-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/collection' }">合辑</el-breadcrumb-item>
      <el-breadcrumb-item>编辑播放界面</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tit">播放界面广告（建议使用1张图片广告）</div>
    <div class="content">
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
    <el-form
      class="ruleForm"
      ref="dataForm"
      :rules="rules"
      :model="currentPlayinterface"
      label-position="left"
      label-width="110px"
    >
      <el-form-item label="界面模板分类" prop="sortId">
        <el-select
          @change="interfaceTypeChangeHandle"
          v-model="currentPlayinterface.sortId"
          placeholder="请选择"
          :collapse-tags="true"
        >
          <el-option v-for="item in interfaceTypeAll" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="界面模板" prop="interfaceId">
        <el-select
          @change="interfaceChangeHandle"
          v-model="currentPlayinterface.interfaceId"
          placeholder="请选择"
          :collapse-tags="true"
        >
          <el-option v-for="item in interfaceList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="界面预览" class="form-item-preview">
        <img :src="interfaceObj.url" alt />
      </el-form-item>
    </el-form>
    <hr />
    <el-button class="btn-cancel btn" @click="handleCancel">取消</el-button>
    <el-button class="btn-status btn" type="primary" @click="handleSave">保存</el-button>
  </div>
</template>

<script>
import Search from '@/components/Search'
import { getAdvertisementList } from '@/api/advertisement'
import { addPlayfaceToCollection, getPlayfaceCollection } from '@/api/home-page'
import {
  getInterfaceListBySortId,
  getInterfaceTypeAll,
  getOneInterface
} from '@/api/interface'

export default {
  components: { Search },
  data() {
    return {
      interfaceTypeAll: null, //界面分类,
      interfaceList: null, //界面
      interfaceObj: { url: '' }, //界面对象
      currentPlayinterface: {
        sortId: '',
        interfaceId: '',
        advertList: []
      },
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
      rules: {
        sortId: [
          { required: true, message: '请选择界面类型', trigger: 'change' }
        ],
        interfaceId: [
          { required: true, message: '请选择界面', trigger: 'change' }
        ]
      }
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
    // 界面类型发生变化
    interfaceTypeChangeHandle(id, init, loading) {
      if (!init) {
        this.currentPlayinterface.interfaceId = null
      }

      this.interfaceList = null

      if (loading) this.getInterfaceListBySortId(id, loading)
      else this.getInterfaceListBySortId(id)
    },
    // 界面发生变化
    interfaceChangeHandle(id) {
      this.getOneInterface(id)
    },
    getOneInterface(id) {
      getOneInterface(id).then(res => {
        this.interfaceObj = res.object
      })
    },
    getInterfaceListBySortId(id) {
      getInterfaceListBySortId(id).then(res => {
        this.interfaceList = res.object
      })
    },
    getInterfaceTypeAll() {
      getInterfaceTypeAll('.ruleForm').then(res => {
        const data = res.object
        this.interfaceTypeAll = data
      })
    },
    // 当手动勾选数据行的 Checkbox 时触发的事件
    handleSelect(val, row) {
      const result = this.currentPlayinterface.advertList.some(
        (item, index) => {
          if (item.id === row.id) {
            // 已经有的，勾选则取消
            this.currentPlayinterface.advertList.splice(index, 1)
          }
          return item.id === row.id
        }
      )
      // 没有的话，勾选则新增
      if (!result) this.currentPlayinterface.advertList.push({ id: row.id })
    },
    // // 当checkbox选择项发生变化时会触发
    // handleSelectionChange(val) {
    //   this.currentRow = val
    // },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleCancel() {
      this.toConsoleCollectioin()
    },
    handleSave() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const advertId = this.currentPlayinterface.advertList.map(_ => _.id)
          this.addPlayfaceToCollection({
            collectionId: this.query.id,
            interfaceId: this.currentPlayinterface.interfaceId,
            sortId: this.currentPlayinterface.sortId,
            advertId
          })
        }
      })
    },
    //  新增/修改 播放界面
    addPlayfaceToCollection(data) {
      addPlayfaceToCollection(data, '.class-container').then(res => {
        this.toConsoleCollectioin()
      })
    },
    // 路由跳转
    toConsoleCollectioin() {
      this.$router.push({
        name: 'ConsoleCollection'
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

        this.$nextTick(() => {
          this.toggleRowSelection(data.records)
        })

        this.count = data.total
      })
    },
    // 回显选中
    toggleRowSelection(data) {
      if (this.currentPlayinterface.advertList.length > 0) {
        this.currentPlayinterface.advertList.forEach(item => {
          data.some((it, ind) => {
            if (item.id === it.id)
              return this.$refs.multipleTable.toggleRowSelection(data[ind])
          })
        })
      }
    },
    getPlayfaceCollection(id) {
      getPlayfaceCollection(id).then(res => {
        const currentPlayinterface = JSON.parse(JSON.stringify(res.object))
        // const currentPlayinterface = JSON.parse(JSON.stringify({}))

        if (currentPlayinterface.advertList) {
          this.currentPlayinterface = currentPlayinterface
        }
      })
    },
    mounted() {
      this.getInterfaceTypeAll()

      this.getAdvertisementList()

      if (!this.params.playinterface.advertList) {
        // 直接地址栏输入网址
        this.getPlayfaceCollection(this.query.id, 'tbody')
      } else {
        // 点击编辑按钮进入
        this.currentPlayinterface = JSON.parse(
          JSON.stringify(this.params.playinterface)
        )

        // 回填界面
        this.interfaceTypeChangeHandle(
          this.currentPlayinterface.sortId,
          true,
          '.ruleForm'
        )
      }
    }
  },
  mounted() {
    this.mounted()
  }
}
</script>

<style lang="scss" scoped>
.edit-play-interface-container {
  .tit {
    margin-top: 30px;
  }
  .content {
    margin-top: 25px;
  }
  .el-form {
    .form-item-preview {
      img {
        width: 400px;
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