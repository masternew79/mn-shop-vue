<script>
    import { mapGetters } from 'vuex'
    import Product from '../Product/Product'
    import DrawerCart from '../Utils/Drawers/DrawerCart'
    import SocialSharing from './SocialSharing'

    export default {
        components: {
            'app-product': Product,
            'app-drawer-cart': DrawerCart,
            'app-social-sharing': SocialSharing
        },
        async created() {
            console.log();
            if (this.$route.params.id) {
                await this.$store.dispatch('product/getProduct', this.$route.params.id)
            }
            await this.$store.dispatch('product/getRelatedProducts', this.product.category._id)
        },
        data() {
            return {
                quantity: 1,
                index: null,
            }
        },
        methods: {
            increaseQty() {
                if (this.quantity < 99) {
                    this.quantity = +this.quantity + 1;
                }
            },
            decreaseQty() {
                if (this.quantity > 1) {
                    this.quantity = +this.quantity - 1;
                }
            },
            isFavorite() {
                return this.favorites.includes(this.product._id);
            },
            addToCart() {
                this.product.quantity = this.quantity;
                this.$store.dispatch('cart/addToCart', this.product)
            },
            showCartDrawer(status) {
                this.$store.commit('app/SET_DRAWER_CART', status)
            },
            setFavorite() {
                if (!this.authenticated) {
                    this.$store.commit("app/SET_DIALOG_LOGIN", true);
                    const message = "Please login to continue!";
                    this.$store.dispatch("app/showSnackbar", { message }, { root: true });
                } else {
                    if (this.isFavorite()) {
                        this.$store.dispatch('product/setFavorite', {id: this.product._id, action: 'remove'})
                    } else {
                        this.$store.dispatch('product/setFavorite', {id: this.product._id, action: 'add'})
                    }
                }
            },
            url() {
                return window.location.href
            }
        },
        computed: {
            ...mapGetters({
                product: 'product/product',
                categories: 'filter/categories',
                progressLinear: 'app/progressLinear',
                amount: 'cart/amount',
                relatedProducts: 'product/relatedProducts',
                favorites: "product/favorites",
                authenticated: "user/authenticated"
            }),
            cartDrawer: {
                get() {
                    return this.$store.getters['app/drawerCart']
                },
                set(status) {
                    this.$store.commit('app/SET_DRAWER_CART', status)
                }
            }
        },
        watch: {
            async $route() {
                if (this.$route.params.id) {
                    await this.$store.dispatch('product/getProduct', this.$route.params.id)
                }
                await this.$store.dispatch('product/getRelatedProducts', this.product.category._id)
            }
        },
        metaInfo() {
            return {
                title: 'Master New Shop Vue',
                meta: [
                    { property: 'og:title', content: 'MasterNew Shop - Using Vue.js' },
                    { property: 'og:type', content: 'website' },
                    { property: 'og:description', content: 'MasterNew Shop demo for my knowledge about vue.js frameword.' },
                    { property: 'og:image', content: this.product.image },
                    { property: 'fb:app_id', content: 'MasterNew Shop - Using Vue.js' },
                ]
            }
    }
    }
</script>

