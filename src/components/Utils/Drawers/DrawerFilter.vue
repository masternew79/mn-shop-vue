<template>
<v-navigation-drawer
    class="hidden-sm-and-up elevation-1"
    v-model="drawerFilter"
    app
    touchless
    right
    temporary
    width="270">
    <app-sidebar></app-sidebar>
</v-navigation-drawer>
</template>

<script>
import Sidebar from '../../Home/Sidebar';
export default {
    components: {
        'app-sidebar': Sidebar,
    },
    computed: {
        drawerFilter: {
            get() {
                return this.$store.getters['app/drawerFilter']
            },
            set(status) {
                this.$store.commit('app/SET_DRAWER_FILTER', status)
            }
        }
    }
}
</script>

<style>

</style>
