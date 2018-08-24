<template>
    <v-progress-circular
    v-if="loading"
    indeterminate
    color="teal"
    ></v-progress-circular>
</template>

<script>
export default {
    computed: {
        loading() {
            return this.$store.getters['app/progressCircle']
        }
    }
}
</script>

<style>
    .v-progress-circular {
        z-index: 2;
        position: fixed;
        right: 50vw;
        top: 10vh;
    }
</style>
