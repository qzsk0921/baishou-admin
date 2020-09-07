<template>
  <div class="information-container loading-container">
    <span>名称：{{row.itemName}}</span>
    <span>显示导航条目: {{row.isShow==1?'是':'否'}}</span>
    <span>界面：{{interfaceObj.name}}</span>
    <span>
      界面预览
      <img :src="interfaceObj.url" alt />
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
          createTime: '',
          id: '',
          interfaceId: '',
          isDefault: '',
          isShow: '',
          itemCode: '',
          itemName: '',
          navbarId: '',
          orderNum: '',
          taskBarId: ''
        }
      }
    },
    interfaceObj: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.information-container {
  display: flex;
  flex-direction: column;
  span {
    // width: 50%;
    // &:nth-child(n + 3) {
    //   margin-top: 20px;
    // }
    margin-top: 20px;
  }
  img {
    width: 400px;
    margin-top: 10px;
  }
}
</style>