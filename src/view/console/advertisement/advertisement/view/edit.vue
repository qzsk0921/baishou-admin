<template>
  <div class="advertisement-edit-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/advertisement-type' }">广告管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{params.status==="create"?"创建广告":"修改广告"}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tit">{{params.status==="create"?"创建广告":"修改广告"}}</div>
    <el-form
      class="ruleForm"
      ref="dataForm"
      :rules="rules"
      :model="params.row"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="名称" prop="sourceName">
        <el-input v-model="params.row.sourceName" />
      </el-form-item>
      <el-form-item label="编码" prop="sourceCode">
        <el-input v-model="params.row.sourceCode" />
      </el-form-item>
      <el-form-item label="广告商" prop="clientName">
        <el-input v-model="params.row.clientName" />
      </el-form-item>
      <el-form-item label="类型" prop="typeId">
        <el-select v-model="params.row.typeId" class="filter-item" placeholder="请选择" :collapse-tags="true">
          <el-option
            v-for="item in params.advertisementType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="链接地址" prop="advertLink">
        <el-input v-model="params.row.advertLink" />
      </el-form-item>
      <el-form-item label="有效时间" prop="endTime">
        <el-date-picker
          v-model="dataTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="dateTimeChangeHandle"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="内容描述" prop="advertDesc">
        <el-input type="textarea" v-model="params.row.advertDesc" :rows="4" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="广告文件" prop="file" class="form-item-upload">
        <input
          class="input-upload"
          type="file"
          id="file_upload"
          name="file_upload"
          @change="updateFileDisplay"
        />
        <label for="file_upload" class="el-button--primary btn-upload">点击上传</label>
        <img class="preview" :src="objectURL || params.row.filePath" alt />
        <video
          :src="objectURL || params.row.filePath"
          v-show="['AVI','mov','rmvb','rm','FLV','mp4','3GP'].includes(params.row.fileFormat)"
        ></video>
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
  addAdvertisement,
  updateAdvertisement,
  getAdvertisementTypeAllList
} from '@/api/advertisement'

import { formatTime } from '@/util/common'

export default {
  data() {
    return {
      // advertisementType: [
      //   { value: 1, label: '图片广告' },
      //   { value: 2, label: '视频广告' },
      //   { value: 2, label: 'gif动画' },
      //   { value: 2, label: '文字广告' }
      // ],
      formData: null,
      objectURL: null, //一个 DOMString，其中包含一个表示参数中给出的对象的URL
      dataTime: [
        this.$route.params.row.begTime
          ? this.$route.params.row.begTime
          : new Date(),
        this.$route.params.row.endTime
          ? this.$route.params.row.endTime
          : new Date(new Date().getTime() + 1000 * 3600 * 24 * 7)
      ],
      rules: {
        sourceName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        sourceCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        clientName: [
          { required: true, message: '请输入广告商', trigger: 'blur' }
        ],
        endTime: [{ required: true, message: '请输入日期', trigger: 'blur' }]
      },
      params: this.$route.params
    }
  },
  methods: {
    clickHandle() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          // 将date格式转换为yyyy-MM-dd HH:mm:ss
          if (
            this.params.row.begTime instanceof Date ||
            this.params.row.endTime instanceof Date
          ) {
            this.params.row.begTime = formatTime(this.dataTime[0])
            this.params.row.endTime = formatTime(this.dataTime[1])
          }

          this.defineDeleteProperty([
            'createTime',
            'createUserId',
            'createUserName',
            'advertStatus',
            'filePath'
          ])

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
      this.toConsoleAdvertisement()
    },
    // 创建
    handleCreate() {
      this.addAdvertisement()
    },
    // 修改
    handleEdit() {
      this.updateAdvertisement()
    },
    addAdvertisement() {
      addAdvertisement(this.formData).then(res => {
        this.toConsoleAdvertisement()
      })
    },
    updateAdvertisement() {
      updateAdvertisement(this.formData).then(res => {
        this.toConsoleAdvertisement()
      })
    },
    // 路由跳转
    toConsoleAdvertisement() {
      this.$router.push({
        name: 'ConsoleAdvertisement'
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
      this.params.advertisementType = data.map(item => {
        let temp = {}
        temp.value = item.id
        temp.label = item.typeName
        return temp
      })
      this.params.row.typeId = this.params.advertisementType[0].value
    },
    updateFileDisplay(e) {
      const file = e.target.files[0]

      // if(this.params.status === 'create') {
      //   // 创建时给file传值
      //   this.params.row.file = file
      // } else {
      //   // 编辑时给filePath传值
      //   this.params.row.filePath = file
      // }

      if (file && this.validFile(file)) {
        this.params.row.file = file

        URL.revokeObjectURL(this.objectURL)
        this.objectURL = URL.createObjectURL(file)
        this.params.row.fileFormat = file.type.split('/')[1] //后台需要文件类型
      }
    },
    validFile(file) {
      return true
      // const fileTypes = ['image/jpeg', 'image/pjpeg', 'image/png']
      // const isJPG = fileTypes.includes(file.type)

      // const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传图片只能是 JPG/PNG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
    },
    dateTimeChangeHandle(dataTime) {
      // 如果清空了时间就把endTime设置为null(校验不会通过)
      if (!dataTime) {
        return (this.params.row.endTime = null)
      }

      this.params.row.begTime = dataTime[0]
      this.params.row.endTime = dataTime[1]
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
    mounted() {
      // 此判断主要为了如果上个页面getAdvertisementTypeAllList接口异常导致没有返回数据或直接在地址栏输入地址时也能正常工作
      if (!this.params.row.typeId || !this.params.advertisementType) {
        this.getAdvertisementTypeAllList()
      }

      if(this.params.status === 'edit') {
        this.params.row.file = ''
      }
    }
  },
  mounted() {
    this.mounted()
  }
}
</script>

<style lang="scss" scoped>
.advertisement-edit-container {
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