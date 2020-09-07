import Vue from 'vue'
import Console from './console'


const ConsoleConstructor = Vue.extend(Console)

const ConsoleModel = (o = {}) => {
    const vm = new ConsoleConstructor({
        el: document.createElement('div'),
        data: o
    })
    console.log(vm)
    vm.title = o.title //顶部标题
    vm.Tab = o.Tab
    vm.currentRow = o.currentRow
    // paymentDom.successBtn = o.successBtn //支付成功按钮内容
    // paymentDom.errorBtn = o.errorBtn //支付失败按钮内容

    // // 两个事件 用户点击完成成功和支付失败（和实际结果无关）
    // paymentDom.a_success = o.success || null
    // paymentDom.a_error = o.error || null

    document.getElementsByClassName('app-main')[0].appendChild(vm.$el)
}

export default ConsoleModel