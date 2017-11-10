/**
 * Add all of the teams to the state object
 * 
 * @param  {[type]} state [description]
 * @param  {[type]} teams [description]
 * @return {[type]}       [description]
 */
export const addTeamsToList = (state, teams) => {
    state.teams = teams
}

/**
 * Add the team to the state object
 * 
 * @param  {[type]} state [description]
 * @param  {[type]} team  [description]
 * @return {[type]}       [description]
 */
export const addTeamToState = (state, team) => {
    state.team = team
}