<template>
    <v-card class="mb-5">
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Teams</h3>
                Portfolio for Slim allows you to add Slim applications users as team members. You can also work with virtual users that are placeholders to play with what-if scenarios such as, adding a new hire to your team. In your plan you can create new teams and configure them by choosing their scheduling methodology and assigning them tasks. Teams can be plan-specific or shared across plans.
            </div>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
        </v-card-title>

         <v-data-table
                :headers="headers"
                :items="teams"
                :search="search"
                :loading="loading"
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.display_name }}</td>
                <td class="text-xs-right">{{ props.item.description }}</td>
                <td class="text-xs-right">
                    <v-btn flat icon color="primary" @click="editTeam(props.item.id)">
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn flat icon color="error" v-on:click="destroyTeam(props.item.id)">
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
        name: 'TeamList',

        data() {
            return {
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
            teams: 'teams/teams'
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
            EventBus.$on('refreshTeamTable', this.getData);
        },

        methods: {
            ...mapActions({
                destroyTeam: 'teams/destroy',
                fetchTeams: 'teams/fetchTeams',
            }),

            getData: function () {
               this.fetchTeams().then(() => {
                    this.loading = false;
                }).catch(() => {
                    this.loading = false;
                });
            },

            editTeam: function (teamId) {
                EventBus.$emit('openTeamForm', teamId);
            }
        }
    }

</script>