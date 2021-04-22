import SearchController from "./SearchController";
import Vue from '../.vue';
import App from "./pages/App.vue";
import "./style/style.less"

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = true
Vue.use(ElementUI)

new SearchController(3,2);

new Vue({
    render: h => h(App)
}).$mount('#app')
