<template>
    <div id="app">
        <v-app>
            <navigation-drawer v-if="user.authenticated"></navigation-drawer>
            <navigation></navigation>
            <loader></loader>

            <main>
                <v-content>
                    <v-container fluid grid-list-md>
                        <v-layout row wrap justify-center align-center>
                            <router-view></router-view>
                        </v-layout>
                    </v-container>
                </v-content>
            </main>

            <!-- <v-footer></v-footer> -->

        </v-app>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import loader from './components/Loader'
    import navigation from './components/Navigation'
    import NavigationDrawer from './components/NavigationDrawer'
    
    export default {
        name: 'app',

        components: {
            loader,
            navigation,
            NavigationDrawer,
        },

        computed: mapGetters({
            user: 'auth/user'
        }),
    }
</script>