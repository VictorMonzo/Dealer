import Vue from 'vue'
import Vuex from 'vuex'
import api from "@/api";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    orders: [],
    states: [],
    isAuthenticated: false
  },
  mutations: {
    login(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    logout(state) {
      sessionStorage.removeItem('token');
      state.user = {};
      state.orders = [];
      state.isAuthenticated = false; 
    },
    setOrders(state, orders) {
      state.orders = orders
    },
    changeOrder(state, order) {
      const index = state.orders.findIndex(item => item.id === order.id)
      if (index >= 0) state.orders.splice(index, 1, order)
    },
    setStates(state, states) {
      state.states = states
    }
  },
  actions: {
    login(context, user) {
      return new Promise((resolve, reject) => {
        api.users.login(user).then((response) => {
          if (response.data) {
            sessionStorage.setItem('token', response.data.token);
            context.commit('login', response.data)
            resolve(response.data)
          } else {
            reject('No se ha encontrado ningún usuario');
          }
        }).catch(err => reject(err))
      })
    },
    allOrdersDealer(context, id) {
      return new Promise((resolve, reject) => {
        api.orders.getAll(id).then((response) => {
          if (response.data) {
            context.commit('setOrders', response.data)
            resolve(response.data)
          } else {
            reject('No se han podido cargar los productos');
          }
        }).catch(err => reject(err))
      });
    },
    allStates(context) {
      api.states.getAllStates().then((response) => {
        context.commit('setStates', response.data)
      }).catch((err) => {
        alert(err.message || err);
      });
    },
    changeOrder(context, order) {
      api.orders
        .modify(order)
        .then((response) => {
          context.commit('changeOrder', response.data)
        }).catch((err) => {
          alert(err.message || err);
        });
    }
  },
  getters: {
    getIdUser: (state) => {
      return state.user.id;
    },
    getNameUser: state => {
      return state.user.name;
    },
    getNameState: (state) => (id) => {
      const foundState = state.states.find(item => item.id === Number(id));
      return foundState.name;
    },
    getAuth: (state) => {
      return state.isAuthenticated;
      //return sessionStorage.token;
    }
  },
  modules: {}
})