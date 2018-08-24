<script>
    export default {
        data() {
            return {
                valid: false,
                password: '123456',
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => v.length > 5 || 'Password must be more than 5 characters'
                ],
                email: 'test@test.com',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ]
            }
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    const user = {
                        email: this.email,
                        password: this.password
                    }
                    this.$store.dispatch('user/login', user)
                }
            }
        },
        computed: {
            formPadding() {
                return this.$vuetify.breakpoint.xs ? 2 : 5
            },
        }
    }
</script>

<template>
    <div>
        <v-toolbar
        color="black--text white">
            <v-toolbar-title>
                <v-icon color="black" large>lock_open</v-icon>
                LOGIN
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
                        @keydown.enter.prevent="submit"
                        ></v-text-field>

                        <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        type="password"
                        label="Password"
                        required
                        color="teal"
                        prepend-icon="lock"
                        class="pt-1"
                        @keydown.enter.prevent="submit"
                        ></v-text-field>
                    </v-form>
                </v-flex>
                <v-flex xs12 class="pa-4 text-xs-right">
                    <v-btn
                        flat
                        router
                        to="/register">
                        <v-icon left>group_add</v-icon>
                        register
                    </v-btn>
                    <v-btn
                    :disabled="!valid"
                    @click="submit"
                    color="teal"
                    class="white--text"
                    type="submit"
                    tabindex="3"
                    large>
                        <v-icon left>input</v-icon>
                        Login
                    </v-btn>
                </v-flex>
                <!-- <v-flex xs12 class="text-xs-right">
                    <v-btn
                        flat
                        router
                        small
                        to="/forgotPassword">
                        <v-icon left>settings_backup_restore</v-icon>
                        Forgot password
                    </v-btn>
                </v-flex> -->
            </v-layout>
        </v-card>
    </div>
</template>
