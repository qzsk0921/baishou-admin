import { Navbar } from '@/components'
import ClassMain from '@/components/ClassMain'

const classRouter = [
    {
        path: '/class',
        components: {
            navbar: Navbar,
            default: ClassMain
        },
        meta: { title: '操作分类', roles: ['ADMINISTRATOR'] },
        hidden: true,
        children: [
            // 系统管理-----------------------------------------------------------------------------------
            {
                path: 'role',
                name: 'Role',
                component: () => import(/* webpackChunkName: "system" */ '@/view/console/system/role/view/edit'),
                meta: { title: '角色管理', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'rap', //role-assign-permission首字母
                name: 'Rap',
                component: () => import(/* webpackChunkName: "system" */ '@/view/console/system/role/view/assign-permission'),
                meta: { title: '分配权限', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'employee',
                name: 'Employee',
                component: () => import(/* webpackChunkName: "system" */ '@/view/console/system/employee/view/edit'),
                meta: { title: '员工管理', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'ear', //employee-assign-role
                name: 'Ear',
                component: () => import(/* webpackChunkName: "system" */ '@/view/console/system/employee/view/assign-role'),
                meta: { title: '分配角色', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            // 系统公告--------------------------------------------------------------------------------
            {
                path: 'notice',
                name: 'Notice',
                component: () => import(/* webpackChunkName: "notice" */ '@/view/console/notice/notice/view/edit'),
                meta: { title: '公告管理', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            // 广告管理--------------------------------------------------------------------------------
            {
                path: 'advertisementType',
                name: 'AdvertisementType',
                component: () => import(/* webpackChunkName: "advertisement" */ '@/view/console/advertisement/advertisement-type/view/edit'),
                meta: { title: '广告类型编辑', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'advertisement',
                name: 'Advertisement',
                component: () => import(/* webpackChunkName: "advertisement" */ '@/view/console/advertisement/advertisement/view/edit'),
                meta: { title: '广告编辑', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            // 首页-------------------------------------------------------------------------------------
            // 首页导航栏
            {
                path: 'navbar',
                name: 'Navbar',
                component: () => import(/* webpackChunkName: "homePage" */ '@/view/console/homePage/navbar/view/edit'),
                meta: { title: '导航栏编辑', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'navbarItemOrder',
                name: 'NavbarItemOrder',
                component: () => import(/* webpackChunkName: "homePage" */ '@/view/console/homePage/navbar/view/navbar-item-order'),
                meta: { title: '导航条目排序', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            // 首页导航条目
            {
                path: 'naventry',
                name: 'Naventry',
                component: () => import(/* webpackChunkName: "homePage" */ '@/view/console/homePage/naventry/view/edit'),
                meta: { title: '导航条目编辑', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'sectionOrder',
                name: 'SectionOrder',
                component: () => import(/* webpackChunkName: "homePage" */ '@/view/console/homePage/naventry/view/section-order'),
                meta: { title: '内容版块排序', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            // 首页内容版块
            {
                path: 'section',
                name: 'Section',
                component: () => import(/* webpackChunkName: "homePage" */ '@/view/console/homePage/section/view/edit'),
                meta: { title: '内容版块编辑', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'eco',
                name: 'EditCollectionOrder',
                component: () => import(/* webpackChunkName: "homePage" */ '@/view/console/homePage/section/view/edit-collection-order'),
                meta: { title: '合辑排序', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'esa',
                name: 'EditSectionAdvertisement',
                component: () => import(/* webpackChunkName: "homePage" */ '@/view/console/homePage/section/view/edit-section-advertisement'),
                meta: { title: '编辑内容版块广告', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'esao',
                name: 'EditSectionAdvertisementOrder',
                component: () => import(/* webpackChunkName: "homePage" */ '@/view/console/homePage/section/view/edit-section-advertisement-order'),
                meta: { title: '内容版块广告排序', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            // 首页合辑
            {
                path: 'collection',
                name: 'Collection',
                component: () => import(/* webpackChunkName: "homePage" */ '@/view/console/homePage/collection/view/edit'),
                meta: { title: '合辑编辑', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'cedi',
                name: 'EditDetailInterface',
                component: () => import(/* webpackChunkName: "homePage" */ '@/view/console/homePage/collection/view/edit-detail-interface'),
                meta: { title: '编辑详情界面', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'ceb',
                name: 'EditBanner',
                component: () => import(/* webpackChunkName: "homePage" */ '@/view/console/homePage/collection/view/edit-banner'),
                meta: { title: '编辑Banner', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'cepa',
                name: 'EditPlayerAdvertisement',
                component: () => import(/* webpackChunkName: "homePage" */ '@/view/console/homePage/collection/view/edit-player-advertisement'),
                meta: { title: '编辑播放器广告', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'cevl',
                name: 'EditVideoList',
                component: () => import(/* webpackChunkName: "homePage" */ '@/view/console/homePage/collection/view/edit-video-list'),
                meta: { title: '编辑视频列表', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'cepi',
                name: 'EditPlayInterface',
                component: () => import(/* webpackChunkName: "homePage" */ '@/view/console/homePage/collection/view/edit-play-interface'),
                meta: { title: '编辑播放界面', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            // 界面--------------------------------------------------------------------------------------
            {
                path: 'interfaceType',
                name: 'InterfaceType',
                component: () => import(/* webpackChunkName: "interface" */ '@/view/console/interface/interface-type/view/edit'),
                meta: { title: '界面分类', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'interface',
                name: 'Interface',
                component: () => import(/* webpackChunkName: "interface" */ '@/view/console/interface/interface/view/edit'),
                meta: { title: '界面', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            // 视频管理-----------------------------------------------------------------------------------
            // 区域
            {
                path: 'region',
                name: 'Region',
                component: () => import(/* webpackChunkName: "video" */ '@/view/console/video/region/view/edit'),
                meta: { title: '区域', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            // 视频分类
            {
                path: 'category',
                name: 'Category',
                component: () => import(/* webpackChunkName: "video" */ '@/view/console/video/category/view/edit'),
                meta: { title: '视频分类', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'subCategory',
                name: 'SubCategory',
                component: () => import(/* webpackChunkName: "video" */ '@/view/console/video/category/view/edit-sub-category'),
                meta: { title: '编辑子分类', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            // 发现-----------------------------------------------------------------------------
            //发现导航栏
            {
                path: 'exploreNavbar',
                name: 'ExploreNavbar',
                component: () => import(/* webpackChunkName: "explore" */ '@/view/console/explore/navbar/view/edit'),
                meta: { title: '导航栏编辑', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'exploreNavbarItemOrder',
                name: 'ExploreNavbarItemOrder',
                component: () => import(/* webpackChunkName: "explore" */ '@/view/console/explore/navbar/view/navbar-item-order'),
                meta: { title: '导航条目排序', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            // 发现导航条目
            {
                path: 'exploreNaventry',
                name: 'ExploreNaventry',
                component: () => import(/* webpackChunkName: "explore" */ '@/view/console/explore/naventry/view/edit'),
                meta: { title: '导航条目编辑', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'exploreSectionOrder',
                name: 'ExploreSectionOrder',
                component: () => import(/* webpackChunkName: "explore" */ '@/view/console/explore/naventry/view/section-order'),
                meta: { title: '内容版块排序', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            // 发现内容版块
            {
                path: 'exploreSection',
                name: 'ExploreSection',
                component: () => import(/* webpackChunkName: "explore" */ '@/view/console/explore/section/view/edit'),
                meta: { title: '内容版块编辑', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'eeco',
                name: 'ExploreEditCollectionOrder',
                component: () => import(/* webpackChunkName: "explore" */ '@/view/console/explore/section/view/edit-collection-order'),
                meta: { title: '合辑排序', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'eesa',
                name: 'ExploreEditSectionAdvertisement',
                component: () => import(/* webpackChunkName: "explore" */ '@/view/console/explore/section/view/edit-section-advertisement'),
                meta: { title: '编辑内容版块广告', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'eesao',
                name: 'ExploreEditSectionAdvertisementOrder',
                component: () => import(/* webpackChunkName: "explore" */ '@/view/console/explore/section/view/edit-section-advertisement-order'),
                meta: { title: '内容版块广告排序', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            // 发现合辑
            {
                path: 'exploreCollection',
                name: 'ExploreCollection',
                component: () => import(/* webpackChunkName: "explore" */ '@/view/console/explore/collection/view/edit'),
                meta: { title: '合辑编辑', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'ecedi',
                name: 'ExploreEditDetailInterface',
                component: () => import(/* webpackChunkName: "explore" */ '@/view/console/explore/collection/view/edit-detail-interface'),
                meta: { title: '编辑详情界面', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'eceb',
                name: 'ExploreEditBanner',
                component: () => import(/* webpackChunkName: "explore" */ '@/view/console/explore/collection/view/edit-banner'),
                meta: { title: '编辑Banner', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'ecepa',
                name: 'ExploreEditPlayerAdvertisement',
                component: () => import(/* webpackChunkName: "explore" */ '@/view/console/explore/collection/view/edit-player-advertisement'),
                meta: { title: '编辑播放器广告', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'ecevl',
                name: 'ExploreEditVideoList',
                component: () => import(/* webpackChunkName: "explore" */ '@/view/console/explore/collection/view/edit-video-list'),
                meta: { title: '编辑视频列表', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
            {
                path: 'ecepi',
                name: 'ExploreEditPlayInterface',
                component: () => import(/* webpackChunkName: "explore" */ '@/view/console/explore/collection/view/edit-play-interface'),
                meta: { title: '编辑播放界面', roles: ['ADMINISTRATOR'] },
                hidden: true
            },
        ]
    }
]

export default classRouter