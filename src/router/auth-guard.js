import store from './../store'

export default (to, from, next) => {
    if (store.getters['user/authenticated']) {
        next()
    } else {
        next('/login')
    }
}
