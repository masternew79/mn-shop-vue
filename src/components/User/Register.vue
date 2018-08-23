<script>
    import axios from 'axios'
    export default {
        created() {
            this.$store.commit('app/SET_DIALOG_LOGIN', false)
        },
        data() {
            return {
                valid: false,
                password: '',
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => v.length > 5 || 'Password must be more than 5 characters'
                ],
                passwordConfirm: '',
                passwordConfirmRules: [
                    v => !!v || 'Password Confirm is required',
                    v => v == this.password || 'Password and Password confirm not match'
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ]
            }
        },
        methods: {
            async submit() {
                if (this.$refs.form.validate()) {
                    const newUser = {
                        email: this.email,
                        password: this.password,
                        passwordConfirm: this.passwordConfirm
                    }

                    const status = this.$store.dispatch('user/register', newUser)
                }
            }
        },
        computed: {
            formPadding() {
                return this.$vuetify.breakpoint.xs ? 2 : 5
            }
        }
    }
</script>

<template>
    <v-layout row wrap class="mt-5 page app">
        <v-flex xs12 sm8 md6 offset-sm2 offset-md3 class="pa-2">
            <v-toolbar
            color="black--text white">
                <v-toolbar-title>
                    <v-icon color="black" large>group_add</v-icon>
                    REGISTER
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card class="mt-0 elevation-4">
                <v-layout row wrap>
                    <v-flex xs12 class="pt-3" :class="'px-' + formPadding">
                        <v-form v-model="valid" ref="form"  lazy-validation>
                            <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            color="teal"
                            prepend-icon="email"
                            class="pt-1"
                            tabindex="1"
                            @keydown.enter.prevent="submit"
                            ></v-text-field>
                            <!-- /Email -->
                            <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            type="password"
                            label="Password"
                            required
                            color="teal"
                            prepend-icon="lock"
                            class="pt-1"
                            tabindex="2"
                            @keydown.enter.prevent="submit"
                            ></v-text-field>
                            <!-- /Password -->
                            <v-text-field
                            v-model="passwordConfirm"
                            type="password"
                            label="Password Confirm"
                            required
                            prepend-icon="lock_open"
                            color="teal"
                            :rules="passwordConfirmRules"
                            class="pt-1"
                            tabindex="3"
                            @keydown.enter.prevent="submit"
                            ></v-text-field>
                            <!-- /Password confirm -->
                        </v-form>
                    </v-flex>
                    <v-flex xs12 class="pa-4 text-xs-right">
                        <v-btn
                            class="text-xs-left"
                            flat
                            router
                            to="/login">
                            <v-icon left>input</v-icon>
                            Login
                        </v-btn>
                        <v-btn
                        :disabled="!valid"
                        @click="submit"
                        color="black"
                        class="white--text"
                        type="submit"
                        tabindex="4"
                        :large="$vuetify.breakpoint.md">
                            <v-icon left>group_add</v-icon>
                            Register
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
    </v-layout>
</template>

