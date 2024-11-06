import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/tailwind.css'
import FontAwesomeIcon from './plugins/font-awesome'
import './assets/main.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
