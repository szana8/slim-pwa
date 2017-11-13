<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ action }} Permission</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>

                            <v-text-field label="Name" required v-model="permission.name" v-bind:class="{ 'input-group--error':  errors.name }" />
                            <div class="input-group__details" style="margin-top:-30px;color:red;" v-if="errors.name">
                                <div class="input-group__messages">
                                    <div class="input-group__error" v-text="errors.name[0]"></div>
                                </div>
                            </div>

                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Display Name" required v-model="permission.display_name" v-bind:class="{ 'input-group--error':  errors.display_name }" />
                            <div class="input-group__details" style="margin-top:-30px;color:red;" v-if="errors.display_name">
                                <div class="input-group__messages">
                                    <div class="input-group__error" v-text="errors.display_name[0]"></div>
                                </div>
                            </div>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field multi-line label="Description" required v-model="permission.description" />
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="closePermissionDialog">Close</v-btn>
                <v-btn color="blue darken-1" flat @click.native="submit">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {

        data() {
            return {
                dialog: false,
                mode: "insert",
                errors: [],
            }
        },

        computed: mapGetters({
            action: 'permissions/action',
            permission: 'permissions/permission',
        }),

        mounted() {
            EventBus.$on('openPermissionForm', this.openForm);
        },

        methods: {
            ...mapActions({
                submitPermission: 'permissions/submit',
                getPermission: 'permissions/getPermission',
            }),

            openForm: function ( permission ) {
                if ( permission != null ) {
                    this.getPermission(permission).then(() => {
                        this.dialog = true;
                        return
                    })
                }
                else {
                    this.dialog = true
                    return
                }
            },

            closePermissionDialog: function () {
                this.dialog = false
                this.permission.id = null
                this.permission.name = null
                this.permission.display_name = null
                this.permission.description = null
            },
            
            submit: function () {
                this.submitPermission({
                    payload: {
                        id: this.permission.id,
                        name: this.permission.name,
                        display_name: this.permission.display_name,
                        description: this.permission.description,
                    },
                }).then(() => {
                    this.closePermissionDialog()
                    EventBus.$emit('refreshPermissionTable');
                }).catch(() => {
                    console.log('Error when submit the ' + this.permission.name + ' permission.')
                })
            },
        },
    }

</script>