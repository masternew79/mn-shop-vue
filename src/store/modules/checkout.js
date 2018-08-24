import router from './../../router'
import CheckoutService from '../../services/checkout-service'

const state = {
    step: 1,
    validBilling: false,
    provinces: [],
    districts: [],
    wards: [],
    items: [],
    customerInfo: {}
}

const getters = {
    step: state => state.step,
    validBilling: state => state.validBilling,
    provinces: state => state.provinces,
    provinces: state => state.provinces,
    districts: state => state.districts,
    wards: state => state.wards,
    customerInfo: state => state.customerInfo,
}

const mutations = {
    SET_VALID_BILLING(state, status) {
        state.validBilling = status
    },
    SET_STEP(state, step) {
        state.step = step
    },
    SET_PROVINCES(state, provinces) {
        state.provinces = provinces
    },
    SET_DISTRICTS(state, districts) {
        state.districts = districts
    },
    SET_WARDS(state, wards) {
        state.wards = wards
    },
    SET_CUSTOMER_INFO(state, info) {
        state.customerInfo = info
    }
}

const actions = {
    async getProvinces({commit, dispatch }) {
        commit('app/SET_PROGRESS_LINEAR', true, { root: true})
        try {
            const response = await CheckoutService.getProvinces()
            commit('SET_PROVINCES', response.data.map(province => {
                return {
                    text: province.name,
                    value: province.code
                }
            }));
        } catch (error) {
            const message = "Could not get provinces !."
            dispatch('app/showSnackbar', {message}, {root: true})
        }
        commit('app/SET_PROGRESS_LINEAR', false, { root: true})
    },
    async getDistricts({commit}, parentCode) {
        commit('app/SET_PROGRESS_LINEAR', true, { root: true})
        try {
            const response = await CheckoutService.getDistricts(parentCode)
            commit('SET_DISTRICTS', response.data.map(district => {
                return {
                    text: district.name,
                    value: district.code
                }
            }));
        } catch (error) {
            const message = "Could not get districts !."
            dispatch('app/showSnackbar', {message}, {root: true})
        }
        commit('app/SET_PROGRESS_LINEAR', false, { root: true})
    },
    async getWards({commit}, parentCode) {
        commit('app/SET_PROGRESS_LINEAR', true, { root: true})
        try {
            const response = await CheckoutService.getWards(parentCode)
            commit('SET_WARDS', response.data.map(ward => {
                return { text: ward.name, value: ward.code }
            }));
        } catch (error) {
            const message = "Could not get wards !."
            dispatch('app/showSnackbar', {message}, {root: true})
        }
        commit('app/SET_PROGRESS_LINEAR', false, { root: true})
    },
    async placeOrder({commit, dispatch}, order) {
        commit('app/SET_PROGRESS_LINEAR', true, { root: true})
        try {
            await CheckoutService.placeOrder(order)
            //Redirect to home
            router.push({name: 'home'})
            dispatch('cart/clearCart', null, {root: true});

            const message = "Place order successfully."
            dispatch('app/showSnackbar', {message, color: 'teal'}, {root: true})
        } catch (error) {
            const message = "Could not place rrder. Please try again or refresh page!."
            dispatch('app/showSnackbar', {message}, {root: true})
        }
        commit('app/SET_PROGRESS_LINEAR', false, { root: true})
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
