<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Global Roles</h3>
                <div>Slim enables you to allocate particular people to specific roles in your project. Roles are used when defining other settings, like notifications and permissions.</div>
            </div>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
        </v-card-title>

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
    </v-card>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'RoleList',

        data() {
            return { 
                search: null,   
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
            EventBus.$on('refreshRoleTable', this.getData);
        },

        methods: {
            ...mapActions({
                destroy: 'roles/destroy',
                fetchRoles: 'roles/fetchRoles',
            }),

            getData: function () {
                this.fetchRoles().then(() => {
                    this.loading = false;
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

            getPermissions: function (roleId) {
                this.$router.push({
                    name: 'role.assignment', 
                    params: { 
                        roleId: roleId
                    } 
                })
            }
        }
    }

</script>