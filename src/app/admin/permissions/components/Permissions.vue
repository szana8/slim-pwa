<template>
    <v-layout row wrap>
        <permission-form></permission-form>
        <v-flex d-flex xs12 sm12 md12 xl12>
            <router-view />
            <v-fab-transition>
                <v-btn color="primary" key="edit" dark fab fixed bottom right v-model="fab" @click="openDialog">
                    <v-icon>add</v-icon>
                </v-btn>
            </v-fab-transition>
        </v-flex>
    </v-layout>
</template>

<script>
    const PermissionForm = () => import('./PermissionForm')

    export default {
        name: 'Permissions',

        components: {
            PermissionForm,
        },

        data () {
            return {
                tabs: null,
                fab: false,
                search: null,
                hidden: false,
            }
        },

        methods: {
            setActiveClass (link) {
                return this.$route.name === link;
            },

            openDialog () {
                EventBus.$emit('openPermissionForm');
            }
        }
    }
</script>