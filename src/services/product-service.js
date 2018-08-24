// import axios from 'axios'
import api from './api'

const ProductService = {
    getProducts(queryParams) {
        return api.get(`/products?${queryParams}`)
    },
    getCategories() {
        return api.get('/categories')
    },
    getProduct(id) {
        return api.get(`/products/${id}`)
    },
    getRelatedProduct(category) {
        return api.get(`/products?limit=8&cate=${category}`)
    },
    putFavoriteProducts(payload) {
        return api.put(`/users/${payload.userId}`, { favorites: payload.favorites } , {
            headers:{ Authorization: `Bareer ${ payload.token }` }
        })
    }
}

export default ProductService
