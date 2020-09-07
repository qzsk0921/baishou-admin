<template>
  <div class="subRole-container loading-container">
    <el-button class="btn" type="primary" @click="handleAssignRole" :disabled="!selectOne">分配角色</el-button>
    <!-- <div>{{row.subAuth}}</div> -->
  </div>
</template>

<script>

export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {
          subAuth: ''
        }
      }
    },
    selectOne: {
      type: Boolean
    }
  },
  methods: {
    handleAssignRole() {
      // 跳转到分配角色页
      this.$router.push({
        name: 'Ear',
        params: {
          row: this.row
        },
        query: {
          id: this.row.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.subRole-container {
  .btn {
    margin-bottom: 10px;
  }
}
</style>