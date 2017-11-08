import { isEmpty } from 'lodash'

/**
 * Fetch all of the roles from the Slim API and add to the
 * roles state. Return with a new Promise.
 * 
 * @param  {[type]} options.commit [description]
 * @return {[type]}                [description]
 */
export const fetchRoles = ({ commit } ) => {
    return new Promise((resolve, reject) => {
        axios.get('/api/v1/role').then((response) => {
            commit('addRolesToList', response.data.data)
            resolve()
        });
    }).catch((error) => {
        context.errors = error.response.data.errors
        reject(error)
    })
}

/**
 * Send a JSON array of a new Role to the Slim API and
 * return with a new Promise.
 * 
 * @param  {[type]} options.dispatch [description]
 * @param  {[type]} options.payload  [description]
 * @param  {[type]} options.context  [description]
 * @return {[type]}                  [description]
 */
export const store = ({ dispatch }, { payload, context }) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/role', payload).then((response) => {
            resolve(response)
        }).catch((error) => {
            context.errors = error.response.data.errors
            reject(error)
        })
    })
}

/**
 * Destroy an existing Role. Calls the neccessary Slim API to do
 * the action and return a new Promise.
 * 
 * @param  {[type]} options.dispatch [description]
 * @param  {[type]} options.payload  [description]
 * @param  {[type]} options.context  [description]
 * @return {[type]}                  [description]
 */
export const destroy = ({ dispatch }, { payload, context }) => {
    return new Promise((resolve, reject) => {
        axios.delete('/api/v1/role/' + payload.id).then((response) => {
            resolve(response)
        }).catch((error) => {
            context.errors = error.response.data.errors
            reject(error)
        })
    })
}