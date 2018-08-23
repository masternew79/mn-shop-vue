<script>
    import { mapGetters } from "vuex"

    export default {
        props: ["product"],
        data() {
            return {
                hover: false
            }
        },
        methods: {
            addToCart() {
                this.product.quantity = 1; // Add 1 product to cart
                this.$store.dispatch("cart/addToCart", this.product);
            },
            isFavorite() {
                return this.favorites.includes(this.product._id);
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
            }
        },
        computed: {
            ...mapGetters({
                favorites: "product/favorites",
                authenticated: "user/authenticated"
            })
        }
    };
</script>

<template>
    <v-card
        :hover="true"
        slot="activator"
        class="pt-2 elevation-0"
        @mouseover="hover = true"
        @mouseout="hover = false"
        :class=" hover ? 'elevation-4' : 'elevation-0'"
        >
        <v-card-title primary-title class="justify-center pa-0 text-xs-center">
            <span class="sale black" v-if="product.salePrice">SALE</span>
            <v-card
                flat
                slot="activator"
                class="pt-2 px-1"
                router
                :to="'/product/' + product._id"
                disabled
                >
                <v-card-media
                    contain
                    :src="product.image"
                    :height="$vuetify.breakpoint.sm ? '160' : '240'"
                ></v-card-media>

                <v-card-title primary-title class="justify-center text-xs-center pa-0">
                    <div >
                        <h3 class="mb-0 name">{{ product.name }}</h3>
                        <h3 class="teal--text text-xs-center mt-1 price">
                            <span class="teal--text" v-if="product.salePrice != 0">{{ product.salePrice | currencyVND}} </span>
                            <span
                                :class="product.salePrice ? 'secondary--text' : ''"
                                :style="product.salePrice ? 'text-decoration: line-through' : ''"
                                > {{ product.price | currencyVND }}</span>
                        </h3>
                    </div>
                </v-card-title>
            </v-card>
        </v-card-title>

        <v-card-actions class="justify-center">
            <v-btn
                :style="'margin-top: 35px'"
                absolute
                :bottom="!$vuetify.breakpoint.sm"
                top
                right
                icon
                flat
                :color="isFavorite() ? 'accent' : 'blue-grey lighten-3'"
                @click="setFavorite">
                <v-icon>favorite</v-icon>
            </v-btn>
            <!-- Favorite btn -->
            <v-btn
                color='dark'
                flat
                :small="$vuetify.breakpoint.sm"
                @click="addToCart">
                <v-icon>add_shopping_cart</v-icon>
                ADD TO CART
            </v-btn>
            <!-- add to cart -->
        </v-card-actions>
    </v-card>
</template>


<style scoped>
.sale {
  position: absolute;
  top: 2px;
  right: 12px;
  display: inline-block;
  color: white;
  height: 33px;
  width: 33px;
  z-index: 1;
  text-align: center;
  vertical-align: middle;
  line-height: 33px;
  transform: rotate(-20deg);
  animation: beat 1s ease infinite;
}
.sale:before,
.sale:after {
  content: "";
  position: absolute;
  background: inherit;
  height: inherit;
  width: inherit;
  top: 0;
  left: 0;
  z-index: -1;
  transform: rotate(30deg);
}
.sale:after {
  transform: rotate(60deg);
}

@keyframes beat {
  from {
    transform: rotate(-20deg) scale(1);
  }
  to {
    transform: rotate(-20deg) scale(1.1);
  }
}
img {
  width: 100%;
}
.name {
  text-transform: uppercase;
  font-family: "Noto Serif", serif;
  max-height: 19px;
  font-size: 16px;
  overflow: hidden;
}
.price {
  text-transform: uppercase;
  max-height: 18px;
  font-size: 15px;
  overflow: hidden;
}
</style>
