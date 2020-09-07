import { AppMain, Navbar, Sidebar } from '@/components'

const videoRouter = {
    path: '/console/videoRegion',
    components: {
        default: AppMain,
        navbar: Navbar,
        sidebar: Sidebar
    },
    meta: { title: '视频管理', roles: ['ADMINISTRATOR'], id: 5, icon: 'video', sort: 6 },
    children: [
        {
            path: '/console/videoRegion',
            component: () => import(/* webpackChunkName: "video" */ '@/view/console/video/region'),
            name: 'ConsoleVideoRegion',
            meta: { title: '地区', roles: ['ADMINISTRATOR'], id: 6 }
        },
        {
            path: '/console/videoCategory',
            component: () => import(/* webpackChunkName: "video" */ '@/view/console/video/category'),
            name: 'ConsoleVideoCategory',
            meta: { title: '视频分类', roles: ['ADMINISTRATOR'], id: 7 }
        },
        {
            path: '/console/uploadVideo',
            component: () => import(/* webpackChunkName: "video" */ '@/view/console/video/upload'),
            name: 'ConsoleUploadVideo',
            meta: { title: '上传视频', roles: ['ADMINISTRATOR'], id: 8 }
        },
        {
            path: '/console/releaseVideo',
            component: () => import(/* webpackChunkName: "video" */ '@/view/console/video/release'),
            name: 'ConsoleReleaseVideo',
            meta: { title: '发布视频', roles: ['ADMINISTRATOR'], id: 9 }
        }
    ]
}

export default videoRouter