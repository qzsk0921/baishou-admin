<template>
  <div class="tab-container">
    <ul class="tabs">
      <li
        v-for="tab in tabs"
        :key="tab.text"
        :to="tab.link"
        :class="['tab',{'active':currentTab===tab.component}]"
        @click="tabHandle(tab)"
      >{{tab.text}}</li>
    </ul>
    <component
      v-if="row"
      :is="currentTab"
      class="module"
      :row="row"
      :selectOne="selectOne"
      :collectionListOfSection="collectionListOfSection"
      :advertisementListOfSection="advertisementListOfSection"
    ></component>
  </div>
</template>

<script>
import { Information, Collection, SectionAdvertisement } from './components'
import { getCollectionListOfSection, getSectionAdvertList } from '@/api/explore'

export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {
          collectionNum: '',
          createTime: '',
          id: '',
          isActive: '',
          isCollectionTitle: '',
          isSectionTitle: '',
          isStatic: '',
          itemId: '',
          loadUrl: '',
          navbarId: '',
          orderNum: '',
          sectionName: '',
          sectionTitle: '',
          taskBarId: ''
        }
      }
    },
    selectOne: {
      type: Boolean
    }
  },
  components: { Information, Collection, SectionAdvertisement },
  data() {
    return {
      currentTab: 'Information',
      tabs: {
        Information: {
          type: 1,
          text: '基本信息',
          component: 'Information',
          link: ''
        },
        Collection: {
          type: 2,
          text: '合辑列表',
          component: 'Collection',
          link: ''
        },
        SectionAdvertisement: {
          type: 3,
          text: '内容版块广告',
          component: 'SectionAdvertisement',
          link: ''
        }
      },
      collectionListOfSection: null, //所属版块的合辑列表
      advertisementListOfSection: null //所属版块的广告列表
    }
  },
  watch: {
    'row.id': {
      handler(n) {
        this.getCollectionListOfSection(n)
        this.getSectionAdvertList(n)
      },
      immediate: true
    }
  },
  methods: {
    tabHandle(tab) {
      this.currentTab = tab.component
    },
    getCollectionListOfSection(id) {
      getCollectionListOfSection(id, '.tab-container').then(res => {
        this.collectionListOfSection = res.object
      })
    },
    getSectionAdvertList(id) {
      getSectionAdvertList(id, '.tab-container').then(res=>{
        this.advertisementListOfSection = res.object
      })
    }
  }
}
</script>