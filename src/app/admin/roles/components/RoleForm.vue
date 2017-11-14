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

                            <v-text-field label="Name" required v-model="role.name" v-bind:class="{ 'input-group--error':  errors.name }" />
                            <div class="input-group__details" style="margin-top:-30px;color:red;" v-if="errors.name">
                                <div class="input-group__messages">
                                    <div class="input-group__error" v-text="errors.name[0]"/>
                                </div>
                            </div>

                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Display Name" required v-model="role.display_name" v-bind:class="{ 'input-group--error':  errors.display_name }" />
                            <div class="input-group__details" style="margin-top:-30px;color:red;" v-if="errors.display_name">
                                <div class="input-group__messages">
                                    <div class="input-group__error" v-text="errors.display_name[0]"/>
                                </div>
                            </div>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field multi-line label="Description" required v-model="role.description" />
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
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'RoleForm',

        data() {
            return {
                dialog: false,
                mode: "insert",
                errors: [],
            }
        },

        computed: mapGetters({
            role: 'roles/role',
            action: 'roles/action',
        }),

        mounted() {
            EventBus.$on('openRolesForm', this.openForm);
        },

        methods: {
            ...mapActions({
                submitRole: 'roles/submit',
                fetchRole: 'roles/fetchRole',
            }),

            openForm: function (role) {
                if ( role != null ) {
                    this.fetchRole(role).then(() => {
                        this.dialog = true;
                        return
                    })
                }
                else {
                    this.dialog = true
                    return
                }
            },

            submit: function () {
                this.submitRole({
                    payload: {
                        id: this.role.id,
                        name: this.role.name,
                        display_name: this.role.display_name,
                        description: this.role.description,
                    },
                }).then(() => {
                    this.resetFields()
                    EventBus.$emit('refreshRoleTable');
                }).catch(() => {
                    console.log('Error when submit the ' + this.role.name + ' role.')
                })
            },

            resetFields: function () {
                this.dialog = false
                this.role.name = null
                this.role.description = null
                this.role.display_name = null
            }

        },


    }

</script>