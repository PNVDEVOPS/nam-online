import axios from "axios";

const instance = axios.create({
    baseURL: 'https//87.228.19.239:4444'
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export default instance