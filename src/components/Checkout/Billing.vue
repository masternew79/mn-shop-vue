<script>
    import { mapGetters } from 'vuex'

    export default {
        async created() {
            await this.$store.dispatch('checkout/getProvinces');
        },
        data() {
            return {
                valid: false,
                name: 'customer 1',
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length > 10) || 'Name must be more than 10 characters'
                ],
                phone: '01681234123',
                phoneRules: [
                    v => !!v || 'Phone is required',
                    v => (v && v.length > 8) || 'Phone must be more than 8 characters'
                ],
                province: null,
                district: null,
                ward: null,
                address: '123, Hung Vuong'
            }
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    const info = {
                        name: this.name,
                        phone: this.phone,
                        address: this.address,
                        phone: this.phone,
                        ward: this.wards.find(ward => ward.value == this.ward),
                        district: this.districts.find(district => district.value == this.district),
                        province: this.provinces.find(province => province.value == this.province),
                    }
                    this.$store.commit('checkout/SET_CUSTOMER_INFO', info);
                    this.$store.commit('checkout/SET_STEP', ++this.step)
                }
            },
            prevStep() {
                this.$store.commit('checkout/SET_STEP', --this.step)
            }
        },
        computed: {
            ...mapGetters({
            provinces: 'checkout/provinces',
            districts: 'checkout/districts',
            wards: 'checkout/wards'
            }),
            validBilling: {
                get() {
                    return this.$store.getters['checkout/validBilling']
                },
                set(status) {
                    this.$store.commit('checkout/SET_VALID_BILLING', status)
                }
            },
            step: {
                get() {
                    return this.$store.getters['checkout/step']
                },
                set(step) {
                    this.$store.commit('checkout/SET_STEP', step)
                }
            }
        },
        watch: {
            province() {
                this.$store.dispatch('checkout/getDistricts', this.province)
            },
            district() {
                this.$store.dispatch('checkout/getWards', this.district)
            }
        }
    }
</script>

<template>
    <v-flex sm8 offset-sm2 md6 offset-md3>
        <v-form v-model="validBilling" ref="form" lazy-validation>
            <h4>Contact</h4>
            <v-text-field
                label="Full name"
                prepend-icon="person"
                class="pr-2"
                v-model="name"
                required
                :rules="[v => !!v || 'Full name is required']"
                ></v-text-field>
            <v-text-field
                label="Phone"
                mask="###########"
                prepend-icon="smartphone"
                class="pr-2"
                v-model="phone"
                required
                :rules="[v => !!v || 'Phone is required']"
                ></v-text-field>
            <v-divider></v-divider>
            <h4 class="mt-2">Address</h4>
            <v-autocomplete
                v-model="province"
                :items="provinces"
                label="City / Province"
                :rules="[v => !!v || 'City is required']"
                prepend-icon="location_city"
                required>
                <v-slide-x-reverse-transition
                slot="append-outer"
                mode="out-in"
                >
                </v-slide-x-reverse-transition>
            </v-autocomplete>
            <!-- CITY -->
            <v-autocomplete
                required
                v-model="district"
                :items="districts"
                label="District"
                prepend-icon="domain"
                :readonly="!province"
                :rules="[v => !!v || 'District is required']"
                :hint="!province ? 'Please select City field' : ''" >
                <v-slide-x-reverse-transition
                slot="append-outer"
                mode="out-in"
                >
                </v-slide-x-reverse-transition>
            </v-autocomplete>
            <!-- DISTRICT -->
            <v-autocomplete
                v-model="ward"
                :items="wards"
                label="Ward"
                prepend-icon="domain"
                :readonly="!district"
                :rules="[v => !!v || 'Ward is required']"
                :hint="!district ? 'Please select District field' : ''" >
                <v-slide-x-reverse-transition
                slot="append-outer"
                mode="out-in"
                >
                </v-slide-x-reverse-transition>
            </v-autocomplete>
            <!-- Ward -->
            <v-text-field
                v-model="address"
                :rules="[v => !!v || 'Address is required']"
                label="Address (House number, street name)"
                clearable
                prepend-icon="local_convenience_store"
                class="pr-2"
            ></v-text-field>
            <!-- Adress -->
            <v-flex xs12 class="text-xs-center mt-2">
                <v-btn
                flat
                @click="prevStep"
                >Previous</v-btn>
                <v-btn
                    :disabled="!validBilling"
                    @click="submit"
                    color="black"
                    class="white--text"
                    >
                    Continue
                </v-btn>
            </v-flex>
        </v-form>
    </v-flex>
</template>

<style>

</style>
