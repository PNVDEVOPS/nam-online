import axios from "axios";

const instance = axios.create({
     baseURL: 'https://xn--80ayb.online:4444/api'
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export default instance