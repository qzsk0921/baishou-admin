<template>
  <div class="collection-edit-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/collection' }">合辑</el-breadcrumb-item>
      <el-breadcrumb-item>{{params.status==="create"?"创建":"修改"}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tit">{{params.status==="create"?"创建":"修改"}}</div>
    <el-form
      class="ruleForm"
      ref="dataForm"
      :rules="rules"
      :model="params.row"
      label-position="left"
      label-width="140px"
    >
      <el-form-item label="当前有效导航栏" prop="navbarId">
        <el-select
          @change="navbarChangeHandle"
          v-model="params.row.navbarId"
          placeholder="请选择"
          :collapse-tags="true"
        >
          <el-option v-for="item in navbarAll" :key="item.id" :label="item.navbarName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="导航条目" prop="itemId">
        <el-select v-model="params.row.itemId" placeholder="请选择" :collapse-tags="true">
          <el-option v-for="item in naventryList" :key="item.id" :label="item.itemName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="静态内容版块" prop="sectionId">
        <el-select v-model="params.row.sectionId" placeholder="请选择" :collapse-tags="true">
          <el-option v-for="item in sectionStatic" :key="item.id" :label="item.sectionName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="collectionName">
        <el-input v-model="params.row.collectionName" />
      </el-form-item>
      <el-form-item label="编码" prop="collectionCode">
        <el-input v-model="params.row.collectionCode" />
      </el-form-item>
      <el-form-item label="标题" prop="collectionTitle">
        <el-input v-model="params.row.collectionTitle" />
        <span>如果合辑内是广告不需要填写标题</span>
      </el-form-item>
      <el-form-item label="预览数量" prop="previewCount">
        <el-select v-model="params.row.previewCount" placeholder="请选择" :collapse-tags="true">
          <el-option v-for="item in previewCount" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="界面模板分类" prop="sortId">
        <el-select
          @change="interfaceTypeChangeHandle"
          v-model="params.row.sortId"
          placeholder="请选择"
          :collapse-tags="true"
        >
          <el-option v-for="item in interfaceTypeAll" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="界面模板" prop="interfaceId" class="form-item-interface">
        <el-select
          @change="interfaceChangeHandle"
          v-model="params.row.interfaceId"
          placeholder="请选择"
          :collapse-tags="true"
        >
          <el-option v-for="item in interfaceList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <img class="interfaceImg" :src="currentInterface.url" alt />
      </el-form-item>
      <el-form-item label="预览界面显示排序" prop="isShowNum">
        <el-select v-model="params.row.isShowNum" placeholder="请选择" :collapse-tags="true">
          <el-option v-for="item in isShowNum" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="加载数量" prop="loadCount">
        <el-select v-model="params.row.loadCount" placeholder="请选择" :collapse-tags="true">
          <el-option v-for="item in loadCount" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="合辑简介" prop="collectionDesc">
        <el-input type="textarea" v-model="params.row.collectionDesc" :rows="4" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="合辑封面" prop="file" class="form-item-upload">
        <input
          class="input-upload"
          type="file"
          id="file_upload"
          name="file_upload"
          @change="updateFileDisplay"
        />
        <label for="file_upload" class="el-button--primary btn-upload">上传封面图片</label>
        <img class="preview" :src="objectURL || params.row.titlePicture" alt />
      </el-form-item>
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
  addCollection,
  updateCollection,
  getSectionList,
  getNavbarItems,
  getNavbarAll
} from '@/api/home-page'

import {
  getInterfaceTypeAll,
  getInterfaceListBySortId,
  getOneInterface
} from '@/api/interface'

