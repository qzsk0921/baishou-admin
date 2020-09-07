<template>
  <div class="container upload-container">
    <el-button class="btn-create" type="primary" @click="handleUpload" :disabled="!regionOptions.length">上传视频</el-button>
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
        <el-table-column prop="sourceName" label="视频名称"></el-table-column>
        <el-table-column prop="sourceSize" label="大小">
          <template slot-scope="scope">{{scope.row.sourceSize}}MB</template>
        </el-table-column>
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
      <tab :row="currentRow[0]" :selectOne="selectOne" />
    </console>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible" :before-close="handleDialogClose">
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="action"
        multiple
        :file-list="fileList"
        :auto-upload="false"
        :drag="!fileList.length"
        :limit="10"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :on-exceed="handleExceed"
        :on-progress="handleProgress"
        :http-request="uploadFile"
        v-if="uploadStatus !== 'uploading'&&uploadStatus !== 'uploaded'"
      >
        <svg-icon v-if="!fileList.length" slot="trigger" icon-class="upload" class-name="svg-upload" />
        <el-button slot="trigger" size="small" type="primary" class="btn-add">添加文件</el-button>
        <el-button
          style="position:absolute;bottom:30px;right:20px;width:140px;"
          size="small"
          type="primary"
          @click="submitUpload"
          :disabled="!fileList.length"
        >上传</el-button>
        <div slot="tip" class="el-upload__tip" v-if="fileList.length">
          <span class="region-select">
            存储区
            <el-select v-model="region" placeholder="请选择" size="mini" :collapse-tags="true">
              <el-option
                v-for="item in regionOptions"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </span>
          <span class="tip-num">文件数量：{{fileList.length}}</span>
          <span class="tip-size">文件大小：{{allFileSize}} MB</span>
        </div>
      </el-upload>
      <p class="warning" v-if="warning" style="color:red;">一次最多上传10个视频</p>
      <div class="loading" v-if="uploadStatus==='uploading'||uploadStatus==='uploaded'">
        <div class="detail">
          <div class="storage-region">存储区：{{region | toRegionLabel(that)}}</div>
          <div class="file-num">
            <span>文件数量：</span>
            <span>{{fileList.length}}</span>
          </div>
          <div class="success-num">
            <span>已成功：</span>
            <span>{{successNum}}</span>
          </div>
          <div class="failed-num" v-if="uploadStatus==='uploading'&&failedMsg.length">
            <span>已失败：</span>
            <span>{{failedNum}}</span>
          </div>
          <div class="failed-cause" v-if="uploadStatus==='uploading'&&failedMsg.length">
            <p v-for="(err,idx) in failedMsg" :key="idx">
              <span>（{{idx}}）失败原因：</span>
              <span>{{err}}</span>
            </p>
          </div>
        </div>
        <el-button
          style="position:absolute;bottom:30px;right:20px;width:140px;"
          size="small"
          type="primary"
          @click="clickHandle"
          v-text="uploadStatus==='uploading'?'取消':'关闭'"
        ></el-button>
      </div>
    </el-dialog>
    <video class="video" :src="objectURL " @canplaythrough="canplaythrough"></video>
  </div>
</template>

<script>
import Tab from '@/components/Tab/video/upload'
import Console from '@/components/console/console'
import Search from '@/components/Search'
import {
  getUploadVideoList,
  getOneUploadVideo,
  removeUploadVideo,
  getUploadVideoRegion,
  addUploadVideo
} from '@/api/video'

import SparkMD5 from 'spark-md5'

const fileTypes = [
  'video/mp4',
  'video/rmvb',
  'video/mkv',
  'video/avi',
  'video/flv',
  'video/wmv',
  'video/mpg',
  'video/mov',
  'video/f4v',
  'video/m4v',
  'video/rm',
  'video/3gp'
]

