import { AppMain, Navbar, Sidebar } from '@/components'

const taskbarRouter = {
    path: '/console/taskbar',
    components: {
        default: AppMain,
        navbar: Navbar,
        sidebar: Sidebar
    },
    meta: { title: '任务栏', roles: ['ADMINISTRATOR'], id: 26, icon: 'task', sort: 8 },
    children: [
        {
            path: '/console/taskbar',
            component: () => import(/* webpackChunkName: "taskbar" */ '@/view/console/taskbar/taskbar'),
            name: 'ConsoleTaskbar',
            meta: { title: '任务栏', roles: ['ADMINISTRATOR'], id: 27 }
        }
    ]
}

export default taskbarRouter