// 预览数量(合辑外层显示的记录数，换一换重新从加载数量获取n条数据)
const previewCount = [
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 }
]
// 合辑外层预览界面是否显示排序
const isShowNum = [
  { value: 1, label: '是' },
  { value: 0, label: '否' }
]
// 加载数量（进入详情页的每页获取的记录数）
const loadCount = [
  { value: 8, label: '8' },
  { value: 10, label: '10' }
]
export default {
  data() {
    return {
      formData: null,
      objectURL: null, //一个 DOMString，其中包含一个表示参数中给出的对象的URL
      rules: {
        navbarId: [
          { required: true, message: '请选择导航栏', trigger: 'blur' }
        ],
        itemId: [
          { required: true, message: '请选择导航条目', trigger: 'blur' }
        ],
        sectionId: [
          { required: true, message: '请选择内容版块', trigger: 'blur' }
        ],
        collectionName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        collectionCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        collectionTitle: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        previewCount: [
          { required: true, message: '请选择预览数量', trigger: 'blur' }
        ],
        sortId: [
          { required: true, message: '请选择界面分类', trigger: 'blur' }
        ],
        interfaceId: [
          { required: true, message: '请选择界面', trigger: 'blur' }
        ],
        isShowNum: [{ required: true, message: '请选择排序', trigger: 'blur' }],
        loadCount: [
          { required: true, message: '请选择加载数量', trigger: 'blur' }
        ],
        collectionDesc: [
          { required: true, message: '请输入合辑简介', trigger: 'blur' }
        ]
      },
      params: this.$route.params,
      navbarAll: null, //所有导航栏
      sectionStatic: null, //静态内容版块
      interfaceTypeAll: null, //界面分类
      naventryList: null, //导航条目
      interfaceList: null, //界面
      currentInterface: { url: null }, //界面对象
      previewCount: previewCount,
      isShowNum,
      loadCount
    }
  },
  methods: {
    clickHandle() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const formData = new FormData()
          for (const key in this.params.row) {
            const value = this.params.row[key]
            formData.append(key, value)
          }
          this.formData = formData

          if (this.params.status === 'create') {
            this.handleCreate()
          } else {
            this.handleEdit()
          }
        }
      })
    },
    handleCancel() {
      this.toConsoleCollectioin()
    },
    // 创建
    handleCreate() {
      this.addCollection()
    },
    // 修改
    handleEdit() {
      this.updateCollection()
    },
    addCollection() {
      addCollection(this.formData).then(res => {
        this.toConsoleCollectioin()
      })
    },
    updateCollection() {
      updateCollection(this.formData).then(res => {
        this.toConsoleCollectioin()
      })
    },
    // 路由跳转
    toConsoleCollectioin() {
      this.$router.push({
        name: 'ConsoleCollection'
      })
    },
    // 获取所有导航栏
    getNavbarAll() {
      getNavbarAll().then(res => {
        this.navbarAll = res.object
      })
    },
    // 默认查询静态内容版块分页列表
    getSectionList({
      isActive = '',
      isSearchCount = 0,
      isStatic = 1,
      pageNum = 1,
      pageSize = 1000,
      sectionName = '',
      sectionTitle = ''
    } = {}) {
      getSectionList(
        { isSearchCount, isStatic, pageNum, pageSize },
        '.class-container'
      ).then(res => {
        const data = res.object
        this.sectionStatic = data.records
      })
    },
    getInterfaceTypeAll() {
      getInterfaceTypeAll('.class-container').then(res => {
        const data = res.object
        this.interfaceTypeAll = data
      })
    },
    // 获取导航栏下的所有导航条目
    getNavbarItems(id) {
      getNavbarItems(id).then(res => {
        this.naventryList = res.object
      })
    },
    getInterfaceListBySortId(id) {
      getInterfaceListBySortId(id).then(res => {
        this.interfaceList = res.object
      })
    },
    getOneInterface(id) {
      getOneInterface(id, '.interfaceImg').then(res => {
        this.currentInterface = res.object
      })
    },
    updateFileDisplay(e) {
      const file = e.target.files[0]

      if (file && this.validFile(file)) {
        this.params.row.image = file

        URL.revokeObjectURL(this.objectURL)
        this.objectURL = URL.createObjectURL(file)
      }
    },
    validFile(file) {
      const fileTypes = ['image/jpeg', 'image/pjpeg', 'image/png']
      const isJPG = fileTypes.includes(file.type)

      // const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      // if (!isLt2M) {
      //   this.$message.error('上传图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
      return isJPG
    },
    // 删除对象的多余属性
    defineDeleteProperty(prop = []) {
      const keys = Object.keys(this.params.row)
      for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < prop.length; j++) {
          if (keys[i] === prop[j]) {
            delete this.params.row[keys[i]]
          }
        }
      }
    },
    // 导航栏发生变化 @params {boolean} init //true 首次初始化不清除数据（回显）
    navbarChangeHandle(id, init) {
      if (!init) {
        this.params.row.itemId = null
      }

      this.naventryList = null

      this.getNavbarItems(id)
    },
    // 界面类型发生变化
    interfaceTypeChangeHandle(id, init) {
      if (!init) {
        this.params.row.interfaceId = null
      }

      this.interfaceList = null

      this.getInterfaceListBySortId(id)
    },
    // 界面发生变化
    interfaceChangeHandle(id) {
      this.getOneInterface(id)
    },
    checkParamsRow() {
      if (!this.params.row) {
        this.params.row = {
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
        }
      }
    },
    mounted() {
      this.checkParamsRow()

      this.getNavbarAll()

      this.getSectionList()

      this.getInterfaceTypeAll()

      if (this.params.status === 'edit') {
        this.navbarChangeHandle(this.params.row.navbarId, true) //导航栏
        this.interfaceTypeChangeHandle(this.params.row.sortId, true) //界面类型
        this.getOneInterface(this.params.row.interfaceId) //界面预览
      }
    }
  },
  mounted() {
    this.mounted()
  }
}
</script>

<style lang="scss" scoped>
.collection-edit-container {
  .tit {
    margin-top: 30px;
  }
  .ruleForm {
    margin-top: 20px;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      margin-right: 100px;
      /deep/ .el-form-item__content {
        width: 400px;
        .el-select {
          width: 100%;
        }
      }
    }
    .form-item-interface {
      .interfaceImg {
        margin-top: 10px;
      }
    }
    .form-item-upload {
      margin-bottom: 10px;
      /deep/ .el-form-item__content {
        .btn-upload {
          border-radius: 5px;
          width: 100%;
          text-align: center;
          display: inline-block;
        }
        .input-upload {
          opacity: 0;
          width: 0px;
          height: 0px;
          display: flex;
        }
        .preview {
          margin-top: 10px;
          object-fit: contain;
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
    margin-left: 50px;
  }
}
</style>