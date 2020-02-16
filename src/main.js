import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Loading from './components/Loading'



Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.filter('capitalize', (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1)

})
Vue.component('Spinner', Loading)

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        this.$store.dispatch("getWeather");
    },

}).$mount('#app')