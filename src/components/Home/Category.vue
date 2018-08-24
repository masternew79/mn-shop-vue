<script>
    import { mapGetters, mapState } from 'vuex'

    export default {
        created() {
            this.$store.dispatch('filter/getCategories')
            if (this.$route.query.cate) {
                // When user refresh or first time visit link
                this.switchCategories.push(this.$route.query.cate)
            }
        },
        data() {
            return {
                switchAll: true,
                switchCategories: [],
            }
        },
        methods: {
            changeCategory(id) {
                this.$store.commit('filter/SET_PAGE', 1)
                this.switchCategories = []
                this.switchCategories.push(id)
            }
        },
        computed: {
            ...mapGetters({
                categories: 'filter/categories',
                progressLinear: 'app/progressLinear',
                query: 'filter/queryParams' // params query on url
            }),
        },
        watch: {
            switchAll() {
                if (this.switchAll) {
                    // Reset to page 1
                    this.$store.commit('filter/SET_PAGE', 1)
                    // No category selected
                    this.$store.commit('filter/SET_CATEGORY', '')
                    // Update url
                    this.$router.push({name: 'home', query: this.query.object})
                    // Turn off all switch categories
                    this.switchCategories = [];
                }
            },
            switchCategories() {
                if (this.switchCategories.length == 1) {
                    // Reset to page 1
                    this.$store.commit('filter/SET_PAGE', 1)
                    // Set category
                    this.$store.commit('filter/SET_CATEGORY', this.switchCategories[0])
                    // Update url
                    this.$router.push({name: 'home', query: this.query.object})
                    // Turn off switch all
                    this.switchAll = false;
                } else {
                    // Turn on if category = []
                    this.switchAll = true;
                }
            },
            $route() {
                // Clear category when user redirect to home page by logo, toolbar
                if (!this.$route.query.cate) {
                    this.switchCategories = []
                }
            }
        }
    }
</script>

<template>
    <v-layout row wrap class="filter pl-3 text-xs-center">
        <v-flex
            xs12
            class="py-2 text-xs-center"
            :class="$vuetify.breakpoint.sm ? 'ml-1' : 'ml-5'">
            <v-switch
            hide-details
            v-model="switchAll"
            label="ALL"
            class="mt-0"
            color="black"
            :disabled="switchAll || progressLinear">
            </v-switch>

            <v-switch
            color="black"
            hide-details
            v-for="category in categories"
            :value="category._id"
            :key="category._id"
            :disabled="progressLinear || switchCategories[0] == category._id"
            @change="changeCategory(category._id)"
            v-model="switchCategories"
            :label="category.name | uppercase"
            class="mt-1"></v-switch>
        </v-flex>
    </v-layout>
</template>

<style>

</style>
