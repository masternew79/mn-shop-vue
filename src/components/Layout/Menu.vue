<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                sideNav: false,
            };
        },
        methods: {
            resetQuery() {
                this.$store.dispatch('filter/resetQueryParams')
            },
            logout() {
                this.resetQuery()
                this.$store.dispatch('user/logout')
                this.$router.push({name: 'home'})
            },
            showDrawerCart() {
                this.$store.commit('app/SET_DRAWER_CART', true)
            },
            showMenuDrawer() {
                this.$store.commit('app/SET_DRAWER_MENU', true)
            }
        },
        computed: {
            ...mapGetters({
                authenticated: 'user/authenticated',
                email: 'user/email',
                amount: 'cart/amount',
                showMenu: 'app/showMenu'
            }),
            showItemCart() {
                return this.$route.name == 'product' || this.$route.name == 'favorite'
            }
        }
    }
</script>

<template>
    <v-toolbar app light class="elevation-1">
        <v-toolbar-title>
            <router-link tag="span" to="/" style="cursor: pointer" @click.native="resetQuery">
                <img src="../../assets/logo.png" height="62px" class="logo">
            </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only" >
            <!-- Home -->
            <v-btn
                flat
                @click="resetQuery"
                router
                to="/"
                color="teal"
                >
                <v-icon color="teal">home</v-icon>
                Home
            </v-btn>
            <!-- /Home -->
            <!-- Register -->
            <v-btn
                flat
                v-if="!authenticated"
                v-show="showMenu"
                @click="resetQuery"
                router
                to="/register"
                >
                <v-icon left>group_add</v-icon>
                Register
            </v-btn>
            <!-- Register -->
            <!-- Login -->
            <v-btn
                flat
                @click="resetQuery"
                v-if="!authenticated"
                v-show="showMenu"
                router
                to="/login"
                >
                <v-icon left>lock_open</v-icon>
                Login
            </v-btn>
            <!-- /Login   -->
            <v-btn
                light
                class="elevation-0"
                v-if="showItemCart"
                @click="showDrawerCart"
                >
                <v-badge right color="teal">
                <span slot="badge">{{ amount }}</span>
                <v-icon color="secondary">
                    shopping_cart
                </v-icon>
                </v-badge>
            </v-btn>
            <v-menu offset-y v-if="authenticated">
                <v-btn
                    slot="activator"
                    flat>
                    <v-icon>account_circle</v-icon>
                    {{ email }}
                    <v-icon>arrow_drop_down</v-icon>
                </v-btn>
                <v-list class="align-center">
                    <v-list-tile
                        router
                        to="/favorite">
                        <v-list-tile-title class="text-xs-left black--text font-weight-bold body-2">
                            <v-icon color="accent">favorite</v-icon>
                            FAVORITE
                        </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                        router
                        to="/changePassword">
                        <v-list-tile-title class="text-xs-left black--text font-weight-bold body-2">
                            <v-icon color="black">edit</v-icon>
                            CHANGE PASSWORD
                        </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                        @click="logout">
                        <v-list-tile-title class="text-xs-left font-weight-bold body-2">
                            <v-icon color="black">lock</v-icon>
                            LOGOUT
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar-items>
        <v-toolbar-side-icon  @click="showMenuDrawer" class="hidden-sm-and-up black--text"></v-toolbar-side-icon>
    </v-toolbar>
</template>

<style>

</style>
