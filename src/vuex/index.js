import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

/**
 * Import all of the vues modules from the components
 */
import auth from '../app/auth/vuex'
import roles from '../app/admin/roles/vuex'
import teams from '../app/admin/teams/vuex'

/**
 * Set the vuex components to the base vuex store
 * 
 * @type {Object}
 */
export default new Vuex.Store({
    modules: {
        auth: auth,
        roles: roles,
        teams: teams,
    }
})