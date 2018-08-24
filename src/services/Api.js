import axios from 'axios'

const instance = axios.create({
    baseURL: `https://masternew.herokuapp.com/mn-shop/api/v1/`
})

export default instance
