<template>
<v-dialog
    v-model="dialogLogin"
    max-width="700"
    :full-width="$vuetify.breakpoint.xs"
    class="elevation-0 dialogLogin"
    transition="false">
    <app-login-form></app-login-form>
</v-dialog>
</template>

<script>
import LoginForm from '../../User/LoginForm'

export default {
    components: {
        'app-login-form': LoginForm,
    },
    computed: {
        dialogLogin: {
            get() {
                return this.$store.getters['app/dialogLogin']
            },
            set(status) {
                this.$store.commit('app/SET_DIALOG_LOGIN', status)
            }
        }
    }
}
</script>

<style>

</style>
