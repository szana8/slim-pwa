<template>
    <v-data-table
        :headers="headers"
        :items="roles"
        :search="search"
        :loading="loading"
        class="elevation-1"
        :pagination.sync="pagination">
        
        <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.display_name }}</td>
            <td class="text-xs-right">{{ props.item.description }}</td>
            <td class="text-xs-right">
                <v-btn flat icon color="primary" @click="getPermissions(props.item.id)">
                    <v-icon>list</v-icon>
                </v-btn>
                <v-btn flat icon color="primary">
                    <v-icon>edit</v-icon>
                </v-btn>
                <v-btn flat icon color="error" @click="destroy(props.item.id)">
                    <v-icon>delete</v-icon>
                </v-btn>
            </td>
        </template>

    </v-data-table>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {

        props: ['search'],

        data() {
            return {    
                loading: true,
                pagination: {},
                headers: [
                    {text: 'Name', value: 'name', align: 'left'},
                    {text: 'Display Name', value: 'display_name'},
                    {text: 'Description', value: 'description'},
                ]
            }
        },

        watch: {

            pagination: {
                handler() {
                    //
                },
                deep: true
            }
        },

        computed: mapGetters({
            role: 'roles/role',
            roles: 'roles/roles'
        }),

        mounted() {
            this.getData()
        },

        methods: {

            ...mapActions({

                destroy: 'roles/destroy',
                fetchRoles: 'roles/fetchRoles',

            }),

            getData: function () {
                this.fetchRoles().then(() => {
                    this.loading = false;
                    EventBus.$on('refreshRoleTable', this.roles);
                }).catch(() => {
                    this.loading = false;
                });
            },

            destroy: function (role) {

                axios.delete('/api/v1/role/' + role).then((response) => {
                    EventBus.$emit('refreshRoleTable');
                }).catch((error) => {
                    context.errors = error.response.data.errors
                    reject(error)
                })

            },

            getPermissions: function (role) {
                this.$router.replace({ name: 'role-assignment', params: { id: role } })
            }
        }
    }

</script>