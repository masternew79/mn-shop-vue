import UserService from '../../services/user-service'
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
            state.favorites = []
        }
        state.authenticated = status
    },
}

const actions = {
    async register({commit, dispatch}, newUser) {
        commit('app/SET_PROGRESS_LINEAR', true, { root: true})
        try {
            await UserService.register(newUser)
            router.push({name: 'login'})
            const message = "Register successfully."
            dispatch('app/showSnackbar', {message, color: 'teal'}, {root: true})
        } catch (error) {
            const message = error.response.data || "Something went wrong"
            dispatch('app/showSnackbar', {message}, {root: true})
        }
        commit('app/SET_PROGRESS_LINEAR', false, { root: true})
    },
    async login({commit, dispatch}, user) {
        commit('app/SET_PROGRESS_LINEAR', true, { root: true})
        try {
            let response = await UserService.login(user)
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
            const response = await UserService.relogin(storage)
            commit('app/SET_SHOW_MENU', true, { root: true })
            dispatch('setUser', response.data)
            dispatch('changeAuthentication', true)
        } catch (error) {
            commit('app/SET_SHOW_MENU', true, {root: true})
            dispatch('changeAuthentication', false)
        }
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
        commit('product/SET_FAVORITES', userData.favorites, {root: true})
        commit('SET_ID', userData._id)
        commit('SET_TOKEN', userData.token)
        commit('SET_EMAIL', userData.email)
        commit('SET_REFRESH_TOKEN', userData.refreshToken)
    },
    async changePassword({commit, rootState, dispatch}, data) {
        commit('app/SET_PROGRESS_LINEAR', true, { root: true})
        try {
            const payload = {
                userId: rootState.user.id,
                token: rootState.user.token,
                data
            }
            await UserService.changePassword(payload)
            const message = "Change password successfully"
            dispatch('app/showSnackbar', {message, color: 'teal'}, {root: true})
        } catch (error) {
            const message = error.response.data.message || "Opps! Something went wrong"
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
