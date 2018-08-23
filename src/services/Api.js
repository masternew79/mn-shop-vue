import axios from 'axios'

export default() => {
    return axios.create({
        baseURL: `https://masternew.herokuapp.com/mn-shop/api/v1`,
    })
}
