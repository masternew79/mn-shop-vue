<template>
    <v-snackbar
        v-model="snackbar"
        multi-line
        :color="snackbarOptions.color"
        >
        {{ snackbarOptions.message }}
        <v-btn
            dark
            flat
            @click="snackbar = false">
            Close
        </v-btn>
    </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            snackbarOptions: 'app/snackbarOptions',
        }),
        snackbar: {
            get() {
                return this.$store.getters['app/snackbar']
            },
            set(value) {
                this.$store.commit('app/SET_SNACKBAR', value)
            }
        },
    }
}
</script>

<style>

</style>
