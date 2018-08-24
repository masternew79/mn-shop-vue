<script>
    import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
                switchAll: true,
                switchUnder5M: false,
                switchFrom5mTo25M: false,
                switchOver25M: false,
            };
        },
        computed: {
            ...mapGetters({
                query: 'filter/queryParams',
                min: 'filter/min',
                max: 'filter/max',
                progressLinear: 'app/progressLinear'
            })
        },
        // Change status when reload page
        mounted() {
            if (this.$route.query.max && !this.$route.query.min) {
                this.switchUnder5M = true
            }
            if (!this.$route.query.max && this.$route.query.min) {
                this.switchOver25M = true
            }
            if (this.$route.query.max && this.$route.query.min) {
                this.switchFrom5mTo25M = true
            }
            if (!this.$route.query.max && !this.$route.query.min) {
                this.switchAll = true
            }
        },
        watch: {
            switchAll() {
                if (this.switchAll) {
                    // Off all another switches
                    this.switchUnder5M = false;
                    this.switchFrom5mTo25M = false;
                    this.switchOver25M = false;
                    // Reset min, max price
                    this.$store.commit('filter/SET_MIN', 0);
                    this.$store.commit('filter/SET_MAX', 0);
                    // Reset page
                    this.$store.commit('filter/SET_PAGE', 1)
                    // Redirect
                    this.$router.push({name: 'home', query: this.query.object})
                }
            },
            switchUnder5M() {
                if (this.switchUnder5M) {
                    // Off all another switches
                    this.switchAll = false;
                    this.switchFrom5mTo25M = false;
                    this.switchOver25M = false;
                    // Reset min
                    this.$store.commit('filter/SET_MIN', 0)
                    // Update max
                    this.$store.commit('filter/SET_MAX', 5000000);
                    // Reset page
                    this.$store.commit('filter/SET_PAGE', 1)
                    // Redirect
                    this.$router.push({name: 'home', query: this.query.object})
                }
                if (!this.switchUnder5M && !this.switchFrom5mTo25M && !this.switchOver25M) {
                    this.switchAll = true;
                }

            },
            switchFrom5mTo25M() {
                if (this.switchFrom5mTo25M) {
                    // Off other switches
                    this.switchAll = false;
                    this.switchUnder5M = false;
                    this.switchOver25M = false;
                    // Update min
                    this.$store.commit('filter/SET_MIN', 5000000)
                    // Update max
                    this.$store.commit('filter/SET_MAX', 25000000)
                    // Reset page
                    this.$store.commit('filter/SET_PAGE', 1)
                    // Redirect
                    this.$router.push({name: 'home', query: this.query.object})
                }
                if (!this.switchUnder5M && !this.switchFrom5mTo25M && !this.switchOver25M) {
                    this.switchAll = true;
                }
            },
            switchOver25M() {
                if (this.switchOver25M) {
                    // Off all another switches
                    this.switchAll = false;
                    this.switchUnder5M = false;
                    this.switchFrom5mTo25M = false;
                    // Reset max
                    this.$store.commit('filter/SET_MAX', 0)
                    // Update min
                    this.$store.commit('filter/SET_MIN', 25000000)
                    // Reset page
                    this.$store.commit('filter/SET_PAGE', 1)
                    // Redirect
                    this.$router.push({name: 'home', query: this.query.object})
                }
                if (!this.switchUnder5M && !this.switchFrom5mTo25M && !this.switchOver25M) {
                    this.switchAll = true;
                }
            },
            // Change status switch when redirect
            $route() {
                if (this.$route.query.max && !this.$route.query.min) {
                    this.switchUnder5M = true
                }
                if (!this.$route.query.max && this.$route.query.min) {
                    this.switchOver25M = true
                }
                if (this.$route.query.max && this.$route.query.min) {
                    this.switchFrom5mTo25M = true
                }
                if (!this.$route.query.max && !this.$route.query.min) {
                    this.switchAll = true
                }
            }
        }
    };
</script>

<template>
    <v-layout row wrap class="filter pa-2 pl-3 text-xs-center">
        <v-flex xs12 :class="$vuetify.breakpoint.sm ? 'ml-1' : 'ml-5'">
            <v-switch hide-details
             v-model="switchAll"
             label="ALL"
             class="mt-0"
             color="black"
             :disabled="switchAll || progressLinear"
             ></v-switch>
            <v-switch hide-details
             v-model="switchUnder5M"
             label="UNDER 5M"
             class="mt-1"
             color="black"
             :disabled="switchUnder5M || progressLinear"
             ></v-switch>
            <v-switch hide-details
             v-model="switchFrom5mTo25M"
             label="5M - 25M"
             class="mt-1"
             color="black"
             :disabled="switchFrom5mTo25M || progressLinear"
             ></v-switch>
            <!-- <v-layout class="mt-3 mx-3" row v-if="switchFrom5mTo25M">
                <v-flex shrink style="width: 70px">
                    <v-text-field
                        v-model="value3[0]"
                        class="mt-0"
                        hide-details
                        type="number"
                        color="black"
                        min="5"
                    ></v-text-field>
                </v-flex>

                <v-flex class="px-3">
                    <v-range-slider
                        v-model="value3"
                        :min="5"
                        :max="25"
                        :step="1"
                        color="black"
                    ></v-range-slider>
                </v-flex>

                <v-flex
                shrink
                style="width: 70px"
                >
                    <v-text-field
                        v-model="value3[1]"
                        class="mt-0"
                        color="black"
                        hide-details
                        type="number"
                        max="30"
                    ></v-text-field>
                </v-flex>
            </v-layout> -->
            <v-switch
            hide-details
            v-model="switchOver25M"
            :disabled="switchOver25M || progressLinear"
            label="OVER 25M"
            class="mt-1"
            color="black"
            ></v-switch>
            <!-- SELECT PRICE -->
        </v-flex>
    </v-layout>
</template>

<style>
.theme--light .v-label, .application .theme--light.v-label {
    color: rgba(0, 0, 0, .9);
}
</style>

