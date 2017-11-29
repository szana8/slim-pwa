<template>
    <v-layout row wrap class="mb-5">
        <v-flex d-flex xs12 sm12 md12 xl12 v-for="role in teamRoles" :key="role.id">
            <v-card >
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Role name: {{ role.display_name }}</h3>
                        {{ role.description }}
                    </div>
                </v-card-title>

                <v-data-table :headers="headers" :items="role.user.data" :loading="loading" class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-right">{{ props.item.email }}</td>
                        <td class="text-xs-right">
                            <i :key="team.id" v-for="team in role.team.data">{{ team.display_name }}, </i>
                        </td>
                        <td class="text-xs-right">
                            <v-btn flat icon color="primary" @click="editTeams(props.item.id, role.id)">
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
        name: 'TeamRolesList',

        components: {
            //
        },

        data () {
            return {
                search: null,   
                loading: true,
                pagination: {},
                headers: [
                    {text: 'User Name', value: 'name', align: 'left'},
                    {text: 'Email', value: 'display_name'},
                    {text: 'Team Name', value: 'description'},
                    {text: 'Action', value: 'description'},
                ],
            }
        },

        computed: mapGetters({
            teamRoles: 'teamRoles/teamRoles'
        }),

        mounted () {
            this.getData()
        },

        methods: {
            ...mapActions({
                fetchTeamRoles: 'teamRoles/fetchTeamRoles',
            }),

            getData: function () {
                this.fetchTeamRoles().then(() => {
                    this.loading = false;
                }).catch(() => {
                    this.loading = false;
                });
            },

            editTeams: function (userId, roleId) {
                console.log(userId, roleId)
                this.$router.push({
                    name: 'teamroles.assignment', 
                    params: { 
                        userId: userId,
                        roleId: roleId
                    } 
                })
            }
        }
    }

</script>