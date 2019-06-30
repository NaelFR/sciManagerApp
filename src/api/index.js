import apiCall from '../utils/apiCall';

export const login = body => apiCall({url: 'login', method: 'POST', body});
export const register = body => apiCall({url: 'register', method: 'POST', body});
export const user = () => apiCall({url: 'me', method: 'GET'});

/** BUILDINGS **/
export const fetchBuildings = () => apiCall({url: 'buildings', method: 'GET'});
export const fetchABuilding = id => apiCall({url: `buildings/${id}`, method: 'GET'});
export const createBuilding = body => apiCall({url: 'buildings', method: 'POST', body});
export const updateBuilding = (id, body) => apiCall({url: `buildings/${id}`, method: 'PUT'});

/** APARTMENTS **/
