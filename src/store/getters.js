const getters = {
    sidebar: state => state.app.sidebar,
    permission_routes: state => state.permission.routes,
    token: state => state.user.token,
    roles: state => state.user.roles,
    nickname: state => state.user.nickname,
    menu_id: state => state.permission.currentMenuId
}

export default getters