<template>
    <v-flex xs12>
        <content-placeholders :rounded="true" v-if="!product || progressLinear">
            <v-layout row wrap container xs12 sm10>
                <!-- Images -->
                <v-flex xs12 sm5>
                    <v-layout wrap :style=" $vuetify.breakpoint.xs ? 'height: 300px' : 'height: 500px'">
                        <!-- Big Image -->
                        <content-placeholders-img />
                        <!-- /Big Image -->
                    </v-layout>
                </v-flex>
                <!-- /Image -->

                <!-- Info -->
                <v-flex xs12 sm7>
                    <v-layout row wrap class="pa-2">
                        <!-- Name -->
                        <v-flex xs12 order-sm1 order-xs1>
                            <content-placeholders-heading/>
                        </v-flex>
                        <!-- /Name -->
                        <!-- Intro -->
                        <v-flex xs12 class="subheading mt-2" order-sm2 order-xs4>
                            <content-placeholders-text :lines="2" />
                        </v-flex>

                        <v-flex xs12 class="subheading mt-3" order-sm2 order-xs4>
                            <content-placeholders-text :lines="1" />
                        </v-flex>

                        <v-flex xs12 class="subheading mt-4" order-sm2 order-xs4>
                            <content-placeholders-text :lines="1" />
                        </v-flex>
                        <v-flex xs12 class="subheading mt-3" order-sm2 order-xs4>
                            <content-placeholders-text :lines="2" />
                        </v-flex>
                        <v-flex xs12 class="subheading mt-5" order-sm2 order-xs4>
                            <content-placeholders-text :lines="3" />
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </content-placeholders>

        <v-layout row wrap container xs12 sm10 v-if="product || !progressLinear">
            <!-- Images -->
            <v-flex xs12 sm5>
                <v-layout wrap>
                    <!-- Big Image -->
                    <v-flex xs12 class="ma-2">
                        <img :src="product.image" class="cover">
                    </v-flex>
                    <!-- /Big Image -->

                    <!-- Sub images -->
                    <v-flex xs12 class="gallery" >
                        <img
                            class="image"
                            v-for="(image, i) in product.subImage"
                            :src="image"
                            :style="$vuetify.breakpoint.xs ? 'width: 25%' : 'width: 20%'"
                            @click="index = i"
                            :key="i">
                        <vue-gallery-slideshow
                            :images="product.subImage"
                            :index="index"
                            @close="index = null">
                        </vue-gallery-slideshow>
                    </v-flex>
                    <!-- /Sub Image -->
                </v-layout>
            </v-flex>
            <!-- /Image -->

            <!-- Info -->
            <v-flex xs12 sm7  v-if="product || !progressLinear">
                <v-layout row wrap class="pa-2" v-if="product">
                    <!-- Name -->
                    <v-flex xs12 order-sm1 order-xs1 class="text-xs-center text-sm-left">
                        <h2 class="my-3" :class="$vuetify.breakpoint.sm ? 'name-sm' : 'name'">{{ product.name }}</h2>
                    </v-flex>
                    <!-- /Name -->
                    <!-- Intro -->
                    <v-flex xs12 class="subheading mt-2" v-html="product.intro" order-sm2 order-xs4></v-flex>
                    <!-- /Intro -->
                    <!-- Price -->
                    <v-flex xs12 class="price my-2 text-xs-center text-sm-left" order-sm3 order-xs2>
                        <h4 class="sale teal--text">{{ product.salePrice ? +product.salePrice : +product.price | currencyVND }} </h4>
                        <h4 class="normal secondary--text title" v-if="product.salePrice"> {{ +product.price | currencyVND}}</h4>
                    </v-flex>
                    <!-- /Price -->
                    <!-- Quantity -->
                    <v-flex xs12 class="text-xs-center text-sm-left" order-sm4 order-xs3>
                        <v-btn fab small @click="decreaseQty">
                            <v-icon>remove</v-icon>
                        </v-btn>
                        <span> {{ quantity }} </span>
                        <v-btn fab small @click="increaseQty">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn color="teal" dark large @click="addToCart">
                            <v-icon left>add_shopping_cart</v-icon>
                            ADD TO CART
                        </v-btn>
                        <v-btn
                        :color="isFavorite() ? 'pink' : 'blue-grey lighten-3'"
                        large
                        icon
                        dark
                        @click="setFavorite">
                            <v-icon>favorite</v-icon>
                        </v-btn>
                    </v-flex>
                    <!-- /Quantity -->
                    <!-- Category -->
                    <v-flex xs12 class="mt-3" order-sm5 order-xs5>
                        CATEGORY:
                        <v-btn flat color="black">{{ product.category.name }}</v-btn>
                    </v-flex>
                    <!-- /Category -->
                    <!-- Share -->
                    <v-flex xs12 order-sm6 order-xs6>
                        Share:
                        <app-social-sharing :url="url" :product="product"></app-social-sharing>
                    </v-flex>
                    <!-- /Share -->
                    <!-- Detail -->
                    <v-flex xs12 sm12 class="mt-3" order-sm7 order-xs7>
                        <h2 class="details">Product details : </h2>
                        <v-layout row wrap class="mt-2">
                            <v-flex xs12 v-for="(value, key) in product.parameter" :key="key">
                                <p>
                                <span><b>{{key}}</b></span>
                                <v-spacer></v-spacer>
                                <span class="align-end">{{value}}</span>
                                </p>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>
            <!-- /Info -->

            <!-- Related -->
            <v-flex xs12 class="mt-3">
                <h3 class="related">Related Products</h3>
                <v-layout row wrap>
                    <v-flex
                        xs12 sm3
                        v-for="product in relatedProducts"
                        :key="product._id"
                        class="pa-1"
                        >
                        <app-product :product="product"></app-product>
                    </v-flex>
                </v-layout>
            </v-flex>
            <!-- /Related -->

            <!-- Cart drawer moblie -->
            <app-drawer-cart></app-drawer-cart>
            <!-- Cart drawer moblie -->

            <!-- Cart btn -->
            <div
            round
            color="primary"
            class="cart-btn elevation-10"
            @click="$store.commit('app/SET_DRAWER_CART', true)"
            v-if="$vuetify.breakpoint.xs"
            >
                <v-badge right color="teal">
                <span slot="badge">{{ amount }}</span>
                <v-icon color="white">
                    shopping_cart
                </v-icon>
                </v-badge>
            </div>
            <!-- /Cart button -->
        </v-layout>
    </v-flex>
</template>

<style scoped>
.cart-btn {
    background-color: #000;
    border-radius: 50%;
    padding: 15px;
    cursor: pointer;
    position: fixed;
    right: 10px;
    bottom: 10px;
}
.cover {
    width: 100%;
    object-fit: cover;
    max-height: 600px;
}
.bc-item a.v-breadcrumbs__item {
    color: rgba(0, 0, 0, 0.87);
}
.price {
    font-size: 4vh;
}
.price .normal {
    text-decoration: line-through;
    font-size: 3vh;
}
.quantity {
    width: 50px;
    text-align: center;
}
input[type='number'] {
    -moz-appearance:textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
.name {
    font-size: 24px;
    text-transform: uppercase;
}
.name-sm {
    font-size: 2.5vh;
    text-transform: uppercase;
}
.details, .related {
    font-size: 24px;
    text-transform: uppercase;
}
.image {
    background-size: contain;
    cursor: pointer;
    border-radius: 3px;
    display: inline;
}

</style>
