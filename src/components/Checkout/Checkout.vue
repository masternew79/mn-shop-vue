<script>
    import axios from 'axios'
    import { mapGetters } from 'vuex'

    import Cart from './../Cart'
    import Billing from './Billing'
    import OrderInfo from './OrderInfo'

    export default {
        components: {
            'app-cart': Cart,
            'app-billing': Billing,
            'app-order-info': OrderInfo,
        },
        data() {
            return {
                snackbar: false,
                messageConfirm: "Confirm submit",
                confirm: false
            }
        },
        methods: {
            nextStep() {
                this.$store.commit('checkout/SET_STEP', ++this.step)
            },
            prevStep() {
                this.$store.commit('checkout/SET_STEP', --this.step)
            },
            async placeOrder() {
                const order = {
                    name: this.customerInfo.name,
                    phone: this.customerInfo.phone,
                    province: this.customerInfo.province.value,
                    district: this.customerInfo.district.value,
                    ward: this.customerInfo.ward.value,
                    address: this.customerInfo.address,
                    items: this.items.map( item => {
                        return {
                            _id: item._id,
                            quantity: item.quantity
                        }
                    })
                }
                await this.$store.dispatch('checkout/placeOrder', order)
                this.confirm = false
            }
        },
        computed: {
            ...mapGetters({
                validBilling: 'checkout/validBilling',
                items: 'cart/items',
                customerInfo: 'checkout/customerInfo'
            }),
            step: {
                get() {
                    return this.$store.getters['checkout/step']
                },
                set(step) {
                    this.$store.commit('checkout/SET_STEP', step)
                }
            }
        },
        watch: {
            confirm() {
                if (confirm) {
                    this.placeOrder()
                }
            }
        }
    }
</script>

<template>
    <v-flex sm10 offset-sm1 class="mt-2 mb-3">
        <v-stepper v-model="step">
            <v-stepper-header>
            <v-stepper-step color="teal" :complete="step > 1" step="1"><span class="teal--text">CHECK CART</span></v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step color="teal" :complete="step > 2" step="2">BILLING</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step color="teal" step="3">ORDER INFO</v-stepper-step>
            <v-divider></v-divider>

            </v-stepper-header>

            <v-stepper-items>
            <v-stepper-content step="1">
                <v-layout row wrap>
                    <v-flex xs12>
                        <h3>CHECK CART</h3>
                    </v-flex>
                    <v-flex sm8 offset-sm2 md6 offset-md3>
                        <app-cart></app-cart>
                    </v-flex>
                    <v-flex xs12 class="text-xs-center mt-2">
                        <v-btn flat>Cancel</v-btn>
                        <v-btn
                        color="black"
                        @click="nextStep"
                        dark
                        >
                        Continue
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-stepper-content>

            <v-stepper-content step="2">
                <v-flex xs12>
                    <h3>BILLING DETAILS</h3>
                </v-flex>

                <app-billing></app-billing>
            </v-stepper-content>

            <v-stepper-content step="3">
                <v-flex xs12>
                    <h3>ORDER INFO</h3>
                </v-flex>
                <app-order-info></app-order-info>

                <v-flex xs12 class="text-xs-center mt-2">
                    <v-btn
                    flat
                    @click="prevStep"
                    >Previous</v-btn>
                    <v-btn
                    color="black"
                    @click="snackbar = true"
                    dark
                    large
                    >
                    Place Order
                    </v-btn>
                </v-flex>
            </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
        <!-- Snackbar show message -->
        <v-snackbar
            v-model="snackbar"
            color="black"
            top
            multi-line
            :timeout="10000">
        {{ messageConfirm }}
        <v-btn
            dark
            flat
            @click="snackbar = false">
            Close
        </v-btn>
        <v-btn
            dark
            flat
            large
            color="teal"
            @click="confirm = true; snackbar = false">
            Confirm
        </v-btn>
        </v-snackbar>
        <!-- /Snackbar -->
    </v-flex>
</template>

<style>

</style>
