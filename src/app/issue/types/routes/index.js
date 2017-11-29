const TypeModule = () => import('../components/Type.vue')
const TypeList = () => import('../components/TypeList.vue')


export default [
    {
        path: '/issue',
        component: TypeModule,
        meta: {
            needsAuth: true
        },
        children: [
             {
                path: 'type',
                component: TypeList,
                name: 'type',
                meta: {
                    needsAuth: true
                }
            },

        ]
    },
]