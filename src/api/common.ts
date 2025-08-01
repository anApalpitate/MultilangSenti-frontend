import axios from 'axios';

const HOST = 'localhost'
const PORT = 8080;

const api = axios.create({
    baseURL: `http://${HOST}:${PORT}/`,
    timeout: 5000
});

// 请求拦截器：自动携带 token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// 响应拦截器：统一错误处理
api.interceptors.response.use(
    res => res,
    err => {
        return Promise.reject(err);
    }
);

export default api;