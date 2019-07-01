import axios from 'axios';
import { FETCH_ALL_BUILDINGS_REQUEST, FETCH_ALL_BUILDINGS_SUCCESS, FETCH_ALL_BUILDINGS_ERROR } from '../actions/buildings'
import apiCall from '../../utils/apiCall'
import { fetchBuildings } from '../../api/index';

const state = {
    buildings: [],
    currentBuilding: null,
    isFetching: false,
};

const getters = {

};

const actions = {
    [FETCH_ALL_BUILDINGS_REQUEST]: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
            commit(FETCH_ALL_BUILDINGS_REQUEST);
            fetchBuildings()
                .then(({ data }) => {
                    commit(FETCH_ALL_BUILDINGS_SUCCESS, data);
                    resolve(data)
                })
                .catch(err => {
                    commit(FETCH_ALL_BUILDINGS_ERROR, err);
                    console.error(err);
                    reject(err)
                })
        })
    },
};

const mutations = {
    [FETCH_ALL_BUILDINGS_REQUEST]: (state) => {
        state.isFetching = true;
    },
    [FETCH_ALL_BUILDINGS_SUCCESS]: (state, resp) => {
        state.buildings = resp;
        state.isFetching = false;
    },
    [FETCH_ALL_BUILDINGS_ERROR]: (state, err) => {
        console.error('ERROR', err);
        state.isFetching = false;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
}