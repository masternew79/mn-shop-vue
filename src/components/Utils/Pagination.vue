<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            totalPage: "filter/totalPage",
            progressLinear: "app/progressLinear",
            isError: "app/isError",
            queryParams: 'filter/queryParams',
        }),
        page: {
            get() {
                return this.$store.getters['filter/page']
            },
            set(page) {
                this.$store.commit('filter/SET_PAGE', page)
            }
        }
    },
    watch: {
        page() {
            // Redirect by router
            this.$router.push({name: 'home', query: this.queryParams.object})
        },
    }
};
</script>

<template>
    <v-flex md6 offset-md3
        class="text-xs-center pb-3"
        v-if="totalPage !== 0 && !progressLinear && !isError"
        :class="$vuetify.breakpoint.xs ? 'mb-5' : ''">
        <v-pagination
        color="black white--text"
        v-model="page"
        :length="totalPage"
        small
        circle
        :disabled="progressLinear"
        ></v-pagination>
    </v-flex>
</template>

<style>
</style>
