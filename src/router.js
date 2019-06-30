import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import About from './views/About'
import Login from './components/login/index'
import Register from './components/register/index'
import NotFound from './components/404/index';
import store from './store/store'

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return
    }
    next('/')
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return
    }
    next('/login')
};

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/404',
        },
        {
            path: '/404',
            component: NotFound,
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            beforeEnter: ifAuthenticated,

        },
        {
            path: '/account',
            name: 'Account',
            component: About,
            beforeEnter: ifAuthenticated,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: ifNotAuthenticated,
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            beforeEnter: ifNotAuthenticated,
        },
    ],
})
