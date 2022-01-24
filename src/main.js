import { createApp } from 'vue'
import VueKinesis from "vue-kinesis"
import { createRouter, createWebHistory } from "vue-router"
import './assets/css/index.css'
import './assets/css/cursor.css'

import App from './App.vue'
import Home from './views/Home.vue'
import Now from './views/Now.vue'
import View404 from './views/404.vue'

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      { path: '/now', component: Now },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


const app = createApp(App)

app.use(router)
app.use(VueKinesis);
app.mount('#app')
