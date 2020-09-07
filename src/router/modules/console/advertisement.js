import { AppMain, Navbar, Sidebar } from '@/components'

const advertisementRouter = {
    path: '/console/advertisementType',
    components: {
        default: AppMain,
        navbar: Navbar,
        sidebar: Sidebar
    },
    meta: { title: '广告管理', roles: ['ADMINISTRATOR'], id: 13, icon: 'advertisement', sort: 2 },
    children: [
        {
            path: '/console/advertisementType',
            component: () => import(/* webpackChunkName: "advertisement" */ '@/view/console/advertisement/advertisement-type'),
            name: 'ConsoleAdvertisementType',
            meta: { title: '广告类型', roles: ['ADMINISTRATOR'], id: 14 }
        },
        {
            path: '/console/advertisement',
            component: () => import(/* webpackChunkName: "advertisement" */ '@/view/console/advertisement/advertisement'),
            name: 'ConsoleAdvertisement',
            meta: { title: '广告', roles: ['ADMINISTRATOR'], id: 15 },
        },
    ]
}

export default advertisementRouter