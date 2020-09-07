<template>
  <div class="section-edit-container container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/naventry' }">内容版块</el-breadcrumb-item>
      <el-breadcrumb-item>{{params.status==="create"?"创建":"修改"}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tit">{{params.status==="create"?"创建首页内容版块":"编辑首页内容版块"}}</div>
    <el-form
      class="ruleForm"
      ref="dataForm"
      :rules="rules"
      :model="myRow"
      label-position="left"
      label-width="150px"
    >
      <el-form-item label="导航栏" prop="navbarId">
        <el-select
          @change="navbarChangeHandle"
          v-model="myRow.navbarId"
          placeholder="请选择"
          :collapse-tags="true"
        >
          <el-option v-for="item in navbarAll" :key="item.id" :label="item.navbarName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="导航条目" prop="itemId">
        <el-select v-model="myRow.itemId" placeholder="请选择" :collapse-tags="true">
          <el-option v-for="item in naventryList" :key="item.id" :label="item.itemName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="版块名称" prop="sectionName">
        <el-input v-model="myRow.sectionName" />
      </el-form-item>
      <el-form-item label="版块标题" prop="sectionTitle">
        <el-input v-model="myRow.sectionTitle" />
      </el-form-item>
      <el-form-item label="界面上显示版块标题" prop="isSectionTitle">
        <el-select v-model="myRow.isSectionTitle" class="filter-item" placeholder="请选择" :collapse-tags="true">
          <el-option
            v-for="item in isShowSectionTitOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="界面上显示合辑标题" prop="isCollectionTitle">
        <el-select v-model="myRow.isCollectionTitle" placeholder="请选择" :collapse-tags="true">
          <el-option
            v-for="item in isShowCollectionTitOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="内容版块是否有效" prop="isActive">
        <el-select v-model="myRow.isActive" placeholder="请选择" :collapse-tags="true">
          <el-option
            v-for="item in isActiveOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="排序号" prop="orderNum">
        <el-input v-model="myRow.orderNum" />
      </el-form-item>
      <el-form-item label="内容版块类型" prop="isStatic">
        <el-select v-model="myRow.isStatic" placeholder="请选择" :collapse-tags="true">
          <el-option
            v-for="item in isStaticOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <p v-if="myRow.isStatic===1">静态内容版块，版块内的合辑通过手动添加，内容固定，适合于大多数应用场景</p>
        <p v-else-if="myRow.isStatic===0">动态内容版块，版块内的合辑动态生成，适合于一个界面内显示内容的来源固定</p>
      </el-form-item>
      <div class="form-item-dynamic" v-if="myRow.isStatic===0">
        <el-form-item label="加载地址" prop="loadUrl">
          <el-input v-model="myRow.loadUrl" />
        </el-form-item>
        <el-form-item label="单次加载数量" prop="loadCount">
          <el-select v-model="myRow.loadCount" placeholder="请选择" :collapse-tags="true">
            <el-option
              v-for="item in loadCountOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="内容版块广告位置" prop="advertPosition">
          <el-select v-model="myRow.advertPosition" placeholder="请选择" :collapse-tags="true">
            <el-option
              v-for="item in advertPositionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <hr />
    <el-button class="btn-cancel btn" @click="handleCancel">取消</el-button>
    <el-button
      class="btn-status btn"
      type="primary"
      @click="clickHandle"
    >{{params.status==="create"?"创建":"保存"}}</el-button>
  </div>
</template>

<script>
import {
  addSection,
  updateSection,
  getNavbarAll,
  getNavbarItems
} from '@/api/home-page'
import Search from '@/components/Search'
import { validOrderNum } from '@/util/business'

// 显示版块标题
const isShowSectionTitOptions = [
  { value: 1, label: '是' },
  { value: 0, label: '否' }
]
// 显示合辑标题
const isShowCollectionTitOptions = [
  { value: 1, label: '是' },
  { value: 0, label: '否' }
]
// 内容版块是否有效
const isActiveOptions = [
  { value: 1, label: '是' },
  { value: 0, label: '否' }
]
// 内容版块类型
const isStaticOptions = [
  { value: 1, label: '静态' },
  { value: 0, label: '动态' }
]
// 单次加载数量
const loadCountOptions = [
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
  { value: 11, label: '11' },
  { value: 12, label: '12' }
]
// 内容版块广告位置
const advertPositionOptions = [
  { value: 1, label: '居中插播' },
  { value: 2, label: '头部插播' },
  { value: 3, label: '尾部插播' }
]
export default {
  components: { Search },
  data() {
    const validateOrderNum = (rule, value, callback) => {
      if (value && !value.trim()) callback(new Error('请输入排序号'))
      else if (!validOrderNum(value))
        callback(new Error('排序号必须为非零开头的数字'))
      else callback()
    }

    return {
      search: {
        categories: [{ value: '界面分类', field: 'name' }],
        api: 'getInterfaceTypeAll'
      },
      searchType: null, //记录查询类型
      searchData: {
        roleCode: [],
        roleName: [],
        m_roleCode: [],
        m_roleName: [],
        queryContent: []
      },
      tag: null, //选择标签
      tags: [], //标签列表
      formData: null,
      interfaceData: [], //界面模板下拉框
      rules: {
        navbarId: [
          { required: true, message: '请选择导航栏', trigger: 'blur' }
        ],
        itemId: [
          { required: true, message: '请选择导航条目', trigger: 'blur' }
        ],
        sectionName: [
          { required: true, message: '请输入版块名称', trigger: 'blur' }
        ],
        sectionTitle: [
          { required: true, message: '请输入版块标题', trigger: 'blur' }
        ],
        isSectionTitle: [
          { required: true, message: '请选择是否显示版块标题', trigger: 'blur' }
        ],
        isCollectionTitle: [
          { required: true, message: '请选择是否显示合辑标题', trigger: 'blur' }
        ],
        isActive: [
          { required: true, message: '请选择版块是否有效', trigger: 'blur' }
        ],
        orderNum: [{ required: true, validator: validateOrderNum }],
        isStatic: [
          { required: true, message: '请选择版块类型', trigger: 'blur' }
        ],
        loadUrl: [{ required: true, message: '加载地址', trigger: 'blur' }],
        loadCount: [
          { required: true, message: '请选择加载数量', trigger: 'blur' }
        ],
        advertPosition: [
          { required: true, message: '请选择广告位置', trigger: 'blur' }
        ]
      },
      params: this.$route.params,
      myRow: null,
      navbarAll: null, //所有导航栏
      naventryList: null, //导航条目
      isShowSectionTitOptions,
      isShowCollectionTitOptions,
      isActiveOptions,
      isStaticOptions,
      loadCountOptions,
      advertPositionOptions
    }
  },
  methods: {
    // 导航栏发生变化 @params {boolean} init //true 首次初始化不清除数据（回显）
    navbarChangeHandle(id, init) {
      if (!init) this.myRow.itemId = null

      this.naventryList = null

      this.getNavbarItems(id)
    },
    // 获取导航栏下的所有导航条目
    getNavbarItems(id) {
      getNavbarItems(id).then(res => {
        this.naventryList = res.object
      })
    },
    clickHandle() {
      if (this.myRow.isStatic === 1)
        this.defineDeleteProperty(['loadUrl', 'loadCount', 'advertPosition'])

      if (this.params.status === 'create') this.handleCreate()
      else this.handleEdit()
    },
    handleCancel() {
      this.toConsoleSection()
    },
    // 创建
    handleCreate() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.addSection()
      })
    },
    // 修改密码之外其它信息
    handleEdit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.updateSection()
      })
    },
    addSection() {
      addSection(this.myRow).then(res => {
        this.toConsoleSection()
      })
    },
    updateSection() {
      updateSection(this.myRow).then(res => {
        this.toConsoleSection()
      })
    },
    // 路由跳转
    toConsoleSection() {
      this.$router.push({
        name: 'ConsoleSection'
      })
    },
    // 获取所有的导航栏
    getNavbarAll() {
      getNavbarAll().then(res => {
        this.navbarAll = res.object
      })
    },
    defineDeleteProperty(prop = []) {
      const keys = Object.keys(this.myRow)
      for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < prop.length; j++) {
          if (keys[i] === prop[j]) {
            delete this.myRow[keys[i]]
          }
        }
      }
    },
    created() {
      this.myRow = JSON.parse(JSON.stringify(this.params.row))

      if (this.params.status === 'edit')
        this.navbarChangeHandle(this.myRow.navbarId, true) //导航栏
    },
    mounted() {
      this.getNavbarAll()
    }
  },
  created() {
    this.created()
  },
  mounted() {
    this.mounted()
  }
}
</script>

<style lang="scss" scoped>
.section-edit-container {
  .tit {
    margin-top: 30px;
  }
  .ruleForm {
    margin-top: 20px;
    overflow: hidden;
    .el-form-item {
      margin-right: 100px;
      /deep/ .el-form-item__content {
        .el-select {
          width: 400px;
        }
        .el-input {
          width: 400px;
        }
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
    // margin-left: calc(100% - 120px);
    margin-left: 50px;
  }
}
</style>