import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * Import all of the routes from the components
 */
import { routes as routes } from '../app/index'

/**
 * Use all of the routes which came from the components
 * @type {Router}
 */
const router = new Router({
    mode: 'history',
    routes: routes
})

export default router