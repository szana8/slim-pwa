<template>
    <v-layout row justify-center class="mb-5">
        <v-flex d-flex xs12 sm12 md12 xl12>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Global Roles</h3>
                        Slim enables you to allocate particular people to specific roles in your project. Roles are used when defining other settings, like notifications and permissions.
                    </div>
                    <v-spacer></v-spacer>
                    <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
                </v-card-title>

                <v-data-table :headers="headers" :items="roles" :search="search" :loading="loading" class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-right">{{ props.item.display_name }}</td>
                        <td class="text-xs-right">{{ props.item.description }}</td>
                        <td class="text-xs-right">
                            <v-btn flat icon color="primary" @click="getPermissions(props.item.id)">
                                <v-icon>list</v-icon>
                            </v-btn>
                            <v-btn flat icon color="primary" @click="editRole(props.item.id)">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn flat icon color="error" @click="destroy(props.item.id)">
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>

        <v-fab-transition>
            <v-btn color="primary" key="edit" dark fab fixed bottom right v-model="fab" @click="openRolesForm">
                <v-icon>add</v-icon>
            </v-btn>
        </v-fab-transition>
    </v-layout>
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
                fab: false,
                headers: [
                    {text: 'Name', value: 'name', align: 'left'},
                    {text: 'Display Name', value: 'display_name'},
                    {text: 'Description', value: 'description'},
                ]
            }
        },

        computed: mapGetters({
            role: 'roles/role',
            roles: 'roles/roles'
        }),

        mounted() {
            this.getData()
            EventBus.$on('refreshRoleTable', this.getData);
            EventBus.$emit('toggleFab', false);
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

            editRole: function (role) {
                EventBus.$emit('openRolesForm', role);
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
            },

            openRolesForm () {
                EventBus.$emit('openRolesForm');
            },
        }
    }

</script>