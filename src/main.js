import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.css'
import './assets/css/cursor.css'
import VueKinesis from "vue-kinesis";


const app = createApp(App)
app.use(VueKinesis);


app.mount('#app')
