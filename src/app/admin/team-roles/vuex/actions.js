/**
 * Fetch all of the roles from the Slim API and add to the
 * roles state. Return with a new Promise.
 * 
 * @param  {[type]} options.commit [description]
 * @return {[type]}                [description]
 */
export const fetchTeamRoles = ({ commit } ) => {
    return new Promise((resolve, reject) => {
        axios.get('team-roles').then((response) => {
            commit('addTeamRolesToList', response.data.data)
            resolve()
        });
    }).catch((error) => {
        context.errors = error.response.data.errors
        reject(error)
    })
}

/**
 * Fetch all of the roles from the Slim API and add to the
 * roles state. Return with a new Promise.
 * 
 * @param  {[type]} options.commit [description]
 * @return {[type]}                [description]
 */
export const fetchTeams = ({ commit }, { userId, roleId }) => {
    return new Promise((resolve, reject) => {
        axios.get('team-role/' + userId + '/' + roleId).then((response) => {
            commit('addTeamsToList', response.data.data[0].team.data)
            resolve()
        });
    }).catch((error) => {
        context.errors = error.response.data.errors
        reject(error)
    })
}