const RoleModule = () => import('../components/Roles.vue')
const RoleList = () => import('../components/RoleList.vue')
const RoleAssignment = () => import('../components/RoleAssignment.vue')


export default [
    {
        path: '/roles',
        component: RoleModule,
        meta: {
            needsAuth: true
        },
        children: [
             {
                path: '',
                component: RoleList,
                name: 'roles',
                meta: {
                    needsAuth: true
                }
            },
            {
                path: 'assignment/:roleId',
                component: RoleAssignment,
                name: 'role.assignment',
                props: (route) => {
                    return {
                        roleId: parseInt(route.params.roleId),
                    }
                },
                meta: {
                    needsAuth: true
                },
            },
        ]
    },
]