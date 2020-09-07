import { AppMain, Navbar, Sidebar } from '@/components'

const exploreRouter = {
    path: '/console/explore-navbar',
    components: {
        default: AppMain,
        navbar: Navbar,
        sidebar: Sidebar
    },
    meta: { title: '发现', roles: ['ADMINISTRATOR'], id: 35, icon: 'explore', sort: 9 },
    children: [
        {
            path: '/console/explore-navbar',
            component: () => import(/* webpackChunkName: "explore" */ '@/view/console/explore/navbar'),
            name: 'ConsoleExploreNavbar',
            meta: { title: '导航栏', roles: ['ADMINISTRATOR'], id: 36 }
        },
        {
            path: '/console/explore-naventry',
            component: () => import(/* webpackChunkName: "explore" */ '@/view/console/explore/naventry'),
            name: 'ConsoleExploreNaventry',
            meta: { title: '导航条目', roles: ['ADMINISTRATOR'], id: 37 }
        },
        {
            path: '/console/explore-section',
            component: () => import(/* webpackChunkName: "explore" */ '@/view/console/explore/section'),
            name: 'ConsoleExploreSection',
            meta: { title: '内容版块', roles: ['ADMINISTRATOR'], id: 38 }
        },
        {
            path: '/console/explore-collection',
            component: () => import(/* webpackChunkName: "explore" */ '@/view/console/explore/collection'),
            name: 'ConsoleExploreCollection',
            meta: { title: '合辑', roles: ['ADMINISTRATOR'], id: 39 }
        }
    ]
}

export default exploreRouter