export default {
  components: { Tab, Console, Search },
  data() {
    return {
      // headers: {
      //   deviceType: 'pc',
      //   token: this.$store.state.user.token
      // },
      failedMsg: [], //失败原因
      failedNum: 0, //上传失败数
      successNum: 0, //上传成功数
      that: this,
      uploadStatus: 'uploadable', //uploadble,uploading,uploaded
      action: process.env.VUE_APP_BASE_API + '/video/video-source/add',
      md55: '', //md5
      playTime: '', //播放时长
      region: '',
      regionOptions: [], //上传地区
      objectURL: null,
      time1: null, //延时器1
      time2: null, //延时器2
      warning: false, //警告
      allFileSize: 0, //所有文件大小(MB)
      dialogVisible: false,
      dialogStatus: null, //Upload uploading uploaded delete,
      textMap: {
        upload: '上传',
        uploading: '上传中',
        uploaded: '上传完成',
        delete: '删除'
      },
      fileList: [],
      optionValue: '',
      options: [
        {
          value: 'edit',
          label: '修改',
          disabled: true
        },
        {
          value: 'delete',
          label: '删除',
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
      consoleVisible: false //控制台显示
    }
  },
  computed: {
    finishedNum: {
      get() {
        return this.successNum + this.failedNum
      },
      set(v) {
        if (v === 0) {
          this.dialogStatus = this.uploadStatus = 'uploaded'

          this.getUploadVideoList({
            isSearchCount: 1,
            pageNum: this.currentPage,
            pageSize: this.pageSize
          })
        }
      }
    }
  },
  watch: {
    optionValue(nv, ov) {
      if (nv !== ov) {
        if (nv === 'edit') {
          this.handleEdit(this.currentRow[0])
        } else if (nv === 'delete') {
          this.handleDelete(this.currentRow)
        }
      }
    },
    currentPage(nv) {
      this.getUploadVideoList({
        isSearchCount: 1,
        pageNum: nv,
        pageSize: this.pageSize,
        roleCode: '',
        roleName: ''
      })
    },
    'fileList.length'(nv) {
      if (nv === 1) {
        const dom = document.getElementsByClassName('el-upload')[0]
        dom.style.height = 'auto'

        dom.style.left = 0

        dom.style.width = 0
      } else if (nv <= 0) {
        const dom = document.getElementsByClassName('el-upload')[0]

        // 清除演示器 (解决删除时显示的问题)
        if (this.time1) clearTimeout(this.time1)

        this.time1 = setTimeout(() => {
          dom.style.left = '50%'

          dom.style.width = '100%'

          dom.style.height = '100%'
        }, 500)
      }
    }
  },
  filters: {
    // 区域值转化为区域名称
    toRegionLabel(val, that) {
      let name = ''

      that.regionOptions.some(_ => {
        if (_.value === val) name = _.name

        return _.value === val
      })

      return name ? name : val
    }
  },
  methods: {
    clickHandle() {
      this.dialogVisible = false

      if (this.time2) clearTimeout(this.time2)

      if (this.uploadStatus === 'uploaded') {
        this.time2 = setTimeout(() => {
          this.successNum = this.failedNum = 0

          this.failedMsg = this.fileList = []

          this.uploadStatus = 'uploadable'
        }, 500)
      }
    },
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

        this.getOneUploadVideo(val[0].id)

        this.consoleVisible = true
      } else {
        // 0个或多个时
        if (val.length === 0) {
          this.options.forEach(item => {
            item.disabled = true
          })

          this.consoleVisible = false
        } else {
          this.options[0].disabled = true
          this.options[1].disabled = false
        }

        this.selectOne = false
      }

      this.currentRow = val
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
    handleDelete(row) {
      const tip =
        row.length === 1
          ? '确认删除（' + row[0].sourceName + '）吗？'
          : '确认批量删除吗？'
      this.$confirm(tip)
        .then(_ => {
          const id = row.map(item => item.id)
          this.removeUploadVideo(id)
          this.handleConsole('close')
        })
        .catch(_ => {
          console.log(_)
          console.log('cancel delete')
        })

      this.optionValue = ''
    },
    // 当select选择修改时触发
    handleEdit(row) {
      this.navigatorTo('edit', row)
    },
    // 当点击上传按钮时触发
    handleUpload() {
      this.dialogStatus = 'upload'

      this.dialogVisible = true
      // 设置默认区域
      if (this.regionOptions.length) this.region = this.regionOptions[0].value
    },
    // 跳转
    navigatorTo(status, row) {
      this.$router.push({
        name: 'Category',
        params: {
          status,
          row
        }
      })
    },
    getUploadVideoList({
      isActive = '',
      isSearchCount = 1,
      isStatic = '',
      pageNum = this.currentPage,
      pageSize = this.pageSize,
      sectionName = '',
      sectionTitle = ''
    } = {}) {
      getUploadVideoList(
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
    removeUploadVideo(id) {
      removeUploadVideo({ id }, '.main-container').then(res => {
        this.getUploadVideoList()
      })
    },
    getOneUploadVideo(id) {
      getOneUploadVideo(id, '.tab-container').then(res => {
        this.currentRow = [res.object]
      })
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList)

      if (this.warning) this.warning = false

      this.fileList = fileList

      this.allFileSize = this.fileSizeCompute(fileList)
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      console.log(file)
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange(file, fileList) {
      console.log(file)
      console.log(fileList)

      if (this.validFile(file)) {
        this.fileList = fileList

        this.allFileSize = this.fileSizeCompute(fileList)

        this.setVideoURL(file.raw)

        this.md5(file.raw, 1024)
          .then(res => {
            // 获取文件的md5
            console.log(res)
            this.md55 = res

            this.loadUploadRawData(file)
          })
          .catch(err => {
            // 异常处理
            console.log(err)
          })
      } else {
        this.fileList = fileList.slice(0, fileList.length - 1)
      }
    },
    // 组装数据
    loadUploadRawData(file) {
      const temp = {
        playTime: Math.round(this.playTime), //后台只支持整数
        region: this.region,
        sourceFormat: file.raw.type.split('/')[1],
        sourceMd5: this.md55.slice(0, 16), //后台长度限制16位
        sourceSize: Math.round(file.size / 1024),
        videoFile: file.raw
      }

      file.raw.formData = this.parseUploadRawData(temp)

      // for (const key in temp) {
      //   if (temp.hasOwnProperty(key)) {
      //     file[key] = temp[key]
      //   }
      // }
    },
    uploadProgress(progressEvent) {
      console.log(progressEvent)
      console.log(progressEvent.loaded, progressEvent.total)
      // const progress = (progressEvent.loaded / progressEvent.total) * 100
      // console.log(progress)
    },
    parseUploadRawData(rawData) {
      const tempFormData = new FormData()
      for (const key in rawData) {
        if (rawData.hasOwnProperty(key)) {
          tempFormData.append(key, rawData[key])
        }
      }
      return tempFormData
    },
    // 文件超出个数限制时的钩子
    handleExceed(file, fileList) {
      this.warning = true
    },
    // 文件上传时的钩子
    handleProgress(e, file, fileList) {
      console.log(e)
    },
    // 覆盖默认的上传行为
    uploadFile(file) {
      this.addUploadVideo(file.file.formData, this.uploadProgress)
    },
    // 点击上传触发
    submitUpload() {
      // 调用自定义上传的实现uploadFile
      this.$refs.upload.submit()
      this.uploadStatus = this.dialogStatus = 'uploading'
    },
    validFile(file) {
      const isVideo = fileTypes.includes(file.raw.type)

      if (!isVideo) {
        this.$message.error('上传视频格式不正确')
      }

      return isVideo
    },
    fileSizeCompute(data) {
      if (!data.length) return false

      const res = data.map(_ => _.size).reduce((prev, curr) => prev + curr)

      return this.byteToMb(res)
    },
    //byte转MB 保留两位小数
    byteToMb(byte) {
      if (isNaN(byte)) return false

      return Math.round((byte / (1024 * 1024)) * 100) / 100
    },
    handleDialogClose() {
      this.dialogVisible = false
    },
    setVideoURL(file) {
      this.objectURL = URL.createObjectURL(file)
    },
    // 估算可以播放到结束
    canplaythrough(data) {
      this.playTime = data.target.duration
    },
    /**
     * 计算文件的MD5
     * @param file 文件
     * @param chunkSize 分片大小
     * @returns Promise
     */
    md5(file, chunkSize) {
      return new Promise((resolve, reject) => {
        let blobSlice =
          File.prototype.slice ||
          File.prototype.mozSlice ||
          File.prototype.webkitSlice
        let chunks = Math.ceil(file.size / chunkSize)
        let currentChunk = 0
        let spark = new SparkMD5.ArrayBuffer()
        let fileReader = new FileReader()

        fileReader.onload = function(e) {
          spark.append(e.target.result)
          currentChunk++
          if (currentChunk < chunks) {
            loadNext()
          } else {
            let md5 = spark.end()
            resolve(md5)
          }
        }

        fileReader.onerror = function(e) {
          reject(e)
        }

        function loadNext() {
          let start = currentChunk * chunkSize
          let end = start + chunkSize
          if (end > file.size) {
            end = file.size
          }
          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
        }
        loadNext()
      })
    },
    getUploadVideoRegion() {
      getUploadVideoRegion().then(res => {
        this.regionOptions = res.object
      })
    },
    addUploadVideo(data, cb) {
      addUploadVideo(data, cb)
        .then(res => {
          this.successNum++
          if (this.finishedNum === this.fileList.length) {
            this.finishedNum = 0
          }
        })
        .catch(err => {
          this.failedNum++

          this.failedMsg.push(err)

          if (this.finishedNum === this.fileList.length) {
            this.finishedNum = 0
          }
        })
    },
    mounted() {
      this.getUploadVideoList({
        isSearchCount: 1,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      })

      this.getUploadVideoRegion()
    }
  },
  mounted() {
    // 请求省略------------------------------------
    console.log('request loading....')
    this.mounted()
  }
}
</script>

<style lang="scss" scoped>
.upload-container {
  .video {
    visibility: hidden;
    opacity: 0;
    width: 0;
    height: 0;
  }
  .el-dialog {
    .el-dialog__body {
      .upload-demo {
        height: 450px;
        padding-bottom: 50px;
        /deep/.el-upload {
          width: 90%;
          height: 100%;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          .btn-add {
            width: 140px;
          }
          .el-upload-dragger {
            width: 100% !important;
            height: 100% !important;
            .btn-add {
              position: absolute;
              top: 80%;
              transform: translateX(-50%);
            }
            .svg-upload {
              width: 50%;
              height: 50%;
              position: absolute;
              top: 45%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
      .el-upload__tip {
        margin-top: 20px;
        .region-select,
        .tip-num {
          margin-right: 50px;
        }
      }
      .loading {
        .detail {
          height: 450px;
          .storage-region {
            padding-bottom: 30px;
            // background-color: #dceef8;
          }
          .file-num,
          .success-num,
          .failed-num {
            display: flex;
            justify-content: space-between;
            padding: 15px 100px 15px 60px;
            font-size: 16px;
          }
          .failed-cause {
            color: red;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
