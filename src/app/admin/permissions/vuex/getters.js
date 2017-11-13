/**
 * Return the permissions array from the state
 * 
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export const permissions = (state) => {
    return state.permissions
}

/**
 * Return a permission object from the state
 * 
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export const permission = (state) => {
    return state.permission
}

/**
 * [description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export const action = (state) => {
    if ( state.permission.id != null )
        state.action = 'Update'
    else
        state.action = 'Insert'

    return state.action
}