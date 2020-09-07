<template>
  <div class="information-container loading-container">
    <span>名称：{{row.sourceName}}</span>
    <span>广告类型：{{row.typeId}}</span>
    <span>广告商：{{row.clientName}}</span>
    <span>有效时间：{{row.begTime}} {{row.endTime}}</span>
    <span>链接地址：{{row.advertLink}}</span>
    <span>内容描述：{{row.advertDesc}}</span>
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
.information-container {
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