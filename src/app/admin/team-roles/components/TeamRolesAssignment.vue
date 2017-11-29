<template>
    <v-layout row wrap class="mb-5">
        <v-flex d-flex xs12 sm12 md12 xl12>
            <v-card >
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Teams</h3>
                    </div>
                </v-card-title>
                 <v-data-table select-all v-model="assignments.teams" :headers="headers" item-key="id" :items="teams" :search="search" :loading="loading" class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <v-checkbox hide-detils primary v-model="props.selected"></v-checkbox>
                        <td>{{ props.item.name }}</td>
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
                fab: false,
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
            assignments: 'teamRoles/getTeams',
            teams: 'teams/teams',
        }),

        mounted () {
            this.getTeams()
            this.getRolesTeam()
        },

        methods: {
             ...mapActions({
                fetchTeams: 'teams/fetchTeams',
                fetchRolesTeam: 'teamRoles/fetchTeams',
            }),

            getTeams: function () {
                this.fetchTeams().then(() => {
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },

            getRolesTeam: function () {
                this.fetchRolesTeam({
                    userId: this.userId, 
                    roleId: this.roleId
                }).then(() => {
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },

        }
    }

</script>