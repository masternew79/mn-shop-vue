<script>
    import Cart from '../Cart'
    import DrawerCart from '../Utils/Drawers/DrawerCart'
    import DrawerFilter from '../Utils/Drawers/DrawerFilter'
    import ButtonCart from '../Utils/Buttons/ButtonCart'
    import ButtonFilter from '../Utils/Buttons/ButtonFilter'
    import ButtonBackToTop from '../Utils/Buttons/ButtonBackToTop'
    import Pagination from '../Utils/Pagination'
    import Product from '../Product/Product'
    import Error404 from '../Error404'
    import Sidebar from './Sidebar'
    import { mapGetters, mapState } from 'vuex'

    export default {
        components: {
            'app-sidebar': Sidebar,
            'app-product': Product,
            'app-drawer-cart': DrawerCart,
            'app-btn-cart': ButtonCart,
            'app-btn-filter': ButtonFilter,
            'app-btn-back-to-top': ButtonBackToTop,
            'app-drawer-filter': DrawerFilter,
            'app-cart': Cart,
            'app-pagination': Pagination,
            'app-error': Error404
        },
        created() {
            // When reload page with query on url
            if (this.$route.query.page) {
                this.page = +this.$route.query.page || 1
                this.$store.commit('filter/SET_PAGE', this.page)
            }
            if (this.$route.query.cate) {
                this.$store.commit('filter/SET_CATEGORY', this.$route.query.cate)
            }
            if (this.$route.query.min) {
                this.$store.commit('filter/SET_MIN', this.$route.query.min)
            }
            if (this.$route.query.max) {
                this.$store.commit('filter/SET_MAX', this.$route.query.max)
            }
            this.$store.dispatch('product/getProducts')
        },
        computed: {
            ...mapGetters({
                products: 'product/products',
                progressLinear: 'app/progressLinear',
                imageLoading: 'app/imageLoading',
                imageError: 'app/imageError',
                isError: 'app/isError',
                category: 'filter/category',
                amount: 'cart/amount'
            })
        },
        methods: {
            onScroll (e) {
                this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
                this.$store.commit('app/SET_OFFSET_TOP', this.offsetTop)
            }
        },
        watch: {
            $route() {
                this.$store.dispatch('product/getProducts')
            }
        },
    }
</script>

<template>
    <v-container
    fluid class="pa-0 page"
    >
        <v-layout row wrap class="mb-0">
            <v-flex xs12 sm9 class="content">
                <v-layout row wrap>
                    <!-- Show product -->
                    <v-flex xs12>
                        <v-layout row wrap
                            v-scroll="onScroll">
                            <v-flex
                                xs12 sm3 class="pa-1"
                                v-for="product in products"
                                :key="product._id">
                                <app-product :product="product"></app-product>
                            </v-flex>
                            <v-flex class="text-xs-center" v-if="!isError && (progressLinear || products.length == 0)">
                                <img :src="imageLoading" contain width="100%">
                            </v-flex>
                            <app-error v-if="isError"></app-error>
                        </v-layout>
                    </v-flex>
                    <!-- /Show products -->

                    <!-- Pagination -->
                    <app-pagination></app-pagination>
                    <!-- /Pagination -->
                </v-layout>
            </v-flex>

            <!-- Sidebar -->
            <v-flex class="hidden-xs-only sidebar mt-1 elevation-1" sm3>
                <app-sidebar></app-sidebar>
            </v-flex>
            <!-- /Sidebar  -->

            <!-- Filter btn -->
            <app-btn-filter></app-btn-filter>
            <!-- /Filter button -->

            <!-- Back to top -->
            <app-btn-back-to-top></app-btn-back-to-top>
            <!-- /Back to top -->

            <!-- Drawer filter -->
            <app-drawer-filter></app-drawer-filter>
            <!-- /Drawer -->

            <!-- Cart drawer -->
            <app-drawer-cart></app-drawer-cart>
            <!-- Cart drawer -->
            <!-- Cart btn -->
            <app-btn-cart></app-btn-cart>
            <!-- /Cart btn -->
        </v-layout>
    </v-container>
</template>

<style scoped>
::-webkit-scrollbar
{
    width: 0px;
}

.content {
    min-height: 150vh;
}

.sidebar {
    position: absolute;
    overflow-y: scroll;
    right: 0;
}
</style>

