import api from './common';

export const register = async (username: string, password: string) =>
    api.post('/auth/register', {username, password});


export const login = (username: string, password: string) => {
    const form = new URLSearchParams();
    form.append('username', username);
    form.append('password', password);
    return api.post('/auth/login', form);
};


export const getMe = () => api.get('/auth/me');