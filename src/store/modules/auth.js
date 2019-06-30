import axios from 'axios';
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT, REFRESH_SUCCESS, REGISTER_REQUEST } from '../actions/auth'
import { USER_REQUEST } from '../actions/user'
import apiCall from '../../utils/apiCall'
import { login, register } from '../../api/index';

const state = { access_token: localStorage.getItem('accessToken') || '', refresh_token: localStorage.getItem('refreshToken') || '', status: '', hasLoadedOnce: false }

const getters = {
    isAuthenticated: state => !!state.access_token,
    authStatus: state => state.status,
};

const actions = {
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            login(user)
                .then(({ data }) => {
                    console.log(data);
                    localStorage.setItem('accessToken', data.access_token);
                    localStorage.setItem('refreshToken', data.refresh_token);

                    axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
                    commit(AUTH_SUCCESS, data);
                    dispatch(USER_REQUEST);
                    resolve(data)
                })
                .catch(err => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    reject(err)
                })
        })
    },
    [AUTH_LOGOUT]: ({commit}) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            resolve();
        })
    },
    [REFRESH_SUCCESS]: ({commit}, tokens) => {
        return new Promise((resolve, reject) => {
            commit(REFRESH_SUCCESS, tokens);
            console.log('REFRESH SUCCESS', tokens);
            localStorage.setItem('refreshToken', tokens.refresh_token);
            localStorage.setItem('accessToken', tokens.access_token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.access_token}`;
            resolve();
        })
    },
    [REGISTER_REQUEST]: ({commit, dispatch}, data) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            register(data)
                .then(({ data }) => {
                    console.log(data);
                    localStorage.setItem('accessToken', data.access_token);
                    localStorage.setItem('refreshToken', data.refresh_token);

                    axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
                    commit(AUTH_SUCCESS, data);
                    dispatch(USER_REQUEST);
                    resolve(data)
                })
                .catch(err => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    reject(err)
                })
        })

    }
};

const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, resp) => {
        console.log('SUCCESS', resp);
        state.status = 'success';
        state.access_token = resp.access_token;
        state.refresh_token = resp.refresh_token;
        state.hasLoadedOnce = true
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error';
        state.hasLoadedOnce = true
    },
    [AUTH_LOGOUT]: (state) => {
        state.access_token = '';
        state.refresh_token = '';
    },
    [REFRESH_SUCCESS]: (state, tokens) => {
        state.access_token = tokens.access_token;
        state.refresh_token = tokens.refresh_token;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}