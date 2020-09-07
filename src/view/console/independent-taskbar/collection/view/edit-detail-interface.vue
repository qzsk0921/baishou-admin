<template>
  <div class="edit-detail-interface-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/collection' }">合辑</el-breadcrumb-item>
      <el-breadcrumb-item>编辑详情界面</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tit">编辑详情界面</div>
    <div class="content">
      <div class="radio-box">
        <label style="width:110px;display:inline-block;">跳转至</label>
        <el-radio-group v-model="collectionDetailList.linkType">
          <el-radio label="1">导航条目</el-radio>
          <el-radio label="2">界面</el-radio>
          <el-radio label="3">任务栏</el-radio>
        </el-radio-group>
      </div>
      <el-form
        v-if="collectionDetailList.linkType==='1'"
        class="ruleForm"
        ref="dataForm"
        :model="collectionDetailList"
        label-position="left"
        label-width="110px"
      >
        <el-form-item label="任务栏" prop="taskBarId">
          <el-select v-model="collectionDetailList.taskBarId" placeholder="请选择" :collapse-tags="true">
            <el-option v-for="item in taskbarList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="当前有效导航栏" prop="navbarId">
          <el-select
            @change="navbarChangeHandle"
            v-model="collectionDetailList.navbarId"
            placeholder="请选择"
            :collapse-tags="true"
          >
            <el-option v-for="item in navbarAll" :key="item.id" :label="item.navbarName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="导航条目" prop="itemId">
          <el-select v-model="collectionDetailList.itemId" placeholder="请选择" :collapse-tags="true">
            <el-option v-for="item in naventryList" :key="item.id" :label="item.itemName" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form
        v-else-if="collectionDetailList.linkType==='2'"
        class="ruleForm"
        ref="dataForm"
        :model="collectionDetailList"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="界面模板分类" prop="sortId">
          <el-select
            @change="interfaceTypeChangeHandle"
            v-model="collectionDetailList.sortId"
            placeholder="请选择"
            :collapse-tags="true"
          >
            <el-option v-for="item in interfaceTypeAll" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="界面模板" prop="interfaceId">
          <el-select
            @change="interfaceChangeHandle"
            v-model="collectionDetailList.interfaceId"
            placeholder="请选择"
            :collapse-tags="true"
          >
            <el-option v-for="item in interfaceList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="界面预览" prop="interfaceId" class="form-item-preview">
          <img :src="interfaceObj.url" alt />
        </el-form-item>
      </el-form>
    </div>
    <hr />
    <el-button class="btn-cancel btn" @click="handleCancel">取消</el-button>
    <el-button class="btn-status btn" type="primary" @click="handleSave">保存</el-button>
  </div>
</template>

<script>
import {
  getExploreNavbarItems,
  getExploreNavbarAll,
  getCollectionDetailList,
  addCollectionDetail,
  updateCollectionDetail
} from '@/api/explore'
import {
  getInterfaceListBySortId,
  getInterfaceTypeAll,
  getOneInterface
} from '@/api/interface'
import { getTaskbarList } from '@/api/taskbar'

