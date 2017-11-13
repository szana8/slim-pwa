<template>
    <v-card class="mb-5">
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Permissions</h3>
                Permission schemes allow you to create a set of permissions an apply this set of permissions to any project.<br />
                All permissions within a scheme will apply to all projects that are associated with that scheme.
            </div>
            <v-spacer />
            <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search" />
        </v-card-title>
        <v-data-table :headers="headers" :items="permissions" :search="search" :loading="loading" class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.display_name }}</td>
                <td class="text-xs-right">{{ props.item.description }}</td>
                <td class="text-xs-right">
                    <v-btn flat icon color="primary" @click="edit(props.item.id)">
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
        name: 'PermissionList',

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

        computed: mapGetters({
            permissions: 'permissions/permissions'
        }),

        watch: {
            pagination: {
                handler() {
                    //
                },
                deep: true
            }
        },

        mounted() {
            this.getData();
            EventBus.$on('refreshPermissionTable', this.getData);
        },

        methods: {
            ...mapActions({
                destroyPermission: 'permissions/destroy',
                fetchPermissions: 'permissions/fetchPermissions',
            }),

            getData: function () {
                this.loading = true
                this.fetchPermissions().then(() => {
                    this.loading = false;
                }).catch(() => {
                    this.loading = false;
                });
            },

            destroy: function ( permission ) {
                this.loading = true
                this.destroyPermission(permission).then(() => {
                    EventBus.$emit('refreshPermissionTable');
                }).catch((error) => {
                    console.log(error)
                })
            },
            
            edit: function ( permission ) {
                EventBus.$emit('openPermissionForm', permission);
            }
        }
    }

</script>