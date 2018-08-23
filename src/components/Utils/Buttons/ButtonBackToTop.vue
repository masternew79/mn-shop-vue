<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            target: 0,
            options: {
                duration: 600,
            }
        }
    },
    computed: {
        ...mapGetters({
            offsetTop: 'app/offsetTop'
        })
    }
}
</script>

<template>
    <v-btn
        fab dark
        fixed bottom
        :left="$vuetify.breakpoint.xs"
        :right="$vuetify.breakpoint.md || $vuetify.breakpoint.lg"
        color="teal"
        v-if="offsetTop > 600"
        :small="$vuetify.breakpoint.xs ? true : false"
        @click="$vuetify.goTo(target, options)"
        style="z-index: 3">
        <v-icon>arrow_upward</v-icon>
    </v-btn>
</template>

<style>

</style>
