import Vue from 'vue'
import Vuex from 'vuex'
import stock from './modules/stock-trader' 
import {utilitities} from './utilities'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stocks: [
      {
        id: utilitities.uuidv4(),
        name: "BMW",
        price: 110
      },
      {
        id: utilitities.uuidv4(),
        name: "Google",
        price: 200
      },
      {
        id: utilitities.uuidv4(),
        name: "Twitter",
        price: 110
      },
      {
        id: utilitities.uuidv4(),
        name: "Apple",
        price: 110
      }
    ],
    userStocks: []
  },
  mutations: {
  },
  actions: {
  },
  modules:{
    stock
  }
})
