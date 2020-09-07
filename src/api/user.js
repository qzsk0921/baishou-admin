import request from '@/util/request'

/**
 * 登录
 * @param {*} data 
 * agentCode 代理商ID(目前给00)
 * loginId 登录账号
 * loginPwd 登录密码
 */
// -------------------------------------(3)去api调试-------------------------------------
export function login(data) {
    return request({
        // url: '/admin/login',
        url: '/user/user-web-account/login',
        method: 'post',
        data
    })
}
/**
 * 获取用户信息
 */
// export function getInfo() {
//     return request({
//         url: '/server/monitor/getUserByLogonInfo',
//         method: 'get'
//     })
// }
export function getInfo() {
    return request({
        url: '/admin/info',
        method: 'get',
        // params: { logonName: 13888888888, password: 123456 }
    })
}
