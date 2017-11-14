// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Store from './vuex'
import Router from './router'
import Vuetify from 'vuetify'
import LocalForage from 'localforage'


/**
 * Initialize the localstorage to store the token and all
 * of the neccessary object.
 */
LocalForage.config({
    driver: LocalForage.LOCALSTORAGE,
    storeName: 'slim'
})

const api_version = 'v1'

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
window.axios = require('axios')
window.axios.defaults.baseURL = 'http://slim-api.dev:88/api/' + api_version + '/'
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/**
 * Enable/disable production tip.
 * @type {Boolean}
 */
Vue.config.productionTip = false

/**
 * Create a new Event Bus to fire and emit events between 
 * VUE components.
 * 
 * @type {Vue}
 */
window.EventBus = new Vue()

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
Vue.use(Vuetify)

/**
 * If the token exist in the local machine and not expired we try to
 * fetch the user with the token. If the authentication is fine
 * we move on to the home screen, else move to the login
 * screen.
 * 
 * @param  {Function} 'auth/setToken').then(() [description]
 * @return {[type]}                            [description]
 */
Store.dispatch('auth/setToken').then(() => {
    Store.dispatch('auth/fetchUser').catch(() => {
        Store.dispatch('auth/clearAuth')
        Router.replace({ name: 'login' })
    })
}).catch(() => {
    Store.dispatch('auth/clearAuth')
})


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
new Vue({
    el: '#app',
    store: Store,
    router: Router,
    template: '<App/>',
    components: {App}
})