export default {
  data() {
    return {
      naventryList: null, //导航条目
      interfaceList: null, //界面
      taskbarList: null, //任务栏
      navbarAll: null, //所有导航栏
      interfaceTypeAll: null, //界面分类,
      interfaceObj: { url: '' }, //界面对象
      collectionDetailList: {
        collectionId: '',
        createTime: '',
        id: '',
        interfaceId: '',
        interfaceName: '',
        interfaceUrl: '',
        itemId: '',
        linkType: '1',
        navbarId: '',
        navbarItemName: '',
        navbarName: '',
        other: '',
        sectionName: '',
        sortId: '',
        taskBarId: '',
        taskBarName: ''
      }, //合辑内层列表
      formData: null,
      params: this.$route.params,
      query: this.$route.query
    }
  },
  watch: {
    'collectionDetailList.linkType': {
      handler(nv) {
        if (
          nv === '1' &&
          !this.naventryList &&
          this.collectionDetailList.taskBarId
        ) {
          // 导航条目
          this.navbarChangeHandle(this.collectionDetailList.navbarId, true) //导航栏
        } else if (
          nv === '2' &&
          !this.interfaceList &&
          this.collectionDetailList.sortId
        ) {
          // 界面
          this.interfaceTypeChangeHandle(this.collectionDetailList.sortId, true) //界面类型
          this.getOneInterface(this.collectionDetailList.interfaceId) //界面预览
        }
      }
    }
  },
  methods: {
    handleCancel() {
      this.toConsoleExploreCollectioin()
    },
    // 保存
    handleSave() {
      let data = null
      if (this.collectionDetailList.linkType === '1') {
        data = this.splicData('taskBarId', 'navbarId', 'itemId')
      } else {
        data = this.splicData('sortId', 'interfaceId')
      }

      if (this.collectionDetailList.id) {
        // 更新合辑详情
        Object.assign(data, { id: this.collectionDetailList.id })
        this.updateCollectionDetail(data)
      } else {
        // 新建合辑详情
        this.addCollectionDetail(data)
      }
    },
    // 导航栏发生变化
    navbarChangeHandle(id, init) {
      if (!init) {
        this.collectionDetailList.itemId = null
      }

      this.naventryList = null

      this.getExploreNavbarItems(id)
    },
    // 界面类型发生变化
    interfaceTypeChangeHandle(id, init) {
      if (!init) {
        this.collectionDetailList.interfaceId = null
      }

      this.interfaceList = null

      this.getInterfaceListBySortId(id)
    },
    // 界面发生变化
    interfaceChangeHandle(id) {
      this.getOneInterface(id)
    },
    // 获取导航栏下的所有导航条目
    getExploreNavbarItems(id) {
      getExploreNavbarItems(id, '.el-form').then(res => {
        this.naventryList = res.object
      })
    },
    getInterfaceListBySortId(id) {
      getInterfaceListBySortId(id, '.content').then(res => {
        this.interfaceList = res.object
      })
    },
    updateCollection() {
      updateCollection(this.formData).then(res => {
        this.toConsoleExploreCollectioin()
      })
    },
    // 路由跳转
    toConsoleExploreCollectioin() {
      this.$router.push({
        name: 'ConsoleExploreCollection'
      })
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
    // 获取所有导航栏
    getExploreNavbarAll() {
      getExploreNavbarAll('.content').then(res => {
        this.navbarAll = res.object
      })
    },
    getInterfaceTypeAll() {
      getInterfaceTypeAll('.content').then(res => {
        const data = res.object
        this.interfaceTypeAll = data
      })
    },
    // 获取任务栏列表
    getTaskbarList() {
      getTaskbarList('.content').then(res => {
        this.taskbarList = res.object
      })
    },
    getOneInterface(id) {
      getOneInterface(id).then(res => {
        this.interfaceObj = res.object
      })
    },
    addCollectionDetail(data) {
      addCollectionDetail(data, '.class-container').then(res => {
        this.toConsoleExploreCollectioin()
      })
    },
    updateCollectionDetail(data) {
      updateCollectionDetail(data, '.class-container').then(res => {
        this.toConsoleExploreCollectioin()
      })
    },
    // 拼装对应切换页的数据(条目,界面)
    splicData(...args) {
      let data = {}

      args.forEach(item => {
        data[item] = this.collectionDetailList[item]
      })

      Object.assign(data, {
        collectionId: this.collectionDetailList.collectionId,
        linkType: this.collectionDetailList.linkType
      })

      return data
    },
    getCollectionDetailList() {
      getCollectionDetailList(this.query.id, '.content').then(res => {
        if (res.object.id) {
          // 新增
          this.collectionDetailList = res.object
          this.getExploreNavbarItems(res.object.navbarId, 'content')
        } else {
          // 修改
          this.collectionDetailList.linkType = '1'
          this.collectionDetailList.collectionId = this.query.id
        }
      })
    },
    mounted() {
      this.checkParamsRow()

      this.getCollectionDetailList()

      this.getExploreNavbarAll()

      this.getInterfaceTypeAll()

      this.getTaskbarList()
    }
  },
  mounted() {
    this.mounted()
  }
}
</script>

<style lang="scss" scoped>
.edit-detail-interface-container {
  .tit {
    margin-top: 30px;
  }
  .content {
    margin-top: 25px;
    .radio-box {
      font-size: 14px;
    }
    .ruleForm {
      margin-top: 20px;
      overflow: hidden;
      .el-form-item {
        margin-right: 100px;
        /deep/ .el-form-item__content {
          width: 400px;
          .el-select {
            width: 100%;
          }
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