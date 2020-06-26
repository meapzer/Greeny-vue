import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import AOS from 'aos'
import "aos/dist/aos.css";

Vue.config.productionTip = false

export const bus = new Vue()

new Vue({
  created() {
    AOS.init({ disable: 'phone', once: true})    
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
