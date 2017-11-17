<template>
    <v-layout row wrap class="mb-5">
        <v-flex d-flex xs12 sm12 md12 xl12>
            <v-card >
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Teams</h3>
                    </div>
                </v-card-title>

                <v-data-table :headers="headers" :items="teamList" class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-right">{{ props.item.display_name }}</td>
                        <td class="text-xs-right">{{ props.item.description }}</td>
                        <td class="text-xs-right">
                            <v-btn flat icon color="primary" @click="">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>

            </v-card>
        </v-flex>
    </v-layout>   
</template>

<script type="text/javascript">
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'TeamRolesAssignment',

        props: {
            roleId: Number,
            userId: Number,
        },

        components: {
            //
        },

        data () {
            return {
                search: null,   
                loading: true,
                pagination: {},
                headers: [
                    {text: 'Name', value: 'name', align: 'left'},
                    {text: 'Display_name', value: 'display_name'},
                    {text: 'Description', value: 'description'},
                ],
            }
        },

        computed: mapGetters({
            teamList: 'teamRoles/getTeams'
        }),

        mounted () {
            this.getTeams()
        },

        methods: {
             ...mapActions({
                fetchTeams: 'teamRoles/fetchTeams',
            }),

            getTeams: function () {
                this.fetchTeams({
                    userId: this.userId, 
                    roleId: this.roleId
                }).then(() => {
                    this.loading = false;
                }).catch(() => {
                    this.loading = false;
                });
            }
        }
    }

</script>