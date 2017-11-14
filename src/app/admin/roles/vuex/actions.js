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
        axios.get('roles').then((response) => {
            commit('addRolesToList', response.data.data)
            resolve()
        });
    }).catch((error) => {
        context.errors = error.response.data.errors
        reject(error)
    })
}

/**
 * [description]
 * @param  {[type]} options.commit [description]
 * @param  {[type]} role           [description]
 * @return {[type]}                [description]
 */
export const fetchRole = ({ commit }, role) => {
    return new Promise((resolve, reject) => {
        axios.get('roles/' + role).then((response) => {
            commit('addRoleToList', response.data.data)
            resolve()
        });
    }).catch((error) => {
        context.errors = error.response.data.errors
        reject(error)
    })
}

/**
 * Insert or update the givven permission data
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
            dispatch('store', { payload, context }).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            });
        }
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
        axios.post('roles', payload).then((response) => {
            resolve(response)
        }).catch((error) => {
            context.errors = error.response.data.errors
            reject(error)
        })
    })
}

/**
 * Update the givven permission data
 * 
 * @param  {[type]} options.dispatch [description]
 * @param  {[type]} payload          [description]
 * @return {[type]}                  [description]
 */
export const update = ({ dispatch }, { payload, context }) => {
    return new Promise((resolve, reject) => {
        axios.put('roles/' + payload.id, payload).then((response) => {
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
        axios.delete('roles/' + payload.id).then((response) => {
            resolve(response)
        }).catch((error) => {
            context.errors = error.response.data.errors
            reject(error)
        })
    })
}