import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

/**
 * Import all of the vues modules from the components
 */
import auth from '../app/auth/vuex'
import roles from '../app/admin/roles/vuex'
import teams from '../app/admin/teams/vuex'
import teamRoles from '../app/admin/team-roles/vuex'
import permissions from '../app/admin/permissions/vuex'

/**
 * Set the vuex components to the base vuex store
 * 
 * @type {Object}
 */
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        auth: auth,
        roles: roles,
        teams: teams,
        teamRoles: teamRoles,
        permissions: permissions,
    }
})