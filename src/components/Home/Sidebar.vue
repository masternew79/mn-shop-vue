
<script>
    import { mapGetters } from 'vuex'

    import Cart from '../Cart';
    import Sort from './Sort';
    import Price from './Price';
    import Category from './Category';

    export default {
        components: {
            'app-sort': Sort,
            'app-cart': Cart,
            'app-price': Price,
            'app-category': Category,
        },
        data() {
            return {
                openPanel: [true, true, true, true]
            }
        },
        computed: {
            ...mapGetters({
                amount: 'cart/amount'
            })
        }
    }
</script>

<template>
    <v-layout row wrap justify-center>
        <v-flex xs12>
            <v-expansion-panel
            v-model="openPanel"
            expand style="margin-bottom: 60px"
            class="elevation-0"
            :style="$vuetify.breakpoint.xs ? 'margin-bottom: 0px' : 'margin-bottom: 60px'"
            >
                <v-expansion-panel-content class="hidden-xs-only">
                    <div slot="header">
                        <h3 class="black--text">
                            <v-icon color="black">shopping_cart</v-icon>
                            CART
                        </h3>
                    </div>
                    <app-cart maxHeight="360px"></app-cart>
                </v-expansion-panel-content>
                <v-expansion-panel-content>
                    <div slot="header">
                        <h3 class="black--text">
                            <!-- <v-icon large color="black">class</v-icon> -->
                            CATEGORIES
                        </h3>
                    </div>
                    <app-category></app-category>
                </v-expansion-panel-content>
                <v-expansion-panel-content class="mb-2">
                    <div slot="header">
                        <h3 class="black--text">
                            <!-- <v-icon large color="black">attach_money</v-icon> -->
                            PRICE
                        </h3>
                    </div>
                    <app-price></app-price>
                </v-expansion-panel-content>
                <v-expansion-panel-content>
                    <div slot="header">
                        <h3 class="black--text">
                            <!-- <v-icon large class="" color="black">filter_list</v-icon> -->
                            SORT
                        </h3>
                    </div>
                    <app-sort></app-sort>
                </v-expansion-panel-content>

            </v-expansion-panel>
        </v-flex>
    </v-layout>
</template>

