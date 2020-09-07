import defaultSetting from '@/setting'

const title = defaultSetting.title ? defaultSetting.title : '白手起家后台管理系统'
export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle}-${title}`
    }
    return `${title}`
}