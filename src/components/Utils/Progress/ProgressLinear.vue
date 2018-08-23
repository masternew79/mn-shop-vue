<template>
    <v-progress-linear
        color="accent"
        height="2"
        indeterminate
        v-if="progressLinear">
    </v-progress-linear>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            progressLinear: 'app/progressLinear',
        })
    }
}
</script>

<style>

</style>
