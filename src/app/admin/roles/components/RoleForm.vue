<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ action }} Role</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>

                            <v-text-field label="Name" required v-model="name" v-bind:class="{ 'input-group--error':  errors.name }" />
                            <div class="input-group__details" style="margin-top:-30px;color:red;" v-if="errors.name">
                                <div class="input-group__messages">
                                    <div class="input-group__error" v-text="errors.name[0]"/>
                                </div>
                            </div>

                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Display Name" required v-model="display_name" v-bind:class="{ 'input-group--error':  errors.display_name }" />
                            <div class="input-group__details" style="margin-top:-30px;color:red;" v-if="errors.display_name">
                                <div class="input-group__messages">
                                    <div class="input-group__error" v-text="errors.display_name[0]"/>
                                </div>
                            </div>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field multi-line label="Description" required v-model="description" />
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click.native="submit">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: 'RoleForm',

        data() {
            return {
                name: null,
                dialog: false,
                action: 'Create',
                description: null,
                display_name: null,
                errors: [],
            }
        },

        mounted() {
            EventBus.$on('openRolesForm', this.openForm);
        },

        methods: {
            ...mapActions({
                store: 'roles/store',
            }),

            openForm: function () {
                this.dialog = true;
            },

            submit: function () {
                EventBus.$emit('loading', true)
                this.store({
                    payload: {
                        name: this.name,
                        description: this.description,
                        display_name: this.display_name,
                    },
                    context: this
                }).then((response) => {
                    this.resetFields()
                    EventBus.$emit('loading', false)
                    EventBus.$emit('refreshRoleTable');
                }).catch((error) => {
                    EventBus.$emit('loading', false)
                })
            },

            resetFields: function () {
                this.name = null
                this.dialog = false
                this.description = null
                this.display_name = null
            }

        },


    }

</script>