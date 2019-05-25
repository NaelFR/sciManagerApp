import apiCall from '../utils/apiCall';

export const login = body => apiCall({url: 'login', method: 'POST', body})