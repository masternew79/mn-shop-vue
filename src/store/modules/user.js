import axios from 'axios'
import router from './../../router'

const state = {
    id: '',
    token: '',
    refreshToken: '',
    authenticated: false,
    email: ''
}

const getters = {
    id: state => state.id,
    token: state => state.token,
    refreshToken: state => state.refreshToken,
    email: state => state.email,
    authenticated: state => state.authenticated,
}

const mutations = {
    SET_ID(state, id) {
        state.id = id
    },
    SET_EMAIL(state, email) {
        state.email = email
    },
    SET_TOKEN(state, token) {
        state.token = token
        state.authenticated = true
    },
    SET_REFRESH_TOKEN(state, refreshToken) {
        state.refreshToken = refreshToken
    },
    SET_AUTHENTICATED(state, status) {
        if (!status) {
            state.token = ''
            state.refreshToken = ''
            state.id = ''
            state.email = ''
        }
        state.authenticated = status
    },
}

const actions = {
    async register({commit, dispatch}, newUser) {
        commit('app/SET_PROGRESS_LINEAR', true, { root: true})
        try {
            await axios.post(`https://masternew.herokuapp.com/mn-shop/api/v1/users/register`, newUser)

            router.push({name: 'login'})
            const message = "Login successfully."
            dispatch('app/showSnackbar', {message, color: 'teal'}, {root: true})
        } catch (error) {
            const message = error.response.data || "Opps! Something went wrong"
            dispatch('app/showSnackbar', {message}, {root: true})
        }
        commit('app/SET_PROGRESS_LINEAR', false, { root: true})
    },
    async login({commit, dispatch}, user) {
        commit('app/SET_PROGRESS_LINEAR', true, { root: true})
        try {
            let response = await axios.post(`https://masternew.herokuapp.com/mn-shop/api/v1/users/login`, user)
            dispatch('setUser', response.data)
            dispatch('changeAuthentication', true)

            // Show snackbar
            const message = "Login successfully"
            dispatch('app/showSnackbar', {message, color: 'teal'}, {root: true})
            // Turn off dialog on mobile
            commit('app/SET_DIALOG_LOGIN', false, { root: true})
            //Redirect to home
            router.push({name: 'home'})
        } catch (error) {
            // Show snackbar
            const message = error.response.data.message || "Opps! Something went wrong"
            dispatch('app/showSnackbar', {message}, {root: true})
        }
        commit('app/SET_PROGRESS_LINEAR', false, { root: true})
    },
    async relogin({commit, dispatch}, storage) {
        try {
            let response = await axios({
                method: 'post',
                url: 'https://masternew.herokuapp.com/mn-shop/api/v1/users/relogin',
                data: { refreshToken: storage.refreshToken },
                headers: { Authorization: `Bareer ${storage.token}` }
            })
            dispatch('setUser', response.data)
            dispatch('changeAuthentication', true)
        } catch (error) {
            commit('app/SET_SHOW_MENU', true, {root: true})
            dispatch('changeAuthentication', false)
        }
        commit('app/SET_SHOW_MENU', false, { root: true })
    },
    logout({dispatch}) {
        dispatch('changeAuthentication', false)

        const message = "Logout successfully"
        dispatch('app/showSnackbar', {message}, {root: true})
    },
    changeAuthentication({commit, dispatch}, status) {
        commit('SET_AUTHENTICATED', status)

        dispatch('app/setLocalStorage', null, {root: true})
    },
    setUser({commit}, userData) {
        commit('SET_ID', userData._id)
        commit('SET_TOKEN', userData.token)
        commit('SET_EMAIL', userData.email)
        commit('SET_REFRESH_TOKEN', userData.refreshToken)
        commit('product/SET_FAVORITES', userData.favorites, {root: true})
    },
    async changePassword({rootState, dispatch}, data) {
        commit('app/SET_PROGRESS_LINEAR', true, { root: true})
        try {
            await axios({
                method: 'POST',
                url: `https://masternew.herokuapp.com/mn-shop/api/v1/users/${rootState.user.id}/changepassword`,
                data: data,
                headers: { Authorization: `Bareer ${rootState.user.token}` }
            })

            const message = "Change password successfully"
            dispatch('app/showSnackbar', {message, color: 'teal'}, {root: true})
        } catch (error) {

            const message = error.response.data.message || "Opps! Something went wrong"
            dispatch('app/showSnackbar', {message}, {root: true})
        }
        commit('app/SET_PROGRESS_LINEAR', true, { root: true})
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
