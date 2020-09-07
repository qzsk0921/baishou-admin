<template>
  <div class="release-container loading-container">
    <span>名称：{{row.sourceName}}</span>
    <span>大小：{{row.sourceSize}}</span>
    <span>播放时长：{{row.createTime}}</span>
    <span>区域：{{row.createTime}}</span>
    <span>关键字：{{row.createTime}}</span>
    <span>演员：{{row.createTime}}</span>
    <span>编号：{{row.createTime}}</span>
    <p>简介：</p>
    <span class="preview">
      <i>广告预览：</i>
      <video
        class="media"
        :src="row.filePath"
        v-if="['AVI','mov','rmvb','rm','FLV','mp4','3GP'].includes(row.fileFormat)"
      ></video>
      <img class="media" v-else :src="row.filePath" alt />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {
          sourceName: '',
          typeId: '',
          clientName: '',
          begTime: '',
          endTime: '',
          filePath: '',
          advertDesc: '',
          filePath: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.release-container {
  display: flex;
  flex-wrap: wrap;
  span {
    width: 50%;
    &:nth-child(n + 3) {
      margin-top: 20px;
    }
  }
  .preview {
    span {
      display: inline-block;
    }
    .media {
      width: calc(100% - 80px);
      display: inline-block;
      vertical-align: top;
    }
  }
}
</style>