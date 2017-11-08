const RoleModule = () => import('../components/Roles.vue')
const RoleAssignment = () => import('../components/Assignment.vue')


export default [
    {
        path: '/roles',
        component: RoleModule,
        name: 'roles',
        meta: {
            needsAuth: true
        }
    },
    {
        path: '/roles/assignment/:id',
        component: RoleAssignment,
        name: 'role-assignment',
        meta: {
            needsAuth: true
        }
    },
]