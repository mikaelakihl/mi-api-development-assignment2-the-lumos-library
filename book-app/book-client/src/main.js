import './styles/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import useAuthStore from './stores/useAuthStore'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)


const auth = useAuthStore()
auth.initialize()

app.mount('#app')

