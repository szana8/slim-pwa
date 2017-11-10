<template>
    <v-layout row justify-center>
        <role-form></role-form>

        <v-flex d-flex xs12 sm12 md12 xl12>
            
            <router-view></router-view>

            <!-- Floating action button -->
                <v-fab-transition>
                    <v-btn color="primary" key="edit" dark fab fixed bottom right v-model="fab" @click="openRolesForm">
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-fab-transition>
            <!-- End Floating action button -->
            
        </v-flex>

    </v-layout>
</template>

<script>
    const RoleForm = () => import('./RoleForm')

    export default {
        name: 'RoleModule',

        components: {
            RoleForm,
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
                return this.$route.name === link;
            },

            openRolesForm () {
                EventBus.$emit('openRolesForm');
            }
        }
    }
</script>