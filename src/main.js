import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';
import toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Pinia
const pinia = createPinia()

// Toastification
const toastOptions = {
  timeout: 3500,
  position: "bottom-right",
};

createApp(App)
.use(vuetify)
.use(i18n)
.use(router)
.use(pinia)
.use(toast, toastOptions)
.mount('#app')