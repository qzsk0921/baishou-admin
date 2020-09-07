import { AppMain, Navbar, Sidebar } from '@/components'

const homePageRouter = {
    path: '/console/navbar',
    components: {
        default: AppMain,
        navbar: Navbar,
        sidebar: Sidebar
    },
    meta: { title: '首页', roles: ['ADMINISTRATOR'], id: 30, icon: 'home-page', sort: 3 },
    children: [
        {
            path: '/console/navbar',
            component: () => import(/* webpackChunkName: "homePage" */ '@/view/console/homePage/navbar'),
            name: 'ConsoleNavbar',
            meta: { title: '导航栏', roles: ['ADMINISTRATOR'], id: 31 }
        },
        {
            path: '/console/naventry',
            component: () => import(/* webpackChunkName: "homePage" */ '@/view/console/homePage/naventry'),
            name: 'ConsoleNaventry',
            meta: { title: '导航条目', roles: ['ADMINISTRATOR'], id: 30 },
        },
        {
            path: '/console/section',
            component: () => import(/* webpackChunkName: "homePage" */ '@/view/console/homePage/section'),
            name: 'ConsoleSection',
            meta: { title: '内容版块', roles: ['ADMINISTRATOR'], id: 33 },
        },
        {
            path: '/console/collection',
            component: () => import(/* webpackChunkName: "homePage" */ '@/view/console/homePage/collection'),
            name: 'ConsoleCollection',
            meta: { title: '合辑', roles: ['ADMINISTRATOR'], id: 34 },
        }
    ]
}

export default homePageRouter