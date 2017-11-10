<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ action }} Team</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>

                            <v-text-field label="Name" required v-model="team.name" v-bind:class="{ 'input-group--error':  errors.name }"></v-text-field>
                            <div class="input-group__details" style="margin-top:-30px;color:red;" v-if="errors.name">
                                <div class="input-group__messages">
                                    <div class="input-group__error" v-text="errors.name[0]"></div>
                                </div>
                            </div>

                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Display Name" required v-model="team.display_name" v-bind:class="{ 'input-group--error':  errors.display_name }"></v-text-field>
                            <div class="input-group__details" style="margin-top:-30px;color:red;" v-if="errors.display_name">
                                <div class="input-group__messages">
                                    <div class="input-group__error" v-text="errors.display_name[0]"></div>
                                </div>
                            </div>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field multi-line label="Description" required v-model="team.description"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="closeTeamDialog">Close</v-btn>
                <v-btn color="blue darken-1" flat @click.native="submit">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'TeamForm',

        data() {
            return {
                dialog: false,
                mode: "insert",
                errors: [],
            }
        },

        computed: mapGetters({
            team: 'teams/team',
            action: 'teams/action',
        }),

        mounted() {
            EventBus.$on('openTeamForm', this.openForm);
        },

        methods: {
            ...mapActions({
                store: 'teams/store',
                update: 'teams/update',
                getTeam: 'teams/getTeam',
            }),

            openForm: function ( teamId ) {
                if ( teamId != null ) {
                    this.getTeam(teamId).then(() => {
                        this.dialog = true;
                        return
                    })
                }

                this.dialog = true
                return
            },

            closeTeamDialog: function () {
                this.dialog = false
                this.team.id = null
                this.team.name = null
                this.team.display_name = null
                this.team.description = null
            },

            submit: function () {
                // EventBus.$emit('loading', true)

                // if (this.mode == "update")
                // {
                //     this.update({
                //         payload: {
                //             name: this.name,
                //             display_name: this.display_name,
                //             description: this.description,
                //             id: this.id
                //         },
                //         context: this
                //     }).then((response) => {
                //         EventBus.$emit('loading', false)
                //         this.name = null
                //         this.display_name = null
                //         this.description = null
                //         this.dialog = false

                //         EventBus.$emit('refreshTeamTable');
                //     }).catch((error) => {
                //         EventBus.$emit('loading', false)
                //     })
                // }
                // else if (this.mode == "insert")
                // {
                //     this.store({
                //         payload: {
                //             name: this.name,
                //             display_name: this.display_name,
                //             description: this.description
                //         },
                //         context: this
                //     }).then((response) => {
                //         EventBus.$emit('loading', false)
                //         this.name = null
                //         this.display_name = null
                //         this.description = null
                //         this.dialog = false
                //         EventBus.$emit('refreshTeamTable');
                //     }).catch((error) => {
                //         EventBus.$emit('loading', false)
                //     })
                // }
            },

        },


    }

</script>