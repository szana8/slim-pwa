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
                :items="items"
                :search="search"
                :loading="loading"
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.display_name }}</td>
                <td class="text-xs-right">{{ props.item.description }}</td>
                <td class="text-xs-right">
                    <v-btn flat icon color="primary" @click="edit(props.item.id)">
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn flat icon color="error" v-on:click="destroy(props.item.id)">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
    </v-card>

</template>

<script>
    import { mapActions } from 'vuex'

    export default {

        props: ['search'],

        data() {
            return {
                teams: [],
                items: [],
                loading: true,
                pagination: {

                },
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
                    this.getDataFromApi()
                        .then(data => {
                            this.items = data.items
                        })
                },
                deep: true
            }
        },

        mounted() {

            this.getData();

            bus.$on('refreshTeamTable', this.getData);

        },

        methods: {

            ...mapActions({

                destroy: 'teams/destroy',

            }),

            getData: function () {

                this.getDataFromApi().then(data => {
                    this.items = data.items
                })

            },

            getDataFromApi: function () {
                this.loading = true
                return new Promise((resolve, reject) => {
                    const {sortBy, descending, page, rowsPerPage} = this.pagination

                    this.getTeams().then(() => {
                        let items = this.teams;
                        const total = items.length

                        if (this.pagination.sortBy) {
                            items = items.sort((a, b) => {
                                const sortA = a[sortBy]
                                const sortB = b[sortBy]

                                if (descending) {
                                    if (sortA < sortB) return 1
                                    if (sortA > sortB) return -1
                                    return 0
                                } else {
                                    if (sortA < sortB) return -1
                                    if (sortA > sortB) return 1
                                    return 0
                                }
                            })
                        }

                        if (rowsPerPage > 0) {
                            items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
                        }

                        setTimeout(() => {
                            this.loading = false
                            resolve({
                                items,
                                total
                            })
                        }, 1000)
                    })


                })
            },

            getTeams: function () {
                return new Promise((resolve, reject) => {
                    axios.get('/api/v1/team').then((response) => {
                        this.teams = response.data.data;
                        resolve()
                    });
                });
            },

            destroy: function (team) {

                axios.delete('/api/v1/team/' + team).then((response) => {
                    bus.$emit('refreshTeamTable');
                }).catch((error) => {
                    context.errors = error.response.data.errors
                    reject(error)
                })

            },

            edit: function (team) {

                axios.get('/api/v1/team/' + team).then((response) => {
                    bus.$emit('openTeamForm', response.data.data);
                }).catch((error) => {
                    context.errors = error.response.data.errors
                    reject(error)
                })

            }
        }
    }

</script>