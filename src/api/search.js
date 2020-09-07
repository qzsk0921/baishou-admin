// 过滤查询
import request from '@/util/request'

/**
 * 角色管理-列表(查询用)
 */
function getRoleListAll() {
    return request({
        url: '/user/user-web-role/getRolelist',
        method: 'post',
    })
}

/**
 * 界面-获取所有界面分类
 */
function getInterfaceTypeAll() {
    return request({
        url: '/system/system-interface/getInterfaceSortAll',
        method: 'post',
    })
}

const search = {
    getRoleListAll,
    getInterfaceTypeAll,
}

export default search