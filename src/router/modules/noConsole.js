import { AppMain, Navbar, Sidebar } from '@/components'

const noConsoleRouter = {
    path: '/console',
    redirect: '/console/nothing',
    components: {
        default: AppMain,
        navbar: Navbar,
        sidebar: Sidebar
    },
    meta: { title: '无权限', roles: ['ADMINISTRATOR'], id: -1 },
    hidden: true,
    children: [
        {
            path: 'nothing',
            component: { render: h => h("p", "对不起,您无任何权限") },
            name: 'ConsoleNothing',
        }
    ]
}

export default noConsoleRouter

