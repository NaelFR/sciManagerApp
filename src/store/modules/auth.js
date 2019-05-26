import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'
import { USER_REQUEST } from '../actions/user'
import apiCall from '../../utils/apiCall'
import { login } from '../../api/index';

const state = { access_token: localStorage.getItem('user-access-token') || '', refresh_token: localStorage.getItem('user-refresh-token') || '', status: '', hasLoadedOnce: false }

const getters = {
    isAuthenticated: state => !!state.access_token,
    authStatus: state => state.status,
};

const actions = {
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            login(user)
                .then(resp => {
                    localStorage.setItem('user-access-token', resp.access_token);
                    localStorage.setItem('user-refresh-token', resp.refresh_token);
                    // Here set the header of your ajax library to the token value.
                    // example with axios
                    // axios.defaults.headers.common['Authorization'] = resp.token
                    commit(AUTH_SUCCESS, resp);
                    dispatch(USER_REQUEST);
                    resolve(resp)
                })
                .catch(err => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem('user-access-token');
                    reject(err)
                })
        })
    },
    [AUTH_LOGOUT]: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT);
            localStorage.removeItem('user-access-token');
            localStorage.removeItem('user-refresh-token');
            resolve()
        })
    }
};

const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, resp) => {
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
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}