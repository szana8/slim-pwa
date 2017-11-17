<template>
    <v-layout row justify-center>
        <v-flex d-flex xs12 sm12 md12 xl12>
            <v-card class="mb-5">
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Role Assignment</h3>
                        <div>This permissions has been assigned to the {{ assignments.display_name }} role.</div>
                    </div>
                    <v-spacer />
                    <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search" />
                </v-card-title>
                 <v-data-table select-all v-model="assignments.permissions" :headers="headers" item-key="id" :items="permissions" :search="search" :loading="loading" class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <v-checkbox hide-detils primary v-model="props.selected"></v-checkbox>
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.display_name }}</td>
                        <td class="text-xs-left">{{ props.item.description }}</td>
                    </template>
                    <template slot="no-data">
                        <v-alert :value="true" color="error" icon="warning">
                            Sorry, nothing to display here :(
                        </v-alert>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>

        <v-fab-transition>
            <v-btn color="success" key="edit" dark fab fixed bottom right v-model="fab" @click="update">
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
                list: [],
                perms: [],
                pagination: {
                    //
                },
                headers: [
                    {text: 'Name', value: 'name', align: 'left'},
                    {text: 'Display Name', value: 'display_name', align: 'left'},
                    {text: 'Description', value: 'description', align: 'left'},
                ],
                context: null,
            }
        },

        computed: mapGetters({
            assignments: 'roles/role',
            permissions: 'permissions/permissions',
        }),

        created() {
            this.getPermissions()
            this.getAssignments()
        },

        methods: {
            ...mapActions({
                updateAssignments: 'roles/update',
                fetchAssignments: 'roles/fetchRole',
                fetchPermissions: 'permissions/fetchPermissions',
            }),

            /**
             * [getPermissions description]
             * @return {[type]} [description]
             */
            getPermissions: function () {
               this.loading = true
                this.fetchPermissions().then(() => {
                    this.loading = false;
                }).catch(() => {
                    this.loading = false;
                });
            },

            /**
             * [getAssignments description]
             * @return {[type]} [description]
             */
            getAssignments: function () {
                this.fetchAssignments(this.roleId).then(() => {
                    this.loading = false;
                }).catch(() => {
                    this.loading = false;
                });
            },

            /**
             * [update description]
             * @return {[type]} [description]
             */
            update: function () {
                this.loading = true;
                this.updateAssignments({
                    payload: {
                        id: this.assignments.id,
                        name: this.assignments.name,
                        display_name: this.assignments.display_name,
                        description: this.assignments.description,
                        permissions: this.convertPermissionArray()
                    },
                    context: this.context
                }).then(() => {
                    this.getAssignments
                    this.loading = false;
                }).catch(() => {
                    this.loading = false;
                })
            },

            /**
             * [convertPermissionArray description]
             * @return {[type]} [description]
             */
            convertPermissionArray: function () {
                var permissionArray = []

                this.assignments.permissions.forEach(function(item, key) {
                    permissionArray.push(item.id)
                })

                return permissionArray
            },
        },

    }

</script>