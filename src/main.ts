import {createApp} from 'vue'
import {createRouter, createWebHashHistory, RouterOptions, RouterHistory} from "vue-router";
import './style.css'
import App from './App.vue'

const history: RouterHistory = createWebHashHistory()
const routerOptions: RouterOptions = {
    history,
    routes: [
        {
            path: '/',
            alias: '/home',
            name: 'Home',
            component: () => import('./views/Home.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('./views/404.vue')
        }
    ]
}
const router = createRouter(routerOptions)
const app = createApp(App)
app.use(router)

app.mount('#app')
