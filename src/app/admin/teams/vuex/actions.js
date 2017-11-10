import { isEmpty } from 'lodash'

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
        });
    }).catch((error) => {
        context.errors = error.response.data.errors
        reject(error)
    })
}

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

export const store = ({ dispatch }, { payload, context }) => {

    return new Promise((resolve, reject) => {
        axios.post('/api/v1/team', payload).then((response) => {
            resolve(response)
        }).catch((error) => {
            context.errors = error.response.data.errors
            reject(error)
        })
    })

}

export const update = ({ dispatch }, { payload, context }) => {

    return new Promise((resolve, reject) => {
        axios.put('/api/v1/team/' + payload.id, payload).then((response) => {
            resolve(response)
        }).catch((error) => {
            context.errors = error.response.data.errors
            reject(error)
        })
    })

}

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