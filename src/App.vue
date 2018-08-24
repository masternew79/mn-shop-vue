<script>
import { mapGetters } from 'vuex'

import Footer from './components/Layout/Footer'
import Menu from './components/Layout/Menu'
import Snackbar from './components/Utils/Snackbar'
import DrawerMenu from './components/Utils/Drawers/DrawerMenu'
import ProgressLinear from './components/Utils/Progress/ProgressLinear'
import ProgressCircle from './components/Utils/Progress/ProgressCircle'
import DialogLogin from './components/Utils/Dialog/DialogLogin'

export default {
    components: {
        'app-footer': Footer,
        'app-menu': Menu,
        'app-snackbar': Snackbar,
        'app-progress-linear': ProgressLinear,
        'app-progress-circle': ProgressCircle,
        'app-dialog-login': DialogLogin,
        'app-drawer-menu': DrawerMenu,
    },
    created() {
        const dataLocal = localStorage.getItem('MNSHOP');
        if (dataLocal) {
            const storage = JSON.parse(dataLocal);
            // Load cart
            const items = storage.items;
            if (items) {
                this.$store.dispatch('cart/getCartFromLocal', items);
            }
            // Relogin
            const token = storage.token || ''
            const refreshToken = storage.refreshToken || ''
            if (token && storage) {
                this.$store.dispatch('user/relogin', {token, refreshToken})
            } else {
                this.$store.commit('app/SET_SHOW_MENU', true)
            }
        } else {
            this.$store.commit('app/SET_SHOW_MENU', true)
        }
    },
    computed: {
        ...mapGetters({
            progressLinear: 'app/progressLinear',
            amount: 'cart/amount',
            authenticated: 'user/authenticated'
        })
    },
    metaInfo() {
        return {
            title: 'Master New Shop Vue',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { property: 'og:title', content: 'MasterNew Shop - Using Vue.js' },
                { property: 'og:type', content: 'website' },
                { property: 'og:description', content: 'MasterNew Shop demo for my knowledge about vue.js frameword.' },
                { property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/mn-shop.appspot.com/o/logo.jpg?alt=media&token=5aa86c42-03cc-4a04-bcb7-17531440dc60' },
                { property: 'fb:app_id', content: 'MasterNew Shop - Using Vue.js' },
            ]
        }
    }
};
</script>

<template>
    <div id="app">
        <h1 v-show="false">MasterNew Shop Vue - Using vuejs frameword</h1>
        <v-app>
            <!-- Menu Drawer -->
            <app-drawer-menu></app-drawer-menu>
            <!-- /Menu Drawer -->
            <!-- Menu -->
            <app-menu></app-menu>
            <!-- /Menu -->

            <!-- Content -->
            <v-content fluid class="pb-2">
                <transition name="router-animation">
                    <router-view></router-view>
                </transition>
            </v-content>
            <!-- /Content -->

            <!-- Footer -->
            <app-footer v-if="!progressLinear"></app-footer>
            <!-- /Footer -->

            <!-- Progress linear-->
            <app-progress-linear></app-progress-linear>
            <!-- /Progress -->
            <!-- Progress circle -->
            <app-progress-circle></app-progress-circle>
            <!-- Progress circle -->

            <!-- Dialog Login -->
            <app-dialog-login></app-dialog-login>
            <!-- /Dialog Login -->

            <!-- Snackbar show message -->
            <app-snackbar></app-snackbar>
            <!-- /Snackbar -->
        </v-app>
    </div>
</template>

<style>
    .v-dialog {
        box-shadow: none;
    }
    .theme--light .v-toolbar, .application .theme--light.v-toolbar {
        background-color: #fff;
    }
    .v-content {
        height: 100%;
        background-color: #fff;
    }
    .v-toolbar__title {
        font-family: 'Shrikhand', cursive;
        font-size: 25px;
    }
    .logo {
        position: absolute;
        left: 0;
        top: 0;
    }
    .router-animation-enter-active {
        animation: coming .6s;
        opacity: 0;
    }
    .router-animation-leave-active {
        animation: going .6s;
    }
    .router-animation-enter,.router-animation-leave-to {
        position: fixed;
        width: 100%;
    }
    .v-progress-linear {
        position: fixed;
        z-index: 3;
        top: 0;
        margin: 0;
    }
    @keyframes coming {
        from {
            transform: translateX(-50px);
            opacity: 0;
        }
        to {
            transform: translateX(0px);
            opacity: 1;
        }
    }
    @keyframes going {
        from {
            transform: translateX(0px);
        }
        to {
            transform: translateX(50px);
            opacity: 0;
        }
    }
</style>
