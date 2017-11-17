<template>
    <v-layout row justify-center>
        <role-form></role-form>
        <v-flex d-flex xs12 sm12 md12 xl12>
            <router-view></router-view>
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

        mounted() {
            //
        },

        methods: {
            setActiveClass (link) {
                return this.$route.name === link;
            },
        }
    }
</script>