/**
 * Fetch all of the teams from the Slim API and add to the
 * teams state. Return with a new Promise.
 * 
 * @param  {[type]} options.commit [description]
 * @return {[type]}                [description]
 */
export const fetchTeams = ({ commit } ) => {
    return new Promise((resolve, reject) => {
        axios.get('/api/v1/team').then((response) => {
            commit('addTeamsToList', response.data.data)
            resolve()
        }).catch((error) => {
            context.errors = error.response.data.errors
            reject(error)
        })
    })
}

/**
 * Get the givven team data and add it to the team state
 * 
 * @param  {[type]} options.commit [description]
 * @param  {[type]} teamId         [description]
 * @return {[type]}                [description]
 */
export const getTeam = ( { commit }, teamId ) => {
    return new Promise((resolve, reject) => {
        axios.get('/api/v1/team/' + teamId).then((response) => {
            commit('addTeamToState', response.data.data)
            resolve()
        });
    }).catch((error) => {
        context.errors = error.response.data.errors
        reject(error)
    })
}

/**
 * Insert or update the givven team data
 * @param  {[type]} options.dispatch [description]
 * @param  {[type]} payload          [description]
 * @return {[type]}                  [description]
 */
export const submit = ({ dispatch }, { payload, context }) => {
    return new Promise((resolve, reject) => {
         if (payload.id != null) {
            dispatch('update', { payload, context }).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            });
        }
        else {
            dispatch('store', { payload, context } ).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            });
        }
    })
}

/**
 * Store the team data
 * 
 * @param  {[type]} options.dispatch [description]
 * @param  {[type]} options.state    [description]
 * @return {[type]}                  [description]
 */
export const store = ({ dispatch }, { payload, context }) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/team', payload ).then((response) => {
            resolve(response)
        }).catch((error) => {
            context.errors = error.response.data.errors
            reject(error)
        })
    })
}

/**
 * Update the givven team data
 * 
 * @param  {[type]} options.dispatch [description]
 * @param  {[type]} payload          [description]
 * @return {[type]}                  [description]
 */
export const update = ( { dispatch }, { payload, context } ) => {
    return new Promise((resolve, reject) => {
        axios.put('/api/v1/team/' + payload.id, payload).then((response) => {
            resolve(response)
        }).catch((error) => {
            context.errors = error.response.data.errors
            reject(error)
        })
    })
}

/**
 * Destroy the givven team
 * 
 * @param  {[type]} options.dispatch [description]
 * @param  {[type]} teamId           [description]
 * @return {[type]}                  [description]
 */
export const destroy = ({ dispatch }, teamId) => {
    return new Promise((resolve, reject) => {
        axios.delete('/api/v1/team/' + teamId).then((response) => {
            resolve(response)
        }).catch((error) => {
            context.errors = error.response.data.errors
            reject(error)
        })
    })
}