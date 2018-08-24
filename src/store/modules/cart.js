import ProductService from '../../services/product-service'

const state = {
    items: [],
}

const getters = {
    items: state => state.items,
    amount: state => state.items.length
}

const mutations = {
    ADD_TO_CART(state, item) {
        state.items.push(item)
    },
    REMOVE_FROM_CART(state, index) {
        state.items.splice(index, 1)
    },
    INCREASE_QUANTITY(state, id) {
        let items = state.items.slice()

        const index = items.findIndex(item => {
            return item._id == id
        })
        if (index != -1 && items[index].quantity < 100) {
            items[index].quantity += 1
        }
        state.items = items
    },
    DESCREASE_QUANTITY(state, id) {
        let items = [...state.items]

        const index = items.findIndex(item => {
            return item._id == id
        })
        if (index != -1 && items[index].quantity > 1) {
            items[index].quantity -= 1
        }
        state.items = items
    },
    SET_CART(state, items) {
        state.items = items
    },
    CLEAR_CART(state) {
        state.items = []
    }
}

const actions = {
    clearCart({ commit, dispatch }) {
        commit('CLEAR_CART')
        dispatch('app/setLocalStorage', null, { root: true })
    },
    addToCart({ commit, state, dispatch }, newItem) {
        const itemExisted = state.items.find(item => item._id == newItem._id)
        if (itemExisted) {
            let message = "This item already exists in cart"
            dispatch('app/showSnackbar', { message }, { root: true })
        } else {
            commit('ADD_TO_CART', newItem)
            dispatch('app/setLocalStorage', null, { root: true })
        }
    },
    removeFromCart({ commit, state, dispatch }, id) {
        const index = state.items.findIndex(product => {
            return product._id == id
        })
        if (index != -1) {
            commit('REMOVE_FROM_CART', index)
            dispatch('app/setLocalStorage', null, { root: true })
        }
    },
    increaseQuantity({ commit, dispatch }, id) {
        commit('INCREASE_QUANTITY', id)
        dispatch('app/setLocalStorage', null, { root: true })
    },
    descreaseQuantity({ commit, dispatch }, id) {
        commit('DESCREASE_QUANTITY', id)
        dispatch('app/setLocalStorage', null, { root: true })
    },
    getCartFromLocal({ dispatch }, items) {
        items.forEach(item => {
            ProductService
                .getProduct(item._id)
                .then(
                    response => {
                        const data = response.data.data
                        const product = Object.assign({}, data, {
                            quantity: item.quantity
                        })
                        dispatch('addToCart', product);
                    }
                )
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
