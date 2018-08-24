import axios from 'axios'
import ProductService from '../../services/product-service'

const state = {
    categories: [],
    category: '',
    totalPage: 0,
    limit: 20,
    page: 1,
    min: 0,
    max: 0,
    orderPrice: ''
}

const getters = {
    categories: state => state.categories,
    category: state => state.category,
    totalPage: state => state.totalPage,
    page: state => state.page,
    queryParams : state => {
        let query = {
            string: '',
            object: {}
        };
        if (state.category) {
            query.string += `&cate=${state.category}`
            query.object.cate = state.category
        }
        if (state.page != 1) {
            query.string += `&page=${state.page}`
            query.object.page = state.page
        }
        if (state.min) {
            query.string += `&min=${state.min}`
            query.object.min = state.min
        }
        if (state.max) {
            query.string += `&max=${state.max}`
            query.object.max = state.max
        }
        if (state.orderPrice) {
            query.string += `&price=${state.orderPrice}`
            query.object.price = state.orderPrice
        }
        return query
    },
}

const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories
    },
    SET_CATEGORY(state, category) {
        state.category = category
    },
    SET_TOTAL_PAGE(state, total) {
        state.totalPage = total
    },
    SET_LIMIT(state, perPage) {
        state.perPage = perPage
    },
    SET_PAGE(state, page) {
        state.page = page
    },
    SET_MIN(state, value) {
        state.min = value
    },
    SET_MAX(state, value) {
        state.max = value
    },
    SET_ORDER_PRICE(state, order) {
        state.orderPrice = order
    }
}

const actions = {
    async getCategories({commit, dispatch}) {
        try {
            const response = await ProductService.getCategories()
            commit('SET_CATEGORIES', response.data)
        } catch (error) {
            let message = "Can't get categories"
            dispatch('app/showSnackbar', { message } , {root: true})
        }
    },
    resetQueryParams({commit}) {
        commit('SET_PAGE', 1)
        commit('SET_CATEGORY', '')
        commit('SET_MIN', 0)
        commit('SET_MAX', 0)
        commit('SET_ORDER_PRICE', '')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
