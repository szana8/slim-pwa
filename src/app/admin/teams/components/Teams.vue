<template>
    <v-layout row wrap>
        <team-form></team-form>
        <v-flex d-flex xs12 sm12 md12 xl12>
            <router-view></router-view>
            <v-fab-transition>
                <v-btn color="primary" key="edit" dark fab fixed bottom right v-model="fab" @click="openDialog">
                    <v-icon>add</v-icon>
                </v-btn>
            </v-fab-transition>
        </v-flex>
    </v-layout>
</template>

<script>
    const TeamForm = () => import('./TeamForm.vue')

    export default {
        components: {
            TeamForm
        },

        data () {
            return {
                fab: false,
                tabs: null,
                search: null,
                hidden: false,
            }
        },

        methods: {
            setActiveClass (link) {
                return this.$route.name === link
            },

            openDialog () {
                EventBus.$emit('openTeamForm')
            }
        },
    }
</script>