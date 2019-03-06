import Vue from 'vue'
import App from './App'
import HttpRequst from './request/request.js'

Vue.config.productionTip = false

Vue.prototype.$http = HttpRequst

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
