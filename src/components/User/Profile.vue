<script>
    export default {
        data() {
            return {
                name: 'Customer',
                address: '123, Tran Hung Dao',
                phone: '123465879',
                editMode: false,
            }
        },
        methods: {
            changeEditMode() {
                this.editMode = !this.editMode;
            },
        }
    }
</script>

<template>
    <v-layout row wrap class="page">
        <v-flex xs12 sm6 md4 offset-sm3 offset-md4 class="pa-2">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card>
                        <v-card-title></v-card-title>
                        <v-card-text>
                            <v-layout row wrap>
                                <v-flex xs12 class="px-1 pt-1">
                                    <v-form>
                                        <v-text-field
                                        v-model="name"
                                        label="Full name"
                                        color="teal"
                                        prepend-icon="assignment_ind"
                                        class="pt-1 text-xs-center"
                                        value="Customer"
                                        :readonly="!editMode"
                                        ></v-text-field>
                                        <!-- FULLNAME -->
                                        <v-text-field
                                        v-model="address"
                                        label="Address"
                                        color="teal"
                                        prepend-icon="home"
                                        class="pt-1"
                                        :readonly="!editMode"
                                        ></v-text-field>
                                        <!-- ADDRESS -->
                                        <v-text-field
                                        v-model="phone"
                                        label="Phone"
                                        prepend-icon="local_phone"
                                        color="teal"
                                        class="pt-1"
                                        :readonly="!editMode"
                                        ></v-text-field>
                                        <!-- PHONE -->
                                    </v-form>
                                </v-flex>
                                <v-flex xs12 class=" text-xs-right">
                                    <v-btn
                                    color="black"
                                    dark
                                    v-show="!editMode"
                                    @click="changeEditMode"
                                    :large="$vuetify.breakpoint.md">
                                        <v-icon left>edit</v-icon>
                                        Update
                                    </v-btn>
                                    <v-btn
                                    color="accent"
                                    flat
                                    v-show="editMode"
                                    @click="changeEditMode"
                                    :large="$vuetify.breakpoint.md">
                                        <v-icon left>clear</v-icon>
                                        Cancel
                                    </v-btn>
                                    <v-btn type="submit"
                                    color="black"
                                    dark
                                    v-show="editMode"
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

