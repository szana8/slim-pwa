export const TeamRoles = () => import('../components/TeamRoles.vue')
export const TeamRolesList = () => import('../components/TeamRolesList.vue')
export const TeamRolesAssignment = () => import('../components/TeamRolesAssignment.vue')

export default [
    {
        path: '/team-roles',
        component: TeamRoles,
        meta: {
            needsAuth: true
        },
        children: [
            {
                path: '',
                component: TeamRolesList,
                name: 'teamroles',
                meta: {
                    needsAuth: true
                }
            },
            {
                path: ':userId/edit/:roleId',
                component: TeamRolesAssignment,
                name: 'teamroles.assignment',
                props: (route) => {
                    return {
                        userId: parseInt(route.params.userId),
                        roleId: parseInt(route.params.roleId),
                    }
                },
                meta: {
                    needsAuth: true
                }
            }
        ],
    }
]