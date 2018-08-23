<template>
    <v-navigation-drawer
        class="elevation-1 "
        v-model="drawerCart"
        app
        touchless
        right
        temporary
        :width="$vuetify.breakpoint.xs ? 270 : 330">
        <app-cart></app-cart>
    </v-navigation-drawer>
</template>

<script>
import Cart from '../../Cart'

export default {
    components: {
        'app-cart': Cart
    },
    computed: {
        drawerCart: {
                get() {
                    return this.$store.getters['app/drawerCart']
                },
                set(status) {
                    this.$store.commit('app/SET_DRAWER_CART', status)
                }
            }
    }
}
</script>

<style>

</style>
