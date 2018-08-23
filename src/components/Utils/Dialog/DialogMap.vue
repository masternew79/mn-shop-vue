<template>
<v-dialog
    v-model="dialogMap"
    max-width="700"
    :full-width="$vuetify.breakpoint.xs"
    class="elevation-0 dialogLogin"
    transition="false">
    alkdjfl
</v-dialog>
</template>

<script>
import LoginForm from '../../User/LoginForm'

export default {
    components: {
        'app-login-form': LoginForm,
    },
    computed: {
        dialogMap: {
            get() {
                return this.$store.getters['app/dialogMap']
            },
            set(status) {
                this.$store.commit('app/SET_DIALOG_MAP', status)
            }
        }
    }
}
</script>

<style>

</style>
