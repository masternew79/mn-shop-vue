<script>
    export default {
        data() {
            return {
                password: '',
                currentPassword: '',
                passwordConfirm: '',
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => v.length > 5 || 'Password must be more than 5 characters'
                ],
                currentPasswordRules: [
                    v => !!v || 'Password is required',
                    v => v.length > 5 || 'Password must be more than 5 characters'
                ],
                passwordConfirmRules: [
                    v => !!v || 'Password Confirm is required',
                    v => v == this.password || 'Password and Password confirm not match'
                ],
                valid: false
            }
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    const data = {
                        currentPassword: this.currentPassword,
                        password: this.password,
                        passwordConfirm: this.passwordConfirm
                    }
                    this.$store.dispatch('user/changePassword', data)
                }
            }
        }
    }
</script>

<template>
    <v-layout row wrap class="page">
        <v-flex xs12 sm6 offset-sm3 class="pa-2">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-toolbar
                    color="black--text white">
                        <v-toolbar-title>
                            <v-icon color="black" large>lock_open</v-icon>
                            CHANGE PASSWORD
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card>
                        <v-card-title></v-card-title>
                        <v-card-text>
                            <v-layout row wrap>
                                <v-flex xs12 class="px-1 pt-1">
                                    <v-form ref="form">
                                        <v-text-field
                                        v-model="currentPassword"
                                        label="Current password"
                                        color="teal"
                                        prepend-icon="lock_open"
                                        class="pt-1"
                                        required
                                        type="password"
                                        :rules="currentPasswordRules"
                                        ></v-text-field>
                                        <v-text-field
                                        v-model="password"
                                        label="New password"
                                        color="teal"
                                        prepend-icon="fab fa-expeditedssl"
                                        class="pt-1"
                                        required
                                        type="password"
                                        :rules="passwordRules"
                                        ></v-text-field>
                                        <!-- Password -->
                                        <v-text-field
                                        v-model="passwordConfirm"
                                        label="Confirm password"
                                        prepend-icon="fa fa-clone"
                                        color="teal"
                                        class="pt-1"
                                        required
                                        type="password"
                                        :rules="passwordConfirmRules"
                                        ></v-text-field>
                                        <!-- Password confirm -->
                                    </v-form>
                                </v-flex>
                                <v-flex xs12 class=" text-xs-right">
                                    <v-btn type="submit"
                                    color="teal"
                                    dark
                                    @click="submit"
                                    :large="$vuetify.breakpoint.md">
                                        <v-icon left>save</v-icon>
                                        Save
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>



<style>
.avatar {
    margin-bottom: -10%;
    z-index: 1;
}
.btnChangeAvatar {
    z-index: 1;
    top: 9%;
    right: 25%;
}
</style>

