import axios from 'axios';
import { AUTH_LOGOUT, REFRESH_SUCCESS } from '../store/actions/auth'
import store from '../store/store';


const headers = {
    'Content-type': 'application/json',
    Accept: 'application/json',
};

const instance = axios.create({ baseURL: process.env.VUE_APP_API_URL, headers });
let isRefreshing = false;



export default async function apiCall({url, method, body, ...args}) {
    let res = {};
    try {
        res = await instance.request({url, method, data: body, ...args})
    } catch(error) {
        console.dir(error);
        if(error.response && error.response.status === 401) {
            return refreshToken({url, method, body, ...args});
            console.log("Tu n'es pas connecté !!!!!!!!!!!")
        }
        throw error;
    }
    return {data: res.data, axios: res};
}

async function refreshToken( config) {
    if (isRefreshing) return undefined;
    isRefreshing = true;

    try {
        const { data } = await instance.request({
            url: '/refresh',
            method: 'POST',
            data: { refresh_token: localStorage.getItem('refreshToken') },
        });

        await store.dispatch(REFRESH_SUCCESS, { access_token: data.access_token, refresh_token: data.refresh_token });

        const res = await instance.request(config);
        isRefreshing = false;
        return { data: res.data, axios: res };
    } catch (error) {
        isRefreshing = false;
        await store.dispatch(AUTH_LOGOUT);
    }

    return undefined;
}
