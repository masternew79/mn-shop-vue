import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import cart from './modules/cart'
import checkout from './modules/checkout'
import filter from './modules/filter'
import product from './modules/product'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        app,
        checkout,
        product,
        filter,
        cart,
        user
    }
})
