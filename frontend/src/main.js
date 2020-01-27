import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSession from 'vue-session'
import VueSweetalert2 from 'vue-sweetalert2';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { VuejsDatatableFactory } from 'vuejs-datatable';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VuejsDatatableFactory)
Vue.use(VueSession)
Vue.use(VueSweetalert2);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import 'sweetalert2/dist/sweetalert2.min.css';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
