import Vue from "vue";
import './plugins/vuetify'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "./registerServiceWorker";
import axios from "axios";
import colors from 'vuetify/es5/util/colors'


Vue.config.productionTip = false;
require('dotenv').config();

Vue.use(Vuetify, {
    theme: {
        primary: colors.blueGrey.darken1,
        secondary: '#819ca9',
        accent: '#29434e'
    }}
);

const token = localStorage.getItem('accessToken');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
