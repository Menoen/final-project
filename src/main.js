import Vue from 'vue'
import App from './App.vue'
import http from '@/api/axios'
import './plugins/element.js'
import router from './router'
import store from './store'
import less from 'less'
import './assets/css/global.css'
import './assets/css/normalize.css'
import VueCookie from 'vue-cookies'
import '@fortawesome/fontawesome-free/css/all.min.css'
import FormMaking from 'form-making'
import 'form-making/dist/FormMaking.css'

Vue.use(FormMaking, {lang: 'en-US'})

Vue.config.productionTip = false
Vue.prototype.$axios = http
Vue.use(less)
Vue.use(VueCookie)
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
