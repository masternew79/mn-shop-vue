<script>
    import Product from '../Product/Product'
    import DrawerCart from '../Utils/Drawers/DrawerCart'
    import { mapGetters } from 'vuex'

    export default {
        components: {
            'app-product': Product,
            'app-drawer-cart': DrawerCart
        },
        created() {
            this.getFavorites()
        },
        methods: {
            getFavorites() {
                this.$store.dispatch('product/getFavorites')
            }
        },
        computed: {
            ...mapGetters({
                'favoriteItems': 'product/favoriteItems',
                'favorites': 'product/favorites'
            })
        }
    }
</script>

<template>
    <v-layout class="favorite">
        <v-flex xs12 class="mt-3">
            <h3 class="related">FAVORITES</h3>
            <v-layout row wrap>
                <v-flex
                    xs12 sm3
                    v-for="product in favoriteItems"
                    :key="product._id"
                    class="pa-1"
                    >
                    <app-product :product="product"></app-product>
                </v-flex>
            </v-layout>
        </v-flex>
        <!-- Cart drawer moblie -->
        <app-drawer-cart></app-drawer-cart>
        <!-- Cart drawer moblie -->
    </v-layout>
</template>

<style scoped>
    .favorite {
        min-height: 200px;
    }
</style>
