import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/font-awesome.min.css'
import 'element-ui/lib/theme-chalk/index.css';
import BMap from 'vue-baidu-map'
import vueJsonp from 'vue-jsonp'
Vue.use(vueJsonp)
Vue.use(BMap, {
    ak: 'ZMhYvyVM8QNq6LEK1Y8XttUAAfelO7Ik'
})
import Function from './function'
import layer from 'vue-layer'
import qs from 'qs';
Vue.prototype.$qs = qs;
Vue.prototype.$layer = layer(Vue);
Vue.prototype.$Func = Function
import ElementUI from 'element-ui';
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')