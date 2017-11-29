<template>
    <v-layout row justify-center class="mb-5">
        <v-flex d-flex xs12 sm12 md12 xl12>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Issue Types</h3>
                        <div>Your teams can collaborate in Slim applications by breaking down pieces of work into issues. Issues can represent tasks, software bugs, feature requests or any other type of project work. Each Slim application comes with default issue types to suit the needs of your projects and teams. Get started with these default issue types or create your own.</div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
                </v-card-title>

                
            </v-card>
        </v-flex>

        <v-fab-transition>
            <v-btn color="primary" key="edit" dark fab fixed bottom right v-model="fab" @click="openRolesForm">
                <v-icon>add</v-icon>
            </v-btn>
        </v-fab-transition>
    </v-layout>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'TypeList',

        data() {
            return { 
                //
            }
        },

        computed: mapGetters({
            //
        }),

        mounted() {
            //
        },

        methods: {
            ...mapActions({
                //
            }),
        },   
    }

</script>