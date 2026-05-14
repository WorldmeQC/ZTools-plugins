import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persistedstate'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import { createApp } from 'vue'
import { installNuxtCompat } from './nuxt-compat'
import './assets/css/app.css'
import App from './App.vue'
import autoAnimate from '@formkit/auto-animate'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersistedstate)

app.use(pinia)
app.use(FloatingVue)
app.directive('auto-animate', {
  mounted(el, binding) {
    autoAnimate(el, binding.value)
  },
})

installNuxtCompat(app)

if (window.ztools?.setExpendHeight) {
  window.ztools.setExpendHeight(780)
}

app.mount('#app')
