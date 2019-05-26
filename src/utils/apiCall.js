import axios from 'axios';

const headers = {
    'Content-type': 'application/json',
    Accept: 'application/json',
};

const instance = axios.create({ baseURL: process.env.VUE_APP_API_URL, headers });


export default async function apiCall({url, method, body, ...args}) {
    let res = {};
    try {
        res = await instance.request({url, method, data: body, ...args})
    } catch(error) {
        if(error.response && error.response.status === 401) {
            console.log("Tu n'es pas connecté !!!!!!!!!!!")
        }
        throw error;
    }
    return {...res.data, axios: res};
}
