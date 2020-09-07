import { AppMain, Navbar, Sidebar } from '@/components'

const contentReviewRouter = {
    path: '/console/lvm',
    components: {
        default: AppMain,
        navbar: Navbar,
        sidebar: Sidebar
    },
    meta: { title: '内容审核', roles: ['ADMINISTRATOR'], id: 19, icon: 'content-review', sort: 7 },
    children: [
        {
            path: '/console/lvm',
            component: () => import(/* webpackChunkName: "contentReview" */ '@/view/console/content-review/long-video-m'),
            name: 'ConsoleLvm',
            meta: { title: '长视频管理', roles: ['ADMINISTRATOR'], id: 20 }
        },
        {
            path: '/console/lvr',
            component: () => import(/* webpackChunkName: "contentReview" */ '@/view/console/content-review/long-video-r'),
            name: 'ConsoleLvr',
            meta: { title: '长视频审核', roles: ['ADMINISTRATOR'], id: 21 }
        },
        {
            path: '/console/svm',
            component: () => import(/* webpackChunkName: "contentReview" */ '@/view/console/content-review/short-video-m'),
            name: 'ConsoleSvm',
            meta: { title: '短视频管理', roles: ['ADMINISTRATOR'], id: 22 }
        },
        {
            path: '/console/svr',
            component: () => import(/* webpackChunkName: "contentReview" */ '@/view/console/content-review/short-video-r'),
            name: 'ConsoleSvr',
            meta: { title: '短视频审核', roles: ['ADMINISTRATOR'], id: 23 }
        },
        {
            path: '/console/gm',
            component: () => import(/* webpackChunkName: "contentReview" */ '@/view/console/content-review/gif-m'),
            name: 'ConsoleGm',
            meta: { title: 'GIF动图管理', roles: ['ADMINISTRATOR'], id: 24 }
        },
        {
            path: '/console/gr',
            component: () => import(/* webpackChunkName: "contentReview" */ '@/view/console/content-review/gif-r'),
            name: 'ConsoleGr',
            meta: { title: 'GIF动图审核', roles: ['ADMINISTRATOR'], id: 25 }
        }
    ]
}

export default contentReviewRouter