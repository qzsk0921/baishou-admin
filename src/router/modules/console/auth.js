import { AppMain, Navbar, Sidebar } from '@/components'
// 1:'系统管理',2:'权限管理',3:'角色管理',4:'员工管理',5:'视频管理',6:'地区',7:'视频分类',8:'上传视频',9:'发布视频',
// 10:'系统公告',11:'公告管理',12:'公告修改',13:'广告管理',14:'广告类型',15:'广告',16:'界面',17:'界面分类',18:'界面',19:'内容审核'
// 20:'长视频审核管理',21:'长视频审核',22:'短视频审核管理',23:'短视频审核',24:'动图审核管理',25:'动图审核',26:'任务栏'
// 27:'任务栏',28:'导航栏样式',29:'导航栏样式'30:'首页',31:'导航栏',32:'导航条目',33:'内容版块',34:'合辑',35:'发现'
// 36:'导航栏',37:'导航条目',38:'内容版块',39:'合辑'
const authRouter = {
    path: '/console',
    redirect: '/console/auth',
    // redirect: 'noRedirect',
    components: {
        default: AppMain,
        navbar: Navbar,
        sidebar: Sidebar
    },
    meta: { title: '系统管理', roles: ['ADMINISTRATOR'], id: 1, icon: 'system', sort: 1 },
    children: [
        {
            path: 'auth',
            component: () => import(/* webpackChunkName: "system" */ '@/view/console/system/auth'),
            name: 'ConsoleAuth',
            meta: { title: '权限管理', roles: ['ADMINISTRATOR'], id: 2 }
        },
        {
            path: 'role',
            // redirect: '/console/role/list',
            component: () => import(/* webpackChunkName: "system" */ '@/view/console/system/role'),
            name: 'ConsoleRole',
            meta: { title: '角色管理', roles: ['ADMINISTRATOR'], id: 3 },
        },
        {
            path: 'employee',
            component: () => import(/* webpackChunkName: "system" */ '@/view/console/system/employee'),
            name: 'ConsoleEmployee',
            meta: { title: '员工管理', roles: ['ADMINISTRATOR'], id: 4 }
        }
    ]
}

export default authRouter