<script>
    import axios from 'axios'
    export default {
        created() {
            this.$store.commit('app/SET_DIALOG_LOGIN', false)
        },
        data() {
            return {
                valid: false,
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
                    const status = this.$store.dispatch('user/forgotPassword', this.email)
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
                    <v-icon color="black" large>settings_backup_restore</v-icon>
                    FORGOT PASSWORD
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
                        </v-form>
                    </v-flex>
                    <v-flex xs12 class="pa-4 text-xs-right">
                        <v-btn
                            class="text-xs-left"
                            flat
                            router
                            to="/login">
                            <v-icon left>input</v-icon>
                            Reset password
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
    </v-layout>
</template>

