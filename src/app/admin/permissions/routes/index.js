const Permissions = () => import('../components/Permissions.vue')
const PermissionList = () => import('../components/PermissionList.vue')

export default [
    {
        path: '/permissions',
        component: Permissions,
        meta: {
            needsAuth: true
        },
        children: [
            {
                path: '',
                component: PermissionList,
                name: 'permissions',
                meta: {
                    needsAuth: true
                },
            }
        ]
    }
]