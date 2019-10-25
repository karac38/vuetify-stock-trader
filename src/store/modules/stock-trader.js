import * as types from '../types'
import numeral from 'numeral'
import { utilities } from '../utilities'
const state = {
  funds: 10000,
  stocks: [
    {
      id: utilities.uuidv4(),
      name: "BMW",
      price: 110
    },
    {
      id: utilities.uuidv4(),
      name: "Google",
      price: 200
    },
    {
      id: utilities.uuidv4(),
      name: "Twitter",
      price: 110
    },
    {
      id: utilities.uuidv4(),
      name: "Apple",
      price: 110
    }
  ],
  userStocks: []
}

const getters = {
  getFunds: state => {
    return numeral(state.funds).format("$0,0.00");
  }
}

const actions = {
  buyStocksAsync({ commit }, payload) {
    return new Promise((resolve) => {
      commit(types.BUY_STOCK, payload);
      resolve();
    })
  },
  sellStocksAsync({ commit }, payload) {
    return new Promise((resolve) => {
      commit(types.SELL_STOCK, payload);
      resolve();
    })
  },
  getStockPriceAsync(context, { id }) {
    return new Promise((resolve, reject) => {
      let stockIndex = context.state.stocks.findIndex(e => e.id == id);
      if (stockIndex < 0) {
        reject("Can not find requested stock");
      }
      resolve(context.state.stocks[stockIndex].price);
    })
  }
}

const mutations = {
  [types.END_DAY]: state => {
    state.stocks.forEach(element => {
      let rnd = utilities.getRandomArbitrary(-10, 10);
      if (element.price + rnd < 0)
        element.price = 0;
      element.price += rnd;
    });
  },
  [types.BUY_STOCK]: (state, payload) => {
    if (state.funds - payload.price * payload.count < 0) {
      throw "Not enough funds";
    }
    //current payload count will represent amount of stocks to buy
    state.funds -= payload.price * payload.count;
    let currentStockindex = state.userStocks.findIndex(e => e.id == payload.id);
    if (currentStockindex >= 0) {
      state.userStocks[currentStockindex].count = Number(state.userStocks[currentStockindex].count) + Number(payload.count);
    } else {
      state.userStocks.push(payload);
    }
  },
  [types.SELL_STOCK]: (state, payload) => {
    //current payload count will represent amount of stocks to sell
    let stockIndex = state.stocks.findIndex(e => e.id == payload.id);
    let userStockIndex = state.userStocks.findIndex(e => e.id == payload.id);
    if (stockIndex < 0 || userStockIndex < 0) {
      throw "Can not find requested stock"
    }

    state.funds += payload.count * state.stocks[stockIndex].price;
    state.userStocks.splice(userStockIndex, 1);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}