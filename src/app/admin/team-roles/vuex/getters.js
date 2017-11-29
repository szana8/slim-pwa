import uniq from 'lodash/uniq'

/**
 * Return the roles array from the state
 * 
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export const teamRoles = (state) => {
    return state.teamRolesList
}

/**
 * Return the roles array from the state
 * 
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export const getTeams = (state) => {
    return state.role
}

export const getUsers = (state) => {
    
}