const Teams = () => import('../components/Teams.vue')
const TeamsList = () => import('../components/TeamList.vue')

export default [
    {
        path: '/teams',
        component: Teams,
        meta: {
            needsAuth: true
        },
        children: [
             {
                path: '',
                component: TeamsList,
                name: 'teams',
                meta: {
                    needsAuth: true
                }
            },
        ]
    }
]