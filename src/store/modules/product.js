import axios from 'axios'

const state = {
    products: [],
    product: null, // use for product detail
    relatedProducts: [],
    favorites: [], // Array id
    favoriteItems: [] // Array object
}

const getters = {
    products: state => state.products,
    product: state => state.product,
    relatedProducts: state => state.relatedProducts,
    favorites: state => state.favorites,
    favoriteItems: state => state.favoriteItems,
}

const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products
    },
    SET_PRODUCT(state, product) {
        state.product = product
    },
    SET_RELATED_PRODUCTS(state, products) {
        state.relatedProducts = products
    },
    SET_FAVORITES(state, favorites) {
        state.favorites = favorites
    },
    ADD_TO_FAVORITE_ITEMS(state, product) {
        const existItem = state.favoriteItems.find(item => item._id == product._id)
        if(!existItem) {
            state.favoriteItems.push(product)
        }
    }
}

const actions = {
    async getProducts({commit, rootGetters, dispatch }) {
        commit('app/SET_PROGRESS_LINEAR', true, { root: true})
        commit('SET_PRODUCTS', [])
        // Get query params
        let queryParams = rootGetters['filter/queryParams'].string;

        try {
            const response = await axios.get(`https://masternew.herokuapp.com/mn-shop/api/v1/products?${queryParams}`)

            commit('SET_PRODUCTS', response.data.data)
            commit('filter/SET_TOTAL_PAGE', response.data.lastPage, {root: true})
            commit('app/SET_APP_IS_ERROR', false, { root: true})
        } catch (error) {
            const message = "Could not get products!."
            dispatch('app/showSnackbar', {message}, {root: true})
            commit('app/SET_APP_IS_ERROR', false, { root: true})
        }
        commit('app/SET_PROGRESS_LINEAR', false, { root: true})
    },
    async getProduct({commit}, id) {
        commit('app/SET_PROGRESS_LINEAR', true, { root: true})
        try {
            const response = await axios.get(`https://masternew.herokuapp.com/mn-shop/api/v1/products/${id}`)
            // Update product
            commit('SET_PRODUCT', response.data.data)
            commit('app/SET_APP_IS_ERROR', false, { root: true})
        } catch (error) {
            const message = "Could not get products!."
            dispatch('app/showSnackbar', {message}, {root: true})
            commit('app/SET_APP_IS_ERROR', false, { root: true})
        }
        commit('app/SET_PROGRESS_LINEAR', false, { root: true})
    },
    async getRelatedProducts({commit, dispatch }, category) {
        // Clear products
        commit('SET_RELATED_PRODUCTS', [])
        try {
            const response = await axios.get(`https://masternew.herokuapp.com/mn-shop/api/v1/products?limit=8&cate=${category}`)
            // Update products
            const products = response.data.data
            commit('SET_RELATED_PRODUCTS', products)

        } catch (error) {
            const message = "Could not get related products!."
            dispatch('app/showSnackbar', {message}, {root: true})
        }
    },
    updateFavorites({commit, dispatch, rootState}, favorites) {
        return new Promise(async (resolve, reject) => {
            try {
                await axios({
                    method: 'PUT',
                    url: `https://masternew.herokuapp.com/mn-shop/api/v1/users/${rootState.user.id}`,
                    data: { favorites },
                    headers: { Authorization: `Bareer ${rootState.user.token}` }
                })
                commit('SET_FAVORITES', favorites)
                // Update localStorage
                dispatch('app/setLocalStorage', null, {root: true})
                resolve(true)
            } catch (error) {
                reject(false)
            }
        })
    },
    async setFavorite({commit, dispatch, state}, {id, action}) {
        commit('app/SET_PROGRESS_CIRCLE', true, { root: true})
        // Add to temp before update state
        let favorites = [...state.favorites]
        if (action == 'add') {
            favorites.push(id);
        } else {
            const index = favorites.findIndex(item => item == id)
            if (index != -1) favorites.splice(index, 1)
        }

        const result = await dispatch('updateFavorites', favorites)
        if(result) {
            const message = `Successful ${action} this product to favorites!.`
            dispatch('app/showSnackbar', {message, color: 'teal'}, {root: true})
        } else {
            const message = `Could not ${action} this product to favorites!.`
            dispatch('app/showSnackbar', {message}, {root: true})
        }
        commit('app/SET_PROGRESS_CIRCLE', false, { root: true})
    },
    // Use when to create favorite component
    getFavorites({commit, state}) {
        commit('app/SET_PROGRESS_LINEAR', true, { root: true})
        state.favorites.forEach(product => {
            axios.get(`https://masternew.herokuapp.com/mn-shop/api/v1/products/${product}`)
            .then( response => { commit('ADD_TO_FAVORITE_ITEMS', response.data.data) })
        })
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
