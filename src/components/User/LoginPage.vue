<script>
import LoginForm from './LoginForm'

export default {
    components: {
        "app-login-form": LoginForm
    }
}
</script>

<template>
    <v-flex xs12 sm8 md6 offset-sm2 offset-md3 page class="mt-5 pa-2 mb-5 page">
        <app-login-form></app-login-form>
    </v-flex>
</template>

<style>

</style>
