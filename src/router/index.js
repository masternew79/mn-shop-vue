import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

const Home = () => import('@/components/Home/Home')
const Favorite = () => import('@/components/User/Favorite')
const Checkout = () => import('@/components/Checkout/Checkout')
const ProductDetail = () => import('@/components/Product/ProductDetail')
const Cart = () => import('@/components/Cart')
const ChangePassword = () => import('@/components/User/ChangePassword')
const ForgotPassword = () => import('@/components/User/ForgotPassword')
const LoginPage = () => import('@/components/User/LoginPage')
const Register = () => import('@/components/User/Register')
const Error404 = () => import('@/components/Error404')

import AuthGuard from './auth-guard'
// import CartGuard from './cart-guard'
// import store from './../store'

Vue.use(Router)
Vue.use(Meta)

const router = new Router({
    base: process.env.environment === 'development' ? '/' : '/mn-shop-vue/',
    routes: [
        {
            path: '/',
            component: Home,
            name: 'home',
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout,
        },
        {
            path: '/product/:id',
            name: 'product',
            component: ProductDetail
        },
        {
            path: '/changePassword',
            component: ChangePassword,
            name: 'changePassword',
            beforeEnter: AuthGuard
        },
        {
            path: '/forgotPassword',
            component: ForgotPassword,
            name: 'forgotPassword',
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/favorite',
            name: 'favorite',
            component: Favorite,
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '*',
            name: '404',
            component: Error404
          }
    ],
    scrollBehavior(to, from, savedPosition) {
        return savedPosition ? savedPosition : {x: 0, y: 0}
    },
    mode: 'history'
})

// router.beforeEach((to, from, next) => {
//     store.commit('app/turnOnProgress')
//     next()
// })
// router.afterEach((to, from) => {
//     store.commit('app/turnOffProgress')
// })

export default router;
