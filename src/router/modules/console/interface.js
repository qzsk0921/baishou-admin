import { AppMain, Navbar, Sidebar } from '@/components'

const interfaceRouter = {
    path: '/console/interfaceType',
    components: {
        default: AppMain,
        navbar: Navbar,
        sidebar: Sidebar
    },
    meta: { title: '界面模板', roles: ['ADMINISTRATOR'], id: 16, icon: 'interface-template', sort: 4 },
    children: [
        {
            path: '/console/interfaceType',
            component: () => import(/* webpackChunkName: "interface" */ '@/view/console/interface/interface-type'),
            name: 'ConsoleInterfaceType',
            meta: { title: '界面模板分类', roles: ['ADMINISTRATOR'], id: 17 }
        },
        {
            path: '/console/interface',
            component: () => import(/* webpackChunkName: "interface" */ '@/view/console/interface/interface'),
            name: 'ConsoleInterface',
            meta: { title: '界面模板', roles: ['ADMINISTRATOR'], id: 18 },
        },
    ]
}

export default interfaceRouter