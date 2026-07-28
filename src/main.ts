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
            path: '/projects',
            name: 'Projects',
            component: () => import('./views/Projects.vue')
        },
        {
            path: '/case-studies',
            name: 'CaseStudies',
            component: () => import('./views/CaseStudies.vue')
        },
        {
            path: '/leadership',
            name: 'Leadership',
            component: () => import('./views/Leadership.vue')
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
