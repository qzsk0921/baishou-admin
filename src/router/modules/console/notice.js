import { AppMain, Navbar, Sidebar } from '@/components'

const noticeRouter = {
    path: '/console/notice',
    components: {
        default: AppMain,
        navbar: Navbar,
        sidebar: Sidebar
    },
    meta: { title: '系统公告', roles: ['ADMINISTRATOR'], id: 10, icon: 'notice', sort: 5 },
    children: [
        {
            path: '/console/notice',
            component: () => import(/* webpackChunkName: "notice" */ '@/view/console/notice/notice'),
            name: 'ConsoleNotice',
            meta: { title: '公告管理', roles: ['ADMINISTRATOR'], id: 11 }
        },
    ]
}

export default noticeRouter