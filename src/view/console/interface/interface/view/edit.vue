<template>
  <div class="interface-type-edit-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
      <el-breadcrumb-item :to="{ path: '/console/advertisement' }">界面</el-breadcrumb-item>
      <el-breadcrumb-item>{{params.status==="create"?"创建":"修改"}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tit">{{params.status==="create"?"创建":"修改"}}</div>
    <el-form
      class="ruleForm"
      ref="dataForm"
      :rules="rules"
      :model="params.row"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="界面分类" prop="interfaceId">
        <el-select v-model="params.row.interfaceId" placeholder="请选择" :collapse-tags="true">
          <el-option v-for="item in interfaceType" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否有效" prop="isActive">
        <el-select v-model="params.row.isActive" placeholder="请选择" :collapse-tags="true">
          <el-option
            v-for="item in isActiveOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="params.row.name" />
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input v-model="params.row.code" />
      </el-form-item>
      <el-form-item label="排序号" prop="orderNum">
        <el-input v-model="params.row.orderNum" />
      </el-form-item>
      <el-form-item label prop="image" class="form-item-upload">
        <input
          class="input-upload"
          type="file"
          id="file_upload"
          name="file_upload"
          @change="updateFileDisplay"
        />
        <label for="file_upload" class="el-button--primary btn-upload">上传效果图片</label>
        <img class="preview" :src="objectURL || params.row.url" alt />
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
  addInterface,
  updateInterface,
  getInterfaceTypeAll
} from '@/api/interface'
import { validOrderNum } from '@/util/business'

export default {
  data() {
    const validateOrderNum = (rule, value, callback) => {
      if (value && !value.trim()) callback(new Error('请输入排序号'))
      else if (!validOrderNum(value))
        callback(new Error('排序号必须为非零开头的数字'))
      else callback()
    }

    const validateImage = (rule, value, callback) => {
      if (!value && this.$route.params.status === 'create') {
        callback(new Error('请上传效果图'))
      } else {
        callback()
      }
    }

    return {
      formData: null,
      objectURL: null, //一个 DOMString，其中包含一个表示参数中给出的对象的URL
      isActiveOptions: [
        { value: 1, label: '是' },
        { value: 0, label: '否' }
      ],
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        interfaceId: [
          {
            required: true,
            message: '请选择界面分类',
            trigger: 'change'
          }
        ],
        // isActive: [
        //   { required: true, message: '请选择是否有效', trigger: 'blur' }
        // ],
        orderNum: [
          { required: true, validator: validateOrderNum, trigger: 'blur' }
        ],
        image: [
          {
            required: true,
            // message: '请上传效果图',
            trigger: 'blur',
            validator: validateImage
          }
        ]
      },
      params: this.$route.params,
      interfaceType: null //界面分类
    }
  },
  methods: {
    clickHandle() {
      this.defineDeleteProperty(['createTime', 'url'])

      this.createFormData()

      if (this.params.status === 'create') {
        this.handleCreate()
      } else {
        this.handleEdit()
      }
    },
    handleCancel() {
      this.toConsoleInterface()
    },
    // 创建员工用户
    handleCreate() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.addInterface()
      })
    },
    // 修改密码之外其它信息
    handleEdit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) this.updateInterface()
      })
    },
    addInterface() {
      addInterface(this.formData).then(res => {
        this.toConsoleInterface()
      })
    },
    updateInterface() {
      updateInterface(this.formData).then(res => {
        this.toConsoleInterface()
      })
    },
    // 路由跳转
    toConsoleInterface() {
      this.$router.push({
        name: 'ConsoleInterface'
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
    // 获取所有的界面分类
    getInterfaceTypeAll() {
      getInterfaceTypeAll().then(res => {
        this.interfaceType = res.object
      })
    },
    createFormData() {
      const formData = new FormData()
      for (const key in this.params.row) {
        const value = this.params.row[key]
        formData.append(key, value)
      }
      this.formData = formData
    },
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
      this.getInterfaceTypeAll()

      if (this.params.status === 'edit') {
        this.params.row.image = ''
      }
    }
  },
  mounted() {
    this.mounted()
  }
}
</script>

<style lang="scss" scoped>
.interface-type-edit-container {
  .tit {
    margin-top: 30px;
  }
  .ruleForm {
    margin-top: 20px;
    width: 460px;
    overflow: hidden;
    .form-item-upload {
      // margin-bottom: 10px;
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
  hr {
    background-color: red;
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