<template>
    <v-layout row justify-center>
        <v-flex d-flex xs12 sm12 md12 xl12>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Role Assignment</h3>
                        <div>This permissions has been assigned to the {{ assignments.display_name }} role.</div>
                    </div>
                    <v-spacer />
                    <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search" />
                </v-card-title>
                 <v-data-table :headers="headers" :items="permissions" :search="search" :loading="loading" class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <v-checkbox v-model="assignments.permissions[props.item.id]"></v-checkbox>
                        <td class="text-xs-right">{{ props.item.name }}</td>
                        <td class="text-xs-right">{{ props.item.display_name }}</td>
                        <td class="text-xs-right">{{ props.item.description }}</td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>

        <v-fab-transition>
            <v-btn color="success" key="edit" dark fab fixed bottom right v-model="fab" @click="">
                <v-icon>save</v-icon>
            </v-btn>
        </v-fab-transition>

    </v-layout>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'RoleAssignment',

        props: {
            roleId: Number,
        } ,

        data() {
            return {
                fab: false,
                search: null,
                loading: true,
                pagination: {},
                headers: [
                    {text: 'Name', value: 'name', align: 'left'},
                    {text: 'Display Name', value: 'display_name'},
                    {text: 'Description', value: 'description'},
                ],
            }
        },

        computed: mapGetters({
            assignments: 'roles/role',
            permissions: 'permissions/permissions',
        }),

        mounted() {
            EventBus.$emit('toggleFab', true);
            this.getPermissions()
            this.getAssignments()
        },

        methods: {
            ...mapActions({
                fetchAssignments: 'roles/fetchRole',
                fetchPermissions: 'permissions/fetchPermissions',
            }),

            getPermissions: function () {
               this.loading = true
                this.fetchPermissions().then(() => {
                    this.loading = false;
                }).catch(() => {
                    this.loading = false;
                });
            },

            getAssignments: function () {
                this.fetchAssignments(this.roleId).then(() => {
                    this.loading = false;
                }).catch(() => {
                    this.loading = false;
                });
            }
        },

    }

</script>