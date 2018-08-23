const state = {
    progressLinear: false, // progress linear
    progressCircle: false, // progress circle
    imageLoading: 'https://firebasestorage.googleapis.com/v0/b/mn-shop.appspot.com/o/web_loader_dribbble.gif?alt=media&token=500424ff-2575-45a1-8dda-292f59a9ec37',
    imageError: 'https://firebasestorage.googleapis.com/v0/b/mn-shop.appspot.com/o/404.gif?alt=media&token=6b31f3d6-4272-41e2-b175-18f0a30221cc',
    snackbar: false,
    snackbarOptions: {
        message: '',
        color: ''
    },
    isError: false,
    drawerCart: false,
    drawerMenu: false,
    drawerFilter: false,
    dialogLogin: false,
    dialogMap: false,
    showMenu: false,
    offsetTop: 0
}

const getters = {
    progressLinear: state => state.progressLinear,
    progressCircle: state => state.progressCircle,
    imageLoading: state => state.imageLoading,
    imageError: state => state.imageError,
    snackbar: state => state.snackbar,
    snackbarOptions: state => state.snackbarOptions,
    isError: state => state.isError,
    drawerCart: state => state.drawerCart,
    drawerMenu: state => state.drawerMenu,
    drawerFilter: state => state.drawerFilter,
    dialogLogin: state => state.dialogLogin,
    dialogMap: state => state.dialogMap,
    showMenu: state => state.showMenu,
    offsetTop: state => state.offsetTop,
    storage: (state, getters, rootState) => {
        return {
            items: rootState.cart.items.map(item => {
                return {
                    _id: item._id,
                    quantity: item.quantity
                }
            }),
            token: rootState.user.token,
            refreshToken: rootState.user.refreshToken,
        }
    },
}

const mutations = {
    SET_PROGRESS_LINEAR(state, status) {
        state.progressLinear = status
    },
    SET_PROGRESS_CIRCLE(state, status) {
        state.progressCircle = status
    },
    SET_SNACKBAR(state, status) {
        state.snackbar = status
    },
    SET_SNACKBAR_OPTIONS(state, options) {
        state.snackbarOptions.message = options.message || ''
        state.snackbarOptions.color = options.color || ''
    },
    SET_APP_IS_ERROR(state, status) {
        state.errorPage = status
    },
    SET_DRAWER_CART(state, status) {
        state.drawerCart = status
    },
    SET_DRAWER_MENU(state, status) {
        state.drawerMenu = status
    },
    SET_DRAWER_FILTER(state, status) {
        state.drawerFilter = status
    },
    SET_DIALOG_LOGIN(state, status) {
        state.dialogLogin = status
    },
    SET_DIALOG_MAP(state, status) {
        state.dialogMap = status
    },
    SET_SHOW_MENU(state, status) {
        state.showMenu = status
    },
    SET_OFFSET_TOP(state, offset) {
        state.offsetTop = offset
    }
}

const actions = {
    showSnackbar({ commit }, options) {
        commit('SET_SNACKBAR_OPTIONS', options)
        commit('SET_SNACKBAR', true)
    },
    setLocalStorage({ getters }) {
        localStorage.setItem('MNSHOP', JSON.stringify(getters.storage))
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
