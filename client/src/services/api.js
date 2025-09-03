import axios from 'axios'
import { getAuth } from 'firebase/auth'
import toast from 'react-hot-toast'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // update with your backend URL
})

api.interceptors.request.use(async (config) => {
    const auth = getAuth()
    const user = auth.currentUser
    if (user) {
        const token = await user.getIdToken()
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        let message = 'Something went wrong'
        if (error.response) {
            const status = error.response?.status
            switch (status) {
                // authentication (token related issues)
                case 401:
                    message = error.response?.statusText || 'Token Expired'
                    break

                // forbidden (permission related issues)
                case 403:
                    message = error.response?.statusText || 'Permission Denied'
                    break

                // method not allowed
                case 405:
                    message = error.response?.statusText || 'Invalid Type Request'
                    break

                // unprocessable
                case 422:
                    message = error.response?.statusText || 'Validation Error'
                    break

                // generic api error (server related) unexpected
                case 500:
                    message = error.response?.statusText || 'Server Error'
                    break
            }
        } else if (error.request && error.request.statusText) {
            message = error.request.statusText
        } else {
            message = error.message
        }

        toast.error(message)
    }
)

export default api
