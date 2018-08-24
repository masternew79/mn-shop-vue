// import axios from 'axios'
import api from './api'

const CheckoutService = {
    getProvinces() {
        return api.get(`/provinces`)
    },
    getDistricts(parentCode) {
        return api.get(`/districts/${parentCode}`)
    },
    getWards(parentCode) {
        return api.get(`/wards/${parentCode}`)
    },
    getRelatedProduct(category) {
        return api.get(`/products?limit=8&cate=${category}`)
    },
    placeOrder(order) {
        return api.post(`/orders`, order)
    }
}

export default CheckoutService
