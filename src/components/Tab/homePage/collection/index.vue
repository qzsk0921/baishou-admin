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
      :sectionList="sectionList"
      :collectionDetailList="collectionDetailList"
      :bannerList="bannerList"
      :playerAdvertisementList="playerAdvertisementList"
    ></component>
  </div>
</template>

<script>
import {
  Information,
  DetailInterface,
  Banner,
  PlayerAdvertisement,
  VideoList,
  PlayInterface
} from './components'
// import { getOneInterface } from '@/api/interface'
import {
  getSectionByNaventry,
  getBannerList,
  getCollectionDetailList,
  getPlayerAdvertisementList
} from '@/api/home-page'

export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {
          collectionCode: '',
          collectionDesc: '',
          collectionName: '',
          collectionTitle: '',
          createTime: '',
          iconName: '',
          id: '',
          interfaceId: '',
          isShowNum: 1,
          itemId: '',
          loadCount: '',
          navbarId: '',
          navbarName: '',
          orderNum: '',
          previewCount: '',
          sectionId: '',
          sectionName: '',
          sortId: '',
          sourceCount: '',
          taskBarId: '',
          titlePicture: ''
        }
      }
    },
    selectOne: {
      type: Boolean
    }
  },
  components: {
    Information,
    DetailInterface,
    Banner,
    PlayerAdvertisement,
    VideoList,
    PlayInterface
  },
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
        DetailInterface: {
          type: 2,
          text: '详情界面',
          component: 'DetailInterface',
          link: ''
        },
        Banner: {
          type: 2,
          text: 'Banner',
          component: 'Banner',
          link: ''
        },
        PlayerAdvertisement: {
          type: 2,
          text: '播放器广告',
          component: 'PlayerAdvertisement',
          link: ''
        },
        VideoList: {
          type: 2,
          text: '视频列表',
          component: 'VideoList',
          link: ''
        },
        PlayInterface: {
          type: 2,
          text: '播放界面',
          component: 'PlayInterface',
          link: ''
        }
      },
      sectionList: [],
      collectionDetailList: null,
      bannerList: null,
      playerAdvertisementList: null
    }
  },
  watch: {
    'row.id': {
      handler(n) {
        this.getCollectionDetailList(n)
        this.getSectionByNaventry(n)
        this.getBannerList(n)
        this.getPlayerAdvertisementList(n)
      },
      immediate: true
    }
  },
  methods: {
    tabHandle(tab) {
      this.currentTab = tab.component
    },
    getCollectionDetailList(id) {
      getCollectionDetailList(id).then(res => {
        this.collectionDetailList = res.object
      })
    },
    getSectionByNaventry(id) {
      getSectionByNaventry(id).then(res => {
        this.sectionList = res.object.records
      })
    },
    getBannerList(id) {
      getBannerList(id).then(res => {
        this.bannerList = res.object
      })
    },
    getPlayerAdvertisementList(id) {
      getPlayerAdvertisementList(id, '.tab-container').then(res => {
        this.playerAdvertisementList = res.object
      })
    }
  }
}
</script>