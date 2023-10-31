import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ResultsItem from './components/ResultsItem.vue';

const app = createApp(App);

app.component('results-item', ResultsItem);
app.mount('#app')
