<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters({
                imageError: 'app/imageError'
            })
        },
        methods: {
            resetQuery() {
                this.$store.dispatch('filter/resetQueryParams')
            }
        }
    }
</script>

<template>
    <v-layout row wrap class="justify-center mt-2">
        <v-flex xs12 sm6>
            <v-card class="elevation-0">
                <v-card-media
                :src="imageError"
                height="400px"
                ></v-card-media>

                <v-card-title primary-title>
                </v-card-title>

                <v-card-actions class="justify-center">
                    <v-btn
                    @click="resetQuery"
                    router
                    to="/"
                    dark
                    large
                    style="margin-bottom: -110px"
                    color="teal">
                        Back to Home Page
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>



<style>
    .noti {
        position: fixed;
        bottom: 10%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3vw;
        font-weight: 700;
        text-transform: uppercase;
    }
</style>
