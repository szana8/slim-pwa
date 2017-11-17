/**
 * Add all of the roles to the state object
 * 
 * @param  {[type]} state [description]
 * @param  {[type]} teamRoles [description]
 * @return {[type]}       [description]
 */
export const addTeamRolesToList = (state, teamRoles) => {
    state.teamRolesList = teamRoles
}

/**
 * Add all of the roles to the state object
 * 
 * @param  {[type]} state [description]
 * @param  {[type]} teamRoles [description]
 * @return {[type]}       [description]
 */
export const addTeamsToList = (state, teamList) => {
    state.teamList = teamList
}