import request from '@/util/request'
/**
 * 合辑-获取任务栏列表
 */
export function getTaskbarList(target) {
    return request({
        url: '/system/system-collection/taskBarList',
        method: 'post',
        loading: target ? target : null
    })
}