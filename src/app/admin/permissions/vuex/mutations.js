/**
 * Add all of the permissions to the state object
 * 
 * @param  {[type]} state       [description]
 * @param  {[type]} permissions [description]
 * @return {[type]}             [description]
 */
export const addPermissionsToList = (state, permissions) => {
    state.permissions = permissions
}

/**
 * Add the permission to the state object
 * 
 * @param  {[type]} state [description]
 * @param  {[type]} permission  [description]
 * @return {[type]}       [description]
 */
export const addPermissionToState = (state, permission) => {
    state.permission = permission
}