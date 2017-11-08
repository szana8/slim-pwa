<template>
    <div class="loader" v-if="loading"></div>
</template>

<script>

    export default {

        data () {
            return {
                loading: false
            }
        },

        mounted () {
            EventBus.$on('loading', (loadingOrNot) => {
                this.loading = loadingOrNot
            })
        }

    }

</script>