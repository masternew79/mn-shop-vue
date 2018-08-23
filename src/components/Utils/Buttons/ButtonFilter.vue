<template>
    <v-btn
        fixed bottom right
        dark fab
        color="black"
        @click="$store.commit('app/SET_DRAWER_FILTER', true)"
        class="hidden-sm-and-up mt-5">
        <v-icon>sort</v-icon>
    </v-btn>
</template>

<script>
export default {

}
</script>

<style scoped>
.v-btn {
    z-index: 2;
}
</style>
