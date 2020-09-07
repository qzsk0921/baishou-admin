import { AppMain, Navbar, Sidebar } from '@/components'

const logRouter = {
    path: '/log',
    redirect: '/log/manage',
    name: 'Log',
    components: {
        default: AppMain,
        navbar: Navbar,
        sidebar: Sidebar
    },
    meta: { title: '日志管理', roles: ['ADMINISTRATOR'] },
    children: [
        {
            path: 'manage',
            name: 'LogManage',
            component: () => import('@/view/test'),
            meta: { title: '日志管理', roles: ['ADMINISTRATOR'] }
        }
    ]
}

export default logRouter