<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                switchNone: true,
                switchPriceDescrease: false,
                switchPriceInscrease: false
            };
        },
        mounted() {
            if (!this.$route.query.price || this.$route.query.price !== 'desc' || this.$route.query.price !== 'asc') {
                this.switchNone = true
            }
            if (this.$route.query.price && this.$route.query.price == 'desc') {
                this.switchPriceDescrease = true
            }
            if (this.$route.query.price && this.$route.query.price == 'asc') {
                this.switchPriceInscrease = true
            }
        },
        computed: {
            ...mapGetters({
                progressLinear: 'app/progressLinear',
                orderPrice: 'filter/orderPrice',
                query: 'filter/queryParams'
            })
        },
        watch: {
            switchNone() {
                if (this.switchNone) {
                    // Of other switches
                    this.switchPriceDescrease = false;
                    this.switchPriceInscrease = false;
                    // Reset price order
                    this.$store.commit('filter/SET_ORDER_PRICE', '')
                    // Reset page
                    this.$store.commit('filter/SET_PAGE', 1)
                    // Redirect
                    this.$router.push({name: 'home', query: this.query.object})
                }
                if (!this.switchNone && !this.switchPriceDescrease && !this.switchPriceInscrease) {
                    this.switchNone = true;
                }
            },
            switchPriceDescrease() {
                if (this.switchPriceDescrease) {
                    this.switchNone = false;
                    this.switchPriceInscrease = false;

                    // Update orderPrice
                    this.$store.commit('filter/SET_ORDER_PRICE', 'desc');
                    // Reset page
                    this.$store.commit('filter/SET_PAGE', 1)
                    // Redirect
                    this.$router.push({name: 'home', query: this.query.object})
                }
                if (!this.switchPriceDescrease && !this.switchPriceInscrease) {
                    this.switchNone = true;
                }
            },
            switchPriceInscrease() {
                if (this.switchPriceInscrease) {
                    this.switchPriceDescrease = false;
                    this.switchNone = false;
                    // Update orderPrice
                    this.$store.commit('filter/SET_ORDER_PRICE', 'asc');
                    // Reset page
                    this.$store.commit('filter/SET_PAGE', 1)
                    // Redirect
                    this.$router.push({name: 'home', query: this.query.object})
                }
                if (!this.switchPriceDescrease && !this.switchPriceInscrease) {
                    this.switchNone = true;
                }
            },
            $route() {
                if (!this.$route.query.price || (this.$route.query.price !== 'desc' && this.$route.query.price !== 'asc')) {
                    this.switchNone = true
                }
                if (this.$route.query.price && this.$route.query.price == 'desc') {
                    this.switchPriceDescrease = true
                }
                if (this.$route.query.price && this.$route.query.price == 'asc') {
                    this.switchPriceInscrease = true
                }
            }
        }
    };
</script>

<template>
    <v-layout row wrap class="filter pa-2 pl-3 text-xs-center">
        <v-flex xs12 :class="$vuetify.breakpoint.sm ? 'ml-1' : 'ml-5'">
            <v-switch
            color="black"
            hide-details
            v-model="switchNone"
            label="NONE"
            class="mt-1"
            :disabled="switchNone || progressLinear"></v-switch>

            <v-switch
            color="black"
            hide-details
            v-model="switchPriceDescrease"
            label="PRICE DESCREASE"
            class="mt-1"
            :disabled="switchPriceDescrease || progressLinear"></v-switch>

            <v-switch
            color="black"
            hide-details
            v-model="switchPriceInscrease"
            label="PRICE INCREASE"
            class="mt-1"
            :disabled="switchPriceInscrease || progressLinear"></v-switch>
        </v-flex>
    </v-layout>
</template>

<style>
</style>
