/* 自动构建 */
const modulesFiles = require.context('.', false, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {

    if (modulePath === './index.js') return modules

    modules.push.call(modules, modulesFiles(modulePath).default)

    return modules
}, [])

export default modules.sort((a, b) => a.meta.sort ? a.meta.sort - b.meta.sort : -1)