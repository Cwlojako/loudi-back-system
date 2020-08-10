import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';
Vue.use(Vuex);
const initPageState = () => {
  return {
    user: {
      token: "" || JSON.parse(localStorage.getItem('userCache')) ? JSON.parse(localStorage.getItem('userCache')).token : '',
      username: "" || JSON.parse(localStorage.getItem('userCache')) ? JSON.parse(localStorage.getItem('userCache')).username : '',
      avatar: "" || JSON.parse(localStorage.getItem('userCache')) ? JSON.parse(localStorage.getItem('userCache')).avatar : '',
      id: "" || JSON.parse(localStorage.getItem('userCache')) ? JSON.parse(localStorage.getItem('userCache')).id : ''
    },
    prefix:'http://47.99.141.16:8001/attachment/',
    token: '' || localStorage.getItem('token')
  }
};
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: initPageState(),
  mutations: {
    [types.SAVE_USER](state, pageState) {
      console.log(state, pageState)
      for (const prop in pageState) {
        state[prop] = pageState[prop];
      }
    },
    [types.SAVE_TOKEN](state, token) {
      state.token = token
    }
  },
  actions: {
    [types.SAVE_USER_CACHE]() {
      let user = this.state.user;
      if (user.id !== "") {
        if (window.localStorage) {
          let ls = window.localStorage;
          let userCache = ls.getItem("userCache");
          if (userCache) {
            ls.removeItem("userCache");
          }
          ls.setItem("userCache", JSON.stringify(user));
        }
      }
    },
    [types.SAVE_TOKEN_CACHE]() {
      let token = this.state.token;
      if (token !== "") {
        if (window.localStorage) {
          let ls = window.localStorage;
          let tokenCache = ls.getItem("token");
          if (tokenCache) {
            ls.removeItem("token");
          }
          ls.setItem("token", token);
        }
      }
    },
    [types.CLEAR_USER_CACHE]() {
      if (window.localStorage) {
        let ls = window.localStorage;
        ls.removeItem("userCache");
      }
    },
    [types.GET_USER_CACHE]() {
      if (window.localStorage) {
        let ls = window.localStorage;
        let userStr = ls.getItem("userCache");
        let user = JSON.parse(userStr);
        this.commit(types.SAVE_USER, {
          user: user
        });
      }
    },
    [types.GET_USER_EXIST]() {
      if (window.localStorage) {
        let ls = window.localStorage;
        let userStr = ls.getItem("userCache");
        return !!userStr;
      }
    }
  }
});

export default store;
