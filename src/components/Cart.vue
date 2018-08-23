
<script>
    import { mapGetters, mapState } from 'vuex'
    export default {
        data() {
            return {
            }
        },
        props: ['maxHeight'],
        methods: {
            increaseQuantity(id) {
                this.$store.dispatch('cart/increaseQuantity', id)
            },
            descreaseQuantity(id) {
                this.$store.dispatch('cart/descreaseQuantity', id)
            },
            removeFromCart(id) {
                this.$store.dispatch('cart/removeFromCart', id)
            }
        },
        computed: {
            ...mapGetters({
                items: 'cart/items',
                amount: 'cart/amount'
            }),
        }
    };
</script>

<template>
    <v-layout row wrap class="cart mt-2" >
        <v-layout
        row
        wrap
        class="list"
        :class="$vuetify.breakpoint.sm? 'pa-0 pr-1' : 'pa-2'"
        :style="'max-height:' + maxHeight"
        v-if="amount > 0">
            <v-flex
            xs12
            v-for="(item, index) in items"
            :key="item._id">
                <v-card class="elevation-0">
                    <v-layout row align-center>
                        <v-flex xs3 class="text-xs-center align-center justify-center">
                            <!-- <v-select
                            :items="range"
                            hide-details
                            return-object
                            @change="changeQuantity()"
                            solo
                            chips
                            single-line
                            :max-width="$vuetify.breakpoint.sm ? '50px': '100%'"
                            flat
                            :label="'' + item.quantity"
                            ></v-select> -->
                            <!-- QUANTITY -->
                            <v-layout wrap="">
                                <v-flex xs12>
                                    <v-btn icon small @click="increaseQuantity(item._id)">
                                        <v-icon>arrow_drop_up</v-icon>
                                    </v-btn>
                                </v-flex>
                                <v-flex xs12>
                                    <span>{{item.quantity}}</span>
                                </v-flex>
                                <v-flex xs12>
                                    <v-btn icon small @click="descreaseQuantity(item._id)">
                                        <v-icon>arrow_drop_down</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>

                        </v-flex>
                        <v-flex xs8 class="text-xs-center">
                            <h3 class="mb-0 name">{{ item.name }}</h3>
                            <!-- NAME -->
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <h3 class="teal--text text-xs-center mb-1 price">{{ item.salePrice ? item.salePrice * item.quantity : item.price * item.quantity | currencyVND}}</h3>
                                </v-flex>
                            </v-layout>
                            <!-- PRICE -->
                            <v-flex xs12>
                                <v-card-media
                                :src="item.image"
                                height="70px"
                                contain>
                                </v-card-media>
                            </v-flex>
                            <!-- IMAGE -->
                        </v-flex>
                        <v-flex xs2 class="">
                            <v-btn icon flat class="grey--text darken-3"
                                @click="removeFromCart(item._id)">
                                <v-icon>clear</v-icon>
                            </v-btn>
                            <!-- Remove -->
                        </v-flex>
                    </v-layout>
                </v-card>
                <v-divider v-if="index < amount - 1"
                :class="{'mt-1 mb-1': index != amount - 1}"
                ></v-divider>
            </v-flex>
        </v-layout>
        <v-layout wrap row v-if="($route.name !== 'checkout') && (amount > 0)">
            <v-flex xs12 class="text-xs-center" >
                <v-btn
                color="teal white--text" class="justify-center"
                :small="$vuetify.breakpoint.sm"
                router
                to="/checkout">
                    CHECK OUT
                    <v-icon>payment</v-icon>
                </v-btn>
                <!-- CHECK OUT -->
            </v-flex>
        </v-layout>
        <v-layout row wrap v-if="amount == 0" class="justify-center mt-2 mb-2">
            <p class="teal white--text pa-2" style="border-radius:20px"> NO ITEMS IN CART</p>
        </v-layout>
    </v-layout>
</template>

<style scoped>
::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 5px;
    background-color: #F5F5F5;
}

::-webkit-scrollbar
{
    width: 5px;
    background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #00897B;
}
.list {
    overflow-y: scroll;
    overflow-x: hidden;
}
.name {
    text-transform: uppercase;
    font-family: 'Noto Serif', serif;
    max-height: 17px;
    font-size: 14px;
    overflow: hidden;
}
.price {
    text-transform: uppercase;
    max-height: 17px;
    font-size: 14px;
    overflow: hidden;
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
</style>
