<template>
  <div class="search">
    <autocomplete
      popper-class="my-autocomplete"
      v-model="state"
      :fetch-suggestions="querySearch"
      placeholder="查询"
      @select="handleSelect"
    >
      <i class="el-icon-search el-input__icon" slot="prefix" @click="handleIconClick"></i>
      <!-- <svg-icon iconClass="search" slot="prefix" /> -->
      <!-- <template slot-scope="{ item }">
        <div class="name">{{ item.value }}</div>
        <span class="addr">{{ item.address }}</span>
      </template> -->
    </autocomplete>
  </div>
</template>

<script>
import Autocomplete from './components/Autocomplete'
import search from '@/api/search'

export default {
  components: {
    Autocomplete
  },
  props: {
    search: {
      type: Object,
      default() {
        return {
          categories: [],
          api: '',
          field: ''
        }
      }
    }
  },
  data() {
    return {
      field: null, //调查询接口需要通过匹配字段生成所需数据(从父组件向下传送，再监听@select方法从子组件得到)
      state: '',
      // restaurants: [],
      auth: [
        { value: '系统管理', id: 1 },
        { value: '广告管理', id: 2 },
        { value: '视频管理', id: 3 },
        { value: '首页', id: 4 },
        { value: '专栏', id: 5 }
      ], //本地调试 权限名称
      visibility: [], //是否可见
      index: [
        { value: 11, id: 1 },
        { value: 12, id: 2 },
        { value: 13, id: 3 },
        { value: 14, id: 4 },
        { value: 15, id: 5 }
      ], //序号
      createTime: [
        { value: '2026-05-02', id: 1 },
        { value: '2026-05-03', id: 2 },
        { value: '2026-05-04', id: 3 },
        { value: '2026-05-12', id: 4 },
        { value: '2026-05-22', id: 5 }
      ], //创建时间
      timeout: null
    }
  },
  methods: {
    querySearch(queryString, cb) {
      if (queryString.trim() && /^.+\s:\s$/g.test(queryString)) {
        return this.querySearchAsync(queryString, cb)
      }

      let categories = this.search.categories
      let results = queryString
        ? categories.filter(this.createFilter(queryString))
        : categories
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return category => {
        return (
          category.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    querySearchAsync(queryString, cb) {
      // let results = queryString
      //   ? auth.filter(this.createStateFilter(queryString))
      //   : auth
      // -------------------------------------------------------------------------

      search[this.search.api]().then(res => {
        const data = res.object
        let object = []

        data.forEach(item => {
          object.push({ value: item[this.field] })
        })

        cb(object)
      })

      // clearTimeout(this.timeout)

      // this.timeout = setTimeout(() => {
      //   // cb(results)
      //   cb(auth)
      // }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    // loadAll() {
    //   return [
    //     { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
    //     {
    //       value: 'Hot honey 首尔炸鸡（仙霞路）',
    //       address: '上海市长宁区淞虹路661号',
    //     },
    //     {
    //       value: '新旺角茶餐厅',
    //       address: '上海市普陀区真北路988号创邑金沙谷6号楼113'
    //     },
    //     { value: '泷千家(天山西路店)', address: '天山西路438号' }
    //   ]
    // },
    handleSelect(item, search) {
      // 清空输入
      if (search) {
        this.state = ''
      }
      
      if (item) {
        this.field = item.field
      }

      this.$emit('selectTag', item, search)
    },
    handleIconClick(ev) {
      console.log(ev)
    }
  }
  // mounted() {
  //   // this.categories = this.loadAll()
  // }
}
</script>
