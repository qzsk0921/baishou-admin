import { AppMain, Navbar, Sidebar } from '@/components'

const independentTaskbarRouter = {
    path: 'console/independentTaskbar',
    components: {
        default: AppMain,
        Navbar: Navbar,
        Sidebar: Sidebar
    },
    meta: { title: '独立任务栏', roles: ['ADMINISTRATOR'], id: 100, icon: 'star', sort: 10 },
    children: [
        {
            path: 'console/independenttb-navbar',
            component: () => import(/* webpackChunkName: "independenttb" */ '@/view/console/independent-taskbar/navbar'),
            name: 'ConsoleIndependenttbNavbar',
            meta: { title: '导航栏', roles: ['ADMINISTRATOR'], id: 101 }
        },
        {
            path: 'console/independenttb-naventry',
            components: () => import(/* webpackChunkName: "independenttb" */ '@/view/console/independent-taskbar/naventry'),
            name: 'ConsoleIndependenttbNaventry',
            meta: { title: '导航条目', roles: ['ADMINISTRATOR'], id: 102 }
        },
        {
            path: 'console/independenttb-section',
            components: () => import(/* webpackChunkName: "independenttb" */ '@/view/console/independent-taskbar/section'),
            name: 'ConsoleIndependenttbSection',
            meta: { title: '内容版块', roles: ['ADMINISTRATOR'], id: 103 }
        },
        {
            path: 'console/independenttb-collection',
            components: () => import(/* webpackChunkName: "independenttb" */ '@/view/console/independent-taskbar/collection'),
            name: 'ConsoleIndependenttbCollection',
            meta: { title: '合辑', roles: ['ADMINISTRATOR'], id: 104 }
        }
    ]
}

export default independentTaskbarRouter