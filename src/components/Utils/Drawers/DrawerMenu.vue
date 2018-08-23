<template>
    <v-navigation-drawer
        class="elevation-1 "
        v-model="drawerMenu"
        app
        touchless
        right
        temporary
        :width="$vuetify.breakpoint.xs ? 270 : 330">
        <v-toolbar flat class="transparent" v-if="email">
            <v-list class="pa-0">
                <v-list-tile class="">
                    <v-list-tile-content>
                        <v-list-tile-title class="text-xs-center font-weight-bold text-uppercase">
                            {{ email }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        <!-- AVATAR -->
        <v-divider v-if="email"></v-divider>
        <v-list>
            <v-list-tile
                @click="resetQuery"
                router
                to="/">
                <v-list-tile-action>
                    <v-icon color="teal">home</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="teal--text">
                        Home
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                @click="resetQuery"
                router
                to="/favorite"
                v-if="authenticated">
                <v-list-tile-action>
                    <v-icon color="accent">favorite</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="black--text">
                        Favorite
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                @click="resetQuery"
                router
                to="/changepassword"
                v-if="authenticated">
                <v-list-tile-action>
                    <v-icon color="black">lock_open</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="black--text">
                        Change Password
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                @click="logout()"
                v-if="authenticated">
                <v-list-tile-action>
                    <v-icon class="black--text">lock</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="black--text">
                        Logout
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                @click="resetQuery"
                router
                to="/register"
                v-if="!authenticated">
                <v-list-tile-action>
                    <v-icon>group_add</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>
                        Register
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
                @click="resetQuery"
                router
                to="/login"
                v-if="!authenticated">
                <v-list-tile-action>
                    <v-icon>lock_open</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>
                        Login
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    methods: {
        logout() {
            this.resetQuery()
            this.$store.dispatch('user/logout')
            this.$router.push({name: 'home'})
        },
        resetQuery() {
            this.$store.dispatch('filter/resetQueryParams')
        }
    },
    computed: {
        ...mapGetters({
            email: 'user/email',
            authenticated: 'user/authenticated'
        }),
        drawerMenu: {
            get() {
                return this.$store.getters['app/drawerMenu']
            },
            set(status) {
                this.$store.commit('app/SET_DRAWER_MENU', status)
            }
        }
    }
}
</script>

<style>

</style>
