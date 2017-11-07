<template>
    <div id="app">
        <v-app>
            <navigation></navigation>
            <main>
                <v-container fluid>
                    <router-view></router-view>
                </v-container>
            </main>
        </v-app>
    </div>
</template>

<script>

    import navigation from './components/Navigation'

    export default {

        components: {
            navigation,
        },

        name: 'app'
    }
</script>