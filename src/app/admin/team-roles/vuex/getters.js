import uniq from 'lodash/uniq'

/**
 * Return the roles array from the state
 * 
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export const teamRoles = (state) => {
    //return uniq(state.teamRolesList.map(p => p.name))
    return state.teamRolesList
}

/**
 * Return the roles array from the state
 * 
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export const getTeams = (state) => {

    return state.teamList
}