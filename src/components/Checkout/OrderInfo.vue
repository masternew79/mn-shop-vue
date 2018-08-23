<script>
    import { mapGetters } from 'vuex'

    export default {
        methods: {
            priceItem(item) {
                return item.salePrice ? item.salePrice * item.quantity : item.price * item.quantity;
            },
            sumPrice(prev, next) {
                return prev + next
            },
            getTotalPrice() {
                if (this.items.length > 0) {
                    let total = this.items.map(this.priceItem).reduce(this.sumPrice);
                    return total
                }
                return 0;
            }
        },
        computed: {
            ...mapGetters({
                items: 'cart/items',
                customerInfo: 'checkout/customerInfo'
            })
        }
    }
</script>

<template>
    <v-layout wrap row>
        <v-flex xs12 sm6 offset-sm3 class="mb-3 mt-3">
            <v-layout>
                <h3 class="title">CUSTOMER: </h3>
            </v-layout>
            <v-layout v-if="customerInfo" wrap class="mb-2">
                <!-- Name -->
                <v-flex xs6 class="text-xs-left subheading mt-2 font-weight-bold">
                    Name:
                </v-flex>
                <v-flex xs6 class="text-xs-right subheading mt-2 font-weight-bold">
                    {{ customerInfo.name ? customerInfo.name : ""}}
                </v-flex>
                <!-- /Name -->
                <!-- Phone -->
                <v-flex xs6 class="text-xs-left subheading mt-2 font-weight-bold">
                    Phone:
                </v-flex>
                <v-flex xs6 class="text-xs-right subheading mt-2 font-weight-bold">
                    {{ customerInfo.phone ? customerInfo.phone : ""}}
                </v-flex>
                <!-- /Phone -->
                <!-- Province -->
                <v-flex xs6 class="text-xs-left subheading mt-2 font-weight-bold">
                    Province:
                </v-flex>
                <v-flex xs6 class="text-xs-right subheading mt-2 font-weight-bold">
                    {{ customerInfo.province ? customerInfo.province.text : "" }}
                </v-flex>
                <!-- /Province -->
                <!-- District -->
                <v-flex xs6 class="text-xs-left subheading mt-2 font-weight-bold">
                    District:
                </v-flex>
                <v-flex xs6 class="text-xs-right subheading mt-2 font-weight-bold">
                    {{ customerInfo.district ? customerInfo.district.text : "" }}
                </v-flex>
                <!-- /District -->
                <!-- Ward -->
                <v-flex xs6 class="text-xs-left subheading mt-2 font-weight-bold">
                    Ward:
                </v-flex>
                <v-flex xs6 class="text-xs-right subheading mt-2 font-weight-bold">
                    {{ customerInfo.ward ? customerInfo.ward.text : "" }}
                </v-flex>
                <!-- /Ward -->
                <!-- Address -->
                <v-flex xs6 class="text-xs-left subheading mt-2 font-weight-bold">
                    Address:
                </v-flex>
                <v-flex xs6 class="text-xs-right subheading mt-2 font-weight-bold">
                    {{ customerInfo.address ? customerInfo.address : "" }}
                </v-flex>
                <!-- /Address -->

            </v-layout>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 class="mb-3">
            <v-layout>
                <h3 class="title mb-3">PRODUCTS: </h3>
            </v-layout>
            <v-layout wrap class="mb-3">
                <v-flex xs6 class="text-xs-center font-weight-bold subheading">Name</v-flex>
                <v-flex xs6 class="text-xs-center font-weight-bold subheading">Price</v-flex>
            </v-layout>
            <v-layout wrap v-for="item in items" :key="item.id" class="mb-2">
                <v-flex xs6 class="text-xs-left">
                    {{ item.name }} x {{ item.quantity }}
                </v-flex>
                <v-flex xs6 class="text-xs-right">
                    {{ item.salePrice ? item.salePrice * item.quantity: item.price * item.quantity | currencyVND}}
                </v-flex>
            </v-layout>
            <v-layout wrap class="mb-2">
                <v-flex xs6 class="text-xs-left font-weight-bold title">Total</v-flex>
                <v-flex xs6 class="text-xs-right font-weight-bold title teal--text">{{ getTotalPrice() | currencyVND }}</v-flex>
            </v-layout>
        </v-flex>


    </v-layout>
</template>

<style>

</style>
