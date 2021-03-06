/**
 * Return the roles array from the state
 * 
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export const roles = (state) => {
    return state.roles
}

/**
 * Return a role object from the state
 * 
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export const role = (state) => {
    return state.role
}

/**
 * Return a permission object from the state
 * 
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export const permissions = (state) => {
    return state.permissions
}

/**
 * [description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export const action = (state) => {
    if ( state.role.id != null )
        state.action = 'Update'
    else
        state.action = 'Insert'

    return state.action
}