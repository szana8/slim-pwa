const Permissions = () => import('../components/Permissions.vue')

export default [
    {
        path: '/permissions',
        component: Permissions,
        name: 'permissions',
        meta: {
            needsAuth: true
        }
    }
]