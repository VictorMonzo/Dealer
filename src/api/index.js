import axios from 'axios'
//const baseURL = "http://localhost/api";
const baseURL = "http://backoffice.g06.batoilogic.es/api";
const DEBUG = false;

const users = {
    login: (user) => axios.post(`${baseURL}/login-dealer`, user),    
};

const orders = {
    getAll: (id) => axios.get(`${baseURL}/order-dealer/${id}`),
    modify: (item) => axios.put(`${baseURL}/order-api/${item.id}`, item),
};

const states = {
    getAllStates: () => axios.get(`${baseURL}/state`),
};

axios.interceptors.request.use((config) => {
    if(sessionStorage.token) {
        config.headers['Authorization'] = 'Bearer ' + sessionStorage.token;
    }

    if (DEBUG) {
        console.info('Request: ', config);
    }
  
    return config;
  }, (error) => {
    if (DEBUG) {
        console.error('Request error: ', error);
    }
    return Promise.reject(error);
  });
  
  axios.interceptors.response.use((response) => {
    if (DEBUG) {
        console.info('Response: ', response);
    }
    return response;
  }, (error) => {
    if (error.response && error.response.status !== 400) {
        //alert('Response error ' + error.response.status + '(' + error.response.statusText + ')')
    }
    if (DEBUG) {
        console.info('Response error: ', error);
    }
    return Promise.reject(error);
  });

export default {
    users,
    orders,
    states
};