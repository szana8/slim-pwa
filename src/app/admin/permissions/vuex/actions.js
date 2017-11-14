/**
 * Fetch all of the teams from the Slim API and add to the
 * teams state. Return with a new Promise.
 * 
 * @param  {[type]} options.commit [description]
 * @return {[type]}                [description]
 */
export const fetchPermissions = ({ commit } ) => {
    return new Promise((resolve, reject) => {
        axios.get('permissions').then((response) => {
            commit('addPermissionsToList', response.data.data)
            resolve()
        }).catch((error) => {
            context.errors = error.response.data.errors
            reject(error)
        })
    })
}

/**
 * Get the givven permission data and add it to the permission state
 * 
 * @param  {[type]} options.commit       [description]
 * @param  {[type]} permissionId         [description]
 * @return {[type]}                      [description]
 */
export const getPermission = ( { commit }, permissionId ) => {
    return new Promise((resolve, reject) => {
        axios.get('permissions/' + permissionId).then((response) => {
            commit('addPermissionToState', response.data.data)
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
 * Store the permission data
 * 
 * @param  {[type]} options.dispatch [description]
 * @param  {[type]} options.state    [description]
 * @return {[type]}                  [description]
 */
export const store = ({ dispatch }, { payload, context }) => {
    return new Promise((resolve, reject) => {
        axios.post('permissions', payload).then((response) => {
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
        axios.put('permissions/' + payload.id, payload).then((response) => {
            resolve(response)
        }).catch((error) => {
            //context.errors = error.response.data.errors
            reject(error)
        })
    })
}

/**
 * Destroy the givven permission
 * 
 * @param  {[type]} options.dispatch [description]
 * @param  {[type]} teamId           [description]
 * @return {[type]}                  [description]
 */
export const destroy = ({ dispatch }, permission) => {
    console.log(permission)
    return new Promise((resolve, reject) => {
        axios.delete('permissions/' + permission).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}