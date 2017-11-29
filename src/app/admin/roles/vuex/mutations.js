/**
 * Add all of the roles to the state object
 * 
 * @param  {[type]} state [description]
 * @param  {[type]} roles [description]
 * @return {[type]}       [description]
 */
export const addRolesToList = (state, roles) => {
    state.roles = roles
}

/**
 * Add all of the permissions to the state object
 * 
 * @param  {[type]} state       [description]
 * @param  {[type]} permissions [description]
 * @return {[type]}             [description]
 */
export const addPermissionsToList = (state, permissions) => {
    state.permissionList = permissions
}

/**
 * Add all of the roles to the state object
 * 
 * @param  {[type]} state [description]
 * @param  {[type]} roles [description]
 * @return {[type]}       [description]
 */
export const addRoleToList = (state, role) => {
    state.role.id = role.id
    state.role.name = role.name
    state.role.display_name = role.display_name
    state.role.description = role.description
    state.role.permissions = role.permissions.data
}