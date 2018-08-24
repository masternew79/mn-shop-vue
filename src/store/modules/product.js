import ProductService from '../../services/product-service'

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
    ADD_TO_FAVORITES(state, id) {
        const index = state.favorites.findIndex(item => item == id)
        if (index == -1) state.favorites.push(id);
    },
    REMOVE_FROM_FAVORITES(state, id) {
        const index = state.favorites.findIndex(item => item == id)
        if (index != -1) state.favorites.splice(index, 1)
    },
    ADD_TO_FAVORITE_ITEMS(state, product) {
        const existItem = state.favoriteItems.find(item => item._id == product._id)
        if(!existItem) state.favoriteItems.push(product)
    },
    REMOVE_FROM_FAVORITE_ITEMS(state, id) {
        const index = state.favoriteItems.findIndex(item => item._id == id)
        if (index != -1) state.favoriteItems.splice(index, 1)
    }
}

const actions = {
    async getProducts({commit, rootGetters, dispatch }) {
        commit('app/SET_PROGRESS_LINEAR', true, { root: true})
        commit('SET_PRODUCTS', [])
        let queryParams = rootGetters['filter/queryParams'].string;

        try {
            const response = await ProductService.getProducts(queryParams)
            commit('SET_PRODUCTS', response.data.data)
            commit('filter/SET_TOTAL_PAGE', response.data.lastPage, {root: true})
            commit('app/SET_APP_IS_ERROR', false, { root: true})
        } catch (error) {
            const message = "Could not get products!."
            dispatch('app/showSnackbar', {message}, {root: true})
            commit('app/SET_APP_IS_ERROR', true, { root: true})
        }
        commit('app/SET_PROGRESS_LINEAR', false, { root: true})
    },
    async getProduct({commit}, id) {
        commit('app/SET_PROGRESS_LINEAR', true, { root: true})
        try {
            const response = await await ProductService.getProduct(id)
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
            const response = await ProductService.getRelatedProduct(category)
            // Update products
            const products = response.data.data
            commit('SET_RELATED_PRODUCTS', products)

        } catch (error) {
            const message = "Could not get related products!."
            dispatch('app/showSnackbar', {message}, {root: true})
        }
    },
    updateFavorites({dispatch, rootState}, favorites) {
        return new Promise(async (resolve, reject) => {
            try {
                const payload = {
                    userId: rootState.user.id,
                    favorites,
                    token: rootState.user.token
                }
                await ProductService.putFavoriteProducts(payload)
                // Update localStorage
                dispatch('app/setLocalStorage', null, {root: true})
                resolve(true)
            } catch (error) {
                console.log(error.response);
                reject(false)
            }
        })
    },
    async setFavorite({commit, dispatch, state}, {id, action}) {
        commit('app/SET_PROGRESS_CIRCLE', true, { root: true})
        if (action == 'add') {
            commit('ADD_TO_FAVORITES', id)
        } else {
            commit('REMOVE_FROM_FAVORITES', id)
            commit('REMOVE_FROM_FAVORITE_ITEMS', id)
        }
        const result = await dispatch('updateFavorites', state.favorites)
        if(result) {
            const message = `Successful ${action} this product to favorites!.`
            dispatch('app/showSnackbar', {message, color: 'teal'}, {root: true})
        } else {
            const message = `Could not ${action} this product to favorites!.`
            dispatch('app/showSnackbar', {message}, {root: true})
        }
        commit('app/SET_PROGRESS_CIRCLE', false, { root: true})
    },
    getFavoriteItems({commit, state}) {
        commit('app/SET_PROGRESS_LINEAR', true, { root: true})
        state.favorites.forEach(product => {
            ProductService.getProduct(product)
            .then( response => {
                commit('ADD_TO_FAVORITE_ITEMS', response.data.data)
            })
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
