// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import router from './router'
import store from './store'
import VueGallerySlideshow from 'vue-gallery-slideshow'
import VueContentPlaceholders from 'vue-content-placeholders'
import SocialSharing from 'vue-social-sharing'

import './assets/stylus/main.styl'

Vue.component('vue-gallery-slideshow', VueGallerySlideshow)
Vue.use(VueContentPlaceholders)
Vue.use(SocialSharing)

Vue.use(Vuetify, {
    theme: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#e84118',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    }
})

Vue.config.productionTip = false

Vue.filter('currencyVND', value => {
    return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
})
Vue.filter('uppercase', value => {
    return value.toUpperCase()
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})
