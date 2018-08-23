<template>
    <div
        round
        color="primary"
        class="cart-btn elevation-10"
        @click="$store.commit('app/SET_DRAWER_CART', true)"
        v-if="$vuetify.breakpoint.xs">
        <v-badge right color="teal">
        <span slot="badge">{{ amount }}</span>
        <v-icon color="white">
            shopping_cart
        </v-icon>
        </v-badge>
    </div>
</template>

<script>
export default {
    computed: {
        amount() {
            return this.$store.getters['cart/amount']
        }
    }
}
</script>

<style>
.cart-btn {
    background-color: #000;
    border-radius: 50%;
    padding: 15px;
    cursor: pointer;
    position: fixed;
    right: 18px;
    bottom: 90px;
    z-index: 2;
}
</style>
