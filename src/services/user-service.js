// import axios from 'axios'
import api from './api'

const UsersServices = {
    register(newUser) {
        return api.post('/users/register', newUser)
    },
    login(user) {
        return api.post('/users/login', user)
    },
    relogin(payload) {
        return api.post(`/users/relogin`, { refreshToken: payload.refreshToken } , {
            headers:{ Authorization: `Bareer ${ payload.token }` }
        })
    },
    changePassword(payload) {
        return api.post(
            `/users/${payload.userId}/changepassword`,
            payload.data ,
            {
                headers:{ Authorization: `Bareer ${ payload.token }` }
            }
        )
    }
}

export default UsersServices
